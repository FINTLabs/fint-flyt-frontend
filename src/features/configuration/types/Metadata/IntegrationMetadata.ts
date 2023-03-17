export enum ValueType {
    STRING = "STRING",
    BOOLEAN = "BOOLEAN",
    INTEGER = "INTEGER",
    EMAIL = "EMAIL",
    DATE = "DATE",
    PHONE = "PHONE",
    FILE = "FILE",
    COLLECTION = "COLLECTION"
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

export const MOCK_INSTANCE_METADATA: IIntegrationMetadata = {
    id: 1234,
    sourceApplicationId: "1",
    sourceApplicationIntegrationId: "PROD0195",
    sourceApplicationIntegrationUri: "",
    integrationDisplayName: "Test",
    version: 1,
    instanceElementMetadata: [],
    instanceMetadata: {
        instanceValueMetadata: [
            {
                displayName: "Fornavn 1",
                type: ValueType.STRING,
                key: "navn1"
            },
            {
                displayName: "Fornavn 2",
                type: ValueType.EMAIL,
                key: "navn2"
            }
        ],
        instanceObjectCollectionMetadata: [
            {
                displayName: 'vedlegg',
                key: 'vedlegg1',
                objectMetadata: {
                    instanceValueMetadata: [
                        {
                            displayName: "tittel",
                            type: ValueType.STRING,
                            key: "tittel"
                        },
                        {
                            displayName: "opplaster",
                            type: ValueType.STRING,
                            key: "opplaster"
                        },
                        {
                            displayName: "Dato",
                            type: ValueType.DATE,
                            key: "dato"
                        },
                        {
                            displayName: "Filer",
                            type: ValueType.FILE,
                            key: "filer"
                        },
                        {
                            displayName: "Filtype",
                            type: ValueType.STRING,
                            key: "filtype"
                        },
                        {
                            displayName: "Kontaktperson",
                            type: ValueType.DATE,
                            key: "kontaktperson"
                        },
                        {
                            displayName: "test1",
                            type: ValueType.FILE,
                            key: "test1"
                        }
                    ],
                    instanceObjectCollectionMetadata: [],
                    categories: []
                }
            },
            {
                displayName: 'vedlegg2',
                key: 'vedlegg2',
                objectMetadata: {
                    instanceValueMetadata: [
                        {
                            displayName: "vedlegg2.1",
                            type: ValueType.STRING,
                            key: "v2.1"
                        },
                        {
                            displayName: "vedlegg2.2",
                            type: ValueType.EMAIL,
                            key: "v2.2"
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
                            type: ValueType.STRING,
                            key: "navn"
                        },
                        {
                            displayName: "epost",
                            type: ValueType.EMAIL,
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
                                        type: ValueType.STRING,
                                        key: "navn2"
                                    },
                                    {
                                        displayName: "epost2",
                                        type: ValueType.EMAIL,
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
                                                    type: ValueType.STRING,
                                                    key: "navn2.test"
                                                },
                                                {
                                                    displayName: "Fil",
                                                    type: ValueType.FILE,
                                                    key: "test2.fil"
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
                            type: ValueType.STRING,
                            key: "t2.navn"
                        },
                        {
                            displayName: "test2.epost",
                            type: ValueType.EMAIL,
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