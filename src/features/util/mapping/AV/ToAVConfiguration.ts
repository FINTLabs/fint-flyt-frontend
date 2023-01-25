import {FieldConfigurationType, IConfigurationPatch, newIConfiguration } from "../../../integration/types/Configuration"
import { IFormConfiguration } from "../../../integration/types/Form/FormData"
import {CreationStrategy} from "../../../integration/types/CreationStrategy";


export function toAVConfiguration(data: IFormConfiguration, integrationId: string, configurationId: any, metadataId: number): newIConfiguration {
    return {
        integrationId: integrationId,
        id: configurationId,
        completed: data.completed,
        integrationMetadataId: metadataId,
        comment: data.comment,
        elements: [
            data.caseData.caseCreationStrategy === CreationStrategy.BY_ID ?
                {
                    key: 'sak',
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
                    key: 'sak',
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
                key: 'journalpost',
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
                                        key: 'tilknyttetRegistreringSom',
                                        type: FieldConfigurationType.URL,
                                        value: 'kodeverk.no/tilknyttetsom/H'
                                    }
                                ],
                                collectionElements: [
                                    {
                                        key: 'dokumentObjekt',
                                        fixed: [
                                            {
                                                fieldConfigurations: [
                                                    {
                                                        key: 'filformat',
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
                                        key: 'tilknyttetRegistreringSom',
                                        type: FieldConfigurationType.URL,
                                        value: 'kodeverk.no/tilknyttetsom/V'
                                    }
                                ],
                                collectionElements: [
                                    {
                                        key: 'dokumentObjekt',
                                        fixed: [
                                            {
                                                fieldConfigurations: [
                                                    {
                                                        key: 'filformat',
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
                    data.recordData.correspondent?.protected ?
                        {
                            key: 'korrespondansepart',
                            fixed: [
                                {
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
                                            key: "kontaktperson",
                                            type: FieldConfigurationType.DYNAMIC_STRING,
                                            value: data.recordData.correspondent?.contactPerson === '' ? null : data.recordData.correspondent?.contactPerson
                                        },
                                        {
                                            key: "korrespondansepartType",
                                            type: FieldConfigurationType.URL,
                                            value: 'kodeverk.no/korrespondansepartType/systemId/A'
                                        }
                                    ],
                                    elements: [
                                        {
                                            key: 'adresse',
                                            fieldConfigurations: [
                                                {
                                                    key: "adresselinje",
                                                    type: FieldConfigurationType.DYNAMIC_STRING,
                                                    value: data.recordData.correspondent?.address === '' ? null : data.recordData.correspondent?.address
                                                },
                                                {
                                                    key: "postnummer",
                                                    type: FieldConfigurationType.DYNAMIC_STRING,
                                                    value: data.recordData.correspondent?.postalCode === '' ? null : data.recordData.correspondent?.postalCode
                                                },
                                                {
                                                    key: "poststed",
                                                    type: FieldConfigurationType.DYNAMIC_STRING,
                                                    value: data.recordData.correspondent?.city === '' ? null : data.recordData.correspondent?.city
                                                },
                                            ]
                                        },
                                        {
                                            key: 'kontaktinformasjon',
                                            fieldConfigurations: [
                                                {
                                                    key: "telefonnummer",
                                                    type: FieldConfigurationType.DYNAMIC_STRING,
                                                    value: data.recordData.correspondent?.phoneNumber === '' ? null : data.recordData.correspondent?.phoneNumber
                                                },
                                                {
                                                    key: "mobiltelefonnummer",
                                                    type: FieldConfigurationType.DYNAMIC_STRING,
                                                    value: data.recordData.correspondent?.mobilePhoneNumber === '' ? null : data.recordData.correspondent?.phoneNumber
                                                },
                                                {
                                                    key: "epostadresse",
                                                    type: FieldConfigurationType.DYNAMIC_STRING,
                                                    value: data.recordData.correspondent?.email === '' ? null : data.recordData.correspondent?.email
                                                }
                                            ]
                                        },
                                        {
                                            key: 'skjerming',
                                            fieldConfigurations: [
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
                                    ]
                                }
                            ],

                        }
                        :
                        {
                            key: 'korrespondansepart',
                            fixed: [
                                {
                                    fieldConfigurations: [
                                        {
                                            key: "protected",
                                            type: FieldConfigurationType.BOOLEAN,
                                            value: 'false'
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
                                            key: "kontaktperson",
                                            type: FieldConfigurationType.DYNAMIC_STRING,
                                            value: data.recordData.correspondent?.contactPerson === '' ? null : data.recordData.correspondent?.contactPerson
                                        }
                                    ],
                                    elements: [
                                        {
                                            key: 'adresse',
                                            fieldConfigurations: [
                                                {
                                                    key: "adresselinje",
                                                    type: FieldConfigurationType.DYNAMIC_STRING,
                                                    value: data.recordData.correspondent?.address === '' ? null : data.recordData.correspondent?.address
                                                },
                                                {
                                                    key: "postnummer",
                                                    type: FieldConfigurationType.DYNAMIC_STRING,
                                                    value: data.recordData.correspondent?.postalCode === '' ? null : data.recordData.correspondent?.postalCode
                                                },
                                                {
                                                    key: "poststed",
                                                    type: FieldConfigurationType.DYNAMIC_STRING,
                                                    value: data.recordData.correspondent?.city === '' ? null : data.recordData.correspondent?.city
                                                },
                                            ]
                                        },
                                        {
                                            key: 'kontaktinformasjon',
                                            fieldConfigurations: [
                                                {
                                                    key: "telefonnummer",
                                                    type: FieldConfigurationType.DYNAMIC_STRING,
                                                    value: data.recordData.correspondent?.phoneNumber === '' ? null : data.recordData.correspondent?.phoneNumber
                                                },
                                                {
                                                    key: "mobiltelefonnummer",
                                                    type: FieldConfigurationType.DYNAMIC_STRING,
                                                    value: data.recordData.correspondent?.mobilePhoneNumber === '' ? null : data.recordData.correspondent?.phoneNumber
                                                },
                                                {
                                                    key: "epostadresse",
                                                    type: FieldConfigurationType.DYNAMIC_STRING,
                                                    value: data.recordData.correspondent?.email === '' ? null : data.recordData.correspondent?.email
                                                }
                                            ]
                                        },
                                        {
                                            key: 'skjerming',
                                            fieldConfigurations: [
                                                {
                                                    key: "tilgangsrestriksjon",
                                                    type: FieldConfigurationType.STRING,
                                                    value: null
                                                },
                                                {
                                                    key: "skjermingshjemmel",
                                                    type: FieldConfigurationType.STRING,
                                                    value: null
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ],
                        }
                ],
            }
        ]
    }
}

export function toAVConfigurationPatch(data: IFormConfiguration, metadataId: any): IConfigurationPatch {
    return {
        completed: data.completed,
        integrationMetadataId: metadataId,
        comment: data.comment,
        elements: [
            data.caseData.caseCreationStrategy === CreationStrategy.BY_ID ?
                {
                    key: 'sak',
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
                    key: 'sak',
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
                key: 'journalpost',
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
                                        key: 'tilknyttetRegistreringSom',
                                        type: FieldConfigurationType.URL,
                                        value: 'kodeverk.no/tilknyttetsom/H'
                                    }
                                ],
                                collectionElements: [
                                    {
                                        key: 'dokumentObjekt',
                                        fixed: [
                                            {
                                                fieldConfigurations: [
                                                    {
                                                        key: 'filformat',
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
                                        key: 'tilknyttetRegistreringSom',
                                        type: FieldConfigurationType.URL,
                                        value: 'kodeverk.no/tilknyttetsom/V'
                                    }
                                ],
                                collectionElements: [
                                    {
                                        key: 'dokumentObjekt',
                                        fixed: [
                                            {
                                                fieldConfigurations: [
                                                    {
                                                        key: 'filformat',
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
                    data.recordData.correspondent?.protected ?
                        {
                            key: 'korrespondansepart',
                            fixed: [
                                {
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
                                            key: "kontaktperson",
                                            type: FieldConfigurationType.DYNAMIC_STRING,
                                            value: data.recordData.correspondent?.contactPerson === '' ? null : data.recordData.correspondent?.contactPerson
                                        },
                                        {
                                            key: "korrespondansepartType",
                                            type: FieldConfigurationType.URL,
                                            value: 'kodeverk.no/korrespondansepartType/systemId/A'
                                        }
                                    ],
                                    elements: [
                                        {
                                            key: 'adresse',
                                            fieldConfigurations: [
                                                {
                                                    key: "adresselinje",
                                                    type: FieldConfigurationType.DYNAMIC_STRING,
                                                    value: data.recordData.correspondent?.address === '' ? null : data.recordData.correspondent?.address
                                                },
                                                {
                                                    key: "postnummer",
                                                    type: FieldConfigurationType.DYNAMIC_STRING,
                                                    value: data.recordData.correspondent?.postalCode === '' ? null : data.recordData.correspondent?.postalCode
                                                },
                                                {
                                                    key: "poststed",
                                                    type: FieldConfigurationType.DYNAMIC_STRING,
                                                    value: data.recordData.correspondent?.city === '' ? null : data.recordData.correspondent?.city
                                                },
                                            ]
                                        },
                                        {
                                            key: 'kontaktinformasjon',
                                            fieldConfigurations: [
                                                {
                                                    key: "telefonnummer",
                                                    type: FieldConfigurationType.DYNAMIC_STRING,
                                                    value: data.recordData.correspondent?.phoneNumber === '' ? null : data.recordData.correspondent?.phoneNumber
                                                },
                                                {
                                                    key: "mobiltelefonnummer",
                                                    type: FieldConfigurationType.DYNAMIC_STRING,
                                                    value: data.recordData.correspondent?.mobilePhoneNumber === '' ? null : data.recordData.correspondent?.phoneNumber
                                                },
                                                {
                                                    key: "epostadresse",
                                                    type: FieldConfigurationType.DYNAMIC_STRING,
                                                    value: data.recordData.correspondent?.email === '' ? null : data.recordData.correspondent?.email
                                                }
                                            ]
                                        },
                                        {
                                            key: 'skjerming',
                                            fieldConfigurations: [
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
                                    ]
                                }
                            ],

                        }
                        :
                        {
                            key: 'korrespondansepart',
                            fixed: [
                                {
                                    fieldConfigurations: [
                                        {
                                            key: "protected",
                                            type: FieldConfigurationType.BOOLEAN,
                                            value: 'false'
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
                                            key: "kontaktperson",
                                            type: FieldConfigurationType.DYNAMIC_STRING,
                                            value: data.recordData.correspondent?.contactPerson === '' ? null : data.recordData.correspondent?.contactPerson
                                        }
                                    ],
                                    elements: [
                                        {
                                            key: 'adresse',
                                            fieldConfigurations: [
                                                {
                                                    key: "adresselinje",
                                                    type: FieldConfigurationType.DYNAMIC_STRING,
                                                    value: data.recordData.correspondent?.address === '' ? null : data.recordData.correspondent?.address
                                                },
                                                {
                                                    key: "postnummer",
                                                    type: FieldConfigurationType.DYNAMIC_STRING,
                                                    value: data.recordData.correspondent?.postalCode === '' ? null : data.recordData.correspondent?.postalCode
                                                },
                                                {
                                                    key: "poststed",
                                                    type: FieldConfigurationType.DYNAMIC_STRING,
                                                    value: data.recordData.correspondent?.city === '' ? null : data.recordData.correspondent?.city
                                                },
                                            ]
                                        },
                                        {
                                            key: 'kontaktinformasjon',
                                            fieldConfigurations: [
                                                {
                                                    key: "telefonnummer",
                                                    type: FieldConfigurationType.DYNAMIC_STRING,
                                                    value: data.recordData.correspondent?.phoneNumber === '' ? null : data.recordData.correspondent?.phoneNumber
                                                },
                                                {
                                                    key: "mobiltelefonnummer",
                                                    type: FieldConfigurationType.DYNAMIC_STRING,
                                                    value: data.recordData.correspondent?.mobilePhoneNumber === '' ? null : data.recordData.correspondent?.phoneNumber
                                                },
                                                {
                                                    key: "epostadresse",
                                                    type: FieldConfigurationType.DYNAMIC_STRING,
                                                    value: data.recordData.correspondent?.email === '' ? null : data.recordData.correspondent?.email
                                                }
                                            ]
                                        },
                                        {
                                            key: 'skjerming',
                                            fieldConfigurations: [
                                                {
                                                    key: "tilgangsrestriksjon",
                                                    type: FieldConfigurationType.STRING,
                                                    value: null
                                                },
                                                {
                                                    key: "skjermingshjemmel",
                                                    type: FieldConfigurationType.STRING,
                                                    value: null
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ],
                        }
                ],
            }
        ]
    }
}

