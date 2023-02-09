import {IFormConfiguration} from "../../../configuration/types/Form/FormData"
import {
    IConfiguration
} from "../../../configuration/types/Configuration";
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
import {
    filterElementCollectionMappingEntries,
    filterElementMappingEntries,
    shouldIncludeElementMapping, shouldIncludeElementsFromCollectionMapping
} from "../helpers/filters";

export function toAVConfiguration(data: IFormConfiguration, integrationId: string, configurationId: any, metadataId: number): IConfiguration {
    return {
        integrationId: integrationId,
        id: configurationId,
        completed: data.completed,
        integrationMetadataId: metadataId,
        comment: data.comment,
        mapping:
            {
                valueMappingPerKey: {},
                elementMappingPerKey: filterElementMappingEntries({
                    "sak": {
                        valueMappingPerKey: caseDataToRecord(data.caseData),
                        elementMappingPerKey: filterElementMappingEntries({
                            "ny": {
                                valueMappingPerKey: newCaseDataToRecord(data.caseData.newCase),
                                elementMappingPerKey: filterElementMappingEntries({
                                    "skjerming": {
                                        valueMappingPerKey: shieldingDataToRecord(data.caseData.newCase.shielding),
                                        elementMappingPerKey: {},
                                        elementCollectionMappingPerKey: {}
                                    }
                                }),
                                elementCollectionMappingPerKey: filterElementCollectionMappingEntries({
                                    "klasse": {
                                        elementsFromCollectionMappings: [],
                                        elementMappings: [
                                            {
                                                valueMappingPerKey: classDataToRecord(data.caseData.newCase.classes[0], "0"),
                                                elementMappingPerKey: {},
                                                elementCollectionMappingPerKey: {}
                                            }, {
                                                valueMappingPerKey: classDataToRecord(data.caseData.newCase.classes[1], "1"),
                                                elementMappingPerKey: {},
                                                elementCollectionMappingPerKey: {}
                                            }, {
                                                valueMappingPerKey: classDataToRecord(data.caseData.newCase.classes[2], "2"),
                                                elementMappingPerKey: {},
                                                elementCollectionMappingPerKey: {}
                                            }
                                        ].filter(shouldIncludeElementMapping)
                                    }
                                })
                            }
                        }),
                        elementCollectionMappingPerKey: {}
                    },
                    "journalpost": {
                        valueMappingPerKey: recordDataToRecord(data.recordData),
                        elementMappingPerKey: filterElementMappingEntries({
                            "skjerming": {
                                valueMappingPerKey: shieldingDataToRecord(data.recordData.shielding),
                                elementMappingPerKey: {},
                                elementCollectionMappingPerKey: {}
                            }
                        }),
                        elementCollectionMappingPerKey: filterElementCollectionMappingEntries({
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
                                                elementsFromCollectionMappings: []
                                            }
                                        }
                                    }
                                ].filter(shouldIncludeElementMapping),
                                elementsFromCollectionMappings: [
                                    {
                                        instanceCollectionReferencesOrdered: ["$if(vedlegg)"],
                                        elementMapping: {
                                            valueMappingPerKey: documentDescriptionDataToRecord(data.recordData.attachmentDocuments),
                                            elementMappingPerKey: {},
                                            elementCollectionMappingPerKey: filterElementCollectionMappingEntries({
                                                "dokumentobjekt": {
                                                    elementMappings: [
                                                        {
                                                            valueMappingPerKey: documentObjectDataToRecord(data.recordData.attachmentDocuments),
                                                            elementMappingPerKey: {},
                                                            elementCollectionMappingPerKey: {}
                                                        }
                                                    ].filter(shouldIncludeElementMapping),
                                                    elementsFromCollectionMappings: []
                                                }
                                            })
                                        }
                                    }
                                ].filter(shouldIncludeElementsFromCollectionMapping)

                            },
                            "korrespondansepart": {
                                elementMappings: [{
                                    valueMappingPerKey: correspondentDataToRecord(data.recordData.correspondent),
                                    elementMappingPerKey: filterElementMappingEntries({
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
                                    }),
                                    elementCollectionMappingPerKey: {}
                                }].filter(shouldIncludeElementMapping),
                                elementsFromCollectionMappings: []
                            }
                        })
                    }
                }),
                elementCollectionMappingPerKey: {}
            }

    }
}

