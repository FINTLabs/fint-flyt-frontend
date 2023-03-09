import {IElementTemplate} from "./NewForm/FormTemplate";
import {ClassNameMap} from "@mui/styles";

export type TemplateComponentProps<T> = {
    parentAbsoluteKey?: string,
    template: IElementTemplate<T>;
    classes: ClassNameMap;
}