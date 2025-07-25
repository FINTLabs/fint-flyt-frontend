import React, { useContext, useEffect, useState, useMemo } from 'react';
import {
    defaultAlert,
    getSelectableDefaultByLanguage,
    selectableDestinations,
} from '../configuration/defaults/DefaultValues';
import { Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { IntegrationContext } from '../../context/IntegrationContext';
import { useTranslation } from 'react-i18next';
import { SourceApplicationContext } from '../../context/SourceApplicationContext';
import { IIntegration, IIntegrationFormData, IntegrationState } from './types/Integration';
import { toIntegration } from '../../util/mapping/ToIntegration';
import { IIntegrationMetadata } from '../configuration/types/Metadata/IntegrationMetadata';
import {
    Alert,
    Box,
    Button,
    ErrorSummary,
    Heading,
    HelpText,
    HStack,
    Loader,
    Select,
    VStack,
} from '@navikt/ds-react';
import PageTemplate from '../../components/templates/PageTemplate';
import { AxiosResponse } from 'axios';
import IntegrationRepository from '../../api/IntegrationRepository';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { IAlertContent } from '../configuration/types/AlertContent';
import i18n from '../../util/locale/i18n';
import { ISelect } from '../configuration/types/Select';
import { AuthorizationContext } from '../../context/AuthorizationContext';
import { getSourceApplicationDisplayNameById } from '../../util/TableUtil';

type Props = {
    id: string;
};

export const IntegrationForm: React.FunctionComponent<Props> = () => {
    const history = useNavigate();
    const { t } = useTranslation('translations', { keyPrefix: 'pages.integrationForm' });
    const {
        setExistingIntegrationMetadata,
        setExistingIntegration,
        resetIntegrationContext,
        integrations,
    } = useContext(IntegrationContext);
    const {
        getMetadataBySourceApplicationId,
        sourceApplication,
        setSourceApplication,
        availableForms,
        setAvailableForms,
        currentMetaData,
        getInstanceElementMetadata
    } = useContext(SourceApplicationContext);
    const { activeUserSourceApps } = useContext(AuthorizationContext);
    const [destination, setDestination] = useState<string>('');
    const [sourceApplicationId, setSourceApplicationId] = useState<string>('');
    const [showAlert, setShowAlert] = React.useState<boolean>(false);
    const [alertContent, setAlertContent] = React.useState<IAlertContent>(defaultAlert);
    const [sourceApplicationIntegrationId, setSourceApplicationIntegrationId] =
        useState<string>('');
    const methods = useForm<IIntegrationFormData>();
    const [selectableSourceApplications, setSelectableSourceApplications] = useState<ISelect[]>([
        { label: getSelectableDefaultByLanguage(i18n.language), value: '' },
    ]);

    const integrationOptions: { label: string; value: string; disabled?: boolean }[] =
        useMemo(() => {
            if (!sourceApplication) {
                return [{ label: `- ${t('labels.placeholder')}`, value: '' }];
            }
            if (!availableForms) {
                return [{ label: `- ${t('labels.loading')}`, value: '' }];
            }
            return availableForms;
        }, [sourceApplication, availableForms, integrations, i18n.language]);

    function getSelectableSourceApplications() {
        const sources: ISelect[] = [];
        activeUserSourceApps &&
        activeUserSourceApps.map((sa) => {
            sources.push({ value: sa, label: getSourceApplicationDisplayNameById(sa) });
        });
        setSelectableSourceApplications([...selectableSourceApplications, ...sources]);
    }

    const navToConfiguration = (id: string) => {
        history('/integration/configuration/new-configuration', { state: { id } });
    };
    const cancel = () => {
        history({
            pathname: '/integration/list',
        });
    };

    useEffect(() => {
        setSourceApplication(0);
        resetIntegrationContext();
        getSelectableSourceApplications();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        getSelectableSourceApplications();
    }, [i18n.language]);

    useEffect(() => {
        setAvailableForms(undefined);
        if (sourceApplicationId) {
            getMetadataBySourceApplicationId(sourceApplicationId, true, true)
        }
    }, [sourceApplication, setSourceApplication]);

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowAlert(false);
        setAlertContent({ severity: 'info', message: '' });
    };

    const onSubmit = (data: IIntegrationFormData) => {
        const selectedForm = currentMetaData
            ? currentMetaData.find(
                (md: IIntegrationMetadata) =>
                    md.sourceApplicationIntegrationId === data.sourceApplicationIntegrationId
            )
            : undefined;
        if (!selectedForm) {
            setAlertContent({ severity: 'warning', message: t('alert.missingMetadata') });
            setShowAlert(true);
            return;
        }
        setExistingIntegrationMetadata(selectedForm);
        getInstanceElementMetadata(selectedForm.id);

        const newIntegration: IIntegration = toIntegration(data, IntegrationState.DEACTIVATED);

        IntegrationRepository.createIntegration(newIntegration)
            .then((response: AxiosResponse) => {
                setSourceApplicationIntegrationId(response.data.sourceApplicationIntegrationId);
                setExistingIntegration(response.data);
                navToConfiguration(response.data.sourceApplicationIntegrationId);
                console.log('create new integration', newIntegration);
            })
            .catch((e: Error) => {
                console.error(e);
            });
    };

    return (
        <PageTemplate id={'new'} keyPrefix={'pages.integrationForm'}>
            <Box
                id={'integration-form'}
                background={'surface-default'}
                padding="6"
                borderRadius={'large'}
                borderWidth="2"
                borderColor={'border-subtle'}
                style={{ minWidth: 'fit-content' }}>
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <VStack gap={'6'}>
                            <HStack justify={'space-between'}>
                                <Heading size={'small'}>{t('incoming')}</Heading>
                                {sourceApplication !== undefined &&
                                    sourceApplication !== 0 &&
                                    !availableForms && <Loader title={t('labels.loading')} />}
                            </HStack>
                            <VStack gap={'4'} style={{ maxWidth: '40%' }}>
                                <Controller
                                    rules={{ required: true }}
                                    name={'sourceApplicationId'}
                                    defaultValue={''}
                                    render={({ fieldState, field }) => (
                                        <Select
                                            id={'sourceApplicationId'}
                                            label={
                                                <HStack gap={'2'} align={'center'} wrap={false}>
                                                    {t('labels.sourceApplicationId')}
                                                    <HelpText
                                                        title={'hva er dette'}
                                                        placement="right">
                                                        {t('help.sourceApplicationId')}
                                                    </HelpText>
                                                </HStack>
                                            }
                                            error={!!fieldState.error}
                                            onChange={(event) => {
                                                setSourceApplication(Number(event.target.value));
                                                setSourceApplicationId(event.target.value);
                                                setSourceApplicationIntegrationId('');
                                                field.onChange(event.target.value);
                                            }}>
                                            {selectableSourceApplications.map((option, index) => (
                                                <option key={index} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </Select>
                                    )}
                                />

                                <Controller
                                    rules={{ required: true }}
                                    name={'sourceApplicationIntegrationId'}
                                    defaultValue={''}
                                    render={({ fieldState, field }) => (
                                        <Select
                                            id={'sourceApplicationIntegrationId'}
                                            label={
                                                <HStack gap={'2'} align={'center'}>
                                                    {t('labels.sourceApplicationIntegrationId')}
                                                    <HelpText
                                                        title={'hva er dette'}
                                                        placement="right">
                                                        {t('help.sourceApplicationIntegrationId')}
                                                    </HelpText>
                                                </HStack>
                                            }
                                            error={!!fieldState.error}
                                            onChange={(event) => {
                                                setSourceApplicationIntegrationId(
                                                    event.target.value
                                                );
                                                field.onChange(event.target.value);
                                            }}
                                            disabled={!sourceApplicationId}>
                                            {integrationOptions.map((option, index) => (
                                                <option
                                                    key={index}
                                                    value={option.value}
                                                    disabled={option.disabled}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </Select>
                                    )}
                                />
                            </VStack>
                            <VStack gap={'3'} style={{ maxWidth: '40%' }}>
                                <Heading size={'small'}>{t('outgoing')}</Heading>
                                <Controller
                                    rules={{ required: true }}
                                    name={'destination'}
                                    defaultValue={''}
                                    render={({ fieldState, field }) => (
                                        <Select
                                            id={'destination'}
                                            label={
                                                <HStack gap={'2'} align={'center'}>
                                                    {t('labels.destination')}
                                                    <HelpText
                                                        title={'hva er dette'}
                                                        placement="right">
                                                        {t('help.destination')}
                                                    </HelpText>
                                                </HStack>
                                            }
                                            error={!!fieldState.error}
                                            onChange={(event) => {
                                                setDestination(event.target.value);
                                                field.onChange(event.target.value);
                                            }}
                                            disabled={!sourceApplicationId}>
                                            {selectableDestinations(i18n.language).map(
                                                (option, index) => (
                                                    <option key={index} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                )
                                            )}
                                        </Select>
                                    )}
                                />
                            </VStack>
                            {!methods.formState.isValid && methods.formState.isSubmitted && (
                                <ErrorSummary heading={t('errorHeading')} size="small">
                                    {!sourceApplicationId && (
                                        <ErrorSummary.Item href="#sourceApplicationId">
                                            {t('labels.sourceApplicationId')}
                                        </ErrorSummary.Item>
                                    )}
                                    {!sourceApplicationIntegrationId && (
                                        <ErrorSummary.Item href="#sourceApplicationIntegrationId">
                                            {t('labels.sourceApplicationIntegrationId')}
                                        </ErrorSummary.Item>
                                    )}
                                    {!destination && (
                                        <ErrorSummary.Item href="#destination">
                                            {t('labels.destination')}
                                        </ErrorSummary.Item>
                                    )}
                                </ErrorSummary>
                            )}
                            <HStack id={'button-container'} gap={'6'}>
                                <Button
                                    id="form-settings-confirm-btn"
                                    type="submit"
                                    disabled={
                                        !sourceApplicationId ||
                                        !sourceApplicationIntegrationId ||
                                        !destination
                                    }>
                                    {t('button.confirm')}
                                </Button>
                                <Button id="form-settings-cancel-btn" onClick={cancel}>
                                    {t('button.cancel')}
                                </Button>
                            </HStack>
                        </VStack>
                        <Snackbar
                            id="integration-form-snackbar"
                            autoHideDuration={4000}
                            open={showAlert}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                            onClose={handleClose}>
                            <Alert
                                variant={alertContent.severity}
                                closeButton
                                onClose={() => {
                                    setShowAlert(false);
                                    setAlertContent(defaultAlert);
                                }}>
                                {alertContent.message}
                            </Alert>
                        </Snackbar>
                    </form>
                </FormProvider>
            </Box>
        </PageTemplate>
    );
};

export default IntegrationForm;
