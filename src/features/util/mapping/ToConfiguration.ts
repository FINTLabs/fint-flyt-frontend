import {FieldConfigurationType, IConfigurationPatch, newIConfiguration} from "../../integration/types/Configuration";
import { IFormConfiguration } from "../../integration/types/Form/FormData";
import {CreationStrategy} from "../../integration/types/CreationStrategy";

export function toConfiguration(data: IFormConfiguration, integrationId: string, configurationId: any, metadataId: number): newIConfiguration {
    return {
        integrationId: integrationId,
        id: configurationId,
        completed: data.completed,
        integrationMetadataId: metadataId,
        comment: data.comment,
        elements: [
            data.caseData.caseCreationStrategy === CreationStrategy.BY_ID ?
                {
                    key: 'case',
                    fieldConfigurations: [
                        {
                            key: "type",
                            type: FieldConfigurationType.STRING,
                            value: "BY_ID"
                        },
                        {
                            key: "id",
                            type: FieldConfigurationType.STRING,
                            value: data.caseData.caseNumber ? data.caseData.caseNumber : null
                        }
                    ]
                } : {
                    key: 'case',
                    searchParameters: data.caseData.caseCreationStrategy === CreationStrategy.NEW ? undefined : [],
                    fieldConfigurations: [
                        {
                            key: "type",
                            type: FieldConfigurationType.STRING,
                            value: data.caseData.caseCreationStrategy === CreationStrategy.NEW ? "NEW" : "BY_SEARCH_OR_NEW"
                        },
                        {
                            key: "tittel",
                            type: FieldConfigurationType.DYNAMIC_STRING,
                            value: data.caseData.title === '' ? null : data.caseData?.title
                        },
                        {
                            key: "offentligTittel",
                            type: FieldConfigurationType.DYNAMIC_STRING,
                            value: data.caseData?.publicTitle === '' ? null : data.caseData?.publicTitle
                        },
                        {
                            key: "saksmappetype",
                            type: FieldConfigurationType.STRING,
                            value: data.caseData?.caseType
                        },
                        {
                            key: 'administrativenhet',
                            type: FieldConfigurationType.STRING,
                            value: data.caseData?.administrativeUnit

                        },
                        {
                            key: "arkivdel",
                            type: FieldConfigurationType.STRING,
                            value: data.caseData?.archiveUnit

                        },
                        {
                            key: "journalenhet",
                            type: FieldConfigurationType.STRING,
                            value: data.caseData?.recordUnit

                        },
                        {
                            key: "status",
                            type: FieldConfigurationType.STRING,
                            value: data.caseData?.status

                        },
                        {
                            key: "tilgangsrestriksjon",
                            type: FieldConfigurationType.STRING,
                            value: data.caseData?.accessCode

                        },
                        {
                            key: "skjermingshjemmel",
                            type: FieldConfigurationType.STRING,
                            value: data.caseData?.paragraph

                        },
                        {
                            key: "saksansvarlig",
                            type: FieldConfigurationType.STRING,
                            value: data.caseData?.caseWorker

                        },
                        {
                            key: "primarordningsprinsipp",
                            type: FieldConfigurationType.STRING,
                            value: data.caseData?.primaryClassification
                        },
                        {
                            key: "sekundarordningsprinsipp",
                            type: FieldConfigurationType.STRING,
                            value: data.caseData?.secondaryClassification
                        },
                        {
                            key: "tertiarordningsprinsipp",
                            type: FieldConfigurationType.STRING,
                            value: data.caseData?.tertiaryClassification
                        },
                        {
                            key: "primarklasse",
                            type: FieldConfigurationType.DYNAMIC_STRING,
                            value: data.caseData?.primaryClass === '' ? null : data.caseData?.primaryClass
                        },
                        {
                            key: "sekundarklasse",
                            type: FieldConfigurationType.DYNAMIC_STRING,
                            value: data.caseData?.secondaryClass === '' ? null : data.caseData?.secondaryClass
                        },
                        {
                            key: "tertiarklasse",
                            type: FieldConfigurationType.DYNAMIC_STRING,
                            value: data.caseData?.tertiaryClass === '' ? null : data.caseData?.tertiaryClass
                        },
                        {
                            key: "primartittel",
                            type: FieldConfigurationType.DYNAMIC_STRING,
                            value: data.caseData?.primaryTitle === '' ? null : data.caseData?.primaryTitle
                        },
                        {
                            key: "sekundartittel",
                            type: FieldConfigurationType.DYNAMIC_STRING,
                            value: data.caseData?.secondaryTitle === '' ? null : data.caseData?.secondaryTitle
                        },
                        {
                            key: "tertiartittel",
                            type: FieldConfigurationType.DYNAMIC_STRING,
                            value: data.caseData?.tertiaryTitle === '' ? null : data.caseData?.tertiaryTitle
                        }
                    ]
                },
            {
                key: 'record',
                elements: [
                    {
                        key: 'mainDocument',
                        fieldConfigurations: [
                            {
                                key: "tittel",
                                type: FieldConfigurationType.STRING,
                                value: data.recordData.title
                            },
                            {
                                key: "dokumentStatus",
                                type: FieldConfigurationType.STRING,
                                value: data.recordData.mainDocument?.documentStatus
                            },
                            {
                                key: "dokumentType",
                                type: FieldConfigurationType.STRING,
                                value: data.recordData.mainDocument?.documentType
                            },
                            {
                                key: "dokumentObjekt.filformat",
                                type: FieldConfigurationType.STRING,
                                value: data.recordData.mainDocument?.format
                            },
                            {
                                key: "dokumentObjekt.variantformat",
                                type: FieldConfigurationType.STRING,
                                value: data.recordData.mainDocument?.variant
                            }
                            ,
                            {
                                key: "dokumentObjekt.fil",
                                type: FieldConfigurationType.STRING,
                                value: data.recordData.mainDocument?.file
                            }
                        ]
                    },
                    {
                        key: 'attachmentDocuments',
                        fieldConfigurations: [
                            {
                                key: "tittel",
                                type: FieldConfigurationType.STRING,
                                value: data.recordData.attachmentDocuments?.title
                            },
                            {
                                key: "dokumentStatus",
                                type: FieldConfigurationType.STRING,
                                value: data.recordData.attachmentDocuments?.documentStatus
                            },
                            {
                                key: "dokumentType",
                                type: FieldConfigurationType.STRING,
                                value: data.recordData.attachmentDocuments?.documentType
                            },
                            {
                                key: "dokumentObjekt.filformat",
                                type: FieldConfigurationType.STRING,
                                value: data.recordData.attachmentDocuments?.format
                            },
                            {
                                key: "dokumentObjekt.variantformat",
                                type: FieldConfigurationType.STRING,
                                value: data.recordData.attachmentDocuments?.variant
                            }
                            ,
                            {
                                key: "dokumentObjekt.fil",
                                type: FieldConfigurationType.STRING,
                                value: data.recordData.attachmentDocuments?.file
                            }
                        ]
                    },
                    data.recordData.correspondent?.protected ?
                        {
                            key: 'correspondent',
                            fieldConfigurations: [
                                {
                                    key: "protected",
                                    type: FieldConfigurationType.BOOLEAN,
                                    value: data.recordData.correspondent?.protected.toString()
                                },
                                {
                                    key: "fødselsnummer",
                                    type: FieldConfigurationType.DYNAMIC_STRING,
                                    value: data.recordData.correspondent?.nationalIdentityNumber === '' ? null : data.recordData.correspondent?.nationalIdentityNumber
                                },
                                {
                                    key: "organisasjonsnummer",
                                    type: FieldConfigurationType.DYNAMIC_STRING,
                                    value: data.recordData.correspondent?.organisationNumber === '' ? null : data.recordData.correspondent?.organisationNumber
                                },
                                {
                                    key: "KorrespondansepartNavn",
                                    type: FieldConfigurationType.DYNAMIC_STRING,
                                    value: data.recordData.correspondent?.name === '' ? null : data.recordData.correspondent?.name
                                },
                                {
                                    key: "Adresse.adresselinje",
                                    type: FieldConfigurationType.DYNAMIC_STRING,
                                    value: data.recordData.correspondent?.address === '' ? null : data.recordData.correspondent?.address
                                },
                                {
                                    key: "Adresse.postnummer",
                                    type: FieldConfigurationType.DYNAMIC_STRING,
                                    value: data.recordData.correspondent?.postalCode === '' ? null : data.recordData.correspondent?.postalCode
                                },
                                {
                                    key: "Adresse.poststed",
                                    type: FieldConfigurationType.DYNAMIC_STRING,
                                    value: data.recordData.correspondent?.city === '' ? null : data.recordData.correspondent?.city
                                },
                                {
                                    key: "kontaktperson",
                                    type: FieldConfigurationType.DYNAMIC_STRING,
                                    value: data.recordData.correspondent?.contactPerson === '' ? null : data.recordData.correspondent?.contactPerson
                                },
                                {
                                    key: "Kontaktinformasjon.mobiltelefonnummer",
                                    type: FieldConfigurationType.DYNAMIC_STRING,
                                    value: data.recordData.correspondent?.phoneNumber === '' ? null : data.recordData.correspondent?.phoneNumber
                                },
                                {
                                    key: "Kontaktinformasjon.epostadresse",
                                    type: FieldConfigurationType.DYNAMIC_STRING,
                                    value: data.recordData.correspondent?.email === '' ? null : data.recordData.correspondent?.email
                                },
                                {
                                    key: "tilgangsrestriksjon",
                                    type: FieldConfigurationType.STRING,
                                    value: data.recordData.correspondent?.accessCode
                                },
                                {
                                    key: "skjermingshjemmel",
                                    type: FieldConfigurationType.STRING,
                                    value: data.recordData.correspondent?.paragraph
                                }
                            ]
                        }
                        :
                        {
                            key: 'correspondent',
                            fieldConfigurations: [
                                {
                                    key: "protected",
                                    type: FieldConfigurationType.BOOLEAN,
                                    value: null
                                },{
                                    key: "fødselsnummer",
                                    type: FieldConfigurationType.DYNAMIC_STRING,
                                    value: data.recordData.correspondent?.nationalIdentityNumber === '' ? null : data.recordData.correspondent?.nationalIdentityNumber
                                },
                                {
                                    key: "organisasjonsnummer",
                                    type: FieldConfigurationType.DYNAMIC_STRING,
                                    value: data.recordData.correspondent?.organisationNumber === '' ? null : data.recordData.correspondent?.organisationNumber
                                },
                                {
                                    key: "KorrespondansepartNavn",
                                    type: FieldConfigurationType.DYNAMIC_STRING,
                                    value: data.recordData.correspondent?.name === '' ? null : data.recordData.correspondent?.name
                                },
                                {
                                    key: "Adresse.adresselinje",
                                    type: FieldConfigurationType.DYNAMIC_STRING,
                                    value: data.recordData.correspondent?.address === '' ? null : data.recordData.correspondent?.address
                                },
                                {
                                    key: "Adresse.postnummer",
                                    type: FieldConfigurationType.DYNAMIC_STRING,
                                    value: data.recordData.correspondent?.postalCode === '' ? null : data.recordData.correspondent?.postalCode
                                },
                                {
                                    key: "Adresse.poststed",
                                    type: FieldConfigurationType.DYNAMIC_STRING,
                                    value: data.recordData.correspondent?.city === '' ? null : data.recordData.correspondent?.city
                                },
                                {
                                    key: "kontaktperson",
                                    type: FieldConfigurationType.DYNAMIC_STRING,
                                    value: data.recordData.correspondent?.contactPerson === '' ? null : data.recordData.correspondent?.contactPerson
                                },
                                {
                                    key: "Kontaktinformasjon.mobiltelefonnummer",
                                    type: FieldConfigurationType.DYNAMIC_STRING,
                                    value: data.recordData.correspondent?.phoneNumber === '' ? null : data.recordData.correspondent?.phoneNumber
                                },
                                {
                                    key: "Kontaktinformasjon.epostadresse",
                                    type: FieldConfigurationType.DYNAMIC_STRING,
                                    value: data.recordData.correspondent?.email === '' ? null : data.recordData.correspondent?.email
                                },
                            ]
                        }
                ],
                fieldConfigurations: [
                    {
                        key: "tittel",
                        type: FieldConfigurationType.DYNAMIC_STRING,
                        value: data.recordData?.title === '' ? null : data.recordData?.title


                    },
                    {
                        key: "offentligTittel",
                        type: FieldConfigurationType.DYNAMIC_STRING,
                        value: data.recordData?.publicTitle === '' ? null : data.recordData?.publicTitle

                    },
                    {
                        key: "administrativenhet",
                        type: FieldConfigurationType.STRING,
                        value: data.recordData?.administrativeUnit

                    },
                    {
                        key: "journalstatus",
                        type: FieldConfigurationType.STRING,
                        value: data.recordData?.recordStatus
                    },
                    {
                        key: "journalposttype",
                        type: FieldConfigurationType.STRING,
                        value: data.recordData?.recordType
                    },
                    {
                        key: "saksbehandler",
                        type: FieldConfigurationType.STRING,
                        value: data.recordData?.caseWorker

                    },
                    {
                        key: "tilgangsrestriksjon",
                        type: FieldConfigurationType.STRING,
                        value: data.recordData?.accessCode

                    },
                    {
                        key: "skjermingshjemmel",
                        type: FieldConfigurationType.STRING,
                        value: data.recordData?.paragraph
                    }
                ]
            }
        ]
    }
}

