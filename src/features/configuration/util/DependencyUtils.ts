import {IDependency, IValuePredicate} from "../types/FormTemplate";
import {useEffect, useState} from "react";
import {useFormContext, useWatch} from "react-hook-form";
import {getAbsoluteKeyFromValueRef} from "./KeyUtils";

export function DependencySatisfiedStatefulValue(absoluteKey: string, dependency: IDependency): boolean {
    const {control} = useFormContext();
    const [dependencyValue, setDependencyValue] = useState<boolean>(false);

    const valueRefPerAbsoluteKey: Record<string, string> = createValueRefPerAbsoluteKey(absoluteKey, dependency);
    const absoluteKeys: string[] = Object.keys(valueRefPerAbsoluteKey)

    const predicateValuesWatch: string[] = useWatch({
        control: control,
        name: absoluteKeys
    })

    useEffect(() => {
        const valuePerValueRef: Record<string, string> = {}
        for (let i = 0; i < absoluteKeys.length; i++) {
            valuePerValueRef[valueRefPerAbsoluteKey[absoluteKeys[i]]] = predicateValuesWatch[i]
        }

        const combinationValues: boolean[] = dependency.hasAnyCombination
            .map((combination: IValuePredicate[]) => getCombinationValue(
                valuePerValueRef, combination
            ))
        setDependencyValue(combinationValues.includes(true))

    }, [predicateValuesWatch])

    return dependencyValue;
}

function createValueRefPerAbsoluteKey(absoluteKey: string, dependency: IDependency): Record<string, string> {
    return dependency.hasAnyCombination
        .flat()
        .reduce((valueAbsoluteKeysPerRef: Record<string, string>, predicate: IValuePredicate) => {
                valueAbsoluteKeysPerRef[getAbsoluteKeyFromValueRef(
                    "valueMappingPerKey." +
                    predicate.key +
                    ".mappingString", absoluteKey
                )] = predicate.key;
                return valueAbsoluteKeysPerRef
            },
            {}
        )
}

function getCombinationValue(valuePerValueRef: Record<string, string>, combination: IValuePredicate[]): boolean {
    const predicateValues: boolean[] = combination
        .map((predicate: IValuePredicate) => getPredicateValue(
                valuePerValueRef,
                predicate
            )
        );
    return !predicateValues.includes(false);
}

function getPredicateValue(valuePerValueRef: Record<string, string>, predicate: IValuePredicate): boolean {
    // TODO eivindmorch 17/03/2023 : Change name from key to valueRef
    // TODO eivindmorch 17/03/2023 : Fix better ref to absolute key processing
    const value: string = valuePerValueRef[predicate.key];
    if (predicate.defined !== (value !== undefined)) {
        return false;
    }
    if (predicate.value !== undefined && predicate.value !== value) {
        return false;
    }
    if (predicate.notValue !== undefined && predicate.notValue === value) {
        return false;
    }
    return true;
}