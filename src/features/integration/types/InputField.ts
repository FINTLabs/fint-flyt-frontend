import {INPUT_TYPE} from "./InputType.enum";

export interface IInputField {
    input: INPUT_TYPE;
    label: string;
    value?: Function;
    formValue: string;
    dropDownItems?: ISelect[];
    radioOptions?: ISelect[];
    defaultValue?: string;
}

export interface ISelect {
    label: string,
    value: string,
    description?: string
}