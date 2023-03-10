import {useFormContext} from "react-hook-form";
import * as React from "react";
import {ValueType} from "../types/Configuration";
import {ElementComponentProps} from "../types/ElementComponentProps";

const StringValueComponent: React.FunctionComponent<any> = (props: ElementComponentProps) => {
    const {register, setValue} = useFormContext();
    setValue(props.absoluteKey + ".type", ValueType.STRING)
    return (
        <label key={props.displayName} className={props.classes.label}>
            {props.displayName}:
            <input className={props.classes.input} type="text"
                   {...register(props.absoluteKey + ".mappingString")}
            />
        </label>
    )
}
export default StringValueComponent;