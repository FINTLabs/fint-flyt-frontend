import {IField} from "./Field";

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
    organisationNumber?: string;
    fields: IField[];
}

export interface IIntegrationConfiguration {
    id?: string;
    name?: string,
    description?: string,
    version?: number,
    selectedForm?: string;
    isPublished?: boolean;

    caseConfiguration?:ICaseConfiguration;
    recordConfiguration?: IRecordConfiguration;
    documentConfiguration?: IDocumentConfiguration;
    applicantConfiguration?: IApplicantConfiguration;
}