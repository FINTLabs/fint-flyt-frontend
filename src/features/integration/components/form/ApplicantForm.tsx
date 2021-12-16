import {FormGroup} from '@mui/material';
import React from 'react';
import {applicantOptions, dropdownPlaceholder} from "../../util/DefaultValues";
import InputField from "./InputField";
import {INPUT_TYPE} from "../../types/InputType.enum";
import {IInputField} from "../../types/InputField";
import {ApplicantType} from "../../types/ApplicantType";
import {FieldErrors} from "react-hook-form";

const ApplicantForm: React.FunctionComponent<any> = (props) => {
    let isOrganisation = props.watch("applicantData.type") === ApplicantType.ORGANISATION
    let errors: FieldErrors = props.errors
    const applicantFormFields: IInputField[] = [
        {input: INPUT_TYPE.RADIO, label: "Velg avsendertype", formValue: "applicantData.type", value: props.watch("applicantData.type"), radioOptions: applicantOptions, defaultValue: applicantOptions[0].value},
        {input: INPUT_TYPE.TEXT_FIELD, label: "Organisasjonsnummer", formValue: "applicantData.organisationNumber", required:isOrganisation, hidden:!isOrganisation, error:errors.applicantData?.organisationNumber},
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "Navn", formValue: "applicantData.name"},
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "Adresse", formValue: "applicantData.address"},
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "Postnummer", formValue: "applicantData.postalCode"},
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "Poststed", formValue: "applicantData.city"},
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "Telefonnummer", formValue: "applicantData.phoneNumber"},
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "Epost", formValue: "applicantData.email"},
        {input: INPUT_TYPE.DROPDOWN, label: "Tilgangskode", value: props.watch("applicantData.accessCode"), formValue: "applicantData.accessCode", dropDownItems: dropdownPlaceholder},
        {input: INPUT_TYPE.DROPDOWN, label: "Hjemmel", value: props.watch("applicantData.paragraph"), formValue: "applicantData.paragraph", dropDownItems: dropdownPlaceholder}
    ]

    return (
        <div>
            <FormGroup className={props.style.formControl}>
                {applicantFormFields.map((field, index) => {
                    return (
                        field.hidden ?
                            <div key={index}/> :
                            <InputField key={index}
                                        required={field.required}
                                        error={field.error}
                                        disabled={field.hidden}
                                        input={field.input}
                                        label={field.label}
                                        value={field.value}
                                        formValue={field.formValue}
                                        dropdownItems={field.dropDownItems}
                                        radioOptions={field.radioOptions}
                                        defaultValue={field.defaultValue}
                                        {...props}
                            />
                    )}
                )}
            </FormGroup>
        </div>
    );
}

export default ApplicantForm;