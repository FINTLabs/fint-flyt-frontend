import {VALUE_BUILDER_STRATEGY} from "./ValueBuilderStrategy.enum";
import {IProperty} from "./Property";

export interface IField {
    field?: string;
    valueBuildStrategy?: VALUE_BUILDER_STRATEGY,
    valueBuilder?: {
        value?: string;
        properties?: IProperty[]
    }
}