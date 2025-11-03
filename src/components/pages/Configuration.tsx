import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { SourceApplicationContext } from '../../context/SourceApplicationContext';
import OutgoingDataComponent from '../../features/configuration/components/OutgoingDataComponent';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import IncomingDataComponent from '../../features/configuration/components/IncomingDataComponent';
import { Checkbox, FormControlLabel, Snackbar } from '@mui/material';
import { IntegrationContext } from '../../context/IntegrationContext';
import { useTranslation } from 'react-i18next';
import CheckboxValueComponent from '../../features/configuration/components/common/CheckboxValueComponent';
import {
    IConfiguration,
    IConfigurationPatch,
    IObjectMapping,
} from '../../features/configuration/types/Configuration';
import { IIntegrationPatch, IntegrationState } from '../../features/integration/types/Integration';
import { ConfigurationContext } from '../../context/ConfigurationContext';
import StringValueComponent from '../../features/configuration/components/mapping/value/string/StringValueComponent';
import { IAlertContent } from '../../features/configuration/types/AlertContent';
import {
    activeAlert,
    completedAlert,
    defaultAlert,
    errorAlert,
    savedAlert,
} from '../../features/configuration/defaults/DefaultValues';
import { pruneObjectMapping } from '../../util/mapping/helpers/pruning';
import EditingProvider, { EditingContext } from '../../context/EditingContext';
import { RouteComponent } from '../../routes/Route';
import { isEmpty } from 'lodash';
import PageTemplate from '../templates/PageTemplate';
import { Alert, Button, Heading, HStack, VStack } from '@navikt/ds-react';
import { AxiosResponse } from 'axios';
import IntegrationRepository from '../../api/IntegrationRepository';
import { AuthorizationContext } from '../../context/AuthorizationContext';
import useConfigurationRepository from '../../api/useConfigurationRepository';

