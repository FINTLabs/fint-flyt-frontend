import {toIntegrationConfiguration} from "../../features/util/ToIntegrationConfiguration";
import {
    MOCK_INTEGRATION_CONFIG,
    MOCK_INTEGRATION_CONFIG_WITH_TAGS,
    MOCK_INTEGRATION_CONFIG_NOT_PUBLISHED,
    MOCK_INTEGRATION_CONFIG_PUBLISHED
} from "../mock/mock-integration-configuration";
import {
    MOCK_FORMDATA,
    MOCK_FORMDATA_NOT_PUBLISHED,
    MOCK_FORMDATA_PUBLISHED,
    MOCK_FORMDATA_WITH_TAGS
} from "../mock/mock-form-data";

test('It should map form data to integration configuration correctly', () => {
    const integrationConfig = toIntegrationConfiguration(MOCK_FORMDATA);
    expect(integrationConfig).toEqual(MOCK_INTEGRATION_CONFIG);
});

test('It should map form data with tags to integration configuration correctly', () => {
    const integrationConfig = toIntegrationConfiguration(MOCK_FORMDATA_WITH_TAGS);
    expect(integrationConfig).toEqual(MOCK_INTEGRATION_CONFIG_WITH_TAGS);
});

test('It should map unpublished form data to integration configuration correctly', () => {
    const integrationConfig = toIntegrationConfiguration(MOCK_FORMDATA_NOT_PUBLISHED);
    expect(integrationConfig).toEqual(MOCK_INTEGRATION_CONFIG_NOT_PUBLISHED);
});

test('It should map published form data to integration configuration correctly', () => {
    const integrationConfig = toIntegrationConfiguration(MOCK_FORMDATA_PUBLISHED);
    expect(integrationConfig).toEqual(MOCK_INTEGRATION_CONFIG_PUBLISHED);
});