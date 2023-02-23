import {toFormData} from "../../features/util/mapping/ToFormData";
import {
    MOCK_NEW_FORMDATA, MOCK_NEW_FORMDATA_FROM_EMPTY_CONFIG
} from "../mock/mock-form-data";
import {
    MOCK_EMPTY_CONFIGURATION,
    MOCK_NEW_CONFIG
} from "../mock/mock-configuration";

test('It should map new configuration with tags to form data correctly', () => {
    const formData = toFormData(MOCK_NEW_CONFIG);
    expect(formData).toEqual(MOCK_NEW_FORMDATA);
});

test('It should map configuration with empty mapping to form data correctly', () => {
    const formData = toFormData(MOCK_EMPTY_CONFIGURATION);
    expect(formData).toEqual(MOCK_NEW_FORMDATA_FROM_EMPTY_CONFIG);
});
