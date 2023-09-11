import {ValidationRule} from "react-hook-form";
import {ValueType} from "../types/Configuration";

export const numberPattern = /\d+/;
export const valueConverterReferencePattern = new RegExp(`\\$vc\\{${numberPattern.source}\\}`);

export const instanceValueKeyPattern = new RegExp("(?:(?!\\$if\\{).)+");
export const ifReferencePattern = new RegExp(`(?:\\$if\\{${instanceValueKeyPattern.source}\\})*`);


export const textPattern = new RegExp("(?:(?!\\$if\\{).)*");

export const dynamicStringPattern = new RegExp(`^(?:${textPattern.source}|${ifReferencePattern.source})*$`);
export const instanceCollectionFieldReferencePattern = new RegExp(`\\$icf\\{${numberPattern.source}\\}\\{${instanceValueKeyPattern.source}\\}`);


export const valueConvertingPattern = new RegExp(`^${valueConverterReferencePattern.source}(${ifReferencePattern.source}|${instanceCollectionFieldReferencePattern.source})$`);

export const combinedCollectionPattern = /^(?:(\$if\{[^}]+\})|(\$icf\{\d+}{[^}]+\}))$/;


export function getRegexFromType(type: ValueType, completed: boolean, collection?: boolean): ValidationRule<RegExp> | undefined {
    if (!completed) {
        return undefined
    }
    if (collection) {
        if (type === ValueType.DYNAMIC_STRING) {
            return {
                value: combinedCollectionPattern,
                message: 'Oppfyller ikke påkrevd format'
            }
        } else return undefined
    }

    switch (type) {
        case ValueType.DYNAMIC_STRING:
            return {
                value: dynamicStringPattern,
                message: 'Oppfyller ikke påkrevd format'
            }
        case ValueType.VALUE_CONVERTING:
            return {
                value: valueConvertingPattern,
                message: 'Oppfyller ikke påkrevd format for verdikonvertering'
            }
        case ValueType.FILE:
            type
            return {
                value: dynamicStringPattern,
                message: 'Oppfyller ikke påkrevd format'
            }
        case ValueType.BOOLEAN:
        case ValueType.STRING:
        case ValueType.URL:
        default:
            return undefined
    }
}