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

export interface IInstanceValueMetadata {
    displayName: string;
    type: string;
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

export const MOCK_INSTANCE_METADATA: IIntegrationMetadata = {
    id: 1234,
    sourceApplicationId:"1",
    sourceApplicationIntegrationId:"PROD0195",
    sourceApplicationIntegrationUri:"",
    integrationDisplayName:"Test",
    version: 1,
    instanceElementMetadata: [],
    instanceMetadata: {
        instanceValueMetadata: [
            {
                displayName: "ivm1",
                type: Type.STRING,
                key: "IVM1"
            },
            {
                displayName: "ivm2",
                type: Type.EMAIL,
                key: "IVM2"
            }
        ],
        instanceObjectCollectionMetadata: [
            {
                displayName: 'vedlegg',
                key: 'vedlegg1',
                objectMetadata: {
                    instanceValueMetadata: [
                        {
                            displayName: "vedlegg1",
                            type: Type.STRING,
                            key: "v1"
                        },
                        {
                            displayName: "vedlegg2",
                            type: Type.EMAIL,
                            key: "v2"
                        }
                    ],
                    instanceObjectCollectionMetadata: [],
                    categories: []
                }
            }
        ],
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
                    categories: [
                        {
                            displayName: 'test1 sub-cat',
                            content: {
                                instanceObjectCollectionMetadata: [],
                                instanceValueMetadata: [
                                    {
                                        displayName: "navn2",
                                        type: Type.STRING,
                                        key: "navn2"
                                    },
                                    {
                                        displayName: "epost2",
                                        type: Type.EMAIL,
                                        key: "epost2"
                                    }
                                ],
                                categories: [
                                    {
                                        displayName: 'sub-sub-test2',
                                        content: {
                                            instanceObjectCollectionMetadata: [],
                                            instanceValueMetadata: [
                                                {
                                                    displayName: "navn2.test",
                                                    type: Type.STRING,
                                                    key: "navn2.test"
                                                },
                                                {
                                                    displayName: "epost2.test",
                                                    type: Type.STRING,
                                                    key: "epost2.test"
                                                }
                                            ],
                                            categories: []
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }
            },
            {
                displayName: 'test2',
                content: {
                    instanceObjectCollectionMetadata: [],
                    instanceValueMetadata: [
                        {
                            displayName: "test2.navn",
                            type: Type.STRING,
                            key: "t2.navn"
                        },
                        {
                            displayName: "test2.epost",
                            type: Type.EMAIL,
                            key: "t2.epost"
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
