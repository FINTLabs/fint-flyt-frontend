import {VALUE_BUILDER_STRATEGY} from "./ValueBuilderStrategy.enum";
import {ValueBuilder} from "./ValueBuilder";

export interface IField {
    field: string;
    valueBuildStrategy: VALUE_BUILDER_STRATEGY,
    valueBuilder: ValueBuilder;
}

export interface ILink {
    name: string,
    href: string
}
export interface ICard {
    value: any,
    content: string,
    links?: ILink[],
}