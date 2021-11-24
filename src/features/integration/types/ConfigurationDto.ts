import {IField} from "./Field";

interface CaseConfigurationDto {
    caseCreationStrategy?: string;
    fields: IField[];
}
interface RecordConfigurationDto {
    fields: IField[];
}
interface DocumentConfigurationDto {
    fields: IField[];
}
interface ApplicantConfigurationDto {
    fields: IField[];
}

export interface ConfigurationDto {
    id?: string;
    name?: string,
    description?: string,
    version?: string,
    selectedForm?: string;

    caseConfiguration?:CaseConfigurationDto;
    recordConfiguration?: RecordConfigurationDto;
    documentConfiguration?: DocumentConfigurationDto;
    applicantConfiguration?: ApplicantConfigurationDto;
}