import {
    hasValidFormat
} from "../../features/configuration/util/ValidationUtil";
import {ValueType} from "../../features/configuration/types/Configuration";

describe('it shpuld validate format', () => {
    test('It should return true when completeCheck is false', () =>  {
        expect(hasValidFormat('$if{test}', ValueType.DYNAMIC_STRING, false)).toBe(true)
        expect(hasValidFormat('$if{test}', ValueType.VALUE_CONVERTING, false)).toBe(true)
    });

    test('It should return correct boolean value validating dynamic string', () =>  {
        expect(hasValidFormat('$if{test}', ValueType.DYNAMIC_STRING, true)).toBe(true)
        expect(hasValidFormat('$if{test} test $if{test}', ValueType.DYNAMIC_STRING, true)).toBe(true)
        expect(hasValidFormat('$if{test test $if{test}', ValueType.DYNAMIC_STRING, true)).toBe(false)
        expect(hasValidFormat('$if{test} test $if{test', ValueType.DYNAMIC_STRING, true)).toBe(false)
        expect(hasValidFormat('just text, no tags', ValueType.DYNAMIC_STRING, true)).toBe(true)
        expect(hasValidFormat('text, shield and tags #$if{shielded}#', ValueType.DYNAMIC_STRING, true)).toBe(true)
    });


    test('It should return correct boolean value validating value converting', () =>  {
        expect(hasValidFormat('$if{test}', ValueType.VALUE_CONVERTING, true)).toBe(false)
        expect(hasValidFormat('$vc{2}$if{test}', ValueType.VALUE_CONVERTING, true)).toBe(true)
        expect(hasValidFormat('$vc{2}$if{test', ValueType.VALUE_CONVERTING, true)).toBe(false)
        expect(hasValidFormat('$vc{2$if{test}', ValueType.VALUE_CONVERTING, true)).toBe(false)
    });

    test('It should return correct boolean value validating collection', () =>  {
        expect(hasValidFormat('$if{test}', ValueType.DYNAMIC_STRING, true, true)).toBe(true)
        expect(hasValidFormat('$icf{4}{test}', ValueType.DYNAMIC_STRING, true, true)).toBe(true)
        expect(hasValidFormat('$icf{4{test}', ValueType.DYNAMIC_STRING, true, true)).toBe(false)
        expect(hasValidFormat('$if{test', ValueType.DYNAMIC_STRING, true, true)).toBe(false)
    });

    test('It should return true if there is no or undefined input value or boolean type', () =>  {
        expect(hasValidFormat(undefined, ValueType.DYNAMIC_STRING, true, true)).toBe(true)
        expect(hasValidFormat('', ValueType.DYNAMIC_STRING, true, true)).toBe(true)
        expect(hasValidFormat('$if{test', ValueType.BOOLEAN, true, true)).toBe(true)
    });

})
