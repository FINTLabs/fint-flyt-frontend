import {
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
            <FormControl className={props.style} component="fieldset">
                <FormLabel>Velg hvordan skjema skal sendes til arkivet</FormLabel>
                <RadioGroup onChange={(e) => props.setValue("caseData.caseCreationStrategy", e.target.value as string)} defaultValue={props.defaultValue} sx={{maxWidth: 400}}>
                    {props.radioOptions.map((option: any, index: number) => (
                        <div key={index}>
                            <FormControlLabel value={option.value} control={<Radio />} label={option.label} />
                            <Typography sx={{ fontSize: 14 }}>{option.description}</Typography>
                        </div>
                    ))}
                </RadioGroup>
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
