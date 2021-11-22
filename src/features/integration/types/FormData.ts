import IApplicantData from "./ApplicantData";
import IDocumentData from "./DocumentData";
import IRecordData from "./RecordData";

export default interface IFormData {
    caseId?: string;
    name: string,
    description: string,
    version?: string,
    selectedForm: string;
    creationStrategy: string;
    title: string;
    publicTitle: string;
    caseType: string;
    administrativeUnit: string;
    archiveUnit: string;
    recordUnit: string;
    accessCode: string;
    paragraph: string;
    caseWorker: string;
    classification: string;
    primaryClass: string;
    secondaryClass: string;
    createdBy: string;

    recordData: IRecordData;
    documentData: IDocumentData;
    applicantData: IApplicantData;
}
