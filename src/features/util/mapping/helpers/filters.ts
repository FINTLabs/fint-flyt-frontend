import {
    ICollectionMapping,
    IObjectMapping,
} from "../../../configuration/types/Configuration";
import {IFromCollectionMapping} from "../../../configuration/types/Configuration";

export function shouldIncludeObjectMapping(data: IObjectMapping): boolean {
    return Object.entries(data.valueMappingPerKey).length > 0
        || Object.entries(data.valueCollectionMappingPerKey).length > 0
        || Object.entries(data.objectMappingPerKey).length > 0
        || Object.entries(data.objectCollectionMappingPerKey).length > 0;
}

export function shouldIncludeObjectCollectionMapping(data: ICollectionMapping<IObjectMapping>): boolean {
    return data.elementMappings.length > 0 || data.fromCollectionMappings.length > 0;
}

export function shouldIncludeObjectsFromCollectionMapping(data: IFromCollectionMapping<IObjectMapping>): boolean {
    return shouldIncludeObjectMapping(data.elementMapping);
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

export function filterObjectCollectionMappingEntries(data: Record<string, ICollectionMapping<IObjectMapping>>): Record<string, ICollectionMapping<IObjectMapping>> {
    return filterEntries(data, shouldIncludeObjectCollectionMapping);
}