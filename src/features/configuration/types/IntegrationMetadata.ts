export const Type = {
    STRING: "STRING",
    DATE: "DATE",
    DATETIME: "DATETIME",
    URL: "URL",
    EMAIL: "EMAIL",
    PHONE: "PHONE",
    BOOLEAN: "BOOLEAN",
    INTEGER: "INTEGER",
    DOUBLE: "DOUBLE",
    FILE: "FILE",
    UNKNOWN: "UNKNOWN"
}

export interface IIntegrationMetadata {
    id?: any;
    sourceApplicationId: string;
    sourceApplicationIntegrationId: string;
    sourceApplicationIntegrationUri: string;
    integrationDisplayName: string;
    version: number;
    instanceElementMetadata: IInstanceElementMetadata[];
    instanceMetadata?: IInstanceMetadataContent;
}

interface IInstanceValueMetadata {
    displayName: string;
    type: string;
    key: string;
    disabled?: boolean;
}

interface IInstanceObjectCollectionMetadata {
    displayName: string;
    objectMetadata: IInstanceMetadataContent;
    key: string;
}

interface IInstanceMetadataCategory {
    displayName: string;
    content: IInstanceMetadataContent
}

export interface IInstanceMetadataContent {
    instanceValueMetadata: IInstanceValueMetadata[];
    instanceObjectCollectionMetadata: IInstanceObjectCollectionMetadata[];
    categories: IInstanceMetadataCategory[];
}

export const MOCK_INSTANCE_METADATA: IIntegrationMetadata = {
    id: 1234,
    sourceApplicationId:"1",
    sourceApplicationIntegrationId:"PROD0195",
    sourceApplicationIntegrationUri:"",
    integrationDisplayName:"Test",
    version: 1,
    instanceElementMetadata: [],
    instanceMetadata: {
        instanceValueMetadata: [],
        instanceObjectCollectionMetadata: [],
        categories: [
            {
                displayName: 'test1',
                content: {
                    instanceObjectCollectionMetadata: [],
                    instanceValueMetadata: [
                        {
                            displayName: "navn",
                            type: Type.STRING,
                            key: "navn"
                        },
                        {
                            displayName: "epost",
                            type: Type.EMAIL,
                            key: "epost"
                        }
                    ],
                    categories: []
                }
            }
        ]
    }
}

export interface IInstanceElementMetadata {
    id?: string;
    key: string | null;
    type: string;
    displayName: string;
    disabled?: boolean;
    children: IInstanceElementMetadata[];
}
