import {
    OBJECT_COLLECTION_MAPPING_PER_KEY,
    OBJECT_MAPPING_PER_KEY,
    VALUE_COLLECTION_MAPPING_PER_KEY,
    VALUE_MAPPING_PER_KEY,
    VALUE_MAPPING_STRING
} from "../components/mapping/ConfigurationKeyUtils";
import {
    ICollectionTemplate,
    IElementTemplate,
    IMappingTemplate,
    IObjectTemplate,
    ISelectableValueTemplate,
    IValueTemplate
} from "../types/FormTemplate";

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


function findTemplate<T>(templatePathComponent: string, elements?: IElementTemplate<T>[]): T | undefined {
    return elements?.find(
        (elementTemplate: IElementTemplate<T>) =>
            elementTemplate.elementConfig.key === templatePathComponent
    )?.template;
}

function getConfigurationPathFromTemplatePathForValueCollection(template: ICollectionTemplate<IValueTemplate>, templatePath: string[]): string[] {
    if (templatePath.length == 0) {
        return [];
    }
    const currentTemplatePathComponent: string = templatePath[0]
    return [
        currentTemplatePathComponent,
        ...getConfigurationPathFromTemplatePathForValue(templatePath.slice(1))
    ]
}

function getConfigurationPathFromTemplatePathForObjectCollection(template: ICollectionTemplate<IObjectTemplate>, templatePath: string[]): string[] {
    if (templatePath.length == 0) {
        return [];
    }
    const currentTemplatePathComponent: string = templatePath[0]
    return [
        currentTemplatePathComponent,
        ...getConfigurationPathFromTemplatePathForObject(template.elementTemplate, templatePath.slice(1))
    ]
}

// TODO eivindmorch 28/06/2023 : Replace with O(1) (record per key)
function getConfigurationPathFromTemplatePathForObject(template: IObjectTemplate, templatePath: string[]): string[] {
    if (templatePath.length == 0) {
        return [];
    }
    const currentTemplatePathComponent: string = templatePath[0];

    const valueTemplate: IValueTemplate | undefined = findTemplate(currentTemplatePathComponent, template.valueTemplates);
    const selectableValueTemplate: ISelectableValueTemplate | undefined = findTemplate(currentTemplatePathComponent, template.selectableValueTemplates);
    if (valueTemplate || selectableValueTemplate) {
        return [
            VALUE_MAPPING_PER_KEY,
            currentTemplatePathComponent,
            ...getConfigurationPathFromTemplatePathForValue(templatePath.slice(1))
        ]
    }

    const objectTemplate: IObjectTemplate | undefined = findTemplate(currentTemplatePathComponent, template.objectTemplates);
    if (objectTemplate) {
        return [
            OBJECT_MAPPING_PER_KEY,
            currentTemplatePathComponent,
            ...getConfigurationPathFromTemplatePathForObject(objectTemplate, templatePath.slice(1))
        ]
    }

    const valueCollectionTemplate: ICollectionTemplate<IValueTemplate> | undefined
        = findTemplate(currentTemplatePathComponent, template.valueCollectionTemplates);
    if (valueCollectionTemplate) {
        return [
            VALUE_COLLECTION_MAPPING_PER_KEY,
            currentTemplatePathComponent,
            ...getConfigurationPathFromTemplatePathForValueCollection(valueCollectionTemplate, templatePath.slice(1))
        ]
    }

    const objectCollectionTemplate: ICollectionTemplate<IObjectTemplate> | undefined
        = findTemplate(currentTemplatePathComponent, template.objectCollectionTemplates);
    if (objectCollectionTemplate) {
        return [
            OBJECT_COLLECTION_MAPPING_PER_KEY,
            currentTemplatePathComponent,
            ...getConfigurationPathFromTemplatePathForObjectCollection(objectCollectionTemplate, templatePath.slice(1))
        ]
    }
    throw new Error('Could not find element with key=' + currentTemplatePathComponent);
}

function getConfigurationPathFromTemplatePathForValue(templatePath: string[]) {
    if (templatePath.length > 0) {
        throw Error("Template path refers to element that does not exist inside a value mapping");
    }
    return [VALUE_MAPPING_STRING]
}

export function getConfigurationPathFromTemplatePath(template: IMappingTemplate, templatePath: string[]) {
    return getConfigurationPathFromTemplatePathForObject(template.rootObjectTemplate, templatePath);
}

export function getConfigurationKeyFromTemplatePath(template: IMappingTemplate, templatePath: string[]) {
    return getConfigurationPathFromTemplatePath(template, templatePath).join(configurationKeyComponentSeparator);
}

export function getConfigurationKeyFromTemplateReference(
    template: IMappingTemplate,
    referenceOriginPath: string[],
    reference: string
): string {
    const templatePath: string[] = getTemplatePathFromTemplateReference(referenceOriginPath, reference);
    return getConfigurationKeyFromTemplatePath(template, templatePath);
}
