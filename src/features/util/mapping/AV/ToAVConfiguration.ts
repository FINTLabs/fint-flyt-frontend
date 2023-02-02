import { IFormConfiguration } from "../../../configuration/types/Form/FormData"
import {CreationStrategy} from "../../../configuration/types/CreationStrategy";
import {FieldType, IAVConfiguration} from "../../../configuration/types/AVConfiguration";

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
                    valueMappingPerKey: data.caseData.caseCreationStrategy === CreationStrategy.BY_SEARCH_OR_NEW ? {
                        "type": {type: FieldType.STRING, mappingString: "BY_ID"},
                        "id": {type: FieldType.DYNAMIC_STRING, mappingString: data.caseData.title},
                    } : {
                        "type": {type: FieldType.STRING, mappingString: data.caseData.caseCreationStrategy === CreationStrategy.NEW ? "NEW" : "BY_SEARCH_OR_NEW"},
                        "tittel": {type: FieldType.DYNAMIC_STRING, mappingString: data.caseData.title},
                        "offentligTittel": {type: FieldType.DYNAMIC_STRING, mappingString: data.caseData.publicTitle},
                        "saksmappetype": {type: FieldType.STRING, mappingString: data.caseData.caseType},
                        "administrativenhet": {type: FieldType.STRING, mappingString: data.caseData.administrativeUnit},
                        "arkivdel": {type: FieldType.STRING, mappingString: data.caseData.archiveUnit},
                        "journalenhet": {type: FieldType.STRING, mappingString: data.caseData.recordUnit},
                        "status": {type: FieldType.STRING, mappingString: data.caseData.status},
                        "tilgangsrestriksjon": {type: FieldType.STRING, mappingString: data.caseData.accessCode},
                        "skjermingshjemmel": {type: FieldType.STRING, mappingString: data.caseData.paragraph},
                        "saksansvarlig": {type: FieldType.STRING, mappingString: data.caseData.caseWorker},
                        "primarordningsprinsipp": {type: FieldType.STRING, mappingString: data.caseData.primaryClassification},
                        "sekundarordningsprinsipp": {type: FieldType.STRING, mappingString: data.caseData.secondaryClassification},
                        "tertiarordningsprinsipp": {type: FieldType.STRING, mappingString: data.caseData.tertiaryClassification},
                        "primarklasse": {type: FieldType.DYNAMIC_STRING, mappingString: data.caseData.primaryClass},
                        "sekundarklasse": {type: FieldType.DYNAMIC_STRING, mappingString: data.caseData.secondaryClass},
                        "tertiarklasse": {type: FieldType.DYNAMIC_STRING, mappingString: data.caseData.tertiaryClass},
                        "primartittel": {type: FieldType.DYNAMIC_STRING, mappingString: data.caseData.primaryTitle},
                        "sekundartittel": {type: FieldType.DYNAMIC_STRING, mappingString: data.caseData.secondaryTitle},
                        "tertiartittel": {type: FieldType.DYNAMIC_STRING, mappingString: data.caseData.tertiaryTitle}
                    },
                    elementMappingPerKey: {},
                    elementCollectionMappingPerKey: {}
                },
                "journalpost": {
                    valueMappingPerKey: {
                        "tittel": {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.title},
                        "offentligTittel": {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.publicTitle},
                        "administrativenhet": {type: FieldType.STRING, mappingString: data.recordData.administrativeUnit},
                        "journalstatus": {type: FieldType.STRING, mappingString: data.recordData.recordStatus},
                        "journalposttype": {type: FieldType.STRING, mappingString: data.recordData.recordType},
                        "saksbehandler": {type: FieldType.STRING, mappingString: data.recordData.caseWorker},
                        "tilgangsrestriksjon": {type: FieldType.STRING, mappingString: data.recordData.accessCode},
                        "skjermingshjemmel": {type: FieldType.STRING, mappingString: data.recordData.paragraph}
                    },
                    elementMappingPerKey: {},
                    elementCollectionMappingPerKey: {
                        "dokumentbeskrivelse": {
                            elementMappings: [
                                {
                                    valueMappingPerKey: {
                                        "tittel": {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.title},
                                        "dokumentstatus": {type: FieldType.STRING, mappingString: data.recordData.mainDocument.documentStatus},
                                        "dokumentType": {type: FieldType.STRING, mappingString: data.recordData.mainDocument.documentType},
                                        "tilknyttetRegistreringSom": {type: FieldType.STRING, mappingString: data.recordData.mainDocument.role}
                                    },
                                    elementMappingPerKey: {},
                                    elementCollectionMappingPerKey: {
                                        "dokumentobjekt": {
                                            elementMappings: [
                                                {
                                                    valueMappingPerKey: {
                                                        "format": {type: FieldType.STRING, mappingString: data.recordData.mainDocument.format},
                                                        "variantformat": {type: FieldType.STRING, mappingString: data.recordData.mainDocument.variant},
                                                        "fil": {type: FieldType.FILE, mappingString: data.recordData.mainDocument.file}
                                                    },
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
                                        valueMappingPerKey: {
                                            "tittel": {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.attachmentDocuments.title},
                                            "dokumentstatus": {type: FieldType.STRING, mappingString: data.recordData.attachmentDocuments.documentStatus},
                                            "dokumentType": {type: FieldType.STRING, mappingString: data.recordData.attachmentDocuments.documentType},
                                            "tilknyttetRegistreringSom": {type: FieldType.STRING, mappingString: data.recordData.attachmentDocuments.role}
                                        },
                                        elementMappingPerKey: {},
                                        elementCollectionMappingPerKey: {
                                            "dokumentobjekt": {
                                                elementMappings: [
                                                    {
                                                        valueMappingPerKey: {
                                                            "format": {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.attachmentDocuments.format},
                                                            "variantformat": {type: FieldType.STRING, mappingString: data.recordData.attachmentDocuments.variant},
                                                            "fil": {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.attachmentDocuments.file}
                                                        },
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
                                valueMappingPerKey: {
                                    "fødselsnummer": {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.correspondent.nationalIdentityNumber},
                                    "organisasjonsnummer": {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.correspondent.organisationNumber},
                                    "kontaktperson": {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.correspondent.contactPerson},
                                    "korrespondansepartNavn": {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.correspondent.name},
                                    "korrespondanseparttype": {type: FieldType.STRING, mappingString: data.recordData.correspondent.type}
                                },
                                elementMappingPerKey: {
                                    "adresse": {
                                        valueMappingPerKey: {
                                            "adresselinje": {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.correspondent.address},
                                            "postnummer": {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.correspondent.postalCode},
                                            "poststed": {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.correspondent.city}
                                        },
                                        elementMappingPerKey: {},
                                        elementCollectionMappingPerKey: {}
                                    },
                                    "kontaktinformasjon": {
                                        valueMappingPerKey: {
                                            "epostadresse": {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.correspondent.email},
                                            "mobiltelefonnummer": {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.correspondent.mobilePhoneNumber},
                                            "telefonnummer": {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.correspondent.phoneNumber}
                                        },
                                        elementMappingPerKey: {},
                                        elementCollectionMappingPerKey: {}
                                    },
                                    "skjerming": data.recordData.correspondent.protected ? {
                                        valueMappingPerKey: {
                                            "tilgangsrestriksjon": {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.correspondent.accessCode},
                                            "skjermingshjemmel": {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.correspondent.paragraph}
                                        },
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
                    valueMappingPerKey: data.caseData.caseCreationStrategy === CreationStrategy.BY_SEARCH_OR_NEW ? {
                        "type": {type: FieldType.STRING, mappingString: "BY_ID"},
                        "id": {type: FieldType.STRING, mappingString: data.caseData.id ? data.caseData.id : null},
                    } : {
                        "type": {type: FieldType.STRING, mappingString: data.caseData.caseCreationStrategy === CreationStrategy.NEW ? "NEW" : "BY_SEARCH_OR_NEW"},
                        "tittel": {type: FieldType.DYNAMIC_STRING, mappingString: data.caseData.title},
                        "offentligTittel": {type: FieldType.DYNAMIC_STRING, mappingString: data.caseData.publicTitle},
                        "saksmappetype": {type: FieldType.STRING, mappingString: data.caseData.caseType},
                        "administrativenhet": {type: FieldType.STRING, mappingString: data.caseData.administrativeUnit},
                        "arkivdel": {type: FieldType.STRING, mappingString: data.caseData.archiveUnit},
                        "journalenhet": {type: FieldType.STRING, mappingString: data.caseData.recordUnit},
                        "status": {type: FieldType.STRING, mappingString: data.caseData.status},
                        "tilgangsrestriksjon": {type: FieldType.STRING, mappingString: data.caseData.accessCode},
                        "skjermingshjemmel": {type: FieldType.STRING, mappingString: data.caseData.paragraph},
                        "saksansvarlig": {type: FieldType.STRING, mappingString: data.caseData.caseWorker},
                        "primarordningsprinsipp": {type: FieldType.STRING, mappingString: data.caseData.primaryClassification},
                        "sekundarordningsprinsipp": {type: FieldType.STRING, mappingString: data.caseData.secondaryClassification},
                        "tertiarordningsprinsipp": {type: FieldType.STRING, mappingString: data.caseData.tertiaryClassification},
                        "primarklasse": {type: FieldType.DYNAMIC_STRING, mappingString: data.caseData.primaryClass},
                        "sekundarklasse": {type: FieldType.DYNAMIC_STRING, mappingString: data.caseData.secondaryClass},
                        "tertiarklasse": {type: FieldType.DYNAMIC_STRING, mappingString: data.caseData.tertiaryClass},
                        "primartittel": {type: FieldType.DYNAMIC_STRING, mappingString: data.caseData.primaryTitle},
                        "sekundartittel": {type: FieldType.DYNAMIC_STRING, mappingString: data.caseData.secondaryTitle},
                        "tertiartittel": {type: FieldType.DYNAMIC_STRING, mappingString: data.caseData.tertiaryTitle}
                    },
                    elementMappingPerKey: {},
                    elementCollectionMappingPerKey: {}
                },
                "journalpost": {
                    valueMappingPerKey: {
                        "tittel": {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.title},
                        "offentligTittel": {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.publicTitle},
                        "administrativenhet": {type: FieldType.STRING, mappingString: data.recordData.administrativeUnit},
                        "journalstatus": {type: FieldType.STRING, mappingString: data.recordData.recordStatus},
                        "journalposttype": {type: FieldType.STRING, mappingString: data.recordData.recordType},
                        "saksbehandler": {type: FieldType.STRING, mappingString: data.recordData.caseWorker},
                        "tilgangsrestriksjon": {type: FieldType.STRING, mappingString: data.recordData.accessCode},
                        "skjermingshjemmel": {type: FieldType.STRING, mappingString: data.recordData.paragraph}
                    },
                    elementMappingPerKey: {},
                    elementCollectionMappingPerKey: {
                        "dokumentbeskrivelse": {
                            elementMappings: [
                                {
                                    valueMappingPerKey: {
                                        "tittel": {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.mainDocument.title},
                                        "dokumentstatus": {type: FieldType.STRING, mappingString: data.recordData.mainDocument.documentStatus},
                                        "dokumentType": {type: FieldType.STRING, mappingString: data.recordData.mainDocument.documentType},
                                        "tilknyttetRegistreringSom": {type: FieldType.URL, mappingString: data.recordData.mainDocument.role}
                                    },
                                    elementMappingPerKey: {},
                                    elementCollectionMappingPerKey: {
                                        "dokumentobjekt": {
                                            elementMappings: [
                                                {
                                                    valueMappingPerKey: {
                                                        "format": {type: FieldType.STRING, mappingString: data.recordData.mainDocument.format},
                                                        "variantformat": {type: FieldType.STRING, mappingString: data.recordData.mainDocument.variant},
                                                        "fil": {type: FieldType.FILE, mappingString: data.recordData.mainDocument.file}
                                                    },
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
                                        valueMappingPerKey: {
                                            "tittel": {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.attachmentDocuments.title},
                                            "dokumentstatus": {type: FieldType.STRING, mappingString: data.recordData.attachmentDocuments.documentStatus},
                                            "dokumentType": {type: FieldType.STRING, mappingString: data.recordData.attachmentDocuments.documentType},
                                            "tilknyttetRegistreringSom": {type: FieldType.STRING, mappingString: data.recordData.attachmentDocuments.role}
                                        },
                                        elementMappingPerKey: {},
                                        elementCollectionMappingPerKey: {
                                            "dokumentobjekt": {
                                                elementMappings: [
                                                    {
                                                        valueMappingPerKey: {
                                                            "format": {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.attachmentDocuments.format},
                                                            "variantformat": {type: FieldType.STRING, mappingString: data.recordData.attachmentDocuments.variant},
                                                            "fil": {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.attachmentDocuments.file}
                                                        },
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
                                valueMappingPerKey: {
                                    "fødselsnummer": {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.correspondent.nationalIdentityNumber},
                                    "organisasjonsnummer": {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.correspondent.organisationNumber},
                                    "kontaktperson": {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.correspondent.contactPerson},
                                    "korrespondansepartNavn": {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.correspondent.name},
                                    "korrespondanseparttype": {type: FieldType.STRING, mappingString: data.recordData.correspondent.type}
                                },
                                elementMappingPerKey: {
                                    "adresse": {
                                        valueMappingPerKey: {
                                            "adresselinje": {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.correspondent.address},
                                            "postnummer": {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.correspondent.postalCode},
                                            "poststed": {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.correspondent.city}
                                        },
                                        elementMappingPerKey: {},
                                        elementCollectionMappingPerKey: {}
                                    },
                                    "kontaktinformasjon": {
                                        valueMappingPerKey: {
                                            "epostadresse": {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.correspondent.email},
                                            "mobiltelefonnummer": {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.correspondent.mobilePhoneNumber},
                                            "telefonnummer": {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.correspondent.phoneNumber}
                                        },
                                        elementMappingPerKey: {},
                                        elementCollectionMappingPerKey: {}
                                    },
                                    "skjerming": data.recordData.correspondent.protected ? {
                                        valueMappingPerKey: {
                                            "tilgangsrestriksjon": {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.correspondent.accessCode},
                                            "skjermingshjemmel": {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.correspondent.paragraph}
                                        },
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