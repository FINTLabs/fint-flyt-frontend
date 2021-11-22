import {FormControl, FormGroup, TextField} from '@mui/material';
import React from 'react';

const RecordForm: React.FunctionComponent<any> = (props) => {
    return (
        <FormGroup className={props.style.formControl}>
            <FormControl>
                <TextField onChange={(e) => props.setValue("recordTitle", e.target.value as string)}
                           size="small" variant="outlined" label="Tittel" sx={{ mb: 3 }}/>
            </FormControl>
            <FormControl>
                <TextField onChange={(e) => props.setValue("recordPublictitle", e.target.value as string)}
                           size="small" variant="outlined" label="Offentlig tittel" sx={{ mb: 3 }}/>
            </FormControl>
            <FormControl>
                <TextField onChange={(e) => props.setValue("recordData.category", e.target.value as string)}
                           size="small" variant="outlined" label="Kategori" sx={{ mb: 3 }}/>
            </FormControl>
            <FormControl>
                <TextField onChange={(e) => props.setValue("recordData.administrativeUnit", e.target.value as string)}
                           size="small" variant="outlined" label="Administrativ enhet" sx={{ mb: 3 }}/>
            </FormControl>
            <FormControl>
                <TextField onChange={(e) => props.setValue("recordData.status", e.target.value as string)}
                           size="small" variant="outlined" label="Status" sx={{ mb: 3 }}/>
            </FormControl>
            <FormControl>
                <TextField onChange={(e) => props.setValue("recordData.caseWorker", e.target.value as string)}
                           size="small" variant="outlined" label="Saksbehandler" sx={{ mb: 3 }}/>
            </FormControl>
            <FormControl>
                <TextField onChange={(e) => props.setValue("recordData.paragraph", e.target.value as string)}
                           size="small" variant="outlined" label="Hjemmel" sx={{ mb: 3 }}/>
            </FormControl>
        </FormGroup>
    );
}

export default RecordForm;