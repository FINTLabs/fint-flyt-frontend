import {FormGroup} from '@mui/material';
import React from 'react';
import InputField from "./InputField";
import {INPUT_TYPE} from "../../types/InputType.enum";
import {IInputField} from "../../types/InputField";
import {creationStrategies, forms} from "../../util/DefaultValues";

const CaseInformation: React.FunctionComponent<any> = (props) => {
    const caseInformationFields: IInputField[] = [
        {input: INPUT_TYPE.DRAG_DROP_TEXT_FIELD, label: "Navn", formValue: "name"},
        {input: INPUT_TYPE.DRAG_DROP_TEXT_FIELD, label: "Beskrivelse", formValue: "description"},
        {input: INPUT_TYPE.DROPDOWN, label: "Skjema", value: props.watch("selectedForm"), formValue: "selectedForm", dropDownItems: forms},
        {input: INPUT_TYPE.RADIO, label: "Velg hvordan skjema skal sendes til arkivet", value: props.watch("caseData.caseCreationStrategy"),
            formValue: "caseData.caseCreationStrategy", radioOptions: creationStrategies, defaultValue: creationStrategies[0].value}
    ]
    return (
        <FormGroup className={props.style.formControl}>
            {caseInformationFields.map((field, index) => {
                return (
                    <InputField key={index}
                                input={field.input}
                                label={field.label}
                                value={field.value}
                                formValue={field.formValue}
                                dropdownItems={field.dropDownItems}
                                radioOptions={field.radioOptions}
                                defaultValue={field.defaultValue}
                                setValue={props.setValue}
                    />
                )}
            )}
        </FormGroup>
    );
}

export default CaseInformation;