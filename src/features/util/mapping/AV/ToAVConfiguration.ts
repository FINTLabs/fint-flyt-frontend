import {IFormConfiguration} from "../../../configuration/types/Form/FormData"
import {
    IAVConfiguration,
    IElementCollectionMapping,
    IElementMapping,
    IElementsFromCollectionMapping
} from "../../../configuration/types/AVConfiguration";
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

export function shouldIncludeElementMapping(data: IElementMapping): boolean {
    return Object.entries(data.valueMappingPerKey).length > 0
        || Object.entries(data.elementMappingPerKey).length > 0
        || Object.entries(data.elementCollectionMappingPerKey).length > 0;
}

export function shouldIncludeElementCollectionMapping(data: IElementCollectionMapping): boolean {
    return data.elementMappings.length > 0 || data.elementsFromCollectionMappings.length > 0;
}

export function shouldIncludeElementsFromCollectionMapping(data: IElementsFromCollectionMapping): boolean {
    return shouldIncludeElementMapping(data.elementMapping);
}

export function filterEntries<T>(data: Record<string, T>, predicate: (t: T) => boolean): Record<string, T> {
    let result: Record<string, T> = {} as Record<string, T>;
    Object.entries(data)
        .filter(([key, value]) => predicate(value))
        .forEach(([key, value]) => result[key] = value);
    return result;
}

export function filterElementMappingEntries(data: Record<string, IElementMapping>): Record<string, IElementMapping> {
    return filterEntries(data, shouldIncludeElementMapping);
}

export function filterElementCollectionMappingEntries(data: Record<string, IElementCollectionMapping>): Record<string, IElementCollectionMapping> {
    return filterEntries(data, shouldIncludeElementCollectionMapping);
}

export function toAVConfiguration(data: IFormConfiguration, integrationId: string, configurationId: any, metadataId: number): IAVConfiguration {
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
                                        }, {
                                            valueMappingPerKey: classDataToRecord(data.caseData.newCase.classes[1], "1"),
                                            elementMappingPerKey: {},
                                            elementCollectionMappingPerKey: {}
                                        }, {
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
                                            elementsFromCollectionMappings: []
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