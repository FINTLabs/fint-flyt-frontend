import {Box, Button, FormGroup} from '@mui/material';
import React, {useContext} from 'react';
import {applicantOptions} from "../../defaults/DefaultValues";
import InputField from "./InputField";
import {INPUT_TYPE} from "../../types/InputType.enum";
import {IInputField} from "../../types/InputField";
import {ApplicantType} from "../../types/ApplicantType";
import {FieldErrors} from "react-hook-form";
import {ResourcesContext} from "../../../../resourcesContext";
import HelpPopover from "../popover/HelpPopover";
import { useTranslation } from 'react-i18next';

const ApplicantForm: React.FunctionComponent<any> = (props) => {
    const { t } = useTranslation('translations', { keyPrefix: 'pages.integrationForm.accordions.applicationForm'});
    const {accessCodes, paragraphs} = useContext(ResourcesContext);
    let isOrganisation = props.watch("applicantData.type") === ApplicantType.ORGANISATION
    let errors: FieldErrors = props.errors;
    let required: boolean = props.validation;
    const applicantFormFields: IInputField[] = [
        {input: INPUT_TYPE.RADIO, label: "labels.applicantType", formValue: "applicantData.type", value: props.watch("applicantData.type"), radioOptions: applicantOptions, helpText: "applicantData.type"},
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "labels.organisationNumber", formValue: "applicantData.organisationNumber", required:isOrganisation && required, hidden:!isOrganisation, error:errors.applicantData?.organisationNumber, value: props.activeFormData?.applicantData?.organisationNumber, helpText: "applicantData.organisationNumber"},
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "labels.nationalIdentityNumber", formValue: "applicantData.nationalIdentityNumber", required:!isOrganisation && required, hidden:isOrganisation, error:errors.applicantData?.nationalIdentityNumber, value: props.activeFormData?.applicantData?.nationalIdentityNumber, helpText: "applicantData.nationalIdentityNumber"},
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "labels.applicantnName", formValue: "applicantData.name", required:required, error:errors.applicantData?.name, value: props.activeFormData?.applicantData?.name, helpText: "applicantData.name"},
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "labels.address", formValue: "applicantData.address", required:required, error:errors.applicantData?.address, value: props.activeFormData?.applicantData?.address, helpText: "applicantData.address"},
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "labels.postalCode", formValue: "applicantData.postalCode", required:required, error:errors.applicantData?.postalCode, value: props.activeFormData?.applicantData?.postalCode, helpText: "applicantData.postalCode"},
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "labels.city", formValue: "applicantData.city", required:required, error:errors.applicantData?.city, value: props.activeFormData?.applicantData?.city, helpText: "applicantData.city"},
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "labels.contactPerson", formValue: "applicantData.contactPerson", required:required, error:errors.applicantData?.contactPerson, value: props.activeFormData?.applicantData?.contactPerson, helpText: "applicantData.contactPerson"},
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "labels.phoneNumber", formValue: "applicantData.phoneNumber", required:required, error:errors.applicantData?.phoneNumber, value: props.activeFormData?.applicantData?.phoneNumber, helpText: "applicantData.phoneNumber"},
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "labels.email", formValue: "applicantData.email", required:required, error:errors.applicantData?.email, value: props.activeFormData?.applicantData?.email, helpText: "applicantData.email"},
        {input: INPUT_TYPE.DROPDOWN, label: "labels.accessCode", value: props.watch("applicantData.accessCode"), formValue: "applicantData.accessCode", dropDownItems: accessCodes, required:required, error:errors.applicantData?.accessCode, helpText: "applicantData.accessCode"},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.paragraph", value: props.watch("applicantData.paragraph"), formValue: "applicantData.paragraph", dropDownItems: paragraphs, required:required, error:errors.applicantData?.paragraph, helpText: "applicantData.paragraph"}
    ]

    return (
        <div>
            <FormGroup id="applicant-form" className={props.style.formControl}>
                {applicantFormFields.map((field, index) => {
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
            <Button sx={{mb: 2}} onClick={props.onSave} variant="contained">{t('button.save')}</Button>
        </div>
    );
}

export default ApplicantForm;