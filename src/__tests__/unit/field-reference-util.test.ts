import {
    extractCollectionFieldReferenceIndexAndKey, extractFieldReferenceKey, isCollectionFieldReference,
    isFieldReference
} from "../../features/configuration/util/FieldReferenceUtils";

describe('isFieldReference', () => {
    it('returns true for valid field references', () => {
        const reference = '$if{fieldName}';
        const result = isFieldReference(reference);
        expect(result).toBe(true);
    });

    it('returns false for invalid field references', () => {
        const reference = '$invalid{fieldName}';
        const result = isFieldReference(reference);
        expect(result).toBe(false);
    });
});

describe('extractFieldReferenceKey', () => {
    it('returns the field reference key', () => {
        const reference = '$if{fieldName}';
        const result = extractFieldReferenceKey(reference);
        expect(result).toBe('fieldName');
    });
});

describe('isCollectionFieldReference', () => {
    it('returns true for valid collection field references', () => {
        const reference = '$icf{1}{fieldName}';
        const result = isCollectionFieldReference(reference);
        expect(result).toBe(true);
    });

    it('returns false for invalid collection field references', () => {
        const reference = '$invalid{fieldName}';
        const result = isCollectionFieldReference(reference);
        expect(result).toBe(false);
    });
});

describe('extractCollectionFieldReferenceIndexAndKey', () => {
    it('returns the collection field reference index and key', () => {
        const reference = '$icf{1}{fieldName}';
        const result = extractCollectionFieldReferenceIndexAndKey(reference);
        expect(result).toEqual([1, 'fieldName']);
    });
});
