export interface IAccordion {
    summary: string;
    accordionForm: ACCORDION_FORM;
    defaultExpanded: boolean;
}

export enum ACCORDION_FORM {
    CASE_INFORMATION,
    CASE_FORM,
    RECORD_FORM,
    DOCUMENT_FORM,
    APPLICANT_FORM
}