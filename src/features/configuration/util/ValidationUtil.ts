import {ValueType} from "../types/FormTemplate";
import {ValidationRule} from "react-hook-form";

export function getRegexFromType(type: ValueType): ValidationRule<RegExp> | undefined {
    if (type === ValueType.DYNAMIC_STRING) {
        return {
            value: /^([^0-9]*)$/,
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