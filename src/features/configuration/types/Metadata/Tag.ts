import {ValueType} from "./IntegrationMetadata";

export interface ITag {
    name: string,
    value: string,
    tagKey: string,
    type: ValueType
}