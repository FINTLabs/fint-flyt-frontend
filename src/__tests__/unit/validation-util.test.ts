import {dynamicStringPattern} from "../../features/configuration/util/ValidationUtil";

const ifRef = '$if{test}'
const failingIfRef = '$if{test'

const titleIfRef = 'title $if{test}'
const failingTitleIfRef = 'title $if{test'

const multiIfRef = 'title $if{test} $if{test2}'
const failingMultiIfRef = 'title $if{test} $if{test2'

test('It should validate if references', () => {
    expect(dynamicStringPattern.test(ifRef)).toBe(true)
    expect(dynamicStringPattern.test(failingIfRef)).toBe(false)
    expect(dynamicStringPattern.test(titleIfRef)).toBe(true)
    expect(dynamicStringPattern.test(failingTitleIfRef)).toBe(false)
    expect(dynamicStringPattern.test(multiIfRef)).toBe(true)
    expect(dynamicStringPattern.test(failingMultiIfRef)).toBe(false)
});
