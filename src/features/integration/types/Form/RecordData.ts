import {propertyString} from "../../util/util";

export default interface IRecordData {
    title: propertyString;
    publicTitle: propertyString;
    category: string;
    administrativeUnit: string;
    status: string;
    caseWorker: string;
    paragraph: string;
}