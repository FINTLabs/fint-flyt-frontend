import { ActionMenu, Alert, Box, Checkbox, Table } from '@navikt/ds-react';
import { format } from 'date-fns';
import * as React from 'react';
import { ReactElement, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router';

import useInstanceFlowTrackingRepository from '../../../shared/api/useInstanceFlowTrackingRepository';
import useInstanceRepository from '../../../shared/api/useInstanceRepository';
import { DocPencilIcon, RetryIcon } from '../../../shared/components/icons';
import TableLoader from '../../../shared/components/table/TableLoader';
import {
    useTablePageError,
    useTablePagination,
} from '../../../shared/components/table/TablePageContext';
import { TableRowActionsMenu } from '../../../shared/components/table/TableRowActionsMenu';
import { AuthorizationContext } from '../../../shared/context/AuthorizationContext';
import { SourceApplicationContext } from '../../../shared/context/SourceApplicationContext';
import { IIntegrationMetadata } from '../../configuration/types/Metadata/IntegrationMetadata';
import { ISourceApplication } from '../../configuration/types/SourceApplication';
import { useTableSelect } from '../batchProcess/TableSelectContext';
import { useFilters } from '../filter/FilterContext';
import { IEventNew, ISummary } from '../types/Event';
import CustomStatusDialogComponent from './CustomStatusDialogComponent';
import { InstanceStatusWithTooltip } from './InstanceEventStatusWithText';
import InstancePanel from './InstancePanel';

const InstanceTable: React.FunctionComponent = () => {
    const onError = useTablePageError();
    const { setPaginationMeta } = useTablePagination();
    const [searchParams, setSearchParams] = useSearchParams();
    const InstanceRepository = useInstanceRepository();
    const InstanceFlowTrackingRepository = useInstanceFlowTrackingRepository();
    const { allMetadata } = useContext(SourceApplicationContext);
    const { getAllSourceApplications } = useContext(AuthorizationContext);
    const { t } = useTranslation('translations', { keyPrefix: 'pages.instances' });
    const { filters, refreshKey } = useFilters();
    const { selectedEvents, toggleSelectedEvents, addAllEvents, removeAllEvents, selectedSize } =
        useTableSelect();

    const [selectedRowByActionMenu, setSelectedRowByActionMenu] = useState<IEventNew>();
    const [expandedRows, setExpandedRows] = useState<number[]>([]);

    const [openCustomDialog, setOpenCustomDialog] = React.useState(false);
    const errorsNotForRetry: string[] = ['instance-receival-error', 'instance-registration-error'];
    const [summaryList, setSummaryList] = useState<ISummary[]>();

    const [size, setSize] = useState(() => {
        const raw = searchParams.get('size');
        if (raw === null || raw === '') {
            return 10;
        }
        const fromUrl = Number(raw);
        return Number.isFinite(fromUrl) && fromUrl > 0 ? fromUrl : 10;
    });

    const [disabledRetryButtons, setDisabledRetryButtons] = useState(new Array(size).fill(false));
    const [loading, setLoading] = useState(true);
    const [sourceApplications, setSourceApplications] = useState<ISourceApplication[]>();

    useEffect(() => {
        if (searchParams.get('size')) {
            return;
        }
        const params = new URLSearchParams(searchParams);
        params.set('size', String(size));
        setSearchParams(params, { replace: true });
    }, []);

    useEffect(() => {
        if (allMetadata && summaryList) {
            setLoading(false);
        }
    }, [allMetadata, summaryList]);

    useEffect(() => {
        setPaginationMeta({
            hidePagination: !summaryList?.length,
            onFetchMore: setSize,
        });
    }, [summaryList?.length, setSize, setPaginationMeta]);

    useEffect(() => {
        if (!allMetadata?.length) {
            return;
        }

        setLoading(true);
        setExpandedRows([]);
        removeAllEvents();
        getLatestInstances(String(size));
    }, [size, refreshKey, allMetadata?.length]);

    const handleRetryButtonClick = (index: number) => {
        const newDisabledButtons = [...disabledRetryButtons];
        newDisabledButtons[index] = true;
        setDisabledRetryButtons(newDisabledButtons);
    };

    const getLatestInstances = async (requestSize: string) => {
        onError(undefined);
        if (!allMetadata) {
            return;
        }

        try {
            const [eventResponse, sourceApps] = await Promise.all([
                InstanceFlowTrackingRepository.getLatestEvents(Number(requestSize), filters),
                getAllSourceApplications(false),
            ]);
            setSourceApplications(sourceApps);
            const events: ISummary[] = eventResponse.data;
            if (events) {
                allMetadata.forEach((value: IIntegrationMetadata) => {
                    eventResponse.data.forEach((event: ISummary) => {
                        if (
                            event.sourceApplicationIntegrationId ===
                            value.sourceApplicationIntegrationId
                        ) {
                            event.displayName = value.integrationDisplayName;
                        }
                    });
                });

                setSummaryList(events);
            } else {
                setSummaryList([]);
            }
        } catch (error: unknown) {
            if (
                typeof error === 'object' &&
                error !== null &&
                'response' in error &&
                (error as { response?: { status?: number; data?: string } }).response
                    ?.status === 422
            ) {
                const resError = error as { response: { data: string } };
                onError({ message: resError.response.data || 'Validation error occurred' });
            } else if (error instanceof Error) {
                onError({ message: error.message || 'An unexpected error occurred' });
            } else {
                onError({ message: 'An unexpected error occurred' });
            }
            setSummaryList([]);
            console.error('Error: ', error);
        }
    };

    const resend = (instanceId: string) => {
        InstanceRepository.resendInstance(instanceId)
            .then((response) => {
                console.log('resend instance', response);
            })
            .catch((e) => {
                console.error(e);
            });
    };

    const toggleExpandableRow = (index: number) => {
        setExpandedRows((prev) =>
            prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        );
    };

    function actionMenu(event: IEventNew, id: number): ReactElement {
        return (
            <TableRowActionsMenu id={id}>
                <ActionMenu.Item
                    id="statusButton"
                    onClick={() => {
                        setSelectedRowByActionMenu(event);
                        setOpenCustomDialog(true);
                    }}
                    icon={<DocPencilIcon />}
                >
                    {t('customStatus')}
                </ActionMenu.Item>
                {event.intermediateStorageStatus === 'STORED' && (
                    <ActionMenu.Item
                        id="retryButton"
                        disabled={
                            errorsNotForRetry.includes(event.displayName ?? '') ||
                            disabledRetryButtons[id]
                        }
                        onClick={() => {
                            if (event.latestInstanceId) {
                                resend(event.latestInstanceId);
                                handleRetryButtonClick(id);
                            }
                        }}
                        icon={<RetryIcon />}
                    >
                        {t('retry')}
                    </ActionMenu.Item>
                )}
            </TableRowActionsMenu>
        );
    }

    return (
        <Box>
            {selectedRowByActionMenu && (
                <CustomStatusDialogComponent
                    open={openCustomDialog}
                    row={selectedRowByActionMenu}
                    setOpenCustomDialog={setOpenCustomDialog}
                />
            )}

            <Table id={'instance-table'}>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeader />
                        <Table.DataCell>
                            <Checkbox
                                size={'small'}
                                checked={selectedSize === summaryList?.length}
                                indeterminate={
                                    selectedSize > 0 && selectedSize !== summaryList?.length
                                }
                                onChange={() => {
                                    if (selectedSize) {
                                        removeAllEvents();
                                    } else {
                                        addAllEvents(summaryList);
                                    }
                                }}
                                hideLabel
                            >
                                Velg alle rader
                            </Checkbox>
                        </Table.DataCell>
                        <Table.ColumnHeader>
                            {t('table.column.sourceApplicationId')}
                        </Table.ColumnHeader>
                        <Table.ColumnHeader>
                            {t('table.column.sourceApplicationIntegrationIdDisplayName')}
                        </Table.ColumnHeader>
                        <Table.ColumnHeader>
                            {t('table.column.sourceApplicationIntegrationId')}
                        </Table.ColumnHeader>
                        <Table.ColumnHeader>
                            {t('table.column.sourceApplicationInstanceId')}
                        </Table.ColumnHeader>
                        <Table.ColumnHeader>{t('table.column.timestamp')}</Table.ColumnHeader>
                        <Table.ColumnHeader align={'center'}>
                            {t('table.column.status')}
                        </Table.ColumnHeader>
                        <Table.ColumnHeader>{t('table.column.storage')}</Table.ColumnHeader>
                        <Table.ColumnHeader>
                            {t('table.column.archiveInstanceId')}
                        </Table.ColumnHeader>
                        <Table.ColumnHeader align={'right'}></Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {loading ? (
                        <TableLoader columnLength={10} />
                    ) : (
                        summaryList?.map((value: IEventNew, i: number) => {
                            return (
                                <Table.ExpandableRow
                                    key={i}
                                    id={`instance-row-${i}`}
                                    expandOnRowClick
                                    open={expandedRows.includes(i)}
                                    onOpenChange={() => toggleExpandableRow(i)}
                                    content={
                                        expandedRows.includes(i) ? (
                                            <InstancePanel
                                                id={`instance-panel-${i}`}
                                                onError={(error) => onError(error)}
                                                instanceId={value.sourceApplicationInstanceId}
                                                sourceApplicationId={value.sourceApplicationId}
                                                sourceApplicationIntegrationId={
                                                    value.sourceApplicationIntegrationId
                                                }
                                            />
                                        ) : null
                                    }
                                >
                                    <Table.DataCell>
                                        <Checkbox
                                            size={'small'}
                                            hideLabel
                                            checked={selectedEvents[i] !== undefined}
                                            onChange={() => {
                                                toggleSelectedEvents(i, value);
                                            }}
                                            aria-labelledby={`id-${i}`}
                                        >
                                            {' '}
                                        </Checkbox>
                                    </Table.DataCell>
                                    <Table.DataCell scope="row">
                                        {
                                            sourceApplications?.find(
                                                (sa) => sa.id === value.sourceApplicationId
                                            )?.displayName
                                        }
                                    </Table.DataCell>

                                    <Table.DataCell>{value.displayName}</Table.DataCell>
                                    <Table.DataCell>
                                        {value.sourceApplicationIntegrationId}
                                    </Table.DataCell>
                                    <Table.DataCell>
                                        {value.sourceApplicationInstanceId}
                                    </Table.DataCell>
                                    <Table.DataCell>
                                        {format(value.latestUpdate, 'dd/MM/yy HH:mm')}
                                    </Table.DataCell>
                                    <Table.DataCell>
                                        <InstanceStatusWithTooltip status={value.status} />
                                    </Table.DataCell>
                                    <Table.DataCell>
                                        {value.intermediateStorageStatus
                                            ? t(
                                                  `filter.intermediateStorageStatusOptions.${value.intermediateStorageStatus}`
                                              )
                                            : null}
                                    </Table.DataCell>

                                    <Table.DataCell>{value.destinationInstanceIds}</Table.DataCell>
                                    <Table.DataCell align={'right'}>
                                        {value.status === 'FAILED' && actionMenu(value, i)}
                                    </Table.DataCell>
                                </Table.ExpandableRow>
                            );
                        })
                    )}
                </Table.Body>
            </Table>
            {!loading && summaryList?.length === 0 && (
                <Box paddingBlock={'8'}>
                    <Alert variant="info">{t('filter.alerts.noResults')}</Alert>
                </Box>
            )}
        </Box>
    );
};

export default InstanceTable;
