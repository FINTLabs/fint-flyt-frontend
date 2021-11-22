import * as React from "react";
import { useForm } from "react-hook-form";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {
    Accordion, AccordionDetails, AccordionSummary,
    Box,
    Theme,
    Typography
} from "@mui/material";
import {createStyles, makeStyles} from "@mui/styles";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RecordConfiguration from "./components/RecordConfiguration";
import DocumentConfiguration from "./components/DocumentConfiguration";
import ApplicantConfiguration from "./components/ApplicantConfiguration";
import CaseConfiguration from "./components/CaseConfiguration";
import IFormData from "./types/FormData";
import CaseInformation from "./components/CaseInformation";
import IntegrationService from "./service/IntegrationService";

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

const NewIntegrationPage: React.FunctionComponent<RouteComponentProps<any>> = () => {
    const classes = useStyles();
    const {handleSubmit, watch, setValue, formState: {}} = useForm<IFormData>({
        defaultValues: {
            selectedForm: '',
            caseData : {
                caseCreationStrategy: 'NEW',
                title: '',
                administrativeUnit:'',
                archiveUnit:'',
                caseType: ''
            }
        }
    });

    const onSubmit = handleSubmit((data: IFormData) => {
        const req = {
            name: data.name,
            description: data.description,
            caseConfiguration: data.caseData,
            recordConfiguration: data.recordData,
            documentConfiguration: data.documentData,
            applicantConfiguration: data.applicantData
        }
        IntegrationService.create(req)
            .then((response: any) => {
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
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
                            <CaseConfiguration style={classes} setValue={setValue} caseCreationStrategy={watch("caseData.caseCreationStrategy")} caseType={watch("caseData.caseType")} administrativeUnit={watch("caseData.administrativeUnit")}
                                               archiveUnit={watch("caseData.archiveUnit")}/>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className={classes.accordion}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant={"h6"}>Journalpost</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <RecordConfiguration style={classes} setValue={setValue} />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className={classes.accordion}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant={"h6"}>Dokument- og objektbeskrivelse</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <DocumentConfiguration style={classes} setValue={setValue}/>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className={classes.accordion}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant={"h6"}>Avsender</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ApplicantConfiguration style={classes} setValue={setValue}/>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className={classes.accordion}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant={"h6"}>Kontroller skjema</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant={"h6"}>Integrasjonslogikk</Typography>
                            <Typography>navn: {watch("name")}</Typography>
                            <Typography>beskrivelse: {watch("description")}</Typography>
                            <Typography>skjema: {watch("selectedForm")}</Typography>
                            <Typography>sakstype: {watch("caseId")}</Typography>
                            <Typography>Type sak: {watch("caseData.caseCreationStrategy")}</Typography>
                            <Typography variant={"h6"} sx={{mt: 3, mb: 3}}>Sak</Typography>
                            <Typography>caseId: {watch("caseId")}</Typography>
                            <Typography>Tittel: {watch("caseData.title")}</Typography>
                            <Typography>Offentlig tittel: {watch("caseData.publicTitle")}</Typography>
                            <Typography>Administrativ enhet: {watch("caseData.administrativeUnit")}</Typography>
                            <Typography>Arkivdel: {watch("caseData.archiveUnit")}</Typography>
                            <Typography>Journalenhet: {watch("caseData.recordUnit")}</Typography>
                            <Typography>Tigangskode: {watch("caseData.accessCode")}</Typography>
                            <Typography>Hjemmel: {watch("caseData.paragraph")}</Typography>
                            <Typography>Saksbehandler: {watch("caseData.caseWorker")}</Typography>
                            <Typography>Klassering(Ordningsprinsipp): {watch("caseData.classification")}</Typography>
                            <Typography>Primærklasse: {watch("caseData.primaryClass")}</Typography>
                            <Typography>Sekundærklasse: {watch("caseData.secondaryClass")}</Typography>
                            <Typography>Opprettet av: {watch("caseData.createdBy")}</Typography>
                            <Typography variant={"h6"} sx={{mt: 3, mb: 3}}>Dokument</Typography>
                            <Typography>Tittel: {watch("documentData.title")}</Typography>
                            <Typography>Tilgangskode: {watch("documentData.accessCode")}</Typography>
                            <Typography>Hjemmel: {watch("documentData.paragraph")}</Typography>
                            <Typography>Variant: {watch("documentData.variant")}</Typography>
                            <Typography>Format: {watch("documentData.format")}</Typography>
                            <Typography variant={"h6"} sx={{mt: 3, mb: 3}}>Avsender</Typography>
                            <Typography>Navn: {watch("applicantData.name")}</Typography>
                            <Typography>Adresse: {watch("applicantData.address")}</Typography>
                            <Typography>Postnr: {watch("applicantData.postalCode")}</Typography>
                            <Typography>Poststed: {watch("applicantData.city")}</Typography>
                            <Typography>Tlf: {watch("applicantData.phoneNumber")}</Typography>
                            <Typography>Epost: {watch("applicantData.email")}</Typography>
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

export default withRouter(NewIntegrationPage);