import {FormGroup} from '@mui/material';
import React from 'react';
import {dropdownPlaceholder} from "../../util/DefaultValues";
import {IInputField} from "../../types/InputField";
import {INPUT_TYPE} from "../../types/InputType.enum";
import InputField from "./InputField";
import {FieldErrors} from "react-hook-form";

const DocumentForm: React.FunctionComponent<any> = (props) => {
    let errors: FieldErrors = props.errors;
    let required: boolean = props.validation;
    const documentFormFields: IInputField[] = [
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "Tittel", formValue: "documentData.title", required: required, error:errors.documentData?.title, value: props.activeFormData?.documentData?.title},
        {input: INPUT_TYPE.DROPDOWN, label: "Status", value: props.watch("documentData.documentStatus"), formValue: "documentData.documentStatus", dropDownItems: dropdownPlaceholder, required: required, error:errors.documentData?.documentStatus},
        {input: INPUT_TYPE.DROPDOWN, label: "Tilgangskode", value: props.watch("documentData.accessCode"), formValue: "documentData.accessCode", dropDownItems: dropdownPlaceholder, required: required, error:errors.documentData?.accessCode},
        {input: INPUT_TYPE.DROPDOWN, label: "Hjemmel", value: props.watch("documentData.paragraph"), formValue: "documentData.paragraph", dropDownItems: dropdownPlaceholder, required: required, error:errors.documentData?.paragraph},
        {input: INPUT_TYPE.DROPDOWN, label: "Variant", value: props.watch("documentData.variant"), formValue: "documentData.variant", dropDownItems: dropdownPlaceholder, required: required, error:errors.documentData?.variant}
    ]
    return (
        <FormGroup className={props.style.formControl}>
            {documentFormFields.map((field, index) => {
                return (
                    <InputField key={index}
                                required={field.required}
                                error={field.error}
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