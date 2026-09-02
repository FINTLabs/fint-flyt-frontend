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
import * as React from 'react';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router';

import useConfigurationRepository from '../../../shared/api/useConfigurationRepository';
import useIntegrationRepository from '../../../shared/api/useIntegrationRepository';
import { IAlertMessage } from '../../../shared/components/types/TableTypes';
import { IntegrationContext } from '../../../shared/context/IntegrationContext';
import { SourceApplicationContext } from '../../../shared/context/SourceApplicationContext';
import { IConfiguration } from '../../configuration/types/Configuration';
import { IIntegration, IIntegrationPatch } from '../../integration/types/Integration';
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
    const { latestMetadata, setSourceApplication, getInstanceElementMetadata } =
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
                const usedVersionMetadata = latestMetadata?.find(
                    (md) => String(md.id) === String(data.integrationMetadataId)
                );
                setExistingIntegrationMetadata(usedVersionMetadata);
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
                .then(() => {
                    getVersionForActiveConfig(configurationId.toString());
                })
                .catch((e) => console.error(e));
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
                            disabled={!latestMetadata}
                            as={RouterLink}
                            size={'small'}
                            to="/integration/configuration/new-configuration"
                            onClick={() => {
                                setExistingIntegration(props.integration);
                                const selectedForm = latestMetadata?.find(
                                    (md) =>
                                        md.sourceApplicationIntegrationId ===
                                        props.integration?.sourceApplicationIntegrationId
                                );
                                setExistingIntegrationMetadata(selectedForm);
                                if (selectedForm?.id) {
                                    getInstanceElementMetadata(selectedForm.id);
                                }
                            }}
                        >
                            {t('button.newConfiguration')}
                        </Button>
                    </Box>
                    {!latestMetadata && (
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
