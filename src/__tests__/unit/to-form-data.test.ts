import {toFormData} from "../../features/util/mapping/ToFormData";
import {
    MOCK_BY_ID_FORMDATA,
    MOCK_CONFIG_FORMDATA,
    MOCK_CONFIG_FORMDATA_SHIELDED_FALSE,
    MOCK_NEW_FORMDATA, MOCK_NEW_FORMDATA_FROM_EMPTY_CONFIG
} from "../mock/mock-form-data";
import {
    MOCK_AV_CONFIGURATION_NEW,
    MOCK_AV_CONFIGURATION_NEW_NOT_SHIELDED,
    MOCK_BY_ID_CONFIG, MOCK_EMPTY_CONFIGURATION,
    MOCK_NEW_CONFIG
} from "../mock/mock-configuration";
import {toAVFormData} from "../../features/util/mapping/AV/toAVFormData";

test('It should map new configuration with tags to form data correctly', () => {
    const formData = toFormData(MOCK_NEW_CONFIG);
    expect(formData).toEqual(MOCK_NEW_FORMDATA);
});

test('It should map configuration with empty mapping to form data correctly', () => {
    const formData = toFormData(MOCK_EMPTY_CONFIGURATION);
    expect(formData).toEqual(MOCK_NEW_FORMDATA_FROM_EMPTY_CONFIG);
});

test('It should map configuration by id with tags to form data correctly', () => {
    const formData = toAVFormData(MOCK_BY_ID_CONFIG);
    expect(formData).toEqual(MOCK_BY_ID_FORMDATA);
});

test('It should map new AV configuration with tags to AV form data correctly', () => {
    const formData = toAVFormData(MOCK_AV_CONFIGURATION_NEW);
    expect(formData).toEqual(MOCK_CONFIG_FORMDATA);
});

test('It should map new AV configuration with no shielding to AV form data correctly', () => {
    const formData = toAVFormData(MOCK_AV_CONFIGURATION_NEW_NOT_SHIELDED);
    expect(formData).toEqual(MOCK_CONFIG_FORMDATA_SHIELDED_FALSE);
});