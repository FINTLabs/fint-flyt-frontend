import {Box, Divider, FormGroup, Typography} from '@mui/material';
import React, {useContext, useEffect} from 'react';
import InputField from "./InputField";
import {INPUT_TYPE} from "../../types/InputType.enum";
import {IInputField} from "../../types/InputField";
import {FieldErrors} from "react-hook-form";
import {useTranslation} from 'react-i18next';
import {ResourcesContext} from "../../../../context/resourcesContext";
import {dropdownPlaceholder} from "../../defaults/DefaultValues";
import {ICaseSearchParams} from "../../types/CaseSearchParams";
import AddIcon from '@mui/icons-material/Add';
import {createValueBuilder} from "../../../util/ValueBuilderUtil";
import {IField} from "../../types/Field";
import {toExistingCaseSearchParams} from "../../../util/ToExistingCaseSearchParams";
import {CreationStrategy} from "../../types/CreationStrategy";

const ExistingCaseForm: React.FunctionComponent<any> = (props) => {
    const required = props.validation;
    const getValues = props.getValues;
    const errors: FieldErrors = props.errors
    const { t } = useTranslation('translations', { keyPrefix: 'pages.integrationForm.accordions.caseInformation'});
    const [showSecondary, setShowSecondary] = React.useState(false);
    const [showTertiary, setShowTertiary] = React.useState(false);
    const {accessCodes, archiveSections, classificationSystems, primaryClassification, secondaryClassification, tertiaryClassification, primaryClass, secondaryClass, tertiaryClass, getPrimaryClass, getSecondaryClass, getTertiaryClass,
        setPrimaryClassification, setSecondaryClassification, setTertiaryClassification } = useContext(ResourcesContext);
    let socialSecurityCode: string = 'https://beta.felleskomponent.no/arkiv/noark/klassifikasjonssystem/systemid/FNR'
    let orgNumberCode: string = 'https://beta.felleskomponent.no/arkiv/noark/klassifikasjonssystem/systemid/ORGNR'
    let isCollection = props.watch("caseData.caseCreationStrategy") === CreationStrategy.COLLECTION
    let isExisting = props.watch("caseData.caseCreationStrategy") === CreationStrategy.EXISTING
    let searchParams: ICaseSearchParams = {
        primaryClassification: props.watch("caseData.primaryClassification"),
        primaryClass: createValueBuilder(props.watch("caseData.primaryClass")),
        primaryTitle: createValueBuilder(props.watch("caseData.primaryTitle")),
        secondaryClassification: props.watch("caseData.secondaryClassification"),
        secondaryClass: createValueBuilder(props.watch("caseData.secondaryClass")),
        secondaryTitle: createValueBuilder(props.watch("caseData.secondaryTitle")),
        tertiaryClassification: props.watch("caseData.tertiaryClassification"),
        tertiaryClass: createValueBuilder(props.watch("caseData.tertiaryClass")),
        tertiaryTitle: createValueBuilder(props.watch("caseData.tertiaryTitle")),
        archiveSection: props.watch("caseData.archiveUnit"),
        type: props.watch("caseData.type"),
        accessCode: props.watch("caseData.accessCode")
    }
    let searches: IField[] = toExistingCaseSearchParams(getValues("caseData"))


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


    const exisitingCaseClassification: IInputField[] = [
        {input: INPUT_TYPE.DROPDOWN, label: "labels.primaryClassification", value: props.watch("caseData.primaryClassification"), formValue: "caseData.primaryClassification", dropDownItems: classificationSystems, required: required , error:errors.caseData?.primaryClassification, setter: setPrimaryClassification, helpText: "caseData.classification"},
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "labels.primaryClassSsNbr", value: props.activeFormData?.caseData.primaryClass, formValue: "caseData.primaryClass", hidden: props.watch("caseData.primaryClassification") !== socialSecurityCode, required: required, error:errors.caseData?.primaryClass, helpText: "caseData.class"},
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "labels.primaryClassOrg", value: props.activeFormData?.caseData?.primaryClass, formValue: "caseData.primaryClass", hidden: props.watch("caseData.primaryClassification") !== orgNumberCode, required: required, error:errors.caseData?.primaryClass, helpText: "caseData.class"},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.primaryClass", value: props.watch("caseData.primaryClass"), formValue: "caseData.primaryClass", hidden: props.watch("caseData.primaryClassification") === socialSecurityCode || props.watch("caseData.primaryClassification") === orgNumberCode, dropDownItems: primaryClass, required: required, error:errors.caseData?.primaryClass, helpText: "caseData.class"},
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "labels.primaryTitle", formValue: "caseData.primaryTitle", required: false, error:errors.caseData?.primaryTitle, value: props.activeFormData?.caseData?.primaryTitle, helpText: "caseData.classTitle"},
        {input: INPUT_TYPE.DROPDOWN, label: "labels.secondaryClassification", value: props.watch("caseData.secondaryClassification"), formValue: "caseData.secondaryClassification", hidden: !showSecondary, dropDownItems: classificationSystems, required: false, error:errors.caseData?.secondaryClassification, setter: setSecondaryClassification, helpText: "caseData.classification"},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.secondaryClass", value: props.watch("caseData.secondaryClass"), formValue: "caseData.secondaryClass", hidden: !showSecondary, dropDownItems: secondaryClass, required: false, error:errors.caseData?.secondaryClass, helpText: "caseData.class"},
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "labels.secondaryTitle", formValue: "caseData.secondaryTitle", hidden: !showSecondary, required: false, error:errors.caseData?.secondaryTitle, value: props.activeFormData?.caseData?.secondaryTitle, helpText: "caseData.classTitle"},
        {input: INPUT_TYPE.DROPDOWN, label: "labels.tertiaryClassification", value: props.watch("caseData.tertiaryClassification"), formValue: "caseData.tertiaryClassification", hidden: !showTertiary, dropDownItems: classificationSystems, required: false, error:errors.caseData?.tertiaryClassification, setter: setTertiaryClassification, helpText: "caseData.classification"},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.tertiaryClass", value: props.watch("caseData.tertiaryClass"), formValue: "caseData.tertiaryClass", hidden: !showTertiary, dropDownItems: tertiaryClass, required: false, error:errors.caseData?.tertiaryClass, helpText: "caseData.class"},
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "labels.tertiaryTitle", formValue: "caseData.tertiaryTitle", hidden: !showTertiary, required: false, error:errors.caseData?.tertiaryTitle, value: props.activeFormData?.caseData?.tertiaryTitle, helpText: "caseData.classTitle"},
  ]

    const existingCaseInformation: IInputField[] = [
        {input: INPUT_TYPE.DROPDOWN, label: "labels.archiveUnit", value: props.watch("caseData.archiveUnit"), formValue: "caseData.archiveUnit", dropDownItems: archiveSections, required: false, error:errors.caseData?.archiveUnit, helpText: "caseData.archiveUnit"},
        {input: INPUT_TYPE.DROPDOWN, label: "labels.accessCode", value: props.watch("caseData.accessCode"), formValue: "caseData.accessCode", dropDownItems: accessCodes, required: false, error:errors.caseData?.accessCode, helpText: "caseData.accessCode"},
        {input: INPUT_TYPE.DROPDOWN, label: "labels.type", value: props.watch("caseData.caseType"), formValue: "caseData.caseType", dropDownItems: dropdownPlaceholder, required: false, disabled:true, error:errors.caseData?.caseType, helpText: "caseData.caseType"},
    ]


    return (
        <div>
            <FormGroup id="existing-case-information" className={props.style.formControl}>
                <Typography>{t('classification')}</Typography>
                {exisitingCaseClassification.map((field, index) => {
                        return (
                            field.hidden ?
                                <div key={index}/> :
                                <Box sx={{display: 'flex'}} key={index}>
                                    <Box width={'100%'}>
                                        <InputField key={index}
                                                    id={field.formValue}
                                                    required={field.required}
                                                    error={field.error}
                                                    input={field.input}
                                                    label={field.label}
                                                    value={field.value}
                                                    formValue={field.formValue}
                                                    dropdownItems={field.dropDownItems}
                                                    radioOptions={field.radioOptions}
                                                    disabled={field.disabled}
                                                    setter={field.setter}
                                                    {...props}
                                        />
                                    </Box>
                                </Box>
                        );
                    }
                )}
                {!showSecondary && <AddIcon sx={{cursor: 'pointer'}} onClick={handleToggleSecondary}/>}
                {showSecondary && !showTertiary && <AddIcon sx={{cursor: 'pointer'}} onClick={handleToggleTertiary}/>}
                <Divider sx={{mb: 3}}/>
                {existingCaseInformation.map((field, index) => {
                        return (
                            field.hidden ?
                                <div key={index}/> :
                                <Box sx={{display: 'flex'}} key={index}>
                                    <Box width={'100%'}>
                                        <InputField key={index}
                                                    id={field.formValue}
                                                    required={field.required}
                                                    error={field.error}
                                                    input={field.input}
                                                    label={field.label}
                                                    value={field.value}
                                                    formValue={field.formValue}
                                                    dropdownItems={field.dropDownItems}
                                                    radioOptions={field.radioOptions}
                                                    disabled={field.disabled}
                                                    setter={field.setter}
                                                    {...props}
                                        />
                                    </Box>
                                </Box>
                        );
                    }
                )}
            </FormGroup>
        </div>
    );
}

export default ExistingCaseForm;
