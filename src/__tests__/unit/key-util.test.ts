import {
    findFromCollectionMappingAbsoluteKeys,
    getAbsoluteKeyFromValueRef,
    isOutsideCollectionEditContext,
} from '../../features/configuration/util/KeyUtils';

const valueRefString = 'testField';
const valueRefString3 = '../../../testField';
const absoluteKey = 'mapping';

const editCollectionAbsoluteKey =
    'mapping.objectMappingPerKey.newCase.objectCollectionMappingPerKey.journalpost.fromCollectionMappings.0.elementMapping.objectCollectionMappingPerKey.dokumentbeskrivelse.fromCollectionMappings.0';

const absoluteKeyInside =
    'mapping.objectMappingPerKey.newCase.objectCollectionMappingPerKey.journalpost.fromCollectionMappings.0.elementMapping.objectCollectionMappingPerKey.dokumentbeskrivelse';
const editContextAbsoluteKey =
    'mapping.objectMappingPerKey.newCase.objectCollectionMappingPerKey.journalpost.fromCollectionMappings.0.elementMapping.objectCollectionMappingPerKey.dokumentbeskrivelse.fromCollectionMappings.0';

const absoluteKeyOutside =
    'mapping.objectMappingPerKey.newCase.objectCollectionMappingPerKey.journalpost.fromCollectionMappings.0.elementMapping.objectCollectionMappingPerKey.dokumentbeskrivelse.fromCollectionMappings.0';

describe('It should get correct absolute keys', () => {
    test('It should get correct Absolute Key From ValueRef', () => {
        const expected = 'mapping.valueMappingPerKey.testField.mappingString';
        expect(getAbsoluteKeyFromValueRef(valueRefString, absoluteKey)).toEqual(expected);
    });

    test('It should get correct Absolute Key From deep ValueRef', () => {
        const expected = '.testField.mappingString';
        expect(getAbsoluteKeyFromValueRef(valueRefString3, absoluteKey)).toEqual(expected);
    });
});

test('It should find From Collection Mapping Absolute Keys', () => {
    const expected: string[] = [
        'mapping.objectMappingPerKey.newCase.objectCollectionMappingPerKey.journalpost.fromCollectionMappings.0.',
        'mapping.objectMappingPerKey.newCase.objectCollectionMappingPerKey.journalpost.fromCollectionMappings.0.elementMapping.objectCollectionMappingPerKey.dokumentbeskrivelse.fromCollectionMappings.0',
    ];
    expect(findFromCollectionMappingAbsoluteKeys(editCollectionAbsoluteKey)).toEqual(expected);
});

test('It should return true if absolute key is inside Collection Edit Context', () => {
    expect(isOutsideCollectionEditContext(absoluteKeyInside, editContextAbsoluteKey)).toBe(true);
});

test('It should return false if absolute key is outside Collection Edit Context', () => {
    expect(isOutsideCollectionEditContext(absoluteKeyOutside, editContextAbsoluteKey)).toBe(false);
});
