import {FormGroup} from '@mui/material';
import React from 'react';
import {dropdownPlaceholder} from "../../util/DefaultValues";
import InputField from "./InputField";
import {INPUT_TYPE} from "../../types/InputType.enum";
import {IInputField} from "../../types/InputField";

const ApplicantForm: React.FunctionComponent<any> = (props) => {
    const applicantFormFields: IInputField[] = [
        {input: INPUT_TYPE.TEXT_FIELD, label: "Navn", formValue: "applicantData.name"},
        {input: INPUT_TYPE.TEXT_FIELD, label: "Adresse", formValue: "applicantData.address"},
        {input: INPUT_TYPE.TEXT_FIELD, label: "Postnummer", formValue: "applicantData.postalCode"},
        {input: INPUT_TYPE.TEXT_FIELD, label: "Poststed", formValue: "applicantData.city"},
        {input: INPUT_TYPE.TEXT_FIELD, label: "Telefonnummer", formValue: "applicantData.phoneNumber"},
        {input: INPUT_TYPE.TEXT_FIELD, label: "Epost", formValue: "applicantData.email"},
        {input: INPUT_TYPE.DROPDOWN, label: "Tilgangskode", value: props.watch("applicantData.accessCode"), formValue: "applicantData.accessCode", dropDownItems: dropdownPlaceholder},
        {input: INPUT_TYPE.DROPDOWN, label: "Hjemmel", value: props.watch("applicantData.paragraph"), formValue: "applicantData.paragraph", dropDownItems: dropdownPlaceholder}
    ]

    return (
        <FormGroup className={props.style.formControl}>
            {applicantFormFields.map((field, index) => {
                return (
                    <InputField key={index}
                                input={field.input}
                                label={field.label}
                                value={field.value}
                                formValue={field.formValue}
                                dropdownItems={field.dropDownItems}
                                setValue={props.setValue}/>
                )}
            )}
        </FormGroup>
    );
}

export default ApplicantForm;