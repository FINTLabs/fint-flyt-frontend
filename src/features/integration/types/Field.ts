import {VALUE_BUILDER_STRATEGY} from "./ValueBuilderStrategy.enum";
import {Property} from "./Property";

export interface IField {
    field?: string;
    valueBuildStrategy?: VALUE_BUILDER_STRATEGY,
    valueBuilder?: ValueBuilder;
}

export interface ValueBuilder {
    value?: string;
    properties?: Property[]
}