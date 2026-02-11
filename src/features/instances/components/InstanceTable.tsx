import * as React from 'react';
import { ReactElement, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Box, Button, Dropdown, HStack, Table } from '@navikt/ds-react';
import { format } from 'date-fns';
import { IEventNew, ISummary } from '../types/Event';
import InstancePanel from './InstancePanel';
import { InstanceStatusWithTooltip } from './InstanceEventStatusWithText';
import useInstanceRepository from '../../../api/useInstanceRepository';
import { IIntegrationMetadata } from '../../configuration/types/Metadata/IntegrationMetadata';
import { SourceApplicationContext } from '../../../context/SourceApplicationContext';
import { IAlertMessage } from '../../../components/types/TableTypes';
import { MenuElipsisVerticalIcon } from '@navikt/aksel-icons';
import CustomStatusDialogComponent from './CustomStatusDialogComponent';
import { useFilters } from '../filter/FilterContext';
import useInstanceFlowTrackingRepository from '../../../api/useInstanceFlowTrackingRepository';
import TableLoader from '../../../components/molecules/TableLoader';
import { AuthorizationContext } from '../../../context/AuthorizationContext';
import { ISourceApplication } from '../../configuration/types/SourceApplication';
import LoadMorePagination from '../../../components/organisms/pagination/LoadMorePagination';

interface Props {
    onError: (error: IAlertMessage | undefined) => void;
}

const InstanceTable: React.FunctionComponent<Props> = ({ onError }) => {
    const InstanceRepository = useInstanceRepository();
    const InstanceFlowTrackingRepository = useInstanceFlowTrackingRepository();
    const { allMetadata } = useContext(SourceApplicationContext);
    const { getAllSourceApplications } = useContext(AuthorizationContext);
    const { t } = useTranslation('translations', { keyPrefix: 'pages.instances' });
    const { filters, refreshKey } = useFilters();

    const [selectedRow, setSelectedRow] = useState<IEventNew>();
    const [openCustomDialog, setOpenCustomDialog] = React.useState(false);
    const errorsNotForRetry: string[] = ['instance-receival-error', 'instance-registration-error'];
    const [summaryList, setSummaryList] = useState<ISummary[]>();

    const [size, setSize] = useState<number>(10);

    const [disabledRetryButtons, setDisabledRetryButtons] = useState(
        new Array(size).fill(false)
    );
    const [loading, setLoading] = useState(true);
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [expandedRows, setExpandedRows] = useState<number[]>([]);
    const [sourceApplications, setSourceApplications] = useState<ISourceApplication[]>();

    useEffect(() => {
        if (allMetadata && summaryList) {
            setLoading(false);
        }
    }, [allMetadata, summaryList]);

    useEffect(() => {
        if (allMetadata?.length && !isFetching) {
            setLoading(true);
            setExpandedRows([]);
            getLatestInstances(String(size));
        }
    }, [size, refreshKey, allMetadata?.length]);

    const handleRetryButtonClick = (index: number) => {
        const newDisabledButtons = [...disabledRetryButtons];
        newDisabledButtons[index] = true;
        setDisabledRetryButtons(newDisabledButtons);
    };

    const getLatestInstances = async (size: string) => {
        onError(undefined);
        if (allMetadata) {
            try {
                setIsFetching(true);
                Promise.all([
                    InstanceFlowTrackingRepository.getLatestEvents(Number(size), filters),
                    getAllSourceApplications(false),
                ]).then(([eventResponse, sourceApps]) => {
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
                });
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
            } finally {
                setIsFetching(false);
            }
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

    const handleToggle = (index: number) => {
        setExpandedRows((prev) =>
            prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        );
    };

    function actionMenu(event: IEventNew, id: number): ReactElement {
        return (
            <div id={id + '-action-toggle'} className="min-h-32">
                <Dropdown>
                    <Button
                        size={'small'}
                        as={Dropdown.Toggle}
                        variant="tertiary-neutral"
                        icon={<MenuElipsisVerticalIcon aria-hidden />}
                    />
                    <Dropdown.Menu>
                        <Dropdown.Menu.List>
                            <Dropdown.Menu.List.Item
                                id={'statusButton'}
                                onClick={() => {
                                    setSelectedRow(event);
                                    setOpenCustomDialog(true);
                                }}
                            >
                                {t('customStatus')}
                            </Dropdown.Menu.List.Item>

                            {event.intermediateStorageStatus === 'STORED' && (
                                <>
                                    <Dropdown.Menu.Divider />
                                    <Dropdown.Menu.List.Item
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
                                    >
                                        {t('retry')}
                                    </Dropdown.Menu.List.Item>
                                </>
                            )}
                        </Dropdown.Menu.List>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        );
    }

    return (
        <Box>
            <Box background={'surface-default'} style={{ minHeight: '70vh' }}>
                {selectedRow && (
                    <CustomStatusDialogComponent
                        open={openCustomDialog}
                        row={selectedRow}
                        setOpenCustomDialog={setOpenCustomDialog}
                    />
                )}

                <Table id={'instance-table'}>
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeader />
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
                                        onOpenChange={() => handleToggle(i)}
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

                                        <Table.DataCell>
                                            {value.destinationInstanceIds}
                                        </Table.DataCell>
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

            <LoadMorePagination
                hide={!summaryList?.length || summaryList?.length === 0}
                onFetchMore={setSize}
            />
        </Box>
    );
};

export default InstanceTable;
