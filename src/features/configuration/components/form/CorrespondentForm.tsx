import {Box, Checkbox, FormControlLabel, FormGroup} from '@mui/material';
import React, {useContext} from 'react';
import InputField from "./InputField";
import {INPUT_TYPE} from "../../types/InputType.enum";
import {IInputField} from "../../types/InputField";
import {FieldErrors} from "react-hook-form";
import {ResourcesContext} from "../../../../context/resourcesContext";
import HelpPopover from "../popover/HelpPopover";
import { useTranslation } from 'react-i18next';
import {correspondentType, correspondentTypeOptions} from "../../defaults/DefaultValues";

const CorrespondentForm: React.FunctionComponent<any> = (props) => {
    const { t } = useTranslation('translations', { keyPrefix: 'pages.configurationForm.accordions.correspondentForm'});
    const {accessCodes, paragraphs} = useContext(ResourcesContext);
    let errors: FieldErrors = props.errors;
    let required: boolean = props.validation;

    const correspondentFormFields: IInputField[] = [
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.correspondentType", value: correspondentType, formValue: "recordData.correspondent.type", dropDownItems: correspondentTypeOptions, required: false, error:errors.recordData?.correspondent?.type, helpText: "recordData.correspondentType", disabled: true},
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "labels.organisationNumber", formValue: "recordData.correspondent.organisationNumber", required:false, error:errors.recordData?.correspondent?.organisationNumber, value: props.activeFormData?.recordData.correspondent?.organisationNumber, helpText: "recordData.organisationNumber"},
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "labels.nationalIdentityNumber", formValue: "recordData.correspondent.nationalIdentityNumber", required: false, error:errors.recordData?.correspondent?.nationalIdentityNumber, value: props.activeFormData?.recordData.correspondent?.nationalIdentityNumber, helpText: "recordData.nationalIdentityNumber"},
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "labels.correspondentName", formValue: "recordData.correspondent.name", required:required, error:errors.recordData?.correspondent?.name, value: props.activeFormData?.recordData.correspondent?.name, helpText: "recordData.name"},
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "labels.address", formValue: "recordData.correspondent.address", required:false, error:errors.recordData?.correspondent?.address, value: props.activeFormData?.recordData.correspondent?.address, helpText: "recordData.address"},
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "labels.postalCode", formValue: "recordData.correspondent.postalCode", required:false, error:errors.recordData?.correspondent?.postalCode, value: props.activeFormData?.recordData.correspondent?.postalCode, helpText: "recordData.postalCode"},
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "labels.city", formValue: "recordData.correspondent.city", required:false, error:errors.recordData?.correspondent?.city, value: props.activeFormData?.recordData.correspondent?.city, helpText: "recordData.city"},
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "labels.contactPerson", formValue: "recordData.correspondent.contactPerson", required:false, error:errors.recordData?.correspondent?.contactPerson, value: props.activeFormData?.recordData.correspondent?.contactPerson, helpText: "recordData.contactPerson"},
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "labels.phoneNumber", formValue: "recordData.correspondent.phoneNumber", required:false, error:errors.recordData?.correspondent?.phoneNumber, value: props.activeFormData?.recordData.correspondent?.phoneNumber, helpText: "recordData.phoneNumber"},
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "labels.email", formValue: "recordData.correspondent.email", required:false, error:errors.recordData?.correspondent?.email, value: props.activeFormData?.recordData.correspondent?.email, helpText: "recordData.email"},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.accessCode", value: props.watch("recordData.correspondent.accessCode"), formValue: "recordData.correspondent.accessCode", dropDownItems: accessCodes, required:required && props.protectedCheck, error:errors.recordData?.correspondent?.accessCode, helpText: "recordData.accessCode", hidden: !props.protectedCheck},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.paragraph", value: props.watch("recordData.correspondent.paragraph"), formValue: "recordData.correspondent.paragraph", dropDownItems: paragraphs, required:required && props.protectedCheck, error:errors.recordData?.correspondent?.paragraph, helpText: "recordData.paragraph", hidden: !props.protectedCheck}
    ]

    return (
        <div>
            <FormGroup id="correspondent-form" className={props.style.formControl}>
                {correspondentFormFields.map((field, index) => {
                    return (
                        field.hidden ?
                            <div key={index}/> :
                            <Box sx={{display: 'flex'}} key={index} id={field.formValue}>
                                <Box width={'100%'}>
                                    <InputField required={field.required}
                                                error={field.error}
                                                input={field.input}
                                                label={field.label}
                                                value={field.value}
                                                formValue={field.formValue}
                                                radioOptions={field.radioOptions}
                                                dropdownItems={field.dropDownItems}
                                                setter={field.setter}
                                                disabledField={field.disabled}
                                                {...props}
                                    />
                                </Box>
                                <Box>
                                    <HelpPopover popoverContent={field.helpText}/>
                                </Box>
                            </Box>
                    )}
                )}
            </FormGroup>
            <FormGroup sx={{ ml: 2, mb: 2, flexDirection: 'row'}} >
                <FormControlLabel
                    control={
                        <Checkbox
                            disabled={props.disabled}
                            id="form-complete"
                            checked={props.protectedCheck}
                            onChange={event => props.setProtectedChecked(event.target.checked)}
                            inputProps={{ 'aria-label': 'completed-checkbox' }}/>}
                    label={t('protectedLabel') as string}
                />
                <HelpPopover popoverContent={"recordData.protected"}/>
            </FormGroup>
        </div>
    );
}

export default CorrespondentForm;
