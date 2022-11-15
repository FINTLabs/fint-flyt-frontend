import {IDependency} from "../../types/Accordion";
import {newIConfiguration} from "../../types/Configuration";
import {IFieldValue} from "../../types/InputField";
import {FieldErrors} from "react-hook-form";

export function toHiddenProp(dep: IDependency, watcher: Function, activeConfig?: newIConfiguration | undefined): boolean {
    if(dep.type === "FIELD") {
        return watcher(dep.key) === dep.value;
    }
    if(dep.type === 'NOT_FIELD') {
        return watcher(dep.key) !== dep.value
    }
    if(dep.type === 'BOOLEAN_FIELD') {
        return watcher(dep.key) === JSON.parse(dep.value)
    }
    else if(dep.type === "STATE") {
        return !!activeConfig?.completed
    }
    else {
        return false
    }
}

export function toExpandedProp(dep: IDependency, activeConfig: newIConfiguration | undefined): boolean {
    if (dep.key === 'null') {
        return JSON.parse(dep.value)
    }
    else if(dep.key === 'completed') {
        return !!activeConfig?.completed
    }
    else {
        return false
    }
}

export function toDisabledProp(dep: IDependency, activeConfig: newIConfiguration | undefined): boolean {
    if (dep.key === 'null') {
        return JSON.parse(dep.value)
    }
    else if(dep.key === 'disabled') {
        return !!activeConfig?.completed
    }
    else {
        return false
    }
}

export function toRequiredProps(dep: IDependency, watcher: Function, activeConfig: newIConfiguration | undefined, completeCheck: boolean): boolean {
    if(dep.type === "FIELD") {
        return watcher(dep.key) === dep.value;
    }
    if(dep.type === "VALIDATION" && dep.value === "true") {
        return completeCheck;
    }
    if(dep.type === 'BOOLEAN_FIELD') {
        return watcher(dep.key) === JSON.parse(dep.value)
    }
    else if(dep.type === 'NOT_FIELD') {
        return watcher(dep.key) !== dep.value
    }
    else if(dep.type === "STATE") {
        return !!activeConfig?.completed
    }
    else if (dep.key === 'null') {
        return JSON.parse(dep.value)
    }
    else if(dep.key === 'disabled') {
        return !!activeConfig?.completed
    }
    else {
        return false
    }
}

export function toRequiredProp(deps: IDependency[], watcher: Function, activeConfig: newIConfiguration, completeCheck: boolean): boolean {
    let list: boolean[] = []
    deps.map(dep => {
        list.push(toRequiredProps(dep, watcher, activeConfig, completeCheck))
    })
    return list.every(Boolean);
}

export function toValueByFormData(input: IFieldValue, activeFormData: any, watcher: Function) {
    if(input.source === "FORM") {
        let valueField = input.value.split('.');
        return (activeFormData?.[valueField[0]]?.[valueField[1]])
    }
    else {
        return watcher(input.value)
    }
}

//TODO: support deeper nested
export function toErrorProp(error: string, fieldErrors: FieldErrors) {
    let errorField = error.split('.');
    return (fieldErrors?.[errorField[0]]?.[errorField[1]])
}