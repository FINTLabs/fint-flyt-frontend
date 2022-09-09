export function stringReplace(baseString: string, errorArgs: IErrorArg[]) {
    let errorString = baseString;
    let helpString: string;

    errorArgs.map(arg => {
        if (arg.type === ErrorType.INSTANCE_FIELD && arg.value !== undefined) {
            helpString = errorString.replace(ErrorType.INSTANCE_FIELD, arg.value)
            errorString = helpString
        }
        if (arg.type === ErrorType.MAPPING_FIELD && arg.value !== undefined) {
            helpString = errorString.replace(ErrorType.MAPPING_FIELD, arg.value)
            errorString = helpString
        }
        if (arg.type === ErrorType.CONFIGURATION_FIELD && arg.value !== undefined) {
            helpString = errorString.replace(ErrorType.CONFIGURATION_FIELD, arg.value)
            errorString = helpString;
        }
        if (arg.type === ErrorType.STATUS && arg.value !== undefined) {
            helpString = errorString.replace(ErrorType.STATUS, arg.value)
            errorString = helpString
        }
        if (arg.type === ErrorType.ERROR_MESSAGE && arg.value !== undefined) {
            helpString = errorString.replace(ErrorType.ERROR_MESSAGE, arg.value)
            errorString = helpString
        }
        if (arg.type === ErrorType.FIELD_PATH && arg.value !== undefined) {
            helpString = errorString.replace(ErrorType.FIELD_PATH, arg.value)
            errorString = helpString
        }
    })
    return errorString;
}

interface IErrorArg {
    type: string,
    value: string
}

export const ErrorType = {
    INSTANCE_FIELD : '#instanceField#',
    MAPPING_FIELD : '#mappingField#',
    CONFIGURATION_FIELD : '#configurationField#',
    STATUS : '#status#',
    ERROR_MESSAGE : '#errorMessage#',
    FIELD_PATH : '#fieldPath#',
}
