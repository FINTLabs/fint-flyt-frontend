import {IIntegrationMetadata} from "../../features/integration/types/IntegrationMetadata";

export const MOCK_SKJEMA_METADATA: IIntegrationMetadata = {
    "sourceApplicationIntegrationId": "Test0488",
    "sourceApplicationIntegrationUri": "",
    "integrationDisplayName": "Test Skjema",
    "sourceApplicationId": "1",
    "instanceElementMetadata": [
        {
            "key": "person_med_valg",
            "displayName": "Personer med valg",
            "children": [
                {
                    "key": "person_1",
                    "displayName": "Person 1",
                    "children": [
                        {
                            "key": "fornavn_1",
                            "displayName": "Fornavn",
                            "children": []
                        },
                        {
                            "key": "etternavn_1",
                            "displayName": "Etternavn",
                            "children": []
                        }
                    ]
                },
                {
                    "key": "person_2",
                    "displayName": "Person 2",
                    "children": [
                        {
                            "key": "fornavn_2",
                            "displayName": "Fornavn",
                            "children": []
                        },
                        {
                            "key": "etternavn_2",
                            "displayName": "Etternavn",
                            "children": []
                        }
                    ]
                },
                {
                    "key": "valg",
                    "displayName": "Valg",
                    "children": [
                        {
                            "key": "ukedag",
                            "displayName": "Ukedag",
                            "children": []
                        },
                        {
                            "key": "farge_pa_bil",
                            "displayName": "Farge på bil",
                            "children": []
                        }
                    ]
                }
            ]
        },
        {
            "key": "person_3",
            "displayName": "Person 3",
            "children": [
                {
                    "key": "fornavn_3",
                    "displayName": "Fornavn",
                    "children": []
                },
                {
                    "key": "etternavn_3",
                    "displayName": "Etternavn",
                    "children": []
                }
            ]
        }
    ],
    version: 2
}

