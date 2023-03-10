import * as React from "react";
import {IObjectTemplate, SelectableValueType, ValueType} from "../types/NewForm/FormTemplate";
import {getAbsoluteKey} from "../util/KeyUtils";
import StringValueComponent from "./StringValueComponent";
import SelectValueComponent from "./SelectValueComponent";
import DynamicStringValueComponent from "./DynamicStringValueComponent";
import {TemplateComponentProps} from "../types/ValueComponentProps";

const ObjectComponent: React.FunctionComponent<any> = (props: TemplateComponentProps<IObjectTemplate>) => {
    const absoluteKey = getAbsoluteKey(props.template.elementConfig, props.parentAbsoluteKey)
    return (
        <>
            <div className="title">{props.template.elementConfig.displayName}</div>
            <fieldset style={{display: "grid"}}>

                {props.template.template.valueTemplates?.map(valueTemplate => {
                        switch (valueTemplate.template.type) {
                            case ValueType.STRING:
                                return <StringValueComponent
                                    classes={props.classes}
                                    parentAbsoluteKey={absoluteKey + ".valueMappingPerKey"}
                                    template={valueTemplate}
                                />
                            case ValueType.DYNAMIC_STRING:
                                return <DynamicStringValueComponent
                                    classes={props.classes}
                                    parentAbsoluteKey={absoluteKey + ".valueMappingPerKey"}
                                    template={valueTemplate}
                                />
                            case ValueType.FILE:
                        }
                    }
                )}

                {props.template.template.selectableValueTemplates?.map(selectableValueTemplate => {
                        switch (selectableValueTemplate.template.type) {
                            case SelectableValueType.DROPDOWN:
                                return <SelectValueComponent
                                    classes={props.classes}
                                    parentAbsoluteKey={absoluteKey + ".valueMappingPerKey"}
                                    template={selectableValueTemplate}
                                    autoComplete={false}
                                />
                            case SelectableValueType.SEARCH_SELECT:
                                return <SelectValueComponent
                                    classes={props.classes}
                                    parentAbsoluteKey={absoluteKey + ".valueMappingPerKey"}
                                    template={selectableValueTemplate}
                                    autoComplete={true}
                                />
                            case SelectableValueType.DYNAMIC_STRING_OR_SEARCH_SELECT:
                        }

                    }
                )}

                {props.template.template.objectTemplates?.map(objectTemplate =>
                    <ObjectComponent
                        classes={props.classes}
                        parentAbsoluteKey={absoluteKey + ".objectMappingPerKey"}
                        template={objectTemplate}
                    />
                )}
            </fieldset>
        </>
    )
}
export default ObjectComponent;