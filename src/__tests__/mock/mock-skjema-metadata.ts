import {IIntegrationMetadata, Type} from "../../features/configuration/types/IntegrationMetadata";

export const MOCK_SKJEMA_METADATA: IIntegrationMetadata = {
    sourceApplicationIntegrationId: "Test0488",
    sourceApplicationIntegrationUri: "",
    integrationDisplayName: "Test Skjema",
    sourceApplicationId: "1",
    instanceElementMetadata: [
        {
            key: "person_med_valg",
            type: Type.STRING,
            displayName: "Personer med valg",
            children: [
                {
                    "key": "person_1",
                    "type": Type.STRING,
                    "displayName": "Person 1",
                    "children": [
                        {
                            "key": "fornavn_1",
                            "type": Type.STRING,
                            "displayName": "Fornavn",
                            "children": []
                        },
                        {
                            "key": "etternavn_1",
                            "type": Type.STRING,
                            "displayName": "Etternavn",
                            "children": []
                        }
                    ]
                },
                {
                    "key": "person_2",
                    "type": Type.STRING,
                    "displayName": "Person 2",
                    "children": [
                        {
                            "key": "fornavn_2",
                            "type": Type.STRING,
                            "displayName": "Fornavn",
                            "children": []
                        },
                        {
                            "key": "etternavn_2",
                            "type": Type.STRING,
                            "displayName": "Etternavn",
                            "children": []
                        }
                    ]
                },
                {
                    "key": "valg",
                    "type": Type.STRING,
                    "displayName": "Valg",
                    "children": [
                        {
                            "key": "ukedag",
                            "type": Type.STRING,
                            "displayName": "Ukedag",
                            "children": []
                        },
                        {
                            "key": "farge_pa_bil",
                            "type": Type.STRING,
                            "displayName": "Farge på bil",
                            "children": []
                        }
                    ]
                }
            ]
        },
        {
            "key": "person_3",
            "type": Type.STRING,
            "displayName": "Person 3",
            "children": [
                {
                    "key": "fornavn_3",
                    "type": Type.STRING,
                    "displayName": "Fornavn",
                    "children": [],
                    "disabled": true
                },
                {
                    "key": "etternavn_3",
                    "type": Type.STRING,
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
                    "type": Type.STRING,
                    "displayName":"Første kolonne",
                    "children":[
                        {
                            "key":null,
                            "type": Type.STRING,
                            "displayName":"Arkivsystem",
                            "children":[
                                {
                                    "key":"Nedtrekk",
                                    "type": Type.STRING,
                                    "displayName":"Nedtrekk",
                                    "children":[]
                                },
                                {
                                    "key":"Radioknapp",
                                    "type": Type.STRING,
                                    "displayName":"Radioknapp",
                                    "children":[]
                                },
                                {
                                    "key":"Sjekkbokser",
                                    "type": Type.STRING,
                                    "displayName":"Sjekkbokser",
                                    "children":[]
                                }
                            ]
                        },
                        {
                            "key":null,
                            "type": Type.STRING,
                            "displayName":"Stedsnavn",
                            "children":[
                                {
                                    "key":"Nedtrekk2",
                                    "type": Type.STRING,
                                    "displayName":"Nedtrekk",
                                    "children":[]
                                },
                                {
                                    "key":"Radioknappliste",
                                    "type": Type.STRING,
                                    "displayName":"Radioknappliste",
                                    "children":[]
                                },
                                {
                                    "key":"Sjekkbokser2",
                                    "type": Type.STRING,
                                    "displayName":"Sjekkbokser",
                                    "children":[]
                                }
                            ]
                        },
                        {
                            "key":null,
                            "type": Type.STRING,
                            "displayName":"Med grab - sted",
                            "children":[
                                {
                                    "key":"Nedtrekk5",
                                    "type": Type.STRING,
                                    "displayName":"Nedtrekk",
                                    "children":[]
                                }
                            ]
                        },
                        {
                            "key":null,
                            "type": Type.STRING,
                            "displayName":"Gruppe",
                            "children":[
                                {
                                    "key":"Nedtrekk6",
                                    "type": Type.STRING,
                                    "displayName":"Nedtrekk",
                                    "children":[]
                                }
                            ]
                        }
                    ]
                },
                {
                    "key":null,
                    "type": Type.STRING,
                    "displayName":"Ny første kolonne",
                    "children":[
                        {
                            "key":null,
                            "type": Type.STRING,
                            "displayName":"Gruppe",
                            "children":[
                                {
                                    "key":"Nedtrekk3",
                                    "type": Type.STRING,
                                    "displayName":"Nedtrekk",
                                    "children":[]
                                },
                                {
                                    "key":"Radioknappliste2",
                                    "type": Type.STRING,
                                    "displayName":"Radioknappliste",
                                    "children":[]
                                },
                                {
                                    "key":"Sjekkbokser3",
                                    "type": Type.STRING,
                                    "displayName":"Sjekkbokser",
                                    "children":[]
                                }
                            ]
                        },
                        {
                            "key":null,
                            "type": Type.STRING,
                            "displayName":"Med Grab",
                            "children":[
                                {
                                    "key":"Nedtrekk4",
                                    "type": Type.STRING,
                                    "displayName":"Nedtrekk",
                                    "children":[]
                                },
                                {
                                    "key":"Radioknappliste3",
                                    "type": Type.STRING,
                                    "displayName":"Radioknappliste",
                                    "children":[]
                                },
                                {
                                    "key":"Sjekkboks2",
                                    "type": Type.STRING,
                                    "displayName":"Sjekkboks",
                                    "children":[]
                                }
                            ]
                        }
                    ]
                },
                {
                    "key":null,
                    "type": Type.STRING,
                    "displayName":"Andre kolonne",
                    "children":[
                        {
                            "key":null,
                            "type": Type.STRING,
                            "displayName":"Gruppe",
                            "children":[
                                {
                                    "key":"Nedtrekk7",
                                    "type": Type.STRING,
                                    "displayName":"Nedtrekk",
                                    "children":[]
                                },
                                {
                                    "key":"Radioknappliste4",
                                    "type": Type.STRING,
                                    "displayName":"Radioknappliste",
                                    "children":[]
                                },
                                {
                                    "key":"Sjekkbokser4",
                                    "type": Type.STRING,
                                    "displayName":"Sjekkbokser",
                                    "children":[]
                                }
                            ]
                        },
                        {
                            "key":null,
                            "type": Type.STRING,
                            "displayName":"Gruppe",
                            "children":[
                                {
                                    "key":"Nedtrekk8",
                                    "type": Type.STRING,
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
                    "type": Type.STRING,
                    "displayName": "Referansenummer",
                    "children": []
                }, {
                    "key": "person_2",
                    "type": Type.STRING,
                    "displayName": "Organisasjon",
                    "children": [
                        {
                            "key": "fornavn_2",
                            "type": Type.STRING,
                            "displayName": "Fornavn",
                            "children": []
                        },
                        {
                            "key": "etternavn_2",
                            "type": Type.STRING,
                            "displayName": "Etternavn",
                            "children": []
                        },
                        {
                            "key": "organisasjonsnavn",
                            "type": Type.STRING,
                            "displayName": "Organisasjonsnavn",
                            "children": []
                        },
                        {
                            "key": "organisasjonsnummer",
                            "type": Type.STRING,
                            "displayName": "Organisasjonsnummer",
                            "children": []
                        }
                    ]
                },
                {
                    "key": "person_1",
                    "type": Type.STRING,
                    "displayName": "Korrespondansepart",
                    "children": [
                        {
                            "key": "fornavn_1",
                            "type": Type.STRING,
                            "displayName": "Fornavn",
                            "children": []
                        },
                        {
                            "key": "etternavn_1",
                            "type": Type.STRING,
                            "displayName": "Etternavn",
                            "children": []
                        },
                        {
                            "key": "adresse",
                            "type": Type.STRING,
                            "displayName": "Adresse",
                            "children": []
                        },
                        {
                            "key": "postnummer",
                            "type": Type.STRING,
                            "displayName": "Postnummer",
                            "children": []
                        },
                        {
                            "key": "poststed",
                            "type": Type.STRING,
                            "displayName": "Poststed",
                            "children": []
                        },
                        {
                            "key": "telefonnummer",
                            "type": Type.STRING,
                            "displayName": "Telefonnummer",
                            "children": []
                        },
                        {
                            "key": "epost",
                            "type": Type.STRING,
                            "displayName": "Epost",
                            "children": []
                        },
                        {
                            "key": "fodselssnummer",
                            "type": Type.STRING,
                            "displayName": "Fødselssnummer",
                            "children": []
                        }
                    ]
                }
            ],
            version: 2
        }
    ]
