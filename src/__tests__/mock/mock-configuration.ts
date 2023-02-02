// noinspection DuplicatedCode


import {
    IConfigurationPatch,
    IConfiguration
} from "../../features/configuration/types/Configuration";
import {FieldType, IAVConfiguration} from "../../features/configuration/types/AVConfiguration";

export const MOCK_CONFIGURATION: IConfiguration = {
    "comment": "form to test mapping",
    "completed": false,
    "mapping": {
        valueMappingPerKey: {},
        elementMappingPerKey: {
            "sak": {
                valueMappingPerKey: {
                    "type": {type: FieldType.STRING, mappingString: "NEW"},
                    "tittel": {type: FieldType.DYNAMIC_STRING, mappingString: "Title of case"},
                    "offentligTittel": {type: FieldType.DYNAMIC_STRING, mappingString: "public title"},
                    "saksmappetype": {type: FieldType.STRING, mappingString: "casetype"},
                    "administrativenhet": {type: FieldType.STRING, mappingString: "unit4"},
                    "arkivdel": {type: FieldType.STRING, mappingString: "unit3"},
                    "journalenhet": {type: FieldType.STRING, mappingString: "unit0"},
                    "status": {type: FieldType.STRING, mappingString: null},
                    "tilgangsrestriksjon": {type: FieldType.STRING, mappingString: "code42"},
                    "skjermingshjemmel": {type: FieldType.STRING, mappingString: "number6"},
                    "saksansvarlig": {type: FieldType.STRING, mappingString: "rand"},
                    "primarordningsprinsipp": {type: FieldType.STRING, mappingString: "prim"},
                    "sekundarordningsprinsipp": {type: FieldType.STRING, mappingString: "rose"},
                    "tertiarordningsprinsipp": {type: FieldType.STRING, mappingString: "everdeen"},
                    "primarklasse": {type: FieldType.DYNAMIC_STRING, mappingString: "1class"},
                    "sekundarklasse": {type: FieldType.DYNAMIC_STRING, mappingString: "2class"},
                    "tertiarklasse": {type: FieldType.DYNAMIC_STRING, mappingString: "3class"},
                    "primartittel": {type: FieldType.DYNAMIC_STRING, mappingString: "primTitle"},
                    "sekundartittel": {type: FieldType.DYNAMIC_STRING, mappingString: "secTitle"},
                    "tertiartittel": {type: FieldType.DYNAMIC_STRING, mappingString: "tertTitle"}
                },
                elementMappingPerKey: {},
                elementCollectionMappingPerKey: {}
            },
            "journalpost": {
                valueMappingPerKey: {
                    "tittel": {type: FieldType.DYNAMIC_STRING, mappingString: "record title"},
                    "offentligTittel": {type: FieldType.DYNAMIC_STRING, mappingString: "public record title"},
                    "administrativenhet": {type: FieldType.STRING, mappingString: "unit33"},
                    "journalstatus": {type: FieldType.STRING, mappingString: "N"},
                    "journalposttype": {type: FieldType.STRING, mappingString: "A"},
                    "saksbehandler": {type: FieldType.STRING, mappingString: "boba"},
                    "tilgangsrestriksjon": {type: FieldType.STRING, mappingString: "code89"},
                    "skjermingshjemmel": {type: FieldType.STRING, mappingString: "p34"}
                },
                elementMappingPerKey: {},
                elementCollectionMappingPerKey: {
                    "dokumentbeskrivelse": {
                        elementMappings: [
                            {
                                valueMappingPerKey: {
                                    "tittel": {type: FieldType.DYNAMIC_STRING, mappingString: "record title"},
                                    "dokumentstatus": {type: FieldType.STRING, mappingString: "D9"},
                                    "dokumentType": {type: FieldType.STRING, mappingString: "cat8"},
                                    "tilknyttetRegistreringSom": {type: FieldType.URL, mappingString: "www.kodeverk.no/H"}
                                },
                                elementMappingPerKey: {},
                                elementCollectionMappingPerKey: {
                                    "dokumentobjekt": {
                                        elementMappings: [
                                            {
                                                valueMappingPerKey: {
                                                    "format": {type: FieldType.STRING, mappingString: "www.kodeverk.no/A"},
                                                    "variantformat": {type: FieldType.STRING, mappingString: "www.kodeverk.no/PDF"},
                                                    "fil": {type: FieldType.FILE, mappingString: "$ifg{formPdf}"}
                                                },
                                                elementMappingPerKey: {},
                                                elementCollectionMappingPerKey: {}
                                            }
                                        ],
                                        elementsFromCollectionMappings: [
                                        ]
                                    }
                                }
                            }
                        ],
                        elementsFromCollectionMappings: [
                            {
                                instanceCollectionReferencesOrdered: ["$if(vedlegg)"],
                                elementMapping: {
                                    valueMappingPerKey: {
                                        "tittel": {type: FieldType.DYNAMIC_STRING, mappingString: "$ifg{name}"},
                                        "dokumentstatus": {type: FieldType.STRING, mappingString: "D9"},
                                        "dokumentType": {type: FieldType.STRING, mappingString: "cat8"},
                                        "tilknyttetRegistreringSom": {type: FieldType.STRING, mappingString: "www.kodeverk.no/V"}
                                    },
                                    elementMappingPerKey: {},
                                    elementCollectionMappingPerKey: {
                                        "dokumentobjekt": {
                                            elementMappings: [
                                                {
                                                    valueMappingPerKey: {
                                                        "format": {type: FieldType.DYNAMIC_STRING, mappingString: "www.kodeverk.no/PDF"},
                                                        "variantformat": {type: FieldType.STRING, mappingString: "www.kodeverk.no/PDF"},
                                                        "fil": {type: FieldType.DYNAMIC_STRING, mappingString: "$igf{file}"}
                                                    },
                                                    elementMappingPerKey: {},
                                                    elementCollectionMappingPerKey: {}
                                                }
                                            ],
                                            elementsFromCollectionMappings: []
                                        }
                                    }
                                }
                            }
                        ]

                    },
                    "korrespondansepart": {
                        elementMappings: [{
                            valueMappingPerKey: {
                                "fødselsnummer": {type: FieldType.DYNAMIC_STRING, mappingString: "123456789"},
                                "organisasjonsnummer": {type: FieldType.DYNAMIC_STRING, mappingString: null},
                                "kontaktperson": {type: FieldType.DYNAMIC_STRING, mappingString: "donna"},
                                "korrespondansepartNavn": {type: FieldType.DYNAMIC_STRING, mappingString: "Anakin Skywalker"},
                                "korrespondanseparttype": {type: FieldType.STRING, mappingString: "avsender"}
                            },
                            elementMappingPerKey: {
                                "adresse": {
                                    valueMappingPerKey: {
                                        "adresselinje": {type: FieldType.DYNAMIC_STRING, mappingString: "highstreet 22"},
                                        "postnummer": {type: FieldType.DYNAMIC_STRING, mappingString: "1234"},
                                        "poststed": {type: FieldType.DYNAMIC_STRING, mappingString: "Moria"}
                                    },
                                    elementMappingPerKey: {},
                                    elementCollectionMappingPerKey: {}
                                },
                                "kontaktinformasjon": {
                                    valueMappingPerKey: {
                                        "epostadresse": {type: FieldType.DYNAMIC_STRING, mappingString: "hello@world.no"},
                                        "mobiltelefonnummer": {type: FieldType.DYNAMIC_STRING, mappingString: "12345678"},
                                        "telefonnummer": {type: FieldType.DYNAMIC_STRING, mappingString: "12345678"}
                                    },
                                    elementMappingPerKey: {},
                                    elementCollectionMappingPerKey: {}
                                },
                                "skjerming": {
                                    valueMappingPerKey: {
                                        "tilgangsrestriksjon": {type: FieldType.DYNAMIC_STRING, mappingString: "code2"},
                                        "skjermingshjemmel": {type: FieldType.DYNAMIC_STRING, mappingString: "p3"}
                                    },
                                    elementMappingPerKey: {},
                                    elementCollectionMappingPerKey: {}
                                }
                            },
                            elementCollectionMappingPerKey: {}
                        }],
                        elementsFromCollectionMappings: []
                    }
                }
            }
        },
        elementCollectionMappingPerKey: {}
    },
    "id": "123",
    "integrationId": "id0",
    "integrationMetadataId": 321
}

