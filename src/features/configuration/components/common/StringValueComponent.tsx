import {useFormContext} from "react-hook-form";
import * as React from "react";
import {ElementComponentProps} from "../../types/ElementComponentProps";

const StringValueComponent: React.FunctionComponent<any> = (props: ElementComponentProps) => {
    const {register} = useFormContext();
    return (
        <label key={props.displayName} className={props.classes.label}>
            {props.displayName}:
            <input className={props.classes.input} type="text"
                   {...register(props.absoluteKey)}
            />
        </label>
    )
}
export default StringValueComponent;