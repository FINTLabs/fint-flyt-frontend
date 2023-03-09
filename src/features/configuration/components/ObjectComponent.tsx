import * as React from "react";
import {IObjectTemplate, ValueType} from "../types/NewForm/FormTemplate";
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

                {props.template.template.selectableValueTemplates?.map(valueTemplate =>
                    <SelectValueComponent
                        classes={props.classes}
                        parentAbsoluteKey={absoluteKey + ".valueMappingPerKey"}
                        template={valueTemplate}
                    />
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