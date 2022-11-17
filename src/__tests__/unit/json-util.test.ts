import {addId, toTagValue} from "../../features/util/JsonUtil";

const array = [
    {
        "name":"name0",
        "type":"INFO",
    }, {
        "name":"name1",
        "type":"ERROR",
    }
]
const nestedArray = [
    {
        "name":"name0",
        "type":"INFO",
        "errors":[]
    }, {
        "name":"name1",
        "type":"ERROR",
        "errors":[
            {"errorCode":"error0Code"},
            {"errorCode":"error1Code"}
        ]
    }
]

const expectedArray = [
    {
        "id": 0,
        "name":"name0",
        "type":"INFO",
    }, {
        "name":"name1",
        "id": 1,
        "type":"ERROR",
    }
]

const expectedNestedArray = [
    {
        "name":"name0",
        "type":"INFO",
        "errors":[]
    }, {
        "name":"name1",
        "type":"ERROR",
        "errors":[
            {"id": 0, "errorCode":"error0Code"},
            {"id": 1, "errorCode":"error1Code"}
        ]
    }
]

const tagString = 'fornavn';

test('It should add id field to json object, where there is a "name" field', () => {
    array.forEach(addId(0, 'name'))
    expect(array).toEqual(expectedArray);
});

test('It should add id field to nested json object, where there is a "errorCode" field', () => {
    nestedArray.forEach((item: any) =>
        item.errors.forEach(addId(0, 'errorCode'))
    );
    expect(nestedArray).toEqual(expectedNestedArray);
});

test('It should return correct tag from string', () => {
    const tag = toTagValue(tagString)
    expect(tag).toEqual('$if{fornavn}');
});