export const MOCK_CONFIGURATION_PATCH: IConfigurationPatch = {
    "comment": "form to test mapping",
    "completed": false,
    "mapping": {
        valueMappingPerKey: {},
        elementMappingPerKey: {
            "sak": {
                valueMappingPerKey: {
                    "tittel": {type: FieldType.DYNAMIC_STRING, mappingString: "Title of case"},
                    "offentligTittel": {type: FieldType.DYNAMIC_STRING, mappingString: "public title"},
                    "saksmappetype": {type: FieldType.STRING, mappingString: "casetype"},
                    "administrativenhet": {type: FieldType.STRING, mappingString: "unit4"},
                    "arkivdel": {type: FieldType.STRING, mappingString: "unit3"},
                    "id": {type: FieldType.STRING, mappingString: null},
                    "journalenhet": {type: FieldType.STRING, mappingString: "unit0"},
                    "status": {type: FieldType.STRING, mappingString: null},
                    "tilgangsrestriksjon": {type: FieldType.STRING, mappingString: "code42"},
                    "skjermingshjemmel": {type: FieldType.STRING, mappingString: "number6"},
                    "saksansvarlig": {type: FieldType.STRING, mappingString: "rand"},
                    "primarordningsprinsipp": {type: FieldType.STRING, mappingString: "prim"},
                    "sekundarordningsprinsipp": {type: FieldType.STRING, mappingString: "rose"},
                    "tertiarordningsprinsipp": {type: FieldType.STRING, mappingString: "everdeen"},
                    "primarklasse": {type: FieldType.DYNAMIC_STRING, mappingString: "1class"},
                    "sekundarklasse": {type: FieldType.DYNAMIC_STRING, mappingString: "2class"},
                    "tertiarklasse": {type: FieldType.DYNAMIC_STRING, mappingString: "3class"},
                    "primartittel": {type: FieldType.DYNAMIC_STRING, mappingString: "primTitle"},
                    "sekundartittel": {type: FieldType.DYNAMIC_STRING, mappingString: "secTitle"},
                    "tertiartittel": {type: FieldType.DYNAMIC_STRING, mappingString: "tertTitle"}
                },
                elementMappingPerKey: {},
                elementCollectionMappingPerKey: {}
            },
            "journalpost": {
                valueMappingPerKey: {
                    "tittel": {type: FieldType.DYNAMIC_STRING, mappingString: "record title"},
                    "offentligTittel": {type: FieldType.DYNAMIC_STRING, mappingString: "public record title"},
                    "administrativenhet": {type: FieldType.STRING, mappingString: "unit33"},
                    "journalstatus": {type: FieldType.STRING, mappingString: "N"},
                    "journalposttype": {type: FieldType.STRING, mappingString: "A"},
                    "saksbehandler": {type: FieldType.STRING, mappingString: "boba"},
                    "tilgangsrestriksjon": {type: FieldType.STRING, mappingString: "code89"},
                    "skjermingshjemmel": {type: FieldType.STRING, mappingString: "p34"}
                },
                elementMappingPerKey: {},
                elementCollectionMappingPerKey: {
                    "dokumentbeskrivelse": {
                        elementMappings: [
                            {
                                valueMappingPerKey: {
                                    "tittel": {type: FieldType.DYNAMIC_STRING, mappingString: "record title"},
                                    "dokumentstatus": {type: FieldType.STRING, mappingString: "D9"},
                                    "dokumentType": {type: FieldType.STRING, mappingString: "cat8"},
                                    "tilknyttetRegistreringSom": {type: FieldType.URL, mappingString: "www.kodeverk.no/H"}
                                },
                                elementMappingPerKey: {},
                                elementCollectionMappingPerKey: {
                                    "dokumentobjekt": {
                                        elementMappings: [
                                            {
                                                valueMappingPerKey: {
                                                    "format": {type: FieldType.STRING, mappingString: "www.kodeverk.no/A"},
                                                    "variantformat": {type: FieldType.STRING, mappingString: "www.kodeverk.no/PDF"},
                                                    "fil": {type: FieldType.FILE, mappingString: "$ifg{formPdf}"}
                                                },
                                                elementMappingPerKey: {},
                                                elementCollectionMappingPerKey: {}
                                            }
                                        ],
                                        elementsFromCollectionMappings: [
                                        ]
                                    }
                                }
                            }
                        ],
                        elementsFromCollectionMappings: [
                            {
                                instanceCollectionReferencesOrdered: ["$if(vedlegg)"],
                                elementMapping: {
                                    valueMappingPerKey: {
                                        "tittel": {type: FieldType.DYNAMIC_STRING, mappingString: "$ifg{name}"},
                                        "dokumentstatus": {type: FieldType.STRING, mappingString: "D9"},
                                        "dokumentType": {type: FieldType.STRING, mappingString: "cat8"},
                                        "tilknyttetRegistreringSom": {type: FieldType.STRING, mappingString: "www.kodeverk.no/V"}
                                    },
                                    elementMappingPerKey: {},
                                    elementCollectionMappingPerKey: {
                                        "dokumentobjekt": {
                                            elementMappings: [
                                                {
                                                    valueMappingPerKey: {
                                                        "format": {type: FieldType.DYNAMIC_STRING, mappingString: "www.kodeverk.no/PDF"},
                                                        "variantformat": {type: FieldType.STRING, mappingString: "www.kodeverk.no/PDF"},
                                                        "fil": {type: FieldType.DYNAMIC_STRING, mappingString: "$igf{file}"}
                                                    },
                                                    elementMappingPerKey: {},
                                                    elementCollectionMappingPerKey: {}
                                                }
                                            ],
                                            elementsFromCollectionMappings: []
                                        }
                                    }
                                }
                            }
                        ]

                    },
                    "korrespondansepart": {
                        elementMappings: [{
                            valueMappingPerKey: {
                                "fødselsnummer": {type: FieldType.DYNAMIC_STRING, mappingString: "123456789"},
                                "organisasjonsnummer": {type: FieldType.DYNAMIC_STRING, mappingString: null},
                                "kontaktperson": {type: FieldType.DYNAMIC_STRING, mappingString: "donna"},
                                "korrespondansepartNavn": {type: FieldType.DYNAMIC_STRING, mappingString: "Anakin Skywalker"},
                                "korrespondanseparttype": {type: FieldType.STRING, mappingString: "avsender"}
                            },
                            elementMappingPerKey: {
                                "adresse": {
                                    valueMappingPerKey: {
                                        "adresselinje": {type: FieldType.DYNAMIC_STRING, mappingString: "highstreet 22"},
                                        "postnummer": {type: FieldType.DYNAMIC_STRING, mappingString: "1234"},
                                        "poststed": {type: FieldType.DYNAMIC_STRING, mappingString: "Moria"}
                                    },
                                    elementMappingPerKey: {},
                                    elementCollectionMappingPerKey: {}
                                },
                                "kontaktinformasjon": {
                                    valueMappingPerKey: {
                                        "epostadresse": {type: FieldType.DYNAMIC_STRING, mappingString: "hello@world.no"},
                                        "mobiltelefonnummer": {type: FieldType.DYNAMIC_STRING, mappingString: "12345678"},
                                        "telefonnummer": {type: FieldType.DYNAMIC_STRING, mappingString: "12345678"}
                                    },
                                    elementMappingPerKey: {},
                                    elementCollectionMappingPerKey: {}
                                },
                                "skjerming": {
                                    valueMappingPerKey: {
                                        "tilgangsrestriksjon": {type: FieldType.DYNAMIC_STRING, mappingString: "code2"},
                                        "skjermingshjemmel": {type: FieldType.DYNAMIC_STRING, mappingString: "p3"}
                                    },
                                    elementMappingPerKey: {},
                                    elementCollectionMappingPerKey: {}
                                }
                            },
                            elementCollectionMappingPerKey: {}
                        }],
                        elementsFromCollectionMappings: []
                    }
                }
            }
        },
        elementCollectionMappingPerKey: {}
    },
    "integrationMetadataId": 321
}

