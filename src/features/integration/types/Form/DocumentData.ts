import {PropertyString} from "../Property";

export default interface IDocumentData {
    title: PropertyString;
    accessCode: string;
    paragraph: string;
    variant: string;
    format: string;
}