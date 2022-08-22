import React, {useContext, useState} from 'react';
import {destinations, sourceApplications} from "../defaults/DefaultValues";
import {Autocomplete, Box, Button, FormGroup, MenuItem, TextField, Theme, Typography} from "@mui/material";
import {useHistory} from "react-router-dom";
import {IntegrationContext} from "../../../context/integrationContext";
import HelpPopover from "./popover/HelpPopover";
import {useTranslation} from "react-i18next";
import {SourceApplicationContext} from "../../../context/sourceApplicationContext";
import {createStyles, makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            width: theme.spacing(70)
        }
    }));

export const FormSettings: React.FunctionComponent<any> = (props) => {
    const classes = useStyles();
    let history = useHistory();
    const {t} = useTranslation('translations', {keyPrefix: 'components.formSettings'});
    const {
        destination,
        sourceApplicationId,
        sourceApplicationIntegrationId,
        setDestination,
        setSourceApplicationId,
        setSourceApplicationIntegrationId
    } = useContext(IntegrationContext)
    const {availableForms} = useContext(SourceApplicationContext)
    const [error, setError] = useState<string>('');
    const cancel = () => {
        history.push({
            pathname: '/',
        })
    }

    const confirm = () => {
        if (destination && sourceApplicationIntegrationId && sourceApplicationId) {
            props.setSettings(true)
            setError('');
        } else {
            setError(t('error'))
        }
    }

    return (
        <>
            <FormGroup id="case-information" className={classes.formControl}>
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
                        <HelpPopover popoverContent={'sourceApplicationId'}/>
                    </Box>
                    <Box sx={{width: '100%', display: 'flex'}}>
                        <Autocomplete
                            sx={{ minWidth:'520px', mb: 3}}
                            id='labels.sourceApplication'
                            options={availableForms.sourceApplicationForms}
                            renderInput={params => (
                                <TextField {...params}
                                           size="small"
                                           label={t('labels.sourceApplicationIntegrationId') + '*'}
                                           variant="outlined" />
                            )}
                            getOptionLabel={option => option.label}
                            value={sourceApplicationIntegrationId? availableForms.sourceApplicationForms.find( ({value} : {value:any}) => value === sourceApplicationIntegrationId ): null}
                            onChange={(_event, newTeam) => {
                                setSourceApplicationIntegrationId(newTeam? newTeam.value : '');
                            }}
                        />
                        <HelpPopover popoverContent={'sourceApplicationIntegrationId'}/>
                    </Box>
{/*                    <Box sx={{width: '100%', display: 'flex'}}>
                        <TextField
                            id='sourceApplicationIntegrationId'
                            select
                            size="small"
                            sx={{mb: 3, width: 'inherit'}}
                            value={sourceApplicationIntegrationId}
                            label={t('labels.sourceApplicationIntegrationId') + '*'}
                            onChange={event => setSourceApplicationIntegrationId(event.target.value)}
                        >
                            {availableForms.sourceApplicationForms.map((item: any, index: number) => (
                                <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                            ))}
                        </TextField>
                        <HelpPopover popoverContent={'sourceApplication'}/>
                    </Box>*/}
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
            </FormGroup>
        </>
    )
}
