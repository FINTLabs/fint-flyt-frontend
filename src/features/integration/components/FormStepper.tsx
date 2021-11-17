import {Step, StepLabel, Stepper, Theme} from '@mui/material';
import React from 'react';
import {createStyles, makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        stepper: {
            minWidth: '350px',
            height: '400px'
        }
    }));

const formSteps = [
    'Avleveringslogikk', 'Sak', 'Journalpost', 'Dokument- og objektbeskrivelse', 'Avsender', 'Oppsummering'
];


const FormStepper: React.FunctionComponent<any> = (props) => {
    const classes = useStyles();
    return (
        <Stepper activeStep={props.activeStep} sx={{ flexDirection: 'column', alignItems: 'start' }} className={classes.stepper}>
            {formSteps.map((label: {} | null | undefined, index: any) => {
                const stepProps: { completed?: boolean } = {};
                const labelProps: {
                    optional?: React.ReactNode;
                } = {};

                return (
                    <Step key={index}{...stepProps}>
                        <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                );
            })}
        </Stepper>
    );
}

export default FormStepper;