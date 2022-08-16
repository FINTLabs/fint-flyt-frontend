import {Box, Button, Divider, FormGroup, Typography} from '@mui/material';
import React, {useContext, useEffect} from 'react';
import {IInputField} from "../../types/InputField";
import {INPUT_TYPE} from "../../types/InputType.enum";
import InputField from "./InputField";
import {FieldErrors} from "react-hook-form";
import {ResourcesContext} from "../../../../context/resourcesContext";
import HelpPopover from "../popover/HelpPopover";
import { useTranslation } from 'react-i18next';
import AddIcon from '@mui/icons-material/Add';
import {CreationStrategy} from "../../types/CreationStrategy";

const CaseForm: React.FunctionComponent<any> = (props) => {
    const { t } = useTranslation('translations', { keyPrefix: 'pages.integrationForm.accordions.caseForm'});
    const [showSecondary, setShowSecondary] = React.useState(false);
    const [showTertiary, setShowTertiary] = React.useState(false);
    const {administrativeUnits, accessCodes, paragraphs, statuses, archiveSections, archiveResources,
        classificationSystems, primaryClassification, secondaryClassification, tertiaryClassification,
        primaryClass, secondaryClass, tertiaryClass, getPrimaryClass, getSecondaryClass, getTertiaryClass,
        setPrimaryClassification, setSecondaryClassification, setTertiaryClassification } = useContext(ResourcesContext);
    let errors: FieldErrors = props.errors;
    let required: boolean = props.validation;
    let socialSecurityCode: string = 'https://beta.felleskomponent.no/arkiv/noark/klassifikasjonssystem/systemid/FNR'
    let orgNumberCode: string = 'https://beta.felleskomponent.no/arkiv/noark/klassifikasjonssystem/systemid/ORGNR'
    let isCollection = props.watch("caseData.caseCreationStrategy") === CreationStrategy.COLLECTION
    let isExisting = props.watch("caseData.caseCreationStrategy") === CreationStrategy.EXISTING

    useEffect(()=> {
        getPrimaryClass();
    }, [primaryClassification, setPrimaryClassification])

    useEffect(()=> {
        getSecondaryClass();
    }, [secondaryClassification, setSecondaryClassification])

    useEffect(()=> {
        getTertiaryClass();
    }, [tertiaryClassification, setTertiaryClassification])

    const handleToggleSecondary = () => {
        setShowSecondary(prevState => !prevState)
    }

    const handleToggleTertiary = () => {
        setShowTertiary(prevState => !prevState)
    }
    const caseFormFields: IInputField[] = [
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "labels.title", formValue: "caseData.title", required: required && !isCollection, error:errors.caseData?.title, value: props.activeFormData?.caseData?.title, helpText: "caseData.title"},
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "labels.publicTitle", formValue: "caseData.publicTitle", required: false, error:errors.caseData?.publicTitle, value: props.activeFormData?.caseData?.publicTitle, helpText: "caseData.publicTitle"},
        {input: INPUT_TYPE.DROPDOWN, label: "labels.type", value: props.watch("caseData.caseType"), disabled: true, formValue: "caseData.caseType", dropDownItems: dropdownPlaceholder, required: required, error:errors.caseData?.caseType, helpText: "caseData.caseType"},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.administrativeUnit", value: props.watch("caseData.administrativeUnit"), formValue: "caseData.administrativeUnit", dropDownItems: administrativeUnits, required: required && !isCollection, error:errors.caseData?.administrativeUnit, helpText: "caseData.administrativeUnit"},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.responsibleCaseWorker", value: props.watch("caseData.caseWorker"), formValue: "caseData.caseWorker", dropDownItems: archiveResources, required: false, error:errors.caseData?.caseWorker, helpText: "caseData.caseWorker"},
        {input: INPUT_TYPE.DROPDOWN, label: "labels.archiveUnit", value: props.watch("caseData.archiveUnit"), formValue: "caseData.archiveUnit", dropDownItems: archiveSections, required: false, error:errors.caseData?.archiveUnit, helpText: "caseData.archiveUnit"},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.recordUnit", value: props.watch("caseData.recordUnit"), formValue: "caseData.recordUnit", dropDownItems: administrativeUnits, required: false, error:errors.caseData?.recordUnit, helpText: "caseData.recordUnit"},
        {input: INPUT_TYPE.DROPDOWN, label: "labels.status", value: props.watch("caseData.status"), formValue: "caseData.status", dropDownItems: statuses, required: false, error:errors.caseData?.status, helpText: "caseData.status"},
        {input: INPUT_TYPE.DROPDOWN, label: "labels.accessCode", value: props.watch("caseData.accessCode"), formValue: "caseData.accessCode", dropDownItems: accessCodes, required: false, error:errors.caseData?.accessCode, helpText: "caseData.accessCode"},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.paragraph", value: props.watch("caseData.paragraph"), formValue: "caseData.paragraph", dropDownItems: paragraphs, required: false, error:errors.caseData?.paragraph, helpText: "caseData.paragraph"},
    ]
    const classificationFormFields: IInputField[] = [
        {input: INPUT_TYPE.DROPDOWN, label: "labels.primaryClassification", value: props.watch("caseData.primaryClassification"), formValue: "caseData.primaryClassification", dropDownItems: classificationSystems, required: required && !isCollection, error:errors.caseData?.primaryClassification, setter: setPrimaryClassification, helpText: "caseData.classification"},
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "labels.primaryClassSsNbr", value: props.activeFormData?.caseData.primaryClass, formValue: "caseData.primaryClass", hidden: props.watch("caseData.primaryClassification") !== socialSecurityCode, required: required && !isCollection, error:errors.caseData?.primaryClass, helpText: "caseData.class"},
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "labels.primaryClassOrg", value: props.activeFormData?.caseData?.primaryClass, formValue: "caseData.primaryClass", hidden: props.watch("caseData.primaryClassification") !== orgNumberCode, required: required && !isCollection, error:errors.caseData?.primaryClass, helpText: "caseData.class"},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.primaryClass", value: props.watch("caseData.primaryClass"), formValue: "caseData.primaryClass", hidden: props.watch("caseData.primaryClassification") === socialSecurityCode || props.watch("caseData.primaryClassification") === orgNumberCode, dropDownItems: primaryClass, required: required && !isCollection, error:errors.caseData?.primaryClass, helpText: "caseData.class"},
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "labels.primaryTitle", formValue: "caseData.primaryTitle", required: false, error:errors.caseData?.primaryTitle, value: props.activeFormData?.caseData?.primaryTitle, helpText: "caseData.classTitle"},
        {input: INPUT_TYPE.DROPDOWN, label: "labels.secondaryClassification", value: props.watch("caseData.secondaryClassification"), formValue: "caseData.secondaryClassification", dropDownItems: classificationSystems, required: false, error:errors.caseData?.secondaryClassification, setter: setSecondaryClassification, helpText: "caseData.classification"},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.secondaryClass", value: props.watch("caseData.secondaryClass"), formValue: "caseData.secondaryClass", dropDownItems: secondaryClass, required: false, error:errors.caseData?.secondaryClass, helpText: "caseData.class"},
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "labels.secondaryTitle", formValue: "caseData.secondaryTitle", required: false, error:errors.caseData?.secondaryTitle, value: props.activeFormData?.caseData?.secondaryTitle, helpText: "caseData.classTitle"},
        {input: INPUT_TYPE.DROPDOWN, label: "labels.tertiaryClassification", value: props.watch("caseData.tertiaryClassification"), formValue: "caseData.tertiaryClassification", dropDownItems: classificationSystems, required: false, error:errors.caseData?.tertiaryClassification, setter: setTertiaryClassification, helpText: "caseData.classification"},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.tertiaryClass", value: props.watch("caseData.tertiaryClass"), formValue: "caseData.tertiaryClass", dropDownItems: tertiaryClass, required: false, error:errors.caseData?.tertiaryClass, helpText: "caseData.class"},
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "labels.tertiaryTitle", formValue: "caseData.tertiaryTitle", required: false, error:errors.caseData?.tertiaryTitle, value: props.activeFormData?.caseData?.tertiaryTitle, helpText: "caseData.classTitle"},
    ]

    return (
        <div>
            <FormGroup className={props.style.formControl}>
                {caseFormFields.map((field, index) => {
                    return (
                        field.hidden ?
                            <div key={index}/> :
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
                        field.hidden ?
                            <div key={index}/> :
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
                {!showSecondary && <AddIcon sx={{cursor: 'pointer', mb: 2}} onClick={handleToggleSecondary}/>}
                {showSecondary && !showTertiary && <AddIcon sx={{cursor: 'pointer', mb: 2}} onClick={handleToggleTertiary}/>}
            </FormGroup>
            <Button sx={{mb: 2}} onClick={props.onSave} variant="contained">{t('button.save')}</Button>
        </div>

    );
}

export default CaseForm;
