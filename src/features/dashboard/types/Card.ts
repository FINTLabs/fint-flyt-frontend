import { ILink } from "./Link";

export interface ICard {
	value: number | undefined;
	content: string;
	link?: ILink;
}