export const MOCK_EMPTY_CONFIGURATION: IConfiguration = {
    "comment": "form to test empty mapping",
    "completed": false,
    "mapping": {
        valueMappingPerKey: {},
        elementMappingPerKey: {},
        elementCollectionMappingPerKey: {}
    },
    "id": "123",
    "integrationId": "id0",
    "integrationMetadataId": 321
}

export const MOCK_NEW_CONFIG: IConfiguration = {
    id: 'id2',
    integrationId: '123',
    version: 3,
    completed: false,
    comment: 'Ikke ferdigstilt',
    mapping: {
        valueMappingPerKey: {},
        elementMappingPerKey: {
            "sak": {
                valueMappingPerKey: {
                    "type": {type: FieldType.STRING, mappingString: "NEW"},
                    "tittel": {type: FieldType.DYNAMIC_STRING, mappingString: "Title of case"},
                    "offentligTittel": {type: FieldType.DYNAMIC_STRING, mappingString: "public title"},
                    "saksmappetype": {type: FieldType.STRING, mappingString: "casetype"},
                    "administrativenhet": {type: FieldType.STRING, mappingString: "unit4"},
                    "arkivdel": {type: FieldType.STRING, mappingString: "unit3"},
                    "journalenhet": {type: FieldType.STRING, mappingString: "unit0"},
                    "status": {type: FieldType.STRING, mappingString: null},
                    "tilgangsrestriksjon": {type: FieldType.STRING, mappingString: "code42"},
                    "skjermingshjemmel": {type: FieldType.STRING, mappingString: "number6"},
                    "saksansvarlig": {type: FieldType.STRING, mappingString: "rand"},
                    "primarordningsprinsipp": {type: FieldType.STRING, mappingString: "prim"},
                    "sekundarordningsprinsipp": {type: FieldType.STRING, mappingString: "rose"},
                    "tertiarordningsprinsipp": {type: FieldType.STRING, mappingString: "everdeen"},
                    "primarklasse": {type: FieldType.DYNAMIC_STRING, mappingString: "1class"},
                    "sekundarklasse": {type: FieldType.DYNAMIC_STRING, mappingString: "2class"},
                    "tertiarklasse": {type: FieldType.DYNAMIC_STRING, mappingString: "3class"},
                    "primartittel": {type: FieldType.DYNAMIC_STRING, mappingString: "primTitle"},
                    "sekundartittel": {type: FieldType.DYNAMIC_STRING, mappingString: "secTitle"},
                    "tertiartittel": {type: FieldType.DYNAMIC_STRING, mappingString: "tertTitle"}
                },
                elementMappingPerKey: {},
                elementCollectionMappingPerKey: {}
            },
            "journalpost": {
                valueMappingPerKey: {
                    "tittel": {type: FieldType.DYNAMIC_STRING, mappingString: "record title"},
                    "offentligTittel": {type: FieldType.DYNAMIC_STRING, mappingString: "public record title"},
                    "administrativenhet": {type: FieldType.STRING, mappingString: "unit33"},
                    "journalstatus": {type: FieldType.STRING, mappingString: "N"},
                    "journalposttype": {type: FieldType.STRING, mappingString: "A"},
                    "saksbehandler": {type: FieldType.STRING, mappingString: "boba"},
                    "tilgangsrestriksjon": {type: FieldType.STRING, mappingString: "code89"},
                    "skjermingshjemmel": {type: FieldType.STRING, mappingString: "p34"}
                },
                elementMappingPerKey: {},
                elementCollectionMappingPerKey: {
                    "dokumentbeskrivelse": {
                        elementMappings: [
                            {
                                valueMappingPerKey: {
                                    "tittel": {type: FieldType.DYNAMIC_STRING, mappingString: "record title"},
                                    "dokumentstatus": {type: FieldType.STRING, mappingString: "D9"},
                                    "dokumentType": {type: FieldType.STRING, mappingString: "cat8"},
                                    "tilknyttetRegistreringSom": {type: FieldType.URL, mappingString: "www.kodeverk.no/H"}
                                },
                                elementMappingPerKey: {},
                                elementCollectionMappingPerKey: {
                                    "dokumentobjekt": {
                                        elementMappings: [
                                            {
                                                valueMappingPerKey: {
                                                    "format": {type: FieldType.STRING, mappingString: "www.kodeverk.no/A"},
                                                    "variantformat": {type: FieldType.STRING, mappingString: "www.kodeverk.no/PDF"},
                                                    "fil": {type: FieldType.FILE, mappingString: "$ifg{formPdf}"}
                                                },
                                                elementMappingPerKey: {},
                                                elementCollectionMappingPerKey: {}
                                            }
                                        ],
                                        elementsFromCollectionMappings: [
                                        ]
                                    }
                                }
                            }
                        ],
                        elementsFromCollectionMappings: [
                            {
                                instanceCollectionReferencesOrdered: ["$if(vedlegg)"],
                                elementMapping: {
                                    valueMappingPerKey: {
                                        "tittel": {type: FieldType.DYNAMIC_STRING, mappingString: "$ifg{name}"},
                                        "dokumentstatus": {type: FieldType.STRING, mappingString: "D9"},
                                        "dokumentType": {type: FieldType.STRING, mappingString: "cat8"},
                                        "tilknyttetRegistreringSom": {type: FieldType.STRING, mappingString: "www.kodeverk.no/V"}
                                    },
                                    elementMappingPerKey: {},
                                    elementCollectionMappingPerKey: {
                                        "dokumentobjekt": {
                                            elementMappings: [
                                                {
                                                    valueMappingPerKey: {
                                                        "format": {type: FieldType.DYNAMIC_STRING, mappingString: "www.kodeverk.no/PDF"},
                                                        "variantformat": {type: FieldType.STRING, mappingString: "www.kodeverk.no/PDF"},
                                                        "fil": {type: FieldType.DYNAMIC_STRING, mappingString: "$igf{file}"}
                                                    },
                                                    elementMappingPerKey: {},
                                                    elementCollectionMappingPerKey: {}
                                                }
                                            ],
                                            elementsFromCollectionMappings: []
                                        }
                                    }
                                }
                            }
                        ]

                    },
                    "korrespondansepart": {
                        elementMappings: [{
                            valueMappingPerKey: {
                                "fødselsnummer": {type: FieldType.DYNAMIC_STRING, mappingString: "123456789"},
                                "organisasjonsnummer": {type: FieldType.DYNAMIC_STRING, mappingString: null},
                                "kontaktperson": {type: FieldType.DYNAMIC_STRING, mappingString: "donna"},
                                "korrespondansepartNavn": {type: FieldType.DYNAMIC_STRING, mappingString: "Anakin Skywalker"},
                                "korrespondanseparttype": {type: FieldType.STRING, mappingString: "avsender"}
                            },
                            elementMappingPerKey: {
                                "adresse": {
                                    valueMappingPerKey: {
                                        "adresselinje": {type: FieldType.DYNAMIC_STRING, mappingString: "highstreet 22"},
                                        "postnummer": {type: FieldType.DYNAMIC_STRING, mappingString: "1234"},
                                        "poststed": {type: FieldType.DYNAMIC_STRING, mappingString: "Moria"}
                                    },
                                    elementMappingPerKey: {},
                                    elementCollectionMappingPerKey: {}
                                },
                                "kontaktinformasjon": {
                                    valueMappingPerKey: {
                                        "epostadresse": {type: FieldType.DYNAMIC_STRING, mappingString: "hello@world.no"},
                                        "mobiltelefonnummer": {type: FieldType.DYNAMIC_STRING, mappingString: "12345678"},
                                        "telefonnummer": {type: FieldType.DYNAMIC_STRING, mappingString: "12345678"}
                                    },
                                    elementMappingPerKey: {},
                                    elementCollectionMappingPerKey: {}
                                },
                                "skjerming": {
                                    valueMappingPerKey: {
                                        "tilgangsrestriksjon": {type: FieldType.DYNAMIC_STRING, mappingString: "code2"},
                                        "skjermingshjemmel": {type: FieldType.DYNAMIC_STRING, mappingString: "p3"}
                                    },
                                    elementMappingPerKey: {},
                                    elementCollectionMappingPerKey: {}
                                }
                            },
                            elementCollectionMappingPerKey: {}
                        }],
                        elementsFromCollectionMappings: []
                    }
                }
            }
        },
        elementCollectionMappingPerKey: {}
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
        elementMappingPerKey: {
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
                    "status": {type: FieldType.STRING, mappingString: null},
                    "tilgangsrestriksjon": {type: FieldType.STRING, mappingString: null},
                    "skjermingshjemmel": {type: FieldType.STRING, mappingString: null},
                    "saksansvarlig": {type: FieldType.STRING, mappingString: null},
                    "primarordningsprinsipp": {type: FieldType.STRING, mappingString: null},
                    "sekundarordningsprinsipp": {type: FieldType.STRING, mappingString: null},
                    "tertiarordningsprinsipp": {type: FieldType.STRING, mappingString: null},
                    "primarklasse": {type: FieldType.DYNAMIC_STRING, mappingString: null},
                    "sekundarklasse": {type: FieldType.DYNAMIC_STRING, mappingString: null},
                    "tertiarklasse": {type: FieldType.DYNAMIC_STRING, mappingString: null},
                    "primartittel": {type: FieldType.DYNAMIC_STRING, mappingString: null},
                    "sekundartittel": {type: FieldType.DYNAMIC_STRING, mappingString: null},
                    "tertiartittel": {type: FieldType.DYNAMIC_STRING, mappingString: null}
                },
                elementMappingPerKey: {},
                elementCollectionMappingPerKey: {}
            },
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
                elementMappingPerKey: {},
                elementCollectionMappingPerKey: {
                    "dokumentbeskrivelse": {
                        elementMappings: [
                            {
                                valueMappingPerKey: {
                                    "tittel": {type: FieldType.DYNAMIC_STRING, mappingString: "foo $if{bar}"},
                                    "dokumentstatus": {type: FieldType.STRING, mappingString: null},
                                    "dokumentType": {type: FieldType.STRING, mappingString: null},
                                    "tilknyttetRegistreringSom": {type: FieldType.URL, mappingString: null}
                                },
                                elementMappingPerKey: {},
                                elementCollectionMappingPerKey: {
                                    "dokumentobjekt": {
                                        elementMappings: [
                                            {
                                                valueMappingPerKey: {
                                                    "format": {type: FieldType.STRING, mappingString: null},
                                                    "variantformat": {type: FieldType.STRING, mappingString: null},
                                                    "fil": {type: FieldType.FILE, mappingString: null}
                                                },
                                                elementMappingPerKey: {},
                                                elementCollectionMappingPerKey: {}
                                            }
                                        ],
                                        elementsFromCollectionMappings: [
                                        ]
                                    }
                                }
                            }
                        ],
                        elementsFromCollectionMappings: [
                            {
                                instanceCollectionReferencesOrdered: ["$if(vedlegg)"],
                                elementMapping: {
                                    valueMappingPerKey: {
                                        "tittel": {type: FieldType.DYNAMIC_STRING, mappingString: null},
                                        "dokumentstatus": {type: FieldType.STRING, mappingString: null},
                                        "dokumentType": {type: FieldType.STRING, mappingString: null},
                                        "tilknyttetRegistreringSom": {type: FieldType.STRING, mappingString: null}
                                    },
                                    elementMappingPerKey: {},
                                    elementCollectionMappingPerKey: {
                                        "dokumentobjekt": {
                                            elementMappings: [
                                                {
                                                    valueMappingPerKey: {
                                                        "format": {type: FieldType.DYNAMIC_STRING, mappingString: null},
                                                        "variantformat": {type: FieldType.STRING, mappingString: null},
                                                        "fil": {type: FieldType.DYNAMIC_STRING, mappingString: null}
                                                    },
                                                    elementMappingPerKey: {},
                                                    elementCollectionMappingPerKey: {}
                                                }
                                            ],
                                            elementsFromCollectionMappings: []
                                        }
                                    }
                                }
                            }
                        ]

                    },
                    "korrespondansepart": {
                        elementMappings: [{
                            valueMappingPerKey: {
                                "fødselsnummer": {type: FieldType.DYNAMIC_STRING, mappingString: null},
                                "organisasjonsnummer": {type: FieldType.DYNAMIC_STRING, mappingString: null},
                                "kontaktperson": {type: FieldType.DYNAMIC_STRING, mappingString: null},
                                "korrespondansepartNavn": {type: FieldType.DYNAMIC_STRING, mappingString: null},
                                "korrespondanseparttype": {type: FieldType.STRING, mappingString: null}
                            },
                            elementMappingPerKey: {
                                "adresse": {
                                    valueMappingPerKey: {
                                        "adresselinje": {type: FieldType.DYNAMIC_STRING, mappingString: null},
                                        "postnummer": {type: FieldType.DYNAMIC_STRING, mappingString: null},
                                        "poststed": {type: FieldType.DYNAMIC_STRING, mappingString: null}
                                    },
                                    elementMappingPerKey: {},
                                    elementCollectionMappingPerKey: {}
                                },
                                "kontaktinformasjon": {
                                    valueMappingPerKey: {
                                        "epostadresse": {type: FieldType.DYNAMIC_STRING, mappingString: null},
                                        "mobiltelefonnummer": {type: FieldType.DYNAMIC_STRING, mappingString: null},
                                        "telefonnummer": {type: FieldType.DYNAMIC_STRING, mappingString: null}
                                    },
                                    elementMappingPerKey: {},
                                    elementCollectionMappingPerKey: {}
                                },
                                "skjerming": {
                                    valueMappingPerKey: {
                                        "tilgangsrestriksjon": {type: FieldType.DYNAMIC_STRING, mappingString: null},
                                        "skjermingshjemmel": {type: FieldType.DYNAMIC_STRING, mappingString: null}
                                    },
                                    elementMappingPerKey: {},
                                    elementCollectionMappingPerKey: {}
                                }
                            },
                            elementCollectionMappingPerKey: {}
                        }],
                        elementsFromCollectionMappings: []
                    }
                }
            }
        },
        elementCollectionMappingPerKey: {}
    },

}

