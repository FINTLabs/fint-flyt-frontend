import {Divider, FormGroup, Typography} from '@mui/material';
import React, {useContext} from 'react';
import {IInputField} from "../../types/InputField";
import {INPUT_TYPE} from "../../types/InputType.enum";
import InputField from "./InputField";
import {FieldErrors} from "react-hook-form";
import {ResourcesContext} from "../../../../resourcesContext";

const DocumentForm: React.FunctionComponent<any> = (props) => {
    const {accessCodes, paragraphs, documentStatuses, variants} = useContext(ResourcesContext);
    let errors: FieldErrors = props.errors;
    let required: boolean = props.validation;
    const documentFormFields: IInputField[] = [
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "Tittel", formValue: "documentData.title", required: required, error:errors.documentData?.title, value: props.activeFormData?.documentData?.title},
        {input: INPUT_TYPE.DROPDOWN, label: "Status", value: props.watch("documentData.documentStatus"), formValue: "documentData.documentStatus", dropDownItems: documentStatuses, required: required, error:errors.documentData?.documentStatus},
        {input: INPUT_TYPE.DROPDOWN, label: "Tilgangskode", value: props.watch("documentData.accessCode"), formValue: "documentData.accessCode", dropDownItems: accessCodes, required: required, error:errors.documentData?.accessCode},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "Hjemmel", value: props.watch("documentData.paragraph"), formValue: "documentData.paragraph", dropDownItems: paragraphs, required: required, error:errors.documentData?.paragraph},
    ]
    const objectFormFields: IInputField[] = [
        {input: INPUT_TYPE.DROPDOWN, label: "Variant", value: props.watch("documentData.variant"), formValue: "documentData.variant", dropDownItems: variants, required: required, error:errors.documentData?.variant},
    ]
    return (
        <FormGroup className={props.style.formControl}>
            <Typography>Dokumentbeskrivelse</Typography>
            <Divider sx={{mb: 3}}/>
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
            <Typography>Objektbeskrivelse</Typography>
            <Divider sx={{mb: 3}}/>
            {objectFormFields.map((field, index) => {
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