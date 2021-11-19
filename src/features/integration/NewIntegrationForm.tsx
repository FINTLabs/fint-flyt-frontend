import * as React from "react";
import { useForm } from "react-hook-form";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {
    Accordion, AccordionDetails, AccordionSummary,
    Box,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    SelectChangeEvent,
    TextField,
    Theme,
    Typography
} from "@mui/material";
import {createStyles, makeStyles} from "@mui/styles";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RecordConfiguration from "./components/RecordConfiguration";
import DocumentConfiguration from "./components/DocumentConfiguration";
import ApplicantConfiguration from "./components/ApplicantConfiguration";
import CaseConfiguration from "./components/CaseConfiguration";
import {FormValues} from "./resources/FormValues";

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
        submitButton: {
            backgroundColor: theme.palette.primary.dark,
            border: 'none',
            color: 'white',
            padding: theme.spacing(2),
            cursor: 'pointer'
        }
    }));

const forms = [
    { label: "TT-skjema", value: "TT" },
    { label: "Skjema1", value: "1_form" },
    { label: "Skjema2", value: "2_form" }
];
const creationStrategies = [
    {label: 'Som ny sak',value: 'NEW',  description: 'Innsendt skjema oppretter en ny sak i Elements'},
    {label: 'På eksisterende sak', value: 'EXISTING',  description: 'Innsendt skjema gjenfinner eksisterende sak i ' +
            'Elements basert på informasjon i skjemaet. Dersom det ikke fins en eksisterende sak opprettes en ny sak' },
    {label: 'På eksisterende sak', value: 'COLLECTION', description: 'Innsendt skjema skal leveres til en forhåndsdefinert samlesak'}
];


const NewIntegrationForm: React.FunctionComponent<RouteComponentProps<any>> = () => {
    const classes = useStyles();

    const {handleSubmit, watch, setValue, formState: {}} = useForm<FormValues>({
        defaultValues: { selectedForm: '', creationStrategy: 'NEW', title: '', administrativeUnit:'', archiveUnit:'', caseType: ''}
    });

    const onSubmit = handleSubmit((data) => console.log(data));

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
                            <FormGroup>
                                <FormControl className={classes.formControl}>
                                    <TextField onChange={(e) => setValue("name", e.target.value as string)}
                                               size="small" variant="outlined" label="Navn" sx={{ mb: 3 }}/>
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <TextField onChange={(e) => setValue("description", e.target.value as string)}
                                               size="small" variant="outlined" label="Beskrivelse" sx={{ mb: 3 }}/>
                                </FormControl>
                            </FormGroup>
                            <FormGroup>
                                <FormControl className={classes.formControl} size="small" sx={{ mt: 1, mb: 1 }}>
                                    <InputLabel>Skjema</InputLabel>
                                    <Select
                                        value={watch("selectedForm")}
                                        onChange={(e: SelectChangeEvent) => setValue("selectedForm", e.target.value as string)}
                                    >
                                        {forms.map((item, index) => (
                                            <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl className={classes.formControl} component="fieldset">
                                    <FormLabel>Velg hvordan skjema skal sendes til arkivet</FormLabel>
                                    <RadioGroup onChange={(e) => setValue("creationStrategy", e.target.value as string)} defaultValue={creationStrategies[0].value} sx={{maxWidth: 400}}>
                                        {creationStrategies.map((configuration, index) => (
                                            <div key={index}>
                                                <FormControlLabel value={configuration.value} control={<Radio />} label={configuration.label} />
                                                <Typography sx={{ fontSize: 14 }}>{configuration.description}</Typography>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                            </FormGroup>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className={classes.accordion}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant={"h6"}>Sakspost</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <CaseConfiguration style={classes} setValue={setValue} creationStrategy={watch("creationStrategy")} caseType={watch("caseType")} administrativeUnit={watch("administrativeUnit")}
                                               archiveUnit={watch("archiveUnit")}/>
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
                            <Typography>Type sak: {watch("creationStrategy")}</Typography>
                            <Typography variant={"h6"} sx={{mt: 3, mb: 3}}>Sak</Typography>
                            <Typography>caseId: {watch("caseId")}</Typography>
                            <Typography>Tittel: {watch("title")}</Typography>
                            <Typography>Offentlig tittel: {watch("publicTitle")}</Typography>
                            <Typography>Administrativ enhet: {watch("administrativeUnit")}</Typography>
                            <Typography>Arkivdel: {watch("archiveUnit")}</Typography>
                            <Typography>Journalenhet: {watch("recordUnit")}</Typography>
                            <Typography>Tigangskode: {watch("accessCode")}</Typography>
                            <Typography>Hjemmel: {watch("paragraph")}</Typography>
                            <Typography>Saksbehandler: {watch("caseWorker")}</Typography>
                            <Typography>Klassering(Ordningsprinsipp): {watch("classification")}</Typography>
                            <Typography>Primærklasse: {watch("primaryClass")}</Typography>
                            <Typography>Sekundærklasse: {watch("secondaryClass")}</Typography>
                            <Typography>Opprettet av: {watch("createdBy")}</Typography>
                            <Typography variant={"h6"} sx={{mt: 3, mb: 3}}>Dokument</Typography>
                            <Typography>Tittel: {watch("documentTitle")}</Typography>
                            <Typography>Tilgangskode: {watch("documentAccessCode")}</Typography>
                            <Typography>Hjemmel: {watch("documentParagraph")}</Typography>
                            <Typography>Variant: {watch("documentVariant")}</Typography>
                            <Typography>Format: {watch("documentFormat")}</Typography>
                            <Typography variant={"h6"} sx={{mt: 3, mb: 3}}>Avsender</Typography>
                            <Typography>Navn: {watch("applicantName")}</Typography>
                            <Typography>Adresse: {watch("applicantAddress")}</Typography>
                            <Typography>Postnr: {watch("applicantPostalCode")}</Typography>
                            <Typography>Poststed: {watch("applicantCity")}</Typography>
                            <Typography>Tlf: {watch("applicantPhoneNumber")}</Typography>
                            <Typography>Epost: {watch("applicantEmail")}</Typography>
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

export default withRouter(NewIntegrationForm);