export const MOCK_AV_CONFIGURATION_NEW: IAVConfiguration = {
    comment: "form to test mapping",
    completed: false,
    id: "234",
    integrationId: "id1",
    integrationMetadataId: 321,
    mapping: {
        valueMappingPerKey: {},
        elementMappingPerKey: {
            "sak": {
                valueMappingPerKey: {
                    "type": {type: FieldType.STRING, mappingString: "NEW"},
                    "tittel": {type: FieldType.DYNAMIC_STRING, mappingString: "Title of case"},
                    "offentligTittel": {type: FieldType.DYNAMIC_STRING, mappingString: "public title"},
                    "saksmappetype": {type: FieldType.STRING, mappingString: "casetype"},
                    "administrativenhet": {type: FieldType.STRING, mappingString: "unit4"},
                    "arkivdel": {type: FieldType.STRING, mappingString: "unit3"},
                    "journalenhet": {type: FieldType.STRING, mappingString: "unit0"},
                    "status": {type: FieldType.STRING, mappingString: null},
                    "tilgangsrestriksjon": {type: FieldType.STRING, mappingString: "code42"},
                    "skjermingshjemmel": {type: FieldType.STRING, mappingString: "number6"},
                    "saksansvarlig": {type: FieldType.STRING, mappingString: "rand"},
                    "primarordningsprinsipp": {type: FieldType.STRING, mappingString: "prim"},
                    "sekundarordningsprinsipp": {type: FieldType.STRING, mappingString: "rose"},
                    "tertiarordningsprinsipp": {type: FieldType.STRING, mappingString: "everdeen"},
                    "primarklasse": {type: FieldType.DYNAMIC_STRING, mappingString: "1class"},
                    "sekundarklasse": {type: FieldType.DYNAMIC_STRING, mappingString: "2class"},
                    "tertiarklasse": {type: FieldType.DYNAMIC_STRING, mappingString: "3class"},
                    "primartittel": {type: FieldType.DYNAMIC_STRING, mappingString: "primTitle"},
                    "sekundartittel": {type: FieldType.DYNAMIC_STRING, mappingString: "secTitle"},
                    "tertiartittel": {type: FieldType.DYNAMIC_STRING, mappingString: "tertTitle"}
                },
                elementMappingPerKey: {},
                elementCollectionMappingPerKey: {}
            },
            "journalpost": {
                valueMappingPerKey: {
                    "tittel": {type: FieldType.DYNAMIC_STRING, mappingString: "record title"},
                    "offentligTittel": {type: FieldType.DYNAMIC_STRING, mappingString: "public record title"},
                    "administrativenhet": {type: FieldType.STRING, mappingString: "unit33"},
                    "journalstatus": {type: FieldType.STRING, mappingString: "N"},
                    "journalposttype": {type: FieldType.STRING, mappingString: "A"},
                    "saksbehandler": {type: FieldType.STRING, mappingString: "boba"},
                    "tilgangsrestriksjon": {type: FieldType.STRING, mappingString: "code89"},
                    "skjermingshjemmel": {type: FieldType.STRING, mappingString: "p34"}
                },
                elementMappingPerKey: {},
                elementCollectionMappingPerKey: {
                    "dokumentbeskrivelse": {
                        elementMappings: [
                            {
                                valueMappingPerKey: {
                                    "tittel": {type: FieldType.DYNAMIC_STRING, mappingString: "record title"},
                                    "dokumentstatus": {type: FieldType.STRING, mappingString: "D9"},
                                    "dokumentType": {type: FieldType.STRING, mappingString: "cat8"},
                                    "tilknyttetRegistreringSom": {type: FieldType.STRING, mappingString: "www.kodeverk.no/H"}
                                },
                                elementMappingPerKey: {},
                                elementCollectionMappingPerKey: {
                                    "dokumentobjekt": {
                                        elementMappings: [
                                            {
                                                valueMappingPerKey: {
                                                    "format": {type: FieldType.STRING, mappingString: "www.kodeverk.no/A"},
                                                    "variantformat": {type: FieldType.STRING, mappingString: "www.kodeverk.no/PDF"},
                                                    "fil": {type: FieldType.FILE, mappingString: "$ifg{formPdf}"}
                                                },
                                                elementMappingPerKey: {},
                                                elementCollectionMappingPerKey: {}
                                            }
                                        ],
                                        elementsFromCollectionMappings: [
                                        ]
                                    }
                                }
                            }
                        ],
                        elementsFromCollectionMappings: [
                            {
                                instanceCollectionReferencesOrdered: ["$if(vedlegg)"],
                                elementMapping: {
                                    valueMappingPerKey: {
                                        "tittel": {type: FieldType.DYNAMIC_STRING, mappingString: "$ifg{name}"},
                                        "dokumentstatus": {type: FieldType.STRING, mappingString: "D9"},
                                        "dokumentType": {type: FieldType.STRING, mappingString: "cat8"},
                                        "tilknyttetRegistreringSom": {type: FieldType.STRING, mappingString: "www.kodeverk.no/V"}
                                    },
                                    elementMappingPerKey: {},
                                    elementCollectionMappingPerKey: {
                                        "dokumentobjekt": {
                                            elementMappings: [
                                                {
                                                    valueMappingPerKey: {
                                                        "format": {type: FieldType.DYNAMIC_STRING, mappingString: "www.kodeverk.no/PDF"},
                                                        "variantformat": {type: FieldType.STRING, mappingString: "www.kodeverk.no/PDF"},
                                                        "fil": {type: FieldType.DYNAMIC_STRING, mappingString: "$igf{file}"}
                                                    },
                                                    elementMappingPerKey: {},
                                                    elementCollectionMappingPerKey: {}
                                                }
                                            ],
                                            elementsFromCollectionMappings: []
                                        }
                                    }
                                }
                            }
                        ]

                    },
                    "korrespondansepart": {
                        elementMappings: [{
                            valueMappingPerKey: {
                                "fødselsnummer": {type: FieldType.DYNAMIC_STRING, mappingString: "123456789"},
                                "organisasjonsnummer": {type: FieldType.DYNAMIC_STRING, mappingString: null},
                                "kontaktperson": {type: FieldType.DYNAMIC_STRING, mappingString: "donna"},
                                "korrespondansepartNavn": {type: FieldType.DYNAMIC_STRING, mappingString: "Anakin Skywalker"},
                                "korrespondanseparttype": {type: FieldType.STRING, mappingString: "avsender"}
                            },
                            elementMappingPerKey: {
                                "adresse": {
                                    valueMappingPerKey: {
                                        "adresselinje": {type: FieldType.DYNAMIC_STRING, mappingString: "highstreet 22"},
                                        "postnummer": {type: FieldType.DYNAMIC_STRING, mappingString: "1234"},
                                        "poststed": {type: FieldType.DYNAMIC_STRING, mappingString: "Moria"}
                                    },
                                    elementMappingPerKey: {},
                                    elementCollectionMappingPerKey: {}
                                },
                                "kontaktinformasjon": {
                                    valueMappingPerKey: {
                                        "epostadresse": {type: FieldType.DYNAMIC_STRING, mappingString: "hello@world.no"},
                                        "mobiltelefonnummer": {type: FieldType.DYNAMIC_STRING, mappingString: "12345678"},
                                        "telefonnummer": {type: FieldType.DYNAMIC_STRING, mappingString: "12345678"}
                                    },
                                    elementMappingPerKey: {},
                                    elementCollectionMappingPerKey: {}
                                },
                                "skjerming": {
                                    valueMappingPerKey: {
                                        "tilgangsrestriksjon": {type: FieldType.DYNAMIC_STRING, mappingString: "code2"},
                                        "skjermingshjemmel": {type: FieldType.DYNAMIC_STRING, mappingString: "p3"}
                                    },
                                    elementMappingPerKey: {},
                                    elementCollectionMappingPerKey: {}
                                }
                            },
                            elementCollectionMappingPerKey: {}
                        }],
                        elementsFromCollectionMappings: []
                    }
                }
            }
        },
        elementCollectionMappingPerKey: {}
    }
}