export function toAVConfigurationPatch(data: IFormConfiguration, metadataId: any): IConfiguration {
    return {
        completed: data.completed,
        integrationMetadataId: metadataId,
        comment: data.comment,
        mapping:  {
            valueMappingPerKey: {},
            elementMappingPerKey: filterElementMappingEntries({
                "sak": {
                    valueMappingPerKey: caseDataToRecord(data.caseData),
                    elementMappingPerKey: filterElementMappingEntries({
                        "ny": {
                            valueMappingPerKey: newCaseDataToRecord(data.caseData.newCase),
                            elementMappingPerKey: filterElementMappingEntries({
                                "skjerming": {
                                    valueMappingPerKey: shieldingDataToRecord(data.caseData.newCase.shielding),
                                    elementMappingPerKey: {},
                                    elementCollectionMappingPerKey: {}
                                }
                            }),
                            elementCollectionMappingPerKey: filterElementCollectionMappingEntries({
                                "klasse": {
                                    elementsFromCollectionMappings: [],
                                    elementMappings: [
                                        {
                                            valueMappingPerKey: classDataToRecord(data.caseData.newCase.classes[0], "0"),
                                            elementMappingPerKey: {},
                                            elementCollectionMappingPerKey: {}
                                        }, {
                                            valueMappingPerKey: classDataToRecord(data.caseData.newCase.classes[1], "1"),
                                            elementMappingPerKey: {},
                                            elementCollectionMappingPerKey: {}
                                        }, {
                                            valueMappingPerKey: classDataToRecord(data.caseData.newCase.classes[2], "2"),
                                            elementMappingPerKey: {},
                                            elementCollectionMappingPerKey: {}
                                        }
                                    ].filter(shouldIncludeElementMapping)
                                }
                            })
                        }
                    }),
                    elementCollectionMappingPerKey: {}
                },
                "journalpost": {
                    valueMappingPerKey: recordDataToRecord(data.recordData),
                    elementMappingPerKey: filterElementMappingEntries({
                        "skjerming": {
                            valueMappingPerKey: shieldingDataToRecord(data.recordData.shielding),
                            elementMappingPerKey: {},
                            elementCollectionMappingPerKey: {}
                        }
                    }),
                    elementCollectionMappingPerKey: filterElementCollectionMappingEntries({
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
                                            elementsFromCollectionMappings: []
                                        }
                                    }
                                }
                            ].filter(shouldIncludeElementMapping),
                            elementsFromCollectionMappings: [
                                {
                                    instanceCollectionReferencesOrdered: ["$if(vedlegg)"],
                                    elementMapping: {
                                        valueMappingPerKey: documentDescriptionDataToRecord(data.recordData.attachmentDocuments),
                                        elementMappingPerKey: {},
                                        elementCollectionMappingPerKey: filterElementCollectionMappingEntries({
                                            "dokumentobjekt": {
                                                elementMappings: [
                                                    {
                                                        valueMappingPerKey: documentObjectDataToRecord(data.recordData.attachmentDocuments),
                                                        elementMappingPerKey: {},
                                                        elementCollectionMappingPerKey: {}
                                                    }
                                                ].filter(shouldIncludeElementMapping),
                                                elementsFromCollectionMappings: []
                                            }
                                        })
                                    }
                                }
                            ].filter(shouldIncludeElementsFromCollectionMapping)

                        },
                        "korrespondansepart": {
                            elementMappings: [{
                                valueMappingPerKey: correspondentDataToRecord(data.recordData.correspondent),
                                elementMappingPerKey: filterElementMappingEntries({
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
                                }),
                                elementCollectionMappingPerKey: {}
                            }].filter(shouldIncludeElementMapping),
                            elementsFromCollectionMappings: []
                        }
                    })
                }
            }),
            elementCollectionMappingPerKey: {}
        }
    }
}