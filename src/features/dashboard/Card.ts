import { ILink } from "./Link";

export interface ICard {
	value: string;
	content: string;
	links?: ILink[];
}