const Configuration: RouteComponent = () => {
    const { getInstanceElementMetadata, setInstanceElementMetadata } =
        useContext(SourceApplicationContext);
    const { completed, setCompleted, resetConfigurationContext } = useContext(ConfigurationContext);
    const { setEditCollectionAbsoluteKey } = useContext(EditingContext);
    const { t } = useTranslation('translations', { keyPrefix: 'pages.configuration' });
    const history = useNavigate();
    const {
        existingIntegrationMetadata,
        setExistingIntegrationMetadata,
        existingIntegration,
        configuration,
        setConfiguration,
        resetIntegrationContext,
    } = useContext(IntegrationContext);
    const ConfigurationRepository = useConfigurationRepository()
    const [active, setActive] = useState<boolean>(
        existingIntegration?.activeConfigurationId === configuration?.id
    );
    const [showAlert, setShowAlert] = React.useState<boolean>(false);
    const [alertContent, setAlertContent] = React.useState<IAlertContent>(defaultAlert);
    const [collectionReferencesInEditContext, setCollectionReferencesInEditContext] = useState<
        string[]
    >([]);
    const { authorized, getAuthorization } = useContext(AuthorizationContext);

    if (!authorized) {
        history('/forbidden');
    }
    if (!existingIntegration) {
        history('/');
    }
    const methods = useForm<IConfiguration>({
        mode: 'onChange',
        defaultValues: {
            integrationId: Number(existingIntegration?.id),
            integrationMetadataId: Number(existingIntegrationMetadata?.id),
            completed: configuration ? configuration.completed : false,
            comment: configuration?.comment,
        },
    });

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowAlert(false);
        console.log('DEFAULT ALTER TRIGGERED');
        setAlertContent(defaultAlert);
    };

    useEffect(() => {
        getAuthorization();
    }, []);

    useEffect(() => {
        if (configuration) {
            methods.setValue('mapping', configuration?.mapping, {
                shouldDirty: true,
                shouldTouch: true,
            });
        }
        if (configuration?.completed) {
            setCompleted(true);
        }
        if (configuration?.integrationMetadataId) {
            getInstanceElementMetadata(configuration.integrationMetadataId.toString());
        }
        return () => {
            resetIntegrationContext();
            resetConfigurationContext();
            setEditCollectionAbsoluteKey('');
            setExistingIntegrationMetadata(undefined);
            setInstanceElementMetadata(undefined);
        };
    }, []);

    const onSubmit = (data: IConfiguration) => {
        // If there are any form errors, immediately notify and exit
        if (!isEmpty(methods.formState.errors)) {
            setAlertContent(errorAlert);
            setShowAlert(true);
            return;
        }

        // Force data.mapping to be of type IObjectMapping.
        // This double cast silences the type error by asserting both the input and the output types.

        data.mapping = pruneObjectMapping(data.mapping as IObjectMapping) as IObjectMapping;

        if (configuration?.id) {
            // Update configuration branch
            ConfigurationRepository.updateConfiguration(
                configuration.id.toString(),
                data as IConfigurationPatch
            )
                .then((response) => {
                    console.log('updated', response);
                    if (!response.data.completed) {
                        setAlertContent(savedAlert);
                        setShowAlert(true);
                    }
                    if (response.data.completed && !active) {
                        setAlertContent(completedAlert);
                        setShowAlert(true);
                        setCompleted(true);
                    }
                    if (active && existingIntegration && existingIntegration.id) {
                        activateConfiguration(existingIntegration.id, response.data);
                    }
                })
                .catch((error) => {
                    if (error.response?.status) {
                        setAlertContent({
                            severity: 'error',
                            message:
                                t('saveError') +
                                (error.response.data.message
                                    ? error.response.data.message
                                    : t('genericError')) +
                                ', status: ' +
                                error.response.status,
                        });
                        setShowAlert(true);
                    }
                });
        } else {
            // Create configuration branch
            ConfigurationRepository.createConfiguration(data as IConfiguration)
                .then((response) => {
                    console.log('created', response);
                    setConfiguration(response.data);
                    if (!response.data.completed) {
                        setAlertContent(savedAlert);
                        setShowAlert(true);
                    }
                    if (response.data.completed && !active) {
                        setAlertContent(completedAlert);
                        setShowAlert(true);
                        setCompleted(true);
                    }
                    if (active && existingIntegration && existingIntegration.id) {
                        activateConfiguration(existingIntegration.id, response.data);
                    }
                })
                .catch((error) => {
                    if (error.response?.status) {
                        setAlertContent({
                            severity: 'error',
                            message:
                                t('saveError') +
                                (error.response.data.message
                                    ? error.response.data.message
                                    : t('genericError')) +
                                ', status: ' +
                                error.response.status,
                        });
                        setShowAlert(true);
                    }
                });
        }
    };

    function activateConfiguration(integrationId: string, configuration: IConfiguration) {
        const patch: IIntegrationPatch = {
            activeConfigurationId: configuration.id.toString(),
            state: IntegrationState.ACTIVE,
            destination: existingIntegration?.destination,
        };
        IntegrationRepository.updateIntegration(integrationId, patch)
            .then((response: AxiosResponse) => {
                setAlertContent(activeAlert);
                setShowAlert(true);
                setCompleted(true);
                console.log('set active configuration: ', response.data.activeConfigurationId);
            })
            .catch((e: Error) => {
                console.log('could not set active configuration', e);
            });
    }

    return (
        <PageTemplate id={'configuration'} keyPrefix={'pages.configuration'} wide customHeading>
            <DndProvider backend={HTML5Backend}>
                <EditingProvider>
                    <FormProvider {...methods}>
                        <form id="react-hook-form" onSubmit={methods.handleSubmit(onSubmit)}>
                            <VStack gap={'3'}>
                                <Heading size={'small'}>
                                    {t('header')}{' '}
                                    {existingIntegration?.sourceApplicationIntegrationId} -{' '}
                                    {existingIntegration?.displayName}
                                </Heading>

                                <VStack gap={'3'}>
                                    <HStack gap={'6'}>
                                        <Controller
                                            name={'comment'.toString()}
                                            rules={{
                                                required: {
                                                    value: !!methods.watch('completed'),
                                                    message: t('reqFieldMsg'),
                                                },
                                            }}
                                            render={({ field, fieldState }) => (
                                                <StringValueComponent
                                                    {...field}
                                                    disabled={completed}
                                                    displayName={t('comment')}
                                                    multiline
                                                    fieldState={fieldState}
                                                />
                                            )}
                                        />
                                        <Controller
                                            name={'completed'}
                                            render={({ field }) => (
                                                <CheckboxValueComponent
                                                    {...field}
                                                    displayName={t('label.checkLabel')}
                                                />
                                            )}
                                        />
                                        {methods.watch('completed') && (
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        id="form-active"
                                                        checked={active}
                                                        disabled={completed}
                                                        onChange={(
                                                            event: React.ChangeEvent<HTMLInputElement>
                                                        ) => {
                                                            setActive(event.target.checked);
                                                        }}
                                                        inputProps={{
                                                            'aria-label': 'active-checkbox',
                                                        }}
                                                    />
                                                }
                                                label={t('label.activeLabel') as string}
                                            />
                                        )}
                                    </HStack>
                                    <HStack align={'center'} gap={'6'}>
                                        {/*{configuration && (*/}
                                        <Button
                                            id="form-submit-btn"
                                            size={'small'}
                                            disabled={configuration?.completed}
                                            type="submit"
                                            // onClick={() => onSubmit(configuration)}
                                        >
                                            {!methods.watch('completed')
                                                ? t('button.submit')
                                                : t('button.complete')}
                                        </Button>
                                        {/*)}*/}
                                        <Button
                                            id="form-cancel-btn"
                                            size={'small'}
                                            onClick={() => {
                                                history('/');
                                            }}>
                                            {t('button.cancel')}
                                        </Button>
                                    </HStack>
                                </VStack>

                                <Snackbar
                                    id="integration-form-snackbar-saved"
                                    autoHideDuration={4000}
                                    open={showAlert}
                                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
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

                                <HStack gap={'8'} wrap={false}>
                                    <IncomingDataComponent
                                        referencesForCollectionsToShow={
                                            collectionReferencesInEditContext
                                        }
                                    />
                                    <OutgoingDataComponent
                                        onCollectionReferencesInEditContextChange={(
                                            collectionReferences: string[]
                                        ) => {
                                            setCollectionReferencesInEditContext(
                                                collectionReferences
                                            );
                                        }}
                                    />
                                </HStack>
                            </VStack>
                        </form>
                    </FormProvider>
                </EditingProvider>
            </DndProvider>
        </PageTemplate>
    );
};

export default Configuration;
