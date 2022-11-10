import React from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CaseForm from "./form/CaseForm";
import DocumentForm from "./form/DocumentForm";
import ApplicantForm from "./form/ApplicantForm";
import RecordForm from "./form/RecordForm";
import FieldForm from "./form/FieldForm";

const AccordionForm: React.FunctionComponent<any> = (props) => {
    return props.hidden ? (<></>) : (
        <Accordion id={props.id} sx={{border: 'solid 1px', boxShadow: 'none', borderRadius: '4px' }} className={props.style.accordion} defaultExpanded={props.defaultExpanded}>
            <AccordionSummary className={props.style.accordionSummary} expandIcon={<ExpandMoreIcon />}>
                <Typography id={props.id + `-header`} variant={"h6"}>{props.header}</Typography>
            </AccordionSummary>
            <AccordionDetails id={props.id + `-details`}>
                {props.id === 'case-information' && <FieldForm {...props}/>}
                {/*props.id === 'case-information' && <CaseInformation {...props}/>*/}
                {props.id === 'case-form' && <CaseForm {...props} />}
                {props.id === 'record-form' && <RecordForm {...props} />}
                {props.id === 'document-object-form' && <DocumentForm {...props} />}
                {props.id === 'applicant-form' && <ApplicantForm {...props} />}
         </AccordionDetails>
        </Accordion>
    );
}

export default AccordionForm;