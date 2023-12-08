import {ErrorType} from "../../../features/instances/types/ErrorType";

export function toErrorType(type: string): string {
    switch (type) {
        case 'instanceFieldKey':
            return ErrorType.INSTANCE_FIELD_KEY
        case 'errorMessage':
            return ErrorType.ERROR_MESSAGE
        case 'fieldPath':
            return ErrorType.FIELD_PATH
        case 'message':
            return ErrorType.MESSAGE
        case 'name':
            return ErrorType.NAME
        case 'mediatype':
            return ErrorType.MEDIA_TYPE
        case 'valueConvertingId':
             return ErrorType. VALUE_CONVERTING_ID
        case 'valueConvertingKey':
             return ErrorType.VALUE_CONVERTING_KEY
        default:
            return ErrorType.UNKNOWN

    }
}
