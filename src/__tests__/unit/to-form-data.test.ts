import {newToFormData} from "../../features/util/mapping/ToFormData";
import {MOCK_NEW_FORMDATA} from "../mock/mock-form-data";
import {MOCK_NEW_CONFIG} from "../mock/mock-configuration";

test('It should map integration configuration with tags to form data correctly', () => {
    const formData = newToFormData(MOCK_NEW_CONFIG);
    expect(formData).toEqual(MOCK_NEW_FORMDATA);
});
