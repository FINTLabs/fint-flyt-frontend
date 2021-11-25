import {propertyString} from "../../util/util";

export default interface IDocumentData {
    title: propertyString;
    accessCode: string;
    paragraph: string;
    variant: string;
    format: string;
}