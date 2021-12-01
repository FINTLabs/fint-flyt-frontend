import {INPUT_TYPE} from "./InputTypes.enum";

export interface IInputField {
    input: INPUT_TYPE;
    label: string;
    value?: Function;
    formValue: string;
    dropDownItems?: ISelect[];
}

export interface ISelect {
    label: string,
    value: string
}