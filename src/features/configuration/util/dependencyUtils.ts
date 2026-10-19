import { useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { IDependency, IValuePredicate } from '../types/FormTemplate';
import { getAbsoluteKeyFromValueRef } from './keyUtils';

/**
 * Watches form fields referenced by `dependency` and returns whether it is currently satisfied.
 * Optional `onChange` is called whenever that boolean changes.
 */
export function useDependencySatisfied(
    absoluteKey: string,
    dependency: IDependency,
    onChange?: (satisfied: boolean) => void
): boolean {
    const { control } = useFormContext();
    const [satisfied, setSatisfied] = useState<boolean>(false);

    const valueRefByFormPath: Record<string, string> = createValueRefByFormPath(
        absoluteKey,
        dependency
    );
    const formPaths: string[] = Object.keys(valueRefByFormPath);

    const watchedValues: string[] = useWatch({
        control: control,
        name: formPaths,
    });

    useEffect(() => {
        const valuePerValueRef: Record<string, string> = {};
        for (let i = 0; i < formPaths.length; i++) {
            valuePerValueRef[valueRefByFormPath[formPaths[i]]] = watchedValues[i];
        }

        const nextSatisfied = isDependencySatisfied(valuePerValueRef, dependency);
        setSatisfied(nextSatisfied);
        if (onChange) {
            onChange(nextSatisfied);
        }
    }, [watchedValues]);

    return satisfied;
}

export function isDependencySatisfied(
    valuePerValueRef: Record<string, string>,
    dependency: IDependency
): boolean {
    return dependency.hasAnyCombination.some((combination: IValuePredicate[]) =>
        getCombinationValue(valuePerValueRef, combination)
    );
}

function createValueRefByFormPath(
    absoluteKey: string,
    dependency: IDependency
): Record<string, string> {
    return dependency.hasAnyCombination.flat().reduce(
        (valueRefByFormPath: Record<string, string>, predicate: IValuePredicate) => {
            valueRefByFormPath[getAbsoluteKeyFromValueRef(predicate.key, absoluteKey)] =
                predicate.key;
            return valueRefByFormPath;
        },
        {}
    );
}

export function getCombinationValue(
    valuePerValueRef: Record<string, string>,
    combination: IValuePredicate[]
): boolean {
    const predicateResults: boolean[] = combination.map((predicate: IValuePredicate) =>
        getPredicateValue(valuePerValueRef, predicate)
    );
    return !predicateResults.includes(false);
}

export function getPredicateValue(
    valuePerValueRef: Record<string, string>,
    predicate: IValuePredicate
): boolean {
    const value: string = valuePerValueRef[predicate.key];
    if (predicate.defined !== (value !== undefined)) {
        return false;
    }
    if (predicate.value !== undefined && predicate.value !== value) {
        return false;
    }
    return !(predicate.notValue !== undefined && predicate.notValue === value);
}
