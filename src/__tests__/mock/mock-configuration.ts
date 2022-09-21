// noinspection DuplicatedCode


import {IConfiguration, newIConfiguration} from "../../features/integration/types/Configuration";
import {VALUE_BUILDER_STRATEGY} from "../../features/integration/types/ValueBuilderStrategy.enum";

export const MOCK_CONFIGURATION: newIConfiguration =
    {
    "comment": "form to test mapping",
    "completed": false,
    "configurationFields": [
        {
            "children": [
                {
                    "key": "tittel",
                    "valueBuildStrategy": 1,
                    "valueBuilder": {
                        "properties": [],
                        "value": "Title of case"
                    }
                },
                {
                    "key": "offentligTittel",
                    "valueBuildStrategy": 1,
                    "valueBuilder": {
                        "properties": [],
                        "value": "public title"
                    }
                },
                {
                    "key": "saksmappetype",
                    "valueBuildStrategy": 0,
                    "valueBuilder": {
                        "value": "casetype"
                    }
                },
                {
                    "key": "administrativenhet",
                    "valueBuildStrategy": 0,
                    "valueBuilder": {
                        "value": "unit4"
                    }
                },
                {
                    "key": "arkivdel",
                    "valueBuildStrategy": 0,
                    "valueBuilder": {
                        "value": "unit3"
                    }
                },
                {
                    "key": "journalenhet",
                    "valueBuildStrategy": 0,
                    "valueBuilder": {
                        "value": "unit0"
                    }
                },
                {
                    "key": "status",
                    "valueBuildStrategy": 0,
                    "valueBuilder": {
                        "value": ""
                    }
                },
                {
                    "key": "tilgangsrestriksjon",
                    "valueBuildStrategy": 0,
                    "valueBuilder": {
                        "value": "code42"
                    }
                },
                {
                    "key": "skjermingshjemmel",
                    "valueBuildStrategy": 0,
                    "valueBuilder": {
                        "value": "number6"
                    }
                },
                {
                    "key": "saksansvarlig",
                    "valueBuildStrategy": 0,
                    "valueBuilder": {
                        "value": "rand"
                    }
                },
                {
                    "key": "primarordningsprinsipp",
                    "valueBuildStrategy": 1,
                    "valueBuilder": {
                        "properties": [],
                        "value": "prim"
                    }
                },
                {
                    "key": "sekundarordningsprinsipp",
                    "valueBuildStrategy": 1,
                    "valueBuilder": {
                        "properties": [],
                        "value": "rose"
                    }
                },
                {
                    "key": "tertiarordningsprinsipp",
                    "valueBuildStrategy": 1,
                    "valueBuilder": {
                        "properties": [],
                        "value": "everdeen"
                    }
                },
                {
                    "key": "primarklasse",
                    "valueBuildStrategy": 1,
                    "valueBuilder": {
                        "properties": [],
                        "value": "1class"
                    }
                },
                {
                    "key": "sekundarklasse",
                    "valueBuildStrategy": 0,
                    "valueBuilder": {
                        "properties": [],
                        "value": "2class"
                    }
                },
                {
                    "key": "tertiarklasse",
                    "valueBuildStrategy": 0,
                    "valueBuilder": {
                        "properties": [],
                        "value": "3class"
                    }
                },
                {
                    "key": "primartittel",
                    "valueBuildStrategy": 1,
                    "valueBuilder": {
                        "properties": [],
                        "value": "primTitle"
                    }
                },
                {
                    "key": "sekundartittel",
                    "valueBuildStrategy": 1,
                    "valueBuilder": {
                        "properties": [],
                        "value": "secTitle"
                    }
                },
                {
                    "key": "tertiartittel",
                    "valueBuildStrategy": 1,
                    "valueBuilder": {
                        "properties": [],
                        "value": "tertTitle"
                    }
                }
            ],
            "key": "case"
        },
        {
            "children": [
                {
                    "key": "tittel",
                    "valueBuildStrategy": 1,
                    "valueBuilder": {
                        "properties": [],
                        "value": "record title"
                    }
                },
                {
                    "key": "offentigTittel",
                    "valueBuildStrategy": 1,
                    "valueBuilder": {
                        "properties": [],
                        "value": "public record title"
                    }
                },
                {
                    "key": "DokumentBeskrivelse.dokumentType",
                    "valueBuildStrategy": 0,
                    "valueBuilder": {
                        "value": "cat8"
                    }
                },
                {
                    "key": "administrativenhet",
                    "valueBuildStrategy": 0,
                    "valueBuilder": {
                        "value": "unit33"
                    }
                },
                {
                    "key": "journalstatus",
                    "valueBuildStrategy": 0,
                    "valueBuilder": {
                        "value": "N"
                    }
                },
                {
                    "key": "journalposttype",
                    "valueBuildStrategy": 0,
                    "valueBuilder": {
                        "value": "A"
                    }
                },
                {
                    "key": "saksbehandler",
                    "valueBuildStrategy": 0,
                    "valueBuilder": {
                        "value": "boba"
                    }
                },
                {
                    "key": "tilgangsrestriksjon",
                    "valueBuildStrategy": 0,
                    "valueBuilder": {
                        "value": "code89"
                    }
                },
                {
                    "key": "skjermingshjemmel",
                    "valueBuildStrategy": 0,
                    "valueBuilder": {
                        "value": "p34"
                    }
                }
            ],
            "key": "record"
        },
        {
            "children": [
                {
                    "key": "tittel",
                    "valueBuildStrategy": 1,
                    "valueBuilder": {
                        "properties": [],
                        "value": "document title"
                    }
                },
                {
                    "key": "dokumentStatus",
                    "valueBuildStrategy": 0,
                    "valueBuilder": {
                        "value": "D9"
                    }
                },
                {
                    "key": "DokumentBeskrivelse.dokumentKategori",
                    "valueBuildStrategy": 0,
                    "valueBuilder": {}
                },
                {
                    "key": "tilgangsrestriksjon",
                    "valueBuildStrategy": 0,
                    "valueBuilder": {
                        "value": "code2"
                    }
                },
                {
                    "key": "skjermingshjemmel",
                    "valueBuildStrategy": 0,
                    "valueBuilder": {
                        "value": "p07"
                    }
                },
                {
                    "key": "DokumentBeskrivelse.dokumentObjekt.variantFormat",
                    "valueBuildStrategy": 0,
                    "valueBuilder": {
                        "value": "var"
                    }
                }
            ],
            "key": "document"
        },
        {
            "children": [
                {
                    "key": "organisasjonsnummer",
                    "valueBuildStrategy": 1,
                    "valueBuilder": {
                        "properties": [],
                        "value": ""
                    }
                },
                {
                    "key": "fødselsnummer",
                    "valueBuildStrategy": 1,
                    "valueBuilder": {
                        "properties": [],
                        "value": ""
                    }
                },
                {
                    "key": "KorrespondansepartNavn",
                    "valueBuildStrategy": 1,
                    "valueBuilder": {
                        "properties": [],
                        "value": "Anakin Skywalker"
                    }
                },
                {
                    "key": "Adresse.adresselinje",
                    "valueBuildStrategy": 1,
                    "valueBuilder": {
                        "properties": [],
                        "value": "highstreet 22"
                    }
                },
                {
                    "key": "Adresse.postnummer",
                    "valueBuildStrategy": 1,
                    "valueBuilder": {
                        "properties": [],
                        "value": "1234"
                    }
                },
                {
                    "key": "Adresse.poststed",
                    "valueBuildStrategy": 1,
                    "valueBuilder": {
                        "properties": [],
                        "value": "Moria"
                    }
                },
                {
                    "key": "kontaktperson",
                    "valueBuildStrategy": 1,
                    "valueBuilder": {
                        "properties": [],
                        "value": "donna"
                    }
                },
                {
                    "key": "Kontaktinformasjon.mobiltelefonnummer",
                    "valueBuildStrategy": 1,
                    "valueBuilder": {
                        "properties": [],
                        "value": "12345678"
                    }
                },
                {
                    "key": "Kontaktinformasjon.epostadresse",
                    "valueBuildStrategy": 1,
                    "valueBuilder": {
                        "properties": [],
                        "value": "hello@world.no"
                    }
                },
                {
                    "key": "tilgangsrestriksjon",
                    "valueBuildStrategy": 0,
                    "valueBuilder": {
                        "value": "code2"
                    }
                },
                {
                    "key": "skjermingshjemmel",
                    "valueBuildStrategy": 0,
                    "valueBuilder": {
                        "value": "p3"
                    }
                }
            ],
            "key": "applicant"
        }
    ],
    "configurationId": "123",
    "integrationId": "id0"
}

