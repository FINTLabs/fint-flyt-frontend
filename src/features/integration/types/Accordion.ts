import {IField, IFieldGroup} from "./InputField";

export interface IAccordion {
    id: string;
    header: string;
    defaultExpanded: boolean;
    hidden?: boolean;
    inputFields?: IField[];
}

export enum ACCORDION_FORM {
    CASE_INFORMATION,
    CASE_FORM,
    RECORD_FORM,
    DOCUMENT_FORM,
    APPLICANT_FORM,
    UNDEFINED
}

export interface IDependency {
    type?: string;
    key?: string;
    value: string;
}

export interface IAccordionGroup {
    id: string;
    header: string;
    defaultExpanded: IDependency;
    hidden?: IDependency;
    inputFields?: IFieldGroup[];
}


export const toAccordionForm = (name: string): ACCORDION_FORM => {
    if (name == "ACCORDION_FORM.CASE_INFORMATION") {
        return ACCORDION_FORM.CASE_INFORMATION
    }
    if (name == "ACCORDION_FORM.CASE_FORM") {
        return ACCORDION_FORM.CASE_FORM
    }
    if (name == "ACCORDION_FORM.RECORD_FORM") {
        return ACCORDION_FORM.RECORD_FORM
    }
    if (name == "ACCORDION_FORM.DOCUMENT_FORM") {
        return ACCORDION_FORM.DOCUMENT_FORM
    }
    if (name == "ACCORDION_FORM.APPLICANT_FORM") {
        return ACCORDION_FORM.APPLICANT_FORM
    }
    else {
        return ACCORDION_FORM.UNDEFINED
    }
}