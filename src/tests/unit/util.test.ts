// @ts-ignore
import {ValueBuilder} from "../../features/integration/types/Field";
import {createValueBuilder} from "../../features/integration/util/util";

const expectedValueBuilderWithTags: ValueBuilder = {
    value: "Lorem ipsum %s %s",
    properties: [{key: "foo", order: 0, source: "FORM"}, {key: "bar", order: 1, source: "FORM"}]}

const expectedValueBuilderNoTags: ValueBuilder = {
    value: "Lorem ipsum foo bar", properties: []}

const expectedValueBuilderOnlyTags: ValueBuilder = {
    value: "%s", properties: [{key: "foo", order: 0, source: "FORM"}]}

const expectedValueBuilderEmptyString: ValueBuilder = {
    value: "", properties: []
}

test('It should format tags correctly', () => {
    expect(createValueBuilder("Lorem ipsum {foo} {bar}")).toEqual(expectedValueBuilderWithTags);
});

test('It should handle no tags, and format correctly', () => {
    expect(createValueBuilder("Lorem ipsum foo bar")).toEqual(expectedValueBuilderNoTags);
});

test('It should handle just tags, and format correctly', () => {
    expect(createValueBuilder("{foo}")).toEqual(expectedValueBuilderOnlyTags);
});

test('It should handle empty input string', () => {
    expect(createValueBuilder("")).toEqual(expectedValueBuilderEmptyString);
});