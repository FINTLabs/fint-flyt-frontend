import {Box, Button, FormGroup, IconButton, Typography} from '@mui/material';
import React, {useContext} from 'react';
import InputField from "./InputField";
import {INPUT_TYPE} from "../../types/InputType.enum";
import {IInputField} from "../../types/InputField";
import {creationStrategies, destinations, forms, sourceApplications} from "../../defaults/DefaultValues";
import {CreationStrategy} from "../../types/CreationStrategy";
import {FieldErrors} from "react-hook-form";
import IntegrationRepository from "../../repository/IntegrationRepository";
import {IntegrationContext} from "../../../../context/integrationContext";
import LockIcon from '@mui/icons-material/Lock';
import HelpPopover from "../popover/HelpPopover";
import { useTranslation } from 'react-i18next';
import ExistingCaseForm from "./ExistingCaseForm";

const CaseInformation: React.FunctionComponent<any> = (props) => {
    const { t } = useTranslation('translations', { keyPrefix: 'pages.integrationForm.accordions.caseInformation'});
    const { destination, sourceApplication } = useContext(IntegrationContext)
    const [_case, setCase] = React.useState('');
    let caseInput = props.watch("caseData.caseNumber");
    let caseInputPattern = /^((19|20)*\d{2})\/([0-9]{1,6})/g;

    const handleCaseNumberSearch = () => {
        if(caseInputPattern.test(caseInput)) {
            setCase(t('caseSearch.searching'))
            let caseId = caseInput.split('/')
            IntegrationRepository.getSak(caseId[0], caseId[1])
                .then((response) => {
                    setCase(response.data.value)
                })
                .catch(e => {
                        console.error('Error: ', e)
                        setCase(t('caseSearch.noMatch'));
                    }
                )
        } else setCase(t('caseSearch.info'))
    }

    let isCollection = props.watch("caseData.caseCreationStrategy") === CreationStrategy.COLLECTION
    let isExisting = props.watch("caseData.caseCreationStrategy") === CreationStrategy.EXISTING
    let errors: FieldErrors = props.errors
    const caseInformationFields: IInputField[] = [
        {input: INPUT_TYPE.DROPDOWN, label: "labels.sourceApplication", value: sourceApplication, formValue: "sourceApplication", dropDownItems: sourceApplications, disabled: true, lockIcon: true},
        {input: INPUT_TYPE.DROPDOWN, label: "labels.destination", value: destination, formValue: "destination", dropDownItems: destinations, disabled: true, lockIcon: true},
        {input: INPUT_TYPE.DROPDOWN, label: "labels.sourceApplicationIntegrationId", value: props.watch("sourceApplicationIntegrationId"), required: props.validation, formValue: "sourceApplicationIntegrationId", error:errors.sourceApplicationIntegrationId, dropDownItems: forms, helpText: "sourceApplicationIntegrationId"},
        {input: INPUT_TYPE.TEXT_FIELD, label: "labels.name", formValue: "name", required: props.validation, error:errors.name, helpText: "name"},
        {input: INPUT_TYPE.TEXT_FIELD, label: "labels.description", formValue: "description", required: props.validation, error:errors.description, helpText: "description"},
        {input: INPUT_TYPE.RADIO, label: "labels.caseCreationInfo", value: props.watch("caseData.caseCreationStrategy"),
            formValue: "caseData.caseCreationStrategy", radioOptions: creationStrategies, helpText: "caseData.caseCreationStrategy"},
        {input: INPUT_TYPE.TEXT_FIELD, label: "labels.caseNumber", formValue: "caseData.caseNumber", hidden:!isCollection, required:isCollection && props.validation, error:errors.caseData?.caseNumber, searchOption: true, helpText: "caseData.caseNumber"},
    ]

    return (
        <div>
            <FormGroup id="case-information" className={props.style.formControl}>
                {caseInformationFields.map((field, index) => {
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
                                    {field.lockIcon && <div>
                                        <IconButton aria-label="locked" disabled={true}><LockIcon /></IconButton></div>}
                                    {!field.lockIcon && <Box>
                                        <HelpPopover popoverContent={field.helpText}/></Box>}
                                    {isCollection && field.searchOption && <Box>
                                        <Button id="case-information-search-btn" onClick={handleCaseNumberSearch} variant="outlined" sx={{ml: 2}}>{t('button.search')}</Button></Box>
                                    }
                                </Box>
                        );
                    }
                )}
                {isCollection && _case ? <Typography id="case-information-case-search-result" sx={{mb:2}}>{_case}</Typography> : ''}
            </FormGroup>
            {isExisting && <ExistingCaseForm {...props}/>}
            <Button id="case-information-save-btn" sx={{mb: 2}} onClick={props.onSave} variant="contained">{t('button.save')}</Button>
        </div>
    );
}

export default CaseInformation;
