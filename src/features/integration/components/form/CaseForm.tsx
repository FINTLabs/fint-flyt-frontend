import {FormGroup} from '@mui/material';
import React from 'react';
import {caseWorkers, dropdownPlaceholder} from "../../util/DefaultValues";
import {IInputField} from "../../types/InputField";
import {INPUT_TYPE} from "../../types/InputType.enum";
import InputField from "./InputField";
import {CreationStretegy} from "../../types/CreationStretegy";

const CaseForm: React.FunctionComponent<any> = (props) => {
    const caseFormFields: IInputField[] = [
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "Tittel", formValue: "caseData.title"},
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "Offentlig tittel", formValue: "caseData.publicTitle"},
        {input: INPUT_TYPE.DROPDOWN, label: "Sakstype", value: props.watch("caseData.caseType"), formValue: "caseData.caseType", dropDownItems: dropdownPlaceholder},
        {input: INPUT_TYPE.DROPDOWN, label: "Administrativ enhet", value: props.watch("caseData.administrativeUnit"), formValue: "caseData.administrativeUnit", dropDownItems: dropdownPlaceholder},
        {input: INPUT_TYPE.DROPDOWN, label: "Arkivdel", value: props.watch("caseData.archiveUnit"), formValue: "caseData.archiveUnit", dropDownItems: dropdownPlaceholder},
        {input: INPUT_TYPE.DROPDOWN, label: "Journalenhet", value: props.watch("caseData.recordUnit"), formValue: "caseData.recordUnit", dropDownItems: dropdownPlaceholder},
        {input: INPUT_TYPE.DROPDOWN, label: "Tilgangskode", value: props.watch("caseData.accessCode"), formValue: "caseData.accessCode", dropDownItems: dropdownPlaceholder},
        {input: INPUT_TYPE.DROPDOWN, label: "Hjemmel", value: props.watch("caseData.paragraph"), formValue: "caseData.paragraph", dropDownItems: dropdownPlaceholder},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "Saksansvarlig", dropDownItems: caseWorkers, formValue: "caseData.caseWorker"},
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "Primær ordningsprinsipp", formValue: "caseData.primaryClassification"},
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "Sekundær ordningsprinsipp", formValue: "caseData.secondaryClassification"},
        {input: INPUT_TYPE.DROPDOWN, label: "Primærklasse", value: props.watch("caseData.primaryClass"), formValue: "caseData.primaryClass", dropDownItems: dropdownPlaceholder},
        {input: INPUT_TYPE.DROPDOWN, label: "Sekundærklasse", value: props.watch("caseData.secondaryClass"), formValue: "caseData.secondaryClass", dropDownItems: dropdownPlaceholder}
    ]
    const caseFormFieldsCollection: IInputField[] = [
        {input: INPUT_TYPE.TEXT_FIELD, label: "Saksnummer", formValue: "id",},
   ]

    let requiredFields = (props.watch("caseData.caseCreationStrategy") === CreationStretegy.COLLECTION) ? caseFormFieldsCollection : caseFormFields

    return (
        <FormGroup className={props.style.formControl}>
            {requiredFields.map((field, index) => {
                return (
                    <InputField key={index}
                                disabled={field.hidden}
                                input={field.input}
                                label={field.label}
                                value={field.value}
                                formValue={field.formValue}
                                dropdownItems={field.dropDownItems}
                                {...props}
                    />
                )}
            )}
        </FormGroup>
    );
}

export default CaseForm;