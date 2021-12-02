import {ValueBuilder} from "../types/ValueBuilder";
import {IProperty} from "../types/Property";

/* TODO: Remove empty check after validation ensures no empty fields */
export function createValueBuilder(inputString: any): ValueBuilder {
    let foundTags;
    let stringWithReplacedTags = "";

    if (inputString) {
        foundTags = inputString.match(/[^{}]+(?=})/g)
        stringWithReplacedTags = inputString.replaceAll(/({[^{]*?)\w(?=})}/g, "%s")
    }
    return {
        value: stringWithReplacedTags,
        properties: foundTags ? foundTags.map((tag: any, index: number): IProperty => {
            return {
                key: tag,
                order: index,
                source: 'FORM'
            }
        }) : []
    }
}
