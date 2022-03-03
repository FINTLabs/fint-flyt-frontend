import {Box, Card, Typography, Button, MenuItem, FormControl, Select, InputLabel, SelectChangeEvent, CardContent, Divider} from "@mui/material";
import * as React from "react";
import {useContext, useEffect, useState} from "react";
import IntegrationRepository from "../../integration/repository/IntegrationRepository";
import {useHistory} from "react-router-dom";
import {toValueString} from "../../util/ValueBuilderUtil";
import {IIntegrationConfiguration} from "../../integration/types/IntegrationConfiguration";
import {ResourcesContext} from "../../../resourcesContext";
import {IntegrationContext} from "../../../integrationContext";


const IntegrationConfigurationDetails: React.FunctionComponent<any> = (props) => {
    let history = useHistory();
    const [activeConfiguration, setActiveConfiguration] = useState<IIntegrationConfiguration>(props.initialConfiguration)
    const [updateSuccess, setUpdateSuccess] = useState(false)
    const [version, setVersion] = useState(props.initialConfiguration.version)
    const latestVersion = props.initialVersion;
    const {integration, setIntegration} = useContext(IntegrationContext);
    const versions = [];
    for (let i = 1; i<=latestVersion; i++) {
        versions.push({label: i, value: i})
    }
    const { getAllResources } = useContext(ResourcesContext);

    useEffect(()=> {
        getAllResources();
    }, [])

    useEffect(()=> {
        getConfiguration(version);
    }, [version, setVersion])

    const getConfiguration = (version: any) => {
        IntegrationRepository.getByIdAndVersion(integration.integrationId, version)
            .then((response) => {
                const configuration = response.data;
                setActiveConfiguration(configuration)
                setIntegration(configuration)
            })
            .catch(e => console.error('Error: ', e))
    }

    const updateConfiguration = (integrationId: string, data: IIntegrationConfiguration) => {
        IntegrationRepository.update(integrationId, data)
            .then(response => {
                console.log('updated configuraton: ', integrationId,  data, response);
                setUpdateSuccess(response.status === 200);
            })
            .catch((e: Error) => {
                console.log('error updating configuration', e);
            });
    }

    const handleChange = (event: SelectChangeEvent) => {
        setVersion(event.target.value);
    };

    const handleEdit = () => {
        history.push({
            pathname: '/integration/configuration/edit',
        })
        setIntegration(activeConfiguration);
    }

    const handleVersionChange = () => {
        console.log(activeConfiguration.version)
        if(activeConfiguration.integrationId) {
            updateConfiguration(activeConfiguration.integrationId, activeConfiguration);
        }
    }

    return (
        <>
            {!updateSuccess &&
            <Box width={950}>
                <Card sx={{mb: 4}}>
                    <FormControl size='small' sx={{float: 'right', width: 300, m: 2}}>
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
                        {version !== integration.integrationId && <Button onClick={handleVersionChange}>Bruk denne versjonen</Button>}
                    </FormControl>
                    <CardContent>
                        <Typography><strong>Id: </strong>{activeConfiguration.integrationId}</Typography>
                        <Typography><strong>Navn: </strong>{activeConfiguration.name}</Typography>
                        <Typography><strong>Beskrivelse: </strong>{activeConfiguration.description}</Typography>
                        <Typography><strong>Skjemaleverandør: </strong>{activeConfiguration.sourceApplication}</Typography>
                        <Typography><strong>Skjema: </strong>{activeConfiguration.sourceApplicationIntegrationId}</Typography>
                        <Typography><strong>Integrasjonslogikk: </strong>{activeConfiguration.caseConfiguration?.caseCreationStrategy}</Typography>
                        <Typography><strong>Versjon: </strong>{activeConfiguration.version}</Typography>
                    </CardContent>
                    <Divider />
                    <CardContent>
                        <Typography variant={"h6"}>Sakspost</Typography>
                        <Typography><strong>Saksnummer: </strong>{activeConfiguration.caseConfiguration?.caseNumber}</Typography>
                        {activeConfiguration.caseConfiguration?.fields.map((field: any, index: number) => {
                            return<Typography key={index}><strong>{field.field}:</strong> {toValueString(field.valueBuilder)}</Typography>
                        })}
                    </CardContent>
                    <Divider />
                    <CardContent>
                        <Typography variant={"h6"}>Journalpost</Typography>
                        {activeConfiguration.recordConfiguration?.fields.map((field: any, index: number) => {
                            return<Typography key={index}><strong>{field.field}:</strong> {toValueString(field.valueBuilder)}</Typography>
                        })}
                    </CardContent>
                    <Divider />
                    <CardContent>
                        <Typography variant={"h6"}>Dokument- og objektbeskrivelse</Typography>
                        {activeConfiguration.documentConfiguration?.fields.map((field: any, index: number) => {
                            return<Typography key={index}><strong>{field.field}:</strong> {toValueString(field.valueBuilder)}</Typography>
                        })}
                    </CardContent>
                    <Divider />
                    <CardContent>
                        <Typography variant={"h6"}>Avsender</Typography>
                        <Typography><strong>orgnummer:</strong> {activeConfiguration.applicantConfiguration?.organisationNumber}</Typography>
                        <Typography><strong>persnummer:</strong> {activeConfiguration.applicantConfiguration?.socialSecurityNumber}</Typography>
                        {activeConfiguration.applicantConfiguration?.fields.map((field: any, index: number) => {
                            return<Typography key={index}><strong>{field.field}:</strong> {toValueString(field.valueBuilder)}</Typography>
                        })}
                    </CardContent>
                </Card>
                <Button variant="contained" onClick={props.reset}>Tilbake</Button>
                <Button sx={{float: 'right'}} variant="contained" onClick={handleEdit}>Rediger konfigurasjon</Button>
            </Box>
            }
            {updateSuccess &&
            <Box>
                <Typography>Endret til versjon {activeConfiguration.version}</Typography>
                <Button variant="contained" onClick={props.reset}>Tilbake</Button>
            </Box>
            }

        </>
    );
}

export default IntegrationConfigurationDetails;