import {toConfigurationPatch, toConfiguration} from "../../features/util/mapping/ToConfiguration";
import {MOCK_CONFIG_FORMDATA} from "../mock/mock-form-data";
import {
    MOCK_CONFIGURATION,
    MOCK_CONFIGURATION_PATCH,
} from "../mock/mock-configuration";

test('It should map form data to configuration correctly', () => {
    const config = toConfiguration(MOCK_CONFIG_FORMDATA, 'id0', '123', 321);
    expect(config).toEqual(MOCK_CONFIGURATION);
});

test('It should map form data to configuration patch  correctly', () => {
    const config = toConfigurationPatch(MOCK_CONFIG_FORMDATA, 321);
    expect(config).toEqual(MOCK_CONFIGURATION_PATCH);
});
