import {Box, FormGroup} from '@mui/material';
import React, {useContext} from 'react';
import {IInputField} from "../../types/InputField";
import {INPUT_TYPE} from "../../types/InputType.enum";
import InputField from "./InputField";
import {FieldErrors} from "react-hook-form";
import {ResourcesContext} from "../../../../context/resourcesContext";
import HelpPopover from "../popover/HelpPopover";
import { useTranslation } from 'react-i18next';

const RecordForm: React.FunctionComponent<any> = (props) => {
    const { t } = useTranslation('translations', { keyPrefix: 'pages.configurationForm.accordions.recordForm'});
    const {administrativeUnits, accessCodes, paragraphs, recordStatuses, recordTypes, archiveResources } = useContext(ResourcesContext);
    let errors: FieldErrors = props.errors;
    let required: boolean = props.validation;
    const recordFormFields: IInputField[] = [
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "labels.title", formValue: "recordData.title", required: required, error:errors.recordData?.title, value: props.activeFormData?.recordData?.title, helpText: "recordData.title"},
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "labels.publicTitle", formValue: "recordData.publicTitle", required: false, error:errors.recordData?.publicTitle, value: props.activeFormData?.recordData?.publicTitle, helpText: "recordData.publicTitle"},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.recordType", value: props.watch("recordData.recordType"), formValue: "recordData.recordType", dropDownItems: recordTypes, required: false, error:errors.recordData?.recordType, helpText: "recordData.recordType"},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.administrativeUnit", value: props.watch("recordData.administrativeUnit"), formValue: "recordData.administrativeUnit", dropDownItems: administrativeUnits, required: required, error:errors.recordData?.administrativeUnit, helpText: "recordData.administrativeUnit"},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.caseWorker", value: props.watch("recordData.caseWorker"), formValue: "recordData.caseWorker", dropDownItems: archiveResources, required: false, error:errors.recordData?.caseWorker, helpText: "recordData.caseWorker"},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.recordStatus", value: props.watch("recordData.recordStatus"), formValue: "recordData.recordStatus", dropDownItems: recordStatuses, required: required, error:errors.recordData?.recordStatus, helpText: "recordData.recordStatus"},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.accessCode", value: props.watch("recordData.shielding.accessCode"), formValue: "recordData.shielding.accessCode", dropDownItems: accessCodes, required: false, error:errors.recordData?.shielding.accessCode, helpText: "recordData.accessCode"},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.paragraph", value: props.watch("recordData.shielding.paragraph"), formValue: "recordData.shielding.paragraph", dropDownItems: paragraphs, required: false, error:errors.recordData?.shielding.paragraph, helpText: "recordData.paragraph"}
    ]
    return (
        <div>
            <FormGroup className={props.style.formControl}>
                {recordFormFields.map((field, index) => {
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
                                            {...props}
                                />
                            </Box>
                            <Box>
                                <HelpPopover id={field.formValue} popoverContent={field.helpText}/>
                            </Box>
                        </Box>
                    )}
                )}
            </FormGroup>
        </div>
    );
}

export default RecordForm;
