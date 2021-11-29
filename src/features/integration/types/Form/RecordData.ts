import {PropertyString} from "../Property";

export default interface IRecordData {
    title: PropertyString;
    publicTitle: PropertyString;
    category: string;
    administrativeUnit: string;
    status: string;
    caseWorker: string;
    paragraph: string;
}