import {
    IElementCollectionMapping,
    IElementMapping,
    IElementsFromCollectionMapping
} from "../../../configuration/types/AVConfiguration";

export function shouldIncludeElementMapping(data: IElementMapping): boolean {
    return Object.entries(data.valueMappingPerKey).length > 0
        || Object.entries(data.elementMappingPerKey).length > 0
        || Object.entries(data.elementCollectionMappingPerKey).length > 0;
}

export function shouldIncludeElementCollectionMapping(data: IElementCollectionMapping): boolean {
    return data.elementMappings.length > 0 || data.elementsFromCollectionMappings.length > 0;
}

export function shouldIncludeElementsFromCollectionMapping(data: IElementsFromCollectionMapping): boolean {
    return shouldIncludeElementMapping(data.elementMapping);
}

export function filterEntries<T>(data: Record<string, T>, predicate: (t: T) => boolean): Record<string, T> {
    let result: Record<string, T> = {} as Record<string, T>;
    Object.entries(data)
        .filter(([key, value]) => predicate(value))
        .forEach(([key, value]) => result[key] = value);
    return result;
}

export function filterElementMappingEntries(data: Record<string, IElementMapping>): Record<string, IElementMapping> {
    return filterEntries(data, shouldIncludeElementMapping);
}

export function filterElementCollectionMappingEntries(data: Record<string, IElementCollectionMapping>): Record<string, IElementCollectionMapping> {
    return filterEntries(data, shouldIncludeElementCollectionMapping);
}