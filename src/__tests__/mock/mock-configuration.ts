// noinspection DuplicatedCode


import {
    IConfigurationPatch,
    IConfiguration
} from "../../features/configuration/types/Configuration";
import {FieldType} from "../../features/configuration/types/Configuration";

export const MOCK_CONFIGURATION: IConfiguration = {
    "comment": "form to test mapping",
    "completed": false,
    "id": "123",
    "integrationId": "id0",
    "integrationMetadataId": 321,
    "mapping": {
        "objectCollectionMappingPerKey": {},
        "objectMappingPerKey": {
            "journalpost": {
                "objectCollectionMappingPerKey": {
                    "dokumentbeskrivelse": {
                        "objectMappings": [
                            {
                                "objectCollectionMappingPerKey": {
                                    "dokumentobjekt": {
                                        "objectMappings": [
                                            {
                                                "objectCollectionMappingPerKey": {},
                                                "objectMappingPerKey": {},
                                                "valueCollectionMappingPerKey": {},
                                                "valueMappingPerKey": {
                                                    "fil": {
                                                        "mappingString": "$if{skjemaPdf}",
                                                        "type": "FILE"
                                                    },
                                                    "filformat": {
                                                        "mappingString": "www.kodeverk.no/A",
                                                        "type": "STRING"
                                                    },
                                                    "variantformat": {
                                                        "mappingString": "www.kodeverk.no/PDF",
                                                        "type": "STRING"
                                                    }
                                                }
                                            }
                                        ],
                                        "objectsFromCollectionMappings": []
                                    }
                                },
                                "objectMappingPerKey": {},
                                "valueCollectionMappingPerKey": {},
                                "valueMappingPerKey": {
                                    "dokumentType": {
                                        "mappingString": "cat8",
                                        "type": "STRING"
                                    },
                                    "dokumentstatus": {
                                        "mappingString": "D9",
                                        "type": "STRING"
                                    },
                                    "tilknyttetRegistreringSom": {
                                        "mappingString": "www.kodeverk.no/H",
                                        "type": "STRING"
                                    },
                                    "tittel": {
                                        "mappingString": "record title",
                                        "type": "DYNAMIC_STRING"
                                    }
                                }
                            }
                        ],
                        "objectsFromCollectionMappings": [
                            {
                                "instanceCollectionReferencesOrdered": [
                                    "$if{vedlegg}"
                                ],
                                "objectMapping": {
                                    "objectCollectionMappingPerKey": {
                                        "dokumentobjekt": {
                                            "objectMappings": [
                                                {
                                                    "objectCollectionMappingPerKey": {},
                                                    "objectMappingPerKey": {},
                                                    "valueCollectionMappingPerKey": {},
                                                    "valueMappingPerKey": {
                                                        "fil": {
                                                            "mappingString": "$icf{0}{fil}",
                                                            "type": "FILE"
                                                        },
                                                        "filformat": {
                                                            "mappingString": "www.kodeverk.no/PDF",
                                                            "type": "STRING"
                                                        },
                                                        "variantformat": {
                                                            "mappingString": "www.kodeverk.no/PDF",
                                                            "type": "STRING"
                                                        }
                                                    }
                                                }
                                            ],
                                            "objectsFromCollectionMappings": []
                                        }
                                    },
                                    "objectMappingPerKey": {},
                                    "valueCollectionMappingPerKey": {},
                                    "valueMappingPerKey": {
                                        "dokumentType": {
                                            "mappingString": "cat8",
                                            "type": "STRING"
                                        },
                                        "dokumentstatus": {
                                            "mappingString": "D9",
                                            "type": "STRING"
                                        },
                                        "tilknyttetRegistreringSom": {
                                            "mappingString": "www.kodeverk.no/V",
                                            "type": "STRING"
                                        },
                                        "tittel": {
                                            "mappingString": "record title",
                                            "type": "DYNAMIC_STRING"
                                        }
                                    }
                                }
                            }
                        ]
                    },
                    "korrespondansepart": {
                        "objectMappings": [
                            {
                                "objectCollectionMappingPerKey": {},
                                "objectMappingPerKey": {
                                    "adresse": {
                                        "objectCollectionMappingPerKey": {},
                                        "objectMappingPerKey": {},
                                        "valueCollectionMappingPerKey": {},
                                        "valueMappingPerKey": {
                                            "adresselinje": {
                                                "mappingString": "highstreet 22",
                                                "type": "DYNAMIC_STRING"
                                            },
                                            "postnummer": {
                                                "mappingString": "1234",
                                                "type": "DYNAMIC_STRING"
                                            },
                                            "poststed": {
                                                "mappingString": "Moria",
                                                "type": "DYNAMIC_STRING"
                                            }
                                        }
                                    },
                                    "kontaktinformasjon": {
                                        "objectCollectionMappingPerKey": {},
                                        "objectMappingPerKey": {},
                                        "valueCollectionMappingPerKey": {},
                                        "valueMappingPerKey": {
                                            "epostadresse": {
                                                "mappingString": "hello@world.no",
                                                "type": "DYNAMIC_STRING"
                                            },
                                            "mobiltelefonnummer": {
                                                "mappingString": "12345678",
                                                "type": "DYNAMIC_STRING"
                                            },
                                            "telefonnummer": {
                                                "mappingString": "12345678",
                                                "type": "DYNAMIC_STRING"
                                            }
                                        }
                                    },
                                    "skjerming": {
                                        "objectCollectionMappingPerKey": {},
                                        "objectMappingPerKey": {},
                                        "valueCollectionMappingPerKey": {},
                                        "valueMappingPerKey": {
                                            "skjermingshjemmel": {
                                                "mappingString": "p3",
                                                "type": "STRING"
                                            },
                                            "tilgangsrestriksjon": {
                                                "mappingString": "code2",
                                                "type": "STRING"
                                            }
                                        }
                                    }
                                },
                                "valueCollectionMappingPerKey": {},
                                "valueMappingPerKey": {
                                    "fødselsnummer": {
                                        "mappingString": "123456789",
                                        "type": "DYNAMIC_STRING"
                                    },
                                    "kontaktperson": {
                                        "mappingString": "donna",
                                        "type": "DYNAMIC_STRING"
                                    },
                                    "korrespondansepartNavn": {
                                        "mappingString": "Anakin Skywalker",
                                        "type": "DYNAMIC_STRING"
                                    },
                                    "korrespondanseparttype": {
                                        "mappingString": "avsender",
                                        "type": "STRING"
                                    }
                                }
                            }
                        ],
                        "objectsFromCollectionMappings": []
                    }
                },
                "objectMappingPerKey": {
                    "skjerming": {
                        "objectCollectionMappingPerKey": {},
                        "objectMappingPerKey": {},
                        "valueCollectionMappingPerKey": {},
                        "valueMappingPerKey": {
                            "skjermingshjemmel": {
                                "mappingString": "p34",
                                "type": "STRING"
                            },
                            "tilgangsrestriksjon": {
                                "mappingString": "code89",
                                "type": "STRING"
                            }
                        }
                    }
                },
                "valueCollectionMappingPerKey": {},
                "valueMappingPerKey": {
                    "administrativenhet": {
                        "mappingString": "unit33",
                        "type": "STRING"
                    },
                    "journalposttype": {
                        "mappingString": "A",
                        "type": "STRING"
                    },
                    "journalstatus": {
                        "mappingString": "N",
                        "type": "STRING"
                    },
                    "offentligTittel": {
                        "mappingString": "public record title",
                        "type": "DYNAMIC_STRING"
                    },
                    "saksbehandler": {
                        "mappingString": "boba",
                        "type": "STRING"
                    },
                    "tittel": {
                        "mappingString": "record title",
                        "type": "DYNAMIC_STRING"
                    }
                }
            },
            "sak": {
                "objectCollectionMappingPerKey": {},
                "objectMappingPerKey": {
                    "ny": {
                        "objectCollectionMappingPerKey": {
                            "klasse": {
                                "objectMappings": [
                                    {
                                        "objectCollectionMappingPerKey": {},
                                        "objectMappingPerKey": {},
                                        "valueCollectionMappingPerKey": {},
                                        "valueMappingPerKey": {
                                            "klasseId": {
                                                "mappingString": "1class",
                                                "type": "DYNAMIC_STRING"
                                            },
                                            "klassifikasjonssystem": {
                                                "mappingString": "prim",
                                                "type": "STRING"
                                            },
                                            "rekkefølge": {
                                                "mappingString": "0",
                                                "type": "STRING"
                                            },
                                            "tittel": {
                                                "mappingString": "primTitle",
                                                "type": "DYNAMIC_STRING"
                                            }
                                        }
                                    },
                                    {
                                        "objectCollectionMappingPerKey": {},
                                        "objectMappingPerKey": {},
                                        "valueCollectionMappingPerKey": {},
                                        "valueMappingPerKey": {
                                            "klasseId": {
                                                "mappingString": "2class",
                                                "type": "DYNAMIC_STRING"
                                            },
                                            "klassifikasjonssystem": {
                                                "mappingString": "rose",
                                                "type": "STRING"
                                            },
                                            "rekkefølge": {
                                                "mappingString": "1",
                                                "type": "STRING"
                                            },
                                            "tittel": {
                                                "mappingString": "secTitle",
                                                "type": "DYNAMIC_STRING"
                                            }
                                        }
                                    },
                                    {
                                        "objectCollectionMappingPerKey": {},
                                        "objectMappingPerKey": {},
                                        "valueCollectionMappingPerKey": {},
                                        "valueMappingPerKey": {
                                            "klasseId": {
                                                "mappingString": "3class",
                                                "type": "DYNAMIC_STRING"
                                            },
                                            "klassifikasjonssystem": {
                                                "mappingString": "everdeen",
                                                "type": "STRING"
                                            },
                                            "rekkefølge": {
                                                "mappingString": "2",
                                                "type": "STRING"
                                            },
                                            "tittel": {
                                                "mappingString": "tertTitle",
                                                "type": "DYNAMIC_STRING"
                                            }
                                        }
                                    }
                                ],
                                "objectsFromCollectionMappings": []
                            }
                        },
                        "objectMappingPerKey": {
                            "skjerming": {
                                "objectCollectionMappingPerKey": {},
                                "objectMappingPerKey": {},
                                "valueCollectionMappingPerKey": {},
                                "valueMappingPerKey": {
                                    "skjermingshjemmel": {
                                        "mappingString": "number6",
                                        "type": "STRING"
                                    },
                                    "tilgangsrestriksjon": {
                                        "mappingString": "code42",
                                        "type": "STRING"
                                    }
                                }
                            }
                        },
                        "valueCollectionMappingPerKey": {},
                        "valueMappingPerKey": {
                            "administrativenhet": {
                                "mappingString": "unit4",
                                "type": "STRING"
                            },
                            "arkivdel": {
                                "mappingString": "unit3",
                                "type": "STRING"
                            },
                            "journalenhet": {
                                "mappingString": "unit0",
                                "type": "STRING"
                            },
                            "offentligTittel": {
                                "mappingString": "public title",
                                "type": "DYNAMIC_STRING"
                            },
                            "saksansvarlig": {
                                "mappingString": "rand",
                                "type": "STRING"
                            },
                            "saksmappetype": {
                                "mappingString": "casetype",
                                "type": "STRING"
                            },
                            "tittel": {
                                "mappingString": "Title of case",
                                "type": "DYNAMIC_STRING"
                            }
                        }
                    }
                },
                "valueCollectionMappingPerKey": {},
                "valueMappingPerKey": {
                    "type": {
                        "mappingString": "NEW",
                        "type": "STRING"
                    }
                }
            }
        },
        "valueCollectionMappingPerKey": {},
        "valueMappingPerKey": {}
    }
}

