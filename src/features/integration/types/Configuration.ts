export interface IFieldConfiguration {
    id?: string;
    key: string;
    type: string;
    value: string | null;
}

export interface IFromCollectionFieldConfiguration {
    id?: string;
    collectionReference: string;
    fieldConfigurations?: IFieldConfiguration[];
    collectionElements?: ICollectionElement[];
}

export interface IFixedFieldConfiguration {
    id?: string;
    elements?: IConfigurationElement[];
    fieldConfigurations?: IFieldConfiguration[];
    collectionElements?: ICollectionElement[];
}

export interface ICollectionElement {
    id?: string;
    key: string;
    fixed?: IFixedFieldConfiguration[];
    fromCollection?: IFromCollectionFieldConfiguration[];
}

export interface IConfigurationElement {
    id?: string;
    searchParameters?: string[];
    key: string;
    elements?: IConfigurationElement[];
    collectionElements?: ICollectionElement[];
    fieldConfigurations?: IFieldConfiguration[];
    collectionFieldConfigurations?: IFromCollectionFieldConfiguration[]
}

export interface newIConfiguration {
    id?: string;
    integrationId?: string;
    comment?: string;
    version?: number | null;
    integrationMetadataId?: number;
    completed?: boolean;
    elements: IConfigurationElement[];
}

export interface IConfigurationPatch {
    comment?: string;
    integrationMetadataId?: number;
    completed?: boolean;
    elements: IConfigurationElement[];
}

export const FieldConfigurationType = {
    STRING: 'STRING',
    DYNAMIC_STRING: 'DYNAMIC_STRING',
    URL: 'URL',
    BOOLEAN: 'BOOLEAN'
}

export const FieldCollectionType = {
    STRING: 'STRING',
    URL: 'URL',
    BOOLEAN: 'BOOLEAN'
}
