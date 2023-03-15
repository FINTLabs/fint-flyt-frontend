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
                "order": 5,
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
        ],
        "objectTemplates": [{
            "order": 4,
            "elementConfig": {
                "key": "journalpost",
                "displayName": "Journalpost",
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
        }],
        "objectCollectionTemplates": [{
            "order": 6,
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
        }]
    }
}
