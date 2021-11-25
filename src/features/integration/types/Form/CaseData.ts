import {propertyString} from "../../util/util";

export default interface ICaseData {
    caseCreationStrategy: string;
    title: propertyString;
    publicTitle: propertyString;
    caseType: string;
    administrativeUnit: string;
    archiveUnit: string;
    recordUnit: string;
    accessCode: string;
    paragraph: string;
    caseWorker: string;
    classification: propertyString;
    primaryClass: string;
    secondaryClass: string;
    createdBy: string;
}



