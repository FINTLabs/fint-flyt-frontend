import {SelectableValueType} from "../types/FormTemplate";
import {ValidationRule} from "react-hook-form";
import {Type} from "../components/mapping/value/DynamicStringOrSearchSelectValueComponent";
import {ValueType} from "../types/Configuration";

export const numberPattern = /\d+/;
export const valueConverterReferencePattern = new RegExp(`\\$vc\\{${numberPattern.source}\\}`);

export const instanceValueKeyPattern = new RegExp("(?:(?!\\$if\\{).)+");
export const ifReferencePattern = new RegExp(`(?:\\$if\\{${instanceValueKeyPattern.source}\\})*`);
export const instanceCollectionFieldReferencePattern = new RegExp(`\\$icf\\{${numberPattern.source}\\}\\{${instanceValueKeyPattern.source}\\}`);

export const valueConvertingPattern = new RegExp(`^${valueConverterReferencePattern.source}(${ifReferencePattern.source}|${instanceCollectionFieldReferencePattern.source})$`);

export const textPattern = new RegExp("(?:(?!\\$if\\{).)*");

export const dynamicStringPattern = new RegExp(`^(?:${textPattern.source}|${ifReferencePattern.source})*$`);

export function getRegexFromType(type: ValueType | SelectableValueType | Type, completed: boolean, collection?: boolean): ValidationRule<RegExp> | undefined {
    console.log(completed)
    if (!completed) {
        return undefined
    }
    if (collection) {
        if (type === ValueType.DYNAMIC_STRING) {
            return {
                value: ifReferencePattern,
                message: 'Oppfyller ikke påkrevd format'
            }
        }
    }
    if (type === ValueType.DYNAMIC_STRING) {
        return {
            value: dynamicStringPattern,
            message: 'Oppfyller ikke påkrevd format'
        }
    }
    if (type === ValueType.VALUE_CONVERTING) {
        return {
            value: valueConvertingPattern,
            message: 'Oppfyller ikke påkrevd format for verdikonvertering'
        }
    }
    if (type === ValueType.FILE) {
        return {
            value: dynamicStringPattern,
            message: 'Oppfyller ikke påkrevd filformat'
        }
    }

    if (type === SelectableValueType.DYNAMIC_STRING_OR_SEARCH_SELECT) {
        return {
            value: dynamicStringPattern,
            message: 'Oppfyller ikke påkrevd format'
        }
    }
    if (type === SelectableValueType.DROPDOWN) {
        return undefined
    } else return undefined
}