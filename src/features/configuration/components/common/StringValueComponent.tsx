import {useFormContext} from "react-hook-form";
import * as React from "react";
import {ElementComponentProps} from "../../types/ElementComponentProps";

const StringValueComponent: React.FunctionComponent<ElementComponentProps> = (props: ElementComponentProps) => {
    const {register} = useFormContext();
    return (
        <div style={{display:'flex', flexDirection:'column'}}>
            <label key={props.displayName} className={props.classes.label}>
                {props.displayName}:
            </label>
            <input className={props.classes.input} type="text"
                   {...register(props.absoluteKey)}
            />
        </div>

    )
}
export default StringValueComponent;