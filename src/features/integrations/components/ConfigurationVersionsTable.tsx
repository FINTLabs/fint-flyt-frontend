import * as React from 'react';
import { IAlertMessage, Page } from '../../../components/types/TableTypes';
import { IConfiguration } from '../../configuration/types/Configuration';
import {
    ActionMenu,
    BodyShort,
    Box,
    Button,
    HStack,
    Loader,
    Pagination,
    Table,
    Tooltip,
} from '@navikt/ds-react';
import { formatTimestampToReadableText } from '../../../util/TimeAndDateUtils';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useCallback, useEffect, useState } from 'react';
import useConfigurationRepository from '../../../api/useConfigurationRepository';
import {
    CheckmarkCircleFillIcon,
    CheckmarkCircleIcon,
    DocPencilIcon,
    FilesIcon,
    MagnifyingGlassIcon,
    MenuElipsisVerticalIcon,
    TrashIcon,
} from '../../../components/icons';

type ConfigurationTableProps = {
    integrationId: string | undefined;
    panelId: string;
    completed: boolean;
    handleNewOrEditConfigClick: (id: number | string, version?: unknown) => Promise<void>;
    handleActivateAction: (configId: number | string) => void;
    onError: (error: IAlertMessage | undefined) => void;
    activeVersion?: number | null | undefined;
    deleteDraft?: (id: number | string) => Promise<boolean>;
};

