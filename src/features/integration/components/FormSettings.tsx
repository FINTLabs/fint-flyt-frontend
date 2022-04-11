import React, {useContext, useState} from 'react';
import {destinations, sourceApplications} from "../defaults/DefaultValues";
import {Box, Button, MenuItem, TextField, Typography} from "@mui/material";
import {useHistory} from "react-router-dom";
import {IntegrationContext} from "../../../integrationContext";
import HelpPopover from "./popover/HelpPopover";
import {useTranslation} from "react-i18next";

export const FormSettings: React.FunctionComponent<any> = (props) => {
    let history = useHistory();
    const { t } = useTranslation('translations', { keyPrefix: 'components.formSettings'});
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
            setError(t('error'))
        }
    }

    return(
        <>
            <Box sx={{width: '40%', maxWidth: '60%'}}>
                <Box>
                    <Typography sx={{mb: 2}}>{t('header')}</Typography>
                    <Box sx={{width: '100%', display: 'flex'}}>
                        <TextField
                            select
                            size="small"
                            sx={{ mb: 3, width: 'inherit' }}
                            value={sourceApplication}
                            label={t('labels.sourceApplication')}
                            onChange={event => setSourceApplication(event.target.value)}
                        >
                            {sourceApplications.map((item: any, index: number) => (
                                <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                            ))}
                        </TextField>
                        <HelpPopover popoverContent={'sourceApplication'}/>
                    </Box>
                    <Box sx={{width: '100%', display: 'flex'}}>
                        <TextField
                            select
                            size="small"
                            sx={{ mb: 1, width: 'inherit' }}
                            value={destination}
                            label={t('labels.destination')}
                            onChange={event => setDestination(event.target.value)}
                        >
                            {destinations.map((item: any, index: number) => (
                                <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                            ))}
                        </TextField>
                        <HelpPopover popoverContent={'destination'}/>
                    </Box>
                    <Typography color={"error"}>{!sourceApplication || !destination? error : ''}</Typography>
                </Box>
                <Box sx={{mt: 2}}>
                    <Button onClick={cancel} variant="contained">{t('button.cancel')}</Button>
                    <Button sx={{float: 'right'}} onClick={confirm} variant="contained">{t('button.next')}</Button>
                </Box>
            </Box>
        </>
    )
}
