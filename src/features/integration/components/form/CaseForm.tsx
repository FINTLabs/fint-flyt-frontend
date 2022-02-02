import {FormGroup} from '@mui/material';
import React, {useContext, useEffect} from 'react';
import {dropdownPlaceholder} from "../../util/DefaultValues";
import {IInputField} from "../../types/InputField";
import {INPUT_TYPE} from "../../types/InputType.enum";
import InputField from "./InputField";
import {FieldErrors} from "react-hook-form";
import {ResourcesContext} from "../../../../resourcesContext";

const CaseForm: React.FunctionComponent<any> = (props) => {
    const {administrativeUnits, accessCodes, paragraphs, statuses, archiveSections, archiveResources,
        classificationSystems, primaryClassification, secondaryClassification, primaryClass, secondaryClass,
        getPrimaryClass, getSecondaryClass, setPrimaryClassification, setSecondaryClassification } = useContext(ResourcesContext);

    useEffect(()=> {
        getPrimaryClass();
    }, [primaryClassification, setPrimaryClassification])

    useEffect(()=> {
        getSecondaryClass();
    }, [secondaryClassification, setSecondaryClassification])


    let errors: FieldErrors = props.errors;
    let required: boolean = props.validation;
    const caseFormFields: IInputField[] = [
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "Tittel", formValue: "caseData.title", required: required, error:errors.caseData?.title, value: props.activeFormData?.caseData?.title},
        {input: INPUT_TYPE.DROPZONE_TEXT_FIELD, label: "Offentlig tittel", formValue: "caseData.publicTitle", required: required, error:errors.caseData?.publicTitle, value: props.activeFormData?.caseData?.publicTitle},
        {input: INPUT_TYPE.DROPDOWN, label: "Sakstype", value: props.watch("caseData.caseType"), formValue: "caseData.caseType", dropDownItems: dropdownPlaceholder, required: required, error:errors.caseData?.caseType},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "Administrativ enhet", value: props.watch("caseData.administrativeUnit"), formValue: "caseData.administrativeUnit", dropDownItems: administrativeUnits, required: required, error:errors.caseData?.administrativeUnit},
        {input: INPUT_TYPE.DROPDOWN, label: "Arkivdel", value: props.watch("caseData.archiveUnit"), formValue: "caseData.archiveUnit", dropDownItems: archiveSections, required: required, error:errors.caseData?.archiveUnit},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "Journalenhet", value: props.watch("caseData.recordUnit"), formValue: "caseData.recordUnit", dropDownItems: administrativeUnits, required: required, error:errors.caseData?.recordUnit},
        {input: INPUT_TYPE.DROPDOWN, label: "Status", value: props.watch("caseData.status"), formValue: "caseData.status", dropDownItems: statuses, required: required, error:errors.caseData?.status},
        {input: INPUT_TYPE.DROPDOWN, label: "Tilgangskode", value: props.watch("caseData.accessCode"), formValue: "caseData.accessCode", dropDownItems: accessCodes, required: required, error:errors.caseData?.accessCode},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "Hjemmel", value: props.watch("caseData.paragraph"), formValue: "caseData.paragraph", dropDownItems: paragraphs, required: required, error:errors.caseData?.paragraph},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "Saksansvarlig", value: props.watch("caseData.caseWorker"), formValue: "caseData.caseWorker", dropDownItems: archiveResources, required: required, error:errors.caseData?.caseWorker},
        {input: INPUT_TYPE.DROPDOWN, label: "Primær ordningsprinsipp", value: props.watch("caseData.primaryClassification"), formValue: "caseData.primaryClassification", dropDownItems: classificationSystems, required: required, error:errors.caseData?.primaryClassification, setter: setPrimaryClassification},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "Primærklasse", value: props.watch("caseData.primaryClass"), formValue: "caseData.primaryClass", dropDownItems: primaryClass, required: required, error:errors.caseData?.primaryClass},
        {input: INPUT_TYPE.DROPDOWN, label: "Sekundær ordningsprinsipp", value: props.watch("caseData.secondaryClassification"), formValue: "caseData.secondaryClassification", dropDownItems: classificationSystems, required: required, error:errors.caseData?.secondaryClassification, setter: setSecondaryClassification},
        {input: INPUT_TYPE.AUTOCOMPLETE, label: "Sekundærklasse", value: props.watch("caseData.secondaryClass"), formValue: "caseData.secondaryClass", dropDownItems: secondaryClass, required: required, error:errors.caseData?.secondaryClass},
    ]

    return (
        <FormGroup className={props.style.formControl}>
            {caseFormFields.map((field, index) => {
                return (
                    <InputField key={index}
                                required={field.required}
                                error={field.error}
                                input={field.input}
                                label={field.label}
                                value={field.value}
                                formValue={field.formValue}
                                dropdownItems={field.dropDownItems}
                                setter={field.setter}
                                {...props}
                    />
                )}
            )}
        </FormGroup>
    );
}

export default CaseForm;