export interface IConfiguration {
    id?: string;
    integrationId?: string;
    integrationMetadataId?: number;
    version?: number | null;
    completed?: boolean;
    comment?: string;
    mapping?: IObjectMapping
}

export interface IConfigurationPatch {
    comment?: string;
    integrationMetadataId?: number;
    completed?: boolean;
    mapping?: IObjectMapping
}

export interface IObjectMapping {
    valueMappingPerKey: Record<string, IValueMapping>
    objectMappingPerKey: Record<string, IObjectMapping>
    valueCollectionMappingPerKey: Record<string, ICollectionMapping<IValueMapping>>
    objectCollectionMappingPerKey: Record<string, ICollectionMapping<IObjectMapping>>
}

export interface IValueMapping {
    type: string;
    mappingString: string | null
}

export interface ICollectionMapping<T extends IObjectMapping | IValueMapping> {
    elementMappings: T[];
    fromCollectionMappings: IFromCollectionMapping<T>[]
}

export interface IFromCollectionMapping<T extends IObjectMapping | IValueMapping> {
    instanceCollectionReferencesOrdered: string[];
    elementMapping: T;
}

/*export interface IObjectCollectionMapping {
    elementMappings: IObjectMapping[];
    fromCollectionMappings: IObjectsFromCollectionMapping[];
}

export interface IObjectsFromCollectionMapping {
    instanceCollectionReferencesOrdered: string[];
    objectMapping: IObjectMapping
}*/

export const FieldType = {
    STRING: 'STRING',
    DYNAMIC_STRING: 'DYNAMIC_STRING',
    URL: 'URL',
    BOOLEAN: 'BOOLEAN',
    FILE: 'FILE'
}

