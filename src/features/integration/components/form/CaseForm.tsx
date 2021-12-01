import {FormGroup} from '@mui/material';
import React from 'react';
import {dropdownPlaceholder} from "../../util/DefaultValues";
import {IInputField} from "../../types/InputField";
import {INPUT_TYPE} from "../../types/InputType.enum";
import InputField from "./InputField";

const CaseForm: React.FunctionComponent<any> = (props) => {
    const caseFormFields: IInputField[] = [
        {input: INPUT_TYPE.TEXT_FIELD, label: "Tittel", formValue: "caseData.title.value"},
        {input: INPUT_TYPE.TEXT_FIELD, label: "Offentlig tittel", formValue: "caseData.publicTitle.value"},
        {input: INPUT_TYPE.DROPDOWN, label: "Sakstype", value: props.watch("caseData.caseType"), formValue: "caseData.caseType", dropDownItems: dropdownPlaceholder},
        {input: INPUT_TYPE.DROPDOWN, label: "Administrativ enhet", value: props.watch("caseData.administrativeUnit"), formValue: "caseData.administrativeUnit", dropDownItems: dropdownPlaceholder},
        {input: INPUT_TYPE.DROPDOWN, label: "Arkivdel", value: props.watch("caseData.archiveUnit"), formValue: "caseData.archiveUnit", dropDownItems: dropdownPlaceholder},
        {input: INPUT_TYPE.DROPDOWN, label: "Journalenhet", value: props.watch("caseData.recordUnit"), formValue: "caseData.recordUnit", dropDownItems: dropdownPlaceholder},
        {input: INPUT_TYPE.DROPDOWN, label: "Tilgangskode", value: props.watch("caseData.accessCode"), formValue: "caseData.accessCode", dropDownItems: dropdownPlaceholder},
        {input: INPUT_TYPE.DROPDOWN, label: "Hjemmel", value: props.watch("caseData.paragraph"), formValue: "caseData.paragraph", dropDownItems: dropdownPlaceholder},
        {input: INPUT_TYPE.TEXT_FIELD, label: "Saksansvarlig", formValue: "caseData.caseWorker"},
        {input: INPUT_TYPE.TEXT_FIELD, label: "Primær ordningsprinsipp", formValue: "caseData.primaryClassification.value"},
        {input: INPUT_TYPE.TEXT_FIELD, label: "Sekundær ordningsprinsipp", formValue: "caseData.secondaryClassification.value"},
        {input: INPUT_TYPE.DROPDOWN, label: "Primærklasse", value: props.watch("caseData.primaryClass"), formValue: "caseData.primaryClass", dropDownItems: dropdownPlaceholder},
        {input: INPUT_TYPE.DROPDOWN, label: "Sekundærklasse", value: props.watch("caseData.secondaryClass"), formValue: "caseData.secondaryClass", dropDownItems: dropdownPlaceholder}
    ]
    return (
        <FormGroup className={props.style.formControl}>
            {caseFormFields.map((field, index) => {
                return (
                    <InputField key={index}
                                input={field.input}
                                label={field.label}
                                value={field.value}
                                formValue={field.formValue}
                                dropdownItems={field.dropDownItems}
                                setValue={props.setValue}
                    />
                )}
            )}
        </FormGroup>
    );
}

export default CaseForm;