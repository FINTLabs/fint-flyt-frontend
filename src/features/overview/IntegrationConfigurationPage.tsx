import {Box, Typography, Button} from "@mui/material";
import * as React from "react";
import {useEffect, useState} from "react";
import IntegrationRepository from "../integration/repository/IntegrationRepository";

const IntegrationConfigurationPage: React.FunctionComponent<any> = (props) => {

    const id = props.initialConfiguration.id;
    const [configuration, setConfiguration] = useState(props.initialConfiguration)
    const [version, setVersion] = useState(props.initialConfiguration.version)

    useEffect(()=> {
        getConfiguration(version);
    }, [version, setVersion])

    const getConfiguration = (version: number) => {
        IntegrationRepository.getByIdAndVersion(id, version)
            .then((response) => {
                console.log(response)
                const configuration = response.data;
                setConfiguration(configuration)

            })
            .catch(e => console.error('Error: ', e))
    }

    return (
        <Box>
            <Typography>id: {configuration.id}</Typography>
            <Typography>navn: {configuration.name}</Typography>
            <Typography>beskrivelse: {configuration.description}</Typography>
            <Typography>versjon: {configuration.version}</Typography>
            <Typography>orgnummer: {configuration.applicantConfiguration.organisationNumber}</Typography>

            <Button variant="contained" onClick={props.handleClick}>Tilbake</Button>

        </Box>
    );
}


export default IntegrationConfigurationPage;