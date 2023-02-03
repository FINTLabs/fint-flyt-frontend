import {Box, Divider, FormGroup, Typography} from '@mui/material';
import React, {useContext} from 'react';
import {IInputField} from "../../types/InputField";
import {INPUT_TYPE} from "../../types/InputType.enum";
import InputField from "./InputField";
import {FieldErrors} from "react-hook-form";
import {ResourcesContext} from "../../../../context/resourcesContext";
import HelpPopover from "../popover/HelpPopover";
import { useTranslation } from 'react-i18next';
import {
    formatOptions,
    roleOptions,
    variantOptions
} from "../../defaults/DefaultValues";

const DocumentForm: React.FunctionComponent<any> = (props) => {
    const { t } = useTranslation('translations', { keyPrefix: 'pages.configurationForm.accordions.documentForm'});
    const {documentStatuses, documentTypes} = useContext(ResourcesContext);
    let errors: FieldErrors = props.errors;
    let required: boolean = props.validation;

    const mainDocumentFields: IInputField[] = [
        {input: INPUT_TYPE.TEXT_FIELD, label: "labels.title", formValue: "recordData.title", required: required, error:errors.recordData?.title, value: props.watch("recordData.title"), helpText: "recordData.title", disabled: true},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.documentStatus", value: props.watch("recordData.mainDocument.documentStatus"), formValue: "recordData.mainDocument.documentStatus", dropDownItems: documentStatuses, required: required, error:errors.recordData?.mainDocument?.documentStatus, helpText: "recordData.documentStatus"},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.documentType", value: props.watch("recordData.mainDocument.documentType"), formValue: "recordData.mainDocument.documentType", dropDownItems: documentTypes, required: required, error:errors.recordData?.mainDocument?.documentType, helpText: "recordData.documentType"},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.role", value: props.watch("recordData.mainDocument.role"), formValue: "recordData.mainDocument.role", dropDownItems: roleOptions, required: false, error:errors.recordData?.mainDocument?.role, helpText: "recordData.role", disabled: true},
    ]

    const mainObjectFields: IInputField[] = [
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.variant", value: props.watch("recordData.mainDocument.variant"), formValue: "recordData.mainDocument.variant", dropDownItems: variantOptions, required: false, error:errors.recordData?.mainDocument?.fileFormat, helpText: "recordData.fileFormat", disabled: true},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.fileFormat", value: props.watch("recordData.mainDocument.format"), formValue: "recordData.mainDocument.format", dropDownItems: formatOptions, required: false, error:errors.recordData?.mainDocument?.variant, helpText: "recordData.variant", disabled: true},
        {input: INPUT_TYPE.TEXT_FIELD, label: "labels.file", formValue: "recordData.mainDocument.file", required: false, error:errors.recordData?.mainDocument?.file, value: '$if{formPdf}', helpText: "recordData.file", disabled: true}
    ]

    const attachmentDocumentFields: IInputField[] = [
        {input: INPUT_TYPE.TEXT_FIELD, label: "labels.title", formValue: "recordData.attachmentDocuments.title", required: false, error:errors.recordData?.attachmentDocuments?.title, value: '$igf{name}', helpText: "recordData.title", disabled: true},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.documentStatus", value: props.watch("recordData.attachmentDocuments.documentStatus"), formValue: "recordData.attachmentDocuments.documentStatus", dropDownItems: documentStatuses, required: required, error:errors.recordData?.attachmentDocuments?.documentStatus, helpText: "recordData.documentStatus"},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.documentType", value: props.watch("recordData.attachmentDocuments.documentType"), formValue: "recordData.attachmentDocuments.documentType", dropDownItems: documentTypes, required: required, error:errors.recordData?.attachmentDocuments?.documentType, helpText: "recordData.documentType"},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.role", value: props.watch("recordData.attachmentDocuments.role"), formValue: "recordData.attachmentDocuments.role", dropDownItems: roleOptions, required: false, error:errors.recordData?.attachmentDocuments?.role, helpText: "recordData.role", disabled: true}
    ]

    const attachmentObjectFields: IInputField[] = [
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.variant", value: props.watch("recordData.attachmentDocuments.variant"), formValue: "recordData.attachmentDocuments.variant", dropDownItems: variantOptions, required: false, error:errors.recordData?.attachmentDocuments?.variant, helpText: "recordData.variant", disabled: true},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.fileFormat", value: props.watch("recordData.attachmentDocuments.format"), formValue: "recordData.attachmentDocuments.format", dropDownItems: formatOptions, required: false, error:errors.recordData?.attachmentDocuments?.variant, helpText: "recordData.variant", disabled: true},
        {input: INPUT_TYPE.TEXT_FIELD, label: "labels.file", formValue: "recordData.attachmentDocuments.file", required: false, error:errors.recordData?.attachmentDocuments?.file, value: '$igf{file}', helpText: "recordData.file", disabled: true}
    ]

    return (
        <div>
            <FormGroup className={props.style.formControl}>
                <Typography>{t('mainDocumentDescription')}</Typography>
                <Divider sx={{mb: 1}}/>
                <Typography sx={{fontSize: 14}}>Dokumentbeskrivelse</Typography>
                <Divider sx={{mb: 3}}/>
                {mainDocumentFields.map((field, index) => {
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
                <Typography sx={{fontSize: 14}}>Dokumentobjekt</Typography>
                <Divider sx={{mb: 3}}/>
                {mainObjectFields.map((field, index) => {
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
                <Typography sx={{mt: 3}}>{t('attachmentDescription')}</Typography>
                <Divider sx={{mb: 1}}/>
                <Typography sx={{fontSize: 14}}>Dokumentbeskrivelse</Typography>
                <Divider sx={{mb: 3}}/>
                {attachmentDocumentFields.map((field, index) => {
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
                <Typography sx={{fontSize: 14}}>Dokumentobjekt</Typography>
                <Divider sx={{mb: 3}}/>
                {attachmentObjectFields.map((field, index) => {
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
