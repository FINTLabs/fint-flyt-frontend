import {ValueBuilder} from "../types/Field";

export interface property {
    order: number;
    key: string;
    source: string;
}

export interface propertyString {
    value: string;
    properties?: property[]
}

export enum VALUE_BUILDER_STRATEGY {
    FIXED_ARCHIVE_CODE_VALUE,
    COMBINE_STRING_VALUE
}

/* TODO: Remove empty check after validation ensures no empty fields */
export function createValueBuilder(inputString: any): ValueBuilder {
    let foundTags;
    let stringWithReplacedTags;

    if (inputString) {
        foundTags = inputString.match(/[^{\}]+(?=})/g)
        stringWithReplacedTags = inputString.replaceAll(/({[^{]*?)\w(?=\})}/g, "%s")
    }
    return {
        value: stringWithReplacedTags,
        properties: foundTags?.map((tag: any, index: number): property => {
            return {
                key: tag,
                order: index,
                source: 'FORM'
            }
        })
    }
}
