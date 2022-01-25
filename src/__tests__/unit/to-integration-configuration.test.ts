// @ts-ignore
import {ValueBuilder} from "../../features/integration/types/ValueBuilder";
import {toIntegrationConfiguration} from "../../features/integration/util/ToIntegrationConfiguration";
import {
    MOCK_INTEGRATION_CONFIG,
    MOCK_INTEGRATION_CONFIG_WITH_TAGS,
    MOCK_FORMDATA,
    MOCK_FORMDATA_WITH_TAGS
} from "../mock/mock-integration-configuration";

test('It should map form data to integration configuration correctly', () => {
    const integrationConfig = toIntegrationConfiguration(MOCK_FORMDATA);
    expect(integrationConfig).toEqual(MOCK_INTEGRATION_CONFIG);
});

test('It should map form data with tags to integration configuration correctly', () => {
    const integrationConfig = toIntegrationConfiguration(MOCK_FORMDATA_WITH_TAGS);
    expect(integrationConfig).toEqual(MOCK_INTEGRATION_CONFIG_WITH_TAGS);
});