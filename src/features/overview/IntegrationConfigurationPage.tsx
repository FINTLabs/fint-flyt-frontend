import {
    Box,
    Typography,
    Button,
    MenuItem,
    FormControl,
    Select,
    InputLabel,
    SelectChangeEvent
} from "@mui/material";
import * as React from "react";
import {useEffect, useState} from "react";
import IntegrationRepository from "../integration/repository/IntegrationRepository";

const IntegrationConfigurationPage: React.FunctionComponent<any> = (props) => {
    const id = props.initialConfiguration.id;
    const initialVersion: number = props.initialConfiguration.version;
    const [activeConfiguration, setActiveConfiguration] = useState(props.initialConfiguration)
    const [version, setVersion] = useState(props.initialConfiguration.version)
    const versions = [];
    for (let i = 1; i<=initialVersion; i++) {
        versions.push({label: i, value: i})
    }

    useEffect(()=> {
        getConfiguration(version);
    }, [version, setVersion])

    const getConfiguration = (version: any) => {
        IntegrationRepository.getByIdAndVersion(id, version)
            .then((response) => {
                console.log(response)
                const configuration = response.data;
                setActiveConfiguration(configuration)

            })
            .catch(e => console.error('Error: ', e))
    }

    const handleChange = (event: SelectChangeEvent) => {
        setVersion(event.target.value);
    };

    return (
        <Box width={750}>
            <FormControl size='small' sx={{float: 'right', width: 300, mb: 5}}>
                <InputLabel id="demo-simple-select-label">Versjon</InputLabel>
                <Select
                    labelId="version-select-label"
                    id="version-select"
                    value={version}
                    label="Versjon"
                    onChange={handleChange}
                >
                    {versions.map((item: any, index: number) => (
                        <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Typography>id: {activeConfiguration.id}</Typography>
            <Typography>navn: {activeConfiguration.name}</Typography>
            <Typography>beskrivelse: {activeConfiguration.description}</Typography>
            <Typography>versjon: {activeConfiguration.version}</Typography>
            <Typography>orgnummer: {activeConfiguration.applicantConfiguration.organisationNumber}</Typography>

            <Button variant="contained" onClick={props.reset}>Tilbake</Button>

        </Box>
    );
}


export default IntegrationConfigurationPage;