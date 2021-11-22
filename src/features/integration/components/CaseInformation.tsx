import {
    Box,
    FormControl, FormControlLabel,
    FormGroup,
    FormLabel,
    InputLabel,
    MenuItem, Radio, RadioGroup,
    Select,
    SelectChangeEvent,
    TextField, Typography
} from '@mui/material';
import React from 'react';

const forms = [
    { label: "TT-skjema", value: "TT" },
    { label: "Skjema1", value: "1_form" },
    { label: "Skjema2", value: "2_form" }
];
const creationStrategies = [
    {label: 'Som ny sak',value: 'NEW',  description: 'Innsendt skjema oppretter en ny sak i Elements'},
    {label: 'På eksisterende sak', value: 'EXISTING',  description: 'Innsendt skjema gjenfinner eksisterende sak i ' +
            'Elements basert på informasjon i skjemaet. Dersom det ikke fins en eksisterende sak opprettes en ny sak' },
    {label: 'På eksisterende sak', value: 'COLLECTION', description: 'Innsendt skjema skal leveres til en forhåndsdefinert samlesak'}
];

const CaseInformation: React.FunctionComponent<any> = (props) => {
    return (
        <Box>
            <FormGroup>
                <FormControl className={props.style.formControl}>
                    <TextField onChange={(e) => props.setValue("name", e.target.value as string)}
                               size="small" variant="outlined" label="Navn" sx={{ mb: 3 }}/>
                </FormControl>
                <FormControl className={props.style.formControl}>
                    <TextField onChange={(e) => props.setValue("description", e.target.value as string)}
                               size="small" variant="outlined" label="Beskrivelse" sx={{ mb: 3 }}/>
                </FormControl>
            </FormGroup>
            <FormGroup>
                <FormControl className={props.style.formControl} size="small" sx={{ mt: 1, mb: 1 }}>
                    <InputLabel>Skjema</InputLabel>
                    <Select
                        value={props.selectedForm}
                        onChange={(e: SelectChangeEvent) => props.setValue("selectedForm", e.target.value as string)}
                    >
                        {forms.map((item, index) => (
                            <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl className={props.style.formControl} component="fieldset">
                    <FormLabel>Velg hvordan skjema skal sendes til arkivet</FormLabel>
                    <RadioGroup onChange={(e) => props.setValue("caseData.caseCreationStrategy", e.target.value as string)} defaultValue={creationStrategies[0].value} sx={{maxWidth: 400}}>
                        {creationStrategies.map((configuration, index) => (
                            <div key={index}>
                                <FormControlLabel value={configuration.value} control={<Radio />} label={configuration.label} />
                                <Typography sx={{ fontSize: 14 }}>{configuration.description}</Typography>
                            </div>
                        ))}
                    </RadioGroup>
                </FormControl>
            </FormGroup>
        </Box>
    );
}

export default CaseInformation;