export const MOCK_CONFIGURATION_NOT_COMPLETE: IConfiguration = {
    "configurationId": "id1",
    "integrationId": "TEST123",
    "comment": "test config not complete",
    "version": 2,
    "completed": false,
    "applicantConfiguration": {
        "applicantType": "PERSON",
        "fields": [
            {
                "field": "fødselsnummer",
                "valueBuildStrategy": 1,
                "valueBuilder": {
                    "properties": [],
                    "value": ""
                }
            },
            {
                "field": "KorrespondansepartNavn",
                "valueBuildStrategy": 1,
                "valueBuilder": {
                    "properties": [],
                    "value": "Anakin Skywalker"
                }
            },
            {
                "field": "Adresse.adresselinje",
                "valueBuildStrategy": 1,
                "valueBuilder": {
                    "properties": [],
                    "value": "highstreet 22"
                }
            },
            {
                "field": "Adresse.postnummer",
                "valueBuildStrategy": 1,
                "valueBuilder": {
                    "properties": [],
                    "value": "1234"
                }
            },
            {
                "field": "Adresse.poststed",
                "valueBuildStrategy": 1,
                "valueBuilder": {
                    "properties": [],
                    "value": "Moria"
                }
            },
            {
                "field": "kontaktperson",
                "valueBuildStrategy": 1,
                "valueBuilder": {
                    "properties": [],
                    "value": "donna"
                }
            },
            {
                "field": "Kontaktinformasjon.mobiltelefonnummer",
                "valueBuildStrategy": 1,
                "valueBuilder": {
                    "properties": [],
                    "value": "12345678"
                }
            },
            {
                "field": "Kontaktinformasjon.epostadresse",
                "valueBuildStrategy": 1,
                "valueBuilder": {
                    "properties": [],
                    "value": "hello@world.no"
                }
            },
            {
                "field": "tilgangsrestriksjon",
                "valueBuildStrategy": 0,
                "valueBuilder": {
                    "value": "code2"
                }
            },
            {
                "field": "skjermingshjemmel",
                "valueBuildStrategy": 0,
                "valueBuilder": {
                    "value": "p3"
                }
            }
        ],
        "organisationNumber": false,
        "protected": true
    },
    "caseConfiguration": {
        "caseCreationStrategy": "NEW",
        "fields": [
            {
                "field": "tittel",
                "valueBuildStrategy": 1,
                "valueBuilder": {
                    "properties": [],
                    "value": "Title of case"
                }
            },
            {
                "field": "offentligTittel",
                "valueBuildStrategy": 1,
                "valueBuilder": {
                    "properties": [],
                    "value": "public title"
                }
            },
            {
                "field": "saksmappetype",
                "valueBuildStrategy": 0,
                "valueBuilder": {
                    "value": "casetype"
                }
            },
            {
                "field": "administrativenhet",
                "valueBuildStrategy": 0,
                "valueBuilder": {
                    "value": "unit4"
                }
            },
            {
                "field": "arkivdel",
                "valueBuildStrategy": 0,
                "valueBuilder": {
                    "value": "unit3"
                }
            },
            {
                "field": "journalenhet",
                "valueBuildStrategy": 0,
                "valueBuilder": {
                    "value": "unit0"
                }
            },
            {
                "field": "status",
                "valueBuildStrategy": 0,
                "valueBuilder": {}
            },
            {
                "field": "tilgangsrestriksjon",
                "valueBuildStrategy": 0,
                "valueBuilder": {
                    "value": "code42"
                }
            },
            {
                "field": "skjermingshjemmel",
                "valueBuildStrategy": 0,
                "valueBuilder": {
                    "value": "number6"
                }
            },
            {
                "field": "saksansvarlig",
                "valueBuildStrategy": 0,
                "valueBuilder": {
                    "value": "rand"
                }
            },
            {
                "field": "primarordningsprinsipp",
                "valueBuildStrategy": 1,
                "valueBuilder": {
                    "properties": [],
                    "value": "prim"
                }
            },
            {
                "field": "sekundarordningsprinsipp",
                "valueBuildStrategy": 1,
                "valueBuilder": {
                    "properties": [],
                    "value": "rose"
                }
            },
            {
                "field": "tertiarordningsprinsipp",
                "valueBuildStrategy": 1,
                "valueBuilder": {
                    "properties": [],
                    "value": "everdeen"
                }
            },
            {
                "field": "primarklasse",
                "valueBuildStrategy": 1,
                "valueBuilder": {
                    "properties": [],
                    "value": "1class"
                }
            },
            {
                "field": "sekundarklasse",
                "valueBuildStrategy": 0,
                "valueBuilder": {
                    "properties": [],
                    "value": "2class"
                }
            },
            {
                "field": "tertiarklasse",
                "valueBuildStrategy": 0,
                "valueBuilder": {
                    "properties": [],
                    "value": "3class"
                }
            },
            {
                "field": "primartittel",
                "valueBuildStrategy": 1,
                "valueBuilder": {
                    "properties": [],
                    "value": "primTitle"
                }
            },
            {
                "field": "sekundartittel",
                "valueBuildStrategy": 1,
                "valueBuilder": {
                    "properties": [],
                    "value": "secTitle"
                }
            },
            {
                "field": "tertiartittel",
                "valueBuildStrategy": 1,
                "valueBuilder": {
                    "properties": [],
                    "value": "tertTitle"
                }
            }
        ]
    },
    "documentConfiguration": {
        "fields": [
            {
                "field": "tittel",
                "valueBuildStrategy": 1,
                "valueBuilder": {
                    "properties": [],
                    "value": "document title"
                }
            },
            {
                "field": "dokumentStatus",
                "valueBuildStrategy": 0,
                "valueBuilder": {
                    "value": "D9"
                }
            },
            {
                "field": "DokumentBeskrivelse.dokumentKategori",
                "valueBuildStrategy": 0,
                "valueBuilder": {
                    "value": "sefg"
                }
            },
            {
                "field": "tilgangsrestriksjon",
                "valueBuildStrategy": 0,
                "valueBuilder": {
                    "value": "code2"
                }
            },
            {
                "field": "skjermingshjemmel",
                "valueBuildStrategy": 0,
                "valueBuilder": {
                    "value": "p07"
                }
            },
            {
                "field": "DokumentBeskrivelse.dokumentObjekt.variantFormat",
                "valueBuildStrategy": 0,
                "valueBuilder": {
                    "value": "var"
                }
            }
        ]
    },
    "recordConfiguration": {
        "fields": [
            {
                "field": "tittel",
                "valueBuildStrategy": 1,
                "valueBuilder": {
                    "properties": [],
                    "value": "record title"
                }
            },
            {
                "field": "offentigTittel",
                "valueBuildStrategy": 1,
                "valueBuilder": {
                    "properties": [],
                    "value": "public record title"
                }
            },
            {
                "field": "DokumentBeskrivelse.dokumentType",
                "valueBuildStrategy": 0,
                "valueBuilder": {
                    "value": "cat8"
                }
            },
            {
                "field": "administrativenhet",
                "valueBuildStrategy": 0,
                "valueBuilder": {
                    "value": "unit33"
                }
            },
            {
                "field": "journalstatus",
                "valueBuildStrategy": 0,
                "valueBuilder": {
                    "value": "N"
                }
            },
            {
                "field": "journalposttype",
                "valueBuildStrategy": 0,
                "valueBuilder": {
                    "value": "A"
                }
            },
            {
                "field": "saksbehandler",
                "valueBuildStrategy": 0,
                "valueBuilder": {
                    "value": "boba"
                }
            },
            {
                "field": "tilgangsrestriksjon",
                "valueBuildStrategy": 0,
                "valueBuilder": {
                    "value": "code89"
                }
            },
            {
                "field": "skjermingshjemmel",
                "valueBuildStrategy": 0,
                "valueBuilder": {
                    "value": "p34"
                }
            }
        ]
    }
}

