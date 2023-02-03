import {toConfigurationPatch, toConfiguration} from "../../features/util/mapping/ToConfiguration";
import {MOCK_CONFIG_FORMDATA, MOCK_NEW_FORMDATA_FROM_EMPTY_CONFIG} from "../mock/mock-form-data";
import {
    MOCK_AV_CONFIGURATION_NEW,
    MOCK_CONFIGURATION,
    MOCK_CONFIGURATION_PATCH,
    MOCK_MAPPED_EMPTY_CONFIGURATION
} from "../mock/mock-configuration";
import {toAVConfiguration} from "../../features/util/mapping/AV/ToAVConfiguration";

test('It should map form data to configuration correctly', () => {
    const config = toConfiguration(MOCK_CONFIG_FORMDATA, 'id0', '123', 321);
    expect(config).toEqual(MOCK_CONFIGURATION);
});

test('It should map form data to configuration patch  correctly', () => {
    const config = toConfigurationPatch(MOCK_CONFIG_FORMDATA, 321);
    expect(config).toEqual(MOCK_CONFIGURATION_PATCH);
});

test('It should map form data to AV configuration correctly', () => {
    const config = toAVConfiguration(MOCK_CONFIG_FORMDATA, 'id1', '234', 321);
    expect(config).toEqual(MOCK_AV_CONFIGURATION_NEW)
})

test('It should map empty form data to configuration correctly', () => {
    const config = toAVConfiguration(MOCK_NEW_FORMDATA_FROM_EMPTY_CONFIG, 'id1', '234', 321);
    expect(config).toEqual(MOCK_MAPPED_EMPTY_CONFIGURATION)
})