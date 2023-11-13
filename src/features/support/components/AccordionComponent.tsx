import * as React from "react";
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export interface Props {
    classes:  React.CSSProperties
    data: AccordionData[]
}

export type AccordionData = {
    id: string
    summary: string
    summary2?: string
    details: string
    listItems?: string[]
    link?: string
}

const AccordionComponent: React.FunctionComponent<Props> = (props: Props) => {
    const SingleAccordion = (props: { id: string, content: AccordionData }) => {
        const [expanded, setExpanded] = React.useState<string | boolean>("panel_0"); //eslint-disable-line
        const handleChangeExpanded = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };
        return (
            <Accordion
                disableGutters={true}
                sx={{mb: 2, border: 1, borderRadius: 1, boxShadow: 'none', maxWidth: '85%'}}
                key={props.content.id}
                onChange={handleChangeExpanded(`panel_${props.content.id}`)}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls={props.id +'-content'}
                    id={props.id +'-header'}
                >
                    <Typography sx={{width: '33%', flexShrink: 0}}>
                        {props.content.summary}
                    </Typography>
                    {props.content.summary2 &&
                        <Typography sx={{color: 'text.secondary'}}>{props.content.summary2}</Typography>
                    }
                </AccordionSummary>
                <AccordionDetails id={props.id + '-details'}>
                    <Typography>
                        {props.content.details}
                    </Typography>
                    {props.content.listItems &&
                        <ul>
                            {props.content.listItems.map((item, index) => {
                                return <li style={{marginBottom: '8px'}} key={index}>
                                    <Typography>
                                        {item}
                                    </Typography></li>
                            })}
                        </ul>
                    }
                    {props.content.link &&
                    <Typography>
                        <a href={"mailto:" + props.content.link}  target="_top">{props.content.link}</a>
                    </Typography>}
                </AccordionDetails>
            </Accordion>
        );
    };
    return (
        <div id={'accordion-container'}>
            {props.data.map((accordionData, index) => {
                return <SingleAccordion id={'accordion-' + index} key={index} content={accordionData}/>;
            })}
        </div>
    );

}
export default AccordionComponent;