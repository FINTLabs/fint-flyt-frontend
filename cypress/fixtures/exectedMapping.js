export const EXPECTED_MAPPING = {
    valueMappingPerKey: {
        type: {
            mappingString: 'NEW',
            type: 'STRING',
        },
    },
    valueCollectionMappingPerKey: {},
    objectMappingPerKey: {
        newCase: {
            valueMappingPerKey: {
                tittel: {
                    mappingString: 'test',
                    type: 'DYNAMIC_STRING',
                },
                saksmappetype: {
                    mappingString: 'https://kodeverk.no/arkiv/noark/systemid/FJELL',
                    type: 'STRING',
                },
                administrativEnhet: {
                    mappingString: 'https://kodeverk.no/arkiv/noark/systemid/INNSYN',
                    type: 'STRING',
                },
                saksansvarlig: {
                    mappingString: 'https://kodeverk.no/arkiv/noark/systemid/ANSV',
                    type: 'STRING',
                },
                arkivdel: {
                    mappingString: 'https://kodeverk.no/arkiv/noark/systemid/OPPL',
                    type: 'STRING',
                },
                saksstatus: {
                    mappingString: 'https://kodeverk.no/arkiv/noark/systemid/OESMU',
                    type: 'STRING',
                },
            },
            valueCollectionMappingPerKey: {},
            objectMappingPerKey: {},
            objectCollectionMappingPerKey: {
                klasse: {
                    elementMappings: [
                        {
                            valueMappingPerKey: {
                                rekkefolge: {
                                    mappingString: '0',
                                    type: 'STRING',
                                },
                                klassifikasjonssystem: {
                                    mappingString: 'https://kodeverk.no/arkiv/noark/systemid/FJELL',
                                    type: 'STRING',
                                },
                                klasseId: {
                                    mappingString: 'https://kodeverk.no/arkiv/noark/systemid/K2',
                                    type: 'STRING',
                                },
                            },
                            valueCollectionMappingPerKey: {},
                            objectMappingPerKey: {},
                            objectCollectionMappingPerKey: {},
                        },
                    ],
                    fromCollectionMappings: [],
                },
                journalpost: {
                    elementMappings: [
                        {
                            valueMappingPerKey: {
                                tittel: {
                                    mappingString: 'journalpost tittel',
                                    type: 'DYNAMIC_STRING',
                                },
                                journalposttype: {
                                    mappingString: 'https://kodeverk.no/arkiv/noark/systemid/MU',
                                    type: 'STRING',
                                },
                                administrativEnhet: {
                                    mappingString: 'https://kodeverk.no/arkiv/noark/systemid/PERS',
                                    type: 'STRING',
                                },
                                saksbehandler: {
                                    mappingString: 'https://kodeverk.no/arkiv/noark/systemid/ANSV',
                                    type: 'STRING',
                                },
                                journalstatus: {
                                    mappingString: 'https://kodeverk.no/arkiv/noark/systemid/SAK',
                                    type: 'STRING',
                                },
                            },
                            valueCollectionMappingPerKey: {},
                            objectMappingPerKey: {},
                            objectCollectionMappingPerKey: {
                                korrespondansepart: {
                                    elementMappings: [],
                                    fromCollectionMappings: [
                                        {
                                            instanceCollectionReferencesOrdered: [
                                                '$if{saksparter}',
                                            ],
                                            elementMapping: {
                                                valueMappingPerKey: {
                                                    korrespondanseparttype: {
                                                        mappingString:
                                                            'https://kodeverk.no/arkiv/noark/systemid/OPPL',
                                                        type: 'STRING',
                                                    },
                                                    organisasjonsnummer: {
                                                        mappingString:
                                                            '$icf{0}{organisasjonsnummer}',
                                                        type: 'DYNAMIC_STRING',
                                                    },
                                                    korrespondansepartNavn: {
                                                        mappingString: '$icf{0}{navn}',
                                                        type: 'DYNAMIC_STRING',
                                                    },
                                                    kontaktperson: {
                                                        mappingString: '$icf{0}{navn}',
                                                        type: 'DYNAMIC_STRING',
                                                    },
                                                },
                                                valueCollectionMappingPerKey: {},
                                                objectMappingPerKey: {},
                                                objectCollectionMappingPerKey: {},
                                            },
                                        },
                                    ],
                                },
                                dokumentbeskrivelse: {
                                    elementMappings: [
                                        {
                                            valueMappingPerKey: {
                                                tittel: {
                                                    mappingString: 'tittel',
                                                    type: 'DYNAMIC_STRING',
                                                },
                                                dokumentstatus: {
                                                    mappingString: '$vc{1}$if{bnr}',
                                                    type: 'VALUE_CONVERTING',
                                                },
                                            },
                                            valueCollectionMappingPerKey: {},
                                            objectMappingPerKey: {},
                                            objectCollectionMappingPerKey: {},
                                        },
                                    ],
                                    fromCollectionMappings: [],
                                },
                            },
                        },
                    ],
                    fromCollectionMappings: [],
                },
            },
        },
    },
    objectCollectionMappingPerKey: {},
};
