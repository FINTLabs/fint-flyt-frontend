import React from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FieldForm from "./form/FieldForm";

const AccordionForm: React.FunctionComponent<any> = (props) => {
    return props.hidden ? (<></>) : (
        <Accordion id={props.id} sx={{border: 'solid 1px', boxShadow: 'none', borderRadius: '4px' }} className={props.style.accordion} defaultExpanded={props.defaultExpanded}>
            <AccordionSummary className={props.style.accordionSummary} expandIcon={<ExpandMoreIcon />}>
                <Typography id={props.id + `-header`} variant={"h6"}>{props.header}</Typography>
            </AccordionSummary>
            <AccordionDetails id={props.id + `-details`}>
                <FieldForm {...props}/>
            </AccordionDetails>
        </Accordion>
    );
}

export default AccordionForm;