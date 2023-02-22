import React from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CaseForm from "./form/CaseForm";
import DocumentForm from "./form/DocumentForm";
import CorrespondentForm from "./form/CorrespondentForm";
import RecordForm from "./form/RecordForm";
import {ACCORDION_FORM} from "../types/Accordion";
import { useTranslation } from 'react-i18next';
import AttachmentForm from "./form/AttachmentForm";
import FormPanel from "./form/FormPanel";

const AccordionForm: React.FunctionComponent<any> = (props) => {
    const { t } = useTranslation('translations', { keyPrefix: 'pages.configurationForm.accordions'});
    return props.hidden ? (<></>) : (
        <Accordion id={props.id} sx={{border: 'solid 1px', boxShadow: 'none', borderRadius: '4px', backgroundColor: '#EBF4F5'}} className={props.style.accordion} defaultExpanded={props.defaultExpanded}>
            <AccordionSummary className={props.style.accordionSummary} expandIcon={<ExpandMoreIcon />}>
                <Typography id={props.id + `-header`} variant={"h6"}>{t(props.summary)}</Typography>
            </AccordionSummary>
            <AccordionDetails id={props.id + `-details`}>
                {props.accordionForm === ACCORDION_FORM.CASE && <CaseForm {...props} />}
                {props.accordionForm === ACCORDION_FORM.CLASS && <FormPanel {...props} />}
                {props.accordionForm === ACCORDION_FORM.RECORD && <RecordForm {...props} />}
                {props.accordionForm === ACCORDION_FORM.DOCUMENT && <DocumentForm {...props} />}
                {props.accordionForm === ACCORDION_FORM.ATTACHMENT && <AttachmentForm {...props} />}
                {props.accordionForm === ACCORDION_FORM.CORRESPONDENT && <CorrespondentForm {...props} />}
         </AccordionDetails>
        </Accordion>
    );
}

export default AccordionForm;