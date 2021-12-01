import {PropertyString} from "../Property";

export default interface IDocumentData {
    title: PropertyString;
    documentStatus: string;
    accessCode: string;
    paragraph: string;
    variant: string;
    format: string;
}