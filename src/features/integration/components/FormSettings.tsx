import React, {useContext, useState} from 'react';
import {destinations, sourceApplications} from "../defaults/DefaultValues";
import {Box, Button, MenuItem, TextField, Typography} from "@mui/material";
import {useHistory} from "react-router-dom";
import {IntegrationContext} from "../../../integrationContext";

export const FormSettings: React.FunctionComponent<any> = (props) => {
    let history = useHistory();

    const { destination, sourceApplication, setDestination, setSourceApplication } = useContext(IntegrationContext)
    const [error, setError] = useState<string>('');
    const cancel = () => {
        history.push({
            pathname: '/',
        })
    }

    const confirm = () => {
        if(destination && sourceApplication) {
            props.setSettings(true)
            setError('');
        }
        else {
            setError('du må velge skjemaleverandør og destinasjon')
        }
    }

    return(
        <>
            <Box sx={{width: '40%', maxWidth: '60%'}}>
                <Box sx={{width: '100%'}}>
                    <Typography sx={{mb: 2}}>Velg skjemaleverandør og destinasjon</Typography>
                    <TextField
                        select
                        size="small"
                        sx={{ mb: 3, width: 'inherit' }}
                        value={sourceApplication}
                        label='Skjemaleverandør'
                        onChange={event => setSourceApplication(event.target.value)}
                    >
                        {sourceApplications.map((item: any, index: number) => (
                            <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        select
                        size="small"
                        sx={{ mb: 3, width: 'inherit' }}
                        value={destination}
                        label='Destinasjon'
                        onChange={event => setDestination(event.target.value)}
                    >
                        {destinations.map((item: any, index: number) => (
                            <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                        ))}
                    </TextField>
                <Typography>{error}</Typography>
                </Box>
                <div >
                    <Button onClick={cancel} variant="contained">Avbryt</Button>
                    <Button sx={{float: 'right'}} onClick={confirm} variant="contained">Videre</Button>
                </div>
            </Box>
        </>
    )
}
