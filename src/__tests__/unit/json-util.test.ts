import {toInstanceCollectionFieldReference, toInstanceFieldReference} from "../../util/JsonUtil";

const tagString = 'fornavn';

const icfStrings = [
    'name', 'phone', 'address'
]

describe('It should set correct tags to fields', () => {
    test('It should return correct instance field tag from string', () => {
        const tag = toInstanceFieldReference(tagString)
        expect(tag).toEqual('$if{fornavn}');
    });

    test('It should return correct instance collection field tag from string', () => {
        const tag = toInstanceCollectionFieldReference(0, tagString)
        expect(tag).toEqual('$icf{0}{fornavn}');
    });

    test('It should return correct list of instance collection field tags from strings', () => {
        const tagList = icfStrings.map((string, index) => '$icf{' + index + '}{' + string + '}')
        toInstanceCollectionFieldReference(0, tagString)
        expect(tagList).toEqual(['$icf{0}{name}', '$icf{1}{phone}', '$icf{2}{address}']);
    });
})

