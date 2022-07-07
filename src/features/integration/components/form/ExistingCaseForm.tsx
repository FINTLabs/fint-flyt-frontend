import {Box, Button, FormGroup, MenuItem, TextField, Typography} from '@mui/material';
import React, {useContext, useEffect} from 'react';
import InputField from "./InputField";
import {INPUT_TYPE} from "../../types/InputType.enum";
import {IInputField} from "../../types/InputField";
import {FieldErrors} from "react-hook-form";
import {useTranslation} from 'react-i18next';
import {ResourcesContext} from "../../../../context/resourcesContext";
import {dropdownPlaceholder, exisingCaseSearchCombinations} from "../../defaults/DefaultValues";
import {ICaseSearchParams} from "../../types/CaseSearchParams";

const ExistingCaseForm: React.FunctionComponent<any> = (props) => {
    const required = props.validation;
    const errors: FieldErrors = props.errors
    const { t } = useTranslation('translations');
    const [existingCase, setExistingCase] = React.useState('');
    const { accessCodes, archiveSections, classificationSystems, primaryClassification, primaryClass, getPrimaryClass, setPrimaryClassification} = useContext(ResourcesContext);
    const [searchStrategy, setSearchStrategy] = React.useState('CLASS');
    let socialSecurityCode: string = 'https://beta.felleskomponent.no/arkiv/noark/klassifikasjonssystem/systemid/FNR'
    let orgNumberCode: string = 'https://beta.felleskomponent.no/arkiv/noark/klassifikasjonssystem/systemid/ORGNR'
    let searchParams: ICaseSearchParams = {
        searchStrategy: searchStrategy,
        primaryClassification: props.watch("caseData.primaryClassification"),
        primaryClass: props.watch("caseData.primaryClass"),
        primaryTitle: props.watch("caseData.primaryTitle"),
        archiveSection: props.watch("caseData.archiveUnit"),
        type: props.watch("caseData.type"),
        accessCode: props.watch("caseData.accessCode"),
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchStrategy(event.target.value);
    };

    useEffect(()=> {
        getPrimaryClass();
    }, [primaryClassification, setPrimaryClassification])

    const handleExistingCaseSearch = () => {
        console.log(searchParams)
        setExistingCase('Vis søkeresultat her');
    }

    const exisitingCaseInformation: IInputField[] = [
        {input: INPUT_TYPE.DROPDOWN, label: "labels.primaryClassification", value: props.watch("caseData.primaryClassification"), formValue: "caseData.primaryClassification", dropDownItems: classificationSystems, required: required, error:errors.caseData?.primaryClassification, setter: setPrimaryClassification, helpText: "caseData.classification"},
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "labels.primaryClassSsNbr", value: props.activeFormData?.caseData.primaryClass, formValue: "caseData.primaryClass", hidden: props.watch("caseData.primaryClassification") !== socialSecurityCode, required: required, error:errors.caseData?.primaryClass, helpText: "caseData.class"},
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "labels.primaryClassOrg", value: props.activeFormData?.caseData?.primaryClass, formValue: "caseData.primaryClass", hidden: props.watch("caseData.primaryClassification") !== orgNumberCode, required: required, error:errors.caseData?.primaryClass, helpText: "caseData.class"},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "labels.primaryClass", value: props.watch("caseData.primaryClass"), formValue: "caseData.primaryClass", hidden: props.watch("caseData.primaryClassification") === socialSecurityCode || props.watch("caseData.primaryClassification") === orgNumberCode, dropDownItems: primaryClass, required: required, error:errors.caseData?.primaryClass, helpText: "caseData.class"},
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "labels.primaryTitle", formValue: "caseData.primaryTitle", required: required, error:errors.caseData?.primaryTitle, value: props.activeFormData?.caseData?.primaryTitle, helpText: "caseData.classTitle"},
        {input: INPUT_TYPE.DROPDOWN, label: "labels.archiveUnit", value: props.watch("caseData.archiveUnit"), formValue: "caseData.archiveUnit", dropDownItems: archiveSections, hidden: searchStrategy == 'CLASS' || searchStrategy == 'CLASS_TYPE', required: props.validation, error:errors.caseData?.archiveUnit, helpText: "caseData.archiveUnit"},
        {input: INPUT_TYPE.DROPDOWN, label: "labels.accessCode", value: props.watch("caseData.accessCode"), formValue: "caseData.accessCode", dropDownItems: accessCodes, hidden:searchStrategy !== 'CLASS_ACCESSCODE_ARCHIVESECTION_TYPE', required: props.validation, error:errors.caseData?.accessCode, helpText: "caseData.accessCode"},
        {input: INPUT_TYPE.DROPDOWN, label: "labels.type", value: props.watch("caseData.caseType"), formValue: "caseData.caseType", dropDownItems: dropdownPlaceholder, hidden: searchStrategy == 'CLASS' || searchStrategy == 'CLASS_ARCHIVESECTION', required: false, disabled:true, error:errors.caseData?.caseType, helpText: "caseData.caseType"},
    ]

    return (
        <div>
            <FormGroup id="existing-case-information" className={props.style.formControl}>
                {<TextField sx={{mb: 3}}
                    id="outlined-select"
                    select
                    label={t("inputField.labels.searchAlternatives")}
                    value={searchStrategy}
                    onChange={handleChange}
                >
                    {exisingCaseSearchCombinations.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {t(option.label)}
                        </MenuItem>
                    ))}
                </TextField>}

                {exisitingCaseInformation.map((field, index) => {
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
            <Box sx={{mb: 4}}>
                <Button id="case-information-search-btn" onClick={handleExistingCaseSearch} variant="outlined">{t('components.formSettings.button.search')}</Button>
                <Typography>{existingCase}</Typography>
            </Box>
        </div>
    );
}

export default ExistingCaseForm;