export const MOCK_CONFIGURATION_PATCH: IConfigurationPatch = {
    "comment": "form to test mapping",
    "completed": false,
    "integrationMetadataId": 321,
    "mapping": {
        "objectCollectionMappingPerKey": {},
        "objectMappingPerKey": {
            "journalpost": {
                "objectCollectionMappingPerKey": {
                    "dokumentbeskrivelse": {
                        "objectMappings": [
                            {
                                "objectCollectionMappingPerKey": {
                                    "dokumentobjekt": {
                                        "objectMappings": [
                                            {
                                                "objectCollectionMappingPerKey": {},
                                                "objectMappingPerKey": {},
                                                "valueCollectionMappingPerKey": {},
                                                "valueMappingPerKey": {
                                                    "fil": {
                                                        "mappingString": "$if{skjemaPdf}",
                                                        "type": "FILE"
                                                    },
                                                    "filformat": {
                                                        "mappingString": "www.kodeverk.no/A",
                                                        "type": "STRING"
                                                    },
                                                    "variantformat": {
                                                        "mappingString": "www.kodeverk.no/PDF",
                                                        "type": "STRING"
                                                    }
                                                }
                                            }
                                        ],
                                        "objectsFromCollectionMappings": []
                                    }
                                },
                                "objectMappingPerKey": {},
                                "valueCollectionMappingPerKey": {},
                                "valueMappingPerKey": {
                                    "dokumentType": {
                                        "mappingString": "cat8",
                                        "type": "STRING"
                                    },
                                    "dokumentstatus": {
                                        "mappingString": "D9",
                                        "type": "STRING"
                                    },
                                    "tilknyttetRegistreringSom": {
                                        "mappingString": "www.kodeverk.no/H",
                                        "type": "STRING"
                                    },
                                    "tittel": {
                                        "mappingString": "record title",
                                        "type": "DYNAMIC_STRING"
                                    }
                                }
                            }
                        ],
                        "objectsFromCollectionMappings": [
                            {
                                "instanceCollectionReferencesOrdered": [
                                    "$if{vedlegg}"
                                ],
                                "objectMapping": {
                                    "objectCollectionMappingPerKey": {
                                        "dokumentobjekt": {
                                            "objectMappings": [
                                                {
                                                    "objectCollectionMappingPerKey": {},
                                                    "objectMappingPerKey": {},
                                                    "valueCollectionMappingPerKey": {},
                                                    "valueMappingPerKey": {
                                                        "fil": {
                                                            "mappingString": "$icf{0}{fil}",
                                                            "type": "FILE"
                                                        },
                                                        "filformat": {
                                                            "mappingString": "www.kodeverk.no/PDF",
                                                            "type": "STRING"
                                                        },
                                                        "variantformat": {
                                                            "mappingString": "www.kodeverk.no/PDF",
                                                            "type": "STRING"
                                                        }
                                                    }
                                                }
                                            ],
                                            "objectsFromCollectionMappings": []
                                        }
                                    },
                                    "objectMappingPerKey": {},
                                    "valueCollectionMappingPerKey": {},
                                    "valueMappingPerKey": {
                                        "dokumentType": {
                                            "mappingString": "cat8",
                                            "type": "STRING"
                                        },
                                        "dokumentstatus": {
                                            "mappingString": "D9",
                                            "type": "STRING"
                                        },
                                        "tilknyttetRegistreringSom": {
                                            "mappingString": "www.kodeverk.no/V",
                                            "type": "STRING"
                                        },
                                        "tittel": {
                                            "mappingString": "record title",
                                            "type": "DYNAMIC_STRING"
                                        }
                                    }
                                }
                            }
                        ]
                    },
                    "korrespondansepart": {
                        "objectMappings": [
                            {
                                "objectCollectionMappingPerKey": {},
                                "objectMappingPerKey": {
                                    "adresse": {
                                        "objectCollectionMappingPerKey": {},
                                        "objectMappingPerKey": {},
                                        "valueCollectionMappingPerKey": {},
                                        "valueMappingPerKey": {
                                            "adresselinje": {
                                                "mappingString": "highstreet 22",
                                                "type": "DYNAMIC_STRING"
                                            },
                                            "postnummer": {
                                                "mappingString": "1234",
                                                "type": "DYNAMIC_STRING"
                                            },
                                            "poststed": {
                                                "mappingString": "Moria",
                                                "type": "DYNAMIC_STRING"
                                            }
                                        }
                                    },
                                    "kontaktinformasjon": {
                                        "objectCollectionMappingPerKey": {},
                                        "objectMappingPerKey": {},
                                        "valueCollectionMappingPerKey": {},
                                        "valueMappingPerKey": {
                                            "epostadresse": {
                                                "mappingString": "hello@world.no",
                                                "type": "DYNAMIC_STRING"
                                            },
                                            "mobiltelefonnummer": {
                                                "mappingString": "12345678",
                                                "type": "DYNAMIC_STRING"
                                            },
                                            "telefonnummer": {
                                                "mappingString": "12345678",
                                                "type": "DYNAMIC_STRING"
                                            }
                                        }
                                    },
                                    "skjerming": {
                                        "objectCollectionMappingPerKey": {},
                                        "objectMappingPerKey": {},
                                        "valueCollectionMappingPerKey": {},
                                        "valueMappingPerKey": {
                                            "skjermingshjemmel": {
                                                "mappingString": "p3",
                                                "type": "STRING"
                                            },
                                            "tilgangsrestriksjon": {
                                                "mappingString": "code2",
                                                "type": "STRING"
                                            }
                                        }
                                    }
                                },
                                "valueCollectionMappingPerKey": {},
                                "valueMappingPerKey": {
                                    "fødselsnummer": {
                                        "mappingString": "123456789",
                                        "type": "DYNAMIC_STRING"
                                    },
                                    "kontaktperson": {
                                        "mappingString": "donna",
                                        "type": "DYNAMIC_STRING"
                                    },
                                    "korrespondansepartNavn": {
                                        "mappingString": "Anakin Skywalker",
                                        "type": "DYNAMIC_STRING"
                                    },
                                    "korrespondanseparttype": {
                                        "mappingString": "avsender",
                                        "type": "STRING"
                                    }
                                }
                            }
                        ],
                        "objectsFromCollectionMappings": []
                    }
                },
                "objectMappingPerKey": {
                    "skjerming": {
                        "objectCollectionMappingPerKey": {},
                        "objectMappingPerKey": {},
                        "valueCollectionMappingPerKey": {},
                        "valueMappingPerKey": {
                            "skjermingshjemmel": {
                                "mappingString": "p34",
                                "type": "STRING"
                            },
                            "tilgangsrestriksjon": {
                                "mappingString": "code89",
                                "type": "STRING"
                            }
                        }
                    }
                },
                "valueCollectionMappingPerKey": {},
                "valueMappingPerKey": {
                    "administrativenhet": {
                        "mappingString": "unit33",
                        "type": "STRING"
                    },
                    "journalposttype": {
                        "mappingString": "A",
                        "type": "STRING"
                    },
                    "journalstatus": {
                        "mappingString": "N",
                        "type": "STRING"
                    },
                    "offentligTittel": {
                        "mappingString": "public record title",
                        "type": "DYNAMIC_STRING"
                    },
                    "saksbehandler": {
                        "mappingString": "boba",
                        "type": "STRING"
                    },
                    "tittel": {
                        "mappingString": "record title",
                        "type": "DYNAMIC_STRING"
                    }
                }
            },
            "sak": {
                "objectCollectionMappingPerKey": {},
                "objectMappingPerKey": {
                    "ny": {
                        "objectCollectionMappingPerKey": {
                            "klasse": {
                                "objectMappings": [
                                    {
                                        "objectCollectionMappingPerKey": {},
                                        "objectMappingPerKey": {},
                                        "valueCollectionMappingPerKey": {},
                                        "valueMappingPerKey": {
                                            "klasseId": {
                                                "mappingString": "1class",
                                                "type": "DYNAMIC_STRING"
                                            },
                                            "klassifikasjonssystem": {
                                                "mappingString": "prim",
                                                "type": "STRING"
                                            },
                                            "rekkefølge": {
                                                "mappingString": "0",
                                                "type": "STRING"
                                            },
                                            "tittel": {
                                                "mappingString": "primTitle",
                                                "type": "DYNAMIC_STRING"
                                            }
                                        }
                                    },
                                    {
                                        "objectCollectionMappingPerKey": {},
                                        "objectMappingPerKey": {},
                                        "valueCollectionMappingPerKey": {},
                                        "valueMappingPerKey": {
                                            "klasseId": {
                                                "mappingString": "2class",
                                                "type": "DYNAMIC_STRING"
                                            },
                                            "klassifikasjonssystem": {
                                                "mappingString": "rose",
                                                "type": "STRING"
                                            },
                                            "rekkefølge": {
                                                "mappingString": "1",
                                                "type": "STRING"
                                            },
                                            "tittel": {
                                                "mappingString": "secTitle",
                                                "type": "DYNAMIC_STRING"
                                            }
                                        }
                                    },
                                    {
                                        "objectCollectionMappingPerKey": {},
                                        "objectMappingPerKey": {},
                                        "valueCollectionMappingPerKey": {},
                                        "valueMappingPerKey": {
                                            "klasseId": {
                                                "mappingString": "3class",
                                                "type": "DYNAMIC_STRING"
                                            },
                                            "klassifikasjonssystem": {
                                                "mappingString": "everdeen",
                                                "type": "STRING"
                                            },
                                            "rekkefølge": {
                                                "mappingString": "2",
                                                "type": "STRING"
                                            },
                                            "tittel": {
                                                "mappingString": "tertTitle",
                                                "type": "DYNAMIC_STRING"
                                            }
                                        }
                                    }
                                ],
                                "objectsFromCollectionMappings": []
                            }
                        },
                        "objectMappingPerKey": {
                            "skjerming": {
                                "objectCollectionMappingPerKey": {},
                                "objectMappingPerKey": {},
                                "valueCollectionMappingPerKey": {},
                                "valueMappingPerKey": {
                                    "skjermingshjemmel": {
                                        "mappingString": "number6",
                                        "type": "STRING"
                                    },
                                    "tilgangsrestriksjon": {
                                        "mappingString": "code42",
                                        "type": "STRING"
                                    }
                                }
                            }
                        },
                        "valueCollectionMappingPerKey": {},
                        "valueMappingPerKey": {
                            "administrativenhet": {
                                "mappingString": "unit4",
                                "type": "STRING"
                            },
                            "arkivdel": {
                                "mappingString": "unit3",
                                "type": "STRING"
                            },
                            "journalenhet": {
                                "mappingString": "unit0",
                                "type": "STRING"
                            },
                            "offentligTittel": {
                                "mappingString": "public title",
                                "type": "DYNAMIC_STRING"
                            },
                            "saksansvarlig": {
                                "mappingString": "rand",
                                "type": "STRING"
                            },
                            "saksmappetype": {
                                "mappingString": "casetype",
                                "type": "STRING"
                            },
                            "tittel": {
                                "mappingString": "Title of case",
                                "type": "DYNAMIC_STRING"
                            }
                        }
                    }
                },
                "valueCollectionMappingPerKey": {},
                "valueMappingPerKey": {
                    "type": {
                        "mappingString": "NEW",
                        "type": "STRING"
                    }
                }
            }
        },
        "valueCollectionMappingPerKey": {},
        "valueMappingPerKey": {}
    }
}

