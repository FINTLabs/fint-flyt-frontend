import {ErrorType} from "../../../features/instanceOverview/types/ErrorType";

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
        default:
            return ErrorType.UNKNOWN

    }
}
