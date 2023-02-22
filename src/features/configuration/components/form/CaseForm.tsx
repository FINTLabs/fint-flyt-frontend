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
import RemoveIcon from '@mui/icons-material/Remove';
import {CreationStrategy} from "../../types/CreationStrategy";
import {creationStrategies} from "../../defaults/DefaultValues";
import {IntegrationContext} from "../../../../context/integrationContext";
import ResourceRepository from "../../../../shared/repositories/ResourceRepository";

const CaseForm: React.FunctionComponent<any> = (props) => {
    const { t } = useTranslation('translations', { keyPrefix: 'pages.configurationForm.accordions.caseForm'});
    const disabled: boolean = props.disabled
    const hasPrimary = props.watch("caseData.newCase.classes[0].classification") !== null;
    const hasSecondary = props.watch("caseData.newCase.classes[1].classification") !== null;
    const hasTertiary = props.watch("caseData.newCase.classes[2].classification") !== null;
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
            props.setValue("caseData.newCase.classes[2].classification", null)
            props.setValue("caseData.newCase.classes[2].class", null)
            props.setValue("caseData.newCase.classes[2].title", null)
        }
        else if(showSecondary) {
            setShowSecondary(prevState => !prevState);
            setSecondaryClassification({label: '', value: ''})
            setSecondaryClass([{label: 'velg sekundær ordningsprinsipp først', value: ''}])
            props.setValue("caseData.newCase.classes[1].classification", null)
            props.setValue("caseData.newCase.classes[1].class", null)
            props.setValue("caseData.newCase.classes[1].title", null)
        }
    }

    useEffect(()=> {
        getPrimaryClass();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [primaryClassification, setPrimaryClassification])

    useEffect(()=> {
        getSecondaryClass();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [secondaryClassification, setSecondaryClassification])

    useEffect(()=> {
        getTertiaryClass();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tertiaryClassification, setTertiaryClassification])

    let errors: FieldErrors = props.errors;
    let required: boolean = props.validation;
    let isCollection = props.watch("caseData.caseCreationStrategy") === CreationStrategy.BY_ID

    const [_case, setCase] = React.useState('');
    const {setId} = useContext(IntegrationContext)
    let caseInput = props.watch("caseData.id");
    let caseInputPattern = /^((19|20)*\d{2})\/([0-9]{1,6})/g;

    useEffect(() => {
        if(caseInput) {
            handleCaseSearch();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleCaseSearch = () => {
        if(caseInputPattern.test(caseInput)) {
            setId(caseInput)
            setCase(t('caseSearch.searching'))
            let caseId = caseInput.split('/')
            ResourceRepository.getSak(caseId[0], caseId[1])
                .then((response) => {
                    setCase(caseInput +': ' + response.data.value)
                    setId(caseInput)
                })
                .catch(e => {
                        console.error('Error: ', e)
                        setId(undefined)
                        setCase(caseInput +': ' + t('caseSearch.noMatch'));
                        props.setValue("caseData.id", undefined)
                    }
                )
        } else {
            setCase(t('caseSearch.info'))
            setId(undefined)
        }
    }

    const handleCaseClear = () => {
            setCase('')
            setId(undefined)
        props.setValue("caseData.id", undefined)

    }

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

    const caseInformationFields: IInputField[] = [
        {input: INPUT_TYPE.DROPDOWN, label: "labels.caseCreationInfo", value: props.watch("caseData.caseCreationStrategy"), formValue: "caseData.caseCreationStrategy", dropDownItems: creationStrategies, helpText: "caseData.caseCreationStrategy"},
        {input: INPUT_TYPE.TEXT_FIELD, label: "labels.id", formValue: "caseData.id", hidden:!isCollection, required:isCollection && props.validation, error:errors.caseData?.id, searchOption: true, helpText: "caseData.id", disabled: props.disabled},
    ]
    const caseFormFields: IInputField[] = [
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "labels.title", formValue: "caseData.newCase.title", required: required, error: errors.caseData?.newCase?.title, value: props.activeFormData?.caseData?.newCase?.title, helpText: "caseData.title"},
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "labels.publicTitle", formValue: "caseData.newCase.publicTitle", required: false, error:errors.caseData?.newCase?.publicTitle, value: props.activeFormData?.caseData?.newCase.publicTitle, helpText: "caseData.publicTitle"},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.caseType", value: props.watch("caseData.newCase.caseType"), formValue: "caseData.newCase.caseType", dropDownItems: caseTypes, required: false, error:errors.caseData?.newCase?.caseType, helpText: "caseData.caseType"},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.administrativeUnit", value: props.watch("caseData.newCase.administrativeUnit"), formValue: "caseData.newCase.administrativeUnit", dropDownItems: administrativeUnits, required: required, error:errors.caseData?.newCase?.administrativeUnit, helpText: "caseData.administrativeUnit"},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.responsibleCaseWorker", value: props.watch("caseData.newCase.caseWorker"), formValue: "caseData.newCase.caseWorker", dropDownItems: archiveResources, required: false, error:errors.caseData?.newCase?.caseWorker, helpText: "caseData.caseWorker"},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.archiveUnit", value: props.watch("caseData.newCase.archiveUnit"), formValue: "caseData.newCase.archiveUnit", dropDownItems: archiveSections, required: required, error:errors.caseData?.newCase?.archiveUnit, helpText: "caseData.archiveUnit"},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.recordUnit", value: props.watch("caseData.newCase.recordUnit"), formValue: "caseData.newCase.recordUnit", dropDownItems: administrativeUnits, required: false, error:errors.caseData?.newCase?.recordUnit, helpText: "caseData.recordUnit", disabled: true},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.status", value: props.watch("caseData.newCase.status"), formValue: "caseData.newCase.status", dropDownItems: statuses, required: required, error:errors.caseData?.newCase?.status, helpText: "caseData.status"},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.accessCode", value: props.watch("caseData.newCase.shielding.accessCode"), formValue: "caseData.newCase.shielding.accessCode", dropDownItems: accessCodes, required: false, error:errors.caseData?.newCase?.shielding?.accessCode, helpText: "caseData.accessCode"},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.paragraph", value: props.watch("caseData.newCase.shielding.paragraph"), formValue: "caseData.newCase.shielding.paragraph", dropDownItems: paragraphs, required: false, error:errors.caseData?.newCase?.shielding?.paragraph, helpText: "caseData.paragraph"},
    ]
    const classificationFormFields: IInputField[] = [
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.primaryClassification", value: props.watch("caseData.newCase.classes[0].classification"), formValue: "caseData.newCase.classes[0].classification", dropDownItems: classificationSystems, required: required, error:errors.caseData?.newCase?.classes, setter: setPrimaryClassification, helpText: "caseData.classification"},
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "labels.primaryClass", value: props.activeFormData?.caseData.newCase.classes[0].class, formValue: "caseData.newCase.classes[0].class", hidden: !listOfClassificationsWithDynamicField.includes(props.watch("caseData.newCase.classes[0].classification")), required: required && hasPrimary, error:errors.caseData?.newCase?.classes, helpText: "caseData.class"},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.primaryClass", value: props.watch("caseData.newCase.classes[0].class"), formValue: "caseData.newCase.classes[0].class", hidden: listOfClassificationsWithDynamicField.includes(props.watch("caseData.newCase.classes[0].classification")), dropDownItems: primaryClass, required: required && hasPrimary, error:errors.caseData?.newCase?.classes, helpText: "caseData.class"},
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "labels.primaryTitle", formValue: "caseData.newCase.classes[0].title", required: required && hasPrimary, error:errors.caseData?.newCase?.classes, value: props.activeFormData?.caseData?.newCase?.classes[0].title, helpText: "caseData.classTitle"}
    ]
    const secondaryClassificationFormFields: IInputField[] = [
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.secondaryClassification", value: props.watch("caseData.newCase.classes[1].classification"), formValue: "caseData.newCase.classes[1].classification", dropDownItems: classificationSystems, required: false, error:errors.caseData?.newCase?.classes, setter: setSecondaryClassification, helpText: "caseData.classification", hidden: !showSecondary},
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "labels.secondaryClass", value: props.activeFormData?.caseData.newCase.classes[1].class, formValue: "caseData.newCase.classes[1].class", hidden: !listOfClassificationsWithDynamicField.includes(props.watch("caseData.newCase.classes[1].classification")), required: false, error:errors.caseData?.newCase?.classes, helpText: "caseData.class"},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.secondaryClass", value: props.watch("caseData.newCase.classes[1].class"), formValue: "caseData.newCase.classes[1].class", hidden: listOfClassificationsWithDynamicField.includes(props.watch("caseData.newCase.classes[1].classification")), dropDownItems: secondaryClass, required: false, error:errors.caseData?.newCase?.classes, helpText: "caseData.class"},
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "labels.secondaryTitle", formValue: "caseData.newCase.classes[1].title", required: false, error:errors.caseData?.newCase?.classes, value: props.activeFormData?.caseData?.newCase?.classes[1].title, helpText: "caseData.classTitle", hidden: !showSecondary}
    ]
    const tertiaryClassificationFormFields: IInputField[] = [
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.tertiaryClassification", value: props.watch("caseData.newCase.classes[2].classification"), formValue: "caseData.newCase.classes[2].classification", dropDownItems: classificationSystems, required: false, error:errors.caseData?.newCase?.classes, setter: setTertiaryClassification, helpText: "caseData.classification", hidden: !showTertiary},
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "labels.tertiaryClass", value: props.activeFormData?.caseData.newCase.classes[2].class, formValue: "caseData.newCase.classes[2].class", hidden: !listOfClassificationsWithDynamicField.includes(props.watch("caseData.newCase.classes[2].classification")), required: false, error:errors.caseData?.newCase?.classes, helpText: "caseData.class"},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.tertiaryClass", value: props.watch("caseData.newCase.classes[2].class"), formValue: "caseData.newCase.classes[2].class", hidden: listOfClassificationsWithDynamicField.includes(props.watch("caseData.newCase.classes[2].classification")), dropDownItems: tertiaryClass, required: false, error:errors.caseData?.newCase?.classes, helpText: "caseData.class"},
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "labels.tertiaryTitle", formValue: "caseData.newCase.classes[2].title", required: false, error:errors.caseData?.newCase?.classes, value: props.activeFormData?.caseData?.newCase?.classes[2].title, helpText: "caseData.classTitle", hidden: !showTertiary}
    ]

    return (
        <>
            <div>
                <FormGroup className={props.style.formControl}>
                    {caseInformationFields.map((field, index) => {
                        return (
                            field.hidden ?
                                <div key={index}/> :
                                <>
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
                                    {isCollection && field.searchOption && <Box>
                                        <Button disabled={props.disabled} id="case-number-search-btn" onClick={handleCaseSearch} variant="outlined" sx={{mb: 2}}>{t('button.search')}</Button>
                                        <Button disabled={props.disabled} id="case-number-clear-btn" onClick={handleCaseClear} variant="outlined" sx={{ml: 2, mb: 2}}>{'Tilbakestill'}</Button>
                                    </Box>}
                                </>
                        )
                    })}
                    {isCollection && _case ? <Typography id="case-information-case-search-result" sx={{mb:2}}>{_case}</Typography> : ''}
                </FormGroup>
            </div>
            {isCollection ? <></> : <div>
                <FormGroup className={props.style.formControl}>
                    {!isCollection && caseFormFields.map((field, index) => {
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
            </div>}

        </>
    );
}

export default CaseForm;