export const MOCK_EMPTY_CONFIGURATION: IConfiguration = {
    "comment": "form to test empty mapping",
    "completed": false,
    "mapping": {
        valueMappingPerKey: {},
        valueCollectionMappingPerKey: {},
        objectMappingPerKey: {},
        objectCollectionMappingPerKey: {}
    },
    "id": "123",
    "integrationId": "id0",
    "integrationMetadataId": 321
}

export const MOCK_MAPPED_EMPTY_CONFIGURATION: IConfiguration = {
    "comment": "form to test empty mapping",
    "completed": false,
    "id": "234",
    "integrationId": "id1",
    "integrationMetadataId": 321,
    "mapping": {
        "objectCollectionMappingPerKey": {},
        "objectMappingPerKey": {
            "journalpost": {
                "objectCollectionMappingPerKey": {
                    "dokumentbeskrivelse": {
                        "objectMappings": [
                            {
                                "objectCollectionMappingPerKey": {
                                    "dokumentobjekt": {
                                        "objectMappings": [
                                            {
                                                "objectCollectionMappingPerKey": {},
                                                "objectMappingPerKey": {},
                                                "valueCollectionMappingPerKey": {},
                                                "valueMappingPerKey": {}
                                            }
                                        ],
                                        "objectsFromCollectionMappings": []
                                    }
                                },
                                "objectMappingPerKey": {},
                                "valueCollectionMappingPerKey": {},
                                "valueMappingPerKey": {}
                            }
                        ],
                        "objectsFromCollectionMappings": []
                    }
                },
                "objectMappingPerKey": {},
                "valueCollectionMappingPerKey": {},
                "valueMappingPerKey": {}
            }
        },
        "valueCollectionMappingPerKey": {},
        "valueMappingPerKey": {}
    }
}

