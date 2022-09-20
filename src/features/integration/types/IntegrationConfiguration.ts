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
    organisationNumber?: boolean;
    protected?: boolean;
    fields: IField[];
}

export interface IIntegrationConfiguration {
    comment?: string;
    version?: string;
    sourceApplicationId?: string;
    sourceApplicationIntegrationId?: string;
    destination?: string;
    finished?: boolean;
    dispatched?: number;
    errors?: number;

    caseConfiguration?:ICaseConfiguration;
    recordConfiguration?: IRecordConfiguration;
    documentConfiguration?: IDocumentConfiguration;
    applicantConfiguration?: IApplicantConfiguration;
}
