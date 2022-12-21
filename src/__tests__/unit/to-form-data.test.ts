import {newToFormData} from "../../features/util/mapping/ToFormData";
import {MOCK_BY_ID_FORMDATA, MOCK_NEW_FORMDATA} from "../mock/mock-form-data";
import {MOCK_BY_ID_CONFIG, MOCK_NEW_CONFIG} from "../mock/mock-configuration";

test('It should map new configuration with tags to form data correctly', () => {
    const formData = newToFormData(MOCK_NEW_CONFIG);
    expect(formData).toEqual(MOCK_NEW_FORMDATA);
});

test('It should map new configuration with tags to form data correctly', () => {
    const formData = newToFormData(MOCK_BY_ID_CONFIG);
    expect(formData).toEqual(MOCK_BY_ID_FORMDATA);
});



