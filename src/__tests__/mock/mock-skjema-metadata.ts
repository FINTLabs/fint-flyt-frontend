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
