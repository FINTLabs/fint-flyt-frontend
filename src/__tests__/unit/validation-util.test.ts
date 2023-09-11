import {combinedCollectionPattern, dynamicStringPattern} from "../../features/configuration/util/ValidationUtil";


test('It should validate dynamicStringPattern references', () => {
    expect(dynamicStringPattern.test('$if{test}')).toBe(true)
    expect(dynamicStringPattern.test('$if{test')).toBe(false)
    expect(dynamicStringPattern.test('title $if{test}')).toBe(true)
    expect(dynamicStringPattern.test('title $if{test')).toBe(false)
    expect(dynamicStringPattern.test('title $if{test} $if{test2}')).toBe(true)
    expect(dynamicStringPattern.test('title $if{test} $if{test2')).toBe(false)
});

test('It should validate combinedCollectionPattern references', () => {
    expect(combinedCollectionPattern.test('$if{test}')).toBe(true)
    expect(combinedCollectionPattern.test('$icf{0}{test}')).toBe(true)
    expect(combinedCollectionPattern.test('$if{test}$icf{0}{test}')).toBe(false)
    expect(combinedCollectionPattern.test('$icf{0}{test')).toBe(false)
    expect(combinedCollectionPattern.test('$if{test')).toBe(false)
});