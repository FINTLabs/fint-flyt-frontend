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
    DOCUMENT_FORM,
    CORRESPONDENT_FORM
}