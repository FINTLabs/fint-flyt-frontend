export interface IFieldConfiguration {
    id?: string;
    key: string;
    type: string;
    value: string | undefined;
}

export interface ICollectionFieldConfiguration {
    id?: string;
    key: string;
    type: string;
    values: string[] | undefined;
}

export interface IConfigurationElement {
    id?: string;
    key: string;
    elements?: IConfigurationElement[];
    fieldConfigurations?: IFieldConfiguration[];
    collectionFieldConfigurations?: ICollectionFieldConfiguration[]
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
