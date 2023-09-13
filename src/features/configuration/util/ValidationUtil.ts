import {ValueType} from "../types/Configuration";

export const numberPattern = /\d+/;
export const valueConverterReferencePattern = new RegExp(`\\$vc\\{${numberPattern.source}\\}`);
export const instanceValueKeyPattern = new RegExp("(?:(?!\\$if\\{).)+");
export const ifReferencePattern = new RegExp(`(?:\\$if\\{${instanceValueKeyPattern.source}\\})*`);
export const textPattern = new RegExp("(?:(?!\\$if\\{).)*");
export const instanceCollectionFieldReferencePattern = new RegExp(`\\$icf\\{${numberPattern.source}\\}\\{${instanceValueKeyPattern.source}\\}`);
export const dynamicStringPattern = new RegExp(`^(?:${textPattern.source}|${ifReferencePattern.source}|${ifReferencePattern.source})*$`);

export const vcPattern = /^\$vc\{\d+\}((?:\$if\{(?:(?!\$if\{).)+\})*|\$icf\{\d+\}\{(?:(?!\$if\{).)+\})$/
export const combinedCollectionPattern = /^(?:(\$if\{[^}]+\})|(\$icf\{\d+}{[^}]+\}))$/;

export const hasValidFormat = (value: string, type: ValueType, completeCheck: boolean, collection?: boolean) => { //eslint-disable-line
    if (!completeCheck) {
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