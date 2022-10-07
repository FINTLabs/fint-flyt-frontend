import {toIntegration} from "../../features/util/mapping/ToIntegration";
import {MOCK_INTEGRATION_ACTIVE, MOCK_INTEGRATION_NOT_ACTIVE} from "../mock/mock-integration";
import {MOCK_INTEGRATION_FORMDATA, MOCK_INTEGRATION_FORMDATA2} from "../mock/mock-form-data";
import {IntegrationState} from "../../features/integration/types/Integration";

test('It should map form data to integration correctly', () => {
    const integration = toIntegration(MOCK_INTEGRATION_FORMDATA, IntegrationState.DEACTIVATED);
    expect(integration).toEqual(MOCK_INTEGRATION_NOT_ACTIVE);
});

test('It should map form data to active integration correctly', () => {
    const integration = toIntegration(MOCK_INTEGRATION_FORMDATA2, IntegrationState.ACTIVE);
    expect(integration).toEqual(MOCK_INTEGRATION_ACTIVE);
});
