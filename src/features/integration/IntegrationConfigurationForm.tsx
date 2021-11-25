import * as React from "react";
import { useForm } from "react-hook-form";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {Accordion, AccordionDetails, AccordionSummary, Box, Theme, Typography} from "@mui/material";
import {createStyles, makeStyles} from "@mui/styles";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RecordForm from "./components/RecordForm";
import DocumentForm from "./components/DocumentForm";
import ApplicantForm from "./components/ApplicantForm";
import CaseForm from "./components/CaseForm";
import IFormData from "./types/Form/FormData";
import CaseInformation from "./components/CaseInformation";
import IntegrationService from "./service/IntegrationService";
import {defaultValues} from "./util/DefaultValues";
import {mapToDto} from "./util/MapToDto";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        form: {
            width: 1200
        },
        formControl: {
            width: 750
        },
        accordion: {
            marginBottom: theme.spacing(2)
        },
        button: {
            marginRight: theme.spacing(1)
        },
        submitButton: {
            backgroundColor: theme.palette.primary.dark,
            border: 'none',
            color: 'white',
            padding: theme.spacing(2),
            cursor: 'pointer'
        }
    }));

const IntegrationConfigurationForm: React.FunctionComponent<RouteComponentProps<any>> = () => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    const {handleSubmit, watch, setValue, formState: {}} = useForm<IFormData>({
        defaultValues: defaultValues
    });

    const createNewConfiguration = (data: any) => {
        IntegrationService.create(data)
            .then(response => {
                console.log('created new configuraton', data);
            })
            .catch((e: Error) => {
                console.log('errror creating new', e);
            });
    }

    const updateConfiguration = (data: any, id: any) =>{
        IntegrationService.update(id, data)
            .then(response => {
                console.log('updated configuration', id);
            })
            .catch((e: Error) => {
                console.log('errror updating',e);
            })
    }

    const onSubmit = handleSubmit((data: IFormData) => {
        const dto = mapToDto(data);

        if(data.id) {
            updateConfiguration(dto, data.id);
        } else {
            createNewConfiguration(dto);
        }
    });

    return (
        <Box display="flex" position="relative" width={1} height={1}>
            <Box>
                <Typography variant={"h5"} sx={{mb: 2}}>Integrasjonskonfigurasjon</Typography>
                <form className={classes.form} onSubmit={onSubmit}>
                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} className={classes.accordion} defaultExpanded={true}>
                        <AccordionSummary  expandIcon={<ExpandMoreIcon />}>
                            <Typography variant={"h6"}>Integrasjonslogikk</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <CaseInformation setValue={setValue} style={classes} caseCreationStrategy={watch("caseData.caseCreationStrategy")} selectedForm={watch("selectedForm")} />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} className={classes.accordion}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant={"h6"}>Sakspost</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <CaseForm style={classes} watch={watch} setValue={setValue}/>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} className={classes.accordion}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant={"h6"}>Journalpost</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <RecordForm style={classes} watch={watch}  setValue={setValue} />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')} className={classes.accordion}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant={"h6"}>Dokument- og objektbeskrivelse</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <DocumentForm style={classes} watch={watch} setValue={setValue}/>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')} className={classes.accordion}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant={"h6"}>Avsender</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ApplicantForm style={classes} watch={watch} setValue={setValue}/>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')} className={classes.accordion}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant={"h6"}>Kontroller skjema</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        </AccordionDetails>
                    </Accordion>
                    <div>
                        <input type="submit" className={classes.submitButton}/>
                    </div>
                </form>
            </Box>
        </Box>
    );
}

export default withRouter(IntegrationConfigurationForm);
