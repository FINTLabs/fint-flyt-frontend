import IApplicantData from "./ApplicantData";
import IDocumentData from "./DocumentData";
import IRecordData from "./RecordData";
import ICaseData from "./CaseData";

export default interface IFormData {
    description?: string;
    version?: string;
    sourceApplicationId?: string;
    sourceApplicationIntegrationId?: string;
    destination?: string;
    published?: boolean;

    caseData: ICaseData;
    recordData: IRecordData;
    documentData: IDocumentData;
    applicantData: IApplicantData;
}
