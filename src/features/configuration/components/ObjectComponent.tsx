import * as React from "react";
import {IElementTemplate, IObjectTemplate, ValueType} from "../types/NewForm/FormTemplate";
import {getAbsoluteKey} from "../util/KeyUtils";
import StringValueComponent from "./StringValueComponent";
import SelectValueComponent from "./SelectValueComponent";
import DynamicStringValueComponent from "./DynamicStringValueComponent";

const ObjectComponent: React.FunctionComponent<any> = (props: {
    parentAbsoluteKey?: string,
    template: IElementTemplate<IObjectTemplate>
}) => {
    const absoluteKey = getAbsoluteKey(props.template.elementConfig, props.parentAbsoluteKey)
    return (
        <>
            <div className="title">{props.template.elementConfig.displayName}</div>
            <fieldset style={{display: "grid"}}>

                {props.template.template.valueTemplates?.map(valueTemplate => {
                        switch (valueTemplate.template.type) {
                            case ValueType.STRING:
                                return <StringValueComponent
                                    parentAbsoluteKey={absoluteKey + ".valueMappingPerKey"}
                                    template={valueTemplate}
                                />
                            case ValueType.DYNAMIC_STRING:
                                return <DynamicStringValueComponent
                                    parentAbsoluteKey={absoluteKey + ".valueMappingPerKey"}
                                    template={valueTemplate}
                                />
                            case ValueType.FILE:
                        }
                    }
                )}

                {props.template.template.selectableValueTemplates?.map(valueTemplate =>
                    <SelectValueComponent
                        parentAbsoluteKey={absoluteKey + ".valueMappingPerKey"}
                        template={valueTemplate}
                    />
                )}

                {props.template.template.objectTemplates?.map(objectTemplate =>
                    <ObjectComponent
                        parentAbsoluteKey={absoluteKey + ".objectMappingPerKey"}
                        template={objectTemplate}
                    />
                )}
            </fieldset>
        </>
    )
}
export default ObjectComponent;