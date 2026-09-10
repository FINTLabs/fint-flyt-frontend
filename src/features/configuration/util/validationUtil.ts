import {ValueType} from "../types/Configuration";


export const vcPattern = /^\$vc\{\d+}((?:\$if\{(?:(?!\$if\{).)+})*|\$icf\{\d+}\{(?:(?!\$if\{).)+})$/
export const combinedCollectionPattern = /^(?:(\$if\{[^}]+})|(\$icf\{\d+}{[^}]+}))$/;

export const hasValidFormat = (value: string | undefined, type: ValueType, completeCheck: boolean, collection?: boolean) => {
    if (!completeCheck) {
        return true
    }

    if(!value) {
        return true
    }

    if (collection && type === ValueType.DYNAMIC_STRING) {
        return combinedCollectionPattern.test(value)
    }

    if (type === ValueType.VALUE_CONVERTING) {
        return vcPattern.test(value)
    }

    if (type === ValueType.DYNAMIC_STRING) {
        const ifRefCount = (value.match(/\$if\{/g) || []).length
        const icfRefCount = (value.match(/\$icf\{\d+/g) || []).length
        if(ifRefCount > 0 && !value.includes('$icf')) {
            const ifRefCloserCount = (value.match(/}/g) || []).length
            return ifRefCount === ifRefCloserCount
        }
        else if (icfRefCount > 0 && !value.includes('$if')) {
            const icfRefCloserCount = (value.match(/}/g) || []).length
            return (icfRefCount*2) === icfRefCloserCount
        }
        return true
    }
    return true;
};