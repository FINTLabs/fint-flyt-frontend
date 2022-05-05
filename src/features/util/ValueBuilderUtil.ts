import {ValueBuilder} from "../integration/types/ValueBuilder";
import {IProperty} from "../integration/types/Property";
import {IField} from "../integration/types/Field";

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

export function toValueString(inputValue: ValueBuilder): string {
    let valueString = inputValue.value? inputValue.value : '';
    if (valueString !== '' && inputValue.properties !== undefined) {
        let helperString;
        inputValue.properties?.map((property => {
            helperString = valueString?.replace("%s", '{' + property.key + '}')
            valueString = helperString;
        }))
    }
    return valueString;
}

export function fieldToString(configuration: any, configurationField: string, valueString?: boolean): string {
    const fields = configuration.fields.filter((field: IField) => field.field === configurationField)
    if (valueString) {
        return fields.length > 0 ? toValueString(fields[0].valueBuilder) : '';
    }
    return fields.length > 0 ? fields[0].valueBuilder.value : '';
}

export function fieldToValue(configuration: any, inputField: string) {
    let test = configuration?.fields.filter((field: any) => {
        return field.field == inputField
    })
    console.log(test)
    return test[0] ? test[0].valueBuilder.value : null;
}