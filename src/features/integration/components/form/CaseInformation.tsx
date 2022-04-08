import {Box, Button, FormGroup, Typography} from '@mui/material';
import React from 'react';
import InputField from "./InputField";
import {INPUT_TYPE} from "../../types/InputType.enum";
import {IInputField} from "../../types/InputField";
import {creationStrategies, sourceApplicationIntegrations, sourceApplications} from "../../defaults/DefaultValues";
import {CreationStrategy} from "../../types/CreationStrategy";
import {FieldErrors} from "react-hook-form";
import IntegrationRepository from "../../repository/IntegrationRepository";
import { useTranslation } from 'react-i18next';

const CaseInformation: React.FunctionComponent<any> = (props) => {
    const { t, i18n } = useTranslation('translations', { keyPrefix: 'pages.integrationForm.accordions.caseInformation'});
    const [_case, setCase] = React.useState('');
    let caseInput = props.watch("caseData.caseNumber");
    let caseInputPattern = /^((19|20)*\d{2})\/([0-9]{1,6})/g;

    const handleCaseSearch = () => {
        if(caseInputPattern.test(caseInput)) {
            setCase(t('caseSearch.searching'))
            let caseId = caseInput.split('/')
            IntegrationRepository.getSak(caseId[0], caseId[1])
                .then((response) => {
                    setCase(response.data)
                })
                .catch(e => {
                        console.error('Error: ', e)
                        setCase(t('caseSearch.noMatch'));
                    }
                )
        } else setCase(t('caseSearch.info'))
    }

    let isCollection = props.watch("caseData.caseCreationStrategy") === CreationStrategy.COLLECTION
    let errors: FieldErrors = props.errors
    const caseInformationFields: IInputField[] = [
        {input: INPUT_TYPE.TEXT_FIELD, label: "Navn", formValue: "name", required: props.validation, error:errors.name},
        {input: INPUT_TYPE.TEXT_FIELD, label: "Beskrivelse", formValue: "description", required: props.validation, error:errors.description},
        {input: INPUT_TYPE.DROPDOWN, label: "Skjemaleverandør", value:props.watch("sourceApplication"), formValue: "sourceApplication", dropDownItems: sourceApplications},
        {input: INPUT_TYPE.DROPDOWN, label: "Skjema", value: props.watch("sourceApplicationIntegrationId"), formValue: "sourceApplicationIntegrationId", dropDownItems: sourceApplicationIntegrations},
        {input: INPUT_TYPE.RADIO, label: "Velg hvordan skjema skal sendes til arkivet", value: props.watch("caseData.caseCreationStrategy"),
            formValue: "caseData.caseCreationStrategy", radioOptions: creationStrategies},
        {input: INPUT_TYPE.TEXT_FIELD, label: "Saksnummer", formValue: "caseData.caseNumber", hidden:!isCollection, required:isCollection && props.validation, error:errors.caseData?.caseNumber, searchOption: true}
    ]
    return (
        <div>
            <FormGroup className={props.style.formControl}>
                {caseInformationFields.map((field, index) => {
                        return (
                            field.hidden ?
                                <div key={index}/> :
                                <Box sx={{display: 'flex'}} key={index}>
                                    <Box width={'100%'}>
                                        <InputField key={index}
                                                    required={field.required}
                                                    error={field.error}
                                                    input={field.input}
                                                    label={field.label}
                                                    value={field.value}
                                                    formValue={field.formValue}
                                                    dropdownItems={field.dropDownItems}
                                                    radioOptions={field.radioOptions}
                                                    {...props}
                                        />
                                    </Box>
                                    {isCollection && field.searchOption &&
                                        <Box>
                                            <Button onClick={handleCaseSearch} variant="outlined" sx={{ml: 2}}>{t('button.search')}</Button>
                                        </Box>}
                                </Box>
                        );
                    }
                )}
                {isCollection && _case ? <Typography sx={{mb:2}}>{_case}</Typography> : ''}
            </FormGroup>
            <Button sx={{mb: 2}} onClick={props.onSave} variant="contained">{t('button.save')}</Button>
        </div>

    );
}

export default CaseInformation;