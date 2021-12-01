import {PropertyString} from "../PropertyString";

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
    primaryClassification: PropertyString;
    secondaryClassification: PropertyString;
    primaryClass: string;
    secondaryClass: string;
}