import {FieldType} from "../../configuration/types/AVConfiguration";
import {IFormConfiguration} from "../../configuration/types/Form/FormData";
import {IConfiguration, IConfigurationPatch} from "../../configuration/types/Configuration";
import {
    addressDataToRecord, caseDataToRecord, classDataToRecord, contactInfoDataToRecord, correspondentDataToRecord,
    documentDescriptionDataToRecord, documentObjectDataToRecord, newCaseDataToRecord, recordDataToRecord, shieldingDataToRecord
} from "./helpers/toValueMappingRecord";


export function toConfiguration(data: IFormConfiguration, integrationId: string, configurationId: any, metadataId: number): IConfiguration {
    const configuration: IConfiguration = {
        integrationId: integrationId,
        id: configurationId,
        completed: data.completed,
        integrationMetadataId: metadataId,
        comment: data.comment,
        mapping: {
            valueMappingPerKey: {},
            elementMappingPerKey: {
                "sak": {
                    valueMappingPerKey: caseDataToRecord(data.caseData),
                    elementMappingPerKey: {
                        "ny": {
                            valueMappingPerKey: newCaseDataToRecord(data.caseData.newCase),
                            elementMappingPerKey: {
                                "skjerming":  {
                                    valueMappingPerKey: shieldingDataToRecord(data.caseData.newCase.shielding),
                                    elementMappingPerKey: {},
                                    elementCollectionMappingPerKey: {}
                                }
                            },
                            elementCollectionMappingPerKey: {
                                "klasse": {
                                    elementsFromCollectionMappings: [],
                                    elementMappings: [
                                        {
                                            valueMappingPerKey: classDataToRecord(data.caseData.newCase.classes[0], "0"),
                                            elementMappingPerKey: {},
                                            elementCollectionMappingPerKey: {}
                                        },{
                                            valueMappingPerKey: classDataToRecord(data.caseData.newCase.classes[1], "1"),
                                            elementMappingPerKey: {},
                                            elementCollectionMappingPerKey: {}
                                        },{
                                            valueMappingPerKey: classDataToRecord(data.caseData.newCase.classes[2], "2"),
                                            elementMappingPerKey: {},
                                            elementCollectionMappingPerKey: {}
                                        }
                                    ]
                                }
                            }
                        }

                    },
                    elementCollectionMappingPerKey: {}
                },
                "journalpost": {
                    valueMappingPerKey: recordDataToRecord(data.recordData),
                    elementMappingPerKey: {
                        "skjerming": {
                            valueMappingPerKey: shieldingDataToRecord(data.recordData.shielding),
                            elementMappingPerKey: {},
                            elementCollectionMappingPerKey: {}
                        }
                    },
                    elementCollectionMappingPerKey: {
                        "dokumentbeskrivelse": {
                            elementMappings: [
                                {
                                    valueMappingPerKey: documentDescriptionDataToRecord(data.recordData.mainDocument),
                                    elementMappingPerKey: {},
                                    elementCollectionMappingPerKey: {
                                        "dokumentobjekt": {
                                            elementMappings: [
                                                {
                                                    valueMappingPerKey: documentObjectDataToRecord(data.recordData.mainDocument),
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
                                        valueMappingPerKey: documentDescriptionDataToRecord(data.recordData.attachmentDocuments),
                                        elementMappingPerKey: {},
                                        elementCollectionMappingPerKey: {
                                            "dokumentobjekt": {
                                                elementMappings: [
                                                    {
                                                        valueMappingPerKey: documentObjectDataToRecord(data.recordData.mainDocument),
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
                                valueMappingPerKey: correspondentDataToRecord(data.recordData.correspondent),
                                elementMappingPerKey: {
                                    "adresse": {
                                        valueMappingPerKey: addressDataToRecord(data.recordData.correspondent),
                                        elementMappingPerKey: {},
                                        elementCollectionMappingPerKey: {}
                                    },
                                    "kontaktinformasjon": {
                                        valueMappingPerKey: contactInfoDataToRecord(data.recordData.correspondent),
                                        elementMappingPerKey: {},
                                        elementCollectionMappingPerKey: {}
                                    },
                                    "skjerming": {
                                        valueMappingPerKey: shieldingDataToRecord(data.recordData.correspondent.shielding),
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
    console.log(configuration)

    return configuration;
}
export function toConfigurationPatch(data: IFormConfiguration, metadataId: any): IConfigurationPatch {
    const configurationPatch: IConfiguration = {
        completed: data.completed,
        integrationMetadataId: metadataId,
        comment: data.comment,
        mapping: {
            valueMappingPerKey: {},
            elementMappingPerKey: {
                "sak": {
                    valueMappingPerKey: caseDataToRecord(data.caseData),
                    elementMappingPerKey: {
                        "ny": {
                            valueMappingPerKey: newCaseDataToRecord(data.caseData.newCase),
                            elementMappingPerKey: {
                                "skjerming": {
                                    valueMappingPerKey: shieldingDataToRecord(data.caseData.newCase.shielding),
                                    elementMappingPerKey: {},
                                    elementCollectionMappingPerKey: {}
                                }
                            },
                            elementCollectionMappingPerKey: {
                                "klasse": {
                                    elementsFromCollectionMappings: [],
                                    elementMappings: [
                                        {
                                            valueMappingPerKey: classDataToRecord(data.caseData.newCase.classes[0], "0"),
                                            elementMappingPerKey: {},
                                            elementCollectionMappingPerKey: {}
                                        },{
                                            valueMappingPerKey: classDataToRecord(data.caseData.newCase.classes[1], "1"),
                                            elementMappingPerKey: {},
                                            elementCollectionMappingPerKey: {}
                                        },{
                                            valueMappingPerKey: classDataToRecord(data.caseData.newCase.classes[2], "2"),
                                            elementMappingPerKey: {},
                                            elementCollectionMappingPerKey: {}
                                        }
                                    ]
                                }
                            }
                        }

                    },
                    elementCollectionMappingPerKey: {}
                },
                "journalpost": {
                    valueMappingPerKey: recordDataToRecord(data.recordData),
                    elementMappingPerKey: {
                        "skjerming": data.recordData.shielding ? {
                            valueMappingPerKey: shieldingDataToRecord(data.recordData.shielding),
                            elementMappingPerKey: {},
                            elementCollectionMappingPerKey: {}
                        } : {
                            valueMappingPerKey: {},
                            elementMappingPerKey: {},
                            elementCollectionMappingPerKey: {}
                        }
                    },
                    elementCollectionMappingPerKey: {
                        "dokumentbeskrivelse": {
                            elementMappings: [
                                {
                                    valueMappingPerKey: documentDescriptionDataToRecord(data.recordData.mainDocument),
                                    elementMappingPerKey: {},
                                    elementCollectionMappingPerKey: {
                                        "dokumentobjekt": {
                                            elementMappings: [
                                                {
                                                    valueMappingPerKey: documentObjectDataToRecord(data.recordData.mainDocument),
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
                                        valueMappingPerKey: documentDescriptionDataToRecord(data.recordData.attachmentDocuments),
                                        elementMappingPerKey: {},
                                        elementCollectionMappingPerKey: {
                                            "dokumentobjekt": {
                                                elementMappings: [
                                                    {
                                                        valueMappingPerKey: documentObjectDataToRecord(data.recordData.mainDocument),
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
                                valueMappingPerKey: correspondentDataToRecord(data.recordData.correspondent),
                                elementMappingPerKey: {
                                    "adresse": {
                                        valueMappingPerKey: addressDataToRecord(data.recordData.correspondent),
                                        elementMappingPerKey: {},
                                        elementCollectionMappingPerKey: {}
                                    },
                                    "kontaktinformasjon": {
                                        valueMappingPerKey: contactInfoDataToRecord(data.recordData.correspondent),
                                        elementMappingPerKey: {},
                                        elementCollectionMappingPerKey: {}
                                    },
                                    "skjerming": data.recordData.correspondent.shielding ? {
                                        valueMappingPerKey: shieldingDataToRecord(data.recordData.correspondent.shielding),
                                        elementMappingPerKey: {},
                                        elementCollectionMappingPerKey: {}
                                    } : {
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
    return configurationPatch
}
/*
export function toTempConfiguration(data: IFormConfiguration, integrationId: string, configurationId: any, metadataId: number): ITempConfiguration {
    const configuration: ITempConfiguration = {
        integrationId: integrationId,
        id: configurationId,
        completed: data.completed,
        integrationMetadataId: metadataId,
        comment: data.comment,
        mapping: {
            valueMappingPerKey: new Map<string, IValueMapping>(),
            elementCollectionMappingPerKey: new Map<string, IElementCollectionMapping>(),
            elementMappingPerKey: new Map<string, IElementMapping>(
                [
                    ["sak", {
                        valueMappingPerKey: new Map<string, IValueMapping>(
                            [
                                ["type", {type: FieldType.STRING, mappingString: data.caseData.caseCreationStrategy}],
                                ["id", {
                                    type: FieldType.STRING,
                                    mappingString: data.caseData.id ? data.caseData.id : null
                                }]
                            ],
                        ),
                        elementMappingPerKey: new Map<string, IElementMapping>(
                            [
                                ["ny", {
                                    valueMappingPerKey: new Map<string, IValueMapping>(
                                        [
                                            ["tittel", {type: FieldType.DYNAMIC_STRING, mappingString: data.caseData.newCase.title}],
                                            ["offentligTittel", {type: FieldType.DYNAMIC_STRING, mappingString: data.caseData.newCase.publicTitle}],
                                            ["saksmappetype", {type: FieldType.STRING, mappingString: data.caseData.newCase.caseType}],
                                            ["administrativenhet", {
                                                type: FieldType.STRING,
                                                mappingString: data.caseData.newCase.administrativeUnit
                                            }],
                                            ["arkivdel", {
                                                type: FieldType.STRING,
                                                mappingString: data.caseData.newCase.archiveUnit
                                            }],
                                            ["journalenhet", {
                                                type: FieldType.STRING,
                                                mappingString: data.caseData.newCase.recordUnit
                                            }],
                                            ["saksstatus", {
                                                type: FieldType.STRING,
                                                mappingString: data.caseData.newCase.status
                                            }],
                                            ["saksansvarlig", {
                                                type: FieldType.STRING,
                                                mappingString: data.caseData.newCase.caseWorker
                                            }],
                                        ],
                                    ),
                                    elementCollectionMappingPerKey: new Map<string, IElementCollectionMapping>(),
                                    elementMappingPerKey: new Map<string, IElementMapping>(
                                        [
                                            ["skjerming", {
                                                valueMappingPerKey: new Map<string, IValueMapping>(
                                                    data.caseData.newCase.shielding ? [
                                                        ["tilgangsrestriksjon", {
                                                            type: FieldType.STRING,
                                                            mappingString: data.caseData.newCase.shielding?.accessCode
                                                        }],
                                                        ["skjermingshjemmel", {
                                                            type: FieldType.STRING,
                                                            mappingString: data.caseData.newCase.shielding?.paragraph
                                                        }],
                                                    ] : [],
                                                ),
                                                elementCollectionMappingPerKey: new Map<string, IElementCollectionMapping>(
                                                    [
                                                        ["klasse", {
                                                            elementMappings: [
                                                                {
                                                                    valueMappingPerKey: new Map<string, IValueMapping>(
                                                                        [
                                                                            ["klassifikasjonssystem", {type: FieldType.STRING, mappingString: data.caseData?.newCase?.classes[0].classification}],
                                                                            ["klasseId", {type: FieldType.STRING, mappingString: data.caseData?.newCase?.classes[0].class}],
                                                                            ["tittel", {type: FieldType.STRING, mappingString: data.caseData?.newCase?.classes[0].title}],
                                                                            ["rekkefølge", {type: FieldType.STRING, mappingString: "0"}],
                                                                        ]
                                                                    ),
                                                                    elementMappingPerKey: new Map<string, IElementMapping>(),
                                                                    elementCollectionMappingPerKey: new Map<string, IElementCollectionMapping>()
                                                                },
                                                                {
                                                                    valueMappingPerKey: new Map<string, IValueMapping>(
                                                                        [
                                                                            ["klassifikasjonssystem", {type: FieldType.STRING, mappingString: data.caseData?.newCase?.classes[1].classification}],
                                                                            ["klasseId", {type: FieldType.STRING, mappingString: data.caseData?.newCase?.classes[1].class}],
                                                                            ["tittel", {type: FieldType.STRING, mappingString: data.caseData?.newCase?.classes[1].title}],
                                                                            ["rekkefølge", {type: FieldType.STRING, mappingString: "1"}],
                                                                        ]
                                                                    ),                                                                     elementMappingPerKey: new Map<string, IElementMapping>(),
                                                                    elementCollectionMappingPerKey: new Map<string, IElementCollectionMapping>()
                                                                },
                                                                {
                                                                    valueMappingPerKey: new Map<string, IValueMapping>(
                                                                        [
                                                                            ["klassifikasjonssystem", {type: FieldType.STRING, mappingString: data.caseData?.newCase?.classes[2].classification}],
                                                                            ["klasseId", {type: FieldType.STRING, mappingString: data.caseData?.newCase?.classes[2].class}],
                                                                            ["tittel", {type: FieldType.STRING, mappingString: data.caseData?.newCase?.classes[2].title}],
                                                                            ["rekkefølge", {type: FieldType.STRING, mappingString: "2"}],
                                                                        ]
                                                                    ),
                                                                    elementMappingPerKey: new Map<string, IElementMapping>(),
                                                                    elementCollectionMappingPerKey: new Map<string, IElementCollectionMapping>()
                                                                }
                                                            ],
                                                            elementsFromCollectionMappings: []
                                                        }]
                                                    ]
                                                ),
                                                elementMappingPerKey: new Map<string, IElementMapping>()
                                            }]
                                        ]),
                                }]
                            ]),
                        elementCollectionMappingPerKey: new Map<string, IElementCollectionMapping>()
                    }],
                    ["journalpost", {
                        valueMappingPerKey: new Map<string, IValueMapping>(
                            [
                                ["tittel", {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.title}],
                                ["offentligTittel", {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.publicTitle}],
                                ["administrativenhet", {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.administrativeUnit}],
                                ["journalstatus", {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.recordStatus}],
                                ["journalposttype", {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.recordType}],
                                ["saksbehandler", {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.caseWorker}]
                            ],
                        ),
                        elementMappingPerKey: new Map<string, IElementMapping>(
                            [
                                ["skjerming", {
                                    valueMappingPerKey: new Map<string, IValueMapping>(
                                        data.recordData.shielding ? [
                                            ["tilgangsrestriksjon", {
                                                type: FieldType.STRING,
                                                mappingString: data.recordData.shielding?.accessCode
                                            }],
                                            ["skjermingshjemmel", {
                                                type: FieldType.STRING,
                                                mappingString: data.recordData.shielding?.paragraph
                                            }],
                                        ] : [],
                                    ),
                                    elementCollectionMappingPerKey: new Map<string, IElementCollectionMapping>(),
                                    elementMappingPerKey: new Map<string, IElementMapping>()
                                }]
                            ]),
                        elementCollectionMappingPerKey: new Map<string, IElementCollectionMapping>(
                            [
                                ["dokumentbeskrivelse", {
                                    elementMappings: [
                                        {
                                            valueMappingPerKey: new Map<string, IValueMapping>(
                                                [
                                                    ["tittel", {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.title}],
                                                    ["dokumentstatus", {type: FieldType.STRING, mappingString: data.recordData.mainDocument.documentStatus}],
                                                    ["dokumentType", {type: FieldType.STRING, mappingString: data.recordData.mainDocument.documentType}],
                                                    ["tilknyttetRegistreringSom", {type: FieldType.STRING, mappingString: data.recordData.mainDocument.role}],
                                                ],
                                            ),
                                            elementMappingPerKey: new Map<string, IElementMapping>(),
                                            elementCollectionMappingPerKey: new Map<string, IElementCollectionMapping>(
                                                [
                                                    ["dokumentobjekt", {
                                                        elementMappings: [
                                                            {
                                                                valueMappingPerKey: new Map<string, IValueMapping>(
                                                                    [
                                                                        ["filformat", {type: FieldType.STRING, mappingString: data.recordData.mainDocument.fileFormat}],
                                                                        ["variantformat", {type: FieldType.STRING, mappingString: data.recordData.mainDocument.variant}],
                                                                        ["fil", {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.mainDocument.file}],
                                                                    ],
                                                                ),
                                                                elementMappingPerKey: new Map<string, IElementMapping>(),
                                                                elementCollectionMappingPerKey: new Map<string, IElementCollectionMapping>()
                                                            }
                                                        ],
                                                        elementsFromCollectionMappings: []
                                                    }]
                                                ]
                                            )
                                        }
                                    ],
                                    elementsFromCollectionMappings: [
                                        {
                                            instanceCollectionReferencesOrdered: ["$if(vedlegg)"],
                                            elementMapping: {
                                                valueMappingPerKey: new Map<string, IValueMapping>(
                                                    [
                                                        ["tittel", {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.attachmentDocuments.title}],
                                                        ["dokumentstatus", {type: FieldType.STRING, mappingString: data.recordData.attachmentDocuments.documentStatus}],
                                                        ["dokumentType", {type: FieldType.STRING, mappingString: data.recordData.attachmentDocuments.documentType}],
                                                        ["tilknyttetRegistreringSom", {type: FieldType.STRING, mappingString: data.recordData.attachmentDocuments.role}],
                                                    ],
                                                ),
                                                elementMappingPerKey: new Map<string, IElementMapping>(),
                                                elementCollectionMappingPerKey: new Map<string, IElementCollectionMapping>(
                                                    [
                                                        ["dokumentobjekt", {
                                                            elementMappings: [
                                                                {
                                                                    valueMappingPerKey: new Map<string, IValueMapping>(
                                                                        [
                                                                            ["filformat", {type: FieldType.STRING, mappingString: data.recordData.attachmentDocuments.fileFormat}],
                                                                            ["variantformat", {type: FieldType.STRING, mappingString: data.recordData.attachmentDocuments.variant}],
                                                                            ["fil", {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.attachmentDocuments.file}],
                                                                        ],
                                                                    ),
                                                                    elementMappingPerKey: new Map<string, IElementMapping>(),
                                                                    elementCollectionMappingPerKey: new Map<string, IElementCollectionMapping>()
                                                                }
                                                            ],
                                                            elementsFromCollectionMappings: []
                                                        }]
                                                    ]
                                                )                                                                  }
                                        }
                                    ]
                                }],
                                ["korrespondansepart", {
                                    elementMappings: [
                                        {
                                            valueMappingPerKey: new Map<string, IValueMapping>(
                                                [
                                                    ["fødselsnummer", {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.correspondent.nationalIdentityNumber}],
                                                    ["organisasjonsnummer", {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.correspondent.organisationNumber}],
                                                    ["kontaktperson", {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.correspondent.contactPerson}],
                                                    ["korrespondansepartNavn", {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.correspondent.name}],
                                                    ["korrespondanseparttype", {type: FieldType.STRING, mappingString: data.recordData.correspondent.type}]
                                                ],
                                            ),
                                            elementMappingPerKey: new Map<string, IElementMapping>(
                                                [
                                                    ["adresse", {
                                                        valueMappingPerKey: new Map<string, IValueMapping>(
                                                            [
                                                                ["adresselinje", {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.correspondent.address}],
                                                                ["postnummer", {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.correspondent.postalCode}],
                                                                ["poststed", {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.correspondent.city}],
                                                            ],
                                                        ),
                                                        elementCollectionMappingPerKey: new Map<string, IElementCollectionMapping>(),
                                                        elementMappingPerKey: new Map<string, IElementMapping>()
                                                    }],
                                                    ["kontaktinformasjon", {
                                                        valueMappingPerKey: new Map<string, IValueMapping>(
                                                            [
                                                                ["epostadresse", {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.correspondent.email}],
                                                                ["mobiltelefonnummer", {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.correspondent.mobilePhoneNumber}],
                                                                ["poststed", {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.correspondent.phoneNumber}],
                                                            ],
                                                        ),
                                                        elementCollectionMappingPerKey: new Map<string, IElementCollectionMapping>(),
                                                        elementMappingPerKey: new Map<string, IElementMapping>()
                                                    }],
                                                    ["skjerming", {
                                                        valueMappingPerKey: new Map<string, IValueMapping>(
                                                            data.recordData.correspondent.shielding ? [
                                                                ["tilgangsrestriksjon", {type: FieldType.STRING, mappingString: data.recordData.correspondent.shielding.accessCode}],
                                                                ["skjermingshjemmel", {type: FieldType.STRING, mappingString: data.recordData.correspondent.shielding.paragraph}],
                                                            ] : [],
                                                        ),
                                                        elementCollectionMappingPerKey: new Map<string, IElementCollectionMapping>(),
                                                        elementMappingPerKey: new Map<string, IElementMapping>()
                                                    }]
                                                ]),
                                            elementCollectionMappingPerKey: new Map<string, IElementCollectionMapping>()
                                        }
                                    ],
                                    elementsFromCollectionMappings: []
                                }]
                            ]
                        )
                    }]
                ]
            )
        }
    }
    return configuration;
}

export function toTempConfigurationPatch(data: IFormConfiguration, metadataId: any): ITempConfigurationPatch {
    const configurationPatch: ITempConfigurationPatch =  {
        completed: data.completed,
        integrationMetadataId: metadataId,
        comment: data.comment,
        mapping: {
            valueMappingPerKey: new Map<string, IValueMapping>(),
            elementCollectionMappingPerKey: new Map<string, IElementCollectionMapping>(),
            elementMappingPerKey: new Map<string, IElementMapping>(
                [
                    ["sak", {
                        valueMappingPerKey: new Map<string, IValueMapping>(
                            [
                                ["type", {type: FieldType.STRING, mappingString: data.caseData.caseCreationStrategy}],
                                ["id", {
                                    type: FieldType.STRING,
                                    mappingString: data.caseData.id ? data.caseData.id : null
                                }]
                            ],
                        ),
                        elementMappingPerKey: new Map<string, IElementMapping>(
                            [
                                ["ny", {
                                    valueMappingPerKey: new Map<string, IValueMapping>(
                                        [
                                            ["tittel", {type: FieldType.DYNAMIC_STRING, mappingString: data.caseData.newCase.title}],
                                            ["offentligTittel", {type: FieldType.DYNAMIC_STRING, mappingString: data.caseData.newCase.publicTitle}],
                                            ["saksmappetype", {type: FieldType.STRING, mappingString: data.caseData.newCase.caseType}],
                                            ["administrativenhet", {
                                                type: FieldType.STRING,
                                                mappingString: data.caseData.newCase.administrativeUnit
                                            }],
                                            ["arkivdel", {
                                                type: FieldType.STRING,
                                                mappingString: data.caseData.newCase.archiveUnit
                                            }],
                                            ["journalenhet", {
                                                type: FieldType.STRING,
                                                mappingString: data.caseData.newCase.recordUnit
                                            }],
                                            ["saksstatus", {
                                                type: FieldType.STRING,
                                                mappingString: data.caseData.newCase.status
                                            }],
                                            ["saksansvarlig", {
                                                type: FieldType.STRING,
                                                mappingString: data.caseData.newCase.caseWorker
                                            }],
                                        ],
                                    ),
                                    elementCollectionMappingPerKey: new Map<string, IElementCollectionMapping>(),
                                    elementMappingPerKey: new Map<string, IElementMapping>(
                                        [
                                            ["skjerming", {
                                                valueMappingPerKey: new Map<string, IValueMapping>(
                                                    data.caseData.newCase.shielding ? [
                                                        ["tilgangsrestriksjon", {
                                                            type: FieldType.STRING,
                                                            mappingString: data.caseData.newCase.shielding?.accessCode
                                                        }],
                                                        ["skjermingshjemmel", {
                                                            type: FieldType.STRING,
                                                            mappingString: data.caseData.newCase.shielding?.paragraph
                                                        }],
                                                    ] : [],
                                                ),
                                                elementCollectionMappingPerKey: new Map<string, IElementCollectionMapping>(
                                                    [
                                                        ["klasse", {
                                                            elementMappings: [
                                                                {
                                                                    valueMappingPerKey: new Map<string, IValueMapping>(
                                                                        [
                                                                            ["klassifikasjonssystem", {type: FieldType.STRING, mappingString: data.caseData?.newCase?.classes[0].classification}],
                                                                            ["klasseId", {type: FieldType.STRING, mappingString: data.caseData?.newCase?.classes[0].class}],
                                                                            ["tittel", {type: FieldType.STRING, mappingString: data.caseData?.newCase?.classes[0].title}],
                                                                            ["rekkefølge", {type: FieldType.STRING, mappingString: "0"}],
                                                                        ]
                                                                    ),
                                                                    elementMappingPerKey: new Map<string, IElementMapping>(),
                                                                    elementCollectionMappingPerKey: new Map<string, IElementCollectionMapping>()
                                                                },
                                                                {
                                                                    valueMappingPerKey: new Map<string, IValueMapping>(
                                                                        [
                                                                            ["klassifikasjonssystem", {type: FieldType.STRING, mappingString: data.caseData?.newCase?.classes[1].classification}],
                                                                            ["klasseId", {type: FieldType.STRING, mappingString: data.caseData?.newCase?.classes[1].class}],
                                                                            ["tittel", {type: FieldType.STRING, mappingString: data.caseData?.newCase?.classes[1].title}],
                                                                            ["rekkefølge", {type: FieldType.STRING, mappingString: "1"}],
                                                                        ]
                                                                    ),                                                                     elementMappingPerKey: new Map<string, IElementMapping>(),
                                                                    elementCollectionMappingPerKey: new Map<string, IElementCollectionMapping>()
                                                                },
                                                                {
                                                                    valueMappingPerKey: new Map<string, IValueMapping>(
                                                                        [
                                                                            ["klassifikasjonssystem", {type: FieldType.STRING, mappingString: data.caseData?.newCase?.classes[2].classification}],
                                                                            ["klasseId", {type: FieldType.STRING, mappingString: data.caseData?.newCase?.classes[2].class}],
                                                                            ["tittel", {type: FieldType.STRING, mappingString: data.caseData?.newCase?.classes[2].title}],
                                                                            ["rekkefølge", {type: FieldType.STRING, mappingString: "2"}],
                                                                        ]
                                                                    ),
                                                                    elementMappingPerKey: new Map<string, IElementMapping>(),
                                                                    elementCollectionMappingPerKey: new Map<string, IElementCollectionMapping>()
                                                                }
                                                            ],
                                                            elementsFromCollectionMappings: []
                                                        }]
                                                    ]
                                                ),
                                                elementMappingPerKey: new Map<string, IElementMapping>()
                                            }]
                                        ]),
                                }]
                            ]),
                        elementCollectionMappingPerKey: new Map<string, IElementCollectionMapping>()
                    }],
                    ["journalpost", {
                        valueMappingPerKey: new Map<string, IValueMapping>(
                            [
                                ["tittel", {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.title}],
                                ["offentligTittel", {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.publicTitle}],
                                ["administrativenhet", {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.administrativeUnit}],
                                ["journalstatus", {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.recordStatus}],
                                ["journalposttype", {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.recordType}],
                                ["saksbehandler", {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.caseWorker}]
                            ],
                        ),
                        elementMappingPerKey: new Map<string, IElementMapping>(
                            [
                                ["skjerming", {
                                    valueMappingPerKey: new Map<string, IValueMapping>(
                                        data.recordData.shielding ? [
                                            ["tilgangsrestriksjon", {
                                                type: FieldType.STRING,
                                                mappingString: data.recordData.shielding?.accessCode
                                            }],
                                            ["skjermingshjemmel", {
                                                type: FieldType.STRING,
                                                mappingString: data.recordData.shielding?.paragraph
                                            }],
                                        ] : [],
                                    ),
                                    elementCollectionMappingPerKey: new Map<string, IElementCollectionMapping>(),
                                    elementMappingPerKey: new Map<string, IElementMapping>()
                                }]
                            ]),
                        elementCollectionMappingPerKey: new Map<string, IElementCollectionMapping>(
                            [
                                ["dokumentbeskrivelse", {
                                    elementMappings: [
                                        {
                                            valueMappingPerKey: new Map<string, IValueMapping>(
                                                [
                                                    ["tittel", {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.title}],
                                                    ["dokumentstatus", {type: FieldType.STRING, mappingString: data.recordData.mainDocument.documentStatus}],
                                                    ["dokumentType", {type: FieldType.STRING, mappingString: data.recordData.mainDocument.documentType}],
                                                    ["tilknyttetRegistreringSom", {type: FieldType.STRING, mappingString: data.recordData.mainDocument.role}],
                                                ],
                                            ),
                                            elementMappingPerKey: new Map<string, IElementMapping>(),
                                            elementCollectionMappingPerKey: new Map<string, IElementCollectionMapping>(
                                                [
                                                    ["dokumentobjekt", {
                                                        elementMappings: [
                                                            {
                                                                valueMappingPerKey: new Map<string, IValueMapping>(
                                                                    [
                                                                        ["filformat", {type: FieldType.STRING, mappingString: data.recordData.mainDocument.fileFormat}],
                                                                        ["variantformat", {type: FieldType.STRING, mappingString: data.recordData.mainDocument.variant}],
                                                                        ["fil", {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.mainDocument.file}],
                                                                    ],
                                                                ),
                                                                elementMappingPerKey: new Map<string, IElementMapping>(),
                                                                elementCollectionMappingPerKey: new Map<string, IElementCollectionMapping>()
                                                            }
                                                        ],
                                                        elementsFromCollectionMappings: []
                                                    }]
                                                ]
                                            )
                                        }
                                    ],
                                    elementsFromCollectionMappings: [
                                        {
                                            instanceCollectionReferencesOrdered: ["$if(vedlegg)"],
                                            elementMapping: {
                                                valueMappingPerKey: new Map<string, IValueMapping>(
                                                    [
                                                        ["tittel", {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.attachmentDocuments.title}],
                                                        ["dokumentstatus", {type: FieldType.STRING, mappingString: data.recordData.attachmentDocuments.documentStatus}],
                                                        ["dokumentType", {type: FieldType.STRING, mappingString: data.recordData.attachmentDocuments.documentType}],
                                                        ["tilknyttetRegistreringSom", {type: FieldType.STRING, mappingString: data.recordData.attachmentDocuments.role}],
                                                    ],
                                                ),
                                                elementMappingPerKey: new Map<string, IElementMapping>(),
                                                elementCollectionMappingPerKey: new Map<string, IElementCollectionMapping>(
                                                    [
                                                        ["dokumentobjekt", {
                                                            elementMappings: [
                                                                {
                                                                    valueMappingPerKey: new Map<string, IValueMapping>(
                                                                        [
                                                                            ["filformat", {type: FieldType.STRING, mappingString: data.recordData.attachmentDocuments.fileFormat}],
                                                                            ["variantformat", {type: FieldType.STRING, mappingString: data.recordData.attachmentDocuments.variant}],
                                                                            ["fil", {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.attachmentDocuments.file}],
                                                                        ],
                                                                    ),
                                                                    elementMappingPerKey: new Map<string, IElementMapping>(),
                                                                    elementCollectionMappingPerKey: new Map<string, IElementCollectionMapping>()
                                                                }
                                                            ],
                                                            elementsFromCollectionMappings: []
                                                        }]
                                                    ]
                                                )                                                                  }
                                        }
                                    ]
                                }],
                                ["korrespondansepart", {
                                    elementMappings: [
                                        {
                                            valueMappingPerKey: new Map<string, IValueMapping>(
                                                [
                                                    ["fødselsnummer", {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.correspondent.nationalIdentityNumber}],
                                                    ["organisasjonsnummer", {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.correspondent.organisationNumber}],
                                                    ["kontaktperson", {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.correspondent.contactPerson}],
                                                    ["korrespondansepartNavn", {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.correspondent.name}],
                                                    ["korrespondanseparttype", {type: FieldType.STRING, mappingString: data.recordData.correspondent.type}]
                                                ],
                                            ),
                                            elementMappingPerKey: new Map<string, IElementMapping>(
                                                [
                                                    ["adresse", {
                                                        valueMappingPerKey: new Map<string, IValueMapping>(
                                                            [
                                                                ["adresselinje", {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.correspondent.address}],
                                                                ["postnummer", {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.correspondent.postalCode}],
                                                                ["poststed", {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.correspondent.city}],
                                                            ],
                                                        ),
                                                        elementCollectionMappingPerKey: new Map<string, IElementCollectionMapping>(),
                                                        elementMappingPerKey: new Map<string, IElementMapping>()
                                                    }],
                                                    ["kontaktinformasjon", {
                                                        valueMappingPerKey: new Map<string, IValueMapping>(
                                                            [
                                                                ["epostadresse", {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.correspondent.email}],
                                                                ["mobiltelefonnummer", {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.correspondent.mobilePhoneNumber}],
                                                                ["poststed", {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.correspondent.phoneNumber}],
                                                            ],
                                                        ),
                                                        elementCollectionMappingPerKey: new Map<string, IElementCollectionMapping>(),
                                                        elementMappingPerKey: new Map<string, IElementMapping>()
                                                    }],
                                                    ["skjerming", {
                                                        valueMappingPerKey: new Map<string, IValueMapping>(
                                                            data.recordData.correspondent.shielding ? [
                                                                ["tilgangsrestriksjon", {type: FieldType.STRING, mappingString: data.recordData.correspondent.shielding.accessCode}],
                                                                ["skjermingshjemmel", {type: FieldType.STRING, mappingString: data.recordData.correspondent.shielding.paragraph}],
                                                            ] : [],
                                                        ),
                                                        elementCollectionMappingPerKey: new Map<string, IElementCollectionMapping>(),
                                                        elementMappingPerKey: new Map<string, IElementMapping>()
                                                    }]
                                                ]),
                                            elementCollectionMappingPerKey: new Map<string, IElementCollectionMapping>()
                                        }
                                    ],
                                    elementsFromCollectionMappings: []
                                }]
                            ]
                        )
                    }]
                ]
            )
        }
    }
    return configurationPatch
}
*/
