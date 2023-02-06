export interface IAVConfiguration {
    id?: string;
    integrationId?: string;
    integrationMetadataId?: number;
    version?: number | null;
    completed?: boolean;
    comment?: string;
    mapping?: IElementMapping
}

export interface IAVConfigurationPatch {
    comment?: string;
    integrationMetadataId?: number;
    completed?: boolean;
    mapping?: IElementMapping
}

export interface IElementMapping {
    valueMappingPerKey: Record<string, IValueMapping>;
    elementMappingPerKey: Record<string, IElementMapping>
    elementCollectionMappingPerKey: Record<string, IElementCollectionMapping>
}

export interface IValueMapping {
    type: string;
    mappingString: string | null
}

export interface IElementCollectionMapping {
    elementMappings: IElementMapping[];
    elementsFromCollectionMappings: IElementsFromCollectionMapping[];
}

export interface IElementsFromCollectionMapping {
    instanceCollectionReferencesOrdered: string[];
    elementMapping: IElementMapping
}

export const FieldType = {
    STRING: 'STRING',
    DYNAMIC_STRING: 'DYNAMIC_STRING',
    URL: 'URL',
    BOOLEAN: 'BOOLEAN',
    FILE: 'FILE'
}

