import {IField} from "./Field";

interface ICaseConfiguration {
    caseCreationStrategy?: string;
    fields: IField[];
}
interface IRecordConfiguration {
    fields: IField[];
}
interface IDocumentConfiguration {
    fields: IField[];
}
interface IApplicantConfiguration {
    applicantType?: string;
    organisationNumber?: number;
    fields: IField[];
}

export interface IIntegrationConfiguration {
    id?: string;
    name?: string,
    description?: string,
    version?: string,
    selectedForm?: string;

    caseConfiguration?:ICaseConfiguration;
    recordConfiguration?: IRecordConfiguration;
    documentConfiguration?: IDocumentConfiguration;
    applicantConfiguration?: IApplicantConfiguration;
}