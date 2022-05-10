import {Box, Button, Divider, FormGroup, Typography} from '@mui/material';
import React, {useContext, useEffect} from 'react';
import {IInputField} from "../../types/InputField";
import {INPUT_TYPE} from "../../types/InputType.enum";
import InputField from "./InputField";
import {FieldErrors} from "react-hook-form";
import {ResourcesContext} from "../../../../context/resourcesContext";
import HelpPopover from "../popover/HelpPopover";
import { useTranslation } from 'react-i18next';

const CaseForm: React.FunctionComponent<any> = (props) => {
    const { t } = useTranslation('translations', { keyPrefix: 'pages.integrationForm.accordions.caseForm'});
    const {administrativeUnits, accessCodes, paragraphs, statuses, archiveSections, archiveResources,
        classificationSystems, primaryClassification, secondaryClassification, primaryClass, secondaryClass, getPrimaryClass, getSecondaryClass, setPrimaryClassification, setSecondaryClassification } = useContext(ResourcesContext);

    useEffect(()=> {
        getPrimaryClass();
    }, [primaryClassification, setPrimaryClassification])

    useEffect(()=> {
        getSecondaryClass();
    }, [secondaryClassification, setSecondaryClassification])

    let errors: FieldErrors = props.errors;
    let required: boolean = props.validation;

    const caseFormFields: IInputField[] = [
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "labels.title", formValue: "caseData.title", required: required, error:errors.caseData?.title, value: props.activeFormData?.caseData?.title, helpText: "caseData.title"},
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "labels.publicTitle", formValue: "caseData.publicTitle", required: required, error:errors.caseData?.publicTitle, value: props.activeFormData?.caseData?.publicTitle, helpText: "caseData.publicTitle"},
      //  {input: INPUT_TYPE.DROPDOWN, label: "labels.type", value: props.watch("caseData.caseType"), formValue: "caseData.caseType", dropDownItems: dropdownPlaceholder, required: required, error:errors.caseData?.caseType, helpText: "caseData.caseType"},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.administrativeUnit", value: props.watch("caseData.administrativeUnit"), formValue: "caseData.administrativeUnit", dropDownItems: administrativeUnits, required: required, error:errors.caseData?.administrativeUnit, helpText: "caseData.administrativeUnit"},
        {input: INPUT_TYPE.DROPDOWN, label: "labels.archiveUnit", value: props.watch("caseData.archiveUnit"), formValue: "caseData.archiveUnit", dropDownItems: archiveSections, required: required, error:errors.caseData?.archiveUnit, helpText: "caseData.archiveUnit"},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.recordUnit", value: props.watch("caseData.recordUnit"), formValue: "caseData.recordUnit", dropDownItems: administrativeUnits, required: required, error:errors.caseData?.recordUnit, helpText: "caseData.recordUnit"},
        {input: INPUT_TYPE.DROPDOWN, label: "labels.status", value: props.watch("caseData.status"), formValue: "caseData.status", dropDownItems: statuses, required: required, error:errors.caseData?.status, helpText: "caseData.status"},
        {input: INPUT_TYPE.DROPDOWN, label: "labels.accessCode", value: props.watch("caseData.accessCode"), formValue: "caseData.accessCode", dropDownItems: accessCodes, required: required, error:errors.caseData?.accessCode, helpText: "caseData.accessCode"},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.paragraph", value: props.watch("caseData.paragraph"), formValue: "caseData.paragraph", dropDownItems: paragraphs, required: required, error:errors.caseData?.paragraph, helpText: "caseData.paragraph"},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.responsibleCaseWorker", value: props.watch("caseData.caseWorker"), formValue: "caseData.caseWorker", dropDownItems: archiveResources, required: required, error:errors.caseData?.caseWorker, helpText: "caseData.caseWorker"}
    ]
    const classificationFormFields: IInputField[] = [
        {input: INPUT_TYPE.DROPDOWN, label: "labels.primaryClassification", value: props.watch("caseData.primaryClassification"), formValue: "caseData.primaryClassification", dropDownItems: classificationSystems, required: required, error:errors.caseData?.primaryClassification, setter: setPrimaryClassification, helpText: "caseData.classification"},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.primaryClass", value: props.watch("caseData.primaryClass"), formValue: "caseData.primaryClass", dropDownItems: primaryClass, required: required, error:errors.caseData?.primaryClass, helpText: "caseData.class"},
        {input: INPUT_TYPE.DROPDOWN, label: "labels.secondaryClassification", value: props.watch("caseData.secondaryClassification"), formValue: "caseData.secondaryClassification", dropDownItems: classificationSystems, required: required, error:errors.caseData?.secondaryClassification, setter: setSecondaryClassification, helpText: "caseData.classification"},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.secondaryClass", value: props.watch("caseData.secondaryClass"), formValue: "caseData.secondaryClass", dropDownItems: secondaryClass, required: required, error:errors.caseData?.secondaryClass, helpText: "caseData.class"}
    ]

    return (
        <div>
            <FormGroup className={props.style.formControl}>
                {caseFormFields.map((field, index) => {
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
                                <HelpPopover popoverContent={field.helpText}/>
                            </Box>
                        </Box>
                    )}
                )}
                <Typography>{t('classification')}</Typography>
                <Divider sx={{mb: 3}}/>
                {classificationFormFields.map((field, index) => {
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
                                <HelpPopover popoverContent={field.helpText}/>
                            </Box>
                        </Box>
                    )}
                )}
            </FormGroup>
            <Button sx={{mb: 2}} onClick={props.onSave} variant="contained">{t('button.save')}</Button>
        </div>

    );
}

export default CaseForm;