import {Box, Divider, FormGroup, Typography} from '@mui/material';
import React, {useContext} from 'react';
import {IInputField} from "../../types/InputField";
import {INPUT_TYPE} from "../../types/InputType.enum";
import InputField from "./InputField";
import {FieldErrors} from "react-hook-form";
import {ResourcesContext} from "../../../../context/resourcesContext";
import HelpPopover from "../popover/HelpPopover";
import { useTranslation } from 'react-i18next';
import {variant, variantOptions} from "../../defaults/DefaultValues";

const DocumentForm: React.FunctionComponent<any> = (props) => {
    const { t } = useTranslation('translations', { keyPrefix: 'pages.configurationForm.accordions.documentForm'});
    const {documentStatuses, documentTypes} = useContext(ResourcesContext);
    let errors: FieldErrors = props.errors;
    let required: boolean = props.validation;

    const documentFormFields: IInputField[] = [
        {input: INPUT_TYPE.TEXT_FIELD, label: "labels.title", formValue: "recordData.title", required: required, error:errors.recordData?.title, value: props.watch("recordData.title"), helpText: "recordData.title", disabled: true},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.documentStatus", value: props.watch("recordData.mainDocument.documentStatus"), formValue: "recordData.mainDocument.documentStatus", dropDownItems: documentStatuses, required: required, error:errors.recordData?.mainDocument?.documentStatus, helpText: "recordData.documentStatus"},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.documentType", value: props.watch("recordData.mainDocument.documentType"), formValue: "recordData.mainDocument.documentType", dropDownItems: documentTypes, required: required, error:errors.recordData?.mainDocument?.documentType, helpText: "recordData.documentType"},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.variant", value: variant, formValue: "recordData.mainDocument.variant", dropDownItems: variantOptions, required: false, error:errors.recordData?.mainDocument?.variant, helpText: "recordData.variant", disabled: true}
    ]
    const objectFormFields: IInputField[] = [
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.documentStatus", value: props.watch("recordData.attachmentDocuments.documentStatus"), formValue: "recordData.attachmentDocuments.documentStatus", dropDownItems: documentStatuses, required: required, error:errors.recordData?.attachmentDocuments?.documentStatus, helpText: "recordData.documentStatus"},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.documentType", value: props.watch("recordData.attachmentDocuments.documentType"), formValue: "recordData.attachmentDocuments.documentType", dropDownItems: documentTypes, required: required, error:errors.recordData?.attachmentDocuments?.documentType, helpText: "recordData.documentType"},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.variant", value: variant, formValue: "recordData.attachmentDocuments.variant", dropDownItems: variantOptions, required: false, error:errors.recordData?.attachmentDocuments?.variant, helpText: "recordData.variant", disabled: true}
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
