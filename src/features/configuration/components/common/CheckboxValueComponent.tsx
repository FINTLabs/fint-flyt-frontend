import * as React from "react";
import {BaseSyntheticEvent, useContext} from "react";
import {Checkbox, FormControlLabel} from "@mui/material";
import {ConfigurationContext} from "../../../../context/configurationContext";
import {ClassNameMap} from "@mui/styles";
import {Noop} from "react-hook-form/dist/types";

interface Props {
    classes: ClassNameMap;
    displayName: string;
    disabled?: boolean;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onBlur?: Noop;
    name: string;
    value: boolean;
}

const CheckboxValueComponent: React.FunctionComponent<Props> = (props: Props) => {
    const {completed} = useContext(ConfigurationContext)

    return <FormControlLabel
        label={props.displayName}
        disabled={props.disabled}
        onChange={(e: BaseSyntheticEvent) => {
            if (props.onChange) {
                props.onChange(e.target.value)
            }
        }}
        onBlur={props.onBlur}
        name={props.name}
        value={props.value}
        control={
            <Checkbox
                disabled={props.disabled || completed}
                id="form-complete"
                checked={props.value}
                // onChange={(e) => fields.onChange(e.target.checked)}
                inputProps={{'aria-label': props.name + 'checkbox'}}
            />
        }
    />;
}

export default CheckboxValueComponent;
