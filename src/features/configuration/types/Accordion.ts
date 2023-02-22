export interface IAccordion {
    id: string;
    summary: string;
    accordionForm: ACCORDION_FORM;
    defaultExpanded: boolean;
    hidden?: boolean;
}

export enum ACCORDION_FORM {
    CLASS,
    CASE,
    RECORD,
    DOCUMENT,
    ATTACHMENT,
    CORRESPONDENT,
    PART,

}