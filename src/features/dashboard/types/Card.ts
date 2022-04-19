import {ILink} from "./Link";

export interface ICard {
    value: any,
    content: string,
    links?: ILink[],
}