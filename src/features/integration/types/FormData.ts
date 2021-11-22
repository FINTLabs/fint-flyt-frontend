import IApplicantData from "./ApplicantData";
import IDocumentData from "./DocumentData";
import IRecordData from "./RecordData";
import ICaseData from "./CaseData";

export default interface IFormData {
    id?: string;
    name: string,
    description: string,
    version?: string,
    selectedForm?: string;

    caseData?: ICaseData;
    recordData?: IRecordData;
    documentData?: IDocumentData;
    applicantData?: IApplicantData;
}
