import {Box, Button, Checkbox, Divider, FormControlLabel, FormGroup, Typography} from '@mui/material';
import React, {useContext, useEffect} from 'react';
import InputField from "./InputField";
import {toInputType} from "../../types/InputType.enum";
import {IFieldGroup, IFieldValue, IInputFieldGroup} from "../../types/InputField";
import {CreationStrategy} from "../../types/CreationStrategy";
import {FieldErrors} from "react-hook-form";
import HelpPopover from "../popover/HelpPopover";
import { useTranslation } from 'react-i18next';
import ResourceRepository from "../../../../shared/repositories/ResourceRepository";
import {IntegrationContext} from "../../../../context/integrationContext";
import {ResourcesContext} from "../../../../context/resourcesContext";
import {toDisabledProp, toErrorProp, toHiddenProp, toRequiredProp, toValueByFormData} from "./FormUtil";

const FieldFactory: React.FunctionComponent<any> = (props) => {
    const { t } = useTranslation('translations', { keyPrefix: 'pages.configurationForm.accordions.caseInformation'});
    const [_case, setCase] = React.useState('');
    const {setCaseNumber} = useContext(IntegrationContext)
    const {getResourcesByName} = useContext(ResourcesContext);
    let watch = props.watch;
    let activeConfiguration = props.activeConfiguration;
    let errors: FieldErrors = props.errors
    let id = props.id;

    let caseInput = props.watch("caseData.caseNumber");
    let caseInputPattern = /^((19|20)*\d{2})\/([0-9]{1,6})/g;
    const inputFieldGroups: IFieldGroup[] = props.inputFieldGroups;

    const testList: IInputFieldGroup[] = inputFieldGroups.map(group => {
        return ({
            header: group.header,
            fields: group.fields.map(field => {
                return ({
                    input: toInputType(field.input),
                    label: field.label,
                    formValue: field.formValue,
                    value: field.value ? toValueByFormData(field.value, props.activeFormData, watch) : undefined,
                    options: field.options ? getResourcesByName(field.options) : [],
                    helpText: field.helpText,
                    hidden: field.hidden ? toHiddenProp(field.hidden, watch, activeConfiguration) : undefined,
                    error: field.error ? toErrorProp(field.error, errors) : undefined,
                    required: field.required ? toRequiredProp(field.required, watch, activeConfiguration, props.validation) : false,
                    searchOption: field.searchOption ? field.searchOption : false,
                    disabled: field.disabled ? toDisabledProp(field.disabled, activeConfiguration) : undefined

                })
            })
        })
    })

    console.log(testList)


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

    return (
        <div>
            <FormGroup id="case-information" className={props.style.formControl} sx={{mt: 4}}>
                {testList.map((item, index) => {
                    return(
                        <Box key={index}>
                            <Typography>{item.header}</Typography>
                            <Divider sx={{mb: 3}}/>
                            {item.fields.map((field, index) => {
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
                        </Box>)
                })}
                {id === 'case-information' && isCollection && _case ? <Typography id="case-information-case-search-result" sx={{mb:2}}>{_case}</Typography> : ''}
            </FormGroup>
            {id==='applicant-form' &&
                <FormGroup sx={{ ml: 2, mb: 2, flexDirection: 'row'}} >
                    <FormControlLabel
                        control={
                            <Checkbox
                                disabled={props.disabled}
                                id="form-complete"
                                checked={props.protectedCheck}
                                onChange={event => props.setProtectedChecked(event.target.checked)}
                                inputProps={{ 'aria-label': 'completed-checkbox' }}/>}
                        label="Skjermet"
                    />
                    <HelpPopover popoverContent={"Skjerming av avsender, krever tilgangskode og skjermingshjemmel"}/>
                </FormGroup>}
        </div>
    );
}

export default FieldFactory;
