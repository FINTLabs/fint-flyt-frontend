import React, {useContext, useEffect, useState} from 'react';
import {destinations, sourceApplications} from "../configuration/defaults/DefaultValues";
import {Autocomplete, FormGroup, MenuItem, TextField} from "@mui/material";
import {RouteComponentProps, useHistory} from "react-router-dom";
import {IntegrationContext} from "../../context/IntegrationContext";
import HelpPopover from "../configuration/components/common/popover/HelpPopover";
import {useTranslation} from "react-i18next";
import {contextDefaultValues, SourceApplicationContext} from "../../context/SourceApplicationContext";
import {IIntegration, IntegrationState} from "./types/Integration";
import {IFormIntegration} from "../configuration/types/FormIntegration";
import {selectSX} from "../../util/styles/SystemStyles";
import {toIntegration} from "../../util/mapping/ToIntegration";
import {ISelect} from "../configuration/types/Select";
import {IIntegrationMetadata} from "../configuration/types/Metadata/IntegrationMetadata";
import {Box, Button, ErrorSummary, HStack, Label, VStack} from "@navikt/ds-react";
import PageTemplate from "../../components/templates/PageTemplate";
import {AxiosResponse} from "axios";
import IntegrationRepository from "../../api/IntegrationRepository";

type Props = {
    id: string
}

export const IntegrationForm: React.FunctionComponent<RouteComponentProps<Props>> = () => {
    const history = useHistory();
    const {t} = useTranslation('translations', {keyPrefix: 'pages.integrationForm'});
    const {setSelectedMetadata, setExistingIntegration, resetIntegrationContext} = useContext(IntegrationContext)
    const {
        getAvailableForms, sourceApplication, setSourceApplication, availableForms, allMetadata, getAllMetadata,
        getInstanceElementMetadata
    } = useContext(SourceApplicationContext)
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
        const selectedForm = allMetadata ? allMetadata.find((md: IIntegrationMetadata) => md.sourceApplicationIntegrationId === sourceApplicationIntegrationId) : undefined;
        if (!destination || !sourceApplicationId || !sourceApplicationIntegrationId || !selectedForm) {
            setError(t('error'))
            return;
        }
        setSelectedMetadata(selectedForm);
        getInstanceElementMetadata(selectedForm.id);

        const formConfiguration: IFormIntegration = {destination, sourceApplicationIntegrationId, sourceApplicationId};
        const newIntegration: IIntegration = toIntegration(formConfiguration, IntegrationState.DEACTIVATED)

        IntegrationRepository.createIntegration(newIntegration)
            .then((response: AxiosResponse) => {
                setSourceApplicationIntegrationId(response.data.sourceApplicationIntegrationId)
                setExistingIntegration(response.data)
                navToConfiguration(response.data.sourceApplicationIntegrationId);
                setError('');
                console.log('create new integration', newIntegration)
            })
            .catch((e: Error) => {
                    console.error(e)
                    setError(t('error'))
                }
            )
    }

    return (
        <PageTemplate id={'new'} keyPrefix={'pages.integrationForm'}>
            <Box background={"surface-default"} padding="6" borderRadius={"large"} borderWidth="2" borderColor={"border-subtle"}>
                <FormGroup id="integration-form">
                    <VStack gap={"3"}>
                        <Label>{t('incoming')}</Label>
                        <HStack>
                            <TextField
                                autoComplete={"off"}
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
                                    <MenuItem id={'sourceApplication-' + index} key={index}
                                              value={item.value}>{item.label}</MenuItem>
                                ))}
                            </TextField>
                            <HelpPopover popoverContent={'sourceApplicationId'}/>
                        </HStack>
                        <HStack>
                            <Autocomplete
                                sx={selectSX}
                                id='sourceApplicationIntegrationId'
                                options={sourceApplication && availableForms ? availableForms : contextDefaultValues.availableForms}
                                renderInput={params => (
                                    <TextField {...params}
                                               size="small"
                                               autoComplete={"off"}
                                               style={{backgroundColor}}
                                               required={true}
                                               label={t('labels.sourceApplicationIntegrationId')}
                                               variant="outlined"/>
                                )}
                                getOptionLabel={(option: ISelect) => option.label}
                                value={sourceApplicationIntegrationId ? availableForms.find(({value}: { value: string }) => value === sourceApplicationIntegrationId) : null}
                                onChange={(_event, select) => {
                                    setSourceApplicationIntegrationId(select ? select.value : '');
                                }}
                            />
                            <HelpPopover popoverContent={'sourceApplicationIntegrationId'}/>
                        </HStack>
                        <Label>{t('outgoing')}</Label>
                        <HStack>
                            <TextField
                                id='destination'
                                autoComplete={"off"}
                                select
                                size="small"
                                sx={selectSX}
                                required={true}
                                style={{backgroundColor}}
                                value={destination}
                                label={t('labels.destination')}
                                onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setDestination(event.target.value)}
                            >
                                {destinations.map((item: ISelect, index: number) => (
                                    <MenuItem id={'destination-' + index} key={index}
                                              value={item.value}>{item.label}</MenuItem>
                                ))}
                            </TextField>
                            <HelpPopover popoverContent={'destination'}/>
                        </HStack>
                        {error && (!sourceApplicationId || !sourceApplicationIntegrationId || !destination) &&
                            <ErrorSummary heading="Du må rette disse feilene, det mangler: " size="small">
                                {!sourceApplicationId &&
                                    <ErrorSummary.Item href="#sourceApplicationId">Kildeapplikasjon</ErrorSummary.Item>}
                                {!sourceApplicationIntegrationId && <ErrorSummary.Item
                                    href="#sourceApplicationIntegrationId">Integrasjon</ErrorSummary.Item>}
                                {!destination && <ErrorSummary.Item href="#destination">Destinasjon</ErrorSummary.Item>}
                            </ErrorSummary>}
                        <HStack gap={"6"}>
                            <Button id="form-settings-confirm-btn" onClick={confirm}>
                                {t('button.confirm')}</Button>
                            <Button id="form-settings-cancel-btn" onClick={cancel}>
                                {t('button.cancel')}</Button>
                        </HStack>
                    </VStack>
                </FormGroup>
            </Box>
        </PageTemplate>
    )
}

export default IntegrationForm;