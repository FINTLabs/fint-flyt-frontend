import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField} from '@mui/material';
import React from 'react';
import {INPUT_TYPES} from "../../types/InputTypes.enum";

const InputField: React.FunctionComponent<any> = (props) => {
    if (props.input === INPUT_TYPES.DROPDOWN) {
        return (
            <FormControl size="small" sx={{ mb: 3 }}>
                <InputLabel>{props.label}</InputLabel>
                <Select value={props.value} label={props.label}
                        onChange={(e: SelectChangeEvent) => props.setValue(props.formValue, e.target.value as string)}>
                    {props.dropdownItems.map((item: any, index: number) => (
                        <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        )
    }
    else {
        return (
            <FormControl>
                <TextField onChange={(e) => props.setValue(props.formValue, e.target.value as string)}
                           size="small" variant="outlined" label={props.label} sx={{ mb: 3 }}/>
            </FormControl>
        )
    }
}

export default InputField;