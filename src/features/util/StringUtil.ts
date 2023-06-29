import {ErrorType} from "../instanceOverview/types/ErrorType";
import {IError, IErrorArg} from "../instanceOverview/types/Event";
import {toErrorType} from "./mapping/helpers/ToErrorType";

export function stringReplace(baseString: string, errorArgs: IErrorArg[]) {
    let errorString = baseString;
    let helpString: string;
    const errorTypes = [
        ErrorType.INSTANCE_FIELD_KEY,
        ErrorType.ERROR_MESSAGE,
        ErrorType.FIELD_PATH,
    ]
    errorTypes.map(errorType => {
        errorArgs.map(arg => {
            if (toErrorType(arg.type) === errorType && arg.value !== undefined) {
                helpString = errorString.replace(errorType, arg.value)
                return errorString = helpString
            }
            return errorArgs;
        })
        return errorTypes;
    })
    return errorString;
}

export function getErrorArgs(error: IError): IErrorArg[] {
    if (!error.args) {
        return []
    }
    const entries: [string, string][] = Object.entries(error.args)
    return  entries.map(entry => {
        return {
            type: entry[0],
            value: entry[1]
        }
    })
}