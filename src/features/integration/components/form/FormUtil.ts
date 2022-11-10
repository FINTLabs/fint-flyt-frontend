import {IDependency} from "../../types/Accordion";
import {newIConfiguration} from "../../types/Configuration";

export function toHiddenProp(dep: IDependency, watcher: Function, activeConfig?: newIConfiguration | undefined): boolean {
    if(dep.type === "FIELD") {
        return watcher(dep.key) === dep.value;
    }
    if(dep.type === 'NOT_FIELD') {
        return watcher(dep.key) !== dep.value
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
    if(dep.type === "VALIDATION") {
        return completeCheck;
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
    console.log(list)
    return list.every(Boolean);
}