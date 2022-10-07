import {IIntegrationMetadata} from "../../features/integration/types/IntegrationMetadata";

export const MOCK_SKJEMA_METADATA: IIntegrationMetadata = {
    "sourceApplicationIntegrationId": "Test0488",
    "sourceApplicationIntegrationUri": "",
    "integrationDisplayName": "Test Skjema",
    "sourceApplicationId": "1",
    "instanceElementMetadata": [
        {
            "key": "person_med_valg",
            "type": "STRING",
            "displayName": "Personer med valg",
            "children": [
                {
                    "key": "person_1",
                    "type": "STRING",
                    "displayName": "Person 1",
                    "children": [
                        {
                            "key": "fornavn_1",
                            "type": "STRING",
                            "displayName": "Fornavn",
                            "children": []
                        },
                        {
                            "key": "etternavn_1",
                            "type": "STRING",
                            "displayName": "Etternavn",
                            "children": []
                        }
                    ]
                },
                {
                    "key": "person_2",
                    "type": "STRING",
                    "displayName": "Person 2",
                    "children": [
                        {
                            "key": "fornavn_2",
                            "type": "STRING",
                            "displayName": "Fornavn",
                            "children": []
                        },
                        {
                            "key": "etternavn_2",
                            "type": "STRING",
                            "displayName": "Etternavn",
                            "children": []
                        }
                    ]
                },
                {
                    "key": "valg",
                    "type": "STRING",
                    "displayName": "Valg",
                    "children": [
                        {
                            "key": "ukedag",
                            "type": "STRING",
                            "displayName": "Ukedag",
                            "children": []
                        },
                        {
                            "key": "farge_pa_bil",
                            "type": "STRING",
                            "displayName": "Farge på bil",
                            "children": []
                        }
                    ]
                }
            ]
        },
        {
            "key": "person_3",
            "type": "STRING",
            "displayName": "Person 3",
            "children": [
                {
                    "key": "fornavn_3",
                    "type": "STRING",
                    "displayName": "Fornavn",
                    "children": []
                },
                {
                    "key": "etternavn_3",
                    "type": "STRING",
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
                    "type": "STRING",
                    "displayName":"Første kolonne",
                    "children":[
                        {
                            "key":null,
                            "type": "STRING",
                            "displayName":"Arkivsystem",
                            "children":[
                                {
                                    "key":"Nedtrekk",
                                    "type": "STRING",
                                    "displayName":"Nedtrekk",
                                    "children":[]
                                },
                                {
                                    "key":"Radioknapp",
                                    "type": "STRING",
                                    "displayName":"Radioknapp",
                                    "children":[]
                                },
                                {
                                    "key":"Sjekkbokser",
                                    "type": "STRING",
                                    "displayName":"Sjekkbokser",
                                    "children":[]
                                }
                            ]
                        },
                        {
                            "key":null,
                            "type": "STRING",
                            "displayName":"Stedsnavn",
                            "children":[
                                {
                                    "key":"Nedtrekk2",
                                    "type": "STRING",
                                    "displayName":"Nedtrekk",
                                    "children":[]
                                },
                                {
                                    "key":"Radioknappliste",
                                    "type": "STRING",
                                    "displayName":"Radioknappliste",
                                    "children":[]
                                },
                                {
                                    "key":"Sjekkbokser2",
                                    "type": "STRING",
                                    "displayName":"Sjekkbokser",
                                    "children":[]
                                }
                            ]
                        },
                        {
                            "key":null,
                            "type": "STRING",
                            "displayName":"Med grab - sted",
                            "children":[
                                {
                                    "key":"Nedtrekk5",
                                    "type": "STRING",
                                    "displayName":"Nedtrekk",
                                    "children":[]
                                }
                            ]
                        },
                        {
                            "key":null,
                            "type": "STRING",
                            "displayName":"Gruppe",
                            "children":[
                                {
                                    "key":"Nedtrekk6",
                                    "type": "STRING",
                                    "displayName":"Nedtrekk",
                                    "children":[]
                                }
                            ]
                        }
                    ]
                },
                {
                    "key":null,
                    "type": "STRING",
                    "displayName":"Ny første kolonne",
                    "children":[
                        {
                            "key":null,
                            "type": "STRING",
                            "displayName":"Gruppe",
                            "children":[
                                {
                                    "key":"Nedtrekk3",
                                    "type": "STRING",
                                    "displayName":"Nedtrekk",
                                    "children":[]
                                },
                                {
                                    "key":"Radioknappliste2",
                                    "type": "STRING",
                                    "displayName":"Radioknappliste",
                                    "children":[]
                                },
                                {
                                    "key":"Sjekkbokser3",
                                    "type": "STRING",
                                    "displayName":"Sjekkbokser",
                                    "children":[]
                                }
                            ]
                        },
                        {
                            "key":null,
                            "type": "STRING",
                            "displayName":"Med Grab",
                            "children":[
                                {
                                    "key":"Nedtrekk4",
                                    "type": "STRING",
                                    "displayName":"Nedtrekk",
                                    "children":[]
                                },
                                {
                                    "key":"Radioknappliste3",
                                    "type": "STRING",
                                    "displayName":"Radioknappliste",
                                    "children":[]
                                },
                                {
                                    "key":"Sjekkboks2",
                                    "type": "STRING",
                                    "displayName":"Sjekkboks",
                                    "children":[]
                                }
                            ]
                        }
                    ]
                },
                {
                    "key":null,
                    "type": "STRING",
                    "displayName":"Andre kolonne",
                    "children":[
                        {
                            "key":null,
                            "type": "STRING",
                            "displayName":"Gruppe",
                            "children":[
                                {
                                    "key":"Nedtrekk7",
                                    "type": "STRING",
                                    "displayName":"Nedtrekk",
                                    "children":[]
                                },
                                {
                                    "key":"Radioknappliste4",
                                    "type": "STRING",
                                    "displayName":"Radioknappliste",
                                    "children":[]
                                },
                                {
                                    "key":"Sjekkbokser4",
                                    "type": "STRING",
                                    "displayName":"Sjekkbokser",
                                    "children":[]
                                }
                            ]
                        },
                        {
                            "key":null,
                            "type": "STRING",
                            "displayName":"Gruppe",
                            "children":[
                                {
                                    "key":"Nedtrekk8",
                                    "type": "STRING",
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
                    "type": "STRING",
                    "displayName": "Referansenummer",
                    "children": []
                }, {
                    "key": "person_2",
                    "type": "STRING",
                    "displayName": "Organisasjon",
                    "children": [
                        {
                            "key": "fornavn_2",
                            "type": "STRING",
                            "displayName": "Fornavn",
                            "children": []
                        },
                        {
                            "key": "etternavn_2",
                            "type": "STRING",
                            "displayName": "Etternavn",
                            "children": []
                        },
                        {
                            "key": "organisasjonsnavn",
                            "type": "STRING",
                            "displayName": "Organisasjonsnavn",
                            "children": []
                        },
                        {
                            "key": "organisasjonsnummer",
                            "type": "STRING",
                            "displayName": "Organisasjonsnummer",
                            "children": []
                        }
                    ]
                },
                {
                    "key": "person_1",
                    "type": "STRING",
                    "displayName": "Avsender",
                    "children": [
                        {
                            "key": "fornavn_1",
                            "type": "STRING",
                            "displayName": "Fornavn",
                            "children": []
                        },
                        {
                            "key": "etternavn_1",
                            "type": "STRING",
                            "displayName": "Etternavn",
                            "children": []
                        },
                        {
                            "key": "adresse",
                            "type": "STRING",
                            "displayName": "Adresse",
                            "children": []
                        },
                        {
                            "key": "postnummer",
                            "type": "STRING",
                            "displayName": "Postnummer",
                            "children": []
                        },
                        {
                            "key": "poststed",
                            "type": "STRING",
                            "displayName": "Poststed",
                            "children": []
                        },
                        {
                            "key": "telefonnummer",
                            "type": "STRING",
                            "displayName": "Telefonnummer",
                            "children": []
                        },
                        {
                            "key": "epost",
                            "type": "STRING",
                            "displayName": "Epost",
                            "children": []
                        },
                        {
                            "key": "fodselssnummer",
                            "type": "STRING",
                            "displayName": "Fødselssnummer",
                            "children": []
                        }
                    ]
                }
            ],
            version: 2
        }
    ]
