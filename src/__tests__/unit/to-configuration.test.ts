import {toNewConfiguration} from "../../features/util/mapping/ToConfiguration";
import {MOCK_CONFIG_FORMDATA} from "../mock/mock-form-data";
import {MOCK_CONFIGURATION} from "../mock/mock-configuration";

test('It should map form data to integration configuration correctly', () => {
    const config = toNewConfiguration(MOCK_CONFIG_FORMDATA, 'id0', '123');
    expect(config).toEqual(MOCK_CONFIGURATION);
});
