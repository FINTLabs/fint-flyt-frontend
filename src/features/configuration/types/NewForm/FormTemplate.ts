import {ISelectable} from "../../components/FormPanel";

export interface FormTemplate {
    valueTemplates?: IValueTemplate[];
    selectableValueTemplates?: ISelectableValueTemplate[];
    objectTemplates?: IObjectTemplate[];
    objectCollectionTemplates?: IObjectCollectionTemplate[];
}

export interface FormCollectionTemplate {
    objectTemplate: IObjectTemplate;
}

export interface IObjectTemplate {
    order: number,
    elementConfig: IElementConfig;
    template: FormTemplate;
}
export interface IValueTemplate {
    order: number;
    elementConfig: IElementConfig;
    template: ITemplate;
}
export interface ISelectableValueTemplate {
    order: number;
    elementConfig: IElementConfig;
    template: ISelectableTemplate;
}
export interface IObjectCollectionTemplate {
    order: number;
    elementConfig: IElementConfig;
    template: IFormCollectionTemplate;
}

export interface IFormCollectionTemplate {
    objectTemplate: FormTemplate;
}

export interface  IElementConfig {
    key: string;
    displayName: string;
    description: string;
    showDependency?: IDependency;
    enableDependency?: IDependency;
}

export interface ITemplate {
    type: string;
    search?: IUrlBuilder;
}

export interface ISelectableTemplate {
    type: string,
    selectables?: ISelectable[];
    selectablesSources?: IUrlBuilder[];
}

export interface IUrlBuilder {
    urlTemplate: string;
    valueRefPerPathParamKey?: Record<string, string>
    valueRefPerRequestParamKey?: Record<string, string>;
}

export interface IDependency {
    hasAnyCombination: IValuePredicate[][];
}

export interface IValuePredicate {
    key: string;
    defined: boolean;
    value?: string;
    notValue?: string;
}