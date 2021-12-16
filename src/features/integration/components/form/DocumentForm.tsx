import {FormGroup} from '@mui/material';
import React from 'react';
import {dropdownPlaceholder} from "../../util/DefaultValues";
import {IInputField} from "../../types/InputField";
import {INPUT_TYPE} from "../../types/InputType.enum";
import InputField from "./InputField";

const DocumentForm: React.FunctionComponent<any> = (props) => {
    const documentFormFields: IInputField[] = [
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "Tittel", formValue: "documentData.title"},
        {input: INPUT_TYPE.DROPDOWN, label: "Status", value: props.watch("documentData.documentStatus"), formValue: "documentData.documentStatus", dropDownItems: dropdownPlaceholder},
        {input: INPUT_TYPE.DROPDOWN, label: "Tilgangskode", value: props.watch("documentData.accessCode"), formValue: "documentData.accessCode", dropDownItems: dropdownPlaceholder},
        {input: INPUT_TYPE.DROPDOWN, label: "Hjemmel", value: props.watch("documentData.paragraph"), formValue: "documentData.paragraph", dropDownItems: dropdownPlaceholder},
        {input: INPUT_TYPE.DROPDOWN, label: "Variant", value: props.watch("documentData.variant"), formValue: "documentData.variant", dropDownItems: dropdownPlaceholder},
        {input: INPUT_TYPE.DROPDOWN, label: "Format", value: props.watch("documentData.format"), formValue: "documentData.format", dropDownItems: dropdownPlaceholder},
    ]
    return (
        <FormGroup className={props.style.formControl}>
            {documentFormFields.map((field, index) => {
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

export default DocumentForm;