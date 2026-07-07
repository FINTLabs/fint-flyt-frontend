import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { SourceApplicationContext } from '../../context/SourceApplicationContext';
import OutgoingDataComponent from '../../features/configuration/components/OutgoingDataComponent';
import { Controller, FormProvider, SubmitErrorHandler, useForm } from 'react-hook-form';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import IncomingData from '../../features/configuration/components/IncomingData';
import AlertMessage from '../molecules/AlertMessage';
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
    unknownErrorAlert,
} from '../../features/configuration/defaults/DefaultValues';
import { pruneObjectMapping } from '../../util/mapping/helpers/pruning';
import EditingProvider, { EditingContext } from '../../context/EditingContext';
import { RouteComponent } from '../../routes/Route';
import PageTemplate from '../templates/PageTemplate';
import { Button, CheckboxGroup, Heading, HStack, VStack, Checkbox } from '@navikt/ds-react';
import { AuthorizationContext } from '../../context/AuthorizationContext';
import useConfigurationRepository from '../../api/useConfigurationRepository';
import useIntegrationRepository from '../../api/useIntegrationRepository';
import { ProblemDetail } from '../../context/utils/apiErrorUtils';

const Configuration: RouteComponent = () => {
    const { getInstanceElementMetadata, setInstanceElementMetadata } =
        useContext(SourceApplicationContext);
    const { completed, setCompleted, resetConfigurationContext } = useContext(ConfigurationContext);
    const { setEditCollectionAbsoluteKey } = useContext(EditingContext);
    const IntegrationRepository = useIntegrationRepository();

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
    const ConfigurationRepository = useConfigurationRepository();
    const [active, setActive] = useState<boolean>(
        existingIntegration?.activeConfigurationId === configuration?.id
    );
    const [showAlert, setShowAlert] = React.useState<boolean>(false);
    const [alertContent, setAlertContent] = React.useState<IAlertContent>(defaultAlert);
    const [loading, setLoading] = React.useState(false);

    const [collectionReferencesInEditContext, setCollectionReferencesInEditContext] = useState<
        string[]
    >([]);
    const { authorized, getAuthorization } = useContext(AuthorizationContext);

    useEffect(() => {
        if (authorized === false) {
            history('/forbidden');
        }
    }, [authorized]);

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


    const handleAlertMessageOnSave = useCallback((responseData: IConfiguration) => {
        if (!responseData.completed) {
            setAlertContent(savedAlert);
            setShowAlert(true);
        }
        if (responseData.completed && !active) {
            setAlertContent(completedAlert);
            setShowAlert(true);
            setCompleted(true);
        }
    }, [])

    const handleAlertMessageOnError = useCallback((error: ProblemDetail) => {
        if (error.status) {
            setAlertContent({
                severity: 'error',
                message: t('saveErrorTitle'),
                content: error.message ? error.message : t('genericError')
            });
            setShowAlert(true);
        } else {
            setAlertContent(unknownErrorAlert);
            setShowAlert(true);
        }
    }, []);

    const onSubmit = (data: IConfiguration) => {
        setLoading(true);

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
                    setLoading(false);
                    handleAlertMessageOnSave(response.data);
                    console.log('updated', response);
                    if (active && existingIntegration && existingIntegration.id) {
                        activateConfiguration(existingIntegration.id, response.data);
                    }
                })
                .catch((error) => {
                    setLoading(false);
                    handleAlertMessageOnError(error);
                });
        } else {
            // Create configuration branch
            ConfigurationRepository.createConfiguration(data as IConfiguration)
                .then((response) => {
                    setLoading(false);
                    console.log('created', response);
                    setConfiguration(response.data);
                    handleAlertMessageOnSave(response.data);
                    if (active && existingIntegration && existingIntegration.id) {
                        activateConfiguration(existingIntegration.id, response.data);
                    }
                })
                .catch((error) => {
                    setLoading(false);
                    handleAlertMessageOnError(error);
                });
        }
    };

    const onSubmitError: SubmitErrorHandler<IConfiguration> = (errors) => {
        console.error('INVALID FIELDS:', errors);

        setAlertContent(errorAlert);
        setShowAlert(true);
    };


    function activateConfiguration(integrationId: string, configuration: IConfiguration) {
        const patch: IIntegrationPatch = {
            activeConfigurationId: configuration.id.toString(),
            state: IntegrationState.ACTIVE,
            destination: existingIntegration?.destination,
        };
        IntegrationRepository.updateIntegration(integrationId, patch)
            .then((response) => {
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
                        <form
                            id="react-hook-form"
                            onSubmit={methods.handleSubmit(onSubmit, onSubmitError)}
                        >
                            <VStack gap={'3'}>
                                <Heading size={'small'}>
                                    {t('header')}{' '}
                                    {existingIntegration?.sourceApplicationIntegrationId} -{' '}
                                    {existingIntegration?.displayName}
                                </Heading>

                                <VStack gap={'3'} paddingBlock={'0 4'}>
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
                                                    disabled={completed || loading}
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
                                                    disabled={loading}
                                                    displayName={t('label.checkLabel')}
                                                />
                                            )}
                                        />
                                        {methods.watch('completed') && (
                                            <CheckboxGroup
                                                legend="form-active"
                                                hideLegend
                                                disabled={completed || loading}
                                                value={[active && 'form-active']}
                                                onChange={(val: string[]) => {
                                                    setActive(val.includes('form-active'));
                                                }}
                                            >
                                                <Checkbox
                                                    id="form-active"
                                                    value="form-active"
                                                    size={'small'}
                                                    aria-label="active-checkbox"
                                                >
                                                    {t('label.activeLabel')}
                                                </Checkbox>
                                            </CheckboxGroup>
                                        )}
                                    </HStack>
                                    <HStack align={'center'} gap={'6'}>
                                        <Button
                                            id="form-submit-btn"
                                            size={'small'}
                                            disabled={configuration?.completed}
                                            type="submit"
                                            loading={loading}
                                        >
                                            {!methods.watch('completed')
                                                ? t('button.submit')
                                                : t('button.complete')}
                                        </Button>

                                        <Button
                                            variant={'secondary'}
                                            type="button"
                                            id="form-cancel-btn"
                                            size={'small'}
                                            disabled={loading}
                                            onClick={() => {
                                                history('/integration/list');
                                            }}
                                        >
                                            {t('button.cancel')}
                                        </Button>
                                    </HStack>
                                </VStack>

                                <AlertMessage
                                    status={alertContent.severity}
                                    id="integration-form-snackbar-saved"
                                    open={showAlert}
                                    onClose={handleClose}
                                    title={alertContent.message}
                                    content={alertContent.content}
                                />

                                <HStack gap={'8'} wrap={false}>
                                    <IncomingData
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
