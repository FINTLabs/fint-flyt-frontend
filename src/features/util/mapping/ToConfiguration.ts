import {FieldType, IAVConfiguration, IAVConfigurationPatch} from "../../configuration/types/AVConfiguration"
import {IFormConfiguration} from "../../configuration/types/Form/FormData";
import {CreationStrategy} from "../../configuration/types/CreationStrategy";

export function toConfiguration(data: IFormConfiguration, integrationId: string, configurationId: any, metadataId: number): IAVConfiguration {
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
                    valueMappingPerKey: {
                        "type": {type: FieldType.STRING, mappingString: data.caseData.caseCreationStrategy === CreationStrategy.NEW ? "NEW" : "BY_ID"},
                        "id": {type: FieldType.STRING, mappingString: data.caseData.id ? data.caseData.id : null},
                        "tittel": {type: FieldType.DYNAMIC_STRING, mappingString: data.caseData.title},
                        "offentligTittel": {type: FieldType.DYNAMIC_STRING, mappingString: data.caseData.publicTitle},
                        "saksmappetype": {type: FieldType.STRING, mappingString: data.caseData.caseType},
                        "administrativenhet": {type: FieldType.STRING, mappingString: data.caseData.administrativeUnit},
                        "arkivdel": {type: FieldType.STRING, mappingString: data.caseData.archiveUnit},
                        "journalenhet": {type: FieldType.STRING, mappingString: data.caseData.recordUnit},
                        "status": {type: FieldType.STRING, mappingString: data.caseData.status},
                        "saksansvarlig": {type: FieldType.STRING, mappingString: data.caseData.caseWorker}
                    },
                    elementMappingPerKey: {
                        "skjerming": data.caseData.shielding ? {
                            valueMappingPerKey: {
                                "tilgangsrestriksjon": {type: FieldType.STRING, mappingString: data.caseData.shielding?.accessCode},
                                "skjermingshjemmel": {type: FieldType.STRING, mappingString: data.caseData.shielding?.paragraph}
                            },
                            elementMappingPerKey: {},
                            elementCollectionMappingPerKey: {}
                        } : {
                            valueMappingPerKey: {},
                            elementMappingPerKey: {},
                            elementCollectionMappingPerKey: {}
                        }
                    },
                    elementCollectionMappingPerKey: {
                        "klasse": {
                            elementsFromCollectionMappings: [],
                            elementMappings: [
                                {
                                    valueMappingPerKey: {
                                        "klassifikasjonssystem": {
                                            type: FieldType.STRING,
                                            mappingString: data.caseData.classes[0].classification
                                        },
                                        "klasseId": {
                                            type: FieldType.DYNAMIC_STRING,
                                            mappingString: data.caseData.classes[0].class
                                        },
                                        "tittel": {
                                            type: FieldType.DYNAMIC_STRING,
                                            mappingString: data.caseData.classes[0].title
                                        },
                                        "rekkefølge": {
                                            type: FieldType.DYNAMIC_STRING,
                                            mappingString: "0"
                                        }
                                    },
                                    elementMappingPerKey: {},
                                    elementCollectionMappingPerKey: {}
                                },{
                                    valueMappingPerKey: {
                                        "klassifikasjonssystem": {
                                            type: FieldType.STRING,
                                            mappingString: data.caseData.classes[1].classification
                                        },
                                        "klasseId": {
                                            type: FieldType.DYNAMIC_STRING,
                                            mappingString: data.caseData.classes[1].class
                                        },
                                        "tittel": {
                                            type: FieldType.DYNAMIC_STRING,
                                            mappingString: data.caseData.classes[1].title
                                        },
                                        "rekkefølge": {
                                            type: FieldType.DYNAMIC_STRING,
                                            mappingString: "1"
                                        }
                                    },
                                    elementMappingPerKey: {},
                                    elementCollectionMappingPerKey: {}
                                },{
                                    valueMappingPerKey: {
                                        "klassifikasjonssystem": {
                                            type: FieldType.STRING,
                                            mappingString: data.caseData.classes[2].classification
                                        },
                                        "klasseId": {
                                            type: FieldType.DYNAMIC_STRING,
                                            mappingString: data.caseData.classes[2].class
                                        },
                                        "tittel": {
                                            type: FieldType.DYNAMIC_STRING,
                                            mappingString: data.caseData.classes[2].title
                                        },
                                        "rekkefølge": {
                                            type: FieldType.DYNAMIC_STRING,
                                            mappingString: "2"
                                        }
                                    },
                                    elementMappingPerKey: {},
                                    elementCollectionMappingPerKey: {}
                                }
                            ]
                        }
                    }
                },
                "journalpost": {
                    valueMappingPerKey: {
                        "tittel": {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.title},
                        "offentligTittel": {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.publicTitle},
                        "administrativenhet": {type: FieldType.STRING, mappingString: data.recordData.administrativeUnit},
                        "journalstatus": {type: FieldType.STRING, mappingString: data.recordData.recordStatus},
                        "journalposttype": {type: FieldType.STRING, mappingString: data.recordData.recordType},
                        "saksbehandler": {type: FieldType.STRING, mappingString: data.recordData.caseWorker},
                   },
                    elementMappingPerKey: {
                        "skjerming": data.recordData.shielding ? {
                            valueMappingPerKey: {
                                "tilgangsrestriksjon": {type: FieldType.STRING, mappingString: data.recordData.shielding.accessCode},
                                "skjermingshjemmel": {type: FieldType.STRING, mappingString: data.recordData.shielding.paragraph}
                            },
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
                                                        "filformat": {type: FieldType.STRING, mappingString: data.recordData.mainDocument.fileFormat},
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
                                                            "filformat": {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.attachmentDocuments.fileFormat},
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
                                    "skjerming": data.recordData.correspondent.shielding ? {
                                        valueMappingPerKey: {
                                            "tilgangsrestriksjon": {type: FieldType.STRING, mappingString: data.recordData.correspondent.shielding.accessCode},
                                            "skjermingshjemmel": {type: FieldType.STRING, mappingString: data.recordData.correspondent.shielding.paragraph}
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

export function toConfigurationPatch(data: IFormConfiguration, metadataId: any): IAVConfigurationPatch {
    return {
        completed: data.completed,
        integrationMetadataId: metadataId,
        comment: data.comment,
        mapping: {
            valueMappingPerKey: {},
            elementMappingPerKey: {
                "sak": {
                    valueMappingPerKey: {
                        "id": {type: FieldType.STRING, mappingString: data.caseData.id ? data.caseData.id : null},
                        "tittel": {type: FieldType.DYNAMIC_STRING, mappingString: data.caseData.title},
                        "offentligTittel": {type: FieldType.DYNAMIC_STRING, mappingString: data.caseData.publicTitle},
                        "saksmappetype": {type: FieldType.STRING, mappingString: data.caseData.caseType},
                        "administrativenhet": {type: FieldType.STRING, mappingString: data.caseData.administrativeUnit},
                        "arkivdel": {type: FieldType.STRING, mappingString: data.caseData.archiveUnit},
                        "journalenhet": {type: FieldType.STRING, mappingString: data.caseData.recordUnit},
                        "status": {type: FieldType.STRING, mappingString: data.caseData.status},
                        "saksansvarlig": {type: FieldType.STRING, mappingString: data.caseData.caseWorker}
                    },
                    elementMappingPerKey: {
                        "skjerming": data.caseData.shielding ? {
                            valueMappingPerKey: {
                                "tilgangsrestriksjon": {type: FieldType.STRING, mappingString: data.caseData.shielding.accessCode},
                                "skjermingshjemmel": {type: FieldType.STRING, mappingString: data.caseData.shielding.paragraph}
                            },
                            elementMappingPerKey: {},
                            elementCollectionMappingPerKey: {}
                        } : {
                            valueMappingPerKey: {},
                            elementMappingPerKey: {},
                            elementCollectionMappingPerKey: {}
                        },
                    },
                    elementCollectionMappingPerKey: {
                        "klasse": {
                            elementsFromCollectionMappings: [],
                            elementMappings: [
                                {
                                    valueMappingPerKey: {
                                        "klassifikasjonssystem": {
                                            type: FieldType.STRING,
                                            mappingString: data.caseData.classes[0].classification
                                        },
                                        "klasseId": {
                                            type: FieldType.DYNAMIC_STRING,
                                            mappingString: data.caseData.classes[0].class
                                        },
                                        "tittel": {
                                            type: FieldType.DYNAMIC_STRING,
                                            mappingString: data.caseData.classes[0].title
                                        },
                                        "rekkefølge": {
                                            type: FieldType.DYNAMIC_STRING,
                                            mappingString: "0"
                                        }
                                    },
                                    elementMappingPerKey: {},
                                    elementCollectionMappingPerKey: {}
                                },{
                                    valueMappingPerKey: {
                                        "klassifikasjonssystem": {
                                            type: FieldType.STRING,
                                            mappingString: data.caseData.classes[1].classification
                                        },
                                        "klasseId": {
                                            type: FieldType.DYNAMIC_STRING,
                                            mappingString: data.caseData.classes[1].class
                                        },
                                        "tittel": {
                                            type: FieldType.DYNAMIC_STRING,
                                            mappingString: data.caseData.classes[1].title
                                        },
                                        "rekkefølge": {
                                            type: FieldType.DYNAMIC_STRING,
                                            mappingString: "1"
                                        }
                                    },
                                    elementMappingPerKey: {},
                                    elementCollectionMappingPerKey: {}
                                },{
                                    valueMappingPerKey: {
                                        "klassifikasjonssystem": {
                                            type: FieldType.STRING,
                                            mappingString: data.caseData.classes[2].classification
                                        },
                                        "klasseId": {
                                            type: FieldType.DYNAMIC_STRING,
                                            mappingString: data.caseData.classes[2].class
                                        },
                                        "tittel": {
                                            type: FieldType.DYNAMIC_STRING,
                                            mappingString: data.caseData.classes[2].title
                                        },
                                        "rekkefølge": {
                                            type: FieldType.DYNAMIC_STRING,
                                            mappingString: "2"
                                        }
                                    },
                                    elementMappingPerKey: {},
                                    elementCollectionMappingPerKey: {}
                                }
                            ]
                        }
                    }
                },
                "journalpost": {
                    valueMappingPerKey: {
                        "tittel": {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.title},
                        "offentligTittel": {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.publicTitle},
                        "administrativenhet": {type: FieldType.STRING, mappingString: data.recordData.administrativeUnit},
                        "journalstatus": {type: FieldType.STRING, mappingString: data.recordData.recordStatus},
                        "journalposttype": {type: FieldType.STRING, mappingString: data.recordData.recordType},
                        "saksbehandler": {type: FieldType.STRING, mappingString: data.recordData.caseWorker}
                    },
                    elementMappingPerKey: {
                        "skjerming": data.recordData.shielding ? {
                            valueMappingPerKey: {
                                "tilgangsrestriksjon": {type: FieldType.STRING, mappingString: data.recordData.shielding.accessCode},
                                "skjermingshjemmel": {type: FieldType.STRING, mappingString: data.recordData.shielding.paragraph}
                            },
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
                                                        "filformat": {type: FieldType.STRING, mappingString: data.recordData.mainDocument.fileFormat},
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
                                                            "filformat": {type: FieldType.DYNAMIC_STRING, mappingString: data.recordData.attachmentDocuments.fileFormat},
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
                                    "skjerming": data.recordData.correspondent.shielding ? {
                                        valueMappingPerKey: {
                                            "tilgangsrestriksjon": {type: FieldType.STRING, mappingString: data.recordData.correspondent.shielding.accessCode},
                                            "skjermingshjemmel": {type: FieldType.STRING, mappingString: data.recordData.correspondent.shielding.paragraph}
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