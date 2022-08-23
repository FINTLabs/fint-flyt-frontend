import {IField} from "./Field";
import {ISearchField} from "./CaseSearchField";

export interface ICaseConfiguration {
    caseCreationStrategy?: string;
    caseNumber?: string;
    fields: IField[];
}
export interface IRecordConfiguration {
    fields: IField[];
}
export interface IDocumentConfiguration {
    fields: IField[];
}
export interface IApplicantConfiguration {
    applicantType?: string;
    organisationNumber?: boolean;
    fields: IField[];
}

export interface IIntegrationConfiguration {
    description?: string;
    version?: string;
    sourceApplicationId?: string;
    sourceApplicationIntegrationId?: string;
    destination?: string;
    published?: boolean;
    existingCaseSearchFields?: ISearchField;


    caseConfiguration?:ICaseConfiguration;
    recordConfiguration?: IRecordConfiguration;
    documentConfiguration?: IDocumentConfiguration;
    applicantConfiguration?: IApplicantConfiguration;
}
