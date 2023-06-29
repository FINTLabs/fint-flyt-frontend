import {
    ICollectionMapping,
    IFromCollectionMapping,
    IObjectMapping,
    IValueMapping
} from "../../../configuration/types/Configuration";

function filterNotNull<T>(value: T | null): value is T {
    return value !== null
}

function filterEntryNotNull<T>(entry: { key: string, value: T | null }): entry is { key: string, value: T } {
    return entry.value !== null
}

function pruneValueMapping(valueMapping: IValueMapping): IValueMapping | null {
    return valueMapping.mappingString ? valueMapping : null
}

function pruneCollectionMapping<T extends IValueMapping | IObjectMapping>(
    collectionMapping: ICollectionMapping<T>, pruningFunction: (value: T) => T | null
): ICollectionMapping<T> | null {
    const elementMappings: T[] =
        collectionMapping.elementMappings
            .map(pruningFunction)
            .filter(filterNotNull)
    const fromCollectionMappings: IFromCollectionMapping<T>[] =
        collectionMapping.fromCollectionMappings
            .map(fromCollectionMapping => pruneFromCollectionMapping(fromCollectionMapping, pruningFunction))
            .filter(filterNotNull)
    return elementMappings.length === 0 && fromCollectionMappings.length === 0
        ? null
        : {elementMappings, fromCollectionMappings}
}

function pruneFromCollectionMapping<T extends IValueMapping | IObjectMapping>(fromCollectionMapping: IFromCollectionMapping<T>, pruningFunction: (value: T) => T | null): IFromCollectionMapping<T> | null {
    const elementMapping: T | null = pruningFunction(fromCollectionMapping.elementMapping)
    return elementMapping
        ? {
            instanceCollectionReferencesOrdered: fromCollectionMapping.instanceCollectionReferencesOrdered,
            elementMapping
        }
        : null;
}

function pruneRecord<T>(record: Record<string, T>, pruneFunction: (value: T) => T | null): Record<string, T> {
    const prunedRecord: Record<string, T> = {}
    if (record) {
        Object.entries(record)
            .map(([key, value]) => {
                return {key: key, value: pruneFunction(value)}
            })
            .filter(filterEntryNotNull)
            .forEach(entry => prunedRecord[entry.key] = entry.value)
        return prunedRecord;
    }
    return {};
}

export function pruneObjectMapping(objectMapping: IObjectMapping): IObjectMapping | null {
    if (objectMapping === undefined) {
        return {
            valueMappingPerKey: {},
            objectMappingPerKey: {},
            objectCollectionMappingPerKey: {},
            valueCollectionMappingPerKey: {}
        };
    }
    const valueMappingPerKey: Record<string, IValueMapping> = objectMapping.valueMappingPerKey
        ? pruneRecord(objectMapping.valueMappingPerKey, pruneValueMapping)
        : {}

    const valueCollectionMappingPerKey: Record<string, ICollectionMapping<IValueMapping>> = objectMapping.valueCollectionMappingPerKey
        ? pruneRecord(
            objectMapping.valueCollectionMappingPerKey,
            (collectionMapping: ICollectionMapping<IValueMapping>) => pruneCollectionMapping(
                collectionMapping,
                pruneValueMapping
            )
        )
        : {}

    const objectCollectionMappingPerKey: Record<string, ICollectionMapping<IObjectMapping>> = objectMapping.objectCollectionMappingPerKey
        ? pruneRecord(
            objectMapping.objectCollectionMappingPerKey,
            (collectionMapping: ICollectionMapping<IObjectMapping>) => pruneCollectionMapping(
                collectionMapping,
                pruneObjectMapping
            )
        )
        : {}

    const objectMappingPerKey: Record<string, IObjectMapping> = objectMapping.objectMappingPerKey ?
        pruneRecord(
            objectMapping.objectMappingPerKey,
            pruneObjectMapping
        )
        : {}

    return Object.entries(valueMappingPerKey).length > 0
    || Object.entries(valueCollectionMappingPerKey).length > 0
    || Object.entries(objectMappingPerKey).length > 0
    || Object.entries(objectCollectionMappingPerKey).length > 0
        ? {valueMappingPerKey, valueCollectionMappingPerKey, objectMappingPerKey, objectCollectionMappingPerKey}
        : null
}