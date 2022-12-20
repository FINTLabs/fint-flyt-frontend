export interface IAccordion {
    id: string;
    summary: string;
    accordionForm: ACCORDION_FORM;
    defaultExpanded: boolean;
    hidden?: boolean;
}

export enum ACCORDION_FORM {
    CASE_INFORMATION,
    CASE_FORM,
    RECORD_FORM,
    MAIN_DOCUMENT_FORM,
    ATTACHMENT_DOCUMENT_FORM,
    APPLICANT_FORM
}