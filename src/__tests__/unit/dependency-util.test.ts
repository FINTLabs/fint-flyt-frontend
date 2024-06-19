import {getCombinationValue, getPredicateValue} from "../../features/configuration/util/DependencyUtils";
import {IValuePredicate} from "../../features/configuration/types/FormTemplate";

describe('test dependency utils', () => {
    it('getPredicateValue returns correct value', () => {
        const valuePerValueRef: Record<string, string> = {"absoluteKey": "keyString"}
        const predicateTrue: IValuePredicate =
            {key: "absoluteKey", defined: true, value: "keyString", notValue: undefined}
        const predicateFalse: IValuePredicate =
            {key: "absolutelyNotKey", defined: true, value: "keyString", notValue: undefined}
        const predicateNotValue: IValuePredicate =
            {key: "AbsKey", defined: true, value: undefined, notValue: "keyString"}
        expect(getPredicateValue(valuePerValueRef, predicateTrue)).toEqual(true)
        expect(getPredicateValue(valuePerValueRef, predicateFalse)).toEqual(false)
        expect(getPredicateValue(valuePerValueRef, predicateNotValue)).toEqual(false)
    });


    it('getCombinationValue returns correct value', () => {
        const valuePerValueRef: Record<string, string> = {"absoluteKey": "keyString", "absoluteSecondKey": "keyTwoString"}
        const combination: IValuePredicate[] = [
            {key: "absoluteKey", defined: true, value: "keyString", notValue: undefined},
            {key: "absoluteSecondKey", defined: true, value: "keyTwoString", notValue: "notThis"}
        ]
        const falseCombination: IValuePredicate[] = [
            {key: "absoluteKey", defined: true, value: "keyString", notValue: undefined},
            {key: "absoluteSecondKey", defined: true, value: "secondValue", notValue: "keyTwoString"}
        ]
        const combinationUndefined: IValuePredicate[] = [
            {key: "absoluteKey", defined: true, value: "keyString", notValue: undefined},
            {key: "absoluteSecondKey", defined: false, value: "keyTwoString", notValue: "notThis"}
        ]
        expect(getCombinationValue(valuePerValueRef, combination)).toEqual(true)
        expect(getCombinationValue(valuePerValueRef, falseCombination)).toEqual(false)
        expect(getCombinationValue(valuePerValueRef, combinationUndefined)).toEqual(false)
    });
});