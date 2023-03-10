import * as React from "react";
import {IObjectTemplate, SelectableValueType, ValueType as TemplateValueType} from "../types/NewForm/FormTemplate";
import StringValueComponent from "./StringValueComponent";
import SelectValueComponent from "./SelectValueComponent";
import DynamicStringValueComponent from "./DynamicStringValueComponent";
import {ElementComponentProps} from "../types/ValueComponentProps";
import {ValueType as MetadataValueType} from "../types/Metadata/IntegrationMetadata";

const ObjectComponent: React.FunctionComponent<any> = (props: ElementComponentProps & IObjectTemplate) => {
    return (
        <>
            <div className="title">{props.displayName}</div>
            <fieldset style={{display: "grid"}}>

                {props.valueTemplates?.map(template => {
                        const key = props.absoluteKey + ".valueMappingPerKey." + template.elementConfig.key;
                        switch (template.template.type) {
                            case TemplateValueType.STRING:
                                return <StringValueComponent
                                    classes={props.classes}
                                    absoluteKey={key}
                                    displayName={template.elementConfig.displayName}
                                />
                            case TemplateValueType.DYNAMIC_STRING:
                                return <DynamicStringValueComponent
                                    classes={props.classes}
                                    absoluteKey={key}
                                    displayName={template.elementConfig.displayName}
                                    accept={[MetadataValueType.STRING, MetadataValueType.EMAIL]}
                                />
                            case TemplateValueType.FILE:
                        }
                    }
                )}

                {props.selectableValueTemplates?.map(template => {
                        const key = props.absoluteKey + ".valueMappingPerKey." + template.elementConfig.key;
                        switch (template.template.type) {
                            case SelectableValueType.DROPDOWN:
                                return <SelectValueComponent
                                    classes={props.classes}
                                    absoluteKey={key}
                                    displayName={template.elementConfig.displayName}
                                    selectables={template.template.selectables}
                                    selectablesSources={template.template.selectablesSources}
                                    autoComplete={false}
                                />
                            case SelectableValueType.SEARCH_SELECT:
                                return <SelectValueComponent
                                    classes={props.classes}
                                    absoluteKey={key}
                                    displayName={template.elementConfig.displayName}
                                    selectables={template.template.selectables}
                                    selectablesSources={template.template.selectablesSources}
                                    autoComplete={true}
                                />
                            case SelectableValueType.DYNAMIC_STRING_OR_SEARCH_SELECT:
                        }

                    }
                )}

                {props.objectTemplates?.map(template =>
                    <ObjectComponent
                        classes={props.classes}
                        absoluteKey={props.absoluteKey + ".objectMappingPerKey." + template.elementConfig.key}
                        displayName={template.elementConfig.displayName}
                        {...template.template}
                    />
                )}
            </fieldset>
        </>
    )
}
export default ObjectComponent;