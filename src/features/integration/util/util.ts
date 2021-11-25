import {ValueBuilder} from "../types/Field";

export interface property {
    order: number;
    key: string;
    source: string;
}

export interface propertyString {
    value?: string;
    properties?: property[]
}

export enum VALUE_BUILDER_STRATEGY {
    FIXED_ARCHIVE_CODE_VALUE,
    COMBINE_STRING_VALUE
}

export function createValueBuilder(inputString: any): ValueBuilder {
    let inputTags = inputString.match(/[^{\}]+(?=})/g)
    let valueString = inputString.replaceAll(/({[^{]*?)\w(?=\})}/g, "%s")

    let propertyTest: propertyString = {}

    if(inputTags) {
        propertyTest = {
            value: valueString,
            properties: inputTags?.map((tag: any, index: number): property => {
                return {
                    key: tag,
                    order: index,
                    source: 'FORM'
                }
            })
        }
    }
    return propertyTest
}
