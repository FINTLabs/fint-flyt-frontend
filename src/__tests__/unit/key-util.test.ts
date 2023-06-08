import {
    findFromCollectionMappingAbsoluteKeys,
    getAbsoluteKeyFromValueRef,
    isOutsideCollectionEditContext
} from "../../features/configuration/util/KeyUtils";

const valueRefString: string = 'testField';
const valueRefString2: string = '/testField';
const valueRefString3: string = '../../../testField';
const absoluteKey: string = 'mapping'

const editCollectionAbsoluteKey: string = 'mapping.objectMappingPerKey.newCase.objectCollectionMappingPerKey.journalpost.fromCollectionMappings.0.elementMapping.objectCollectionMappingPerKey.dokumentbeskrivelse.fromCollectionMappings.0'

const absoluteKeyInside: string = 'mapping.objectMappingPerKey.newCase.objectCollectionMappingPerKey.journalpost.fromCollectionMappings.0.elementMapping.objectCollectionMappingPerKey.dokumentbeskrivelse'
const editContextAbsoluteKey: string = 'mapping.objectMappingPerKey.newCase.objectCollectionMappingPerKey.journalpost.fromCollectionMappings.0.elementMapping.objectCollectionMappingPerKey.dokumentbeskrivelse.fromCollectionMappings.0'


const absoluteKeyOutside: string = 'mapping.objectMappingPerKey.newCase.objectCollectionMappingPerKey.journalpost.fromCollectionMappings.0.elementMapping.objectCollectionMappingPerKey.dokumentbeskrivelse.fromCollectionMappings.0'

describe('It should get correct absolute keys', () => {
    test('It should get correct Absolute Key From ValueRef', () => {
        const expected: string = 'mapping.valueMappingPerKey.testField.mappingString'
        expect(getAbsoluteKeyFromValueRef(valueRefString, absoluteKey)).toEqual(expected)
    });

    test('It should get correct Absolute Key From ValueRef starting with /', () => {
        const expected: string = '/testField'
        expect(getAbsoluteKeyFromValueRef(valueRefString2, absoluteKey)).toEqual(expected)
    });
    test('It should get correct Absolute Key From deep ValueRef', () => {
        const expected: string = '.testField.mappingString'
        expect(getAbsoluteKeyFromValueRef(valueRefString3, absoluteKey)).toEqual(expected)
    });
})




test('It should find From Collection Mapping Absolute Keys', () => {
    const expected: string[] = [
        "mapping.objectMappingPerKey.newCase.objectCollectionMappingPerKey.journalpost.fromCollectionMappings.0.",
        "mapping.objectMappingPerKey.newCase.objectCollectionMappingPerKey.journalpost.fromCollectionMappings.0.elementMapping.objectCollectionMappingPerKey.dokumentbeskrivelse.fromCollectionMappings.0"
    ]
    expect(findFromCollectionMappingAbsoluteKeys(editCollectionAbsoluteKey)).toEqual(expected)
});

test('It should return true if absolute key is inside Collection Edit Context', () => {
    expect(isOutsideCollectionEditContext(absoluteKeyInside, editContextAbsoluteKey)).toBe(true)
});

test('It should return false if absolute key is outside Collection Edit Context', () => {
    expect(isOutsideCollectionEditContext(absoluteKeyOutside, editContextAbsoluteKey)).toBe(false)
});
