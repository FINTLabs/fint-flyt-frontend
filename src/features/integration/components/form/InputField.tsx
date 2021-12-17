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
import {Controller} from 'react-hook-form';
import {INPUT_TYPE} from "../../types/InputType.enum";
import {ISelect} from "../../types/InputField";
import {TextFieldWithDropZone} from "../dnd/TextFieldWithDropZone";

const InputField: React.FunctionComponent<any> = (props) => {
    let errorMessage: string = 'Du må oppgi ' + props.label;
    if (props.input === INPUT_TYPE.DROPDOWN) {
        return (
            <FormControl size="small" sx={{ mb: 3 }}>
                <InputLabel>{props.label}</InputLabel>
                <Select value={props.value}
                        label={props.label}
                        onChange={(e: SelectChangeEvent) =>
                            props.setValue(props.formValue, e.target.value as string)}
                >
                    {props.dropdownItems.map((item: any, index: number) => (
                        <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        )
    }
    else if (props.input === INPUT_TYPE.RADIO) {
        return (
            <FormControl component="fieldset" sx={{ mb: 3 }}>
                <FormLabel>{props.label}</FormLabel>
                <RadioGroup row={true}
                            onChange={(e) =>
                                props.setValue(props.formValue, e.target.value as string)}
                            defaultValue={props.defaultValue}
                            sx={{maxWidth: 400}}
                >
                    {props.radioOptions.map((option: any, index: number) => (
                        <div key={index}>
                            <FormControlLabel
                                value={option.value}
                                control={<Radio />}
                                label={option.label}
                            />
                            <Typography sx={{ fontSize: 14 }}>{option.description}</Typography>
                        </div>
                    ))}
                </RadioGroup>
            </FormControl>
        )
    } else if (props.input === INPUT_TYPE.AUTOCOMPLETE) {
        return (
            <Controller
                name={props.formValue}
                control={props.control}
                render={({ field: { onChange } }) => (
                    <Autocomplete
                        sx={{ mb: 3 }}
                        options={props.dropdownItems}
                        getOptionLabel={(option: ISelect) => option.label}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                size="small"
                                label={props.required ? (props.label+'*') : props.label}
                                placeholder={props.label}
                                error={!!props.error}
                                helperText={props.error ? 'Obligatorisk felt' : ''}
                            />
                        )}
                        onChange={(_, data) => onChange(data?.value)}
                    />
                )}
                rules={{ required: { value: true, message: errorMessage } }}
            />
        )
    }
    else if (props.input === INPUT_TYPE.DROPZONE_TEXT_FIELD) {
        return (
            <TextFieldWithDropZone
                label={props.label}
                setValue={props.setValue}
                formValue={props.formValue}
                disabled={props.disabled}
            />
        )
    }
    else {
        return (
            <Controller
                control={props.control}
                name={props.formValue}
                defaultValue=""
                render={({ field: { onChange, onBlur, value, ref } }) => (
                    <TextField
                        label={props.required ? (props.label+'*') : props.label}
                        size="small"
                        variant="outlined"
                        sx={{ mb: 3 }}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        error={!!props.error}
                        helperText={props.error ? 'Obligatorisk felt' : ''}
                    />
                )}
                rules={{ required: { value: props.required, message: errorMessage } }}
            />
        )
    }
}

export default InputField;
