import {MOCK_EMPTY_MAPPING} from "../mock/mapping/mock-empty.mapping";
import {pruneObjectMapping} from "../../features/util/mapping/helpers/pruning";

const expectedMapping = {
    "objectCollectionMappingPerKey": {
        "journalpost": {
            "elementMappings": [
                {
                    "objectCollectionMappingPerKey": {},
                    "objectMappingPerKey": {},
                    "valueCollectionMappingPerKey": {},
                    "valueMappingPerKey": {
                        "testEnhet": {
                            "mappingString": "https://kodeverk.no/systemid/100",
                            "type": "STRING"
                        }
                    }
                }
            ],
            "fromCollectionMappings": []
        }
    },
    "objectMappingPerKey": {},
    "valueCollectionMappingPerKey": {},
    "valueMappingPerKey": {
        "caseId": {
            "mappingString": "sergdfg",
            "type": "DYNAMIC_STRING"
        },
        "type": {
            "mappingString": "BY_ID",
            "type": "STRING"
        }
    }
}

test('It should prune empties from object mapping', () => {
    let mapping = pruneObjectMapping(MOCK_EMPTY_MAPPING);
    expect(mapping).toEqual(expectedMapping)
});
