import * as React from "react";
import { useForm } from "react-hook-form";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {Accordion, AccordionDetails, AccordionSummary, Box, Theme, Typography} from "@mui/material";
import {createStyles, makeStyles} from "@mui/styles";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RecordForm from "./components/form/RecordForm";
import DocumentForm from "./components/form/DocumentForm";
import ApplicantForm from "./components/form/ApplicantForm";
import CaseForm from "./components/form/CaseForm";
import IFormData from "./types/Form/FormData";
import CaseInformation from "./components/form/CaseInformation";
import IntegrationRepository from "./repository/IntegrationRepository";
import {defaultValues} from "./util/DefaultValues";
import {toIntegrationConfiguration} from "./util/ToIntegrationConfiguration";

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

    const {handleSubmit, watch, setValue, formState: {}} = useForm<IFormData>({
        defaultValues: defaultValues
    });

    const createNewConfiguration = (data: any) => {
        IntegrationRepository.create(data)
            .then(response => {
                console.log('created new configuraton', data);
            })
            .catch((e: Error) => {
                console.log('errror creating new', e);
            });
    }

    const updateConfiguration = (data: any, id: any) =>{
        IntegrationRepository.update(id, data)
            .then(response => {
                console.log('updated configuration', id);
            })
            .catch((e: Error) => {
                console.log('errror updating',e);
            })
    }

    const onSubmit = handleSubmit((data: IFormData) => {
        const integrationConfiguration = toIntegrationConfiguration(data);

        if(data.id) {
            updateConfiguration(integrationConfiguration, data.id);
        } else {
            createNewConfiguration(integrationConfiguration);
        }
    });

    return (
        <Box display="flex" position="relative" width={1} height={1}>
            <Box>
                <Typography variant={"h5"} sx={{mb: 2}}>Integrasjonskonfigurasjon</Typography>
                <form className={classes.form} onSubmit={onSubmit}>
                    <Accordion className={classes.accordion} defaultExpanded={true}>
                        <AccordionSummary  expandIcon={<ExpandMoreIcon />}>
                            <Typography variant={"h6"}>Integrasjonslogikk</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <CaseInformation setValue={setValue} style={classes} caseCreationStrategy={watch("caseData.caseCreationStrategy")} selectedForm={watch("selectedForm")} />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className={classes.accordion}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant={"h6"}>Sakspost</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <CaseForm style={classes} watch={watch} setValue={setValue}/>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className={classes.accordion}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant={"h6"}>Journalpost</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <RecordForm style={classes} watch={watch}  setValue={setValue} />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className={classes.accordion}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant={"h6"}>Dokument- og objektbeskrivelse</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <DocumentForm style={classes} watch={watch} setValue={setValue}/>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className={classes.accordion}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant={"h6"}>Avsender</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ApplicantForm style={classes} watch={watch} setValue={setValue}/>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className={classes.accordion}>
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
