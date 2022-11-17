import {IErrorArg, stringReplace} from "../../features/util/StringUtil";
import {ErrorType} from "../../features/log/types/ErrorType";

const testStrings: string[] = [
    "Valideringsfeil i mottak av instans, '#fieldPath# #errorMessage#'",
    "Mangler felt ‘#instanceFieldKey#’ i instans, som kreves for å sette felt i sak",
]
const errorArgs: IErrorArg[] = [
    {value: 'foo', type: ErrorType.FIELD_PATH},
    {value: 'bar', type: ErrorType.ERROR_MESSAGE},
    {value: 'qux', type: ErrorType.INSTANCE_FIELD_KEY},
]

test('It should show error messages correctly', () => {
    expect(stringReplace(testStrings[0], errorArgs)).toEqual("Valideringsfeil i mottak av instans, 'foo bar'")
    expect(stringReplace(testStrings[1], errorArgs)).toEqual("Mangler felt ‘qux’ i instans, som kreves for å sette felt i sak")
});
