import {FormControl, FormGroup, TextField} from '@mui/material';
import React from 'react';

const ApplicantForm: React.FunctionComponent<any> = (props) => {
    return (
        <FormGroup className={props.style.formControl}>
            <FormControl>
                <TextField onChange={(e) => props.setValue("applicantData.name", e.target.value as string)}
                           size="small" variant="outlined" label="Navn" sx={{ mb: 3 }}/>
            </FormControl>
            <FormControl>
                <TextField onChange={(e) => props.setValue("applicantData.address", e.target.value as string)}
                           size="small" variant="outlined" label="Adresse" sx={{ mb: 3 }}/>
            </FormControl>
            <FormControl>
                <TextField onChange={(e) => props.setValue("applicantData.postalCode", e.target.value as string)}
                           size="small" variant="outlined" label="Postnummer" sx={{ mb: 3 }}/>
            </FormControl>
            <FormControl>
                <TextField onChange={(e) => props.setValue("applicantData.city", e.target.value as string)}
                           size="small" variant="outlined" label="By" sx={{ mb: 3 }}/>
            </FormControl>
            <FormControl>
                <TextField onChange={(e) => props.setValue("applicantData.phoneNumber", e.target.value as string)}
                           size="small" variant="outlined" label="Telefonnummer" sx={{ mb: 3 }}/>
            </FormControl>
            <FormControl>
                <TextField onChange={(e) => props.setValue("applicantData.email", e.target.value as string)}
                           size="small" variant="outlined" label="Epost" sx={{ mb: 3 }}/>
            </FormControl>
        </FormGroup>
    );
}

export default ApplicantForm;