export const ConfigurationVersionsTable: React.FunctionComponent<ConfigurationTableProps> = ({
    integrationId,
    panelId,
    completed,
    handleNewOrEditConfigClick,
    handleActivateAction,
    onError,
    activeVersion,
    deleteDraft,
}: ConfigurationTableProps) => {
    const { t, i18n } = useTranslation('translations', { keyPrefix: 'pages.integrations' });
    const navigate = useNavigate();

    const ConfigurationRepository = useConfigurationRepository();

    const [configs, setConfigs] = useState<Page<IConfiguration>>();

    const [page, setPage] = useState(1);
    const rowsPerPage = 30;

    useEffect(() => {
        getConfigurations();
    }, [page, setPage]);

    const getConfigurations = async () => {
        setConfigs(undefined);
        onError(undefined);
        try {
            const configResponse = await ConfigurationRepository.getConfigurations(
                page - 1,
                rowsPerPage,
                completed ? 'version' : 'id',
                'DESC',
                completed,
                integrationId ?? '',
                true
            );
            setConfigs(configResponse.data);
        } catch (e) {
            onError(undefined);
            console.error('Error: ', e);
        }
    };

    const onDeleteDraft = useCallback((configurationId: number | string) => {
        if (deleteDraft) {
            deleteDraft(configurationId).then((isDeleted) => {
                if (isDeleted) {
                    getConfigurations();
                }
            });
        }
    }, []);

    if (!configs) {
        return (
            <Box padding={'8'}>
                <Loader size="medium" title="Venter..." />
            </Box>
        );
    }

    return configs?.content?.length > 0 ? (
        <Box>
            <Table size={'small'}>
                <Table.Header>
                    <Table.Row>
                        {completed && (
                            <Table.HeaderCell scope="col">
                                {t('table.column.version')}
                            </Table.HeaderCell>
                        )}
                        <Table.HeaderCell scope="col">
                            {t('table.column.lastModifiedAt')}
                        </Table.HeaderCell>
                        <Table.HeaderCell scope="col">
                            {t('table.column.lastModifiedBy')}
                        </Table.HeaderCell>
                        <Table.HeaderCell scope="col">{t('table.column.comment')}</Table.HeaderCell>
                        <Table.HeaderCell scope="col"></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {configs?.content.map((config, i) => {
                        return (
                            <Table.Row key={i}>
                                {completed && (
                                    <Table.DataCell>
                                        <HStack gap="2" align={'center'}>
                                            {config.version}

                                            {config.version === activeVersion && (
                                                <Tooltip content={t('activeConfiguration')}>
                                                    <CheckmarkCircleFillIcon color={'green'} />
                                                </Tooltip>
                                            )}
                                        </HStack>
                                    </Table.DataCell>
                                )}
                                <Table.DataCell>
                                    {formatTimestampToReadableText(
                                        config.lastModifiedAt,
                                        i18n.language
                                    )}
                                </Table.DataCell>
                                <Table.DataCell>{config.lastModifiedBy}</Table.DataCell>
                                <Table.DataCell className={'truncate-datacell'}>
                                    {config.comment ? (
                                        <Tooltip
                                            content={config.comment}
                                            style={{ width: '100px' }}
                                        >
                                            <BodyShort className={'truncate-text'}>
                                                {config.comment}
                                            </BodyShort>
                                        </Tooltip>
                                    ) : (
                                        <BodyShort className={'truncate-text'}>
                                            {config.comment}
                                        </BodyShort>
                                    )}
                                </Table.DataCell>
                                <Table.DataCell align={'right'}>
                                    <div id={panelId + '-action-toggle'} className="min-h-32">
                                        <ActionMenu>
                                            <ActionMenu.Trigger>
                                                <Button
                                                    variant="tertiary-neutral"
                                                    size={'small'}
                                                    icon={<MenuElipsisVerticalIcon aria-hidden />}
                                                />
                                            </ActionMenu.Trigger>
                                            <ActionMenu.Content data-testid="action-menu-content">
                                                {completed ? (
                                                    <ActionMenu.Group
                                                        label={`${t('table.configurationID')}: ${config.id}`}
                                                    >
                                                        <ActionMenu.Item
                                                            data-testid="view-configuration"
                                                            onSelect={() => {
                                                                handleNewOrEditConfigClick(
                                                                    config.id
                                                                ).then(() =>
                                                                    navigate(
                                                                        '/integration/configuration/edit'
                                                                    )
                                                                );
                                                            }}
                                                            icon={<MagnifyingGlassIcon />}
                                                        >
                                                            {t('table.show')}
                                                        </ActionMenu.Item>
                                                        <ActionMenu.Item
                                                            data-testid="create-new-based-on-configuration"
                                                            onSelect={() => {
                                                                handleNewOrEditConfigClick(
                                                                    config.id,
                                                                    config.version
                                                                ).then(() =>
                                                                    navigate(
                                                                        '/integration/configuration/edit'
                                                                    )
                                                                );
                                                            }}
                                                            icon={<FilesIcon />}
                                                        >
                                                            {t('table.basedOn')}
                                                        </ActionMenu.Item>
                                                        <ActionMenu.Divider />
                                                        <ActionMenu.Item
                                                            disabled={
                                                                activeVersion === config.version
                                                            }
                                                            onSelect={() => {
                                                                handleActivateAction(config.id);
                                                            }}
                                                            icon={<CheckmarkCircleIcon />}
                                                        >
                                                            {t('table.activate')}
                                                        </ActionMenu.Item>
                                                    </ActionMenu.Group>
                                                ) : (
                                                    <ActionMenu.Group
                                                        label={`${t('table.configurationID')}: ${config.id}`}
                                                    >
                                                        <ActionMenu.Item
                                                            data-testid="edit-draft"
                                                            onSelect={() => {
                                                                handleNewOrEditConfigClick(
                                                                    config.id
                                                                ).then(() =>
                                                                    navigate(
                                                                        '/integration/configuration/edit'
                                                                    )
                                                                );
                                                            }}
                                                            icon={<DocPencilIcon />}
                                                        >
                                                            {t('table.edit')}
                                                        </ActionMenu.Item>
                                                        <ActionMenu.Divider />
                                                        <ActionMenu.Item
                                                            variant="danger"
                                                            onSelect={() => {
                                                                onDeleteDraft(config.id);
                                                            }}
                                                            icon={<TrashIcon />}
                                                        >
                                                            {t('table.deleteDraft')}
                                                        </ActionMenu.Item>
                                                    </ActionMenu.Group>
                                                )}
                                            </ActionMenu.Content>
                                        </ActionMenu>
                                    </div>
                                </Table.DataCell>
                            </Table.Row>
                        );
                    })}
                </Table.Body>
            </Table>
            <HStack justify={'center'} paddingBlock={'4 0'}>
                {configs?.totalElements && configs?.totalElements > rowsPerPage && (
                    <Pagination
                        page={page}
                        onPageChange={setPage}
                        count={configs?.totalPages ?? 1}
                        size="small"
                    />
                )}
            </HStack>
        </Box>
    ) : (
        <BodyShort>{t('table.noElements')}</BodyShort>
    );
};
