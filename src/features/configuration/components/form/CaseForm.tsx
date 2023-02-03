import {Box, Divider, FormGroup, Typography} from '@mui/material';
import React, {useContext, useEffect} from 'react';
import {IInputField} from "../../types/InputField";
import {INPUT_TYPE} from "../../types/InputType.enum";
import InputField from "./InputField";
import {FieldErrors} from "react-hook-form";
import {ResourcesContext} from "../../../../context/resourcesContext";
import HelpPopover from "../popover/HelpPopover";
import { useTranslation } from 'react-i18next';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {CreationStrategy} from "../../types/CreationStrategy";

const CaseForm: React.FunctionComponent<any> = (props) => {
    const { t } = useTranslation('translations', { keyPrefix: 'pages.configurationForm.accordions.caseForm'});
    const disabled: boolean = props.disabled
    const hasPrimary = props.watch("caseData.classes[0].classification") !== null;
    const hasSecondary = props.watch("caseData.classes[1].classification") !== null;
    const hasTertiary = props.watch("caseData.classes[2].classification") !== null;
    const [showSecondary, setShowSecondary] = React.useState(hasSecondary);
    const [showTertiary, setShowTertiary] = React.useState(hasTertiary);
    const {administrativeUnits, accessCodes, caseTypes, paragraphs, statuses, archiveSections, archiveResources,
        classificationSystems, primaryClassification, secondaryClassification, tertiaryClassification,
        primaryClass, secondaryClass, tertiaryClass, getPrimaryClass, getSecondaryClass, getTertiaryClass,
        setPrimaryClassification, setSecondaryClassification, setTertiaryClassification, setSecondaryClass, setTertiaryClass} = useContext(ResourcesContext);
    const handleToggleSecondary = () => {setShowSecondary(prevState => !prevState)}
    const handleToggleTertiary = () => {setShowTertiary(prevState => !prevState)}
    const handleToggleRemove = async () => {
        if (showTertiary) {
            setShowTertiary(prevState => !prevState);
            setTertiaryClassification({label: '', value: ''})
            setTertiaryClass([{label: 'velg tertiær ordningsprinsipp først', value: ''}])
            props.setValue("caseData.classes[2].classification", null)
            props.setValue("caseData.classes[2].class", null)
            props.setValue("caseData.classes[2].title", null)
        }
        else if(showSecondary) {
            setShowSecondary(prevState => !prevState);
            setSecondaryClassification({label: '', value: ''})
            setSecondaryClass([{label: 'velg sekundær ordningsprinsipp først', value: ''}])
            props.setValue("caseData.classes[1].classification", null)
            props.setValue("caseData.classes[1].class", null)
            props.setValue("caseData.classes[1].title", null)
        }
    }

    useEffect(()=> {
        getPrimaryClass();
    }, [primaryClassification, setPrimaryClassification])

    useEffect(()=> {
        getSecondaryClass();
    }, [secondaryClassification, setSecondaryClassification])

    useEffect(()=> {
        getTertiaryClass();
    }, [tertiaryClassification, setTertiaryClassification])

    let errors: FieldErrors = props.errors;
    let required: boolean = props.validation;
    let isCollection = props.watch("caseData.caseCreationStrategy") === CreationStrategy.BY_ID

    let listOfClassificationsWithDynamicField: string[] = [
        'https://beta.felleskomponent.no/arkiv/noark/klassifikasjonssystem/systemid/FNR',
        'https://beta.felleskomponent.no/arkiv/noark/klassifikasjonssystem/systemid/STUDENT',
        'https://beta.felleskomponent.no/arkiv/noark/klassifikasjonssystem/systemid/ORGNR',
        'https://beta.felleskomponent.no/arkiv/noark/klassifikasjonssystem/systemid/FNRP',
        'https://beta.felleskomponent.no/arkiv/noark/klassifikasjonssystem/systemid/FNRK',
        'https://beta.felleskomponent.no/arkiv/noark/klassifikasjonssystem/systemid/FRNRTT',
        'https://beta.felleskomponent.no/arkiv/noark/klassifikasjonssystem/systemid/FNSM',
        'https://beta.felleskomponent.no/arkiv/noark/klassifikasjonssystem/systemid/FNS',
        'https://beta.felleskomponent.no/arkiv/noark/klassifikasjonssystem/systemid/FNST'
    ]

  const caseFormFields: IInputField[] = [
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "labels.title", formValue: "caseData.title", required: required && !isCollection, error:errors.caseData?.title, value: props.activeFormData?.caseData?.title, helpText: "caseData.title"},
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "labels.publicTitle", formValue: "caseData.publicTitle", required: false, error:errors.caseData?.publicTitle, value: props.activeFormData?.caseData?.publicTitle, helpText: "caseData.publicTitle"},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.caseType", value: props.watch("caseData.caseType"), formValue: "caseData.caseType", dropDownItems: caseTypes, required: false, error:errors.caseData?.caseType, helpText: "caseData.caseType"},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.administrativeUnit", value: props.watch("caseData.administrativeUnit"), formValue: "caseData.administrativeUnit", dropDownItems: administrativeUnits, required: required && !isCollection, error:errors.caseData?.administrativeUnit, helpText: "caseData.administrativeUnit"},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.responsibleCaseWorker", value: props.watch("caseData.caseWorker"), formValue: "caseData.caseWorker", dropDownItems: archiveResources, required: false, error:errors.caseData?.caseWorker, helpText: "caseData.caseWorker"},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.archiveUnit", value: props.watch("caseData.archiveUnit"), formValue: "caseData.archiveUnit", dropDownItems: archiveSections, required: required && !isCollection, error:errors.caseData?.archiveUnit, helpText: "caseData.archiveUnit"},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.recordUnit", value: props.watch("caseData.recordUnit"), formValue: "caseData.recordUnit", dropDownItems: administrativeUnits, required: false, error:errors.caseData?.recordUnit, helpText: "caseData.recordUnit", disabled: true},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.status", value: props.watch("caseData.status"), formValue: "caseData.status", dropDownItems: statuses, required: required && !isCollection, error:errors.caseData?.status, helpText: "caseData.status"},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.accessCode", value: props.watch("caseData.shielding.accessCode"), formValue: "caseData.shielding.accessCode", dropDownItems: accessCodes, required: false, error:errors.caseData?.shielding.accessCode, helpText: "caseData.accessCode"},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.paragraph", value: props.watch("caseData.shielding.paragraph"), formValue: "caseData.shielding.paragraph", dropDownItems: paragraphs, required: false, error:errors.caseData?.shielding.paragraph, helpText: "caseData.paragraph"},
    ]
    const classificationFormFields: IInputField[] = [
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.primaryClassification", value: props.watch("caseData.classes[0].classification"), formValue: "caseData.classes[0].classification", dropDownItems: classificationSystems, required: required, error:errors.caseData?.classes[0].classification, setter: setPrimaryClassification, helpText: "caseData.classification"},
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "labels.primaryClass", value: props.activeFormData?.caseData.classes[0].class, formValue: "caseData.classes[0].class", hidden: !listOfClassificationsWithDynamicField.includes(props.watch("caseData.classes[0].classification")), required: required && hasPrimary, error:errors.caseData?.classes[0].class, helpText: "caseData.class"},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.primaryClass", value: props.watch("caseData.classes[0].class"), formValue: "caseData.classes[0].class", hidden: listOfClassificationsWithDynamicField.includes(props.watch("caseData.classes[0].classification")), dropDownItems: primaryClass, required: required && hasPrimary, error:errors.caseData?.classes[0].class, helpText: "caseData.class"},
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "labels.primaryTitle", formValue: "caseData.classes[0].title", required: required && hasPrimary, error:errors.caseData?.classes[0].title, value: props.activeFormData?.caseData?.classes[0].title, helpText: "caseData.classTitle"}
    ]
    const secondaryClassificationFormFields: IInputField[] = [
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.secondaryClassification", value: props.watch("caseData.classes[1].classification"), formValue: "caseData.classes[1].classification", dropDownItems: classificationSystems, required: false, error:errors.caseData?.classes[1].classification, setter: setSecondaryClassification, helpText: "caseData.classification", hidden: !showSecondary},
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "labels.secondaryClass", value: props.activeFormData?.caseData.classes[1].class, formValue: "caseData.classes[1].class", hidden: !listOfClassificationsWithDynamicField.includes(props.watch("caseData.classes[1].classification")), required: required && hasSecondary, error:errors.caseData?.classes[1].class, helpText: "caseData.class"},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.secondaryClass", value: props.watch("caseData.classes[1].class"), formValue: "caseData.classes[1].class", hidden: listOfClassificationsWithDynamicField.includes(props.watch("caseData.classes[1].classification")), dropDownItems: secondaryClass, required: required && hasSecondary, error:errors.caseData?.classes[1].class, helpText: "caseData.class"},
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "labels.secondaryTitle", formValue: "caseData.classes[1].title", required: required && hasSecondary, error:errors.caseData?.classes[1].title, value: props.activeFormData?.caseData?.classes[1].title, helpText: "caseData.classTitle", hidden: !showSecondary}
    ]
    const tertiaryClassificationFormFields: IInputField[] = [
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.tertiaryClassification", value: props.watch("caseData.classes[2].classification"), formValue: "caseData.classes[2].classification", dropDownItems: classificationSystems, required: false, error:errors.caseData?.classes[2].classification, setter: setTertiaryClassification, helpText: "caseData.classification", hidden: !showTertiary},
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "labels.tertiaryClass", value: props.activeFormData?.caseData.classes[2].class, formValue: "caseData.classes[2].class", hidden: !listOfClassificationsWithDynamicField.includes(props.watch("caseData.classes[2].classification")), required: required && hasSecondary, error:errors.caseData?.classes[2].class, helpText: "caseData.class"},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.tertiaryClass", value: props.watch("caseData.classes[2].class"), formValue: "caseData.classes[2].class", hidden: listOfClassificationsWithDynamicField.includes(props.watch("caseData.classes[2].classification")), dropDownItems: tertiaryClass, required: required && hasTertiary, error:errors.caseData?.classes[2].class, helpText: "caseData.class"},
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "labels.tertiaryTitle", formValue: "caseData.classes[2].title", required: required && hasTertiary, error:errors.caseData?.classes[2].title, value: props.activeFormData?.caseData?.classes[2].title, helpText: "caseData.classTitle", hidden: !showTertiary}
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
                                                disabled={field.disabled}
                                                {...props}
                                    />
                                </Box>
                                <Box>
                                    <HelpPopover popoverContent={field.helpText}/>
                                </Box>
                            </Box>
                    )}
                )}
                {showSecondary && secondaryClassificationFormFields.map((field, index) => {
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
                                                disabled={field.disabled}
                                                {...props}
                                    />
                                </Box>
                                <Box>
                                    <HelpPopover popoverContent={field.helpText}/>
                                </Box>
                            </Box>
                    )}
                )}
                {showTertiary && tertiaryClassificationFormFields.map((field, index) => {
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
                                                disabled={field.disabled}
                                                {...props}
                                    />
                                </Box>
                                <Box>
                                    <HelpPopover popoverContent={field.helpText}/>
                                </Box>
                            </Box>
                    )}
                )}
                {!disabled && <Box sx={{display: 'flex'}}>
                {!showSecondary && <AddIcon sx={{cursor: 'pointer', mb: 2}} onClick={handleToggleSecondary}/>}
                {showSecondary && !showTertiary && <AddIcon sx={{cursor: 'pointer', mb: 2}} onClick={handleToggleTertiary}/>}
                {(showSecondary || showTertiary) && <RemoveIcon sx={{cursor: 'pointer', mb: 2, ml: 2}} onClick={handleToggleRemove}/>}
                </Box>}
            </FormGroup>
        </div>

    );
}

export default CaseForm;