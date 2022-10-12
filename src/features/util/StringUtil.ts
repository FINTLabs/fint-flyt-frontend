import {ErrorType} from "../log/types/ErrorType";

export function stringReplace(baseString: string, errorArgs: IErrorArg[]) {
    let errorString = baseString;
    let helpString: string;
    const errorTypes = [
        ErrorType.INSTANCE_FIELD,
        ErrorType.CONFIGURATION_FIELD,
        ErrorType.MAPPING_FIELD,
        ErrorType.STATUS,
        ErrorType.ERROR_MESSAGE,
        ErrorType.FIELD_PATH,
    ]
    errorTypes.map(errorType => {
        errorArgs.map(arg => {
            if (arg.type === errorType && arg.value !== undefined) {
                helpString = errorString.replace(errorType, arg.value)
                errorString = helpString
            }
        })
    })
    return errorString;
}

export interface IErrorArg {
    type: string,
    value: string
}
