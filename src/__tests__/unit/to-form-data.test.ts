import {
    MOCK_INTEGRATION_CONFIG,
    MOCK_INTEGRATION_CONFIG_WITH_TAGS,
    MOCK_FORMDATA,
    MOCK_FORMDATA_WITH_TAGS
} from "../mock/mock-integration-configuration";
import {toFormData} from "../../features/integration/util/ToFormData";

test('It should map integration configuration to form data correctly', () => {
    const formData = toFormData(MOCK_INTEGRATION_CONFIG);
    expect(formData).toEqual(MOCK_FORMDATA);
});

test('It should map integration configuration with tags to form data correctly', () => {
    const formData = toFormData(MOCK_INTEGRATION_CONFIG_WITH_TAGS);
    expect(formData).toEqual(MOCK_FORMDATA_WITH_TAGS);
});