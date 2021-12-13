import {INPUT_TYPE} from "./InputType.enum";

export interface IInputField {
    input: INPUT_TYPE;
    label: string;
    formValue: string;
    value?: Function;
    dropDownItems?: ISelect[];
    radioOptions?: ISelect[];
    defaultValue?: string;
    hidden?: boolean
}

export interface ISelect {
    label: string,
    value: string,
    description?: string
}