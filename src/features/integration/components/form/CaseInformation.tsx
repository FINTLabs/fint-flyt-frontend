import {Box, Button, FormGroup, IconButton, Typography} from '@mui/material';
import React, {useContext} from 'react';
import InputField from "./InputField";
import {INPUT_TYPE} from "../../types/InputType.enum";
import {IInputField} from "../../types/InputField";
import {creationStrategies, destinations, forms, sourceApplications} from "../../defaults/DefaultValues";
import {CreationStrategy} from "../../types/CreationStrategy";
import {FieldErrors} from "react-hook-form";
import IntegrationRepository from "../../repository/IntegrationRepository";
import {IntegrationContext} from "../../../../integrationContext";
import LockIcon from '@mui/icons-material/Lock';

const CaseInformation: React.FunctionComponent<any> = (props) => {
    const { destination, sourceApplication } = useContext(IntegrationContext)
    const [_case, setCase] = React.useState('');
    let caseInput = props.watch("caseData.caseNumber");
    let caseInputPattern = /^((19|20)*\d{2})\/([0-9]{1,20})$/g;

    const handleCaseSearch = () => {
        if(caseInputPattern.test(caseInput)) {
            setCase('Søker...')
            let caseId = caseInput.split('/')
            IntegrationRepository.getSak(caseId[0], caseId[1])
                .then((response) => {
                    setCase(response.data)
                })
                .catch(e => {
                        console.error('Error: ', e)
                        setCase('Ingen treff');
                    }
                )
        } else setCase('Saksnummer må være på formatet "saksår/saksnummer", f.eks 2021/03')
    }

    let isCollection = props.watch("caseData.caseCreationStrategy") === CreationStrategy.COLLECTION
    let errors: FieldErrors = props.errors
    const caseInformationFields: IInputField[] = [
        {input: INPUT_TYPE.DROPDOWN, label: "Skjemaleverandør", value: sourceApplication, formValue: "sourceApplication", dropDownItems: sourceApplications, disabled: true, lockIcon: true},
        {input: INPUT_TYPE.DROPDOWN, label: "Destinasjon", value: destination, formValue: "destination", dropDownItems: destinations, disabled: true, lockIcon: true},
        {input: INPUT_TYPE.TEXT_FIELD, label: "Navn", formValue: "name", required: props.validation, error:errors.name},
        {input: INPUT_TYPE.TEXT_FIELD, label: "Beskrivelse", formValue: "description", required: props.validation, error:errors.description},
        {input: INPUT_TYPE.DROPDOWN, label: "Skjema", value: props.watch("sourceApplicationIntegrationId"), formValue: "sourceApplicationIntegrationId", dropDownItems: forms},
        {input: INPUT_TYPE.RADIO, label: "Velg hvordan skjema skal sendes til arkivet", value: props.watch("caseData.caseCreationStrategy"),
            formValue: "caseData.caseCreationStrategy", radioOptions: creationStrategies, defaultValue: props.watch("caseData.caseCreationStrategy")},
        {input: INPUT_TYPE.TEXT_FIELD, label: "Saksnummer", formValue: "caseData.caseNumber", hidden:!isCollection, required:isCollection && props.validation, error:errors.caseData?.caseNumber, searchOption: true}
    ]
    return (
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
                                                defaultValue={field.defaultValue}
                                                disabled={field.disabled}
                                                {...props}
                                    />
                                </Box>
                                {field.lockIcon && <div>
                                    <IconButton aria-label="locked" disabled={true}><LockIcon /></IconButton></div>}
                                {isCollection && field.searchOption &&
                                    <Box>
                                        <Button onClick={handleCaseSearch} variant="outlined" sx={{ml: 2}}>Søk</Button>
                                    </Box>}
                            </Box>
                    );
                }
            )}
            {isCollection && _case ? <Typography>{_case}</Typography> : ''}
        </FormGroup>
    );
}

export default CaseInformation;