export const MOCK_CONFIGURATION_COMPLETE: IConfiguration = {
    "configurationId": "id2",
    "integrationId": "TEST123",
    "comment": "test config, finished",
    "version": 3,
    "completed": true,
    "applicantConfiguration":   {
        "applicantType": "PERSON",
        "fields": [
            {
                "field": "fødselsnummer",
                "valueBuildStrategy": 1,
                "valueBuilder": {
                    "properties": [],
                    "value": ""
                }
            },
            {
                "field": "KorrespondansepartNavn",
                "valueBuildStrategy": 1,
                "valueBuilder": {
                    "properties": [],
                    "value": "Anakin Skywalker"
                }
            },
            {
                "field": "Adresse.adresselinje",
                "valueBuildStrategy": 1,
                "valueBuilder": {
                    "properties": [],
                    "value": "highstreet 22"
                }
            },
            {
                "field": "Adresse.postnummer",
                "valueBuildStrategy": 1,
                "valueBuilder": {
                    "properties": [],
                    "value": "1234"
                }
            },
            {
                "field": "Adresse.poststed",
                "valueBuildStrategy": 1,
                "valueBuilder": {
                    "properties": [],
                    "value": "Moria"
                }
            },
            {
                "field": "kontaktperson",
                "valueBuildStrategy": 1,
                "valueBuilder": {
                    "properties": [],
                    "value": "bella"
                }
            },
            {
                "field": "Kontaktinformasjon.mobiltelefonnummer",
                "valueBuildStrategy": 1,
                "valueBuilder": {
                    "properties": [],
                    "value": "12345678"
                }
            },
            {
                "field": "Kontaktinformasjon.epostadresse",
                "valueBuildStrategy": 1,
                "valueBuilder": {
                    "properties": [],
                    "value": "hello@world.no"
                }
            },
            {
                "field": "tilgangsrestriksjon",
                "valueBuildStrategy": 0,
                "valueBuilder": {
                    "value": "code2"
                }
            },
            {
                "field": "skjermingshjemmel",
                "valueBuildStrategy": 0,
                "valueBuilder": {
                    "value": "p3"
                }
            }
        ],
        "organisationNumber": false,
        "protected": true
    },
    "caseConfiguration": {
        "caseCreationStrategy": "NEW",
        "fields": [
            {
                "field": "tittel",
                "valueBuildStrategy": 1,
                "valueBuilder": {
                    "properties": [],
                    "value": "Title of case"
                }
            },
            {
                "field": "offentligTittel",
                "valueBuildStrategy": 1,
                "valueBuilder": {
                    "properties": [],
                    "value": "public title"
                }
            },
            {
                "field": "saksmappetype",
                "valueBuildStrategy": 0,
                "valueBuilder": {
                    "value": "casetype"
                }
            },
            {
                "field": "administrativenhet",
                "valueBuildStrategy": 0,
                "valueBuilder": {
                    "value": "unit4"
                }
            },
            {
                "field": "arkivdel",
                "valueBuildStrategy": 0,
                "valueBuilder": {
                    "value": "unit3"
                }
            },
            {
                "field": "journalenhet",
                "valueBuildStrategy": 0,
                "valueBuilder": {
                    "value": "unit0"
                }
            },
            {
                "field": "status",
                "valueBuildStrategy": 0,
                "valueBuilder": {}
            },
            {
                "field": "tilgangsrestriksjon",
                "valueBuildStrategy": 0,
                "valueBuilder": {
                    "value": "code42"
                }
            },
            {
                "field": "skjermingshjemmel",
                "valueBuildStrategy": 0,
                "valueBuilder": {
                    "value": "number6"
                }
            },
            {
                "field": "saksansvarlig",
                "valueBuildStrategy": 0,
                "valueBuilder": {
                    "value": "rand"
                }
            },
            {
                "field": "primarordningsprinsipp",
                "valueBuildStrategy": 1,
                "valueBuilder": {
                    "properties": [],
                    "value": "prim"
                }
            },
            {
                "field": "sekundarordningsprinsipp",
                "valueBuildStrategy": 1,
                "valueBuilder": {
                    "properties": [],
                    "value": "rose"
                }
            },
            {
                "field": "tertiarordningsprinsipp",
                "valueBuildStrategy": 1,
                "valueBuilder": {
                    "properties": [],
                    "value": "everdeen"
                }
            },
            {
                "field": "primarklasse",
                "valueBuildStrategy": 1,
                "valueBuilder": {
                    "properties": [],
                    "value": "1class"
                }
            },
            {
                "field": "sekundarklasse",
                "valueBuildStrategy": 0,
                "valueBuilder": {
                    "properties": [],
                    "value": "2class"
                }
            },
            {
                "field": "tertiarklasse",
                "valueBuildStrategy": 0,
                "valueBuilder": {
                    "properties": [],
                    "value": "3class"
                }
            },
            {
                "field": "primartittel",
                "valueBuildStrategy": 1,
                "valueBuilder": {
                    "properties": [],
                    "value": "primTitle"
                }
            },
            {
                "field": "sekundartittel",
                "valueBuildStrategy": 1,
                "valueBuilder": {
                    "properties": [],
                    "value": "secTitle"
                }
            },
            {
                "field": "tertiartittel",
                "valueBuildStrategy": 1,
                "valueBuilder": {
                    "properties": [],
                    "value": "tertTitle"
                }
            }
        ]
    },
    "documentConfiguration": {
        "fields": [
            {
                "field": "tittel",
                "valueBuildStrategy": 1,
                "valueBuilder": {
                    "properties": [],
                    "value": "document title"
                }
            },
            {
                "field": "dokumentStatus",
                "valueBuildStrategy": 0,
                "valueBuilder": {
                    "value": "D9"
                }
            },
            {
                "field": "DokumentBeskrivelse.dokumentKategori",
                "valueBuildStrategy": 0,
                "valueBuilder": {}
            },
            {
                "field": "tilgangsrestriksjon",
                "valueBuildStrategy": 0,
                "valueBuilder": {
                    "value": "code2"
                }
            },
            {
                "field": "skjermingshjemmel",
                "valueBuildStrategy": 0,
                "valueBuilder": {
                    "value": "p07"
                }
            },
            {
                "field": "DokumentBeskrivelse.dokumentObjekt.variantFormat",
                "valueBuildStrategy": 0,
                "valueBuilder": {
                    "value": "var"
                }
            }
        ]
    },
    "recordConfiguration": {
        "fields": [
            {
                "field": "tittel",
                "valueBuildStrategy": 1,
                "valueBuilder": {
                    "properties": [],
                    "value": "record title"
                }
            },
            {
                "field": "offentigTittel",
                "valueBuildStrategy": 1,
                "valueBuilder": {
                    "properties": [],
                    "value": "public record title"
                }
            },
            {
                "field": "DokumentBeskrivelse.dokumentType",
                "valueBuildStrategy": 0,
                "valueBuilder": {
                    "value": "cat8"
                }
            },
            {
                "field": "administrativenhet",
                "valueBuildStrategy": 0,
                "valueBuilder": {
                    "value": "unit33"
                }
            },
            {
                "field": "journalstatus",
                "valueBuildStrategy": 0,
                "valueBuilder": {
                    "value": "N"
                }
            },
            {
                "field": "journalposttype",
                "valueBuildStrategy": 0,
                "valueBuilder": {
                    "value": "A"
                }
            },
            {
                "field": "saksbehandler",
                "valueBuildStrategy": 0,
                "valueBuilder": {
                    "value": "leia"
                }
            },
            {
                "field": "tilgangsrestriksjon",
                "valueBuildStrategy": 0,
                "valueBuilder": {
                    "value": "code89"
                }
            },
            {
                "field": "skjermingshjemmel",
                "valueBuildStrategy": 0,
                "valueBuilder": {
                    "value": "p34"
                }
            }
        ]
    }
}

