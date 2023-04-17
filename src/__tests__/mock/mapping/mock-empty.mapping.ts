import {IObjectMapping, ValueType} from "../../../features/configuration/types/Configuration";

export const MOCK_EMPTY_MAPPING: IObjectMapping = {
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
                        "testEnhet":{
                            "type":ValueType.STRING,
                            "mappingString":"https://kodeverk.no/systemid/100"
                        },
                        "tomTestEnhet":{
                            "type":ValueType.STRING,
                            "mappingString":""
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