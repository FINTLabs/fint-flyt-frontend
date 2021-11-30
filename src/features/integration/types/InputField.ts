import {INPUT_TYPES} from "./InputTypes.enum";

export interface IInputField {
    input: INPUT_TYPES;
    label: string;
    value?: Function;
    formValue: string;
    dropDownItems?: ISelect[];
}

export interface ISelect {
    label: string,
    value: string
}