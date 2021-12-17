// @ts-ignore
import {ValueBuilder} from "../../features/integration/types/ValueBuilder";
import {toIntegrationConfiguration} from "../../features/integration/util/ToIntegrationConfiguration";
import {
    expectedIntegrationConfig,
    expectedIntegrationConfigWithTags,
    newForm,
    newFormWithTags
} from "../mock/mock-integration-configuration";

test('It should map form data to integration configuration correctly', () => {
    const integrationConfig = toIntegrationConfiguration(newForm);
    expect(integrationConfig).toEqual(expectedIntegrationConfig);
});

test('It should map form data with tags to integration configuration correctly', () => {
    const integrationConfig = toIntegrationConfiguration(newFormWithTags);
    expect(integrationConfig).toEqual(expectedIntegrationConfigWithTags);
});