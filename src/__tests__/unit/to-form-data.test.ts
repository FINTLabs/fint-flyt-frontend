import {MOCK_CONFIG_WITH_TAGS} from "../mock/mock-integration-configuration";
import {toFormConfigData} from "../../features/util/ToFormData";
import { MOCK_FORMDATA_WITH_TAGS} from "../mock/mock-form-data";

test('It should map integration configuration with tags to form data correctly', () => {
    const formData = toFormConfigData(MOCK_CONFIG_WITH_TAGS);
    expect(formData).toEqual(MOCK_FORMDATA_WITH_TAGS);
});
