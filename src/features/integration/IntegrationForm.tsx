import React, {useContext, useEffect, useState} from 'react';
import {destinations, sourceApplications} from "../configuration/defaults/DefaultValues";
import {Autocomplete, Box, Button, FormGroup, MenuItem, TextField, Typography} from "@mui/material";
import {RouteComponentProps, useHistory} from "react-router-dom";
import {IntegrationContext} from "../../context/integrationContext/IntegrationContext";
import HelpPopover from "../configuration/components/common/popover/HelpPopover";
import {useTranslation} from "react-i18next";
import {SourceApplicationContext, contextDefaultValues} from "../../context/SourceApplicationContext";
import IntegrationRepository from '../../shared/repositories/IntegrationRepository';
import {IIntegration, IntegrationState} from "./types/Integration";
import {IFormIntegration} from "../configuration/types/FormIntegration";
import {selectSX} from "../../util/styles/SystemStyles";
import {IntegrationFormStyles} from "../../util/styles/IntegrationForm.styles"
import {toIntegration} from "../../util/mapping/ToIntegration";
import {ISelect} from "../configuration/types/Select";
import {IIntegrationMetadata} from "../configuration/types/Metadata/IntegrationMetadata";


const useStyles = IntegrationFormStyles;

type Props = {
    id: string
}

export const IntegrationForm: React.FunctionComponent<RouteComponentProps<Props>> = () => {
    const classes = useStyles();
    const history = useHistory();
    const {t} = useTranslation('translations', {keyPrefix: 'components.integrationForm'});
    const {setSelectedMetadata, setExistingIntegration, resetIntegrationContext} = useContext(IntegrationContext)
    const {getAvailableForms, sourceApplication, setSourceApplication, availableForms, allMetadata, getAllMetadata,
        getInstanceElementMetadata} = useContext(SourceApplicationContext)
    const [error, setError] = useState<string>('');
    const [destination, setDestination] = useState<string>('');
    const [sourceApplicationId, setSourceApplicationId] = useState<string>('');
    const [sourceApplicationIntegrationId, setSourceApplicationIntegrationId] = useState<string>('');
    const backgroundColor = 'white';

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        getAllMetadata(true);
        getAvailableForms();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sourceApplication, setSourceApplication])

    const confirm = () => {
        const selectedForm = allMetadata.find((md: IIntegrationMetadata) => md.sourceApplicationIntegrationId === sourceApplicationIntegrationId);
        if (!destination || !sourceApplicationId || !sourceApplicationIntegrationId || !selectedForm) {
            setError(t('error'))
            return;
        }
        setSelectedMetadata(selectedForm);
        getInstanceElementMetadata(selectedForm.id);

        const formConfiguration: IFormIntegration = {destination, sourceApplicationIntegrationId, sourceApplicationId};
        const newIntegration: IIntegration = toIntegration(formConfiguration, IntegrationState.DEACTIVATED)

        IntegrationRepository.createIntegration(newIntegration)
            .then((response) => {
                setSourceApplicationIntegrationId(response.data.sourceApplicationIntegrationId)
                setExistingIntegration(response.data)
                navToConfiguration(response.data.sourceApplicationIntegrationId);
                setError('');
                console.log('create new integration', newIntegration)})
            .catch((e) => {
                console.error(e)
                setError(t('error'))}
            )
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
                                {sourceApplications.map((item: ISelect, index: number) => (
                                    <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                                ))}
                            </TextField>
                            <HelpPopover popoverContent={'sourceApplicationId'}/>
                        </Box>
                        <Box sx={{display: 'flex', mt: 2}}>
                            <Autocomplete
                                sx={selectSX}
                                id='sourceApplicationIntegrationId'
                                options={sourceApplication && availableForms ? availableForms : contextDefaultValues.availableForms}
                                renderInput={params => (
                                    <TextField {...params}
                                               size="small"
                                               style={{backgroundColor}}
                                               label={t('labels.sourceApplicationIntegrationId') + '*'}
                                               variant="outlined"/>
                                )}
                                getOptionLabel={(option: ISelect) => option.label}
                                value={sourceApplicationIntegrationId ? availableForms.find(({value}: { value: string }) => value === sourceApplicationIntegrationId) : null}
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
                                onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setDestination(event.target.value)}
                            >
                                {destinations.map((item: ISelect, index: number) => (
                                    <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                                ))}
                            </TextField>
                            <HelpPopover popoverContent={'destination'}/>
                        </Box>
                    </Box>
                    <Typography id={'form-error-msg'}
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

export default IntegrationForm;
