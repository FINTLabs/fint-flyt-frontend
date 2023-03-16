import {IElementTemplate, IObjectTemplate, SelectableValueType, ValueType} from "../types/FormTemplate";

export const testObjectTemplateSak: IElementTemplate<IObjectTemplate> = {
    "order": 0,
    "elementConfig": {
        "key": "sak",
        "displayName": "Sak",
        "description": ""
    },
    "template": {
        "valueTemplates": [
            {
                "order": 0,
                "elementConfig": {
                    "key": "tittel",
                    "displayName": "Tittel",
                    "description": ""
                },
                "template": {
                    "type": ValueType.DYNAMIC_STRING
                }
            },
            {
                "order": 1,
                "elementConfig": {
                    "key": "offentligTittel",
                    "displayName": "Offentlig tittel",
                    "description": ""
                },
                "template": {
                    "type": ValueType.DYNAMIC_STRING
                }
            },
            {
                "order": 2,
                "elementConfig": {
                    "key": "fil",
                    "displayName": "Fil",
                    "description": ""
                },
                "template": {
                    "type": ValueType.FILE
                }
            }
        ],
        "objectTemplates": [{
            "order": 4,
            "elementConfig": {
                "key": "klassering",
                "displayName": "Klassering",
                "description": ""
            },
            "template": {
                "selectableValueTemplates": [
                    {
                        "order": 2,
                        "elementConfig": {
                            "key": "klassifikasjonssystem",
                            "displayName": "Klassifikasjonssystem",
                            "description": ""
                        },
                        "template": {
                            "type": SelectableValueType.SEARCH_SELECT,
                            "selectables": [
                                {
                                    displayName: "Statisk valg 1",
                                    value: "value1"
                                },
                                {
                                    displayName: "Statisk valg 2",
                                    value: "value2"
                                }
                            ],
                            "selectablesSources": [
                                {
                                    "urlTemplate": "api/intern/arkiv/kodeverk/klassifikasjonssystem"
                                }
                            ]
                        }
                    },
                    {
                        "order": 3,
                        "elementConfig": {
                            "key": "klasseId",
                            "displayName": "KlasseID",
                            "description": ""
                        },
                        "template": {
                            "type": SelectableValueType.SEARCH_SELECT,
                            "selectables": [
                                {
                                    displayName: "Statisk valg 1",
                                    value: "value1"
                                },
                                {
                                    displayName: "Statisk valg 2",
                                    value: "value2"
                                }
                            ],
                            "selectablesSources": [
                                {
                                    "urlTemplate": "api/intern/arkiv/kodeverk/klasse",
                                    "valueRefPerRequestParamKey": {
                                        "klassifikasjonssystemLink": "../klassifikasjonssystem.mappingString"
                                    }
                                },
                                {
                                    "urlTemplate": "api/intern/arkiv/{a}/saksmappetype",
                                    "valueRefPerPathParamKey": {
                                        "a": "../tittel.mappingString"
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        }],
        "objectCollectionTemplates": [{
            "order": 5,
            "elementConfig": {
                "key": "journalposter",
                "displayName": "Journalposter",
                "description": ""
            },
            template: {
                "elementTemplate": {
                    "valueTemplates": [
                        {
                            "order": 0,
                            "elementConfig": {
                                "key": "tittel",
                                "displayName": "Tittel",
                                "description": ""
                            },
                            "template": {
                                "type": ValueType.DYNAMIC_STRING
                            }
                        },
                        {
                            "order": 1,
                            "elementConfig": {
                                "key": "offentligTittel",
                                "displayName": "Offentlig tittel",
                                "description": ""
                            },
                            "template": {
                                "type": ValueType.DYNAMIC_STRING
                            }
                        }
                    ],
                    "objectTemplates": [
                        {
                            "order": 2,
                            "elementConfig": {
                                "key": "avsender",
                                "displayName": "Avsender",
                                "description": ""
                            },
                            "template": {
                                "valueTemplates": [
                                    {
                                        "order": 0,
                                        "elementConfig": {
                                            "key": "fornavn",
                                            "displayName": "Fornavn",
                                            "description": ""
                                        },
                                        "template": {
                                            "type": ValueType.DYNAMIC_STRING
                                        }
                                    },
                                    {
                                        "order": 1,
                                        "elementConfig": {
                                            "key": "etternavn",
                                            "displayName": "Etternavn",
                                            "description": ""
                                        },
                                        "template": {
                                            "type": ValueType.DYNAMIC_STRING
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }
            }
        },
            {
                "order": 6,
                "elementConfig": {
                    "key": "part",
                    "displayName": "Parter",
                    "description": ""
                },
                template: {
                    "elementTemplate": {
                        "valueTemplates": [
                            {
                                "order": 0,
                                "elementConfig": {
                                    "key": "fornavn",
                                    "displayName": "Fornavn",
                                    "description": ""
                                },
                                "template": {
                                    "type": ValueType.DYNAMIC_STRING
                                }
                            },
                            {
                                "order": 1,
                                "elementConfig": {
                                    "key": "etternavn",
                                    "displayName": "Etternavn",
                                    "description": ""
                                },
                                "template": {
                                    "type": ValueType.DYNAMIC_STRING
                                }
                            }
                        ],
                        "objectTemplates": [
                            {
                                "order": 2,
                                "elementConfig": {
                                    "key": "adresse",
                                    "displayName": "Adresse",
                                    "description": ""
                                },
                                "template": {
                                    "valueTemplates": [
                                        {
                                            "order": 0,
                                            "elementConfig": {
                                                "key": "adresselinje",
                                                "displayName": "Adresse",
                                                "description": ""
                                            },
                                            "template": {
                                                "type": ValueType.DYNAMIC_STRING
                                            }
                                        },
                                        {
                                            "order": 1,
                                            "elementConfig": {
                                                "key": "poststed",
                                                "displayName": "Poststed",
                                                "description": ""
                                            },
                                            "template": {
                                                "type": ValueType.DYNAMIC_STRING
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                }
            }]
    }
}
