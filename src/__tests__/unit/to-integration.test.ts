import {toIntegration} from "../../features/util/ToIntegration";
import {MOCK_INTEGRATION_ACTIVE, MOCK_INTEGRATION_NOT_ACTIVE} from "../mock/mock-integration";

test('It should map form data to integration correctly', () => {
    const integration = toIntegration({sourceApplicationIntegrationId: 'TEST234', destination: 'fylkesrad', sourceApplicationId: 'ACOS'}, false);
    expect(integration).toEqual(MOCK_INTEGRATION_NOT_ACTIVE);
});


test('It should map form data to active integration correctly', () => {
    const integration = toIntegration({sourceApplicationIntegrationId: 'TEST345', destination: 'fylkesrad', sourceApplicationId: 'ACOS'}, true);
    expect(integration).toEqual(MOCK_INTEGRATION_ACTIVE);
});
