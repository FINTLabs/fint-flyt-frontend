import IFormData from "../../features/integration/types/Form/FormData";
import {IIntegrationConfiguration} from "../../features/integration/types/IntegrationConfiguration";
import {CreationStrategy} from "../../features/integration/types/CreationStrategy";

export const MOCK_FORMDATA: IFormData = {
    "applicantData": {
        "accessCode": "code2",
        "address": "highstreet 22",
        "city": "Moria",
        "email": "hello@world.no",
        "name": "Anakin Skywalker",
        "paragraph": "p3",
        "phoneNumber": "12345678",
        "postalCode": "1234",
        "type": "PERSON"
    },
    "caseData": {
        "accessCode": "code42",
        "administrativeUnit": "unit4",
        "archiveUnit": "unit3",
        "caseCreationStrategy": "NEW",
        "caseType": "casetype",
        "caseWorker": "rand",
        "paragraph": "number6",
        "primaryClass": "1class",
        "primaryClassification": "prim",
        "publicTitle": "public title",
        "recordUnit": "unit0",
        "secondaryClass": "2class",
        "secondaryClassification": "rose",
        "title": "Title of case"
    },
    "description": "form to test mapping",
    "documentData": {
        "accessCode": "code2",
        "documentStatus": "D9",
        "paragraph": "p07",
        "title": "document title",
        "variant": "var"
    },
    "name": "testform",
    "orgId": "viken.no",
    "recordData": {
        "accessCode": "code89",
        "administrativeUnit": "unit33",
        "category": "cat8",
        "paragraph": "p34",
        "publicTitle": "public record title",
        "status": "N",
        "title": "record title"
    },
    "sourceApplication": "Acos",
    "sourceApplicationIntegrationId": "VIK116"
}

export const MOCK_FORMDATA_WITH_TAGS: IFormData = {
    name: 'testform with tags',
    description: 'form to test mapping with form tags',
    sourceApplication: 'Acos',
    sourceApplicationIntegrationId: 'VIK116',
    orgId:'vtfk.no',
    caseData: {
        caseCreationStrategy: CreationStrategy.NEW,
        title: 'Title of case with {tags}',
        publicTitle: 'public title also with {two} {tags}',
        caseType: 'casetype',
        administrativeUnit: 'unit4',
        archiveUnit: 'unit3',
        recordUnit: 'unit0',
        accessCode: 'code42',
        paragraph: 'number6',
        caseWorker: 'rand',
        primaryClassification: 'prim',
        secondaryClassification: 'rose',
        primaryClass: '1class',
        secondaryClass: '2class',
    },
    recordData: {
        title: '{just} {tags}',
        publicTitle: '{singletag}',
        category: 'cat8',
        administrativeUnit: 'unit33',
        status: 'N',
        accessCode: 'code89',
        paragraph: 'p34',
    },
    documentData: {
        title: 'document title',
        documentStatus: 'D9',
        accessCode: 'code3',
        paragraph: 'p02',
        variant: 'var6'
    },
    applicantData: {
        type: 'ORGANISATION',
        organisationNumber: '123456789',
        name: 'Luke Skywalker',
        address: 'highstreet 22',
        postalCode: '1234',
        city: 'Moria',
        phoneNumber: '12345678',
        email: 'hello@world.no',
        accessCode: 'code2',
        paragraph: 'p3',
    }
}

export const MOCK_INTEGRATION_CONFIG: IIntegrationConfiguration = {
    "applicantConfiguration": {
        "applicantType": 'PERSON',
        "fields": [
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
        ]
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
                "field": "caseType",
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
                "field": "primarklasse",
                "valueBuildStrategy": 0,
                "valueBuilder": {
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
            }
        ]
    },
    "description": "form to test mapping",
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
    "name": "testform",
    "orgId": 'viken.no',
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
    sourceApplication: 'Acos',
    sourceApplicationIntegrationId: 'VIK116',
}

export const MOCK_INTEGRATION_CONFIG_WITH_TAGS: IIntegrationConfiguration = {
    "applicantConfiguration": {
        "applicantType": "ORGANISATION",
        "fields": [
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
        "organisationNumber": "123456789"
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
                "field": "caseType",
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
                "field": "primarklasse",
                "valueBuildStrategy": 0,
                "valueBuilder": {
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
            }
        ]
    },
    "description": "form to test mapping with form tags",
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
    "name": "testform with tags",
    "orgId": "vtfk.no",
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
    "sourceApplication": "Acos",
    "sourceApplicationIntegrationId": "VIK116"
}