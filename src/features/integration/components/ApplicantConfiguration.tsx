import React from 'react';
import {FormControl, FormGroup, TextField} from "@mui/material";

const ApplicantConfiguration: React.FunctionComponent<any> = (props) => {
    return (
        <FormGroup className={props.style.formControl}>
            <FormControl>
                <TextField onChange={(e) => props.setValue("documentTitle", e.target.value as string)}
                           size="small" variant="outlined" label="Tittel" sx={{ mb: 3 }}/>
            </FormControl>
            <FormControl>
                <TextField onChange={(e) => props.setValue("documentAccessCode", e.target.value as string)}
                           size="small" variant="outlined" label="Tilgangskode" sx={{ mb: 3 }}/>
            </FormControl>
            <FormControl>
                <TextField onChange={(e) => props.setValue("documentParagraph", e.target.value as string)}
                           size="small" variant="outlined" label="Hjemmel" sx={{ mb: 3 }}/>
            </FormControl>
            <FormControl>
                <TextField onChange={(e) => props.setValue("documentVariant", e.target.value as string)}
                           size="small" variant="outlined" label="Variant" sx={{ mb: 3 }}/>
            </FormControl>
            <FormControl>
                <TextField onChange={(e) => props.setValue("documentFormat", e.target.value as string)}
                           size="small" variant="outlined" label="Format" sx={{ mb: 3 }}/>
            </FormControl>
        </FormGroup>
    );
}

export default ApplicantConfiguration;