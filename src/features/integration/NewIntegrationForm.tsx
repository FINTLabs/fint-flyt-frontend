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

type FormValues = {
    casetypeToArchive: string;
    selectedForm: string;
    title: string;
    officialTitle: string;
    casetype: string;
    caseId: string;
    administrativeUnit: string;
    archiveSection: string;
    journalUnit: string;
    accessCode: string;
    legalbasis: string;
    caseWorker: string;
    principle: string;
    classN: string;
};

const forms = [
    { label: "TT-skjema", value: "TT" },
    { label: "Søknadsskjema", value: "application_form" },
    { label: "Registreringsskjema", value: "registration_form" }
];
const casetypesToArchive = [
    {label: 'Som ny sak',value: 'NEW',  description: 'Innsendt skjema oppretter en ny sak i Elements'},
    {label: 'På eksisterende sak', value: 'EXISTING',  description: 'Innsendt skjema gjenfinner eksisterende sak i ' +
            'Elements basert på informasjon i skjemaet. Dersom det ikke fins en eksisterende sak opprettes en ny sak' },
    {label: 'På eksisterende sak', value: 'COLLECTION', description: 'Innsendt skjema skal leveres til en forhåndsdefinert samlesak'}
];
const casetypes = [
    {label: 'Sakstype Foo', value: 'SAK1'},
    {label: 'Sakstype Bar', value: 'SAK2'}
]
const administrativeUnits = [
    {label: 'Enhet Foo', value: '1HET'},
    {label: 'Enhet Bar', value: '2HET'}
]
const archiveSections = [{value: 'arkivdel1', label: 'arkivdel1'},{value: 'arkivdel2', label: 'arkivdel2'}];


