// noinspection DuplicatedCode


import {FieldConfigurationType, newIConfiguration} from "../../features/integration/types/Configuration";

export const MOCK_CONFIGURATION: newIConfiguration = {
    "comment": "form to test mapping",
    "completed": false,
    "elements": [
        {
            "fieldConfigurations": [
                {
                    "key": "tittel",
                    "type": FieldConfigurationType.DYNAMIC_STRING,
                    "value": "Title of case"
                },
                {
                    "key": "offentligTittel",
                    "type": FieldConfigurationType.DYNAMIC_STRING,
                    "value": "public title"
                },
                {
                    "key": "saksmappetype",
                    "type": FieldConfigurationType.STRING,
                    "value": "casetype"
                },
                {
                    "key": "administrativenhet",
                    "type": FieldConfigurationType.STRING,
                    "value": "unit4"
                },
                {
                    "key": "arkivdel",
                    "type": FieldConfigurationType.STRING,
                    "value": "unit3"
                },
                {
                    "key": "journalenhet",
                    "type": FieldConfigurationType.STRING,
                    "value": "unit0"
                },
                {
                    "key": "status",
                    "type": FieldConfigurationType.STRING,
                    "value": ""
                },
                {
                    "key": "tilgangsrestriksjon",
                    "type": FieldConfigurationType.STRING,
                    "value": "code42"
                },
                {
                    "key": "skjermingshjemmel",
                    "type": FieldConfigurationType.STRING,
                    "value": "number6"
                },
                {
                    "key": "saksansvarlig",
                    "type": FieldConfigurationType.STRING,
                    "value": "rand"
                },
                {
                    "key": "primarordningsprinsipp",
                    "type": FieldConfigurationType.STRING,
                    "value": "prim"
                },
                {
                    "key": "sekundarordningsprinsipp",
                    "type": FieldConfigurationType.STRING,
                    "value": "rose"
                },
                {
                    "key": "tertiarordningsprinsipp",
                    "type": FieldConfigurationType.STRING,
                    "value": "everdeen"
                },
                {
                    "key": "primarklasse",
                    "type": FieldConfigurationType.DYNAMIC_STRING,
                    "value": "1class"
                },
                {
                    "key": "sekundarklasse",
                    "type": FieldConfigurationType.DYNAMIC_STRING,
                    "value": "2class"
                },
                {
                    "key": "tertiarklasse",
                    "type": FieldConfigurationType.DYNAMIC_STRING,
                    "value": "3class"
                },
                {
                    "key": "primartittel",
                    "type": FieldConfigurationType.DYNAMIC_STRING,
                    "value": "primTitle"
                },
                {
                    "key": "sekundartittel",
                    "type": FieldConfigurationType.DYNAMIC_STRING,
                    "value": "secTitle"
                },
                {
                    "key": "tertiartittel",
                    "type": FieldConfigurationType.DYNAMIC_STRING,
                    "value": "tertTitle"
                }
            ],
            "key": "case"
        },
        {
            "fieldConfigurations": [
                {
                    "key": "tittel",
                    "type": FieldConfigurationType.DYNAMIC_STRING,
                    "value": "record title"
                },
                {
                    "key": "offentigTittel",
                    "type": FieldConfigurationType.DYNAMIC_STRING,
                    "value": "public record title"
                },
                {
                    "key": "DokumentBeskrivelse.dokumentType",
                    "type": FieldConfigurationType.STRING,
                    "value": "cat8"
                },
                {
                    "key": "administrativenhet",
                    "type": FieldConfigurationType.STRING,
                    "value": "unit33"
                },
                {
                    "key": "journalstatus",
                    "type": FieldConfigurationType.STRING,
                    "value": "N"
                },
                {
                    "key": "journalposttype",
                    "type": FieldConfigurationType.STRING,
                    "value": "A"
                },
                {
                    "key": "saksbehandler",
                    "type": FieldConfigurationType.STRING,
                    "value": "boba"
                },
                {
                    "key": "tilgangsrestriksjon",
                    "type": FieldConfigurationType.STRING,
                    "value": "code89"
                },
                {
                    "key": "skjermingshjemmel",
                    "type": FieldConfigurationType.STRING,
                    "value": "p34"
                }
            ],
            "key": "record"
        },
        {
            "fieldConfigurations": [
                {
                    "key": "tittel",
                    type: FieldConfigurationType.DYNAMIC_STRING,
                    "value": "document title"
                },
                {
                    "key": "dokumentStatus",
                    "type": FieldConfigurationType.STRING,
                    "value": "D9"
                },
                {
                    "key": "DokumentBeskrivelse.dokumentKategori",
                    "type": FieldConfigurationType.STRING,
                    "value": "cat1"
                },
                {
                    "key": "tilgangsrestriksjon",
                    "type": FieldConfigurationType.STRING,
                    "value": "code2"
                },
                {
                    "key": "skjermingshjemmel",
                    "type": FieldConfigurationType.STRING,
                    "value": "p07"
                },
                {
                    "key": "DokumentBeskrivelse.dokumentObjekt.variantFormat",
                    "type": FieldConfigurationType.STRING,
                    "value": "var"
                }
            ],
            "key": "document"
        },
        {
            "fieldConfigurations": [
                {
                    "key": "organisasjonsnummer",
                    "type": FieldConfigurationType.DYNAMIC_STRING,
                    "value": ""
                },
                {
                    "key": "fødselsnummer",
                    "type": FieldConfigurationType.DYNAMIC_STRING,
                    "value": ""
                },
                {
                    "key": "KorrespondansepartNavn",
                    "type": FieldConfigurationType.DYNAMIC_STRING,
                    "value": "Anakin Skywalker"
                },
                {
                    "key": "Adresse.adresselinje",
                    "type": FieldConfigurationType.DYNAMIC_STRING,
                    "value": "highstreet 22"
                },
                {
                    "key": "Adresse.postnummer",
                    "type": FieldConfigurationType.DYNAMIC_STRING,
                    "value": "1234"
                },
                {
                    "key": "Adresse.poststed",
                    "type": FieldConfigurationType.DYNAMIC_STRING,
                    "value": "Moria"
                },
                {
                    "key": "kontaktperson",
                    "type": FieldConfigurationType.DYNAMIC_STRING,
                    "value": "donna"
                },
                {
                    "key": "Kontaktinformasjon.mobiltelefonnummer",
                    "type": FieldConfigurationType.DYNAMIC_STRING,
                    "value": "12345678"
                },
                {
                    "key": "Kontaktinformasjon.epostadresse",
                    "type": FieldConfigurationType.DYNAMIC_STRING,
                    "value": "hello@world.no"
                },
                {
                    "key": "tilgangsrestriksjon",
                    "type": FieldConfigurationType.DYNAMIC_STRING,
                    "value": "code2"
                },
                {
                    "key": "skjermingshjemmel",
                    "type": FieldConfigurationType.DYNAMIC_STRING,
                    "value": "p3"
                }
            ],
            "key": "applicant"
        }
    ],
    "configurationId": "123",
    "integrationId": "id0"
}

export const MOCK_NEW_CONFIG: newIConfiguration = {
    configurationId: 'id2',
    integrationId: '123',
    version: 3,
    completed: true,
    comment: 'Ferdigstilt ',
    elements: [
        {
            key: 'case',
            fieldConfigurations: [
                {
                    key: 'tittel',
                    type: FieldConfigurationType.DYNAMIC_STRING,
                    value: '$iem{foo} $iem{bar}'
                },
                {
                    key: 'journalenhet',
                    type: FieldConfigurationType.STRING,
                    value:  "https://beta.felleskomponent.no/arkiv/noark/administrativenhet/systemid/191"

                }
            ]
        },
        {
            key: 'record',
            fieldConfigurations: [
                {
                    key: 'tittel',
                    type: FieldConfigurationType.DYNAMIC_STRING,
                    value: 'foo $iem{bar}'
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
