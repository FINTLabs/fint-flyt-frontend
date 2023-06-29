import {ErrorType} from "../../../features/instanceOverview/types/ErrorType";

export function toErrorType(type: string): string {
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
