import {toErrorType} from "./mapping/helpers/ToErrorType";
import {IError, IErrorArg} from "../../features/instances/types/Event";
import {ErrorType} from "../../features/instances/types/ErrorType";

const DETAIL_ARG_TYPES = ['errorMessage', 'message'];

export function errorStringReplace(baseString: string, errorArgs: IErrorArg[]) {
    let errorString = baseString;
    let helpString: string;
    const errorTypes = [
        ErrorType.INSTANCE_FIELD_KEY,
        ErrorType.ERROR_MESSAGE,
        ErrorType.MESSAGE,
        ErrorType.FIELD_PATH,
        ErrorType.NAME,
        ErrorType.MEDIA_TYPE,
        ErrorType.VALUE_CONVERTING_ID,
        ErrorType.VALUE_CONVERTING_KEY
        
    ]

    errorTypes.map(errorType => {
        errorArgs.map(arg => {
            if (toErrorType(arg.type) === errorType && arg.value !== undefined) {
                helpString = errorString.replace(errorType, arg.value)
                return errorString = helpString
            }    
        })
    })
    return errorString;
}

function isStandaloneDetailTemplate(template: string, placeholder: string): boolean {
    const escapedPlaceholder = placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`:\\s*['"]?${escapedPlaceholder}['"]?\\s*$`).test(template);
}

export function getErrorDisplayParts(
    template: string,
    errorArgs: IErrorArg[]
): { intro: string; detail?: string } {
    const detailArg = errorArgs.find((arg) => DETAIL_ARG_TYPES.includes(arg.type));
    if (!detailArg) {
        return { intro: errorStringReplace(template, errorArgs) };
    }

    const placeholder = toErrorType(detailArg.type);
    if (!template.includes(placeholder) || !isStandaloneDetailTemplate(template, placeholder)) {
        return { intro: errorStringReplace(template, errorArgs) };
    }

    const introTemplate = template
        .replace(new RegExp(`\\s*['"]?${placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"]?`), '')
        .trim();

    const intro = errorStringReplace(
        introTemplate,
        errorArgs.filter((arg) => arg.type !== detailArg.type)
    );

    return {
        intro,
        detail: detailArg.value,
    };
}

export function getErrorArgs(error: IError): IErrorArg[] {
    if (!error.args) {
        return []
    }
    const entries: [string, string][] = Object.entries(error.args)
    return entries.map(entry => {
        return {
            type: entry[0],
            value: entry[1]
        }
    })
}