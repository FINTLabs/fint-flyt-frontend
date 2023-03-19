import {IInstanceMetadataContent, IInstanceObjectCollectionMetadata} from "../types/Metadata/IntegrationMetadata";

export function recordOrEmpty<V>(optionalRecord?: Record<string, V>): Record<string, V> {
    return optionalRecord
        ? optionalRecord
        : {};
}

export function findInInstanceMetadata(instanceMetadata: IInstanceMetadataContent, searchKey: string, valueKey: string): IInstanceObjectCollectionMetadata | undefined {
    let instanceObjectCollectionMetadata;
    JSON.stringify(instanceMetadata, (_, nestedValue) => {
        if (nestedValue && nestedValue[searchKey] === valueKey) {
            instanceObjectCollectionMetadata = nestedValue;
        }
        return nestedValue;
    });
    return instanceObjectCollectionMetadata;
}