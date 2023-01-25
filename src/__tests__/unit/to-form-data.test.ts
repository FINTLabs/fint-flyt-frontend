import {newToFormData} from "../../features/util/mapping/ToFormData";
import {MOCK_BY_ID_FORMDATA, MOCK_CONFIG_FORMDATA, MOCK_NEW_FORMDATA} from "../mock/mock-form-data";
import {MOCK_BY_ID_CONFIG, MOCK_NEW_CONFIG} from "../mock/mock-configuration";
import {toAVFormData} from "../../features/util/mapping/AV/toAVFormData";
import {MOCK_AV_CONFIGURATION} from "../mock/mock_AV_configuration";

test('It should map new configuration with tags to form data correctly', () => {
    const formData = newToFormData(MOCK_NEW_CONFIG);
    expect(formData).toEqual(MOCK_NEW_FORMDATA);
});

test('It should map configuration by id with tags to form data correctly', () => {
    const formData = newToFormData(MOCK_BY_ID_CONFIG);
    expect(formData).toEqual(MOCK_BY_ID_FORMDATA);
});

test('It should map new AV configuration with tags to AV form data correctly', () => {
    const formData = toAVFormData(MOCK_AV_CONFIGURATION);
    expect(formData).toEqual(MOCK_CONFIG_FORMDATA);
});