export function toConfigurationPatch(data: IFormConfiguration, metadataId: any): IConfigurationPatch {
    return {
        completed: data.completed,
        integrationMetadataId: metadataId,
        comment: data.comment,
        elements: [
            data.caseData.caseCreationStrategy === CreationStrategy.BY_ID ?
                {
                    key: 'case',
                    fieldConfigurations: [
                        {
                            key: "type",
                            type: FieldConfigurationType.STRING,
                            value: "BY_ID"
                        },
                        {
                            key: "id",
                            type: FieldConfigurationType.STRING,
                            value: data.caseData.caseNumber ? data.caseData.caseNumber : null
                        }
                    ]
                } : {
                    key: 'case',
                    searchParameters: data.caseData.caseCreationStrategy === CreationStrategy.NEW ? undefined : [],
                    fieldConfigurations: [
                        {
                            key: "type",
                            type: FieldConfigurationType.STRING,
                            value: data.caseData.caseCreationStrategy === CreationStrategy.NEW ? "NEW" : "BY_SEARCH_OR_NEW"
                        },
                        {
                            key: "tittel",
                            type: FieldConfigurationType.DYNAMIC_STRING,
                            value: data.caseData.title === '' ? null : data.caseData?.title
                        },
                        {
                            key: "offentligTittel",
                            type: FieldConfigurationType.DYNAMIC_STRING,
                            value: data.caseData?.publicTitle === '' ? null : data.caseData?.publicTitle
                        },
                        {
                            key: "saksmappetype",
                            type: FieldConfigurationType.STRING,
                            value: data.caseData?.caseType
                        },
                        {
                            key: 'administrativenhet',
                            type: FieldConfigurationType.STRING,
                            value: data.caseData?.administrativeUnit

                        },
                        {
                            key: "arkivdel",
                            type: FieldConfigurationType.STRING,
                            value: data.caseData?.archiveUnit

                        },
                        {
                            key: "journalenhet",
                            type: FieldConfigurationType.STRING,
                            value: data.caseData?.recordUnit

                        },
                        {
                            key: "status",
                            type: FieldConfigurationType.STRING,
                            value: data.caseData?.status

                        },
                        {
                            key: "tilgangsrestriksjon",
                            type: FieldConfigurationType.STRING,
                            value: data.caseData?.accessCode

                        },
                        {
                            key: "skjermingshjemmel",
                            type: FieldConfigurationType.STRING,
                            value: data.caseData?.paragraph

                        },
                        {
                            key: "saksansvarlig",
                            type: FieldConfigurationType.STRING,
                            value: data.caseData?.caseWorker

                        },
                        {
                            key: "primarordningsprinsipp",
                            type: FieldConfigurationType.STRING,
                            value: data.caseData?.primaryClassification
                        },
                        {
                            key: "sekundarordningsprinsipp",
                            type: FieldConfigurationType.STRING,
                            value: data.caseData?.secondaryClassification
                        },
                        {
                            key: "tertiarordningsprinsipp",
                            type: FieldConfigurationType.STRING,
                            value: data.caseData?.tertiaryClassification
                        },
                        {
                            key: "primarklasse",
                            type: FieldConfigurationType.DYNAMIC_STRING,
                            value: data.caseData?.primaryClass === '' ? null : data.caseData?.primaryClass
                        },
                        {
                            key: "sekundarklasse",
                            type: FieldConfigurationType.DYNAMIC_STRING,
                            value: data.caseData?.secondaryClass === '' ? null : data.caseData?.secondaryClass
                        },
                        {
                            key: "tertiarklasse",
                            type: FieldConfigurationType.DYNAMIC_STRING,
                            value: data.caseData?.tertiaryClass === '' ? null : data.caseData?.tertiaryClass
                        },
                        {
                            key: "primartittel",
                            type: FieldConfigurationType.DYNAMIC_STRING,
                            value: data.caseData?.primaryTitle === '' ? null : data.caseData?.primaryTitle
                        },
                        {
                            key: "sekundartittel",
                            type: FieldConfigurationType.DYNAMIC_STRING,
                            value: data.caseData?.secondaryTitle === '' ? null : data.caseData?.secondaryTitle
                        },
                        {
                            key: "tertiartittel",
                            type: FieldConfigurationType.DYNAMIC_STRING,
                            value: data.caseData?.tertiaryTitle === '' ? null : data.caseData?.tertiaryTitle
                        }
                    ]
                },
            {
                key: 'record',
                elements: [
                    {
                        key: 'mainDocument',
                        fieldConfigurations: [
                            {
                                key: "tittel",
                                type: FieldConfigurationType.STRING,
                                value: data.recordData.mainDocument?.documentStatus
                            },
                            {
                                key: "dokumentStatus",
                                type: FieldConfigurationType.STRING,
                                value: data.recordData.mainDocument?.documentStatus
                            },
                            {
                                key: "dokumentType",
                                type: FieldConfigurationType.STRING,
                                value: data.recordData.mainDocument?.documentType
                            },
                            {
                                key: "dokumentObjekt.filformat",
                                type: FieldConfigurationType.STRING,
                                value: data.recordData.mainDocument?.format
                            },
                            {
                                key: "dokumentObjekt.variantformat",
                                type: FieldConfigurationType.STRING,
                                value: data.recordData.mainDocument?.variant
                            }
                            ,
                            {
                                key: "dokumentObjekt.fil",
                                type: FieldConfigurationType.STRING,
                                value: data.recordData.mainDocument?.file
                            }
                        ]
                    },
                    {
                        key: 'attachmentDocuments',
                        fieldConfigurations: [
                            {
                                key: "tittel",
                                type: FieldConfigurationType.STRING,
                                value: data.recordData.attachmentDocuments?.title
                            },
                            {
                                key: "dokumentStatus",
                                type: FieldConfigurationType.STRING,
                                value: data.recordData.attachmentDocuments?.documentStatus
                            },
                            {
                                key: "dokumentType",
                                type: FieldConfigurationType.STRING,
                                value: data.recordData.attachmentDocuments?.documentType
                            },
                            {
                                key: "dokumentObjekt.filformat",
                                type: FieldConfigurationType.STRING,
                                value: data.recordData.attachmentDocuments?.format
                            },
                            {
                                key: "dokumentObjekt.variantformat",
                                type: FieldConfigurationType.STRING,
                                value: data.recordData.attachmentDocuments?.variant
                            }
                            ,
                            {
                                key: "dokumentObjekt.fil",
                                type: FieldConfigurationType.STRING,
                                value: data.recordData.attachmentDocuments?.file
                            }
                        ]
                    },
                    data.recordData.correspondent?.protected ?
                        {
                            key: 'correspondent',
                            fieldConfigurations: [
                                {
                                    key: "protected",
                                    type: FieldConfigurationType.BOOLEAN,
                                    value: data.recordData.correspondent?.protected.toString()
                                },
                                {
                                    key: "fødselsnummer",
                                    type: FieldConfigurationType.DYNAMIC_STRING,
                                    value: data.recordData.correspondent?.nationalIdentityNumber === '' ? null : data.recordData.correspondent?.nationalIdentityNumber
                                },
                                {
                                    key: "organisasjonsnummer",
                                    type: FieldConfigurationType.DYNAMIC_STRING,
                                    value: data.recordData.correspondent?.organisationNumber === '' ? null : data.recordData.correspondent?.organisationNumber
                                },
                                {
                                    key: "KorrespondansepartNavn",
                                    type: FieldConfigurationType.DYNAMIC_STRING,
                                    value: data.recordData.correspondent?.name === '' ? null : data.recordData.correspondent?.name
                                },
                                {
                                    key: "Adresse.adresselinje",
                                    type: FieldConfigurationType.DYNAMIC_STRING,
                                    value: data.recordData.correspondent?.address === '' ? null : data.recordData.correspondent?.address
                                },
                                {
                                    key: "Adresse.postnummer",
                                    type: FieldConfigurationType.DYNAMIC_STRING,
                                    value: data.recordData.correspondent?.postalCode === '' ? null : data.recordData.correspondent?.postalCode
                                },
                                {
                                    key: "Adresse.poststed",
                                    type: FieldConfigurationType.DYNAMIC_STRING,
                                    value: data.recordData.correspondent?.city === '' ? null : data.recordData.correspondent?.city
                                },
                                {
                                    key: "kontaktperson",
                                    type: FieldConfigurationType.DYNAMIC_STRING,
                                    value: data.recordData.correspondent?.contactPerson === '' ? null : data.recordData.correspondent?.contactPerson
                                },
                                {
                                    key: "Kontaktinformasjon.mobiltelefonnummer",
                                    type: FieldConfigurationType.DYNAMIC_STRING,
                                    value: data.recordData.correspondent?.phoneNumber === '' ? null : data.recordData.correspondent?.phoneNumber
                                },
                                {
                                    key: "Kontaktinformasjon.epostadresse",
                                    type: FieldConfigurationType.DYNAMIC_STRING,
                                    value: data.recordData.correspondent?.email === '' ? null : data.recordData.correspondent?.email
                                },
                                {
                                    key: "tilgangsrestriksjon",
                                    type: FieldConfigurationType.STRING,
                                    value: data.recordData.correspondent?.accessCode
                                },
                                {
                                    key: "skjermingshjemmel",
                                    type: FieldConfigurationType.STRING,
                                    value: data.recordData.correspondent?.paragraph
                                }
                            ]
                        }
                        :
                        {
                            key: 'correspondent',
                            fieldConfigurations: [
                                {
                                    key: "protected",
                                    type: FieldConfigurationType.BOOLEAN,
                                    value: null
                                },{
                                    key: "fødselsnummer",
                                    type: FieldConfigurationType.DYNAMIC_STRING,
                                    value: data.recordData.correspondent?.nationalIdentityNumber === '' ? null : data.recordData.correspondent?.nationalIdentityNumber
                                },
                                {
                                    key: "organisasjonsnummer",
                                    type: FieldConfigurationType.DYNAMIC_STRING,
                                    value: data.recordData.correspondent?.organisationNumber === '' ? null : data.recordData.correspondent?.organisationNumber
                                },
                                {
                                    key: "KorrespondansepartNavn",
                                    type: FieldConfigurationType.DYNAMIC_STRING,
                                    value: data.recordData.correspondent?.name === '' ? null : data.recordData.correspondent?.name
                                },
                                {
                                    key: "Adresse.adresselinje",
                                    type: FieldConfigurationType.DYNAMIC_STRING,
                                    value: data.recordData.correspondent?.address === '' ? null : data.recordData.correspondent?.address
                                },
                                {
                                    key: "Adresse.postnummer",
                                    type: FieldConfigurationType.DYNAMIC_STRING,
                                    value: data.recordData.correspondent?.postalCode === '' ? null : data.recordData.correspondent?.postalCode
                                },
                                {
                                    key: "Adresse.poststed",
                                    type: FieldConfigurationType.DYNAMIC_STRING,
                                    value: data.recordData.correspondent?.city === '' ? null : data.recordData.correspondent?.city
                                },
                                {
                                    key: "kontaktperson",
                                    type: FieldConfigurationType.DYNAMIC_STRING,
                                    value: data.recordData.correspondent?.contactPerson === '' ? null : data.recordData.correspondent?.contactPerson
                                },
                                {
                                    key: "Kontaktinformasjon.mobiltelefonnummer",
                                    type: FieldConfigurationType.DYNAMIC_STRING,
                                    value: data.recordData.correspondent?.phoneNumber === '' ? null : data.recordData.correspondent?.phoneNumber
                                },
                                {
                                    key: "Kontaktinformasjon.epostadresse",
                                    type: FieldConfigurationType.DYNAMIC_STRING,
                                    value: data.recordData.correspondent?.email === '' ? null : data.recordData.correspondent?.email
                                },
                            ]
                        }
                ],
                fieldConfigurations: [
                    {
                        key: "tittel",
                        type: FieldConfigurationType.DYNAMIC_STRING,
                        value: data.recordData?.title === '' ? null : data.recordData?.title


                    },
                    {
                        key: "offentligTittel",
                        type: FieldConfigurationType.DYNAMIC_STRING,
                        value: data.recordData?.publicTitle === '' ? null : data.recordData?.publicTitle

                    },
                    {
                        key: "administrativenhet",
                        type: FieldConfigurationType.STRING,
                        value: data.recordData?.administrativeUnit

                    },
                    {
                        key: "journalstatus",
                        type: FieldConfigurationType.STRING,
                        value: data.recordData?.recordStatus
                    },
                    {
                        key: "journalposttype",
                        type: FieldConfigurationType.STRING,
                        value: data.recordData?.recordType
                    },
                    {
                        key: "saksbehandler",
                        type: FieldConfigurationType.STRING,
                        value: data.recordData?.caseWorker

                    },
                    {
                        key: "tilgangsrestriksjon",
                        type: FieldConfigurationType.STRING,
                        value: data.recordData?.accessCode

                    },
                    {
                        key: "skjermingshjemmel",
                        type: FieldConfigurationType.STRING,
                        value: data.recordData?.paragraph
                    }
                ]
            }
        ]
    }
}

