// noinspection DuplicatedCode

import {
    FieldConfigurationType,
    newIConfiguration
} from "../../features/integration/types/Configuration";
import {CreationStrategy} from "../../features/integration/types/CreationStrategy";

export const MOCK_AV_CONFIGURATION_TEST: newIConfiguration = {
    elements: [
        {
            key: 'sak',
            fieldConfigurations: [
                {
                    key: 'tittel',
                    type: FieldConfigurationType.DYNAMIC_STRING,
                    value: 'hei'
                }
            ],
        },
        {
            key: 'journalpost',
            fieldConfigurations: [
                {
                    key: 'tittel',
                    type: FieldConfigurationType.DYNAMIC_STRING,
                    value: 'hei'
                }
            ],
            collectionElements: [
                {
                    key: 'dokumentbeskrivelse',
                    fixed: [
                        {
                            fieldConfigurations: [
                                {
                                    key: 'tittel',
                                    type: FieldConfigurationType.DYNAMIC_STRING,
                                    value: '$ifg{name}'
                                },
                                {
                                    key: 'dokumentstatus',
                                    type: FieldConfigurationType.STRING,
                                    value: 'test'
                                },
                                {
                                    key: 'dokumentType',
                                    type: FieldConfigurationType.STRING,
                                    value: 'test'
                                },
                                {
                                    key: 'tilknyttetRegistreringSom',
                                    type: FieldConfigurationType.URL,
                                    value: 'www.kodeverk.no/H'
                                }
                            ],
                            collectionElements: [
                                {
                                    key: 'dokumentObjekt',
                                    fixed: [
                                        {
                                            fieldConfigurations: [
                                                {
                                                    key: 'format',
                                                    type: FieldConfigurationType.URL,
                                                    value: 'www.kodeverk.no/PDF'
                                                },
                                                {
                                                    key: 'variantformat',
                                                    type: FieldConfigurationType.URL,
                                                    value: 'www.kodeverk.no/A'
                                                },
                                                {
                                                    key: 'fil',
                                                    type: FieldConfigurationType.DYNAMIC_STRING,
                                                    value: '$ifg{formPdf}'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    fromCollection: [
                        {
                            collectionReference: 'vedlegg',
                            fieldConfigurations: [
                                {
                                    key: 'tittel',
                                    type: FieldConfigurationType.DYNAMIC_STRING,
                                    value: '$ifg{name}'
                                },
                                {
                                    key: 'dokumentstatus',
                                    type: FieldConfigurationType.STRING,
                                    value: 'test'
                                },
                                {
                                    key: 'dokumentType',
                                    type: FieldConfigurationType.STRING,
                                    value: 'test'
                                },
                                {
                                    key: 'tilknyttetRegistreringSom',
                                    type: FieldConfigurationType.URL,
                                    value: 'www.kodeverk.no/V'
                                }
                            ],
                            collectionElements: [
                                {
                                    key: 'dokumentObjekt',
                                    fixed: [
                                        {
                                            fieldConfigurations: [
                                                {
                                                    key: 'format',
                                                    type: FieldConfigurationType.DYNAMIC_STRING,
                                                    value: '$igf{type}'
                                                },
                                                {
                                                    key: 'variantformat',
                                                    type: FieldConfigurationType.URL,
                                                    value: 'www.kodeverk.no/P'
                                                },
                                                {
                                                    key: 'fil',
                                                    type: FieldConfigurationType.DYNAMIC_STRING,
                                                    value: '$igf{file}'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    key: 'korrespondansepart',
                    fixed: [
                        {
                            fieldConfigurations: [
                                {
                                    key: 'fødselsnummer',
                                    type: FieldConfigurationType.DYNAMIC_STRING,
                                    value: '$if{fødselsnummer}'
                                },
                                {
                                    key: 'organisasjonsnummer',
                                    type: FieldConfigurationType.DYNAMIC_STRING,
                                    value: '$if{organisasjonsnummer}'
                                },
                                {
                                    key: 'kontaktperson',
                                    type: FieldConfigurationType.DYNAMIC_STRING,
                                    value: '$if{kontaktperson}'
                                },
                                {
                                    key: 'korrespondansepartNavn',
                                    type: FieldConfigurationType.DYNAMIC_STRING,
                                    value: '$if{fornavn} $if{etternavn}'
                                },
                                {
                                    key: 'korrespondansepartType',
                                    type: FieldConfigurationType.URL,
                                    value: 'kodeverk.no/korrespondansepartType/systemId/A'
                                }
                            ],
                            elements: [
                                {
                                    key: 'adresse',
                                    fieldConfigurations: [
                                        {
                                            key: 'adresselinje',
                                            type: FieldConfigurationType.DYNAMIC_STRING,
                                            value: '$if{adresse}'
                                        },
                                        {
                                            key: 'postnummer',
                                            type: FieldConfigurationType.DYNAMIC_STRING,
                                            value: '$if{postnummer}'
                                        },
                                        {
                                            key: 'poststed',
                                            type: FieldConfigurationType.DYNAMIC_STRING,
                                            value: '$if{poststed}'
                                        }
                                    ]
                                },
                                {
                                    key: 'kontaktinformasjon',
                                    fieldConfigurations: [
                                        {
                                            key: 'epostadresse',
                                            type: FieldConfigurationType.DYNAMIC_STRING,
                                            value: '$if{epost}'
                                        },
                                        {
                                            key: 'mobiltelefonnummer',
                                            type: FieldConfigurationType.DYNAMIC_STRING,
                                            value: '$if{mobil}'
                                        },
                                        {
                                            key: 'telefonnummer',
                                            type: FieldConfigurationType.DYNAMIC_STRING,
                                            value: '$if{telefon}'
                                        }
                                    ]
                                },
                                {
                                    key: 'skjerming',
                                    fieldConfigurations: [
                                        {
                                            key: 'tilgangsrestriksjon',
                                            type: FieldConfigurationType.URL,
                                            value: 'kodeverk.no/tilgangskode/A'
                                        },
                                        {
                                            key: 'skjermingshjemmel',
                                            type: FieldConfigurationType.URL,
                                            value: '$if{mobil}'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}

export const MOCK_AV_CONFIGURATION: newIConfiguration = {
    "comment": "form to test mapping",
    "completed": false,
    "elements": [
        {
            "fieldConfigurations": [
                {
                    "key": "type",
                    "type": "STRING",
                    "value": "NEW"
                },
                {
                    "key": "tittel",
                    "type": "DYNAMIC_STRING",
                    "value": "Title of case"
                },
                {
                    "key": "offentligTittel",
                    "type": "DYNAMIC_STRING",
                    "value": "public title"
                },
                {
                    "key": "saksmappetype",
                    "type": "STRING",
                    "value": "casetype"
                },
                {
                    "key": "administrativenhet",
                    "type": "STRING",
                    "value": "unit4"
                },
                {
                    "key": "arkivdel",
                    "type": "STRING",
                    "value": "unit3"
                },
                {
                    "key": "journalenhet",
                    "type": "STRING",
                    "value": "unit0"
                },
                {
                    "key": "status",
                    "type": "STRING",
                    "value": null
                },
                {
                    "key": "tilgangsrestriksjon",
                    "type": "STRING",
                    "value": "code42"
                },
                {
                    "key": "skjermingshjemmel",
                    "type": "STRING",
                    "value": "number6"
                },
                {
                    "key": "saksansvarlig",
                    "type": "STRING",
                    "value": "rand"
                },
                {
                    "key": "primarordningsprinsipp",
                    "type": "STRING",
                    "value": "prim"
                },
                {
                    "key": "sekundarordningsprinsipp",
                    "type": "STRING",
                    "value": "rose"
                },
                {
                    "key": "tertiarordningsprinsipp",
                    "type": "STRING",
                    "value": "everdeen"
                },
                {
                    "key": "primarklasse",
                    "type": "DYNAMIC_STRING",
                    "value": "1class"
                },
                {
                    "key": "sekundarklasse",
                    "type": "DYNAMIC_STRING",
                    "value": "2class"
                },
                {
                    "key": "tertiarklasse",
                    "type": "DYNAMIC_STRING",
                    "value": "3class"
                },
                {
                    "key": "primartittel",
                    "type": "DYNAMIC_STRING",
                    "value": "primTitle"
                },
                {
                    "key": "sekundartittel",
                    "type": "DYNAMIC_STRING",
                    "value": "secTitle"
                },
                {
                    "key": "tertiartittel",
                    "type": "DYNAMIC_STRING",
                    "value": "tertTitle"
                }
            ],
            "key": "sak"
        },
        {
            "collectionElements": [
                {
                    "fixed": [
                        {
                            "collectionElements": [
                                {
                                    "fixed": [
                                        {
                                            "fieldConfigurations": [
                                                {
                                                    "key": "format",
                                                    "type": "URL",
                                                    "value": "www.kodeverk.no/A"
                                                },
                                                {
                                                    "key": "variantformat",
                                                    "type": "URL",
                                                    "value": "www.kodeverk.no/PDF"
                                                },
                                                {
                                                    "key": "fil",
                                                    "type": "DYNAMIC_STRING",
                                                    "value": "$ifg{formPdf}"
                                                }
                                            ]
                                        }
                                    ],
                                    "key": "dokumentObjekt"
                                }
                            ],
                            "fieldConfigurations": [
                                {
                                    "key": "tittel",
                                    "type": "STRING",
                                    "value": "record title"
                                },
                                {
                                    "key": "dokumentstatus",
                                    "type": "STRING",
                                    "value": "D9"
                                },
                                {
                                    "key": "dokumentType",
                                    "type": "STRING",
                                    "value": "cat8"
                                },
                                {
                                    "key": "tilknyttetRegistreringSom",
                                    "type": "URL",
                                    "value": "www.kodeverk.no/H"
                                }
                            ]
                        }
                    ],
                    "fromCollection": [
                        {
                            "collectionElements": [
                                {
                                    "fixed": [
                                        {
                                            "fieldConfigurations": [
                                                {
                                                    "key": "format",
                                                    "type": "DYNAMIC_STRING",
                                                    "value": "www.kodeverk.no/PDF"
                                                },
                                                {
                                                    "key": "variantformat",
                                                    "type": "URL",
                                                    "value": "www.kodeverk.no/PDF"
                                                },
                                                {
                                                    "key": "fil",
                                                    "type": "DYNAMIC_STRING",
                                                    "value": "$igf{file}"
                                                }
                                            ]
                                        }
                                    ],
                                    "key": "dokumentObjekt"
                                }
                            ],
                            "collectionReference": "vedlegg",
                            "fieldConfigurations": [
                                {
                                    "key": "tittel",
                                    "type": "DYNAMIC_STRING",
                                    "value": "$ifg{name}"
                                },
                                {
                                    "key": "dokumentstatus",
                                    "type": "STRING",
                                    "value": "D9"
                                },
                                {
                                    "key": "dokumentType",
                                    "type": "STRING",
                                    "value": "cat8"
                                },
                                {
                                    "key": "tilknyttetRegistreringSom",
                                    "type": "URL",
                                    "value": "www.kodeverk.no/V"
                                }
                            ]
                        }
                    ],
                    "key": "dokumentbeskrivelse"
                },
                {
                    "fixed": [
                        {
                            "elements": [
                                {
                                    "fieldConfigurations": [
                                        {
                                            "key": "adresselinje",
                                            "type": "DYNAMIC_STRING",
                                            "value": "highstreet 22"
                                        },
                                        {
                                            "key": "postnummer",
                                            "type": "DYNAMIC_STRING",
                                            "value": "1234"
                                        },
                                        {
                                            "key": "poststed",
                                            "type": "DYNAMIC_STRING",
                                            "value": "Moria"
                                        }
                                    ],
                                    "key": "adresse"
                                },
                                {
                                    "fieldConfigurations": [
                                        {
                                            "key": "telefonnummer",
                                            "type": "DYNAMIC_STRING",
                                            "value": "12345678"
                                        },
                                        {
                                            "key": "mobiltelefonnummer",
                                            "type": "DYNAMIC_STRING",
                                            "value": "12345678"
                                        },
                                        {
                                            "key": "epostadresse",
                                            "type": "DYNAMIC_STRING",
                                            "value": "hello@world.no"
                                        }
                                    ],
                                    "key": "kontaktinformasjon"
                                },
                                {
                                    "fieldConfigurations": [
                                        {
                                            "key": "tilgangsrestriksjon",
                                            "type": "STRING",
                                            "value": "code2"
                                        },
                                        {
                                            "key": "skjermingshjemmel",
                                            "type": "STRING",
                                            "value": "p3"
                                        }
                                    ],
                                    "key": "skjerming"
                                }
                            ],
                            "fieldConfigurations": [
                                {
                                    "key": "protected",
                                    "type": "BOOLEAN",
                                    "value": "true"
                                },
                                {
                                    "key": "korrespondanseparttype",
                                    "type": "STRING",
                                    "value": "avsender"
                                },
                                {
                                    "key": "fødselsnummer",
                                    "type": "DYNAMIC_STRING",
                                    "value": "123456789"
                                },
                                {
                                    "key": "organisasjonsnummer",
                                    "type": "DYNAMIC_STRING",
                                    "value": null
                                },
                                {
                                    "key": "korrespondansepartNavn",
                                    "type": "DYNAMIC_STRING",
                                    "value": "Anakin Skywalker"
                                },
                                {
                                    "key": "kontaktperson",
                                    "type": "DYNAMIC_STRING",
                                    "value": "donna"
                                },
                                {
                                    "key": "korrespondansepartType",
                                    "type": "URL",
                                    "value": "kodeverk.no/korrespondansepartType/systemId/A"
                                }
                            ]
                        }
                    ],
                    "key": "korrespondansepart"
                }
            ],
            "fieldConfigurations": [
                {
                    "key": "tittel",
                    "type": "DYNAMIC_STRING",
                    "value": "record title"
                },
                {
                    "key": "offentligTittel",
                    "type": "DYNAMIC_STRING",
                    "value": "public record title"
                },
                {
                    "key": "administrativenhet",
                    "type": "STRING",
                    "value": "unit33"
                },
                {
                    "key": "journalstatus",
                    "type": "STRING",
                    "value": "N"
                },
                {
                    "key": "journalposttype",
                    "type": "STRING",
                    "value": "A"
                },
                {
                    "key": "saksbehandler",
                    "type": "STRING",
                    "value": "boba"
                },
                {
                    "key": "tilgangsrestriksjon",
                    "type": "STRING",
                    "value": "code89"
                },
                {
                    "key": "skjermingshjemmel",
                    "type": "STRING",
                    "value": "p34"
                }
            ],
            "key": "journalpost"
        }
    ],
    "id": "234",
    "integrationId": "id1",
    "integrationMetadataId": 321
}