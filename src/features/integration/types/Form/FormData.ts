import IApplicantData from "./ApplicantData";
import IDocumentData from "./DocumentData";
import IRecordData from "./RecordData";
import ICaseData from "./CaseData";

export interface IFormIntegration {
    sourceApplicationId?: string;
    sourceApplicationIntegrationId?: string;
    destination?: string;
    active?: boolean;
    activeConfigurationId?: string;
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
    documentData: IDocumentData;
    applicantData: IApplicantData;
}
