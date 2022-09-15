import {IErrorArg, stringReplace} from "../../features/util/StringUtil";
import {ErrorType} from "../../features/log/types/ErrorType";

const testStrings: string[] = [
    "Valideringsfeil i mottak av instans, '#fieldPath# #errorMessage#'",
    "Mangler felt '#mappingField#' for sakspost",
    "Mangler felt ‘#instanceField#’ i instans, som kreves for å sette felt ‘#configurationField#’ i sak",
    "Innsending av sak feilet med status '#status#'",
]
const errorArgs: IErrorArg[] = [
    {value: 'foo', type: ErrorType.FIELD_PATH},
    {value: 'bar', type: ErrorType.ERROR_MESSAGE},
    {value: 'bubu', type: ErrorType.MAPPING_FIELD},
    {value: 'baz', type: ErrorType.STATUS},
    {value: 'qux', type: ErrorType.INSTANCE_FIELD},
    {value: 'uwu', type: ErrorType.CONFIGURATION_FIELD}
]

test('It should show error messages correctly', () => {
    expect(stringReplace(testStrings[0], errorArgs)).toEqual("Valideringsfeil i mottak av instans, 'foo bar'")
    expect(stringReplace(testStrings[1], errorArgs)).toEqual("Mangler felt 'bubu' for sakspost")
    expect(stringReplace(testStrings[2], errorArgs)).toEqual("Mangler felt ‘qux’ i instans, som kreves for å sette felt ‘uwu’ i sak")
    expect(stringReplace(testStrings[3], errorArgs)).toEqual("Innsending av sak feilet med status 'baz'")
});
