import React from "react";
import { useState } from 'react';
import {RouteComponentProps, useHistory, withRouter} from 'react-router-dom';
import {
    Box,
    Button, SelectChangeEvent,
    Theme,
    Typography
} from "@mui/material";
import {createStyles, makeStyles, useTheme} from "@mui/styles";
import FormStepper from "./components/FormStepper";
import NewIntegrationForm from "./form/NewIntegrationForm";
import CaseConfigurationForm from "./form/CaseConfigurationForm";

const formSteps = [
    'Avleveringslogikk', 'Sak', 'Oppsummering'
];
/*
const formSteps = [
    'Avleveringslogikk', 'Sak', 'Journalpost', 'Dokument- og objektbeskrivelse', 'Avsender', 'Oppsummering'
];
*/

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        stepper: {
            width: '350px',
            height: '400px'
        }
    }));

const NewIntegration: React.FunctionComponent<RouteComponentProps<any>> = () => {
    const [activeStep, setActiveStep] = useState(0);
    const showStepper = false;
    const [form, setForm] = useState('');
    const [casetype, setCasetype] = useState('');
    const [data, setData] = useState({
        form: {
            form: '',
            selected: 'NEW'
        },
        case: {}
    });

    const classes = useStyles();
    const history = useHistory();

    function handleCancelButton() {
        history.push("/");
    }

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <Box display="flex" position="relative" width={1} height={1}>
            {showStepper && <FormStepper formSteps={formSteps} activeStep={activeStep} class={classes}/>}
            <Box>
                {activeStep === formSteps.length ? (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>Ferdig</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button onClick={handleReset} variant="outlined">Tilbake</Button>
                        </Box>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Typography variant={"h6"} sx={{ mb: 0 }}>Integrasjonkonfigurasjon - Steg {activeStep + 1}{casetype}</Typography>
                        <Typography sx={{ mt: 1, mb: 3 }}>Konfigurer sak</Typography>
                        {activeStep === 0 && <NewIntegrationForm/>}
                        {activeStep === 1 && <CaseConfigurationForm/>}
                        {activeStep === 2 && <div> Oppsummering </div>}
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button onClick={handleCancelButton} variant="outlined">Avbryt</Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }} variant="outlined">
                                Tilbake
                            </Button>
                                <Button onClick={handleNext} variant="outlined">
                                    {activeStep === formSteps.length - 1 ? 'Ferdig' : 'Neste'}
                                </Button>
                        </Box>
                    </React.Fragment>
                )}
            </Box>
        </Box>
    );
}

export default withRouter(NewIntegration);