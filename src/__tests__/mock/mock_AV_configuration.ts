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
                                    key: 'KorrespondansepartNavn',
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
    comment: 'form to test mapping',
    completed: false,
    elements: [
        {
            key: 'sak',
            searchParameters: undefined,
            fieldConfigurations: [
                {
                    key: 'type',
                    type: FieldConfigurationType.STRING,
                    value: CreationStrategy.NEW
                },
                {
                    key: "tittel",
                    type: FieldConfigurationType.DYNAMIC_STRING,
                    value: 'Title of case'
                },
                {
                    key: "offentligTittel",
                    type: FieldConfigurationType.DYNAMIC_STRING,
                    value: 'public title'
                },
                {
                    key: "saksmappetype",
                    type: FieldConfigurationType.STRING,
                    value: 'casetype'
                },
                {
                    key: 'administrativenhet',
                    type: FieldConfigurationType.STRING,
                    value: 'unit4'
                },
                {
                    key: "arkivdel",
                    type: FieldConfigurationType.STRING,
                    value: 'unit3'

                },
                {
                    key: "journalenhet",
                    type: FieldConfigurationType.STRING,
                    value: 'unit0'

                },
                {
                    key: "status",
                    type: FieldConfigurationType.STRING,
                    value: null

                },
                {
                    key: "tilgangsrestriksjon",
                    type: FieldConfigurationType.STRING,
                    value: 'code42'

                },
                {
                    key: "skjermingshjemmel",
                    type: FieldConfigurationType.STRING,
                    value: 'number6'

                },
                {
                    key: "saksansvarlig",
                    type: FieldConfigurationType.STRING,
                    value: 'rand'

                },
                {
                    key: "primarordningsprinsipp",
                    type: FieldConfigurationType.STRING,
                    value: 'prim'
                },
                {
                    key: "sekundarordningsprinsipp",
                    type: FieldConfigurationType.STRING,
                    value: 'rose'
                },
                {
                    key: "tertiarordningsprinsipp",
                    type: FieldConfigurationType.STRING,
                    value: 'everdeen'
                },
                {
                    key: "primarklasse",
                    type: FieldConfigurationType.DYNAMIC_STRING,
                    value: '1class'
                },
                {
                    key: "sekundarklasse",
                    type: FieldConfigurationType.DYNAMIC_STRING,
                    value: '2class'
                },
                {
                    key: "tertiarklasse",
                    type: FieldConfigurationType.DYNAMIC_STRING,
                    value: '3class'
                },
                {
                    key: "primartittel",
                    type: FieldConfigurationType.DYNAMIC_STRING,
                    value: 'primTitle'
                },
                {
                    key: "sekundartittel",
                    type: FieldConfigurationType.DYNAMIC_STRING,
                    value: 'secTitle'
                },
                {
                    key: "tertiartittel",
                    type: FieldConfigurationType.DYNAMIC_STRING,
                    value: 'tertTitle'
                }
            ],
        },
        {
            key: 'journalpost',
            fieldConfigurations: [
                {
                    key: "tittel",
                    type: FieldConfigurationType.DYNAMIC_STRING,
                    value: 'record title'
                },
                {
                    key: "offentligTittel",
                    type: FieldConfigurationType.DYNAMIC_STRING,
                    value: 'public record title'
                },
                {
                    key: "administrativenhet",
                    type: FieldConfigurationType.STRING,
                    value: 'unit33'
                },
                {
                    key: "journalstatus",
                    type: FieldConfigurationType.STRING,
                    value: 'N'
                },
                {
                    key: "journalposttype",
                    type: FieldConfigurationType.STRING,
                    value: 'A'
                },
                {
                    key: "saksbehandler",
                    type: FieldConfigurationType.STRING,
                    value: 'boba'
                },
                {
                    key: "tilgangsrestriksjon",
                    type: FieldConfigurationType.STRING,
                    value: 'code89'
                },
                {
                    key: "skjermingshjemmel",
                    type: FieldConfigurationType.STRING,
                    value: 'p34'
                }
            ],
            collectionElements: [
                {
                    key: 'dokumentbeskrivelse',
                    fixed: [
                        {
                            fieldConfigurations: [
                                {
                                    key: "tittel",
                                    type: FieldConfigurationType.STRING,
                                    value: 'record title'
                                },
                                {
                                    key: "dokumentstatus",
                                    type: FieldConfigurationType.STRING,
                                    value: 'D9'
                                },
                                {
                                    key: "dokumentType",
                                    type: FieldConfigurationType.STRING,
                                    value: 'cat8'
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
                                    key: "dokumentstatus",
                                    type: FieldConfigurationType.STRING,
                                    value: 'D9'
                                },
                                {
                                    key: "dokumentType",
                                    type: FieldConfigurationType.STRING,
                                    value: 'cat8'
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
                                    key: 'protected',
                                    type: FieldConfigurationType.BOOLEAN,
                                    value: 'true'
                                },
                                {
                                    key: 'fødselsnummer',
                                    type: FieldConfigurationType.DYNAMIC_STRING,
                                    value: '123456789'
                                },
                                {
                                    key: 'organisasjonsnummer',
                                    type: FieldConfigurationType.DYNAMIC_STRING,
                                    value: null
                                },
                                {
                                    key: 'KorrespondansepartNavn',
                                    type: FieldConfigurationType.DYNAMIC_STRING,
                                    value: 'Anakin Skywalker'
                                },
                                {
                                    key: 'kontaktperson',
                                    type: FieldConfigurationType.DYNAMIC_STRING,
                                    value: 'donna'
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
                                            value: 'highstreet 22'
                                        },
                                        {
                                            key: 'postnummer',
                                            type: FieldConfigurationType.DYNAMIC_STRING,
                                            value: '1234'
                                        },
                                        {
                                            key: 'poststed',
                                            type: FieldConfigurationType.DYNAMIC_STRING,
                                            value: 'Moria'
                                        }
                                    ]
                                },
                                {
                                    key: 'kontaktinformasjon',
                                    fieldConfigurations: [
                                        {
                                            key: 'telefonnummer',
                                            type: FieldConfigurationType.DYNAMIC_STRING,
                                            value: '12345678'
                                        },
                                        {
                                            key: 'mobiltelefonnummer',
                                            type: FieldConfigurationType.DYNAMIC_STRING,
                                            value: '12345678'
                                        },
                                        {
                                            key: 'epostadresse',
                                            type: FieldConfigurationType.DYNAMIC_STRING,
                                            value: 'hello@world.no'
                                        },
                                    ]
                                },
                                {
                                    key: 'skjerming',
                                    fieldConfigurations: [
                                        {
                                            key: 'tilgangsrestriksjon',
                                            type: FieldConfigurationType.STRING,
                                            value: 'code2'
                                        },
                                        {
                                            key: 'skjermingshjemmel',
                                            type: FieldConfigurationType.STRING,
                                            value: 'p3'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    id: '234',
    integrationId: 'id1',
    integrationMetadataId: 321
}