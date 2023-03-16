import React, {useContext, useEffect, useState} from 'react';
import {destinations, sourceApplications} from "../configuration/defaults/DefaultValues";
import {Autocomplete, Box, Button, FormGroup, MenuItem, TextField, Theme, Typography} from "@mui/material";
import {useHistory} from "react-router-dom";
import {IntegrationContext} from "../../context/integrationContext";
import HelpPopover from "../configuration/components/popover/HelpPopover";
import {useTranslation} from "react-i18next";
import {SourceApplicationContext} from "../../context/sourceApplicationContext";
import {createStyles, makeStyles} from "@mui/styles";
import {toIntegration} from "../util/mapping/ToIntegration";
import IntegrationRepository from '../../shared/repositories/IntegrationRepository';
import {IntegrationState} from "./types/Integration";
import {IFormIntegration} from "../configuration/types/FormIntegration";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            width: theme.spacing(70)
        }
    }));

export const IntegrationForm: React.FunctionComponent<any> = () => {
    const classes = useStyles();
    let history = useHistory();
    const {t} = useTranslation('translations', {keyPrefix: 'components.formSettings'});
    const {
        setSelectedMetadata,
        setNewIntegration,
        resetIntegrationContext
    } = useContext(IntegrationContext)
    const {
        getAvailableForms,
        sourceApplication,
        setSourceApplication,
        availableForms,
        allMetadata,
        getAllMetadata,
        getInstanceElementMetadata
    } = useContext(SourceApplicationContext)
    const [error, setError] = useState<string>('');
    const [destination, setDestination] = useState<string>('');
    const [sourceApplicationId, setSourceApplicationId] = useState<string>('');
    const [sourceApplicationIntegrationId, setSourceApplicationIntegrationId] = useState<string>('');
    let backgroundColor = 'white';

    const navToConfiguration = () => {
        history.push({
            pathname: '/integration/configuration/new',
        })
    }
    const cancel = () => {
        history.push({
            pathname: '/',
        })
    }

    useEffect(() => {
        resetIntegrationContext();
        return () => {
            setSourceApplication(sourceApplication)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    useEffect(() => {
        getAllMetadata(true);
        getAvailableForms();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sourceApplication, setSourceApplication])

    const confirm = () => {
        if (destination && sourceApplicationId && sourceApplicationIntegrationId) {
            let selectedForm = allMetadata.filter((md: any) => md.sourceApplicationIntegrationId === sourceApplicationIntegrationId)
            setSelectedMetadata(selectedForm[0])
            getInstanceElementMetadata(selectedForm[0].id)
            let formConfiguration: IFormIntegration = {
                destination: destination,
                sourceApplicationIntegrationId: sourceApplicationIntegrationId,
                sourceApplicationId: sourceApplicationId
            }
            IntegrationRepository.createIntegration(toIntegration(formConfiguration, IntegrationState.DEACTIVATED))
                .then((response) => {
                    setSourceApplicationIntegrationId(response.data.sourceApplicationIntegrationId)
                    setNewIntegration(response.data)
                    navToConfiguration();
                })
                .catch(e => console.error(e))
            console.log('create new integration', toIntegration(formConfiguration, IntegrationState.DEACTIVATED))
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
                            style={{backgroundColor}}
                            sx={{mb: 3, width: 'inherit'}}
                            value={sourceApplicationId}
                            label={t('labels.sourceApplicationId') + '*'}
                            onChange={event => {
                                setSourceApplication(Number(event.target.value))
                                setSourceApplicationId(event.target.value)
                                setSourceApplicationIntegrationId('')
                            }}
                        >
                            {sourceApplications.map((item: any, index: number) => (
                                <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                            ))}
                        </TextField>
                        <HelpPopover popoverContent={'sourceApplicationId'}/>
                    </Box>
                    <Box sx={{width: '100%', display: 'flex'}}>
                        <Autocomplete
                            sx={{minWidth: ((theme: Theme) => theme.spacing(65)), mb: 3}}
                            id='sourceApplicationIntegrationId'
                            options={sourceApplication && availableForms.forms ? availableForms.forms : [{
                                label: 'Velg kildeapplikasjon først',
                                value: 'null'
                            }]}
                            renderInput={params => (
                                <TextField {...params}
                                           size="small"
                                           style={{backgroundColor}}
                                           label={t('labels.sourceApplicationIntegrationId') + '*'}
                                           variant="outlined"/>
                            )}
                            getOptionLabel={option => option.label}
                            value={sourceApplicationIntegrationId ? availableForms.forms.find(({value}: { value: any }) => value === sourceApplicationIntegrationId) : null}
                            onChange={(_event, select) => {
                                setSourceApplicationIntegrationId(select ? select.value : '');
                            }}
                        />
                        <HelpPopover popoverContent={'sourceApplicationIntegrationId'}/>
                    </Box>

                    <Box sx={{width: '100%', display: 'flex'}}>
                        <TextField
                            id='destination'
                            select
                            size="small"
                            sx={{mb: 1, width: 'inherit'}}
                            style={{backgroundColor}}
                            value={destination}
                            label={t('labels.destination') + '*'}
                            onChange={event => setDestination(event.target.value)}
                        >
                            {destinations.map((item: any, index: number) => (
                                <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                            ))}
                        </TextField>
                        <HelpPopover popoverContent={'destination'}/>
                    </Box>
                    <Typography
                        color={"error"}>{!sourceApplicationId || !sourceApplicationIntegrationId || !destination ? error : ''}</Typography>
                </Box>
                <Box sx={{mt: 2}}>
                    <Button id="form-settings-cancel-btn" onClick={cancel}
                            variant="contained">{t('button.cancel')}</Button>
                    <Button id="form-settings-confirm-btn" sx={{float: 'right'}} onClick={confirm}
                            variant="contained">{t('button.confirm')}</Button>
                </Box>
            </FormGroup>
        </>
    )
}
