export enum ValueType {
    STRING = "STRING",
    BOOLEAN = "BOOLEAN",
    INTEGER = "INTEGER",
    EMAIL = "EMAIL",
    URL = "URL",
    DATE = "DATE",
    PHONE = "PHONE",
    FILE = "FILE",
    COLLECTION = "COLLECTION",
    VALUE_CONVERTING = "VALUE_CONVERTING"
}

export interface IIntegrationMetadata {
    id: string;
    sourceApplicationId: string;
    sourceApplicationIntegrationId: string;
    sourceApplicationIntegrationUri: string;
    integrationDisplayName: string;
    version: number;
    instanceElementMetadata: IInstanceElementMetadata[];
    instanceMetadata?: IInstanceMetadataContent;
}

export interface IInstanceValueMetadata {
    displayName: string;
    type: ValueType;
    key: string;
}

export interface IInstanceObjectCollectionMetadata {
    displayName: string;
    objectMetadata: IInstanceMetadataContent;
    key: string;
}

export interface IInstanceMetadataCategory {
    displayName: string;
    content: IInstanceMetadataContent
}

export interface IInstanceMetadataContent {
    instanceValueMetadata: IInstanceValueMetadata[];
    instanceObjectCollectionMetadata: IInstanceObjectCollectionMetadata[];
    categories: IInstanceMetadataCategory[];
}

export interface IInstanceElementMetadata {
    id?: string;
    key: string | null;
    type: string;
    displayName: string;
    disabled?: boolean;
    children: IInstanceElementMetadata[];
}