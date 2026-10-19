import {ValueType} from "../types/Configuration";


export const vcPattern = /^\$vc\{\d+}((?:\$if\{(?:(?!\$if\{).)+})*|\$icf\{\d+}\{(?:(?!\$if\{).)+})$/
export const combinedCollectionPattern = /^(?:(\$if\{[^}]+})|(\$icf\{\d+}{[^}]+}))$/;

/** URL templates must include both identifierType and identifierValue (no empty path segments). */
export const isValidUrlTemplateValue = (value: string | undefined): boolean => {
    if (!value) {
        return false;
    }
    try {
        const { pathname } = new URL(value);
        if (pathname.includes('//') || pathname.endsWith('/')) {
            return false;
        }
        return pathname.split('/').filter(Boolean).length >= 2;
    } catch {
        return false;
    }
};

export const hasValidFormat = (value: string | undefined, type: ValueType, completeCheck: boolean, collection?: boolean) => {
    // Always validate URL templates — incomplete identifiers must not be saved.
    if (type === ValueType.URL_TEMPLATE) {
        return isValidUrlTemplateValue(value);
    }

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