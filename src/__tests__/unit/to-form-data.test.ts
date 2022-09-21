import {MOCK_CONFIG_WITH_TAGS} from "../mock/mock-integration-configuration";
import {newToFormData, toFormConfigData} from "../../features/util/ToFormData";
import {MOCK_FORMDATA_WITH_TAGS, MOCK_NEW_FORMDATA} from "../mock/mock-form-data";
import {MOCK_NEW_CONFIG} from "../mock/mock-configuration";

test('It should map integration configuration with tags to form data correctly', () => {
    const formData = toFormConfigData(MOCK_CONFIG_WITH_TAGS);
    expect(formData).toEqual(MOCK_FORMDATA_WITH_TAGS);
});

test('It should map integration configuration with tags to form data correctly', () => {
    const formData = newToFormData(MOCK_NEW_CONFIG);
    expect(formData).toEqual(MOCK_NEW_FORMDATA);
});
