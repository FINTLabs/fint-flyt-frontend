import {toErrorType} from "./mapping/helpers/ToErrorType";
import {IError, IErrorArg} from "../features/instances/types/Event";
import {ErrorType} from "../features/instances/types/ErrorType";

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