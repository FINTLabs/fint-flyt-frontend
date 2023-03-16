import {useFormContext} from "react-hook-form";
import * as React from "react";
import {ClassNameMap} from "@mui/styles";

interface Props {
    classes: ClassNameMap;
    absoluteKey: string;
    displayName: string;
}

const StringValueComponent: React.FunctionComponent<Props> = (props: Props) => {
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