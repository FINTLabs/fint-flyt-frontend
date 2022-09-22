import {toIntegration} from "../../features/util/mapping/ToIntegration";
import {MOCK_INTEGRATION_ACTIVE, MOCK_INTEGRATION_NOT_ACTIVE} from "../mock/mock-integration";
import {MOCK_INTEGRATION_FORMDATA, MOCK_INTEGRATION_FORMDATA2} from "../mock/mock-form-data";

test('It should map form data to integration correctly', () => {
    const integration = toIntegration(MOCK_INTEGRATION_FORMDATA, false);
    expect(integration).toEqual(MOCK_INTEGRATION_NOT_ACTIVE);
});

test('It should map form data to active integration correctly', () => {
    const integration = toIntegration(MOCK_INTEGRATION_FORMDATA2, true);
    expect(integration).toEqual(MOCK_INTEGRATION_ACTIVE);
});
