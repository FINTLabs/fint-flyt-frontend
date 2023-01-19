// noinspection DuplicatedCode


import {
    FieldConfigurationType,
    IConfigurationPatch,
    newIConfiguration
} from "../../features/integration/types/Configuration";
import {CreationStrategy} from "../../features/integration/types/CreationStrategy";

export const MOCK_CONFIGURATION: newIConfiguration = {
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
                    "value": ""
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
            "key": "case"
        },
        {
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
            "key": "record"
        },
        {
            "fieldConfigurations": [
                {
                    "key": "tittel",
                    "type": "DYNAMIC_STRING",
                    "value": "document title"
                },
                {
                    "key": "dokumentStatus",
                    "type": "STRING",
                    "value": "D9"
                },
                {
                    "key": "dokumentType",
                    "type": "STRING",
                    "value": "cat8"
                },
                {
                    "key": "dokumentObjekt.variantFormat",
                    "type": "STRING",
                    "value": "var"
                }
            ],
            "key": "document"
        },
        {
            "fieldConfigurations": [
                {
                    "key": "protected",
                    "type": "BOOLEAN",
                    "value": "true"
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
                    "key": "KorrespondansepartNavn",
                    "type": "DYNAMIC_STRING",
                    "value": "Anakin Skywalker"
                },
                {
                    "key": "Adresse.adresselinje",
                    "type": "DYNAMIC_STRING",
                    "value": "highstreet 22"
                },
                {
                    "key": "Adresse.postnummer",
                    "type": "DYNAMIC_STRING",
                    "value": "1234"
                },
                {
                    "key": "Adresse.poststed",
                    "type": "DYNAMIC_STRING",
                    "value": "Moria"
                },
                {
                    "key": "kontaktperson",
                    "type": "DYNAMIC_STRING",
                    "value": "donna"
                },
                {
                    "key": "Kontaktinformasjon.mobiltelefonnummer",
                    "type": "DYNAMIC_STRING",
                    "value": "12345678"
                },
                {
                    "key": "Kontaktinformasjon.epostadresse",
                    "type": "DYNAMIC_STRING",
                    "value": "hello@world.no"
                },
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
            "key": "applicant"
        }
    ],
    "id": "123",
    "integrationId": "id0",
    "integrationMetadataId": 321
}
export const MOCK_CONFIGURATION_PATCH: IConfigurationPatch = {
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
                    "value": ""
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
            "key": "case"
        },
        {
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
            "key": "record"
        },
        {
            "fieldConfigurations": [
                {
                    "key": "tittel",
                    "type": "DYNAMIC_STRING",
                    "value": "document title"
                },
                {
                    "key": "dokumentStatus",
                    "type": "STRING",
                    "value": "D9"
                },
                {
                    "key": "dokumentType",
                    "type": "STRING",
                    "value": "cat8"
                },
                {
                    "key": "dokumentObjekt.variantFormat",
                    "type": "STRING",
                    "value": "var"
                }
            ],
            "key": "document"
        },
        {
            "fieldConfigurations": [
                {
                    "key": "protected",
                    "type": "BOOLEAN",
                    "value": "true"
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
                    "key": "KorrespondansepartNavn",
                    "type": "DYNAMIC_STRING",
                    "value": "Anakin Skywalker"
                },
                {
                    "key": "Adresse.adresselinje",
                    "type": "DYNAMIC_STRING",
                    "value": "highstreet 22"
                },
                {
                    "key": "Adresse.postnummer",
                    "type": "DYNAMIC_STRING",
                    "value": "1234"
                },
                {
                    "key": "Adresse.poststed",
                    "type": "DYNAMIC_STRING",
                    "value": "Moria"
                },
                {
                    "key": "kontaktperson",
                    "type": "DYNAMIC_STRING",
                    "value": "donna"
                },
                {
                    "key": "Kontaktinformasjon.mobiltelefonnummer",
                    "type": "DYNAMIC_STRING",
                    "value": "12345678"
                },
                {
                    "key": "Kontaktinformasjon.epostadresse",
                    "type": "DYNAMIC_STRING",
                    "value": "hello@world.no"
                },
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
            "key": "applicant"
        }
    ],
    "integrationMetadataId": 321
}

export const MOCK_NEW_CONFIG: newIConfiguration = {
    id: 'id2',
    integrationId: '123',
    version: 3,
    completed: false,
    comment: 'Ikke ferdigstilt',
    elements: [
        {
            key: 'case',
            fieldConfigurations: [
                {
                    key: 'type',
                    type: FieldConfigurationType.STRING,
                    value:  CreationStrategy.NEW
                },
                {
                    key: 'tittel',
                    type: FieldConfigurationType.DYNAMIC_STRING,
                    value: '$if{foo} $if{bar}'
                },
                {
                    key: 'journalenhet',
                    type: FieldConfigurationType.STRING,
                    value:  "https://beta.felleskomponent.no/arkiv/noark/administrativenhet/systemid/191"
                }
            ]
        },
        {
            key: 'applicant',
            fieldConfigurations: [
                {
                    key: 'protected',
                    type: FieldConfigurationType.BOOLEAN,
                    value: 'true'
                }
            ]
        },
        {
            key: 'record',
            fieldConfigurations: [
                {
                    key: 'tittel',
                    type: FieldConfigurationType.DYNAMIC_STRING,
                    value: 'foo $if{bar}'
                },
                {
                    key: 'administrativeenhet',
                    type: FieldConfigurationType.STRING,
                    value:  "https://beta.felleskomponent.no/arkiv/noark/administrativenhet/systemid/191"

                }
            ]
        }
    ]
}

export const MOCK_BY_ID_CONFIG: newIConfiguration = {
    id: 'id2',
    integrationId: '123',
    version: 3,
    completed: false,
    comment: 'Ikke ferdigstilt',
    elements: [
        {
            key: 'case',
            fieldConfigurations: [
                {
                    key: 'type',
                    type: FieldConfigurationType.STRING,
                    value:  CreationStrategy.BY_ID
                },
                {
                    key: 'id',
                    type: FieldConfigurationType.STRING,
                    value: '2022/163'
                }
            ]
        },
        {
            key: 'applicant',
            fieldConfigurations: [
                {
                    key: 'protected',
                    type: FieldConfigurationType.BOOLEAN,
                    value: 'true'
                }
            ]
        },
        {
            key: 'record',
            fieldConfigurations: [
                {
                    key: 'tittel',
                    type: FieldConfigurationType.DYNAMIC_STRING,
                    value: 'foo $if{bar}'
                },
                {
                    key: 'administrativeenhet',
                    type: FieldConfigurationType.STRING,
                    value:  "https://beta.felleskomponent.no/arkiv/noark/administrativenhet/systemid/191"

                }
            ]
        }
    ]
}
