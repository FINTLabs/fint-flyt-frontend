import {Box, Button, FormGroup, Typography} from '@mui/material';
import React, {useContext, useEffect} from 'react';
import InputField from "./InputField";
import {INPUT_TYPE} from "../../types/InputType.enum";
import {IInputField} from "../../types/InputField";
import {
    creationStrategies,
    getDestinationDisplayName,
    getSourceApplicationDisplayName
} from "../../defaults/DefaultValues";
import {CreationStrategy} from "../../types/CreationStrategy";
import {FieldErrors} from "react-hook-form";
import HelpPopover from "../popover/HelpPopover";
import { useTranslation } from 'react-i18next';
import ResourceRepository from "../../../../shared/repositories/ResourceRepository";
import {IntegrationContext} from "../../../../context/integrationContext";

const CaseInformation: React.FunctionComponent<any> = (props) => {
    const { t } = useTranslation('translations', { keyPrefix: 'pages.configurationForm.accordions.caseInformation'});
    const [_case, setCase] = React.useState('');
    const {setCaseNumber, selectedMetadata} = useContext(IntegrationContext)
    let caseInput = props.watch("caseData.caseNumber");
    let caseInputPattern = /^((19|20)*\d{2})\/([0-9]{1,6})/g;

    useEffect(() => {
        if(caseInput) {
            handleCaseSearch();
        }
    }, [])

    const handleCaseSearch = () => {
        if(caseInputPattern.test(caseInput)) {
            setCaseNumber(caseInput)
            setCase(t('caseSearch.searching'))
            let caseId = caseInput.split('/')
            ResourceRepository.getSak(caseId[0], caseId[1])
                .then((response) => {
                    setCase(caseInput +': ' + response.data.value)
                    setCaseNumber(caseInput)
                })
                .catch(e => {
                        console.error('Error: ', e)
                        setCaseNumber(undefined)
                        setCase(caseInput +': ' + t('caseSearch.noMatch'));
                        props.setValue("caseData.caseNumber", undefined)
                    }
                )
        } else {
            setCase(t('caseSearch.info'))
            setCaseNumber(undefined)
        }
    }

    let isCollection = props.watch("caseData.caseCreationStrategy") === CreationStrategy.BY_ID
    let errors: FieldErrors = props.errors
    const caseInformationFields: IInputField[] = [
        {input: INPUT_TYPE.RADIO, label: "labels.caseCreationInfo", value: props.watch("caseData.caseCreationStrategy"),
            formValue: "caseData.caseCreationStrategy", radioOptions: creationStrategies, helpText: "caseData.caseCreationStrategy"},
        {input: INPUT_TYPE.TEXT_FIELD, label: "labels.caseNumber", formValue: "caseData.caseNumber", hidden:!isCollection, required:isCollection && props.validation, error:errors.caseData?.caseNumber, searchOption: true, helpText: "caseData.caseNumber", disabled: props.disabled},
    ]
    return (
        <div>
            <Typography><strong>{t('integrationId')}: </strong>{props.integration?.id}</Typography>
            <Typography><strong>{t('sourceApplicationId')}: </strong>{getSourceApplicationDisplayName(props.integration?.sourceApplicationId)}</Typography>
            <Typography><strong>{t('sourceApplicationIntegrationId')}: </strong>{props.integration?.sourceApplicationIntegrationId} - {selectedMetadata.integrationDisplayName}</Typography>
            <Typography><strong>{t('destination')}: </strong>{getDestinationDisplayName(props.integration?.destination)}</Typography>
            <FormGroup id="case-information" className={props.style.formControl} sx={{mt: 4}}>
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
                                                    {...props}
                                        />
                                    </Box>
                                    <Box>
                                        <HelpPopover popoverContent={field.helpText}/>
                                    </Box>
                                    {isCollection && field.searchOption && <Box>
                                        <Button disabled={props.disabled} id="case-information-search-btn" onClick={handleCaseSearch} variant="outlined" sx={{ml: 2}}>{t('button.search')}</Button>
                                    </Box>}
                                </Box>
                        );
                    }
                )}
                {isCollection && _case ? <Typography id="case-information-case-search-result" sx={{mb:2}}>{_case}</Typography> : ''}
            </FormGroup>
        </div>
    );
}

export default CaseInformation;
