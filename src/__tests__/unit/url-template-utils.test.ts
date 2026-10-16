import { ValueType } from '../../features/configuration/types/Configuration';
import { resolveSelectableInputType } from '../../features/configuration/util/urlTemplateUtils';

const referenceTemplate = {
    urlTemplate:
        'http://fint-arkiv-adapter-simulator:9090/arkiv/noark/arkivressurs/{identifierType}/{identifierValue}',
    identifierTypes: ['systemid', 'kildesystemid'],
};

const selectables = [
    {
        displayName: 'Saksansvarlig',
        value: 'https://kodeverk.no/arkiv/noark/systemid/ANSV',
    },
];

describe('resolveSelectableInputType', () => {
    it('keeps VALUE_CONVERTING and DYNAMIC_STRING from stored type', () => {
        expect(
            resolveSelectableInputType(
                ValueType.VALUE_CONVERTING,
                '$vc{1}$if{x}',
                selectables,
                referenceTemplate
            )
        ).toBe('VALUE_CONVERTING');
        expect(
            resolveSelectableInputType(
                ValueType.DYNAMIC_STRING,
                '$if{bnr}',
                selectables,
                referenceTemplate
            )
        ).toBe('DYNAMIC');
    });

    it('resolves STRING to SELECT when mappingString is a selectable option', () => {
        expect(
            resolveSelectableInputType(
                ValueType.STRING,
                'https://kodeverk.no/arkiv/noark/systemid/ANSV',
                selectables,
                referenceTemplate
            )
        ).toBe('SELECT');
    });

    it('resolves STRING to URL_TEMPLATE when mappingString matches referenceTemplate', () => {
        expect(
            resolveSelectableInputType(
                ValueType.STRING,
                'http://fint-arkiv-adapter-simulator:9090/arkiv/noark/arkivressurs/systemid/test123',
                selectables,
                referenceTemplate
            )
        ).toBe('URL_TEMPLATE');
    });

    it('resolves STRING to DYNAMIC when mappingString matches neither', () => {
        expect(
            resolveSelectableInputType(
                ValueType.STRING,
                'custom free text',
                selectables,
                referenceTemplate
            )
        ).toBe('DYNAMIC');
    });

    it('defaults empty STRING to SELECT', () => {
        expect(
            resolveSelectableInputType(ValueType.STRING, '', selectables, referenceTemplate)
        ).toBe('SELECT');
        expect(
            resolveSelectableInputType(ValueType.STRING, null, selectables, referenceTemplate)
        ).toBe('SELECT');
    });
});
