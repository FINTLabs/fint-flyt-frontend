import {errorStringReplace, getErrorArgs} from "../../util/StringUtil";
import {IError, IErrorArg} from "../../features/log/types/Event";

const testErrorArgs: Record<string, string> = {
    'instanceFieldKey': 'form.title',
    'fieldPath': 'Here is the error, and ',
    'errorMessage': 'On a scale of 1-10 my friend, you\'re f\'ed'
}

const testError: IError = {
    id: '1',
    errorCode: '',
    args: testErrorArgs
}

const resultingErrorArgs: IErrorArg[] = [
    {value: 'form.title', type: 'instanceFieldKey'},
    {value: 'Here is the error, and ', type: 'fieldPath'},
    {value: 'On a scale of 1-10 my friend, you\'re f\'ed', type: 'errorMessage'}
]

const testStrings: string[] = [
    "Valideringsfeil i mottak av instans, '#fieldPath# #errorMessage#'",
    "Mangler felt ‘#instanceFieldKey#’ i instans, som kreves for å sette felt i sak",
    "Instansen ble avvist av destinasjon med følgende feilmelding: '#errorMessage#'",
]
const errorArgs: IErrorArg[] = [
    {value: 'foo', type: 'fieldPath'},
    {value: 'bar', type: 'errorMessage'},
    {value: 'qux', type: 'instanceFieldKey'},
]

test('It should create errorArgs list correctly', () => {
    expect(getErrorArgs(testError)).toEqual(resultingErrorArgs);
});

test('It should show error messages correctly', () => {
    expect(errorStringReplace(testStrings[0], errorArgs)).toEqual("Valideringsfeil i mottak av instans, 'foo bar'")
    expect(errorStringReplace(testStrings[1], errorArgs)).toEqual("Mangler felt ‘qux’ i instans, som kreves for å sette felt i sak")
    expect(errorStringReplace(testStrings[2], resultingErrorArgs)).toEqual("Instansen ble avvist av destinasjon med følgende feilmelding: 'On a scale of 1-10 my friend, you\'re f\'ed'")
});
