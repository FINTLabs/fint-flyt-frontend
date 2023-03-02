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
}

export interface ITemplate {
    type: string
}

export interface ISelectableTemplate {
    type: string,
    selectablesSources?: IUrlTemplate[];
}

export interface IUrlTemplate {
    urlTemplate: string
    valueKeyPerRequestParamKey?: {[key: string]: string}
}