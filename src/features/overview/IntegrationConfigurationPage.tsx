import {
    Box,
    Card,
    Typography,
    Button,
    MenuItem,
    FormControl,
    Select,
    InputLabel,
    SelectChangeEvent, CardContent
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
            <Typography variant={"h5"}>Konfigurasjonsdetaljer</Typography>
            <Card sx={{mb: 4}}>
                <CardContent>
                    <FormControl size='small' sx={{float: 'right', width: 300, mb: 5}}>
                        <InputLabel id="version-select-input-label">Versjon</InputLabel>
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
                    <Typography>Id: {activeConfiguration.id}</Typography>
                    <Typography>Navn: {activeConfiguration.name}</Typography>
                    <Typography>Beskrivelse: {activeConfiguration.description}</Typography>
                    <Typography>Versjon: {activeConfiguration.version}</Typography>
                </CardContent>
            </Card>
            <Card sx={{mb: 4}}>
                <CardContent>
                    <Typography variant={"h6"}>Sakspost</Typography>
                    <Typography>saksnummer: {activeConfiguration.caseConfiguration.caseNumber}</Typography>
                    {activeConfiguration.caseConfiguration.fields.map((field: any, index: number) => {
                        return <Typography key={index}>{field.field}: {field.valueBuilder.value} {field.valueBuilder.properties[0]?.key}</Typography>
                    })}
                </CardContent>
            </Card>
            <Card sx={{mb: 4}}>
                <CardContent>
                    <Typography variant={"h6"}>Journalpost</Typography>
                    {activeConfiguration.recordConfiguration.fields.map((field: any, index: number) => {
                        return <Typography key={index}>{field.field}: {field.valueBuilder.value} {field.valueBuilder.properties[0]?.key}</Typography>
                    })}
                </CardContent>
            </Card>
            <Card sx={{mb: 4}}>
                <CardContent>
                    <Typography variant={"h6"}>Dokument- og objektbeskrivelse</Typography>
                    {activeConfiguration.documentConfiguration.fields.map((field: any, index: number) => {
                        return <Typography key={index}>{field.field}: {field.valueBuilder.value} {field.valueBuilder.properties[0]?.key}</Typography>
                    })}
                </CardContent>
            </Card>
            <Card sx={{mb: 4}}>
                <CardContent>
                    <Typography variant={"h6"}>Avsender</Typography>
                    <Typography>orgnummer: {activeConfiguration.applicantConfiguration.organisationNumber}</Typography>
                    {activeConfiguration.applicantConfiguration.fields.map((field: any, index: number) => {
                        return <Typography key={index}>{field.field}: {field.valueBuilder.value} {field.valueBuilder.properties[0]?.key}</Typography>
                    })}
                </CardContent>
            </Card>

            <Button variant="contained" onClick={props.reset}>Tilbake</Button>

        </Box>
    );
}


export default IntegrationConfigurationPage;