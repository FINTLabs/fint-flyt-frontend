import {ValueType} from "../types/Configuration";

export const numberPattern = /\d+/;
export const valueConverterReferencePattern = new RegExp(`\\$vc\\{${numberPattern.source}\\}`);
export const instanceValueKeyPattern = new RegExp("(?:(?!\\$if\\{).)+");
export const ifReferencePattern = new RegExp(`(?:\\$if\\{${instanceValueKeyPattern.source}\\})*`);
export const textPattern = new RegExp("(?:(?!\\$if\\{).)*");
export const instanceCollectionFieldReferencePattern = new RegExp(`\\$icf\\{${numberPattern.source}\\}\\{${instanceValueKeyPattern.source}\\}`);
export const dynamicStringPattern = new RegExp(`^(?:${textPattern.source}|${ifReferencePattern.source}|${ifReferencePattern.source})*$`);

export const icfPattern = /^\$vc\{\d+\}((?:\$if\{(?:(?!\$if\{).)+\})*|\$icf\{\d+\}\{(?:(?!\$if\{).)+\})$/
export const combinedCollectionPattern = /^(?:(\$if\{[^}]+\})|(\$icf\{\d+}{[^}]+\}))$/;

export const hasValidFormat = (value: string, type: ValueType, completeCheck: boolean, collection?: boolean) => { //eslint-disable-line
    if (!completeCheck) {
        return true
    }

    if (collection && type === ValueType.DYNAMIC_STRING) {
        return combinedCollectionPattern.test(value)
    }

    if (type === ValueType.VALUE_CONVERTING) {
        return icfPattern.test(value)
    }

    if (type === ValueType.DYNAMIC_STRING) {
        const ifRefCount = (value.match(/\$if\{/g) || []).length
        if(ifRefCount && ifRefCount > 0) {
            const ifRefCloserCount = (value.match(/}/g) || []).length
            return ifRefCount === ifRefCloserCount
        }
        return true
    }
    return true;
};