import {ErrorType, getErrorType} from "../log/types/ErrorType";
import {IError, IErrorArg} from "../log/types/Event";

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
            if (getErrorType(arg.type) === errorType && arg.value !== undefined) {
                helpString = errorString.replace(errorType, arg.value)
                return errorString = helpString
            }
            return errorArgs;
        })
        return errorTypes;
    })
    return errorString;
}

export function extractTags(sentence: string, first: string, last: string): string[] {
    let tags: string[] = [];
    const splitString = sentence.split(first);
    splitString.forEach((subStr: string) => {
        if (subStr.indexOf(last) > -1) {
            const toSave = (subStr.split(last))[0];
            tags = tags.concat(toSave);
        }
    });
    return tags;
}

export function getErrorArgs(error: IError): IErrorArg[] {
    if (!error.args) {
        return []
    }
    let entries: [string, string][] = Object.entries(error.args)
    return  entries.map(entry => {
        return {
            value: entry[0],
            type: entry[1]
        }
    })
}