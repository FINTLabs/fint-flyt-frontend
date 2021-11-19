import {
    FormControl,
    FormGroup,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField
} from '@mui/material';
import React from 'react';

const casetypes = [
    {label: 'Sakstype Foo', value: 'SAK1'},
    {label: 'Sakstype Bar', value: 'SAK2'}
]
const administrativeUnits = [
    {label: 'Enhet Foo', value: '1HET'},
    {label: 'Enhet Bar', value: '2HET'}
]
const archiveSections = [{value: 'arkivdel1', label: 'arkivdel1'},{value: 'arkivdel2', label: 'arkivdel2'}];


const CaseConfiguration: React.FunctionComponent<any> = (props) => {

    return (
        <div>
            <FormGroup className={props.style.formControl}>
                {props.creationStrategy === 'COLLECTION' && <FormControl>
                    <TextField
                        onChange={(e) => props.setValue("caseId", e.target.value as string)}
                        size="small" variant="outlined" label="SaksId" sx={{ mb: 3 }}/>
                </FormControl>}
                <FormControl>
                    <TextField onChange={(e) => props.setValue("title", e.target.value as string)}
                               size="small" variant="outlined" label="Tittel" sx={{ mb: 3 }}/>
                </FormControl>
                <FormControl>
                    <TextField onChange={(e) => props.setValue("publicTitle", e.target.value as string)}
                               size="small" variant="outlined" label="Offentlig tittel" sx={{ mb: 3 }}/>
                </FormControl>
                <FormControl>
                    <InputLabel>Type</InputLabel>
                    <Select size="small" sx={{ mb: 3 }} value={props.caseType} onChange={(e: SelectChangeEvent) => props.setValue("caseType", e.target.value as string)}>
                        {casetypes.map((item, index) => (
                            <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel>Administrativ enhet</InputLabel>
                    <Select size="small" sx={{ mb: 3 }} value={props.administrativeUnit} onChange={(e: SelectChangeEvent) => props.setValue("administrativeUnit", e.target.value as string)}>
                        {administrativeUnits.map((item, index) => (
                            <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel id="archive-section-label">Arkivdel</InputLabel>
                    <Select labelId="archive-section-label" size="small" sx={{ mb: 3 }} value={props.archiveUnit} onChange={(e: SelectChangeEvent) => props.setValue("archiveUnit", e.target.value as string)}>
                        {archiveSections.map((item, index) => (
                            <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl>
                    <TextField onChange={(e) => props.setValue("recordUnit", e.target.value as string)}
                               size="small" variant="outlined" label="Journalenhet" sx={{ mb: 3 }}/>
                </FormControl>
                <FormControl>
                    <TextField onChange={(e) => props.setValue("accessCode", e.target.value as string)}
                               size="small" variant="outlined" label="Tilgangskode (Jp.TGkode)" sx={{ mb: 3 }}/>
                </FormControl>
                <FormControl>
                    <TextField onChange={(e) => props.setValue("paragraph", e.target.value as string)}
                               size="small" variant="outlined" label="Hjemmel" sx={{ mb: 3 }}/>
                </FormControl>
                <FormControl>
                    <TextField onChange={(e) => props.setValue("caseWorker", e.target.value as string)}
                               size="small" variant="outlined" label="Saksbehandler" sx={{ mb: 3 }}/>
                </FormControl>
                <FormControl>
                    <TextField onChange={(e) => props.setValue("classification", e.target.value as string)}
                               size="small" variant="outlined" label="Klassering(Ordningsprinsipp)" sx={{ mb: 3 }}/>
                </FormControl>
                <FormControl>
                    <TextField onChange={(e) => props.setValue("primaryClass", e.target.value as string)}
                               size="small" variant="outlined" label="Primærklassering" sx={{ mb: 3 }}/>
                </FormControl>
                <FormControl>
                    <TextField onChange={(e) => props.setValue("secondaryClass", e.target.value as string)}
                               size="small" variant="outlined" label="Sekundærklassering" sx={{ mb: 3 }}/>
                </FormControl>
                <FormControl>
                    <TextField onChange={(e) => props.setValue("createdBy", e.target.value as string)}
                               size="small" variant="outlined" label="Opprettet av" sx={{ mb: 3 }}/>
                </FormControl>
            </FormGroup>
        </div>
    );
}

export default CaseConfiguration;