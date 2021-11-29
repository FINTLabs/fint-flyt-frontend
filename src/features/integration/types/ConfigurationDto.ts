import {IField} from "./Field";

interface ICaseConfigurationDto {
    caseCreationStrategy?: string;
    fields: IField[];
}
interface IRecordConfigurationDto {
    fields: IField[];
}
interface IDocumentConfigurationDto {
    fields: IField[];
}
interface IApplicantConfigurationDto {
    fields: IField[];
}

export interface IConfigurationDto {
    id?: string;
    name?: string,
    description?: string,
    version?: string,
    selectedForm?: string;

    caseConfiguration?:ICaseConfigurationDto;
    recordConfiguration?: IRecordConfigurationDto;
    documentConfiguration?: IDocumentConfigurationDto;
    applicantConfiguration?: IApplicantConfigurationDto;
}