export const MOCK_NEW_CONFIG: IConfiguration = {
    id: 'id2',
    integrationId: '123',
    version: 3,
    completed: false,
    comment: 'Ikke ferdigstilt',
    mapping: {
        valueMappingPerKey: {},
        valueCollectionMappingPerKey: {},
        objectMappingPerKey: {
            "sak": {
                valueMappingPerKey: {
                    "type": {type: FieldType.STRING, mappingString: " BY_ID"},
                    "id": {type: FieldType.STRING, mappingString: "2022/123"}
                },
                valueCollectionMappingPerKey: {},
                objectMappingPerKey: {
                    "ny": {
                        valueMappingPerKey: {
                            "tittel": {type: FieldType.DYNAMIC_STRING, mappingString: "Title of case"},
                            "offentligTittel": {type: FieldType.DYNAMIC_STRING, mappingString: "public title"},
                            "saksmappetype": {type: FieldType.STRING, mappingString: "casetype"},
                            "administrativenhet": {type: FieldType.STRING, mappingString: "unit4"},
                            "arkivdel": {type: FieldType.STRING, mappingString: "unit3"},
                            "journalenhet": {type: FieldType.STRING, mappingString: "unit0"},
                            "saksstatus": {type: FieldType.STRING, mappingString: null},
                            "saksansvarlig": {type: FieldType.STRING, mappingString: "rand"}
                        },
                    valueCollectionMappingPerKey: {},
                        objectMappingPerKey: {
                            "skjerming": {
                                objectCollectionMappingPerKey: {},
                                objectMappingPerKey: {},
                                valueMappingPerKey: {
                                    "tilgangsrestriksjon": {type: FieldType.STRING, mappingString: "code42"},
                                    "skjermingshjemmel": {type: FieldType.STRING, mappingString: "number6"},
                                },
                                valueCollectionMappingPerKey: {}
                            }
                        },
                        objectCollectionMappingPerKey: {
                            "klasse": {
                                "objectMappings": [
                                    {
                                        "objectCollectionMappingPerKey": {},
                                        "objectMappingPerKey": {},
                                        "valueMappingPerKey": {
                                            "klasseId": {
                                                "mappingString": "1class",
                                                "type": "DYNAMIC_STRING"
                                            },
                                            "klassifikasjonssystem": {
                                                "mappingString": "prim",
                                                "type": "STRING"
                                            },
                                            "rekkefølge": {
                                                "mappingString": "0",
                                                "type": "DYNAMIC_STRING"
                                            },
                                            "tittel": {
                                                "mappingString": "primTitle",
                                                "type": "DYNAMIC_STRING"
                                            }
                                        },
                                        valueCollectionMappingPerKey: {}
                                    },
                                    {
                                        "objectCollectionMappingPerKey": {},
                                        "objectMappingPerKey": {},
                                        "valueMappingPerKey": {
                                            "klasseId": {
                                                "mappingString": "2class",
                                                "type": "DYNAMIC_STRING"
                                            },
                                            "klassifikasjonssystem": {
                                                "mappingString": "rose",
                                                "type": "STRING"
                                            },
                                            "rekkefølge": {
                                                "mappingString": "1",
                                                "type": "DYNAMIC_STRING"
                                            },
                                            "tittel": {
                                                "mappingString": "secTitle",
                                                "type": "DYNAMIC_STRING"
                                            }
                                        },
                                        valueCollectionMappingPerKey: {}
                                    },
                                    {
                                        "objectCollectionMappingPerKey": {},
                                        "objectMappingPerKey": {},
                                        "valueMappingPerKey": {
                                            "klasseId": {
                                                "mappingString": "3class",
                                                "type": "DYNAMIC_STRING"
                                            },
                                            "klassifikasjonssystem": {
                                                "mappingString": "everdeen",
                                                "type": "STRING"
                                            },
                                            "rekkefølge": {
                                                "mappingString": "2",
                                                "type": "DYNAMIC_STRING"
                                            },
                                            "tittel": {
                                                "mappingString": "tertTitle",
                                                "type": "DYNAMIC_STRING"
                                            }
                                        },
                                        valueCollectionMappingPerKey: {}
                                    }
                                ],
                                "objectsFromCollectionMappings": []
                            }
                        }
                    }
                },
                objectCollectionMappingPerKey: {}
            },
            "journalpost": {
                valueMappingPerKey: {
                    "tittel": {type: FieldType.DYNAMIC_STRING, mappingString: "record title"},
                    "offentligTittel": {type: FieldType.DYNAMIC_STRING, mappingString: "public record title"},
                    "administrativenhet": {type: FieldType.STRING, mappingString: "unit33"},
                    "journalstatus": {type: FieldType.STRING, mappingString: "N"},
                    "journalposttype": {type: FieldType.STRING, mappingString: "A"},
                    "saksbehandler": {type: FieldType.STRING, mappingString: "boba"}
                },
                valueCollectionMappingPerKey: {},
                objectMappingPerKey: {
                    "skjerming": {
                        objectMappingPerKey: {},
                        objectCollectionMappingPerKey: {},
                        valueMappingPerKey: {
                            "tilgangsrestriksjon": {type: FieldType.STRING, mappingString: "code89"},
                            "skjermingshjemmel": {type: FieldType.STRING, mappingString: "p34"}
                        },
                        valueCollectionMappingPerKey: {}
                    }
                },
                objectCollectionMappingPerKey: {
                    "dokumentbeskrivelse": {
                        objectMappings: [
                            {
                                valueMappingPerKey: {
                                    "tittel": {type: FieldType.DYNAMIC_STRING, mappingString: "record title"},
                                    "dokumentstatus": {type: FieldType.STRING, mappingString: "D9"},
                                    "dokumentType": {type: FieldType.STRING, mappingString: "cat8"},
                                    "tilknyttetRegistreringSom": {type: FieldType.URL, mappingString: "www.kodeverk.no/H"}
                                },
                                valueCollectionMappingPerKey: {},
                                objectMappingPerKey: {},
                                objectCollectionMappingPerKey: {
                                    "dokumentobjekt": {
                                        objectMappings: [
                                            {
                                                valueMappingPerKey: {
                                                    "filformat": {type: FieldType.STRING, mappingString: "www.kodeverk.no/A"},
                                                    "variantformat": {type: FieldType.STRING, mappingString: "www.kodeverk.no/PDF"},
                                                    "fil": {type: FieldType.FILE, mappingString: "$if{skjemaPdf}"}
                                                },
                                                valueCollectionMappingPerKey: {},
                                                objectMappingPerKey: {},
                                                objectCollectionMappingPerKey: {}
                                            }
                                        ],
                                        objectsFromCollectionMappings: [
                                        ]
                                    }
                                }
                            }
                        ],
                        objectsFromCollectionMappings: [
                            {
                                instanceCollectionReferencesOrdered: ["$if{vedlegg}"],
                                objectMapping: {
                                    valueMappingPerKey: {
                                        "tittel": {type: FieldType.DYNAMIC_STRING, mappingString: "$ifg{name}"},
                                        "dokumentstatus": {type: FieldType.STRING, mappingString: "D9"},
                                        "dokumentType": {type: FieldType.STRING, mappingString: "cat8"},
                                        "tilknyttetRegistreringSom": {type: FieldType.STRING, mappingString: "www.kodeverk.no/V"}
                                    },
                                    valueCollectionMappingPerKey: {},
                                    objectMappingPerKey: {},
                                    objectCollectionMappingPerKey: {
                                        "dokumentobjekt": {
                                            objectMappings: [
                                                {
                                                    valueMappingPerKey: {
                                                        "filformat": {type: FieldType.DYNAMIC_STRING, mappingString: "www.kodeverk.no/PDF"},
                                                        "variantformat": {type: FieldType.STRING, mappingString: "www.kodeverk.no/PDF"},
                                                        "fil": {type: FieldType.DYNAMIC_STRING, mappingString: "$icf{0}{fil}"}
                                                    },
                                                    valueCollectionMappingPerKey: {},
                                                    objectMappingPerKey: {},
                                                    objectCollectionMappingPerKey: {}
                                                }
                                            ],
                                            objectsFromCollectionMappings: []
                                        }
                                    }
                                }
                            }
                        ]

                    },
                    "korrespondansepart": {
                        objectMappings: [{
                            valueMappingPerKey: {
                                "fødselsnummer": {type: FieldType.DYNAMIC_STRING, mappingString: "123456789"},
                                "organisasjonsnummer": {type: FieldType.DYNAMIC_STRING, mappingString: null},
                                "kontaktperson": {type: FieldType.DYNAMIC_STRING, mappingString: "donna"},
                                "korrespondansepartNavn": {type: FieldType.DYNAMIC_STRING, mappingString: "Anakin Skywalker"},
                                "korrespondanseparttype": {type: FieldType.STRING, mappingString: "avsender"}
                            },
                            valueCollectionMappingPerKey: {},
                            objectMappingPerKey: {
                                "adresse": {
                                    valueMappingPerKey: {
                                        "adresselinje": {type: FieldType.DYNAMIC_STRING, mappingString: "highstreet 22"},
                                        "postnummer": {type: FieldType.DYNAMIC_STRING, mappingString: "1234"},
                                        "poststed": {type: FieldType.DYNAMIC_STRING, mappingString: "Moria"}
                                    },
                                    valueCollectionMappingPerKey: {},
                                    objectMappingPerKey: {},
                                    objectCollectionMappingPerKey: {}
                                },
                                "kontaktinformasjon": {
                                    valueMappingPerKey: {
                                        "epostadresse": {type: FieldType.DYNAMIC_STRING, mappingString: "hello@world.no"},
                                        "mobiltelefonnummer": {type: FieldType.DYNAMIC_STRING, mappingString: "12345678"},
                                        "telefonnummer": {type: FieldType.DYNAMIC_STRING, mappingString: "12345678"}
                                    },
                                    valueCollectionMappingPerKey: {},
                                    objectMappingPerKey: {},
                                    objectCollectionMappingPerKey: {}
                                },
                                "skjerming": {
                                    valueMappingPerKey: {
                                        "tilgangsrestriksjon": {type: FieldType.STRING, mappingString: "code2"},
                                        "skjermingshjemmel": {type: FieldType.STRING, mappingString: "p3"}
                                    },
                                    valueCollectionMappingPerKey: {},
                                    objectMappingPerKey: {},
                                    objectCollectionMappingPerKey: {}
                                }
                            },
                            objectCollectionMappingPerKey: {}
                        }],
                        objectsFromCollectionMappings: []
                    }
                }
            }
        },
        objectCollectionMappingPerKey: {}
    },
}

