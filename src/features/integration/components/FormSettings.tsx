import React, {useContext, useState} from 'react';
import {destinations, sourceApplications} from "../defaults/DefaultValues";
import {Box, Button, MenuItem, TextField, Typography} from "@mui/material";
import {useHistory} from "react-router-dom";
import {IntegrationContext} from "../../../context/integrationContext";
import HelpPopover from "./popover/HelpPopover";
import {useTranslation} from "react-i18next";

export const FormSettings: React.FunctionComponent<any> = (props) => {
    let history = useHistory();
    const { t } = useTranslation('translations', { keyPrefix: 'components.formSettings'});
    const { destination, sourceApplicationId, setDestination, setSourceApplicationId } = useContext(IntegrationContext)
    const [error, setError] = useState<string>('');
    const cancel = () => {
        history.push({
            pathname: '/',
        })
    }

    const confirm = () => {
        if(destination && sourceApplicationId) {
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
                    <Typography id="integration-form-settings-header" sx={{mb: 2}}>{t('header')}</Typography>
                    <Box sx={{width: '100%', display: 'flex'}}>
                        <TextField
                            id='sourceApplicationId'
                            select
                            size="small"
                            sx={{ mb: 3, width: 'inherit' }}
                            value={sourceApplicationId}
                            label={t('labels.sourceApplicationId')+'*'}
                            onChange={event => setSourceApplicationId(event.target.value)}
                        >
                            {sourceApplications.map((item: any, index: number) => (
                                <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                            ))}
                        </TextField>
                        <HelpPopover popoverContent={'sourceApplication'}/>
                    </Box>
                    <Box sx={{width: '100%', display: 'flex'}}>
                        <TextField
                            id='destination'
                            select
                            size="small"
                            sx={{ mb: 1, width: 'inherit' }}
                            value={destination}
                            label={t('labels.destination')+'*'}
                            onChange={event => setDestination(event.target.value)}
                        >
                            {destinations.map((item: any, index: number) => (
                                <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                            ))}
                        </TextField>
                        <HelpPopover popoverContent={'destination'}/>
                    </Box>
                    <Typography color={"error"}>{!sourceApplicationId || !destination? error : ''}</Typography>
                </Box>
                <Box sx={{mt: 2}}>
                    <Button id="form-settings-cancel-btn"  onClick={cancel} variant="contained">{t('button.cancel')}</Button>
                    <Button id="form-settings-confirm-btn" sx={{float: 'right'}} onClick={confirm} variant="contained">{t('button.next')}</Button>
                </Box>
            </Box>
        </>
    )
}
