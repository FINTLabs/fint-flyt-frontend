import {IFormMetadata} from "../../features/integration/types/FormMetadata";

export const MOCK_SKJEMA_METADATA: IFormMetadata = {
    "id": "Test0488",
    "displayName": "Test Skjema",
    "instanceElementMetadata": [
        {
            "id": "person_med_valg",
            "displayName": "Personer med valg",
            "children": [
                {
                    "id": "person_1",
                    "displayName": "Person 1",
                    "children": [
                        {
                            "id": "fornavn_1",
                            "displayName": "Fornavn",
                            "children": []
                        },
                        {
                            "id": "etternavn_1",
                            "displayName": "Etternavn",
                            "children": []
                        }
                    ]
                },
                {
                    "id": "person_2",
                    "displayName": "Person 2",
                    "children": [
                        {
                            "id": "fornavn_2",
                            "displayName": "Fornavn",
                            "children": []
                        },
                        {
                            "id": "etternavn_2",
                            "displayName": "Etternavn",
                            "children": []
                        }
                    ]
                },
                {
                    "id": "valg",
                    "displayName": "Valg",
                    "children": [
                        {
                            "id": "ukedag",
                            "displayName": "Ukedag",
                            "children": []
                        },
                        {
                            "id": "farge_pa_bil",
                            "displayName": "Farge på bil",
                            "children": []
                        }
                    ]
                }
            ]
        },
        {
            "id": "person_3",
            "displayName": "Person 3",
            "children": [
                {
                    "id": "fornavn_3",
                    "displayName": "Fornavn",
                    "children": []
                },
                {
                    "id": "etternavn_3",
                    "displayName": "Etternavn",
                    "children": []
                }
            ]
        }
    ]
}

export const MOCK_SKJEMA_METADATA_TEMP: IFormMetadata = {
    "id": "Test0488",
    "displayName": "DEMO",
    "instanceElementMetadata": [
        {
            "id": "person_2",
            "displayName": "Organisasjon",
            "children": [
                {
                    "id": "fornavn_2",
                    "displayName": "Fornavn",
                    "children": []
                },
                {
                    "id": "etternavn_2",
                    "displayName": "Etternavn",
                    "children": []
                },
                {
                    "id": "organisasjonsnavn",
                    "displayName": "Organisasjonsnavn",
                    "children": []
                },
                {
                    "id": "organisasjonsnummer",
                    "displayName": "Organisasjonsnummer",
                    "children": []
                }
            ]
        },
        {
            "id": "person_1",
            "displayName": "Avsender",
            "children": [
                {
                    "id": "fornavn_1",
                    "displayName": "Fornavn",
                    "children": []
                },
                {
                    "id": "etternavn_1",
                    "displayName": "Etternavn",
                    "children": []
                },
                {
                    "id": "adresse",
                    "displayName": "Adresse",
                    "children": []
                },
                {
                    "id": "postnummer",
                    "displayName": "Postnummer",
                    "children": []
                },
                {
                    "id": "poststed",
                    "displayName": "Poststed",
                    "children": []
                },
                {
                    "id": "telefonnummer",
                    "displayName": "Telefonnummer",
                    "children": []
                },
                {
                    "id": "epost",
                    "displayName": "Epost",
                    "children": []
                },
                {
                    "id": "fodselssnummer",
                    "displayName": "Fødselssnummer",
                    "children": []
                }
            ]
        }
    ]
}

