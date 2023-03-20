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
    instanceElementMetadata: IInstanceElementMetadata[]; // TODO: remove old instanceElementMetadata
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
                    instanceObjectCollectionMetadata: [
                        {
                            displayName: 'vedlegg3',
                            key: 'vedlegg3',
                            objectMetadata: {
                                instanceValueMetadata: [
                                    {
                                        displayName: "vedlegg3.1",
                                        type: ValueType.STRING,
                                        key: "v3.1"
                                    },
                                    {
                                        displayName: "vedlegg3.2",
                                        type: ValueType.EMAIL,
                                        key: "v3.2"
                                    }
                                ],
                                instanceObjectCollectionMetadata: [],
                                categories: []
                            }
                        }
                    ],
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

export const MOCK_INSTANCE_EGRV_METADATA: IIntegrationMetadata = {
    "sourceApplicationId": "2",
    "sourceApplicationIntegrationId": "arkivsak",
    "sourceApplicationIntegrationUri": "",
    "integrationDisplayName": "Arkivsak",
    "version": 1,
    "instanceElementMetadata": [],
    "instanceMetadata": {
        "categories": [],
        "instanceValueMetadata": [
            {
                "displayName": "Kommunenummer",
                "type": ValueType.STRING,
                "key": "knr"
            },
            {
                "displayName": "Gårdsnummer",
                "type": ValueType.STRING,
                "key": "gnr"
            },
            {
                "displayName": "Bruksnummer",
                "type": ValueType.STRING,
                "key": "bnr"
            },
            {
                "displayName": "Festenummer",
                "type": ValueType.STRING,
                "key": "fnr"
            },
            {
                "displayName": "Seksjonsnummer",
                "type": ValueType.STRING,
                "key": "snr"
            },
            {
                "displayName": "Eierforholdskode",
                "type": ValueType.STRING,
                "key": "eierforholdskode"
            },
            {
                "displayName": "Eierforholdsnavn",
                "type": ValueType.STRING,
                "key": "eierforholdsnavn"
            },
            {
                "displayName": "Takstnummer",
                "type": ValueType.STRING,
                "key": "takstnummer"
            },
            {
                "displayName": "Prosjektnummer",
                "type": ValueType.STRING,
                "key": "prosjektnr"
            },
            {
                "displayName": "Prosjektnavn",
                "type": ValueType.STRING,
                "key": "prosjektnavn"
            },
            {
                "displayName": "Kommunenavn",
                "type": ValueType.STRING,
                "key": "kommunenavn"
            },
            {
                "displayName": "Adresse",
                "type": ValueType.STRING,
                "key": "adresse"
            },
            {
                "displayName": "Tittel",
                "type": ValueType.STRING,
                "key": "tittel"
            },
            {
                "displayName": "Saksansvarlig E-post",
                "type": ValueType.STRING,
                "key": "saksansvarligEpost"
            }
        ],
        "instanceObjectCollectionMetadata": [
            {
                "displayName": "Saksparter",
                "objectMetadata": {
                    "categories": [],
                    "instanceObjectCollectionMetadata": [],
                    "instanceValueMetadata": [
                        {
                            "displayName": "RolleID",
                            "type": ValueType.STRING,
                            "key": "sakspartRolleId"
                        },
                        {
                            "displayName": "Navn",
                            "type": ValueType.STRING,
                            "key": "navn"
                        },
                        {
                            "displayName": "Organisasjonsnummer",
                            "type": ValueType.STRING,
                            "key": "organisasjonsnummer"
                        },
                        {
                            "displayName": "E-post",
                            "type": ValueType.STRING,
                            "key": "epost"
                        },
                        {
                            "displayName": "Telefon",
                            "type": ValueType.STRING,
                            "key": "telefon"
                        },
                        {
                            "displayName": "Postadresse",
                            "type": ValueType.STRING,
                            "key": "postadresse"
                        },
                        {
                            "displayName": "Postnummer",
                            "type": ValueType.STRING,
                            "key": "postnummer"
                        },
                        {
                            "displayName": "Poststed",
                            "type": ValueType.STRING,
                            "key": "poststed"
                        }
                    ]
                },
                "key": "saksparter"
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