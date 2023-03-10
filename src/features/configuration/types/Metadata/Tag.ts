import {ValueType} from "./IntegrationMetadata";

export interface ITag {
    name: string,
    value: string,
    disabled: boolean
    type: ValueType
}