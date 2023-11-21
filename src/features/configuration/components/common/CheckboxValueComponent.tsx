import * as React from "react";
import {useContext} from "react";
import {Checkbox, FormControlLabel} from "@mui/material";
import {ConfigurationContext} from "../../../../context/ConfigurationContext";
import {ClassNameMap} from "@mui/styles";
import {Noop} from "react-hook-form/dist/types";

interface Props {
    classes: ClassNameMap;
    displayName: string;
    disabled?: boolean;
    onChange?: (value: boolean) => void;
    onBlur?: Noop;
    name: string;
    value: boolean;
}

const CheckboxValueComponent: React.FunctionComponent<Props> = (props: Props) => {
    const {completed} = useContext(ConfigurationContext)

    return <FormControlLabel
        label={props.displayName}
        disabled={props.disabled}
        onChange={(_, value) => {
            if (props.onChange) {
                props.onChange(value)
            }
        }}
        onBlur={props.onBlur}
        name={props.name}
        value={props.value}
        control={
            <Checkbox
                sx={{paddingY: 0}}
                disabled={props.disabled || completed}
                id="form-complete"
                aria-label={props.name + '-checkbox'}
                checked={props.value}
                //onChange={(e) => fields.onChange(e.target.checked)}
            />
        }
    />;
}

export default CheckboxValueComponent;
