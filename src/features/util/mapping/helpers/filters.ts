import {
    IObjectCollectionMapping,
    IObjectMapping,
    IObjectsFromCollectionMapping
} from "../../../configuration/types/AVConfiguration";

export function shouldIncludeObjectMapping(data: IObjectMapping): boolean {
    return Object.entries(data.valueMappingPerKey).length > 0
        || Object.entries(data.valueCollectionMappingPerKey).length > 0
        || Object.entries(data.objectMappingPerKey).length > 0
        || Object.entries(data.objectCollectionMappingPerKey).length > 0;
}

export function shouldIncludeObjectCollectionMapping(data: IObjectCollectionMapping): boolean {
    return data.objectMappings.length > 0 || data.objectsFromCollectionMappings.length > 0;
}

export function shouldIncludeObjectsFromCollectionMapping(data: IObjectsFromCollectionMapping): boolean {
    return shouldIncludeObjectMapping(data.objectMapping);
}

export function filterEntries<T>(data: Record<string, T>, predicate: (t: T) => boolean): Record<string, T> {
    let result: Record<string, T> = {} as Record<string, T>;
    Object.entries(data)
        .filter(([key, value]) => predicate(value))
        .forEach(([key, value]) => result[key] = value);
    return result;
}

export function filterObjectMappingEntries(data: Record<string, IObjectMapping>): Record<string, IObjectMapping> {
    return filterEntries(data, shouldIncludeObjectMapping);
}

export function filterObjectCollectionMappingEntries(data: Record<string, IObjectCollectionMapping>): Record<string, IObjectCollectionMapping> {
    return filterEntries(data, shouldIncludeObjectCollectionMapping);
}