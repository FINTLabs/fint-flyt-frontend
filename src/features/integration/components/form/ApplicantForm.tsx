import {Box, FormGroup} from '@mui/material';
import React, {useContext} from 'react';
import {applicantOptions, fieldHelp} from "../../defaults/DefaultValues";
import InputField from "./InputField";
import {INPUT_TYPE} from "../../types/InputType.enum";
import {IInputField} from "../../types/InputField";
import {ApplicantType} from "../../types/ApplicantType";
import {FieldErrors} from "react-hook-form";
import {ResourcesContext} from "../../../../resourcesContext";
import HelpPopover from "../popover/HelpPopover";

const ApplicantForm: React.FunctionComponent<any> = (props) => {
    const {accessCodes, paragraphs} = useContext(ResourcesContext);
    let isOrganisation = props.watch("applicantData.type") === ApplicantType.ORGANISATION
    let errors: FieldErrors = props.errors;
    let required: boolean = props.validation;
    const applicantFormFields: IInputField[] = [
        {input: INPUT_TYPE.RADIO, label: "Velg avsendertype", formValue: "applicantData.type", value: props.watch("applicantData.type"), radioOptions: applicantOptions, defaultValue: props.watch("applicantData.type"), helpText: fieldHelp.applicantData.type},
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "Organisasjonsnummer", formValue: "applicantData.organisationNumber", required:isOrganisation && required, hidden:!isOrganisation, error:errors.applicantData?.organisationNumber, value: props.activeFormData?.applicantData?.organisationNumber, helpText: fieldHelp.applicantData.organisationNumber},
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "Fødselsnummer", formValue: "applicantData.socialSecurityNumber", required:!isOrganisation && required, hidden:isOrganisation, error:errors.applicantData?.socialSecurityNumber, value: props.activeFormData?.applicantData?.socialSecurityNumber, helpText: fieldHelp.applicantData.socialSecurityNumber},
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "Navn", formValue: "applicantData.name", required:required, error:errors.applicantData?.name, value: props.activeFormData?.applicantData?.name, helpText: fieldHelp.applicantData.name},
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "Adresse", formValue: "applicantData.address", required:required, error:errors.applicantData?.address, value: props.activeFormData?.applicantData?.address, helpText: fieldHelp.applicantData.address},
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "Postnummer", formValue: "applicantData.postalCode", required:required, error:errors.applicantData?.postalCode, value: props.activeFormData?.applicantData?.postalCode, helpText: fieldHelp.applicantData.postalCode},
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "Poststed", formValue: "applicantData.city", required:required, error:errors.applicantData?.city, value: props.activeFormData?.applicantData?.city, helpText: fieldHelp.applicantData.city},
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "Telefonnummer", formValue: "applicantData.phoneNumber", required:required, error:errors.applicantData?.phoneNumber, value: props.activeFormData?.applicantData?.phoneNumber, helpText: fieldHelp.applicantData.phoneNumber},
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "Epost", formValue: "applicantData.email", required:required, error:errors.applicantData?.email, value: props.activeFormData?.applicantData?.email, helpText: fieldHelp.applicantData.email},
        {input: INPUT_TYPE.DROPDOWN, label: "Tilgangskode", value: props.watch("applicantData.accessCode"), formValue: "applicantData.accessCode", dropDownItems: accessCodes, required:required, error:errors.applicantData?.accessCode, helpText: fieldHelp.applicantData.accessCode},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "Hjemmel", value: props.watch("applicantData.paragraph"), formValue: "applicantData.paragraph", dropDownItems: paragraphs, required:required, error:errors.applicantData?.paragraph, helpText: fieldHelp.applicantData.paragraph},
    ]

    return (
        <div>
            <FormGroup className={props.style.formControl}>
                {applicantFormFields.map((field, index) => {
                    return (
                        field.hidden ?
                            <div key={index}/> :
                            <Box sx={{display: 'flex'}} key={index}>
                                <Box width={'100%'}>
                                    <InputField required={field.required}
                                                error={field.error}
                                                input={field.input}
                                                label={field.label}
                                                value={field.value}
                                                formValue={field.formValue}
                                                radioOptions={field.radioOptions}
                                                defaultValue={field.defaultValue}
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
        </div>
    );
}

export default ApplicantForm;