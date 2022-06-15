import {IFormMetadata} from "../../features/integration/types/FormMetadata";

export const MOCK_SKJEMA_METADATA: IFormMetadata = {
    "metadata":
    {
        "name": "Test Skjema",
        "sourceApplicationIntegrationId": "Test0488"
    },
    "steps":
    [
        {
            "name": "Person med valg",
            "groups":
                [
                    {
                        "name": "Gruppe: Person 1",
                        "elements": [
                            {
                                "name":"Fornavn",
                                "type": "inputBox"
                            },
                            {
                                "name":"Etternavn",
                                "type": "inputBox"
                            }
                        ]
                    },
                    {
                        "name": "Gruppe: Person 2",
                        "elements": [
                            {
                                "name":"Fornavn2",
                                "type": "inputBox"
                            },
                            {
                                "name":"Etternavn2",
                                "type": "inputBox"
                            }
                        ]
                    },
                    {
                        "name": "Gruppe: Valg",
                        "elements": [
                            {
                                "name":"Ukedag",
                                "type": "DropdownList"
                            },
                            {
                                "name":"Farge_pa_bil",
                                "type": "RadiobuttonList"
                            }
                        ]
                    },
                    {
                        "name": "Gruppe: Avsender",
                        "elements": [
                            {
                                "name":"Fødselsnummer",
                                "type": "inputBox"
                            },
                            {
                                "name":"Fornavn",
                                "type": "inputBox"
                            },
                            {
                                "name":"Etternavn",
                                "type": "inputBox"
                            },
                            {
                                "name":"Adresse",
                                "type": "inputBox"
                            },
                            {
                                "name":"Postnummer",
                                "type": "inputBox"
                            },
                            {
                                "name":"Poststed",
                                "type": "inputBox"
                            },
                            {
                                "name":"Telefonnummer",
                                "type": "inputBox"
                            },
                            {
                                "name":"Email",
                                "type": "inputBox"
                            },
                            {
                                "name":"Organisasjonsnummer",
                                "type": "inputBox"
                            }
                        ]
                    }
                ]
        }
    ]
}
