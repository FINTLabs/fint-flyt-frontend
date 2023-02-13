import {ErrorType} from "../log/types/ErrorType";

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
            if (arg.type === errorType && arg.value !== undefined) {
                helpString = errorString.replace(errorType, arg.value)
                return errorString = helpString
            }
            return errorArgs;
        })
        return errorTypes;
    })
    return errorString;
}

export interface IErrorArg {
    type: string,
    value: string
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