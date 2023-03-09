import * as React from "react";
import {IElementTemplate, IValueTemplate} from "../types/NewForm/FormTemplate";
import {useFormContext} from "react-hook-form";
import {getAbsoluteKey} from "../util/KeyUtils";
import {ValueType} from "../types/Configuration";

const DynamicStringValueComponent: React.FunctionComponent<any> = (props: {
    parentAbsoluteKey: string,
    template: IElementTemplate<IValueTemplate>
}) => {
    const {register, setValue} = useFormContext();
    const absoluteKey = getAbsoluteKey(props.template.elementConfig, props.parentAbsoluteKey)
    setValue(absoluteKey + ".type", ValueType.DYNAMIC_STRING)
    return (
        <label key={props.template.elementConfig.displayName}>
            {props.template.elementConfig.displayName}:
            <input type="text"
                   {...register(absoluteKey + ".mappingString")}
            />
        </label>
    )
}
export default DynamicStringValueComponent;