const NewIntegrationForm: React.FunctionComponent<RouteComponentProps<any>> = () => {
    const classes = useStyles();

    const {handleSubmit, watch, setValue, formState: { errors }} = useForm<FormValues>({
        defaultValues: { selectedForm: '', casetypeToArchive: 'NEW', title: '', officialTitle: '', casetype:'',
            administrativeUnit:'', archiveSection:'', journalUnit:'', accessCode:'', legalbasis:'', caseWorker: '', principle:'', classN:'', caseId:'' }
    });

    const selectedForm = watch("selectedForm");
    const casetype = watch("casetype");
    const casetypeToArchive = watch("casetypeToArchive");
    const caseId = watch("caseId");
    const title = watch("title");
    const officialTitle = watch("officialTitle");
    const administrativeUnit = watch("administrativeUnit");
    const archiveSection = watch("archiveSection");
    const journalUnit = watch("journalUnit");
    const accessCode = watch("accessCode");
    const legalbasis = watch("legalbasis");
    const caseWorker = watch("caseWorker");
    const principle = watch("principle");
    const classN = watch("classN");

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
                            <FormControl className={classes.formControl} size="small" sx={{ mt: 1, mb: 1 }}>
                                <InputLabel>Skjema</InputLabel>
                                <Select
                                    value={selectedForm}
                                    onChange={(e: SelectChangeEvent) => setValue("selectedForm", e.target.value as string)}
                                >
                                    {forms.map((item, index) => (
                                        <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl className={classes.formControl} component="fieldset">
                                <FormLabel>Velg hvordan skjema skal sendes til arkivet</FormLabel>
                                <RadioGroup onChange={(e) => setValue("casetypeToArchive", e.target.value as string)} defaultValue={casetypesToArchive[0].value} sx={{maxWidth: 400}}>
                                    {casetypesToArchive.map((configuration, index) => (
                                        <div key={index}>
                                            <FormControlLabel value={configuration.value} control={<Radio />} label={configuration.label} />
                                            <Typography sx={{ fontSize: 14 }}>{configuration.description}</Typography>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className={classes.accordion}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant={"h6"}>Konfigurer sak</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <FormGroup className={classes.formControl}>
                                <FormControl>
                                    <TextField onChange={(e) => setValue("caseId", e.target.value as string)}
                                               size="small" variant="outlined" label="SaksId" sx={{ mb: 3 }}/>
                                </FormControl>
                                <FormControl>
                                    <InputLabel>Sakstype</InputLabel>
                                    <Select size="small" sx={{ mb: 3 }} value={casetype} onChange={(e: SelectChangeEvent) => setValue("casetype", e.target.value as string)} error={Boolean(errors?.casetype)}>
                                        {casetypes.map((item, index) => (
                                            <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl>
                                    <InputLabel>Administrativ enhet</InputLabel>
                                    <Select size="small" sx={{ mb: 3 }} value={administrativeUnit} onChange={(e: SelectChangeEvent) => setValue("administrativeUnit", e.target.value as string)} error={Boolean(errors?.casetype)}>
                                        {administrativeUnits.map((item, index) => (
                                            <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl>
                                    <TextField onChange={(e) => setValue("caseWorker", e.target.value as string)}
                                               size="small" variant="outlined" label="Saksbehandler" sx={{ mb: 3 }}/>
                                </FormControl>
                                <FormControl>
                                    <TextField onChange={(e) => setValue("journalUnit", e.target.value as string)}
                                               size="small" variant="outlined" label="Journalenhet" sx={{ mb: 3 }}/>
                                </FormControl>
                                <FormControl>
                                    <InputLabel>Arkivdel</InputLabel>
                                    <Select size="small" sx={{ mb: 3 }} value={archiveSection} onChange={(e: SelectChangeEvent) => setValue("archiveSection", e.target.value as string)}>
                                        {archiveSections.map((item, index) => (
                                            <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl>
                                    <TextField onChange={(e) => setValue("title", e.target.value as string)}
                                               size="small" variant="outlined" label="Tittel" sx={{ mb: 3 }}/>
                                </FormControl>
                                <FormControl>
                                    <TextField onChange={(e) => setValue("officialTitle", e.target.value as string)}
                                               size="small" variant="outlined" label="Offentlig tittel" sx={{ mb: 3 }}/>
                                </FormControl>
                                <FormControl>
                                    <TextField onChange={(e) => setValue("accessCode", e.target.value as string)}
                                               size="small" variant="outlined" label="Tilgangskode (Jp.TGkode)" sx={{ mb: 3 }}/>
                                </FormControl>
                                <FormControl>
                                    <TextField disabled={accessCode === ''} onChange={(e) => setValue("legalbasis", e.target.value as string)}
                                               size="small" variant="outlined" label="Hjemmel" sx={{ mb: 3 }}/>
                                </FormControl>
                            </FormGroup>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className={classes.accordion}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant={"h6"}>Journalpost</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className={classes.accordion}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant={"h6"}>Dokument- og objektbeskrivelse</Typography>
                        </AccordionSummary>
                        <AccordionDetails>

                        </AccordionDetails>
                    </Accordion>
                    <Accordion className={classes.accordion}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant={"h6"}>Avsender</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className={classes.accordion}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant={"h6"}>Kontroller skjema</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant={"h6"}>Integrasjonslogikk</Typography>
                            <Typography>skjema: {selectedForm}</Typography>
                            <Typography>Type sak: {casetypeToArchive}</Typography>
                            <Typography variant={"h6"}>Sak</Typography>
                            <Typography>caseId: {caseId}</Typography>
                            <Typography>Tittel: {title}</Typography>
                            <Typography>Offisiell tittel: {officialTitle}</Typography>
                            <Typography>Administrativ enhet: {administrativeUnit}</Typography>
                            <Typography>Saksbehandler: {caseWorker}</Typography>
                            <Typography>Arkivdel: {archiveSection}</Typography>
                            <Typography>Tigangskode: {accessCode}</Typography>
                            <Typography>Hjemmel: {legalbasis}</Typography>
                            <Typography>Klasse: {classN}</Typography>
                            <Typography>Ordningsprinsipp: {principle}</Typography>
                            <Typography>Journalenhet: {journalUnit}</Typography>
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