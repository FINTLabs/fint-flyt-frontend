import * as React from 'react';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IntegrationContext } from '../../../context/IntegrationContext';
import { Link as RouterLink } from 'react-router';
import { SourceApplicationContext } from '../../../context/SourceApplicationContext';
import { IIntegration, IIntegrationPatch } from '../../integration/types/Integration';
import { IConfiguration } from '../../configuration/types/Configuration';
import {
    Alert,
    BodyLong,
    BodyShort,
    Box,
    Button,
    Heading,
    HGrid,
    HStack,
    Label,
    Loader,
    Modal,
    VStack,
} from '@navikt/ds-react';
import { IAlertMessage } from '../../../components/types/TableTypes';
import useConfigurationRepository from '../../../api/useConfigurationRepository';
import useIntegrationRepository from '../../../api/useIntegrationRepository';
import { ConfigurationVersionsTable } from './ConfigurationVersionsTable';

type Props = {
    id: string;
    integration: IIntegration;
    onError: (error: IAlertMessage | undefined) => void;
};

const IntegrationPanel: React.FunctionComponent<Props> = (props: Props) => {
    const { t } = useTranslation('translations', { keyPrefix: 'pages.integrations' });
    const IntegrationRepository = useIntegrationRepository();
    const { setConfiguration, setExistingIntegrationMetadata, setExistingIntegration } =
        useContext(IntegrationContext);
    const { allMetadata, setSourceApplication, getInstanceElementMetadata } =
        useContext(SourceApplicationContext);
    const ConfigurationRepository = useConfigurationRepository();
    const [activeVersion, setActiveVersion] = useState<undefined | null | number>(undefined);
    const [openDialog, setOpenDialog] = useState(false);
    const [configToActivate, setConfigToActivate] = useState<string>('');

    useEffect(() => {
        setSourceApplication(Number(props.integration.sourceApplicationId) ?? 1);
        getVersionForActiveConfig(
            props.integration?.activeConfigurationId
                ? props.integration.activeConfigurationId
                : undefined
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function getVersionForActiveConfig(id: string | undefined): void {
        if (id === undefined) {
            setActiveVersion(null);
            return;
        }
        ConfigurationRepository.getConfigurationById(id.toString(), true)
            .then((response) => {
                const data: IConfiguration = response.data;
                if (data) {
                    setActiveVersion(data.version);
                }
            })
            .catch((e) => {
                console.error('Error: ', e);
                setActiveVersion(null);
            });
    }

    async function handleNewOrEditConfigClick(id: number | string, version?: unknown) {
        setExistingIntegration(props.integration);
        await ConfigurationRepository.getConfigurationById(id.toString(), false)
            .then(async (response) => {
                const data = response.data;
                const usedVersionMetadata = allMetadata?.filter(
                    (md) => md.id.toString() === data.integrationMetadataId?.toString()
                );
                setExistingIntegrationMetadata(
                    usedVersionMetadata ? usedVersionMetadata[0] : undefined
                );
                if (version) {
                    data.id = 0;
                    data.comment = undefined;
                    data.completed = false;
                }
                setConfiguration(data);
            })
            .catch((e) => {
                console.error('Error: ', e);
                setConfiguration(undefined);
            });
    }

    const activateConfiguration = (configurationId: number | string) => {
        const patch: IIntegrationPatch = {
            activeConfigurationId: configurationId.toString(),
            state: 'ACTIVE',
        };
        if (props.integration?.id) {
            IntegrationRepository.updateIntegration(props.integration?.id, patch)
                .then((response) => {
                    console.log('updated integration: ', props.integration?.id, response);
                })
                .catch((e) => console.error(e));
            setActiveVersion(t('noActiveConfig'));
            console.log(
                'set active config, integrationId',
                props.integration?.id,
                'configurationId',
                configurationId
            );
        }
    };

    const deleteDraft = useCallback(async (configurationId: number | string): Promise<boolean> => {
        try {
            await ConfigurationRepository.deleteConfiguration(configurationId.toString());
            return true;
        } catch (error) {
            console.error('Error: ', error);
            return false;
        }
    }, []);

    const handleActivateAction = (configId: number | string) => {
        setOpenDialog(true);
        setConfigToActivate(configId.toString());
    };

    return (
        <Box id={'integration-panel-container'} paddingBlock={'0 8'}>
            <Modal
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                header={{
                    heading: t('table.activate'),
                    size: 'small',
                    closeButton: false,
                }}
                width="small"
            >
                <Modal.Body>
                    <BodyLong>{t('dialog.body')}</BodyLong>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        type="button"
                        variant="danger"
                        onClick={() => {
                            getVersionForActiveConfig(configToActivate);
                            activateConfiguration(configToActivate);
                            setOpenDialog(false);
                        }}
                    >
                        {t('dialog.yes')}
                    </Button>
                    <Button type="button" variant="secondary" onClick={() => setOpenDialog(false)}>
                        {t('dialog.cancel')}
                    </Button>
                </Modal.Footer>
            </Modal>
            <VStack gap="4">
                <HStack gap="2" wrap={false} data-testid="active-configuration">
                    {activeVersion === null ? (
                        <BodyShort>{t('noActiveConfig')}</BodyShort>
                    ) : (
                        <>
                            <Label>{t('activeConfigurationId')}</Label>
                            {activeVersion === undefined ? (
                                <Loader size="xsmall" title="Venter..." />
                            ) : (
                                <BodyShort>{`${t('version')} ${activeVersion}`}</BodyShort>
                            )}
                        </>
                    )}
                </HStack>

                <HGrid gap="6" columns={2}>
                    <Box
                        id={'completed-config-table'}
                        padding="4"
                        background={'surface-subtle'}
                        borderRadius="xlarge"
                        style={{ minHeight: '440px' }}
                    >
                        <Heading size="small" spacing>
                            {t('table.completed')}
                        </Heading>
                        <ConfigurationVersionsTable
                            integrationId={props.integration?.id}
                            panelId={props.id}
                            completed={true}
                            handleNewOrEditConfigClick={handleNewOrEditConfigClick}
                            handleActivateAction={handleActivateAction}
                            onError={props.onError}
                            activeVersion={activeVersion}
                        />
                    </Box>
                    <Box
                        id={'draft-config-table'}
                        padding="4"
                        background={'surface-subtle'}
                        borderRadius="xlarge"
                        style={{ height: 'fit-content' }}
                    >
                        <Heading size="small" spacing>
                            {t('table.drafts')}
                        </Heading>
                        <ConfigurationVersionsTable
                            integrationId={props.integration?.id}
                            panelId={props.id}
                            completed={false}
                            handleNewOrEditConfigClick={handleNewOrEditConfigClick}
                            handleActivateAction={handleActivateAction}
                            onError={props.onError}
                            deleteDraft={deleteDraft}
                        />
                    </Box>
                </HGrid>
                <HStack gap={'6'}>
                    <Box>
                        <Button
                            id={props.id + '-new-configuration-button'}
                            disabled={!allMetadata}
                            as={RouterLink}
                            size={'small'}
                            to="/integration/configuration/new-configuration"
                            onClick={() => {
                                setExistingIntegration(props.integration);
                                const selectedForm = allMetadata
                                    ? allMetadata.filter(
                                          (md) =>
                                              md.sourceApplicationIntegrationId ===
                                              props.integration?.sourceApplicationIntegrationId
                                      )
                                    : [];
                                setExistingIntegrationMetadata(
                                    selectedForm.length > 0
                                        ? selectedForm[selectedForm.length - 1]
                                        : undefined
                                );
                                getInstanceElementMetadata(
                                    selectedForm[selectedForm.length - 1].id
                                );
                            }}
                        >
                            {t('button.newConfiguration')}
                        </Button>
                    </Box>
                    {!allMetadata && (
                        <Alert size="small" variant="warning">
                            {t('missingDataError')}{' '}
                        </Alert>
                    )}
                </HStack>
            </VStack>
        </Box>
    );
};

export default IntegrationPanel;
