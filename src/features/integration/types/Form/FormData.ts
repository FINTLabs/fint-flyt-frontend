import IApplicantData from "./ApplicantData";
import IMainDocumentData from "./MainDocumentData";
import IRecordData from "./RecordData";
import ICaseData from "./CaseData";
import IAttachmentDocumentsData from "./AttachmentDocumentsData";

export interface IFormIntegration {
    sourceApplicationId?: string;
    sourceApplicationIntegrationId?: string;
    destination?: string;
    active?: boolean;
    activeConfigurationId?: string;
    displayName?: string;
}

export interface IFormConfiguration {
    configurationId?: string;
    integrationId?: string;
    comment?: string;
    version?: number;
    metadataId?: number;
    completed?: boolean;

    caseData:ICaseData;
    recordData: IRecordData;
    mainDocumentData: IMainDocumentData;
    attachmentDocumentsData: IAttachmentDocumentsData;
    applicantData: IApplicantData;
}
