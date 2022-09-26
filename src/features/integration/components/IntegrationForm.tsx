import React, {useContext, useEffect, useState} from 'react';
import {destinations, sourceApplications} from "../defaults/DefaultValues";
import {Autocomplete, Box, Button, FormGroup, MenuItem, TextField, Theme, Typography} from "@mui/material";
import {useHistory} from "react-router-dom";
import {IntegrationContext} from "../../../context/integrationContext";
import HelpPopover from "./popover/HelpPopover";
import {useTranslation} from "react-i18next";
import {SourceApplicationContext} from "../../../context/sourceApplicationContext";
import {createStyles, makeStyles} from "@mui/styles";
import {toIntegration} from "../../util/mapping/ToIntegration";
import {IFormIntegration} from "../types/Form/FormData";
import IntegrationRepository from '../repository/IntegrationRepository';
import {IntegrationState} from "../types/Integration";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            width: theme.spacing(70)
        }
    }));

export const IntegrationForm: React.FunctionComponent<any> = (props) => {
    const classes = useStyles();
    let history = useHistory();
    const {t} = useTranslation('translations', {keyPrefix: 'components.formSettings'});
    const {
        destination,
        sourceApplicationId,
        sourceApplicationIntegrationId,
        setDestination,
        setSelectedForm,
        setSourceApplicationId,
        setSourceApplicationIntegrationId,
        setNewIntegration
    } = useContext(IntegrationContext)
    const {getAvailableForms, availableForms, metadata, getMetadata} = useContext(SourceApplicationContext)
    const [error, setError] = useState<string>('');
    const cancel = () => {
        history.push({
            pathname: '/',
        })
    }

    useEffect(() => {
        getAvailableForms();
        getMetadata();
    }, [])

    const confirm = () => {
        if (destination && sourceApplicationIntegrationId && sourceApplicationId) {
            let selectedForm = metadata.filter((md:any) => md.sourceApplicationIntegrationId === sourceApplicationIntegrationId)
            setSelectedForm(selectedForm[0])
            //TODO: change to new URLs
       let formConfiguration: IFormIntegration = {destination: destination, sourceApplicationIntegrationId: sourceApplicationIntegrationId, sourceApplicationId: sourceApplicationId}
            IntegrationRepository.createIntegration(toIntegration(formConfiguration, IntegrationState.DEACTIVATED))
                .then((response) => {
                    setSourceApplicationIntegrationId(response.data)
                    console.log(response.data)
                    setNewIntegration(response.data)

                })
                .catch(e => console.error(e))
           // let formConfiguration: IFormIntegration = {destination: destination, sourceApplicationIntegrationId: sourceApplicationIntegrationId, sourceApplicationId: sourceApplicationId}
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
                            id='sourceApplicationIntegrationId'
                            options={availableForms.sourceApplicationForms ? availableForms.sourceApplicationForms : [{label: 'Velg skjemaleverandør først', value: 'null'}]}
                            renderInput={params => (
                                <TextField {...params}
                                           size="small"
                                           label={t('labels.sourceApplicationIntegrationId') + '*'}
                                           variant="outlined" />
                            )}
                            getOptionLabel={option => option.label}
                            value={sourceApplicationIntegrationId? availableForms.sourceApplicationForms.find( ({value} : {value:any}) => value === sourceApplicationIntegrationId ): null}
                            onChange={(_event, select) => {
                                setSourceApplicationIntegrationId(select? select.value : '');
                            }}
                        />
                        <HelpPopover popoverContent={'sourceApplicationIntegrationId'}/>
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
            </FormGroup>
        </>
    )
}
