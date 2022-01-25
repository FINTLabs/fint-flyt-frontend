import React from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CaseForm from "./form/CaseForm";
import DocumentForm from "./form/DocumentForm";
import CaseInformation from "./form/CaseInformation";
import ApplicantForm from "./form/ApplicantForm";
import RecordForm from "./form/RecordForm";
import {ACCORDION_FORM} from "../types/Accordion";

const AccordionForm: React.FunctionComponent<any> = (props) => {
    return props.hidden ? (<></>) : (
        <Accordion className={props.style.accordion} defaultExpanded={props.defaultExpanded}>
            <AccordionSummary className={props.style.accordionSummary} expandIcon={<ExpandMoreIcon />}>
                <Typography variant={"h6"}>{props.summary}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {props.accordionForm === ACCORDION_FORM.CASE_INFORMATION && <CaseInformation {...props}/>}
                {props.accordionForm === ACCORDION_FORM.CASE_FORM && <CaseForm {...props} />}
                {props.accordionForm === ACCORDION_FORM.RECORD_FORM && <RecordForm {...props} />}
                {props.accordionForm === ACCORDION_FORM.DOCUMENT_FORM && <DocumentForm {...props} />}
                {props.accordionForm === ACCORDION_FORM.APPLICANT_FORM && <ApplicantForm {...props} />}
         </AccordionDetails>
        </Accordion>
    );
}

export default AccordionForm;