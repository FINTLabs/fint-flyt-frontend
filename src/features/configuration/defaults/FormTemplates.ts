import {IElementTemplate, IObjectTemplate, SelectableValueType, ValueType} from "../types/FormTemplate";

export const testObjectTemplateSak: IElementTemplate<IObjectTemplate> =
    {
        "order": 0,
        "elementConfig": {
            "key": "sak",
            "displayName": "Sak",
            "description": ""
        },
        "template": {
            "valueTemplates": [],
            "selectableValueTemplates": [
                {
                    "order": 0,
                    "elementConfig": {
                        "key": "type",
                        "displayName": "Sakslogikk",
                        "description": "Integrasjonslogikk"
                    },
                    "template": {
                        "type": SelectableValueType.DROPDOWN,
                        "selectables": [
                            {
                                "displayName": "Ny sak",
                                "value": "NEW"
                            },
                            {
                                "displayName": "På saksnummer",
                                "value": "BY_ID"
                            }
                        ]
                    }
                }
            ],
            "objectTemplates": [
                {
                    "order": 1,
                    "elementConfig": {
                        "key": "new",
                        "displayName": "Ny sak",
                        "description": "",
                        "showDependency": {
                            "hasAnyCombination": [
                                [
                                    {
                                        "key": "type",
                                        "defined": true,
                                        "value": "NEW"
                                    }
                                ],
                                [
                                    {
                                        "key": "type",
                                        "defined": true,
                                        "value": "BY_SEARCH_OR_NEW"
                                    }
                                ]
                            ]
                        }
                    },
                    "template": {
                        "valueTemplates": [
                            {
                                "order": 0,
                                "elementConfig": {
                                    "key": "tittel",
                                    "displayName": "Tittel",
                                    "description": "Tittel eller navn på arkivenheten"
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
                                    "description": "Offentlig tittel på arkivenheten, ord som skal skjermes er fjernet fra innholdet i tittelen (erstattet med ******)"
                                },
                                "template": {
                                    "type": ValueType.DYNAMIC_STRING
                                }
                            }
                        ],
                        "selectableValueTemplates": [
                            {
                                "order": 2,
                                "elementConfig": {
                                    "key": "saksmappetype",
                                    "displayName": "Saksmappetype",
                                    "description": "Type saksmappe."
                                },
                                "template": {
                                    "type": SelectableValueType.SEARCH_SELECT,
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
                                    "description": "Navn på enhet som har det arkivmessige ansvaret for kvalitetssikring av arkivdanningen, og eventuelt registrering (journalføring) og arkivering av fysiske dokumenter."
                                },
                                "template": {
                                    "type": SelectableValueType.SEARCH_SELECT,
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
                                    "description": "Navn på avdeling, kontor eller annen administrativ enhet som har ansvaret for saksbehandlingen."
                                },
                                "template": {
                                    "type": SelectableValueType.SEARCH_SELECT,
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
                                    "description": "Navn på person som er saksansvarlig."
                                },
                                "template": {
                                    "type": SelectableValueType.SEARCH_SELECT,
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
                                    "description": "Arkivdel som mappe tilhører."
                                },
                                "template": {
                                    "type": SelectableValueType.SEARCH_SELECT,
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
                                    "description": "Registreres automatisk gjennom forskjellig saksbehandlings- funksjonalitet, eller overstyres manuelt."
                                },
                                "template": {
                                    "type": SelectableValueType.SEARCH_SELECT,
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
                                    "description": "Skjerming av mappe"
                                },
                                "template": {
                                    "selectableValueTemplates": [
                                        {
                                            "order": 0,
                                            "elementConfig": {
                                                "key": "tilgangsrestriksjon",
                                                "displayName": "Tilgangsrestriksjon",
                                                "description": "Tilgangsrestriksjon"
                                            },
                                            "template": {
                                                "type": SelectableValueType.SEARCH_SELECT,
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
                                                "description": "Skjermingshjemmel"
                                            },
                                            "template": {
                                                "type": SelectableValueType.SEARCH_SELECT,
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
                                    "description": "Klassifisering av mappe"
                                },
                                "template": {
                                    "elementTemplate": {
                                        "valueTemplates": [
                                            {
                                                "order": 0,
                                                "elementConfig": {
                                                    "key": "rekkefølge",
                                                    "displayName": "Rekkefølge",
                                                    "description": "Rekkefølge for klasseringer"
                                                },
                                                "template": {
                                                    "type": ValueType.STRING
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
                                                    "type": ValueType.DYNAMIC_STRING
                                                }
                                            }
                                        ],
                                        "selectableValueTemplates": [
                                            {
                                                "order": 1,
                                                "elementConfig": {
                                                    "key": "klassifikasjonssystem",
                                                    "displayName": "Klassifikasjonssystem",
                                                    "description": "Klassifikasjonssystem klassen tilhører"
                                                },
                                                "template": {
                                                    "type": SelectableValueType.SEARCH_SELECT,
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
                                                    "description": "Entydig identifikasjon av klassen innenfor klassifikasjonssystemet."
                                                },
                                                "template": {
                                                    "type": SelectableValueType.DYNAMIC_STRING_OR_SEARCH_SELECT,
                                                    "selectablesSources": [
                                                        {
                                                            "urlTemplate": "api/intern/arkiv/kodeverk/klasse",
                                                            "valueRefPerRequestParamKey": {
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
                                    "elementTemplate": {
                                        "valueTemplates": [
                                            {
                                                "order": 0,
                                                "elementConfig": {
                                                    "key": "tittel",
                                                    "displayName": "Tittel",
                                                    "description": "Tittel eller navn på arkivenheten"
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
                                                    "description": "Offentlig tittel på arkivenheten, ord som skal skjermes er fjernet fra innholdet i tittelen (erstattet med ******)"
                                                },
                                                "template": {
                                                    "type": ValueType.DYNAMIC_STRING
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
                                                    "type": SelectableValueType.SEARCH_SELECT,
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
                                                    "type": SelectableValueType.SEARCH_SELECT,
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
                                                    "type": SelectableValueType.SEARCH_SELECT,
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
                                                    "type": SelectableValueType.SEARCH_SELECT,
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
                                                                "type": SelectableValueType.SEARCH_SELECT,
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
                                                                "type": SelectableValueType.SEARCH_SELECT,
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
                                                    "elementTemplate": {
                                                        "valueTemplates": [
                                                            {
                                                                "order": 1,
                                                                "elementConfig": {
                                                                    "key": "organisasjonsnummer",
                                                                    "displayName": "Organisasjonsnummer",
                                                                    "description": ""
                                                                },
                                                                "template": {
                                                                    "type": ValueType.DYNAMIC_STRING
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
                                                                    "type": ValueType.DYNAMIC_STRING
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
                                                                    "type": ValueType.DYNAMIC_STRING
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
                                                                    "type": SelectableValueType.SEARCH_SELECT,
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
                                                                                "type": ValueType.DYNAMIC_STRING
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
                                                                                "type": ValueType.DYNAMIC_STRING
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
                                                                                "type": ValueType.DYNAMIC_STRING
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
                                                                                "type": ValueType.DYNAMIC_STRING
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
                                                                                "type": ValueType.DYNAMIC_STRING
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
                                                                                "type": ValueType.DYNAMIC_STRING
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
                                                                                "type": ValueType.DYNAMIC_STRING
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
                                                                                "type": SelectableValueType.SEARCH_SELECT,
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
                                                                                "type": SelectableValueType.SEARCH_SELECT,
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
                                                                    "type": SelectableValueType.SEARCH_SELECT,
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
                                                                    "type": SelectableValueType.SEARCH_SELECT,
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
                                                                    "elementTemplate": {
                                                                        "valueTemplates": [
                                                                            {
                                                                                "order": 2,
                                                                                "elementConfig": {
                                                                                    "key": "fil",
                                                                                    "displayName": "Fil",
                                                                                    "description": "Her kan du kun bruke metadata"
                                                                                },
                                                                                "template": {
                                                                                    "type": ValueType.FILE
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
                                                                                    "type": SelectableValueType.SEARCH_SELECT,
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
                                                                                    "type": SelectableValueType.SEARCH_SELECT,
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
                            },
                            {
                                "order": 10,
                                "elementConfig": {
                                    "key": "part",
                                    "displayName": "Parter",
                                    "description": ""
                                },
                                "template": {
                                    "elementTemplate": {
                                        "valueTemplates": [
                                            {
                                                "order": 1,
                                                "elementConfig": {
                                                    "key": "organisasjonsnummer",
                                                    "displayName": "Organisasjonsnummer",
                                                    "description": ""
                                                },
                                                "template": {
                                                    "type": ValueType.DYNAMIC_STRING
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
                                                    "type": ValueType.DYNAMIC_STRING
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
                                                    "type": ValueType.DYNAMIC_STRING
                                                }
                                            }
                                        ],
                                        "selectableValueTemplates": [
                                            {
                                                "order": 0,
                                                "elementConfig": {
                                                    "key": "parttype",
                                                    "displayName": "Parttype",
                                                    "description": ""
                                                },
                                                "template": {
                                                    "type": SelectableValueType.SEARCH_SELECT,
                                                    "selectablesSources": [
                                                        {
                                                            "urlTemplate": "api/intern/arkiv/kodeverk/part"
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
                                                                "type": ValueType.DYNAMIC_STRING
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
                                                                "type": ValueType.DYNAMIC_STRING
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
                                                                "type": ValueType.DYNAMIC_STRING
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
                                                                "type": ValueType.DYNAMIC_STRING
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
                                                                "type": ValueType.DYNAMIC_STRING
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
                                                                "type": ValueType.DYNAMIC_STRING
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
                                                                "type": ValueType.DYNAMIC_STRING
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
                                                                "type": SelectableValueType.SEARCH_SELECT,
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
                                                                "type": SelectableValueType.SEARCH_SELECT,
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
                            }
                        ]
                    }
                }
            ],
            "objectCollectionTemplates": []
        }
    }