export const MOCK_CONFIGURATION_WITH_TAGS: IConfiguration = {
    "configurationId": "id0",
    "integrationId": "TEST234",
    "comment": "test config, with tags",
    "version": 1,
    "completed": false,
    "applicantConfiguration": {
        "applicantType": "ORGANISATION",
        "fields": [
            {
                "field": "organisasjonsnummer",
                "valueBuildStrategy": 1,
                "valueBuilder": {
                    "properties": [],
                    "value": "123456789"
                }
            },
            {
                "field": "KorrespondansepartNavn",
                "valueBuildStrategy": 1,
                "valueBuilder": {
                    "properties": [],
                    "value": "Luke Skywalker"
                }
            },
            {
                "field": "Adresse.adresselinje",
                "valueBuildStrategy": 1,
                "valueBuilder": {
                    "properties": [],
                    "value": "highstreet 22"
                }
            },
            {
                "field": "Adresse.postnummer",
                "valueBuildStrategy": 1,
                "valueBuilder": {
                    "properties": [],
                    "value": "1234"
                }
            },
            {
                "field": "Adresse.poststed",
                "valueBuildStrategy": 1,
                "valueBuilder": {
                    "properties": [],
                    "value": "Moria"
                }
            },
            {
                "field": "kontaktperson",
                "valueBuildStrategy": 1,
                "valueBuilder": {
                    "properties": [],
                    "value": "donna"
                }
            },
            {
                "field": "Kontaktinformasjon.mobiltelefonnummer",
                "valueBuildStrategy": 1,
                "valueBuilder": {
                    "properties": [],
                    "value": "12345678"
                }
            },
            {
                "field": "Kontaktinformasjon.epostadresse",
                "valueBuildStrategy": 1,
                "valueBuilder": {
                    "properties": [],
                    "value": "hello@world.no"
                }
            },
            {
                "field": "tilgangsrestriksjon",
                "valueBuildStrategy": 0,
                "valueBuilder": {
                    "value": "code2"
                }
            },
            {
                "field": "skjermingshjemmel",
                "valueBuildStrategy": 0,
                "valueBuilder": {
                    "value": "p3"
                }
            }
        ],
        "organisationNumber": true,
        "protected": true
    },
    "caseConfiguration": {
        "caseCreationStrategy": "NEW",
        "fields": [
            {
                "field": "tittel",
                "valueBuildStrategy": 1,
                "valueBuilder": {
                    "properties": [
                        {
                            "key": "tags",
                            "order": 0,
                            "source": "FORM"
                        }
                    ],
                    "value": "Title of case with %s"
                }
            },
            {
                "field": "offentligTittel",
                "valueBuildStrategy": 1,
                "valueBuilder": {
                    "properties": [
                        {
                            "key": "two",
                            "order": 0,
                            "source": "FORM"
                        },
                        {
                            "key": "tags",
                            "order": 1,
                            "source": "FORM"
                        }
                    ],
                    "value": "public title also with %s %s"
                }
            },
            {
                "field": "saksmappetype",
                "valueBuildStrategy": 0,
                "valueBuilder": {
                    "value": "casetype"
                }
            },
            {
                "field": "administrativenhet",
                "valueBuildStrategy": 0,
                "valueBuilder": {
                    "value": "unit4"
                }
            },
            {
                "field": "arkivdel",
                "valueBuildStrategy": 0,
                "valueBuilder": {
                    "value": "unit3"
                }
            },
            {
                "field": "journalenhet",
                "valueBuildStrategy": 0,
                "valueBuilder": {
                    "value": "unit0"
                }
            },
            {
                "field": "status",
                "valueBuildStrategy": 0,
                "valueBuilder": {
                    "value": ""
                }
            },
            {
                "field": "tilgangsrestriksjon",
                "valueBuildStrategy": 0,
                "valueBuilder": {
                    "value": "code42"
                }
            },
            {
                "field": "skjermingshjemmel",
                "valueBuildStrategy": 0,
                "valueBuilder": {
                    "value": "number6"
                }
            },
            {
                "field": "saksansvarlig",
                "valueBuildStrategy": 0,
                "valueBuilder": {
                    "value": "rand"
                }
            },
            {
                "field": "primarordningsprinsipp",
                "valueBuildStrategy": 1,
                "valueBuilder": {
                    "properties": [],
                    "value": "prim"
                }
            },
            {
                "field": "sekundarordningsprinsipp",
                "valueBuildStrategy": 1,
                "valueBuilder": {
                    "properties": [],
                    "value": "rose"
                }
            },
            {
                "field": "tertiarordningsprinsipp",
                "valueBuildStrategy": 1,
                "valueBuilder": {
                    "properties": [],
                    "value": "everdeen"
                }
            },
            {
                "field": "primarklasse",
                "valueBuildStrategy": 1,
                "valueBuilder": {
                    "properties": [],
                    "value": "1class"
                }
            },
            {
                "field": "sekundarklasse",
                "valueBuildStrategy": 0,
                "valueBuilder": {
                    "properties": [],
                    "value": "2class"
                }
            },
            {
                "field": "tertiarklasse",
                "valueBuildStrategy": 0,
                "valueBuilder": {
                    "properties": [],
                    "value": "3class"
                }
            },
            {
                "field": "primartittel",
                "valueBuildStrategy": 1,
                "valueBuilder": {
                    "properties": [],
                    "value": "primTitle"
                }
            },
            {
                "field": "sekundartittel",
                "valueBuildStrategy": 1,
                "valueBuilder": {
                    "properties": [],
                    "value": "secTitle"
                }
            },
            {
                "field": "tertiartittel",
                "valueBuildStrategy": 1,
                "valueBuilder": {
                    "properties": [],
                    "value": "tertTitle"
                }
            }
        ]
    },
    "documentConfiguration": {
        "fields": [
            {
                "field": "tittel",
                "valueBuildStrategy": 1,
                "valueBuilder": {
                    "properties": [],
                    "value": "document title"
                }
            },
            {
                "field": "dokumentStatus",
                "valueBuildStrategy": 0,
                "valueBuilder": {
                    "value": "D9"
                }
            },
            {
                "field": "DokumentBeskrivelse.dokumentKategori",
                "valueBuildStrategy": 0,
                "valueBuilder": {}
            },
            {
                "field": "tilgangsrestriksjon",
                "valueBuildStrategy": 0,
                "valueBuilder": {
                    "value": "code3"
                }
            },
            {
                "field": "skjermingshjemmel",
                "valueBuildStrategy": 0,
                "valueBuilder": {
                    "value": "p02"
                }
            },
            {
                "field": "DokumentBeskrivelse.dokumentObjekt.variantFormat",
                "valueBuildStrategy": 0,
                "valueBuilder": {
                    "value": "var6"
                }
            }
        ]
    },
    "recordConfiguration": {
        "fields": [
            {
                "field": "tittel",
                "valueBuildStrategy": 1,
                "valueBuilder": {
                    "properties": [
                        {
                            "key": "just",
                            "order": 0,
                            "source": "FORM"
                        },
                        {
                            "key": "tags",
                            "order": 1,
                            "source": "FORM"
                        }
                    ],
                    "value": "%s %s"
                }
            },
            {
                "field": "offentigTittel",
                "valueBuildStrategy": 1,
                "valueBuilder": {
                    "properties": [
                        {
                            "key": "singletag",
                            "order": 0,
                            "source": "FORM"
                        }
                    ],
                    "value": "%s"
                }
            },
            {
                "field": "DokumentBeskrivelse.dokumentType",
                "valueBuildStrategy": 0,
                "valueBuilder": {
                    "value": "cat8"
                }
            },
            {
                "field": "administrativenhet",
                "valueBuildStrategy": 0,
                "valueBuilder": {
                    "value": "unit33"
                }
            },
            {
                "field": "journalstatus",
                "valueBuildStrategy": 0,
                "valueBuilder": {
                    "value": "N"
                }
            },
            {
                "field": "journalposttype",
                "valueBuildStrategy": 0,
                "valueBuilder": {
                    "value": "A"
                }
            },
            {
                "field": "saksbehandler",
                "valueBuildStrategy": 0,
                "valueBuilder": {
                    "value": "mando"
                }
            },
            {
                "field": "tilgangsrestriksjon",
                "valueBuildStrategy": 0,
                "valueBuilder": {
                    "value": "code89"
                }
            },
            {
                "field": "skjermingshjemmel",
                "valueBuildStrategy": 0,
                "valueBuilder": {
                    "value": "p34"
                }
            }
        ]
    },
}


