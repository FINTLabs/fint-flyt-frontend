import {addId, toInstanceCollectionFieldReference, toInstanceFieldReference} from "../../features/util/JsonUtil";

const array = [
    {
        "name": "name0",
        "type": "INFO",
    }, {
        "name": "name1",
        "type": "ERROR",
    }
]
const nestedArray = [
    {
        "name": "name0",
        "type": "INFO",
        "errors": []
    }, {
        "name": "name1",
        "type": "ERROR",
        "errors": [
            {"errorCode": "error0Code"},
            {"errorCode": "error1Code"}
        ]
    }
]

const expectedArray = [
    {
        "id": 0,
        "name": "name0",
        "type": "INFO",
    }, {
        "name": "name1",
        "id": 1,
        "type": "ERROR",
    }
]

const expectedNestedArray = [
    {
        "name": "name0",
        "type": "INFO",
        "errors": []
    }, {
        "name": "name1",
        "type": "ERROR",
        "errors": [
            {"id": 0, "errorCode": "error0Code"},
            {"id": 1, "errorCode": "error1Code"}
        ]
    }
]

const tagString = 'fornavn';

const icfStrings = [
    'name', 'phone', 'address'
]

describe('It should add ids correctly to arrays missing id', () => {
    test('It should add id field to json object, where there is a "name" field', () => {
        array.forEach(addId(0, 'name'))
        expect(array).toEqual(expectedArray);
    });

    test('It should add id field to nested json object, where there is a "errorCode" field', () => {
        nestedArray.forEach((item: {name: string, type: string, errors: {errorCode: string}[]}) =>
            item.errors.forEach(addId(0, 'errorCode'))
        );
        expect(nestedArray).toEqual(expectedNestedArray);
    });
})


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

