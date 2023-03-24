import {Controller, useFormContext} from "react-hook-form"
import * as React from "react";
import {useContext} from "react";
import {Checkbox, FormControlLabel} from "@mui/material";
import {ConfigurationContext} from "../../../../context/configurationContext";

interface Props {
    absoluteKey: string;
    displayName: string;
    disabled?: boolean;
}

const CheckboxValueComponent: React.FunctionComponent<Props> = (props: Props) => {
    const {control} = useFormContext();
    const {completed} = useContext(ConfigurationContext)

    return (
        <FormControlLabel
            control={
                <Controller
                    name={props.absoluteKey}
                    control={control}
                    render={({field: fields}) => (
                        <Checkbox
                            {...fields}
                            disabled={props.disabled || completed}
                            id="form-complete"
                            checked={fields.value}
                            onChange={(e) => fields.onChange(e.target.checked)}
                            inputProps={{'aria-label': 'completed-checkbox'}}
                        />
                    )}
                />
            }
            label={props.displayName}
        />
    );
}

export default CheckboxValueComponent;
