import {INPUT_TYPE} from "./InputType.enum";
import {IResourceItem} from "../../../resourcesContext/types";

export interface IInputField {
    input: INPUT_TYPE;
    label: string;
    formValue: string;
    value?: Function;
    dropDownItems?: ISelect[];
    radioOptions?: ISelect[];
    defaultValue?: string;
    hidden?: boolean;
    required?: boolean;
    error?: string;
    helpText?: string;
    setter?: (item: IResourceItem) => void
}

export interface ISelect {
    label: string,
    value: string,
    description?: string
}