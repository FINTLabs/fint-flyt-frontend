import {Box, Divider, FormGroup, Typography} from '@mui/material';
import React, {useContext} from 'react';
import {IFieldGroup, IFieldValue, IInputFieldGroup} from "../../types/InputField";
import {toInputType} from "../../types/InputType.enum";
import InputField from "./InputField";
import {FieldErrors} from "react-hook-form";
import {ResourcesContext} from "../../../../context/resourcesContext";
import HelpPopover from "../popover/HelpPopover";
import { useTranslation } from 'react-i18next';
import {toDisabledProp, toHiddenProp, toRequiredProp} from "./FormUtil";

const DocumentForm: React.FunctionComponent<any> = (props) => {
    const { t } = useTranslation('translations', { keyPrefix: 'pages.configurationForm.accordions.documentForm'});
    const {getResourcesByName} = useContext(ResourcesContext);
    let errors: FieldErrors = props.errors;
    let watch = props.watch;
    let activeConfiguration = props.activeConfiguration;
    const inputFieldGroups: IFieldGroup[] = props.inputFieldGroups;

    //TODO: support deeper nested
    function toErrorProp(error: string) {
        let errorField = error.split('.');
        return (errors?.[errorField[0]]?.[errorField[1]])
    }
    function toValueByFormData(input: IFieldValue, activeFormData: any, watcher: Function) {
        if(input.source === "FORM") {
            let valueField = input.value.split('.');
            return (activeFormData?.[valueField[0]]?.[valueField[1]])
        }
        else {
            return watcher(input.value)
        }

    }


    const testList: IInputFieldGroup[] = inputFieldGroups.map(group => {
        return ({
            header: group.header,
            fields: group.fields.map(field => {
                return ({
                    input: toInputType(field.input),
                    label: field.label,
                    formValue: field.formValue,
                    value: field.value ? toValueByFormData(field.value, props.activeFormData, watch) : undefined,
                    options: field.options ? getResourcesByName(field.options) : [],
                    helpText: field.helpText,
                    hidden: field.hidden ? toHiddenProp(field.hidden, watch, activeConfiguration) : undefined,
                    error: field.error ? toErrorProp(field.error) : undefined,
                    required: field.required ? toRequiredProp(field.required, watch, activeConfiguration, props.validation) : false,
                    searchOption: field.searchOption ? field.searchOption : false,
                    disabled: field.disabled ? toDisabledProp(field.disabled, activeConfiguration) : undefined

                })
            })
        })
    })

    return (
        <div>
            <FormGroup className={props.style.formControl}>
                {testList.map((item, index) => {
                    return(<>
                            <Typography>{item.header}</Typography>
                            <Divider sx={{mb: 3}}/>
                            {item.fields.map((field, index) => {
                                return (
                                    <Box sx={{display: 'flex'}} key={index}>
                                        <Box width={'100%'}>
                                            <InputField required={field.required}
                                                        error={field.error}
                                                        input={field.input}
                                                        label={field.label}
                                                        value={field.value}
                                                        formValue={field.formValue}
                                                        dropdownItems={field.options}
                                                        setter={field.setter}
                                                        disabled={field.disabled}
                                                        {...props}
                                            />
                                        </Box>
                                        <Box>
                                            <HelpPopover popoverContent={field.helpText}/>
                                        </Box>
                                    </Box>
                                )
                            })}
                        </>
                )
                })}
            </FormGroup>
        </div>
    );
}

export default DocumentForm;
