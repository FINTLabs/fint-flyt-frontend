import {ifReferencePattern} from "../../features/configuration/util/ValidationUtil";

const ifRef = '$if{test}'
const failingIfRef = '$if{test'
const failingIfRef2 = 'if{test}'

const titleIfRef = 'title $if{test}'
const failingTitleIfRef = 'title $if{test'

const multiIfRef = 'title $if{test} $if{test2}'
const failingMultiIfRef = 'title $if{test} $if{test2'

test('It should validate if references', () => {
    expect(ifReferencePattern.test(ifRef)).toBe(true)
    expect(ifReferencePattern.test(failingIfRef)).toBe(false)
    expect(ifReferencePattern.test(failingIfRef2)).toBe(false)
    expect(ifReferencePattern.test(titleIfRef)).toBe(true)
    expect(ifReferencePattern.test(failingTitleIfRef)).toBe(false)
    expect(ifReferencePattern.test(multiIfRef)).toBe(true)
    // expect(ifReferencePattern.test(failingMultiIfRef)).toBe(false)
});
