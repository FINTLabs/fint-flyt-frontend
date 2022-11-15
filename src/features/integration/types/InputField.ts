import {INPUT_TYPE} from "./InputType.enum";
import {IResourceItem} from "../../../context/resourcesContext/types";
import {IDependency} from "./Accordion";

export interface IInputField {
    input: INPUT_TYPE;
    label: string;
    formValue: string;
    value?: Function | string;
    dropDownItems?: ISelect[];
    radioOptions?: ISelect[];
    options?: ISelect[];
    hidden?: boolean;
    disabled?: boolean;
    required?: boolean;
    error?: string;
    helpText?: string;
    lockIcon?: boolean;
    setter?: (item: IResourceItem) => void;
    searchOption?: boolean;
    fields?: IInputField[];
    checked?: boolean;
}

export interface IInputFieldGroup {
    header: string | undefined;
    hidden?:boolean;
    fields: IInputField[]
}

export interface IFieldGroup {
    header?: string;
    hidden?: IDependency
    fields: IField[];
}

export interface IField {
    input: string;
    label: string;
    formValue: string;
    value?: IFieldValue;
    options?: string;
    hidden?: IDependency;
    disabled?: IDependency;
    required?: IDependency[];
    error?: string;
    helpText?: string;
    lockIcon?: boolean;
    setter?: (item: IResourceItem) => void;
    searchOption?: boolean;
    fields?: IField[];
    checked?: IFieldValue;
}

export interface ISelect {
    label: string,
    value: string,
    description?: string,
    disabled?: boolean
}

export interface IErrorDependency {
    type: string;
    key: string;
    value: string
}

export interface IFieldValue {
    source: string;
    value: string;
}