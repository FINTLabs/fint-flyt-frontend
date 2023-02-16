import {
    Autocomplete, createFilterOptions,
    FormControl, FormControlLabel,
    FormLabel,
    MenuItem, Radio,
    RadioGroup, TextareaAutosize,
    TextField, Typography
} from '@mui/material';
import React from 'react';
import {Controller} from 'react-hook-form';
import {INPUT_TYPE} from "../../types/InputType.enum";
import {ISelect} from "../../types/InputField";
import {TextFieldWithDropZone} from "../dnd/TextFieldWithDropZone";
import {makeStyles} from "@mui/styles";
import {dropdownPlaceholder} from "../../defaults/DefaultValues";
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
    dropdownPopover: {
        height: 450
    }
}));
const InputField: React.FunctionComponent<any> = (props) => {
    const { t } = useTranslation('translations', { keyPrefix: 'inputField'});
    const classes = useStyles();
    const filterOptions = createFilterOptions({
        matchFrom: 'any',
        stringify: (option: ISelect) => option.label,
        limit: 250
    });
    let errorMessage: string = t('errorMessage') + t(props.label);
    if (props.input === INPUT_TYPE.DROPDOWN) {
        return (
            <Controller
                name={props.formValue}
                control={props.control}
                render={({ field: { onChange } }) => (
                    <TextField
                        id={props.formValue}
                        InputLabelProps={{ shrink: true }}
                        select
                        size="small"
                        sx={{ mb: 3, width: 'inherit' }}
                        value={props.value}
                        label={props.required ? (t(props.label)) +'*' : t(props.label)}
                        SelectProps={{
                            MenuProps: {
                                className: classes.dropdownPopover
                            },
                        }}
                        onChange={e => {
                            props.setter && props.setter(e.target)
                            onChange(e.target.value);
                        }}
                        error={!!props.error && props.required}
                        helperText={(props.error && props.required) ? t('requiredField') : ''}
                    >
                        {props.dropdownItems.map((item: any, index: number) => (
                            <MenuItem key={index} value={item.value} disabled={item.disabled}>{item.label}</MenuItem>
                        ))}
                    </TextField>
                )}
                rules={{ required: { value: props.required, message: errorMessage } }}
            />
        )
    }
    else if (props.input === INPUT_TYPE.RADIO) {
        return (
            <FormControl component="fieldset" sx={{ mb: 3 }}>
                <FormLabel role="label">{t(props.label)}</FormLabel>
                <RadioGroup id={props.formValue}
                            row={true}
                            onChange={(e) =>
                                props.setValue(props.formValue, e.target.value as string)}
                            value={props.value}
                            sx={{maxWidth: 400}}
                >
                    {props.radioOptions.map((option: any, index: number) => (
                        <div key={index} id={props.formValue + `-` + option.value}>
                            <FormControlLabel
                                disabled={props.disabled || option.disabled}
                                value={option.value}
                                control={<Radio />}
                                label={t(option.label) as string}
                            />
                            <Typography sx={{ fontSize: 14 }}>{option.description ? t(option.description) : ''}</Typography>
                        </div>
                    ))}
                </RadioGroup>
            </FormControl>
        )
    } else if (props.input === INPUT_TYPE.AUTOCOMPLETE) {
        let dropdowns: ISelect[] = props.dropdownItems ? props.dropdownItems : dropdownPlaceholder
        return (
            <Controller
                name={props.formValue}
                control={props.control}
                render={({ field: { onChange } }) => (
                    <Autocomplete
                        id={props.formValue}
                        disabled={props.disabled || props.disabledField}
                        sx={{ mb: 3 }}
                        filterOptions={filterOptions}
                        options={dropdowns}
                        getOptionLabel={(option: ISelect) => option.label}
                        value={props.value? props.dropdownItems.find( ({value} : {value:any}) => value === props.value ): null}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                size="small"
                                label={props.required ? t((props.label)) +'*' : t(props.label)}
                                error={!!props.error && props.required}
                                helperText={(props.error && props.required) ? t('requiredField') : ''}
                            />
                        )}
                        onChange={(e, data) => {
                            props.setter && props.setter(data)
                            onChange(data?.value)
                        }
                        }/>
                )}
                rules={{ required: { value: props.required, message: errorMessage } }}
            />
        )
    }
    else if (props.input === INPUT_TYPE.DROPZONE_TEXT_FIELD) {
        return (
            <TextFieldWithDropZone
                id={props.formValue}
                control={props.control}
                error={props.error}
                label={props.label}
                value={props.value}
                setValue={props.setValue}
                formValue={props.formValue}
                required={props.required}
                disabled={props.disabled || props.disabledField}
                validation={props.validation}
                errors={props.errors}
                {...props}
            />
        )
    }
    else if (props.input === INPUT_TYPE.TEXT_AREA) {
        return (
            <Controller
                control={props.control}
                name={props.formValue}
                defaultValue=""
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextareaAutosize
                        disabled={props.disabled || props.disabledField}
                        id={props.formValue}
                        placeholder={props.required ? (t(props.label)) +'*' : t(props.label)}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        minRows={3}
                        style={{fontFamily: 'sans-serif', fontSize: '16px', width: '600px'}}
                    />
                )}
                rules={{ required: { value: props.required, message: errorMessage }} }
            />
        )
    }
    else {
        return (
            <Controller
                control={props.control}
                name={props.formValue}
                defaultValue=""
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextField
                        InputLabelProps={{ shrink: true }}
                        disabled={props.disabled || props.disabledField}
                        id={props.formValue}
                        label={props.required ? (t(props.label)) +'*' : t(props.label)}
                        size="small"
                        variant="outlined"
                        sx={{ mb: 3, width: 'inherit'}}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={props.disabledField ? props.value : value}
                        error={!!props.error && props.required}
                        helperText={(props.error && props.required) ? t('requiredField') : ''}
                    />
                )}
                rules={{ required: { value: props.required, message: errorMessage }} }
            />
        )
    }
}

export default InputField;
