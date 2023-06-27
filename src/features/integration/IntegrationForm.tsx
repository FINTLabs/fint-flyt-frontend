import React, {useContext, useEffect, useState} from 'react';
import {destinations, sourceApplications} from "../configuration/defaults/DefaultValues";
import {Autocomplete, Box, Button, FormGroup, MenuItem, TextField, Typography} from "@mui/material";
import {useHistory} from "react-router-dom";
import {IntegrationContext} from "../../context/integrationContext";
import HelpPopover from "../configuration/components/common/popover/HelpPopover";
import {useTranslation} from "react-i18next";
import {SourceApplicationContext} from "../../context/sourceApplicationContext";
import IntegrationRepository from '../../shared/repositories/IntegrationRepository';
import {IntegrationState} from "./types/Integration";
import {IFormIntegration} from "../configuration/types/FormIntegration";
import {selectSX} from "../../util/styles/SystemStyles";
import {IntegrationFormStyles} from "../../util/styles/IntegrationForm.styles"
import {toIntegration} from "../../util/mapping/ToIntegration";

const useStyles = IntegrationFormStyles;

export const IntegrationForm: React.FunctionComponent<any> = () => {
    const classes = useStyles();
    let history = useHistory();
    const {t} = useTranslation('translations', {keyPrefix: 'components.integrationForm'});
    const {
        setSelectedMetadata,
        setExistingIntegration,
        resetIntegrationContext,
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

    const navToConfiguration = (id: string) => {
        history.push({
            pathname: '/integration/configuration/new-configuration',
        }, {
            id: id
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
                    setExistingIntegration(response.data)
                    navToConfiguration(response.data.sourceApplicationIntegrationId);
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
            <FormGroup id="integration-form" className={classes.panelContainer}>
                <Box>
                    <h2 className={classes.title2} id="integration-form-settings-header">{t('header')}</h2>
                    <Box className={classes.incomingWrapper}>
                        <h3 className={classes.title3}>{t('incoming')}</h3>
                        <Box sx={{display: 'flex'}}>
                            <TextField
                                id='sourceApplicationId'
                                select
                                size="small"
                                style={{backgroundColor}}
                                sx={selectSX}
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
                        <Box sx={{display: 'flex', mt: 2}}>
                            <Autocomplete
                                sx={selectSX}
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
                    </Box>
                    <Box className={classes.outgoingWrapper}>
                        <h3 className={classes.title3}>{t('outgoing')}</h3>
                        <Box sx={{display: 'flex'}}>
                            <TextField
                                id='destination'
                                select
                                size="small"
                                sx={selectSX}
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
                    </Box>
                    <Typography
                        color={"error"}>{!sourceApplicationId || !sourceApplicationIntegrationId || !destination ? error : ''}</Typography>
                </Box>
                <Box sx={{mt: 2}}>
                    <Button id="form-settings-confirm-btn" onClick={confirm} variant="contained">
                        {t('button.confirm')}</Button>
                    <Button id="form-settings-cancel-btn" onClick={cancel} sx={{ml: 2}} variant="contained">
                        {t('button.cancel')}</Button>
                </Box>
            </FormGroup>
        </>
    )
}
