import {FormGroup} from '@mui/material';
import React from 'react';
import InputField from "./InputField";
import {INPUT_TYPE} from "../../types/InputType.enum";
import {IInputField} from "../../types/InputField";
import {creationStrategies, forms} from "../../util/DefaultValues";
import {CreationStretegy} from "../../types/CreationStretegy";
import {FieldErrors} from "react-hook-form";

const CaseInformation: React.FunctionComponent<any> = (props) => {
    let errors: FieldErrors = props.errors
    const caseInformationFields: IInputField[] = [
        {input: INPUT_TYPE.TEXT_FIELD, label: "Navn", formValue: "name", required: true, error:errors.name},
        {input: INPUT_TYPE.TEXT_FIELD, label: "Beskrivelse", formValue: "description", required: true, error:errors.description},
        {input: INPUT_TYPE.DROPDOWN, label: "Skjema", value: props.watch("selectedForm"), formValue: "selectedForm", dropDownItems: forms},
        {input: INPUT_TYPE.RADIO, label: "Velg hvordan skjema skal sendes til arkivet", value: props.watch("caseData.caseCreationStrategy"),
            formValue: "caseData.caseCreationStrategy", radioOptions: creationStrategies, defaultValue: creationStrategies[0].value},
        {input: INPUT_TYPE.TEXT_FIELD, label: "Saksnummer", formValue: "id", hidden:(props.watch("caseData.caseCreationStrategy") !== CreationStretegy.COLLECTION)},

    ]
    return (
        <FormGroup className={props.style.formControl}>
            {caseInformationFields.map((field, index) => {
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
                                    setValue={props.setValue}
                                    watch={props.watch}
                                    control={props.control}
                                    errors={props.errors}
                        />
                )}
            )}
        </FormGroup>
    );
}

export default CaseInformation;