import {property, VALUE_BUILDER_STRATEGY} from "../util/util";

export interface IField {
    field?: string;
    valueBuildStrategy?: VALUE_BUILDER_STRATEGY,
    valueBuilder?: {
        value?: string;
        properties?: property[]
    }
}