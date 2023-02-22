import {Type} from "./IntegrationMetadata";

export interface ITag {
    name: string,
    value: string,
    disabled: boolean
    type: Type
}