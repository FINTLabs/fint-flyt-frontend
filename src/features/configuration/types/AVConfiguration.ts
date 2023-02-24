export interface IAVConfiguration {
    id?: string;
    integrationId?: string;
    integrationMetadataId?: number;
    version?: number | null;
    completed?: boolean;
    comment?: string;
    mapping?: IObjectMapping
}

export interface IAVConfigurationPatch {
    comment?: string;
    integrationMetadataId?: number;
    completed?: boolean;
    mapping?: IObjectMapping
}

export interface IObjectMapping {
    valueMappingPerKey: Record<string, IValueMapping>;
    valueCollectionMappingPerKey: Record<string, IValueMapping>
    objectMappingPerKey: Record<string, IObjectMapping>;
    objectCollectionMappingPerKey: Record<string, IObjectCollectionMapping>;
}

export interface IValueMapping {
    type: string;
    mappingString: string | null
}

export interface IObjectCollectionMapping {
    objectMappings: IObjectMapping[];
    objectsFromCollectionMappings: IObjectsFromCollectionMapping[];
}

export interface IObjectsFromCollectionMapping {
    instanceCollectionReferencesOrdered: string[];
    objectMapping: IObjectMapping
}

export const FieldType = {
    STRING: 'STRING',
    DYNAMIC_STRING: 'DYNAMIC_STRING',
    URL: 'URL',
    BOOLEAN: 'BOOLEAN',
    FILE: 'FILE'
}

