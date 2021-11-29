import {PropertyString} from "../Property";

export default interface ICaseData {
    caseCreationStrategy: string;
    title: PropertyString;
    publicTitle: PropertyString;
    caseType: string;
    administrativeUnit: string;
    archiveUnit: string;
    recordUnit: string;
    accessCode: string;
    paragraph: string;
    caseWorker: string;
    classification: PropertyString;
    primaryClass: string;
    secondaryClass: string;
    createdBy: string;
}



