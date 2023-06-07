export const ErrorType = {
    INSTANCE_FIELD_KEY: '#instanceFieldKey#',
    ERROR_MESSAGE: '#errorMessage#',
    FIELD_PATH: '#fieldPath#',
    UNKNOWN: 'unknownErrorType'
}

export function getErrorType(type: string): string {
    if (type === 'instanceFieldKey') {
        return ErrorType.INSTANCE_FIELD_KEY
    }
    if (type === 'errorMessage') {
        return ErrorType.ERROR_MESSAGE
    }
    if (type === 'fieldPath') {
        return ErrorType.FIELD_PATH
    } else {
        return ErrorType.UNKNOWN
    }
}
