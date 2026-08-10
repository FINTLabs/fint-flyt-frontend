import {errorStringReplace, getErrorArgs, getErrorDisplayParts} from "../../util/StringUtil";
import {IError, IErrorArg} from "../../features/instances/types/Event";

const testErrorArgs: Record<string, string> = {
    'instanceFieldKey': 'form.title',
    'fieldPath': 'Here is the error, and ',
    'errorMessage': 'On a scale of 1-10 my friend, you\'re f\'ed',
    'message': 'Ingen støtte for dette domenet'
}

const testError: IError = {
    id: '1',
    errorCode: '',
    args: testErrorArgs
}

const resultingErrorArgs: IErrorArg[] = [
    {value: 'form.title', type: 'instanceFieldKey'},
    {value: 'Here is the error, and ', type: 'fieldPath'},
    {value: 'On a scale of 1-10 my friend, you\'re f\'ed', type: 'errorMessage'},
    {value: 'Ingen støtte for dette domenet', type: 'message'}

]

const testStrings: string[] = [
    "Valideringsfeil i mottak av instans, '#fieldPath# #errorMessage#'",
    "Mangler felt ‘#instanceFieldKey#’ i instans, som kreves for å sette felt i sak",
    "Instansen ble avvist av destinasjon med følgende feilmelding: '#errorMessage#'",
    "Instans avvist, '#message#'",
    "Feil under opplasting av fil, filnavn: '#name#' med mediatype: '#mediatype#'",
    "Feil under verdikonvertering, finner ikke nøkkel: '#valueConvertingKey#', i verdikonvertering med ID: #valueConvertingId#"
]
const errorArgs: IErrorArg[] = [
    {value: 'foo', type: 'fieldPath'},
    {value: 'bar', type: 'errorMessage'},
    {value: 'qux', type: 'instanceFieldKey'},
    {value: 'fil.docx', type: 'name'},
    {value: 'app/docx', type: 'mediatype'},
    {value: '5', type: 'valueConvertingId'},
    {value: 'image/jpg', type: 'valueConvertingKey'},
]

test('It should create errorArgs list correctly', () => {
    expect(getErrorArgs(testError)).toEqual(resultingErrorArgs);
});

test('It should show error messages correctly', () => {
    expect(errorStringReplace(testStrings[0], errorArgs)).toEqual("Valideringsfeil i mottak av instans, 'foo bar'")
    expect(errorStringReplace(testStrings[1], errorArgs)).toEqual("Mangler felt ‘qux’ i instans, som kreves for å sette felt i sak")
    expect(errorStringReplace(testStrings[2], resultingErrorArgs)).toEqual("Instansen ble avvist av destinasjon med følgende feilmelding: 'On a scale of 1-10 my friend, you're f'ed'")
    expect(errorStringReplace(testStrings[3], resultingErrorArgs)).toEqual("Instans avvist, 'Ingen støtte for dette domenet'")
    expect(errorStringReplace(testStrings[4], errorArgs)).toEqual("Feil under opplasting av fil, filnavn: 'fil.docx' med mediatype: 'app/docx'")
    expect(errorStringReplace(testStrings[5], errorArgs)).toEqual("Feil under verdikonvertering, finner ikke nøkkel: 'image/jpg', i verdikonvertering med ID: 5")    
});

test('It should split standalone error message templates into intro and detail', () => {
    const parts = getErrorDisplayParts(testStrings[2], resultingErrorArgs);

    expect(parts.intro).toEqual('Instansen ble avvist av destinasjon med følgende feilmelding:');
    expect(parts.detail).toEqual("On a scale of 1-10 my friend, you're f'ed");
});

test('It should keep the full error message detail without stripping text', () => {
    const raw =
        "Sak was declined by the destination with message='{\"message\":\"Client received SOAP Fault from server: Du er er ikke autorisert for denne tilgangskoden Please see the server log to find more detail regarding exact cause of the failure.\",\"responseStatus\":\"ERROR\"}'";
    const parts = getErrorDisplayParts(testStrings[2], [{ type: 'errorMessage', value: raw }]);

    expect(parts.detail).toEqual(raw);
});

test('It should keep combined placeholders in a single line', () => {
    const parts = getErrorDisplayParts(testStrings[0], errorArgs);

    expect(parts.detail).toBeUndefined();
    expect(parts.intro).toEqual("Valideringsfeil i mottak av instans, 'foo bar'");
});
