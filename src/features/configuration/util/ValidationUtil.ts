import {ValueType} from "../types/FormTemplate";
import {ValidationRule} from "react-hook-form";

export const numberPattern = /\d+/;
export const valueConverterReferencePattern = new RegExp(`\\$vc\\{${numberPattern.source}\\}`);

export const instanceValueKeyPattern = /(?:(?!\$if\\{).)+/;
export const ifReferencePattern = new RegExp(`\\$if\\{${instanceValueKeyPattern.source}\\}`);
export const instanceCollectionFieldReferencePattern = new RegExp(`\\$icf\\{${numberPattern.source}\\}\\{${instanceValueKeyPattern.source}\\}`);

export const valueConvertingPattern = new RegExp(`^${valueConverterReferencePattern.source}(${ifReferencePattern.source}|${instanceCollectionFieldReferencePattern.source})$`);


export function getRegexFromType(type: ValueType, collection?: boolean): ValidationRule<RegExp> | undefined {
    if(collection) {
        if (type === ValueType.DYNAMIC_STRING) {
            return {
                value: ifReferencePattern,
                message: 'Oppfyller ikke påkrevd format'
            }
        }
    }
    if (type === ValueType.DYNAMIC_STRING) {
        return {
            value: ifReferencePattern,
            message: 'Oppfyller ikke påkrevd format'
        }
    }
    if (type === ValueType.FILE) {
        return {
            value: /^([^0-9]*)$/,
            message: 'Oppfyller ikke påkrevd filformat'
        }
    } else return undefined
}