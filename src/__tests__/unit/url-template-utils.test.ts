import { ValueType } from '../../features/configuration/types/Configuration';
import {
    getInitialIdentifiers,
    matchesReferenceTemplate,
    resolveSelectableInputType,
} from '../../features/configuration/util/urlTemplateUtils';

const referenceTemplate = {
    urlTemplate:
        'http://fint-arkiv-adapter-simulator:9090/arkiv/noark/arkivressurs/{identifierType}/{identifierValue}',
    identifierTypes: ['systemid', 'kildesystemid'],
};

const arkivdelReferenceTemplate = {
    urlTemplate:
        'http://fint-arkiv-adapter-simulator:9090/arkiv/noark/arkivdel/{identifierType}/{identifierValue}',
    identifierTypes: ['systemid'],
};

const selectables = [
    {
        displayName: 'Saksansvarlig',
        value: 'https://kodeverk.no/arkiv/noark/systemid/ANSV',
    },
];

describe('getInitialIdentifiers', () => {
    it('parses identifier type and value from a matching selected value', () => {
        expect(
            getInitialIdentifiers(
                'http://fint-arkiv-adapter-simulator:9090/arkiv/noark/arkivressurs/kildesystemid/test123',
                referenceTemplate
            )
        ).toEqual({
            identifierType: 'kildesystemid',
            identifierValue: 'test123',
        });
    });

    it('parses identifiers from a selectable path that only matches the template suffix', () => {
        expect(
            getInitialIdentifiers(
                'https://kodeverk.no/arkiv/noark/arkivressurs/systemid/ANSV',
                referenceTemplate
            )
        ).toEqual({
            identifierType: 'systemid',
            identifierValue: 'ANSV',
        });
    });

    it('falls back when path has too few segments for type and value', () => {
        // Legacy value: fixed resource name + id only — must not treat "arkivdel" as identifierType
        expect(getInitialIdentifiers('/arkiv/noark/arkivdel/ARK-1', arkivdelReferenceTemplate)).toEqual({
            identifierType: 'systemid',
            identifierValue: '',
        });
    });

    it('falls back when parsed type is not in identifierTypes', () => {
        expect(
            getInitialIdentifiers(
                'http://fint-arkiv-adapter-simulator:9090/arkiv/noark/arkivressurs/ukjent/test123',
                referenceTemplate
            )
        ).toEqual({
            identifierType: 'systemid',
            identifierValue: '',
        });
    });

    it('falls back to the first identifier type when selected value is empty', () => {
        expect(getInitialIdentifiers('', referenceTemplate)).toEqual({
            identifierType: 'systemid',
            identifierValue: '',
        });
        expect(getInitialIdentifiers(null, referenceTemplate)).toEqual({
            identifierType: 'systemid',
            identifierValue: '',
        });
        expect(getInitialIdentifiers(undefined, referenceTemplate)).toEqual({
            identifierType: 'systemid',
            identifierValue: '',
        });
    });

    it('falls back to the first identifier type when selected value does not match the template', () => {
        expect(getInitialIdentifiers('custom free text', referenceTemplate)).toEqual({
            identifierType: 'systemid',
            identifierValue: '',
        });
    });

    it('returns undefined type when referenceTemplate has no identifierTypes', () => {
        expect(
            getInitialIdentifiers('anything', {
                urlTemplate: referenceTemplate.urlTemplate,
                identifierTypes: [],
            })
        ).toEqual({
            identifierType: undefined,
            identifierValue: '',
        });
    });

    it('returns undefined type when referenceTemplate is missing', () => {
        expect(getInitialIdentifiers('anything', null)).toEqual({
            identifierType: undefined,
            identifierValue: '',
        });
        expect(getInitialIdentifiers('anything', undefined)).toEqual({
            identifierType: undefined,
            identifierValue: '',
        });
    });
});

describe('matchesReferenceTemplate', () => {
    it('returns false for legacy paths that omit identifierType', () => {
        expect(matchesReferenceTemplate('/arkiv/noark/arkivdel/ARK-1', arkivdelReferenceTemplate)).toBe(
            false
        );
    });

    it('returns true for a complete URL with an allowed identifier type', () => {
        expect(
            matchesReferenceTemplate(
                'http://fint-arkiv-adapter-simulator:9090/arkiv/noark/arkivdel/systemid/ARK-1',
                arkivdelReferenceTemplate
            )
        ).toBe(true);
    });

    it('returns false when identifier type is not allowed', () => {
        expect(
            matchesReferenceTemplate(
                'http://fint-arkiv-adapter-simulator:9090/arkiv/noark/arkivdel/kildesystemid/ARK-1',
                arkivdelReferenceTemplate
            )
        ).toBe(false);
    });
});

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

    it('resolves legacy arkivdel path to DYNAMIC so existing values are unchanged', () => {
        expect(
            resolveSelectableInputType(
                ValueType.STRING,
                '/arkiv/noark/arkivdel/ARK-1',
                [],
                arkivdelReferenceTemplate
            )
        ).toBe('DYNAMIC');
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
