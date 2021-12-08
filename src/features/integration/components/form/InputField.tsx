import {
    Autocomplete,
    FormControl, FormControlLabel,
    FormLabel,
    InputLabel,
    MenuItem, Radio,
    RadioGroup,
    Select,
    SelectChangeEvent,
    TextField, Typography
} from '@mui/material';
import React from 'react';
import {INPUT_TYPE} from "../../types/InputType.enum";
import {ISelect} from "../../types/InputField";
import {InputDropZone} from "../dnd/InputDropZone";

const InputField: React.FunctionComponent<any> = (props) => {
    if (props.input === INPUT_TYPE.DROPDOWN) {
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
    else if (props.input === INPUT_TYPE.RADIO) {
        return (
            <FormControl component="fieldset" disabled={props.disabled}>
                <FormLabel>{props.label}</FormLabel>
                <RadioGroup row={true} onChange={(e) => props.setValue(props.formValue, e.target.value as string)} defaultValue={props.defaultValue} sx={{maxWidth: 400}}>
                    {props.radioOptions.map((option: any, index: number) => (
                        <div key={index}>
                            <FormControlLabel value={option.value} control={<Radio />} label={option.label} />
                            <Typography sx={{ fontSize: 14 }}>{option.description}</Typography>
                        </div>
                    ))}
                </RadioGroup>
            </FormControl>
        )
    } else if (props.input === INPUT_TYPE.AUTOCOMPLETE) {
        return (
            <FormControl size="small">
                <Autocomplete
                    sx={{ mb: 3 }}
                    id="tags-outlined"
                    options={props.dropdownItems}
                    onChange={(event, value) => props.setValue(props.formValue, value?.value)}
                    getOptionLabel={(option: ISelect) => option.label}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={props.label}
                            placeholder={props.label}
                        />
                    )}
                />
            </FormControl>
        )
    }
    else if (props.input === INPUT_TYPE.DRAG_DROP_TEXT_FIELD) {
        return (
            <InputDropZone label={props.label} setValue={props.setValue} formValue={props.formValue}/>
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