export const MOCK_BY_ID_CONFIG: IConfiguration = {
    id: 'id2',
    integrationId: '123',
    version: 3,
    completed: false,
    comment: 'Ikke ferdigstilt',
    mapping: {
        valueMappingPerKey: {},
        valueCollectionMappingPerKey: {},
        objectMappingPerKey: {
            "sak": {
                valueMappingPerKey: {
                    "id": {type: FieldType.STRING, mappingString: "2022/163"},
                    "type": {type: FieldType.STRING, mappingString: "BY_ID"},
                    "tittel": {type: FieldType.DYNAMIC_STRING, mappingString: null},
                    "offentligTittel": {type: FieldType.DYNAMIC_STRING, mappingString: null},
                    "saksmappetype": {type: FieldType.STRING, mappingString: null},
                    "administrativenhet": {type: FieldType.STRING, mappingString: null},
                    "arkivdel": {type: FieldType.STRING, mappingString: null},
                    "journalenhet": {type: FieldType.STRING, mappingString: null},
                    "saksstatus": {type: FieldType.STRING, mappingString: null},
                    "saksansvarlig": {type: FieldType.STRING, mappingString: null}
                },
                valueCollectionMappingPerKey: {},
                objectMappingPerKey: {
                    "skjerming": {
                        "objectCollectionMappingPerKey": {},
                        "objectMappingPerKey": {},
                        "valueMappingPerKey": {
                            "tilgangsrestriksjon": {type: FieldType.STRING, mappingString: null},
                            "skjermingshjemmel": {type: FieldType.STRING, mappingString: null}
                        },
                        valueCollectionMappingPerKey: {}
                    }
                },
                objectCollectionMappingPerKey: {
                    "klasse": {
                        "objectMappings": [
                            {
                                "objectCollectionMappingPerKey": {},
                                "objectMappingPerKey": {},
                                "valueMappingPerKey": {
                                    "klasseId": {
                                        "mappingString": null,
                                        "type": "DYNAMIC_STRING"
                                    },
                                    "klassifikasjonssystem": {
                                        "mappingString": null,
                                        "type": "STRING"
                                    },
                                    "rekkefølge": {
                                        "mappingString": "0",
                                        "type": "DYNAMIC_STRING"
                                    },
                                    "tittel": {
                                        "mappingString": null,
                                        "type": "DYNAMIC_STRING"
                                    }
                                },
                                valueCollectionMappingPerKey: {}
                            },
                            {
                                "objectCollectionMappingPerKey": {},
                                "objectMappingPerKey": {},
                                "valueMappingPerKey": {
                                    "klasseId": {
                                        "mappingString": null,
                                        "type": "DYNAMIC_STRING"
                                    },
                                    "klassifikasjonssystem": {
                                        "mappingString": null,
                                        "type": "STRING"
                                    },
                                    "rekkefølge": {
                                        "mappingString": "1",
                                        "type": "DYNAMIC_STRING"
                                    },
                                    "tittel": {
                                        "mappingString": null,
                                        "type": "DYNAMIC_STRING"
                                    }
                                },
                                valueCollectionMappingPerKey: {}
                            },
                            {
                                "objectCollectionMappingPerKey": {},
                                "objectMappingPerKey": {},
                                "valueMappingPerKey": {
                                    "klasseId": {
                                        "mappingString": null,
                                        "type": "DYNAMIC_STRING"
                                    },
                                    "klassifikasjonssystem": {
                                        "mappingString": null,
                                        "type": "STRING"
                                    },
                                    "rekkefølge": {
                                        "mappingString": "2",
                                        "type": "DYNAMIC_STRING"
                                    },
                                    "tittel": {
                                        "mappingString": null,
                                        "type": "DYNAMIC_STRING"
                                    }
                                },
                                valueCollectionMappingPerKey: {}
                            }
                        ],
                        "objectsFromCollectionMappings": []
                    }
                },            },
            "journalpost": {
                valueMappingPerKey: {
                    "tittel": {type: FieldType.DYNAMIC_STRING, mappingString: "foo $if{bar}"},
                    "offentligTittel": {type: FieldType.DYNAMIC_STRING, mappingString: null},
                    "administrativenhet": {type: FieldType.STRING, mappingString: null},
                    "journalstatus": {type: FieldType.STRING, mappingString: null},
                    "journalposttype": {type: FieldType.STRING, mappingString: null},
                    "saksbehandler": {type: FieldType.STRING, mappingString: null},
                    "tilgangsrestriksjon": {type: FieldType.STRING, mappingString: null},
                    "skjermingshjemmel": {type: FieldType.STRING, mappingString: null}
                },
                valueCollectionMappingPerKey: {},
                objectMappingPerKey: {},
                objectCollectionMappingPerKey: {
                    "dokumentbeskrivelse": {
                        objectMappings: [
                            {
                                valueMappingPerKey: {
                                    "tittel": {type: FieldType.DYNAMIC_STRING, mappingString: "foo $if{bar}"},
                                    "dokumentstatus": {type: FieldType.STRING, mappingString: null},
                                    "dokumentType": {type: FieldType.STRING, mappingString: null},
                                    "tilknyttetRegistreringSom": {type: FieldType.URL, mappingString: null}
                                },
                                valueCollectionMappingPerKey: {},
                                objectMappingPerKey: {},
                                objectCollectionMappingPerKey: {
                                    "dokumentobjekt": {
                                        objectMappings: [
                                            {
                                                valueMappingPerKey: {
                                                    "filformat": {type: FieldType.STRING, mappingString: null},
                                                    "variantformat": {type: FieldType.STRING, mappingString: null},
                                                    "fil": {type: FieldType.FILE, mappingString: null}
                                                },
                                                valueCollectionMappingPerKey: {},
                                                objectMappingPerKey: {},
                                                objectCollectionMappingPerKey: {}
                                            }
                                        ],
                                        objectsFromCollectionMappings: [
                                        ]
                                    }
                                }
                            }
                        ],
                        objectsFromCollectionMappings: [
                            {
                                instanceCollectionReferencesOrdered: ["$if{vedlegg}"],
                                objectMapping: {
                                    valueMappingPerKey: {
                                        "tittel": {type: FieldType.DYNAMIC_STRING, mappingString: null},
                                        "dokumentstatus": {type: FieldType.STRING, mappingString: null},
                                        "dokumentType": {type: FieldType.STRING, mappingString: null},
                                        "tilknyttetRegistreringSom": {type: FieldType.STRING, mappingString: null}
                                    },
                                    valueCollectionMappingPerKey: {},
                                    objectMappingPerKey: {},
                                    objectCollectionMappingPerKey: {
                                        "dokumentobjekt": {
                                            objectMappings: [
                                                {
                                                    valueMappingPerKey: {
                                                        "filformat": {type: FieldType.DYNAMIC_STRING, mappingString: null},
                                                        "variantformat": {type: FieldType.STRING, mappingString: null},
                                                        "fil": {type: FieldType.DYNAMIC_STRING, mappingString: null}
                                                    },
                                                    valueCollectionMappingPerKey: {},
                                                    objectMappingPerKey: {},
                                                    objectCollectionMappingPerKey: {}
                                                }
                                            ],
                                            objectsFromCollectionMappings: []
                                        }
                                    }
                                }
                            }
                        ]

                    },
                    "korrespondansepart": {
                        objectMappings: [{
                            valueMappingPerKey: {
                                "fødselsnummer": {type: FieldType.DYNAMIC_STRING, mappingString: null},
                                "organisasjonsnummer": {type: FieldType.DYNAMIC_STRING, mappingString: null},
                                "kontaktperson": {type: FieldType.DYNAMIC_STRING, mappingString: null},
                                "korrespondansepartNavn": {type: FieldType.DYNAMIC_STRING, mappingString: null},
                                "korrespondanseparttype": {type: FieldType.STRING, mappingString: null}
                            },
                            valueCollectionMappingPerKey: {},
                            objectMappingPerKey: {
                                "adresse": {
                                    valueMappingPerKey: {
                                        "adresselinje": {type: FieldType.DYNAMIC_STRING, mappingString: null},
                                        "postnummer": {type: FieldType.DYNAMIC_STRING, mappingString: null},
                                        "poststed": {type: FieldType.DYNAMIC_STRING, mappingString: null}
                                    },
                                    valueCollectionMappingPerKey: {},
                                    objectMappingPerKey: {},
                                    objectCollectionMappingPerKey: {}
                                },
                                "kontaktinformasjon": {
                                    valueMappingPerKey: {
                                        "epostadresse": {type: FieldType.DYNAMIC_STRING, mappingString: null},
                                        "mobiltelefonnummer": {type: FieldType.DYNAMIC_STRING, mappingString: null},
                                        "telefonnummer": {type: FieldType.DYNAMIC_STRING, mappingString: null}
                                    },
                                    valueCollectionMappingPerKey: {},
                                    objectMappingPerKey: {},
                                    objectCollectionMappingPerKey: {}
                                },
                                "skjerming": {
                                    valueMappingPerKey: {
                                        "tilgangsrestriksjon": {type: FieldType.STRING, mappingString: null},
                                        "skjermingshjemmel": {type: FieldType.STRING, mappingString: null}
                                    },
                                    valueCollectionMappingPerKey: {},
                                    objectMappingPerKey: {},
                                    objectCollectionMappingPerKey: {}
                                }
                            },
                            objectCollectionMappingPerKey: {}
                        }],
                        objectsFromCollectionMappings: []
                    }
                }
            }
        },
        objectCollectionMappingPerKey: {}
    },

}

