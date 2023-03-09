import * as React from "react";
import {IElementTemplate, IValueTemplate} from "../types/NewForm/FormTemplate";
import {useFormContext} from "react-hook-form";
import {getAbsoluteKey} from "../util/KeyUtils";

const DynamicStringValueComponent: React.FunctionComponent<any> = (props: {
    parentAbsoluteKey: string,
    template: IElementTemplate<IValueTemplate>
}) => {
    const {register} = useFormContext();
    const absoluteKey = getAbsoluteKey(props.template.elementConfig, props.parentAbsoluteKey)
    return (
        <label key={props.template.elementConfig.displayName}>
            {props.template.elementConfig.displayName}:
            <input type="text"
                   {...register(absoluteKey)}
            />
        </label>
    )
}
export default DynamicStringValueComponent;