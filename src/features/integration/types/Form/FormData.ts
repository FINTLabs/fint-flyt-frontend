import IApplicantData from "./ApplicantData";
import IDocumentData from "./DocumentData";
import IRecordData from "./RecordData";
import ICaseData from "./CaseData";

export default interface IFormData {
    name: string | undefined;
    description: string | undefined;
    version?: string;
    selectedForm?: string;

    caseData?: ICaseData;
    recordData?: IRecordData;
    documentData?: IDocumentData;
    applicantData?: IApplicantData;
}
