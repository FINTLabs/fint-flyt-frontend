import {Box, FormControl, FormGroup, InputLabel, MenuItem, Select, TextField} from '@mui/material';
import React from 'react';

/** steg 2**/

const sakstyper = [{value: 'type1', label: 'Enhet1'},{value: 'type2', label: 'Enhet2'}]
const admEnheter = [{value: 'admEnhet1', label: 'admEnhet1'},{value: 'admEnhet2', label: 'admEnhet2'}]
const arkivdeler = [{value: 'arkivdel1', label: 'arkivdel1'},{value: 'arkivdel2', label: 'arkivdel2'}]
const journalenheter = [{value: 'journalenhet1', label: 'journalenhet1'},{value: 'journalenhet2', label: 'journalenhet2'}]
const tilgangskoder = [{value: 'tilgangskode1', label: 'tilgangskode1'},{value: 'tilgangskode2', label: 'tilgangskode2'}]
const hjemmel = [{value: 'hjemmel1', label: 'hjemmel1'},{value: 'hjemmel2', label: 'hjemmel2'}]
const saksbehandler = [{value: 'NN', label: 'NN'},{value: 'WW', label: 'WW'}]
const ordningsprinsipp = [{value: 'P1', label: 'P1'},{value: 'P2', label: 'P2'}]
const klasse = [{value: 'class1', label: 'class1'},{value: 'class2', label: 'class2'}]

const CaseConfigurationForm: React.FunctionComponent<any> = (props) => {

    return (
        <form>
            <FormGroup>
                <FormControl>
                    <TextField size="small" variant="outlined" label="Tittel" sx={{ mb: 3 }}/>
                    <TextField size="small" variant="outlined" label="Offentlig tittel"/>
                </FormControl>
            </FormGroup>
            <FormGroup>
                <FormControl fullWidth size="small" sx={{ mt: 3, mb: 3 }}>
                    <InputLabel>Sakstype</InputLabel>
                    <Select label="Sakstype" onChange={props.handleChange}>
                        {sakstyper.map(item => (
                            <MenuItem value={item.value}>{item.label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth size="small" sx={{ mb: 3 }}>
                    <InputLabel>Administrativ enhet</InputLabel>
                    <Select label="Administrativ enhet" onChange={props.handleChange}>
                        {admEnheter.map(item => (
                            <MenuItem value={item.value}>{item.label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth size="small" sx={{ mb: 3 }}>
                    <InputLabel>Arkivdel</InputLabel>
                    <Select label="arkivdel" onChange={props.handleChange}>
                        {arkivdeler.map(item => (
                            <MenuItem value={item.value}>{item.label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth size="small" sx={{ mb: 3 }}>
                    <InputLabel>Journalenhet</InputLabel>
                    <Select label="journalenhet" onChange={props.handleChange}>
                        {journalenheter.map(item => (
                            <MenuItem value={item.value}>{item.label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth size="small" sx={{ mb: 3 }}>
                    <InputLabel>Tilgangskode</InputLabel>
                    <Select label="tilgangskode" onChange={props.handleChange}>
                        {tilgangskoder.map(item => (
                            <MenuItem value={item.value}>{item.label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth size="small" sx={{ mb: 3 }}>
                    <InputLabel>Hjemmel</InputLabel>
                    <Select label="hjemmel" onChange={props.handleChange}>
                        {hjemmel.map(item => (
                            <MenuItem value={item.value}>{item.label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth size="small" sx={{ mb: 3 }}>
                    <InputLabel>Saksbehandler</InputLabel>
                    <Select label="saksbehandler" onChange={props.handleChange}>
                        {saksbehandler.map(item => (
                            <MenuItem value={item.value}>{item.label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth size="small" sx={{ mb: 3 }}>
                    <InputLabel>Ordningsprinsipp</InputLabel>
                    <Select label="ordningsprinsipp" onChange={props.handleChange}>
                        {ordningsprinsipp.map(item => (
                            <MenuItem value={item.value}>{item.label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth size="small" sx={{ mb: 3 }}>
                    <InputLabel>Klasse</InputLabel>
                    <Select label="klasse" onChange={props.handleChange}>
                        {klasse.map(item => (
                            <MenuItem value={item.value}>{item.label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </FormGroup>
        </form>
    );
}

export default CaseConfigurationForm;