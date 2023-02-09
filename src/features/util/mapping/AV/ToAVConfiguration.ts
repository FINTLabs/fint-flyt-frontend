import { IFormConfiguration } from "../../../configuration/types/Form/FormData"
import {FieldType, IAVConfiguration} from "../../../configuration/types/AVConfiguration";
import {
    addressDataToRecord,
    caseDataToRecord,
    classDataToRecord,
    contactInfoDataToRecord,
    correspondentDataToRecord,
    documentDescriptionDataToRecord,
    documentObjectDataToRecord,
    newCaseDataToRecord,
    recordDataToRecord,
    shieldingDataToRecord
} from "../helpers/toValueMappingRecord";

export function toAVConfiguration(data: IFormConfiguration, integrationId: string, configurationId: any, metadataId: number): IAVConfiguration {
    return {
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
}

export function toAVConfigurationPatch(data: IFormConfiguration, metadataId: any): IAVConfiguration {
    return {
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
}