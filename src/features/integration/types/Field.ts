import {property, VALUE_BUILDER_STRATEGY} from "../util/util";

export interface IField {
    field?: string;
    valueBuildStrategy?: VALUE_BUILDER_STRATEGY,
    valueBuilder?: ValueBuilder;
}

export interface ValueBuilder {
    value?: string;
    properties?: property[]
}