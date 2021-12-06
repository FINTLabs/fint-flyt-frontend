import {FormGroup, Typography} from '@mui/material';
import React from 'react';
import {dropdownPlaceholder} from "../../util/DefaultValues";
import InputField from "./InputField";
import {INPUT_TYPE} from "../../types/InputType.enum";
import {IInputField} from "../../types/InputField";
import {Tag} from "../dnd/Tag";
import {InputDropzone} from "./InputDropZone";

const ApplicantForm: React.FunctionComponent<any> = (props) => {
    const applicantFormFields: IInputField[] = [
        {input: INPUT_TYPE.DROPDOWN, label: "Tilgangskode", value: props.watch("applicantData.accessCode"), formValue: "applicantData.accessCode", dropDownItems: dropdownPlaceholder},
        {input: INPUT_TYPE.DROPDOWN, label: "Hjemmel", value: props.watch("applicantData.paragraph"), formValue: "applicantData.paragraph", dropDownItems: dropdownPlaceholder}
    ]

    return (
        <div>
            <FormGroup className={props.style.formControl}>
                <InputDropzone label={"Navn"} setValue={props.setValue} formValue="applicantData.name"/>
                <InputDropzone label={"Adresse"} setValue={props.setValue} formValue="applicantData.address"/>
                <InputDropzone label={"Postnummer"} setValue={props.setValue} formValue="applicantData.postalCode"/>
                <InputDropzone label={"Poststed"} setValue={props.setValue} formValue="applicantData.city"/>
                <InputDropzone label={"Telefonnummer"} setValue={props.setValue} formValue="applicantData.phoneNumber"/>
                <InputDropzone label={"Epost"} setValue={props.setValue} formValue="applicantData.email"/>
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
            <div style={{ width: '600px', overflow: 'hidden', clear: 'both', border: 'solid black 1px', padding: '5px'}}>
                <Typography> Data fra skjema</Typography>
                <Tag value="{fornavn}" name="Fornavn"/>
                <Tag value={"{etternavn}"} name="Etternavn"/>
                <Tag value={"{fodselsnummer}"} name="Fødselsnummer" />
                <Tag value={"{adresse}"} name="Adresse" />
                <Tag value={"{postnummer}"} name="Postnummer" />
                <Tag value={"{poststed}"} name="Poststed" />
                <Tag value={"{telfonnummer}"} name="Telefonnummer" />
                <Tag value={"{email}"} name="Email" />
            </div>
        </div>
    );
}

export default ApplicantForm;