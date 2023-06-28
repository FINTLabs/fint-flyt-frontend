import {
    OBJECT_COLLECTION_MAPPING_PER_KEY,
    OBJECT_MAPPING_PER_KEY,
    VALUE_COLLECTION_MAPPING_PER_KEY,
    VALUE_MAPPING_PER_KEY,
    VALUE_MAPPING_STRING
} from "../components/mapping/ConfigurationKeyUtils";

export enum TemplateElementType {
    VALUE,
    OBJECT,
    VALUE_COLLECTION,
    OBJECT_COLLECTION
}

export type TemplateElementInfo = {
    type: TemplateElementType;
    childrenPerKey: Record<string, TemplateElementInfo>
}

const templateReferenceHardReferencePrefix: string = '/'
const templateReferenceDynamicPathLevel: string = '../';
const templateReferencePathComponentSeparator: string = '.';

const collectionIndexSame: RegExp = new RegExp(/^n$/);
const collectionIndexGreater: RegExp = new RegExp(/^n\+(\d+)$/);
const collectionIndexLess: RegExp = new RegExp(/^n-(\d+)$/);

const configurationKeyComponentSeparator: string = '.';

export function getTemplatePathFromTemplateReference(referenceOriginPath: string[], reference: string): string[] {
    if (reference.startsWith(templateReferenceHardReferencePrefix)) {
        return reference.slice(1).split(templateReferencePathComponentSeparator);
    }

    const referenceDynamicPathLevelSplit = reference.split(templateReferenceDynamicPathLevel)
    const numOfDynamicPathLevels = referenceDynamicPathLevelSplit.length - 1;

    if (numOfDynamicPathLevels >= referenceOriginPath.length) {
        throw new Error("Number of dynamic path levels (" + numOfDynamicPathLevels + ") is higher than " +
            "number of components in the reference origin path (" + referenceOriginPath.length + ")")
    }

    const referencePathWithoutDynamicPathLevels: string[] =
        referenceDynamicPathLevelSplit[numOfDynamicPathLevels]
            .split(templateReferencePathComponentSeparator);

    const referenceOriginPathAdjustedForDynamicPathLevels: string[] = referenceOriginPath
        .slice(0, referenceOriginPath.length - numOfDynamicPathLevels);

    const referenceOriginRemovedDynamicPathLevels: string[] = referenceOriginPath
        .slice(referenceOriginPath.length - numOfDynamicPathLevels);

    return [
        ...referenceOriginPathAdjustedForDynamicPathLevels,
        ...(referencePathWithoutDynamicPathLevels.length === 1 && referencePathWithoutDynamicPathLevels[0] === ""
            ? []
            : convertDynamicCollectionIndexesToAbsolute(
                referenceOriginRemovedDynamicPathLevels,
                referencePathWithoutDynamicPathLevels
            ))
    ];
}

function convertDynamicCollectionIndexesToAbsolute(
    referenceOriginRemovedDynamicPathLevels: string[],
    referencePathWithoutDynamicPathLevels: string[],
): string[] {
    return referencePathWithoutDynamicPathLevels.map((pathComponent: string, index: number) => {
        if (collectionIndexSame.test(pathComponent)) {
            return referenceOriginRemovedDynamicPathLevels[index];
        }
        const greaterThanMatch: RegExpMatchArray | null = collectionIndexGreater.exec(pathComponent);
        if (greaterThanMatch !== null) {
            return (
                Number.parseInt(referenceOriginRemovedDynamicPathLevels[index]) +
                Number.parseInt(greaterThanMatch[1])
            ).toString()
        }
        const lessThanMatch: RegExpMatchArray | null = collectionIndexLess.exec(pathComponent);
        if (lessThanMatch !== null) {
            return (
                Number.parseInt(referenceOriginRemovedDynamicPathLevels[index]) -
                Number.parseInt(lessThanMatch[1])
            ).toString()
        }
        return pathComponent;
    })
}

export function getConfigurationPathFromTemplatePath(templateInfo: TemplateElementInfo, templatePath: string[]) {
    const configurationPath: string[] = ['mapping'];
    let currentElement: TemplateElementInfo = templateInfo;
    let i = 0;
    while (i < templatePath.length) {
        const templatePathComponent = templatePath[i];
        currentElement = currentElement.childrenPerKey[templatePathComponent]

        if (currentElement.type === TemplateElementType.VALUE) {
            if (i < templatePath.length - 1) {
                throw Error("Template path refers to element that does not exist inside a value mapping")
            }
            configurationPath.push(VALUE_MAPPING_PER_KEY);
            configurationPath.push(templatePathComponent)
            configurationPath.push(VALUE_MAPPING_STRING)
        } else if (currentElement.type === TemplateElementType.OBJECT) {
            configurationPath.push(OBJECT_MAPPING_PER_KEY)
            configurationPath.push(templatePathComponent)
        } else if (currentElement.type == TemplateElementType.VALUE_COLLECTION) {
            if (i < templatePath.length - 1) {
                throw Error("Template path refers to element that does not exist inside a value mapping")
            }
            configurationPath.push(VALUE_COLLECTION_MAPPING_PER_KEY)
            configurationPath.push(templatePathComponent)
            configurationPath.push(VALUE_MAPPING_STRING)
            if (i + 1 < templatePath.length) {
                configurationPath.push(templatePath[i + 1]);
                i++;
            }
        } else if (currentElement.type == TemplateElementType.OBJECT_COLLECTION) {
            configurationPath.push(OBJECT_COLLECTION_MAPPING_PER_KEY)
            configurationPath.push(templatePathComponent)
            if (i + 1 < templatePath.length) {
                configurationPath.push(templatePath[i + 1]);
                i++;
            }
        }
        i++;
    }
    return configurationPath;
}

export function getConfigurationKeyFromTemplatePath(templateInfo: TemplateElementInfo, templatePath: string[]) {
    return getConfigurationPathFromTemplatePath(templateInfo, templatePath).join(configurationKeyComponentSeparator);
}

export function getConfigurationKeyFromTemplateReference(
    templateInfo: TemplateElementInfo,
    referenceOriginPath: string[],
    reference: string
): string {
    const templatePath: string[] = getTemplatePathFromTemplateReference(referenceOriginPath, reference);
    return getConfigurationKeyFromTemplatePath(templateInfo, templatePath);
}