export const MOCK_NEW_CONFIG: newIConfiguration = {
    configurationId: 'id2',
    integrationId: '123',
    version: 3,
    completed: true,
    comment: 'Ferdigstilt ',
    configurationFields: [
        {
            key: 'case',
            children: [
                {
                    key: 'tittel',
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
                    valueBuilder: {
                        value: "%s %s %s",
                        properties: [
                            {key: "foo", order: 0, source: "FORM"},
                            {key: "bar", order: 1, source: "FORM"},
                            {key: "bubu", order: 2, source: "FORM"}
                        ]
                    }
                },
                {
                    key: 'journalenhet',
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.FIXED_ARCHIVE_CODE_VALUE,
                    valueBuilder: {
                        value:  "https://beta.felleskomponent.no/arkiv/noark/administrativenhet/systemid/191"
                    }
                }
            ]
        },
        {
            key: 'record',
            children: [
                {
                    key: 'tittel',
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
                    valueBuilder: {
                        value: "%s bar",
                        properties: [
                            {key: "foo", order: 0, source: "FORM"},
                        ]
                    }
                },
                {
                    key: 'administrativeenhet',
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.FIXED_ARCHIVE_CODE_VALUE,
                    valueBuilder: {
                        value:  "https://beta.felleskomponent.no/arkiv/noark/administrativenhet/systemid/191"
                    }
                }
            ]
        }
    ]
}
