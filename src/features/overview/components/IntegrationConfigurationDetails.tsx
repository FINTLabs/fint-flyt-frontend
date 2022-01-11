import {
    Box,
    Card,
    Typography,
    Button,
    MenuItem,
    FormControl,
    Select,
    InputLabel,
    SelectChangeEvent, CardContent, Divider
} from "@mui/material";
import * as React from "react";
import {useEffect, useState} from "react";
import IntegrationRepository from "../../integration/repository/IntegrationRepository";
import {useHistory} from "react-router-dom";
import {toValueString} from "../../integration/util/Util";
import {toFormData} from "../../integration/util/ToFormData";
import {IIntegrationConfiguration} from "../../integration/types/IntegrationConfiguration";


const IntegrationConfigurationDetails: React.FunctionComponent<any> = (props) => {
    console.log(props.initialConfiguration)
    let history = useHistory();
    const id = props.initialConfiguration.id;
    const initialVersion: number = props.initialConfiguration.version;
    const [activeConfiguration, setActiveConfiguration] = useState<IIntegrationConfiguration>(props.initialConfiguration)
    const [updateSuccess, setUpdateSuccess] = useState(false)
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
                const configuration = response.data;
                console.log('conf', configuration)
                const formData2 = toFormData(configuration);
                console.log(formData2)
                setActiveConfiguration(configuration)

            })
            .catch(e => console.error('Error: ', e))
    }

    const updateConfiguration = (id: string, data: IIntegrationConfiguration) => {
        IntegrationRepository.update(id, data)
            .then(response => {
                console.log('updated configuraton: ', id,  data, response);
                setUpdateSuccess(response.status === 200);
            })
            .catch((e: Error) => {
                console.log('error updating configuration', e);
            });
    }

    const handleChange = (event: SelectChangeEvent) => {
        setVersion(event.target.value);
    };

    function handleEdit() {
        history.push({
            pathname: '/integration/configuration/edit',
            state: activeConfiguration
        })
    }

    function handleVersionChange() {
        console.log(activeConfiguration.version)
        if(activeConfiguration.id) {
            updateConfiguration(activeConfiguration.id, activeConfiguration);
        }
    }

    return (
        <>
            {!updateSuccess &&
            <Box width={750}>
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
                        {version !== initialVersion && <Button onClick={handleVersionChange}>Bruk denne versjonen</Button>}
                    </FormControl>
                    <CardContent>
                        <Typography><strong>Id: </strong>{activeConfiguration.id}</Typography>
                        <Typography><strong>Navn: </strong>{activeConfiguration.name}</Typography>
                        <Typography><strong>Beskrivelse: </strong>{activeConfiguration.description}</Typography>
                        <Typography><strong>Integrasjonslogikk: </strong>{activeConfiguration.caseConfiguration.caseCreationStrategy}</Typography>
                        <Typography><strong>Versjon: </strong>{activeConfiguration.version}</Typography>
                    </CardContent>
                    <Divider />
                    <CardContent>
                        <Typography variant={"h6"}>Sakspost</Typography>
                        <Typography><strong>Saksnummer: </strong>{activeConfiguration.caseConfiguration.caseNumber}</Typography>
                        {activeConfiguration.caseConfiguration.fields.map((field: any, index: number) => {
                            return<Typography key={index}><strong>{field.field}:</strong> {toValueString(field.valueBuilder)}</Typography>
                        })}
                    </CardContent>
                    <Divider />
                    <CardContent>
                        <Typography variant={"h6"}>Journalpost</Typography>
                        {activeConfiguration.recordConfiguration.fields.map((field: any, index: number) => {
                            return<Typography key={index}><strong>{field.field}:</strong> {toValueString(field.valueBuilder)}</Typography>
                        })}
                    </CardContent>
                    <Divider />
                    <CardContent>
                        <Typography variant={"h6"}>Dokument- og objektbeskrivelse</Typography>
                        {activeConfiguration.documentConfiguration.fields.map((field: any, index: number) => {
                            return<Typography key={index}><strong>{field.field}:</strong> {toValueString(field.valueBuilder)}</Typography>
                        })}
                    </CardContent>
                    <Divider />
                    <CardContent>
                        <Typography variant={"h6"}>Avsender</Typography>
                        <Typography><strong>orgnummer:</strong> {activeConfiguration.applicantConfiguration.organisationNumber}</Typography>
                        {activeConfiguration.applicantConfiguration.fields.map((field: any, index: number) => {
                            return<Typography key={index}><strong>{field.field}:</strong> {toValueString(field.valueBuilder)}</Typography>
                        })}
                    </CardContent>
                </Card>
                <Button variant="contained" onClick={props.reset}>Tilbake</Button>
                <Button sx={{float: 'right'}}
                        variant="contained"
                        onClick={handleEdit}>
                    Rediger konfigurasjon
                </Button>
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