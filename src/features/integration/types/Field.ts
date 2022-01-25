import {VALUE_BUILDER_STRATEGY} from "./ValueBuilderStrategy.enum";
import {ValueBuilder} from "./ValueBuilder";

export interface IField {
    field: string;
    valueBuildStrategy: VALUE_BUILDER_STRATEGY,
    valueBuilder: ValueBuilder;
}