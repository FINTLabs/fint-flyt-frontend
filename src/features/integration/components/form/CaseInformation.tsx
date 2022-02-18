import {Button, FormGroup, Typography} from '@mui/material';
import React from 'react';
import InputField from "./InputField";
import {INPUT_TYPE} from "../../types/InputType.enum";
import {IInputField} from "../../types/InputField";
import {creationStrategies, forms} from "../../util/DefaultValues";
import {CreationStrategy} from "../../types/CreationStrategy";
import {FieldErrors} from "react-hook-form";
import IntegrationRepository from "../../repository/IntegrationRepository";

const CaseInformation: React.FunctionComponent<any> = (props) => {

    const [_case, setCase] = React.useState('');
    const [status, setStatus] = React.useState('');
    const [helperText, setHelperText] = React.useState('');
    let caseInputPattern = /^((19|20)\d{2})\/([0-9]{1,6})/g;

    function handleClick() {
        setCase('Søker...')
        let caseInput = props.watch("caseData.caseNumber");
        console.log(caseInput)
        if(caseInputPattern.test(props.watch("caseData.caseNumber"))) {
            let caseId = caseInput.split('/')
            IntegrationRepository.getSak(caseId[0], caseId[1])
                .then((response) => {
                    setCase(response.data)
                    setStatus(', status ' + response.statusText)
                    console.log(response)
                })
                .catch(e => {
                        console.error('Error: ', e)
                        setCase('Ingen treff');
                        setStatus('404')
                    }
                )
        } else setHelperText('Saksnummer må være på formatet 2021/03')
    }

    let isCollection = props.watch("caseData.caseCreationStrategy") === CreationStrategy.COLLECTION
    let errors: FieldErrors = props.errors
    const caseInformationFields: IInputField[] = [
        {input: INPUT_TYPE.TEXT_FIELD, label: "Navn", formValue: "name", required: props.validation, error:errors.name},
        {input: INPUT_TYPE.TEXT_FIELD, label: "Beskrivelse", formValue: "description", required: props.validation, error:errors.description},
        {input: INPUT_TYPE.DROPDOWN, label: "Skjema", value: props.watch("selectedForm"), formValue: "selectedForm", dropDownItems: forms},
        {input: INPUT_TYPE.RADIO, label: "Velg hvordan skjema skal sendes til arkivet", value: props.watch("caseData.caseCreationStrategy"),
            formValue: "caseData.caseCreationStrategy", radioOptions: creationStrategies, defaultValue: props.watch("caseData.caseCreationStrategy")},
        {input: INPUT_TYPE.TEXT_FIELD, label: "Saksnummer", formValue: "caseData.caseNumber", hidden:!isCollection, required:isCollection && props.validation, error:errors.caseData?.caseNumber, rules: 'regEx'}
    ]
    return (
        <FormGroup className={props.style.formControl}>
            {caseInformationFields.map((field, index) => {
                    return (
                        field.hidden ?
                            <div key={index}/> :
                            <InputField key={index}
                                        required={field.required}
                                        error={field.error}
                                        input={field.input}
                                        label={field.label}
                                        value={field.value}
                                        formValue={field.formValue}
                                        dropdownItems={field.dropDownItems}
                                        radioOptions={field.radioOptions}
                                        defaultValue={field.defaultValue}
                                        {...props}
                            />
                    )
                }
            )}
            {isCollection && <Button onClick={handleClick} variant="outlined" sx={{width: 20}}>Søk</Button>}
            {_case ? <Typography>{_case}</Typography> : ''}
        </FormGroup>
    );
}

export default CaseInformation;