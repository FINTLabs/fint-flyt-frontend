import {FormTemplate, ITemplate} from "../types/NewForm/FormTemplate";

export const template: FormTemplate = {
    "objectTemplates": [
        {
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
                            "type": "DYNAMIC_STRING"
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
                            "type": "DYNAMIC_STRING"
                        }
                    }
                ],
                "selectableValueTemplates": [
                    {
                        "order": 2,
                        "elementConfig": {
                            "key": "saksmappetype",
                            "displayName": "Saksmappetype",
                            "description": ""
                        },
                        "template": {
                            "type": "SEARCH_SELECT",
                            "selectablesSources": [
                                {
                                    "urlTemplate": "api/intern/arkiv/kodeverk/saksmappetype"
                                }
                            ]
                        }
                    },
                    {
                        "order": 3,
                        "elementConfig": {
                            "key": "journalenhet",
                            "displayName": "Journalenhet",
                            "description": ""
                        },
                        "template": {
                            "type": "SEARCH_SELECT",
                            "selectablesSources": [
                                {
                                    "urlTemplate": "api/intern/arkiv/kodeverk/administrativenhet"
                                }
                            ]
                        }
                    },
                    {
                        "order": 4,
                        "elementConfig": {
                            "key": "administrativenhet",
                            "displayName": "Administrativ enhet",
                            "description": ""
                        },
                        "template": {
                            "type": "SEARCH_SELECT",
                            "selectablesSources": [
                                {
                                    "urlTemplate": "api/intern/arkiv/kodeverk/administrativenhet"
                                }
                            ]
                        }
                    },
                    {
                        "order": 5,
                        "elementConfig": {
                            "key": "saksansvarlig",
                            "displayName": "Saksansvarlig",
                            "description": ""
                        },
                        "template": {
                            "type": "SEARCH_SELECT",
                            "selectablesSources": [
                                {
                                    "urlTemplate": "api/intern/arkiv/kodeverk/arkivressurs"
                                }
                            ]
                        }
                    },
                    {
                        "order": 6,
                        "elementConfig": {
                            "key": "arkivdel",
                            "displayName": "Arkivdel",
                            "description": ""
                        },
                        "template": {
                            "type": "SEARCH_SELECT",
                            "selectablesSources": [
                                {
                                    "urlTemplate": "api/intern/arkiv/kodeverk/arkivdel"
                                }
                            ]
                        }
                    },
                    {
                        "order": 7,
                        "elementConfig": {
                            "key": "saksstatus",
                            "displayName": "Saksstatus",
                            "description": ""
                        },
                        "template": {
                            "type": "SEARCH_SELECT",
                            "selectablesSources": [
                                {
                                    "urlTemplate": "api/intern/arkiv/kodeverk/saksstatus"
                                }
                            ]
                        }
                    }
                ],
                "objectTemplates": [
                    {
                        "order": 8,
                        "elementConfig": {
                            "key": "skjerming",
                            "displayName": "Skjerming",
                            "description": ""
                        },
                        "template": {
                            "selectableValueTemplates": [
                                {
                                    "order": 0,
                                    "elementConfig": {
                                        "key": "tilgangsrestriksjon",
                                        "displayName": "Tilgangsrestriksjon",
                                        "description": ""
                                    },
                                    "template": {
                                        "type": "SEARCH_SELECT",
                                        "selectablesSources": [
                                            {
                                                "urlTemplate": "api/intern/arkiv/kodeverk/tilgangsrestriksjon"
                                            }
                                        ]
                                    }
                                },
                                {
                                    "order": 1,
                                    "elementConfig": {
                                        "key": "skjermingshjemmel",
                                        "displayName": "Skjermingshjemmel",
                                        "description": ""
                                    },
                                    "template": {
                                        "type": "SEARCH_SELECT",
                                        "selectablesSources": [
                                            {
                                                "urlTemplate": "api/intern/arkiv/kodeverk/skjermingshjemmel"
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                ],
                "objectCollectionTemplates": [
                    {
                        "order": 9,
                        "elementConfig": {
                            "key": "klassering",
                            "displayName": "Klassering",
                            "description": ""
                        },
                        "template": {
                            "objectTemplate": {
                                "valueTemplates": [
                                    {
                                        "order": 0,
                                        "elementConfig": {
                                            "key": "rekkefølge",
                                            "displayName": "Rekkefølge",
                                            "description": ""
                                        },
                                        "template": {
                                            "type": "STRING"
                                        }
                                    },
                                    {
                                        "order": 3,
                                        "elementConfig": {
                                            "key": "tittel",
                                            "displayName": "Tittel",
                                            "description": ""
                                        },
                                        "template": {
                                            "type": "DYNAMIC_STRING"
                                        }
                                    }
                                ],
                                "selectableValueTemplates": [
                                    {
                                        "order": 1,
                                        "elementConfig": {
                                            "key": "klassifikasjonssystem",
                                            "displayName": "Klassifikasjonssystem",
                                            "description": ""
                                        },
                                        "template": {
                                            "type": "SEARCH_SELECT",
                                            "selectablesSources": [
                                                {
                                                    "urlTemplate": "api/intern/arkiv/kodeverk/klassifikasjonssystem"
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        "order": 2,
                                        "elementConfig": {
                                            "key": "klasseId",
                                            "displayName": "KlasseID",
                                            "description": ""
                                        },
                                        "template": {
                                            "type": "DYNAMIC_STRING_OR_SEARCH_SELECT",
                                            "selectablesSources": [
                                                {
                                                    "urlTemplate": "api/intern/arkiv/kodeverk/klasse",
                                                    "valueKeyPerRequestParamKey": {
                                                        "klassifikasjonssystemLink": "klassifikasjonssystem"
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
                        "order": 10,
                        "elementConfig": {
                            "key": "journalpost",
                            "displayName": "Journalposter",
                            "description": ""
                        },
                        "template": {
                            "objectTemplate": {
                                "valueTemplates": [
                                    {
                                        "order": 0,
                                        "elementConfig": {
                                            "key": "tittel",
                                            "displayName": "Tittel",
                                            "description": ""
                                        },
                                        "template": {
                                            "type": "DYNAMIC_STRING"
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
                                            "type": "DYNAMIC_STRING"
                                        }
                                    }
                                ],
                                "selectableValueTemplates": [
                                    {
                                        "order": 2,
                                        "elementConfig": {
                                            "key": "journalposttype",
                                            "displayName": "Journalposttype",
                                            "description": ""
                                        },
                                        "template": {
                                            "type": "SEARCH_SELECT",
                                            "selectablesSources": [
                                                {
                                                    "urlTemplate": "api/intern/arkiv/kodeverk/journalposttype"
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        "order": 3,
                                        "elementConfig": {
                                            "key": "administrativEnhet",
                                            "displayName": "Administrativ enhet",
                                            "description": ""
                                        },
                                        "template": {
                                            "type": "SEARCH_SELECT",
                                            "selectablesSources": [
                                                {
                                                    "urlTemplate": "api/intern/arkiv/kodeverk/administrativenhet"
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        "order": 4,
                                        "elementConfig": {
                                            "key": "saksbehandler",
                                            "displayName": "Saksbehandler",
                                            "description": ""
                                        },
                                        "template": {
                                            "type": "SEARCH_SELECT",
                                            "selectablesSources": [
                                                {
                                                    "urlTemplate": "api/intern/arkiv/kodeverk/arkivressurs"
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        "order": 5,
                                        "elementConfig": {
                                            "key": "journalstatus",
                                            "displayName": "Journalstatus",
                                            "description": ""
                                        },
                                        "template": {
                                            "type": "SEARCH_SELECT",
                                            "selectablesSources": [
                                                {
                                                    "urlTemplate": "api/intern/arkiv/kodeverk/journalstatus"
                                                }
                                            ]
                                        }
                                    }
                                ],
                                "objectTemplates": [
                                    {
                                        "order": 6,
                                        "elementConfig": {
                                            "key": "skjerming",
                                            "displayName": "Skjerming",
                                            "description": ""
                                        },
                                        "template": {
                                            "selectableValueTemplates": [
                                                {
                                                    "order": 0,
                                                    "elementConfig": {
                                                        "key": "tilgangsrestriksjon",
                                                        "displayName": "Tilgangsrestriksjon",
                                                        "description": ""
                                                    },
                                                    "template": {
                                                        "type": "SEARCH_SELECT",
                                                        "selectablesSources": [
                                                            {
                                                                "urlTemplate": "api/intern/arkiv/kodeverk/tilgangsrestriksjon"
                                                            }
                                                        ]
                                                    }
                                                },
                                                {
                                                    "order": 1,
                                                    "elementConfig": {
                                                        "key": "skjermingshjemmel",
                                                        "displayName": "Skjermingshjemmel",
                                                        "description": ""
                                                    },
                                                    "template": {
                                                        "type": "SEARCH_SELECT",
                                                        "selectablesSources": [
                                                            {
                                                                "urlTemplate": "api/intern/arkiv/kodeverk/skjermingshjemmel"
                                                            }
                                                        ]
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                ],
                                "objectCollectionTemplates": [
                                    {
                                        "order": 7,
                                        "elementConfig": {
                                            "key": "korrespondansepart",
                                            "displayName": "Korrespondanseparter",
                                            "description": ""
                                        },
                                        "template": {
                                            "objectTemplate": {
                                                "valueTemplates": [
                                                    {
                                                        "order": 1,
                                                        "elementConfig": {
                                                            "key": "organisasjonsnummer",
                                                            "displayName": "Organisasjonsnummer",
                                                            "description": ""
                                                        },
                                                        "template": {
                                                            "type": "DYNAMIC_STRING"
                                                        }
                                                    },
                                                    {
                                                        "order": 2,
                                                        "elementConfig": {
                                                            "key": "fodselsnummer",
                                                            "displayName": "Fødselsnummer",
                                                            "description": ""
                                                        },
                                                        "template": {
                                                            "type": "DYNAMIC_STRING"
                                                        }
                                                    },
                                                    {
                                                        "order": 3,
                                                        "elementConfig": {
                                                            "key": "navn",
                                                            "displayName": "Navn",
                                                            "description": ""
                                                        },
                                                        "template": {
                                                            "type": "DYNAMIC_STRING"
                                                        }
                                                    }
                                                ],
                                                "selectableValueTemplates": [
                                                    {
                                                        "order": 0,
                                                        "elementConfig": {
                                                            "key": "korrespondanseparttype",
                                                            "displayName": "Korrespondanseparttype",
                                                            "description": ""
                                                        },
                                                        "template": {
                                                            "type": "SEARCH_SELECT",
                                                            "selectablesSources": [
                                                                {
                                                                    "urlTemplate": "api/intern/arkiv/kodeverk/skjermingshjemmel"
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ],
                                                "objectTemplates": [
                                                    {
                                                        "order": 4,
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
                                                                        "displayName": "Adresselinje",
                                                                        "description": ""
                                                                    },
                                                                    "template": {
                                                                        "type": "DYNAMIC_STRING"
                                                                    }
                                                                },
                                                                {
                                                                    "order": 1,
                                                                    "elementConfig": {
                                                                        "key": "postnummer",
                                                                        "displayName": "Postnummer",
                                                                        "description": ""
                                                                    },
                                                                    "template": {
                                                                        "type": "DYNAMIC_STRING"
                                                                    }
                                                                },
                                                                {
                                                                    "order": 2,
                                                                    "elementConfig": {
                                                                        "key": "poststed",
                                                                        "displayName": "Poststed",
                                                                        "description": ""
                                                                    },
                                                                    "template": {
                                                                        "type": "DYNAMIC_STRING"
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    },
                                                    {
                                                        "order": 5,
                                                        "elementConfig": {
                                                            "key": "kontaktinformasjon",
                                                            "displayName": "Kontaktinformasjon",
                                                            "description": ""
                                                        },
                                                        "template": {
                                                            "valueTemplates": [
                                                                {
                                                                    "order": 0,
                                                                    "elementConfig": {
                                                                        "key": "kontaktperson",
                                                                        "displayName": "Kontaktperson",
                                                                        "description": ""
                                                                    },
                                                                    "template": {
                                                                        "type": "DYNAMIC_STRING"
                                                                    }
                                                                },
                                                                {
                                                                    "order": 1,
                                                                    "elementConfig": {
                                                                        "key": "mobiltelefonnummer",
                                                                        "displayName": "Mobiltelefonnummer",
                                                                        "description": ""
                                                                    },
                                                                    "template": {
                                                                        "type": "DYNAMIC_STRING"
                                                                    }
                                                                },
                                                                {
                                                                    "order": 2,
                                                                    "elementConfig": {
                                                                        "key": "telefonnummer",
                                                                        "displayName": "Telefonnummer",
                                                                        "description": ""
                                                                    },
                                                                    "template": {
                                                                        "type": "DYNAMIC_STRING"
                                                                    }
                                                                },
                                                                {
                                                                    "order": 3,
                                                                    "elementConfig": {
                                                                        "key": "epost",
                                                                        "displayName": "E-post",
                                                                        "description": ""
                                                                    },
                                                                    "template": {
                                                                        "type": "DYNAMIC_STRING"
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    },
                                                    {
                                                        "order": 6,
                                                        "elementConfig": {
                                                            "key": "skjerming",
                                                            "displayName": "Skjerming",
                                                            "description": ""
                                                        },
                                                        "template": {
                                                            "selectableValueTemplates": [
                                                                {
                                                                    "order": 0,
                                                                    "elementConfig": {
                                                                        "key": "tilgangsrestriksjon",
                                                                        "displayName": "Tilgangsrestriksjon",
                                                                        "description": ""
                                                                    },
                                                                    "template": {
                                                                        "type": "SEARCH_SELECT",
                                                                        "selectablesSources": [
                                                                            {
                                                                                "urlTemplate": "api/intern/arkiv/kodeverk/tilgangsrestriksjon"
                                                                            }
                                                                        ]
                                                                    }
                                                                },
                                                                {
                                                                    "order": 1,
                                                                    "elementConfig": {
                                                                        "key": "skjermingshjemmel",
                                                                        "displayName": "Skjermingshjemmel",
                                                                        "description": ""
                                                                    },
                                                                    "template": {
                                                                        "type": "SEARCH_SELECT",
                                                                        "selectablesSources": [
                                                                            {
                                                                                "urlTemplate": "api/intern/arkiv/kodeverk/skjermingshjemmel"
                                                                            }
                                                                        ]
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
                                        "order": 8,
                                        "elementConfig": {
                                            "key": "dokumentbeskrivelse",
                                            "displayName": "Dokumentbeskrivelser",
                                            "description": ""
                                        },
                                        "template": {
                                            "objectTemplate": {
                                                "valueTemplates": [
                                                    {
                                                        "order": 0,
                                                        "elementConfig": {
                                                            "key": "tittel",
                                                            "displayName": "Tittel",
                                                            "description": ""
                                                        },
                                                        "template": {
                                                            "type": "DYNAMIC_STRING"
                                                        }
                                                    }
                                                ],
                                                "selectableValueTemplates": [
                                                    {
                                                        "order": 1,
                                                        "elementConfig": {
                                                            "key": "dokumentstatus",
                                                            "displayName": "Dokumentstatus",
                                                            "description": ""
                                                        },
                                                        "template": {
                                                            "type": "SEARCH_SELECT",
                                                            "selectablesSources": [
                                                                {
                                                                    "urlTemplate": "api/intern/kodeverk/dokumentstatus"
                                                                }
                                                            ]
                                                        }
                                                    },
                                                    {
                                                        "order": 2,
                                                        "elementConfig": {
                                                            "key": "dokumentType",
                                                            "displayName": "Dokumenttype",
                                                            "description": ""
                                                        },
                                                        "template": {
                                                            "type": "SEARCH_SELECT",
                                                            "selectablesSources": [
                                                                {
                                                                    "urlTemplate": "api/intern/kodeverk/dokumenttype"
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ],
                                                "objectCollectionTemplates": [
                                                    {
                                                        "order": 3,
                                                        "elementConfig": {
                                                            "key": "dokumentobjekt",
                                                            "displayName": "Dokumentobjekter",
                                                            "description": ""
                                                        },
                                                        "template": {
                                                            "objectTemplate": {
                                                                "valueTemplates": [
                                                                    {
                                                                        "order": 2,
                                                                        "elementConfig": {
                                                                            "key": "fil",
                                                                            "displayName": "Fil",
                                                                            "description": ""
                                                                        },
                                                                        "template": {
                                                                            "type": "FILE"
                                                                        }
                                                                    }
                                                                ],
                                                                "selectableValueTemplates": [
                                                                    {
                                                                        "order": 0,
                                                                        "elementConfig": {
                                                                            "key": "variantformat",
                                                                            "displayName": "Variantformat",
                                                                            "description": ""
                                                                        },
                                                                        "template": {
                                                                            "type": "SEARCH_SELECT",
                                                                            "selectablesSources": [
                                                                                {
                                                                                    "urlTemplate": "api/intern/arkiv/kodeverk/variantformat"
                                                                                }
                                                                            ]
                                                                        }
                                                                    },
                                                                    {
                                                                        "order": 1,
                                                                        "elementConfig": {
                                                                            "key": "filformat",
                                                                            "displayName": "Filformat",
                                                                            "description": ""
                                                                        },
                                                                        "template": {
                                                                            "type": "SEARCH_SELECT",
                                                                            "selectablesSources": [
                                                                                {
                                                                                    "urlTemplate": "api/intern/arkiv/kodeverk/format"
                                                                                }
                                                                            ]
                                                                        }
                                                                    }
                                                                ]
                                                            }
                                                        }
                                                    }
                                                ]
                                            }
                                        }
                                    }
                                ]
                            }
                        }
                    }
                ]
            }
        }
    ]
}