import {MOCK_EMPTY_MAPPING} from "../mock/mapping/mock-empty.mapping";
import {pruneObjectMapping} from "../../features/util/mapping/helpers/pruning";
import {IObjectMapping, ValueType} from "../../features/configuration/types/Configuration";
import {IIntegration} from "../../features/integration/types/Integration";
import {toIntegration} from "../../features/util/mapping/ToIntegration";
import {MOCK_FORM_INTEGRATION} from "../mock/mapping/mock-form.integration";

const expectedMapping: IObjectMapping = {
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
                            "type": ValueType.STRING
                        }
                    }
                }
            ],
            "fromCollectionMappings": [
                {
                    "elementMapping": {
                        "objectCollectionMappingPerKey": {},
                        "objectMappingPerKey": {},
                        "valueCollectionMappingPerKey": {},
                        "valueMappingPerKey": {
                            "testSamlingEnhet": {
                                "mappingString": "https://kodeverk.no/systemid/100",
                                "type": ValueType.STRING
                            }
                        }
                    },
                    'instanceCollectionReferencesOrdered': ['$if{collectionRef}']
                }
            ]
        }
    },
    "objectMappingPerKey": {},
    "valueCollectionMappingPerKey": {},
    "valueMappingPerKey": {
        "caseId": {
            "mappingString": "sergdfg",
            "type": ValueType.DYNAMIC_STRING
        },
        "type": {
            "mappingString": "BY_ID",
            "type": ValueType.STRING
        }
    }
}

const expectedIntegration: IIntegration = {
    sourceApplicationId: '2',
    sourceApplicationIntegrationId: 'TEST123',
    destination: 'FSRAD',
    state: 'false'
}


test('It should prune empties from object mapping', () => {
    let mapping = pruneObjectMapping(MOCK_EMPTY_MAPPING);
    expect(mapping).toEqual(expectedMapping)
});

test('It should map from form data to integration dto correctly', () => {
    let integration: IIntegration = toIntegration(MOCK_FORM_INTEGRATION, 'false');
    expect(integration).toEqual(expectedIntegration)
});