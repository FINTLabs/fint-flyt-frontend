import {Step, StepLabel, Stepper } from '@mui/material';
import React from 'react';

const FormStepper: React.FunctionComponent<any> = (props) => {

    return (
        <Stepper activeStep={props.activeStep} sx={{ flexDirection: 'column', alignItems: 'start' }} className={props.class.stepper}>
            {props.formSteps.map((label: {} | null | undefined, index: any) => {
                const stepProps: { completed?: boolean } = {};
                const labelProps: {
                    optional?: React.ReactNode;
                } = {};

                return (
                    <Step {...stepProps}>
                        <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                );
            })}
        </Stepper>
    );
}

export default FormStepper;