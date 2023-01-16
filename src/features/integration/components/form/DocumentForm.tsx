import {Box, Divider, FormGroup, Typography} from '@mui/material';
import React, {useContext} from 'react';
import {IInputField} from "../../types/InputField";
import {INPUT_TYPE} from "../../types/InputType.enum";
import InputField from "./InputField";
import {FieldErrors} from "react-hook-form";
import {ResourcesContext} from "../../../../context/resourcesContext";
import HelpPopover from "../popover/HelpPopover";
import { useTranslation } from 'react-i18next';
import {formatOptions, variant, format, variantOptions} from "../../defaults/DefaultValues";

const DocumentForm: React.FunctionComponent<any> = (props) => {
    const { t } = useTranslation('translations', { keyPrefix: 'pages.configurationForm.accordions.documentForm'});
    const {documentStatuses, documentTypes} = useContext(ResourcesContext);
    let errors: FieldErrors = props.errors;
    let required: boolean = props.validation;

    const documentFormFields: IInputField[] = [
        {input: INPUT_TYPE.TEXT_FIELD, label: "labels.title", formValue: "recordData.title", required: required, error:errors.recordData?.title, value: props.watch("recordData.title"), helpText: "recordData.title", disabled: true},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.documentStatus", value: props.watch("mainDocumentData.documentStatus"), formValue: "mainDocumentData.documentStatus", dropDownItems: documentStatuses, required: required, error:errors.mainDocumentData?.documentStatus, helpText: "mainDocumentData.documentStatus"},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.documentType", value: props.watch("mainDocumentData.documentType"), formValue: "mainDocumentData.documentType", dropDownItems: documentTypes, required: required, error:errors.mainDocumentData?.documentType, helpText: "mainDocumentData.documentType"},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.variant", value: variant, formValue: "mainDocumentData.variant", dropDownItems: variantOptions, required: required, error:errors.mainDocumentData?.variant, helpText: "mainDocumentData.variant", disabled: true}
    ]
    const objectFormFields: IInputField[] = [
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.documentStatus", value: props.watch("attachmentDocumentsData.documentStatus"), formValue: "attachmentDocumentsData.documentStatus", dropDownItems: documentStatuses, required: required, error:errors.attachmentDocumentsData?.documentStatus, helpText: "mainDocumentData.documentStatus"},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.documentType", value: props.watch("attachmentDocumentsData.documentType"), formValue: "attachmentDocumentsData.documentType", dropDownItems: documentTypes, required: required, error:errors.attachmentDocumentsData?.documentType, helpText: "mainDocumentData.documentType"},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.variant", value: variant, formValue: "attachmentDocumentsData.variant", dropDownItems: variantOptions, required: required, error:errors.attachmentDocumentsData?.variant, helpText: "mainDocumentData.variant", disabled: true},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.format", value: format, formValue: "attachmentDocumentsData.format", dropDownItems: formatOptions, required: required, error:errors.attachmentDocumentsData?.format, helpText: "mainDocumentData.format", disabled: true}
    ]
    return (
        <div>
            <FormGroup className={props.style.formControl}>
                <Typography>{t('mainDocumentDescription')}</Typography>
                <Divider sx={{mb: 3}}/>
                {documentFormFields.map((field, index) => {
                    return (
                        <Box sx={{display: 'flex'}} key={index}>
                            <Box width={'100%'}>
                                <InputField required={field.required}
                                            error={field.error}
                                            input={field.input}
                                            label={field.label}
                                            value={field.value}
                                            formValue={field.formValue}
                                            dropdownItems={field.dropDownItems}
                                            setter={field.setter}
                                            disabledField={field.disabled}
                                            {...props}
                                />
                            </Box>
                            <Box>
                                <HelpPopover popoverContent={field.helpText}/>
                            </Box>
                        </Box>
                    )}
                )}
                <Typography>{t('attachmentDescription')}</Typography>
                <Divider sx={{mb: 3}}/>
                {objectFormFields.map((field, index) => {
                    return (
                        <Box sx={{display: 'flex'}} key={index}>
                            <Box width={'100%'}>
                                <InputField required={field.required}
                                            error={field.error}
                                            input={field.input}
                                            label={field.label}
                                            value={field.value}
                                            formValue={field.formValue}
                                            dropdownItems={field.dropDownItems}
                                            setter={field.setter}
                                            disabledField={field.disabled}
                                            {...props}
                                />
                            </Box>
                            <Box>
                                <HelpPopover popoverContent={field.helpText}/>
                            </Box>
                        </Box>
                    )}
                )}
            </FormGroup>
        </div>
    );
}

export default DocumentForm;
