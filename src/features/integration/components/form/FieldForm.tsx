import {Box, Button, FormGroup, Typography} from '@mui/material';
import React, {useContext, useEffect} from 'react';
import InputField from "./InputField";
import {INPUT_TYPE, toInputType} from "../../types/InputType.enum";
import {IInputField} from "../../types/InputField";
import {
    creationStrategies,
} from "../../defaults/DefaultValues";
import {CreationStrategy} from "../../types/CreationStrategy";
import {FieldErrors} from "react-hook-form";
import HelpPopover from "../popover/HelpPopover";
import { useTranslation } from 'react-i18next';
import ResourceRepository from "../../../../shared/repositories/ResourceRepository";
import {IntegrationContext} from "../../../../context/integrationContext";
import {MOCK_CASE_INPUTFIELDS} from "../../../../__tests__/mock/mock_inputfields";
import {ResourcesContext} from "../../../../context/resourcesContext";
import {toDisabledProp, toHiddenProp, toRequiredProp} from "./FormUtil";

const FieldForm: React.FunctionComponent<any> = (props) => {
    const { t } = useTranslation('translations', { keyPrefix: 'pages.configurationForm.accordions.caseInformation'});
    const [_case, setCase] = React.useState('');
    const {setCaseNumber} = useContext(IntegrationContext)
    const {getResourcesByName} = useContext(ResourcesContext);

    let watch = props.watch;
    let activeConfiguration = props.activeConfiguration;
    let errors: FieldErrors = props.errors

    let caseInput = props.watch("caseData.caseNumber");
    let caseInputPattern = /^((19|20)*\d{2})\/([0-9]{1,6})/g;
    const MOCK_INPUTFIELDS = MOCK_CASE_INPUTFIELDS;

    const fieldList: IInputField[] = MOCK_INPUTFIELDS.map(inputField => {
        return (
            {
                input: toInputType(inputField.input),
                label: inputField.label,
                formValue: inputField.formValue,
                value: watch(inputField.value),
                options: inputField.options ? getResourcesByName(inputField.options) : [],
                helpText: inputField.helpText,
                hidden: inputField.hidden ? toHiddenProp(inputField.hidden, watch, activeConfiguration) : undefined,
                //error: inputField.error ? toErrorProp(inputField.error) : undefined,
                required: inputField.required ? toRequiredProp(inputField.required, watch, activeConfiguration, props.validation) : false,
                searchOption: inputField.searchOption ? inputField.searchOption : false,
                disabled: inputField.disabled ? toDisabledProp(inputField.disabled, activeConfiguration) : undefined
            }
        )
    });

    console.log(fieldList)
    useEffect(() => {
        if(caseInput) {
            setCaseNumber(caseInput)
            let caseId = caseInput.split('/')
            ResourceRepository.getSak(caseId[0], caseId[1])
                .then((response) => {
                    setCase(response.data.value)
                    setCaseNumber(caseInput)
                })
                .catch(e => {
                        console.error('Error: ', e)
                        setCaseNumber(undefined)
                        setCase(t('caseSearch.noMatch'));
                    }
                )
        }
    }, [])

    const handleCaseSearch = () => {
        if(caseInputPattern.test(caseInput)) {
            setCase(t('caseSearch.searching'))
            let caseId = caseInput.split('/')
            ResourceRepository.getSak(caseId[0], caseId[1])
                .then((response) => {
                    setCase(response.data.value)
                    setCaseNumber(caseInput)
                })
                .catch(e => {
                        console.error('Error: ', e)
                        setCaseNumber(undefined)
                        setCase(t('caseSearch.noMatch'));
                    }
                )
        } else {
            setCase(t('caseSearch.info'))
            setCaseNumber(undefined)
        }
    }

    let isCollection = props.watch("caseData.caseCreationStrategy") === CreationStrategy.COLLECTION
    const caseInformationFields: IInputField[] = [
        {input: INPUT_TYPE.RADIO, label: "labels.caseCreationInfo", value: props.watch("caseData.caseCreationStrategy"), formValue: "caseData.caseCreationStrategy", radioOptions: creationStrategies, helpText: "caseData.caseCreationStrategy"},
        {input: INPUT_TYPE.TEXT_FIELD, label: "labels.caseNumber", formValue: "caseData.caseNumber", hidden:!isCollection, required:isCollection && props.validation, error:errors.caseData?.caseNumber, searchOption: true, helpText: "caseData.caseNumber", disabled: props.disabled},
    ]


    return (
        <div>
            <FormGroup id="case-information" className={props.style.formControl} sx={{mt: 4}}>
                {fieldList.map((field, index) => {
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
                                                    dropdownItems={field.options}
                                                    radioOptions={field.options}
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

export default FieldForm;
