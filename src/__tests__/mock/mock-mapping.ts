import {IObjectMapping, ValueType} from "../../features/configuration/types/Configuration";

export const MOCK_MAPPING: IObjectMapping = {
    "valueMappingPerKey":{
        "caseId":{
            "type":ValueType.DYNAMIC_STRING,
                "mappingString":"sergdfg"
        },
        "type":{
            "type":ValueType.STRING,
                "mappingString":"BY_ID"
        }
    },
    "valueCollectionMappingPerKey":{

    },
    "objectMappingPerKey":{

    },
    "objectCollectionMappingPerKey":{
        "journalpost":{
            "elementMappings":[
                {
                    "valueMappingPerKey":{
                        "journalposttype":{
                            "type":ValueType.STRING,
                            "mappingString":"https://beta.felleskomponent.no/arkiv/kodeverk/journalposttype/systemid/A"
                        },
                        "administrativEnhet":{
                            "type":ValueType.STRING,
                            "mappingString":"https://beta.felleskomponent.no/arkiv/noark/administrativenhet/systemid/100"
                        }
                    },
                    "valueCollectionMappingPerKey":{

                    },
                    "objectMappingPerKey":{

                    },
                    "objectCollectionMappingPerKey":{

                    }
                }
            ],
                "fromCollectionMappings":[

            ]
        }
    }
}