export const MOCK_SKJEMA_METADATA_TEMP: IIntegrationMetadata[] =
    [
        {
            "sourceApplicationId":"1",
            "sourceApplicationIntegrationId":"PROD0195",
            "sourceApplicationIntegrationUri":"",
            "integrationDisplayName":"Oversett lister med datakilder",
            "instanceElementMetadata":[
                {
                    "key":null,
                    "displayName":"Første kolonne",
                    "children":[
                        {
                            "key":null,
                            "displayName":"Arkivsystem",
                            "children":[
                                {
                                    "key":"Nedtrekk",
                                    "displayName":"Nedtrekk",
                                    "children":[]
                                },
                                {
                                    "key":"Radioknapp",
                                    "displayName":"Radioknapp",
                                    "children":[]
                                },
                                {
                                    "key":"Sjekkbokser","displayName":"Sjekkbokser",
                                    "children":[]
                                }
                            ]
                        },
                        {
                            "key":null,
                            "displayName":"Stedsnavn",
                            "children":[
                                {
                                    "key":"Nedtrekk2",
                                    "displayName":"Nedtrekk",
                                    "children":[]
                                },
                                {
                                    "key":"Radioknappliste",
                                    "displayName":"Radioknappliste",
                                    "children":[]
                                },
                                {
                                    "key":"Sjekkbokser2","displayName":"Sjekkbokser",
                                    "children":[]
                                }
                            ]
                        },
                        {
                            "key":null,
                            "displayName":"Med grab - sted",
                            "children":[
                                {
                                    "key":"Nedtrekk5",
                                    "displayName":"Nedtrekk",
                                    "children":[]
                                }
                            ]
                        },
                        {
                            "key":null,
                            "displayName":"Gruppe",
                            "children":[
                                {
                                    "key":"Nedtrekk6",
                                    "displayName":"Nedtrekk",
                                    "children":[]
                                }
                            ]
                        }
                    ]
                },
                {
                    "key":null,
                    "displayName":"Ny første kolonne",
                    "children":[
                        {
                            "key":null,
                            "displayName":"Gruppe",
                            "children":[
                                {
                                    "key":"Nedtrekk3",
                                    "displayName":"Nedtrekk",
                                    "children":[]
                                },
                                {
                                    "key":"Radioknappliste2",
                                    "displayName":"Radioknappliste",
                                    "children":[]
                                },
                                {
                                    "key":"Sjekkbokser3",
                                    "displayName":"Sjekkbokser",
                                    "children":[]
                                }
                            ]
                        },
                        {
                            "key":null,
                            "displayName":"Med Grab",
                            "children":[
                                {
                                    "key":"Nedtrekk4",
                                    "displayName":"Nedtrekk",
                                    "children":[]
                                },
                                {
                                    "key":"Radioknappliste3",
                                    "displayName":"Radioknappliste",
                                    "children":[]
                                },
                                {
                                    "key":"Sjekkboks2",
                                    "displayName":"Sjekkboks",
                                    "children":[]
                                }
                            ]
                        }
                    ]
                },
                {
                    "key":null,
                    "displayName":"Andre kolonne",
                    "children":[
                        {
                            "key":null,
                            "displayName":"Gruppe",
                            "children":[
                                {
                                    "key":"Nedtrekk7",
                                    "displayName":"Nedtrekk",
                                    "children":[]
                                },
                                {
                                    "key":"Radioknappliste4",
                                    "displayName":"Radioknappliste",
                                    "children":[]
                                },
                                {
                                    "key":"Sjekkbokser4",
                                    "displayName":"Sjekkbokser",
                                    "children":[]
                                }
                            ]
                        },
                        {
                            "key":null,
                            "displayName":"Gruppe",
                            "children":[
                                {
                                    "key":"Nedtrekk8",
                                    "displayName":"Nedtrekk",
                                    "children":[]
                                }
                            ]
                        }
                    ]
                }
            ],
            "version":1
        },
        {
            "sourceApplicationId":"1",
            "sourceApplicationIntegrationId":"Test0488",
            "sourceApplicationIntegrationUri":"",
            "integrationDisplayName":"DEMO",
            "instanceElementMetadata": [
                {
                    "key": "referansenummer",
                    "displayName": "Referansenummer",
                    "children": []
                }, {
                    "key": "person_2",
                    "displayName": "Organisasjon",
                    "children": [
                        {
                            "key": "fornavn_2",
                            "displayName": "Fornavn",
                            "children": []
                        },
                        {
                            "key": "etternavn_2",
                            "displayName": "Etternavn",
                            "children": []
                        },
                        {
                            "key": "organisasjonsnavn",
                            "displayName": "Organisasjonsnavn",
                            "children": []
                        },
                        {
                            "key": "organisasjonsnummer",
                            "displayName": "Organisasjonsnummer",
                            "children": []
                        }
                    ]
                },
                {
                    "key": "person_1",
                    "displayName": "Avsender",
                    "children": [
                        {
                            "key": "fornavn_1",
                            "displayName": "Fornavn",
                            "children": []
                        },
                        {
                            "key": "etternavn_1",
                            "displayName": "Etternavn",
                            "children": []
                        },
                        {
                            "key": "adresse",
                            "displayName": "Adresse",
                            "children": []
                        },
                        {
                            "key": "postnummer",
                            "displayName": "Postnummer",
                            "children": []
                        },
                        {
                            "key": "poststed",
                            "displayName": "Poststed",
                            "children": []
                        },
                        {
                            "key": "telefonnummer",
                            "displayName": "Telefonnummer",
                            "children": []
                        },
                        {
                            "key": "epost",
                            "displayName": "Epost",
                            "children": []
                        },
                        {
                            "key": "fodselssnummer",
                            "displayName": "Fødselssnummer",
                            "children": []
                        }
                    ]
                }
            ],
            version: 2
        }
    ]