export const MOCK_AV_CONFIGURATION_NEW: IConfiguration = {
    "comment": "form to test mapping",
    "completed": false,
    "id": "234",
    "integrationId": "id1",
    "integrationMetadataId": 321,
    "mapping": {
        "objectCollectionMappingPerKey": {},
        "objectMappingPerKey": {
            "journalpost": {
                "objectCollectionMappingPerKey": {
                    "dokumentbeskrivelse": {
                        "objectMappings": [
                            {
                                "objectCollectionMappingPerKey": {
                                    "dokumentobjekt": {
                                        "objectMappings": [
                                            {
                                                "objectCollectionMappingPerKey": {},
                                                "objectMappingPerKey": {},
                                                "valueCollectionMappingPerKey": {},
                                                "valueMappingPerKey": {
                                                    "fil": {
                                                        "mappingString": "$if{skjemaPdf}",
                                                        "type": "FILE"
                                                    },
                                                    "filformat": {
                                                        "mappingString": "www.kodeverk.no/A",
                                                        "type": "STRING"
                                                    },
                                                    "variantformat": {
                                                        "mappingString": "www.kodeverk.no/PDF",
                                                        "type": "STRING"
                                                    }
                                                }
                                            }
                                        ],
                                        "objectsFromCollectionMappings": []
                                    }
                                },
                                "objectMappingPerKey": {},
                                "valueCollectionMappingPerKey": {},
                                "valueMappingPerKey": {
                                    "dokumentType": {
                                        "mappingString": "cat8",
                                        "type": "STRING"
                                    },
                                    "dokumentstatus": {
                                        "mappingString": "D9",
                                        "type": "STRING"
                                    },
                                    "tilknyttetRegistreringSom": {
                                        "mappingString": "www.kodeverk.no/H",
                                        "type": "STRING"
                                    },
                                    "tittel": {
                                        "mappingString": "record title",
                                        "type": "DYNAMIC_STRING"
                                    }
                                }
                            }
                        ],
                        "objectsFromCollectionMappings": [
                            {
                                "instanceCollectionReferencesOrdered": [
                                    "$if{vedlegg}"
                                ],
                                "objectMapping": {
                                    "objectCollectionMappingPerKey": {
                                        "dokumentobjekt": {
                                            "objectMappings": [
                                                {
                                                    "objectCollectionMappingPerKey": {},
                                                    "objectMappingPerKey": {},
                                                    "valueCollectionMappingPerKey": {},
                                                    "valueMappingPerKey": {
                                                        "fil": {
                                                            "mappingString": "$icf{0}{fil}",
                                                            "type": "FILE"
                                                        },
                                                        "filformat": {
                                                            "mappingString": "www.kodeverk.no/PDF",
                                                            "type": "STRING"
                                                        },
                                                        "variantformat": {
                                                            "mappingString": "www.kodeverk.no/PDF",
                                                            "type": "STRING"
                                                        }
                                                    }
                                                }
                                            ],
                                            "objectsFromCollectionMappings": []
                                        }
                                    },
                                    "objectMappingPerKey": {},
                                    "valueCollectionMappingPerKey": {},
                                    "valueMappingPerKey": {
                                        "dokumentType": {
                                            "mappingString": "cat8",
                                            "type": "STRING"
                                        },
                                        "dokumentstatus": {
                                            "mappingString": "D9",
                                            "type": "STRING"
                                        },
                                        "tilknyttetRegistreringSom": {
                                            "mappingString": "www.kodeverk.no/V",
                                            "type": "STRING"
                                        },
                                        "tittel": {
                                            "mappingString": "record title",
                                            "type": "DYNAMIC_STRING"
                                        }
                                    }
                                }
                            }
                        ]
                    },
                    "korrespondansepart": {
                        "objectMappings": [
                            {
                                "objectCollectionMappingPerKey": {},
                                "objectMappingPerKey": {
                                    "adresse": {
                                        "objectCollectionMappingPerKey": {},
                                        "objectMappingPerKey": {},
                                        "valueCollectionMappingPerKey": {},
                                        "valueMappingPerKey": {
                                            "adresselinje": {
                                                "mappingString": "highstreet 22",
                                                "type": "DYNAMIC_STRING"
                                            },
                                            "postnummer": {
                                                "mappingString": "1234",
                                                "type": "DYNAMIC_STRING"
                                            },
                                            "poststed": {
                                                "mappingString": "Moria",
                                                "type": "DYNAMIC_STRING"
                                            }
                                        }
                                    },
                                    "kontaktinformasjon": {
                                        "objectCollectionMappingPerKey": {},
                                        "objectMappingPerKey": {},
                                        "valueCollectionMappingPerKey": {},
                                        "valueMappingPerKey": {
                                            "epostadresse": {
                                                "mappingString": "hello@world.no",
                                                "type": "DYNAMIC_STRING"
                                            },
                                            "mobiltelefonnummer": {
                                                "mappingString": "12345678",
                                                "type": "DYNAMIC_STRING"
                                            },
                                            "telefonnummer": {
                                                "mappingString": "12345678",
                                                "type": "DYNAMIC_STRING"
                                            }
                                        }
                                    },
                                    "skjerming": {
                                        "objectCollectionMappingPerKey": {},
                                        "objectMappingPerKey": {},
                                        "valueCollectionMappingPerKey": {},
                                        "valueMappingPerKey": {
                                            "skjermingshjemmel": {
                                                "mappingString": "p3",
                                                "type": "STRING"
                                            },
                                            "tilgangsrestriksjon": {
                                                "mappingString": "code2",
                                                "type": "STRING"
                                            }
                                        }
                                    }
                                },
                                "valueCollectionMappingPerKey": {},
                                "valueMappingPerKey": {
                                    "fødselsnummer": {
                                        "mappingString": "123456789",
                                        "type": "DYNAMIC_STRING"
                                    },
                                    "kontaktperson": {
                                        "mappingString": "donna",
                                        "type": "DYNAMIC_STRING"
                                    },
                                    "korrespondansepartNavn": {
                                        "mappingString": "Anakin Skywalker",
                                        "type": "DYNAMIC_STRING"
                                    },
                                    "korrespondanseparttype": {
                                        "mappingString": "avsender",
                                        "type": "STRING"
                                    }
                                }
                            }
                        ],
                        "objectsFromCollectionMappings": []
                    }
                },
                "objectMappingPerKey": {
                    "skjerming": {
                        "objectCollectionMappingPerKey": {},
                        "objectMappingPerKey": {},
                        "valueCollectionMappingPerKey": {},
                        "valueMappingPerKey": {
                            "skjermingshjemmel": {
                                "mappingString": "p34",
                                "type": "STRING"
                            },
                            "tilgangsrestriksjon": {
                                "mappingString": "code89",
                                "type": "STRING"
                            }
                        }
                    }
                },
                "valueCollectionMappingPerKey": {},
                "valueMappingPerKey": {
                    "administrativenhet": {
                        "mappingString": "unit33",
                        "type": "STRING"
                    },
                    "journalposttype": {
                        "mappingString": "A",
                        "type": "STRING"
                    },
                    "journalstatus": {
                        "mappingString": "N",
                        "type": "STRING"
                    },
                    "offentligTittel": {
                        "mappingString": "public record title",
                        "type": "DYNAMIC_STRING"
                    },
                    "saksbehandler": {
                        "mappingString": "boba",
                        "type": "STRING"
                    },
                    "tittel": {
                        "mappingString": "record title",
                        "type": "DYNAMIC_STRING"
                    }
                }
            },
            "sak": {
                "objectCollectionMappingPerKey": {},
                "objectMappingPerKey": {
                    "ny": {
                        "objectCollectionMappingPerKey": {
                            "klasse": {
                                "objectMappings": [
                                    {
                                        "objectCollectionMappingPerKey": {},
                                        "objectMappingPerKey": {},
                                        "valueCollectionMappingPerKey": {},
                                        "valueMappingPerKey": {
                                            "klasseId": {
                                                "mappingString": "1class",
                                                "type": "DYNAMIC_STRING"
                                            },
                                            "klassifikasjonssystem": {
                                                "mappingString": "prim",
                                                "type": "STRING"
                                            },
                                            "rekkefølge": {
                                                "mappingString": "0",
                                                "type": "STRING"
                                            },
                                            "tittel": {
                                                "mappingString": "primTitle",
                                                "type": "DYNAMIC_STRING"
                                            }
                                        }
                                    },
                                    {
                                        "objectCollectionMappingPerKey": {},
                                        "objectMappingPerKey": {},
                                        "valueCollectionMappingPerKey": {},
                                        "valueMappingPerKey": {
                                            "klasseId": {
                                                "mappingString": "2class",
                                                "type": "DYNAMIC_STRING"
                                            },
                                            "klassifikasjonssystem": {
                                                "mappingString": "rose",
                                                "type": "STRING"
                                            },
                                            "rekkefølge": {
                                                "mappingString": "1",
                                                "type": "STRING"
                                            },
                                            "tittel": {
                                                "mappingString": "secTitle",
                                                "type": "DYNAMIC_STRING"
                                            }
                                        }
                                    },
                                    {
                                        "objectCollectionMappingPerKey": {},
                                        "objectMappingPerKey": {},
                                        "valueCollectionMappingPerKey": {},
                                        "valueMappingPerKey": {
                                            "klasseId": {
                                                "mappingString": "3class",
                                                "type": "DYNAMIC_STRING"
                                            },
                                            "klassifikasjonssystem": {
                                                "mappingString": "everdeen",
                                                "type": "STRING"
                                            },
                                            "rekkefølge": {
                                                "mappingString": "2",
                                                "type": "STRING"
                                            },
                                            "tittel": {
                                                "mappingString": "tertTitle",
                                                "type": "DYNAMIC_STRING"
                                            }
                                        }
                                    }
                                ],
                                "objectsFromCollectionMappings": []
                            }
                        },
                        "objectMappingPerKey": {
                            "skjerming": {
                                "objectCollectionMappingPerKey": {},
                                "objectMappingPerKey": {},
                                "valueCollectionMappingPerKey": {},
                                "valueMappingPerKey": {
                                    "skjermingshjemmel": {
                                        "mappingString": "number6",
                                        "type": "STRING"
                                    },
                                    "tilgangsrestriksjon": {
                                        "mappingString": "code42",
                                        "type": "STRING"
                                    }
                                }
                            }
                        },
                        "valueCollectionMappingPerKey": {},
                        "valueMappingPerKey": {
                            "administrativenhet": {
                                "mappingString": "unit4",
                                "type": "STRING"
                            },
                            "arkivdel": {
                                "mappingString": "unit3",
                                "type": "STRING"
                            },
                            "journalenhet": {
                                "mappingString": "unit0",
                                "type": "STRING"
                            },
                            "offentligTittel": {
                                "mappingString": "public title",
                                "type": "DYNAMIC_STRING"
                            },
                            "saksansvarlig": {
                                "mappingString": "rand",
                                "type": "STRING"
                            },
                            "saksmappetype": {
                                "mappingString": "casetype",
                                "type": "STRING"
                            },
                            "tittel": {
                                "mappingString": "Title of case",
                                "type": "DYNAMIC_STRING"
                            }
                        }
                    }
                },
                "valueCollectionMappingPerKey": {},
                "valueMappingPerKey": {
                    "type": {
                        "mappingString": "NEW",
                        "type": "STRING"
                    }
                }
            }
        },
        "valueCollectionMappingPerKey": {},
        "valueMappingPerKey": {}
    }
}

