import {Box, Button, FormGroup, IconButton, Typography} from '@mui/material';
import React, {useContext, useEffect} from 'react';
import {IInputField} from "../../types/InputField";
import {INPUT_TYPE} from "../../types/InputType.enum";
import InputField from "./InputField";
import {FieldErrors} from "react-hook-form";
import {ResourcesContext} from "../../../../context/resourcesContext";
import HelpPopover from "../popover/HelpPopover";
import { useTranslation } from 'react-i18next';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import {CreationStrategy} from "../../types/CreationStrategy";
import {creationStrategies} from "../../defaults/DefaultValues";
import {IntegrationContext} from "../../../../context/integrationContext";
import ResourceRepository from "../../../../shared/repositories/ResourceRepository";

const CaseForm: React.FunctionComponent<any> = (props) => {
    const { t } = useTranslation('translations', { keyPrefix: 'pages.configurationForm.accordions.caseForm'});
    const disabled: boolean = props.disabled

    const {administrativeUnits, accessCodes, caseTypes, paragraphs, statuses, archiveSections, archiveResources} = useContext(ResourcesContext);


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

    function onExpandClick(e: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>) {
        console.log(e)
        props.toggle();
    }

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
                                        <Button disabled={props.disabled} id="case-number-search-btn" onClick={handleCaseSearch} variant="contained" sx={{mb: 2}}>{t('button.search')}</Button>
                                        <Button disabled={props.disabled} id="case-number-clear-btn" onClick={handleCaseClear} variant="contained" sx={{ml: 2, mb: 2}}>{'Tilbakestill'}</Button>
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
                    <div style={{display: 'flex', padding: '2px', border: '1px solid gray', borderRadius: 4,
                        color: props.isToggled ? 'white' : 'black', backgroundColor: props.isToggled ? '#4b727a' : 'white', height: 30, width: 'calc(100% - 46px)'}}>
                        <Typography sx={{paddingLeft: 1, paddingTop: 0.5, flex: 1}}>Klasse</Typography>
                        <IconButton sx={{color: props.isToggled ? 'white' : 'darkgray'}} aria-label="Example" onClick={(e => {onExpandClick(e)})}>
                            {props.isToggled ? <ArrowBackIosIcon/> : <ArrowForwardIosIcon/>}
                        </IconButton>
                    </div>
                    <div style={{display: 'flex', padding: '2px', marginTop: 20, marginBottom: 8, border: '1px solid gray', borderRadius: 4, backgroundColor: 'white', height: 30,
                        width: 'calc(100% - 46px)'}}>
                        <Typography sx={{paddingLeft: 1, paddingTop: 0.5, flex: 1}}>Saksparter</Typography>
                        <IconButton aria-label="Example" onClick={(e => {onExpandClick(e)})}>
                           <ArrowForwardIosIcon/>
                        </IconButton>
                    </div>
                </FormGroup>
            </div>}

        </>
    );
}

export default CaseForm;