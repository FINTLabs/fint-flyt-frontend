import {
    FormControl,
    FormControlLabel,
    FormLabel,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    SelectChangeEvent,
    Typography
} from '@mui/material';
import React from 'react';
import {useState} from "react";


const avaliableForms = [
    {value: 'TTForm', label: 'TT-skjema'},
    {value: 'NNForm', label: 'NN-skjema'},
    {value: 'Form42', label: 'Skjema42'}
]
const caseConfigurations = [
    {value: 'NEW', label: 'Som ny sak', description: 'Innsendt skjema oppretter en ny sak i Elements'},
    {value: 'EXISTING', label: 'På eksisterende sak', description: 'Innsendt skjema gjenfinner eksisterende sak i ' +
            'Elements basert på informasjon i skjemaet. Dersom det ikke fins en eksisterende sak opprettes en ny sak' },
    {value: 'COLLECTION', label: 'På eksisterende sak', description: 'Innsendt skjema skal leveres til en forhåndsdefinert samlesak'}
]


/** steg 1 **/
const NewIntegrationForm: React.FunctionComponent<any> = (props) => {
    const [form, setForm] = useState('');
    const [casetype, setCasetype] = useState('NEW');

    const handleRadioChange = (event: any) => {
        setCasetype(event.target.value as string);
    };
    const handleChange = (event: SelectChangeEvent) => {
        setForm(event.target.value as string);
    };

    return (
            <form>
                <FormControl fullWidth size="small" sx={{ mb: 3 }}>
                    <InputLabel>Skjema</InputLabel>
                    <Select
                        id="dropdown-select-form"
                        label="Skjema"
                        onChange={handleChange}
                        defaultValue={''}
                    >
                        {avaliableForms.map((item, index) => (
                            <MenuItem value={item.value}>{item.label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl component="fieldset" sx={{ width: 750 }}>
                    <FormLabel>Velg hvordan skjema skal sendes til arkivet</FormLabel>
                    <RadioGroup onChange={handleRadioChange} defaultValue={caseConfigurations[0].value} sx={{maxWidth: 400}}>
                        {caseConfigurations.map((configuration, index) => (
                            <div>
                                <FormControlLabel value={configuration.value} control={<Radio />} label={configuration.label} />
                                <Typography sx={{ fontSize: 14 }}>{configuration.description}</Typography>
                            </div>
                        ))}
                    </RadioGroup>
                </FormControl>
                {form}
                {casetype}
            </form>
    );
}

export default NewIntegrationForm;