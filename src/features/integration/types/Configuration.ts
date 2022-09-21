import {IField} from "./Field";
import {VALUE_BUILDER_STRATEGY} from "./ValueBuilderStrategy.enum";
import {ValueBuilder} from "./ValueBuilder";

export interface ICaseConfiguration {
    caseCreationStrategy?: string;
    caseNumber?: string;
    fields?: IField[];
}
export interface IRecordConfiguration {
    fields?: IField[];
}
export interface IDocumentConfiguration {
    fields?: IField[];
}
export interface IApplicantConfiguration {
    applicantType?: string;
    organisationNumber?: boolean;
    protected?: boolean;
    fields?: IField[];
}

export interface IConfigurationField {
    key: string;
    valueBuildStrategy?: VALUE_BUILDER_STRATEGY,
    valueBuilder?: ValueBuilder;
    children?: IConfigurationField[];
}

export interface IConfiguration {
    configurationId?: string;
    integrationId?: string;
    comment?: string;
    version?: number;
    metadataId?: number;
    completed?: boolean;

    caseCreationStrategy?: string;
    caseNumber?: string;
    applicantType?: string;
    organisationNumber?: boolean;
    protected?: boolean;


    caseConfiguration?:ICaseConfiguration;
    recordConfiguration?: IRecordConfiguration;
    documentConfiguration?: IDocumentConfiguration;
    applicantConfiguration?: IApplicantConfiguration;


    configurationFields?: IConfigurationField[];
}

export interface newIConfiguration {
    configurationId?: string;
    integrationId?: string;
    comment?: string;
    version?: number;
    metadataId?: number;
    completed?: boolean;

    configurationFields: IConfigurationField[];
}