export const MOCK_AV_CONFIGURATION_NEW_NOT_SHIELDED: IConfiguration = {
    comment: "form to test mapping",
    completed: false,
    id: "234",
    integrationId: "id1",
    integrationMetadataId: 321,
    mapping: {
        valueMappingPerKey: {},
        valueCollectionMappingPerKey: {},
        objectMappingPerKey: {
            "sak": {
                valueMappingPerKey: {
                    "type": {type: FieldType.STRING, mappingString: "NEW"},
                    "id": {type: FieldType.STRING, mappingString: null}
                },
                valueCollectionMappingPerKey: {},
                objectMappingPerKey: {
                    "ny": {
                        valueMappingPerKey: {
                            "tittel": {type: FieldType.DYNAMIC_STRING, mappingString: "Title of case"},
                            "offentligTittel": {type: FieldType.DYNAMIC_STRING, mappingString: "public title"},
                            "saksmappetype": {type: FieldType.STRING, mappingString: "casetype"},
                            "administrativenhet": {type: FieldType.STRING, mappingString: "unit4"},
                            "arkivdel": {type: FieldType.STRING, mappingString: "unit3"},
                            "journalenhet": {type: FieldType.STRING, mappingString: "unit0"},
                            "saksstatus": {type: FieldType.STRING, mappingString: null},
                            "saksansvarlig": {type: FieldType.STRING, mappingString: "rand"}},
                        valueCollectionMappingPerKey: {},
                        objectMappingPerKey: {
                            "skjerming": {
                                objectCollectionMappingPerKey: {},
                                objectMappingPerKey: {},
                                valueMappingPerKey: {
                                    "tilgangsrestriksjon": {type: FieldType.STRING, mappingString: "code42"},
                                    "skjermingshjemmel": {type: FieldType.STRING, mappingString: "number6"},
                                },
                                valueCollectionMappingPerKey: {}
                            }
                        },
                        objectCollectionMappingPerKey: {
                            "klasse": {
                                "objectMappings": [
                                    {
                                        "objectCollectionMappingPerKey": {},
                                        "objectMappingPerKey": {},
                                        "valueMappingPerKey": {
                                            "klasseId": {
                                                "mappingString": "1class",
                                                "type": "DYNAMIC_STRING"
                                            },
                                            "klassifikasjonssystem": {
                                                "mappingString": "prim",
                                                "type": "STRING"
                                            },
                                            "rekkefølge": {
                                                "mappingString": "0",
                                                "type": "DYNAMIC_STRING"
                                            },
                                            "tittel": {
                                                "mappingString": "primTitle",
                                                "type": "DYNAMIC_STRING"
                                            }
                                        },
                                        valueCollectionMappingPerKey: {}
                                    },
                                    {
                                        "objectCollectionMappingPerKey": {},
                                        "objectMappingPerKey": {},
                                        "valueMappingPerKey": {
                                            "klasseId": {
                                                "mappingString": "2class",
                                                "type": "DYNAMIC_STRING"
                                            },
                                            "klassifikasjonssystem": {
                                                "mappingString": "rose",
                                                "type": "STRING"
                                            },
                                            "rekkefølge": {
                                                "mappingString": "1",
                                                "type": "DYNAMIC_STRING"
                                            },
                                            "tittel": {
                                                "mappingString": "secTitle",
                                                "type": "DYNAMIC_STRING"
                                            }
                                        },
                                        valueCollectionMappingPerKey: {}
                                    },
                                    {
                                        "objectCollectionMappingPerKey": {},
                                        "objectMappingPerKey": {},
                                        "valueMappingPerKey": {
                                            "klasseId": {
                                                "mappingString": "3class",
                                                "type": "DYNAMIC_STRING"
                                            },
                                            "klassifikasjonssystem": {
                                                "mappingString": "everdeen",
                                                "type": "STRING"
                                            },
                                            "rekkefølge": {
                                                "mappingString": "2",
                                                "type": "DYNAMIC_STRING"
                                            },
                                            "tittel": {
                                                "mappingString": "tertTitle",
                                                "type": "DYNAMIC_STRING"
                                            }
                                        },
                                        valueCollectionMappingPerKey: {}
                                    }
                                ],
                                "objectsFromCollectionMappings": []
                            }
                        }
                    }
                },
                objectCollectionMappingPerKey: {}
            },
            "journalpost": {
                valueMappingPerKey: {
                    "tittel": {type: FieldType.DYNAMIC_STRING, mappingString: "record title"},
                    "offentligTittel": {type: FieldType.DYNAMIC_STRING, mappingString: "public record title"},
                    "administrativenhet": {type: FieldType.STRING, mappingString: "unit33"},
                    "journalstatus": {type: FieldType.STRING, mappingString: "N"},
                    "journalposttype": {type: FieldType.STRING, mappingString: "A"},
                    "saksbehandler": {type: FieldType.STRING, mappingString: "boba"},
                },
                valueCollectionMappingPerKey: {},
                objectMappingPerKey: {
                    "skjerming": {
                        objectMappingPerKey: {},
                        objectCollectionMappingPerKey: {},
                        valueMappingPerKey: {
                            "tilgangsrestriksjon": {type: FieldType.STRING, mappingString: "code89"},
                            "skjermingshjemmel": {type: FieldType.STRING, mappingString: "p34"}
                        },
                        valueCollectionMappingPerKey: {}
                    }
                },
                objectCollectionMappingPerKey: {
                    "dokumentbeskrivelse": {
                        objectMappings: [
                            {
                                valueMappingPerKey: {
                                    "tittel": {type: FieldType.DYNAMIC_STRING, mappingString: "record title"},
                                    "dokumentstatus": {type: FieldType.STRING, mappingString: "D9"},
                                    "dokumentType": {type: FieldType.STRING, mappingString: "cat8"},
                                    "tilknyttetRegistreringSom": {type: FieldType.STRING, mappingString: "www.kodeverk.no/H"}
                                },
                                valueCollectionMappingPerKey: {},
                                objectMappingPerKey: {},
                                objectCollectionMappingPerKey: {
                                    "dokumentobjekt": {
                                        objectMappings: [
                                            {
                                                valueMappingPerKey: {
                                                    "filformat": {type: FieldType.STRING, mappingString: "www.kodeverk.no/A"},
                                                    "variantformat": {type: FieldType.STRING, mappingString: "www.kodeverk.no/PDF"},
                                                    "fil": {type: FieldType.FILE, mappingString: "$if{skjemaPdf}"}
                                                },
                                                valueCollectionMappingPerKey: {},
                                                objectMappingPerKey: {},
                                                objectCollectionMappingPerKey: {}
                                            }
                                        ],
                                        objectsFromCollectionMappings: [
                                        ]
                                    }
                                }
                            }
                        ],
                        objectsFromCollectionMappings: [
                            {
                                instanceCollectionReferencesOrdered: ["$if{vedlegg}"],
                                objectMapping: {
                                    valueMappingPerKey: {
                                        "tittel": {type: FieldType.DYNAMIC_STRING, mappingString: "$ifg{name}"},
                                        "dokumentstatus": {type: FieldType.STRING, mappingString: "D9"},
                                        "dokumentType": {type: FieldType.STRING, mappingString: "cat8"},
                                        "tilknyttetRegistreringSom": {type: FieldType.STRING, mappingString: "www.kodeverk.no/V"}
                                    },
                                    valueCollectionMappingPerKey: {},
                                    objectMappingPerKey: {},
                                    objectCollectionMappingPerKey: {
                                        "dokumentobjekt": {
                                            objectMappings: [
                                                {
                                                    valueMappingPerKey: {
                                                        "filformat": {type: FieldType.DYNAMIC_STRING, mappingString: "www.kodeverk.no/PDF"},
                                                        "variantformat": {type: FieldType.STRING, mappingString: "www.kodeverk.no/PDF"},
                                                        "fil": {type: FieldType.DYNAMIC_STRING, mappingString: "$icf{0}{fil}"}
                                                    },
                                                    valueCollectionMappingPerKey: {},
                                                    objectMappingPerKey: {},
                                                    objectCollectionMappingPerKey: {}
                                                }
                                            ],
                                            objectsFromCollectionMappings: []
                                        }
                                    }
                                }
                            }
                        ]

                    },
                    "korrespondansepart": {
                        objectMappings: [{
                            valueMappingPerKey: {
                                "fødselsnummer": {type: FieldType.DYNAMIC_STRING, mappingString: "123456789"},
                                "organisasjonsnummer": {type: FieldType.DYNAMIC_STRING, mappingString: null},
                                "kontaktperson": {type: FieldType.DYNAMIC_STRING, mappingString: "donna"},
                                "korrespondansepartNavn": {type: FieldType.DYNAMIC_STRING, mappingString: "Anakin Skywalker"},
                                "korrespondanseparttype": {type: FieldType.STRING, mappingString: "avsender"}
                            },
                            valueCollectionMappingPerKey: {},
                            objectMappingPerKey: {
                                "adresse": {
                                    valueMappingPerKey: {
                                        "adresselinje": {type: FieldType.DYNAMIC_STRING, mappingString: "highstreet 22"},
                                        "postnummer": {type: FieldType.DYNAMIC_STRING, mappingString: "1234"},
                                        "poststed": {type: FieldType.DYNAMIC_STRING, mappingString: "Moria"}
                                    },
                                    valueCollectionMappingPerKey: {},
                                    objectMappingPerKey: {},
                                    objectCollectionMappingPerKey: {}
                                },
                                "kontaktinformasjon": {
                                    valueMappingPerKey: {
                                        "epostadresse": {type: FieldType.DYNAMIC_STRING, mappingString: "hello@world.no"},
                                        "mobiltelefonnummer": {type: FieldType.DYNAMIC_STRING, mappingString: "12345678"},
                                        "telefonnummer": {type: FieldType.DYNAMIC_STRING, mappingString: "12345678"}
                                    },
                                    valueCollectionMappingPerKey: {},
                                    objectMappingPerKey: {},
                                    objectCollectionMappingPerKey: {}
                                },
                                "skjerming": {
                                    valueMappingPerKey: {},
                                    valueCollectionMappingPerKey: {},
                                    objectMappingPerKey: {},
                                    objectCollectionMappingPerKey: {}
                                }
                            },
                            objectCollectionMappingPerKey: {}
                        }],
                        objectsFromCollectionMappings: []
                    }
                }
            }
        },
        objectCollectionMappingPerKey: {}
    }
}