export const MOCK_AV_CONFIGURATION_NEW_NOT_PROTECTED: IAVConfiguration = {
    comment: "form to test mapping",
    completed: false,
    id: "234",
    integrationId: "id1",
    integrationMetadataId: 321,
    mapping: {
        valueMappingPerKey: {},
        elementMappingPerKey: {
            "sak": {
                valueMappingPerKey: {
                    "type": {type: FieldType.STRING, mappingString: "NEW"},
                    "tittel": {type: FieldType.DYNAMIC_STRING, mappingString: "Title of case"},
                    "offentligTittel": {type: FieldType.DYNAMIC_STRING, mappingString: "public title"},
                    "saksmappetype": {type: FieldType.STRING, mappingString: "casetype"},
                    "administrativenhet": {type: FieldType.STRING, mappingString: "unit4"},
                    "arkivdel": {type: FieldType.STRING, mappingString: "unit3"},
                    "journalenhet": {type: FieldType.STRING, mappingString: "unit0"},
                    "status": {type: FieldType.STRING, mappingString: null},
                    "tilgangsrestriksjon": {type: FieldType.STRING, mappingString: "code42"},
                    "skjermingshjemmel": {type: FieldType.STRING, mappingString: "number6"},
                    "saksansvarlig": {type: FieldType.STRING, mappingString: "rand"},
                    "primarordningsprinsipp": {type: FieldType.STRING, mappingString: "prim"},
                    "sekundarordningsprinsipp": {type: FieldType.STRING, mappingString: "rose"},
                    "tertiarordningsprinsipp": {type: FieldType.STRING, mappingString: "everdeen"},
                    "primarklasse": {type: FieldType.DYNAMIC_STRING, mappingString: "1class"},
                    "sekundarklasse": {type: FieldType.DYNAMIC_STRING, mappingString: "2class"},
                    "tertiarklasse": {type: FieldType.DYNAMIC_STRING, mappingString: "3class"},
                    "primartittel": {type: FieldType.DYNAMIC_STRING, mappingString: "primTitle"},
                    "sekundartittel": {type: FieldType.DYNAMIC_STRING, mappingString: "secTitle"},
                    "tertiartittel": {type: FieldType.DYNAMIC_STRING, mappingString: "tertTitle"}
                },
                elementMappingPerKey: {},
                elementCollectionMappingPerKey: {}
            },
            "journalpost": {
                valueMappingPerKey: {
                    "tittel": {type: FieldType.DYNAMIC_STRING, mappingString: "record title"},
                    "offentligTittel": {type: FieldType.DYNAMIC_STRING, mappingString: "public record title"},
                    "administrativenhet": {type: FieldType.STRING, mappingString: "unit33"},
                    "journalstatus": {type: FieldType.STRING, mappingString: "N"},
                    "journalposttype": {type: FieldType.STRING, mappingString: "A"},
                    "saksbehandler": {type: FieldType.STRING, mappingString: "boba"},
                    "tilgangsrestriksjon": {type: FieldType.STRING, mappingString: "code89"},
                    "skjermingshjemmel": {type: FieldType.STRING, mappingString: "p34"}
                },
                elementMappingPerKey: {},
                elementCollectionMappingPerKey: {
                    "dokumentbeskrivelse": {
                        elementMappings: [
                            {
                                valueMappingPerKey: {
                                    "tittel": {type: FieldType.DYNAMIC_STRING, mappingString: "record title"},
                                    "dokumentstatus": {type: FieldType.STRING, mappingString: "D9"},
                                    "dokumentType": {type: FieldType.STRING, mappingString: "cat8"},
                                    "tilknyttetRegistreringSom": {type: FieldType.STRING, mappingString: "www.kodeverk.no/H"}
                                },
                                elementMappingPerKey: {},
                                elementCollectionMappingPerKey: {
                                    "dokumentobjekt": {
                                        elementMappings: [
                                            {
                                                valueMappingPerKey: {
                                                    "format": {type: FieldType.STRING, mappingString: "www.kodeverk.no/A"},
                                                    "variantformat": {type: FieldType.STRING, mappingString: "www.kodeverk.no/PDF"},
                                                    "fil": {type: FieldType.FILE, mappingString: "$ifg{formPdf}"}
                                                },
                                                elementMappingPerKey: {},
                                                elementCollectionMappingPerKey: {}
                                            }
                                        ],
                                        elementsFromCollectionMappings: [
                                        ]
                                    }
                                }
                            }
                        ],
                        elementsFromCollectionMappings: [
                            {
                                instanceCollectionReferencesOrdered: ["$if(vedlegg)"],
                                elementMapping: {
                                    valueMappingPerKey: {
                                        "tittel": {type: FieldType.DYNAMIC_STRING, mappingString: "$ifg{name}"},
                                        "dokumentstatus": {type: FieldType.STRING, mappingString: "D9"},
                                        "dokumentType": {type: FieldType.STRING, mappingString: "cat8"},
                                        "tilknyttetRegistreringSom": {type: FieldType.STRING, mappingString: "www.kodeverk.no/V"}
                                    },
                                    elementMappingPerKey: {},
                                    elementCollectionMappingPerKey: {
                                        "dokumentobjekt": {
                                            elementMappings: [
                                                {
                                                    valueMappingPerKey: {
                                                        "format": {type: FieldType.DYNAMIC_STRING, mappingString: "www.kodeverk.no/PDF"},
                                                        "variantformat": {type: FieldType.STRING, mappingString: "www.kodeverk.no/PDF"},
                                                        "fil": {type: FieldType.DYNAMIC_STRING, mappingString: "$igf{file}"}
                                                    },
                                                    elementMappingPerKey: {},
                                                    elementCollectionMappingPerKey: {}
                                                }
                                            ],
                                            elementsFromCollectionMappings: []
                                        }
                                    }
                                }
                            }
                        ]

                    },
                    "korrespondansepart": {
                        elementMappings: [{
                            valueMappingPerKey: {
                                "fødselsnummer": {type: FieldType.DYNAMIC_STRING, mappingString: "123456789"},
                                "organisasjonsnummer": {type: FieldType.DYNAMIC_STRING, mappingString: null},
                                "kontaktperson": {type: FieldType.DYNAMIC_STRING, mappingString: "donna"},
                                "korrespondansepartNavn": {type: FieldType.DYNAMIC_STRING, mappingString: "Anakin Skywalker"},
                                "korrespondanseparttype": {type: FieldType.STRING, mappingString: "avsender"}
                            },
                            elementMappingPerKey: {
                                "adresse": {
                                    valueMappingPerKey: {
                                        "adresselinje": {type: FieldType.DYNAMIC_STRING, mappingString: "highstreet 22"},
                                        "postnummer": {type: FieldType.DYNAMIC_STRING, mappingString: "1234"},
                                        "poststed": {type: FieldType.DYNAMIC_STRING, mappingString: "Moria"}
                                    },
                                    elementMappingPerKey: {},
                                    elementCollectionMappingPerKey: {}
                                },
                                "kontaktinformasjon": {
                                    valueMappingPerKey: {
                                        "epostadresse": {type: FieldType.DYNAMIC_STRING, mappingString: "hello@world.no"},
                                        "mobiltelefonnummer": {type: FieldType.DYNAMIC_STRING, mappingString: "12345678"},
                                        "telefonnummer": {type: FieldType.DYNAMIC_STRING, mappingString: "12345678"}
                                    },
                                    elementMappingPerKey: {},
                                    elementCollectionMappingPerKey: {}
                                },
                                "skjerming": {
                                    valueMappingPerKey: {},
                                    elementMappingPerKey: {},
                                    elementCollectionMappingPerKey: {}
                                }
                            },
                            elementCollectionMappingPerKey: {}
                        }],
                        elementsFromCollectionMappings: []
                    }
                }
            }
        },
        elementCollectionMappingPerKey: {}
    }
}
