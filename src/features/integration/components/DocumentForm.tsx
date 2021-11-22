import React from 'react';
import {FormControl, FormGroup, TextField} from "@mui/material";

const DocumentForm: React.FunctionComponent<any> = (props) => {
    return (
        <FormGroup className={props.style.formControl}>
            <FormControl>
                <TextField onChange={(e) => props.setValue("documentData.title", e.target.value as string)}
                           size="small" variant="outlined" label="Tittel" sx={{ mb: 3 }}/>
            </FormControl>
            <FormControl>
                <TextField onChange={(e) => props.setValue("documentData.accessCode", e.target.value as string)}
                           size="small" variant="outlined" label="Tilgangskode" sx={{ mb: 3 }}/>
            </FormControl>
            <FormControl>
                <TextField onChange={(e) => props.setValue("documentData.paragraph", e.target.value as string)}
                           size="small" variant="outlined" label="Hjemmel" sx={{ mb: 3 }}/>
            </FormControl>
            <FormControl>
                <TextField onChange={(e) => props.setValue("documentData.variant", e.target.value as string)}
                           size="small" variant="outlined" label="Variant" sx={{ mb: 3 }}/>
            </FormControl>
            <FormControl>
                <TextField onChange={(e) => props.setValue("documentData.format", e.target.value as string)}
                           size="small" variant="outlined" label="Format" sx={{ mb: 3 }}/>
            </FormControl>
        </FormGroup>
    );
}

export default DocumentForm;