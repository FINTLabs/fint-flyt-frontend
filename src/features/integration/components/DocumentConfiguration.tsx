import {FormControl, FormGroup, TextField} from '@mui/material';
import React from 'react';

const DocumentConfiguration: React.FunctionComponent<any> = (props) => {
    return (
        <FormGroup className={props.style.formControl}>
            <FormControl>
                <TextField onChange={(e) => props.setValue("applicantName", e.target.value as string)}
                           size="small" variant="outlined" label="Navn" sx={{ mb: 3 }}/>
            </FormControl>
            <FormControl>
                <TextField onChange={(e) => props.setValue("applicantAddress", e.target.value as string)}
                           size="small" variant="outlined" label="Adresse" sx={{ mb: 3 }}/>
            </FormControl>
            <FormControl>
                <TextField onChange={(e) => props.setValue("applicantPostalCode", e.target.value as string)}
                           size="small" variant="outlined" label="Postnummer" sx={{ mb: 3 }}/>
            </FormControl>
            <FormControl>
                <TextField onChange={(e) => props.setValue("applicantCity", e.target.value as string)}
                           size="small" variant="outlined" label="By" sx={{ mb: 3 }}/>
            </FormControl>
            <FormControl>
                <TextField onChange={(e) => props.setValue("applicantPhoneNumber", e.target.value as string)}
                           size="small" variant="outlined" label="Telefonnummer" sx={{ mb: 3 }}/>
            </FormControl>
            <FormControl>
                <TextField onChange={(e) => props.setValue("applicantEmail", e.target.value as string)}
                           size="small" variant="outlined" label="Epost" sx={{ mb: 3 }}/>
            </FormControl>
        </FormGroup>
    );
}

export default DocumentConfiguration;