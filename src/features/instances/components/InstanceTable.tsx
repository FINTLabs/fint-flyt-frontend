import { GridCellParams } from '@mui/x-data-grid';
import * as React from 'react';
import { ReactElement, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Box, Button, Dropdown, HStack, Loader, Table } from '@navikt/ds-react';
import moment from 'moment';
import { getSourceApplicationDisplayNameById } from '../../../util/TableUtil';
import { IEventNew, ISummary } from '../types/Event';
import ErrorDialogComponent from './ErrorDialogComponent';
import InstancePanel from './InstancePanel';
import { GetIcon } from '../util/InstanceUtils';
import InstanceRepository from '../repository/InstanceRepository';
import { IIntegrationMetadata } from '../../configuration/types/Metadata/IntegrationMetadata';
import { SourceApplicationContext } from '../../../context/SourceApplicationContext';
import { CustomSelect } from '../../../components/organisms/CustomSelect';
import { IAlertMessage, Page } from '../../../components/types/TableTypes';
import { MenuElipsisVerticalCircleIcon } from '@navikt/aksel-icons';
import CustomStatusDialogComponent from './CustomStatusDialogComponent';
import { useFilters } from '../filter/FilterContext';
import InstanceEventRepository from '../../../api/InstanceEventRepository';

interface Props {
    onError: (error: IAlertMessage | undefined) => void;
}

const InstanceTable: React.FunctionComponent<Props> = ({ onError }) => {
    const { t } = useTranslation('translations', { keyPrefix: 'pages.instances' });
    const [selectedRow, setSelectedRow] = useState<IEventNew>();
    const [openErrorDialog, setOpenErrorDialog] = React.useState(false);
    const [openCustomDialog, setOpenCustomDialog] = React.useState(false);
    const [page, setPage] = useState(1);
    // const [sort, setSort] = useState<SortState | undefined>({
    //     orderBy: 'timestamp',
    //     direction: 'descending',
    // });
    const errorsNotForRetry: string[] = ['instance-receival-error', 'instance-registration-error'];
    const [instancesPage, setInstancesPage] = useState<Page<ISummary>>();
    const [rowCount, setRowCount] = useState<string>('10');
    const selectOptions = [
        { value: '', label: t('numberPerPage'), disabled: true },
        {
            value: '10',
            label: '10',
        },
        { value: '25', label: '25' },
        { value: '50', label: '50' },
        { value: '100', label: '100' },
    ];
    const [disabledRetryButtons, setDisabledRetryButtons] = useState(
        new Array(Number(rowCount)).fill(false)
    );
    const { allMetadata } = useContext(SourceApplicationContext);
    const { filters, refreshKey } = useFilters();
    const [loading, setLoading] = useState(true);
    const [hasFilters, setHasFilters] = useState(false);

    useEffect(() => {
        setLoading(true);
        setHasFilters(false);
        if (instancesPage?.totalElements && instancesPage.totalElements < Number(rowCount)) {
            setPage(1);
        }
        setInstancesPage({ content: [] });
        getLatestInstances(rowCount);
    }, [page, setPage, rowCount, refreshKey]);

    const handleRetryButtonClick = (index: number) => {
        const newDisabledButtons = [...disabledRetryButtons];
        newDisabledButtons[index] = true;
        setDisabledRetryButtons(newDisabledButtons);
    };

    const getLatestInstances = async (size: string) => {
        onError(undefined);

        try {
            const eventResponse = await InstanceEventRepository.getLatestEvents(
                Number(size),
                filters
            );

            const events: Page<ISummary> = eventResponse.data;

            if (allMetadata && events) {
                allMetadata.forEach((value: IIntegrationMetadata) => {
                    eventResponse.data.content.forEach((event: ISummary) => {
                        if (
                            event.sourceApplicationIntegrationId ===
                            value.sourceApplicationIntegrationId
                        ) {
                            event.displayName = value.integrationDisplayName;
                        }
                    });
                });

                setInstancesPage(events);
            } else {
                // onError({ message: t('errorMessage') });
                onError({ message: events.content.toString() });
                setInstancesPage({ content: [] });
            }
        } catch (e: any) {
            // onError({ message: t('errorMessage') });

            if (e.response && e.response.status === 422) {
                onError({ message: e.response.data || 'Validation error occurred' });
            } else {
                onError({ message: e.message || 'An unexpected error occurred' });
            }
            setInstancesPage({ content: [] });
            console.error('Error: ', e);
        } finally {
            setLoading(false);
            Object.entries(filters).forEach(([key, value]) => {
                if (value != null && value.length > 0) {
                    setHasFilters(true);
                }
            });
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

    const [expandedRows, setExpandedRows] = useState<number[]>([]);

    const handleToggle = (index: number) => {
        setExpandedRows((prev) =>
            prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        );
    };

    return loading ? (
        <Loader size="large" />
    ) : instancesPage ? (
        <Box>
            <Box background={'surface-default'} style={{ minHeight: '70vh' }}>
                <ErrorAlertDialog row={selectedRow} />
                <CustomStatusDialog row={selectedRow} />
                {instancesPage?.content?.length === 0 ? (
                    <Alert variant="info">{t('filter.alerts.noResults')}</Alert>
                ) : hasFilters ? (
                    <Alert variant="info">{t('filter.alerts.tableFiltered')}</Alert>
                ) : null}

                <Table
                    // sort={sort}
                    // onSortChange={(sortKey) => handleSort(sortKey ? sortKey : 'timestamp')}
                    id={'instance-table'}>
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
                            <Table.ColumnHeader>{t('table.column.status')}</Table.ColumnHeader>
                            <Table.ColumnHeader>{t('table.column.storage')}</Table.ColumnHeader>
                            <Table.ColumnHeader>{t('table.column.actions')}</Table.ColumnHeader>
                            <Table.ColumnHeader>
                                {t('table.column.archiveInstanceId')}
                            </Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {instancesPage?.content?.map((value, i) => {
                            return (
                                <Table.ExpandableRow
                                    key={i}
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
                                    }>
                                    <Table.DataCell scope="row">
                                        {getSourceApplicationDisplayNameById(
                                            String(value.sourceApplicationId)
                                        )}
                                    </Table.DataCell>

                                    <Table.DataCell>{value.displayName}</Table.DataCell>
                                    <Table.DataCell>
                                        {value.sourceApplicationIntegrationId}
                                    </Table.DataCell>
                                    <Table.DataCell>
                                        {value.sourceApplicationInstanceId}
                                    </Table.DataCell>
                                    <Table.DataCell>
                                        {moment(value.latestUpdate).format('DD/MM/YY HH:mm')}
                                    </Table.DataCell>
                                    <Table.DataCell>
                                        {GetIcon(value.status)}

                                        {value.status
                                            ? t(`filter.statusOptions.${value.status.trim()}`)
                                            : null}
                                        {/*TODO: BACKEND send in last error from backend ? */}
                                        {/*{t(value.status)}*/}
                                        {/*{value.status === 'ERROR' && value.errors.length > 0 && (*/}
                                        {/*    <Link*/}
                                        {/*        style={{ cursor: 'pointer' }}*/}
                                        {/*        onClick={() => {*/}
                                        {/*            setSelectedRow(value);*/}
                                        {/*            setOpenErrorDialog(true);*/}
                                        {/*        }}>*/}
                                        {/*        {t('showError')}*/}
                                        {/*    </Link>*/}
                                        {/*)}*/}
                                    </Table.DataCell>
                                    <Table.DataCell>
                                        {value.intermediateStorageStatus
                                            ? t(
                                                  `filter.intermediateStorageStatusOptions.${value.intermediateStorageStatus.trim()}`
                                              )
                                            : null}
                                    </Table.DataCell>

                                    <Table.DataCell>
                                        {value.status === 'FAILED' && actionMenu(value, i)}
                                    </Table.DataCell>
                                    <Table.DataCell>{value.destinationId}</Table.DataCell>
                                </Table.ExpandableRow>
                            );
                        })}
                    </Table.Body>
                </Table>
            </Box>

            <HStack justify={'center'} style={{ marginTop: '16px' }} gap={'10'}>
                {instancesPage.numberOfElements && !(instancesPage.numberOfElements < 10) && (
                    <CustomSelect
                        options={selectOptions}
                        onChange={setRowCount}
                        label={t('numberPerPage')}
                        hideLabel={true}
                        default={rowCount}
                    />
                )}
                {!instancesPage?.last && (
                    <>
                        <Button
                            variant="secondary"
                            onClick={() => setRowCount((prev) => String(Number(prev) * 2))}>
                            {t('filter.loadMore')}
                        </Button>
                    </>
                )}
            </HStack>
        </Box>
    ) : (
        <Loader />
    );

    function actionMenu(event: IEventNew, id: number): ReactElement {
        return (
            <div id={id + '-action-toggle'} className="min-h-32">
                <Dropdown>
                    <Button
                        as={Dropdown.Toggle}
                        variant="tertiary-neutral"
                        icon={<MenuElipsisVerticalCircleIcon aria-hidden />}
                    />
                    <Dropdown.Menu>
                        <Dropdown.Menu.List>
                            <Dropdown.Menu.List.Item
                                id={'retryButton'}
                                disabled={
                                    errorsNotForRetry.includes(event.displayName ?? '') ||
                                    disabledRetryButtons[id]
                                }
                                onClick={() => {
                                    resend(event.sourceApplicationInstanceId);
                                    handleRetryButtonClick(id);
                                }}>
                                {t('retry')}
                            </Dropdown.Menu.List.Item>
                        </Dropdown.Menu.List>
                        {event.intermediateStorageStatus === 'STORED' && (
                            <>
                                <Dropdown.Menu.Divider />
                                <Dropdown.Menu.List>
                                    <Dropdown.Menu.List.Item
                                        id={'statusButton'}
                                        onClick={() => {
                                            setSelectedRow(event);
                                            setOpenCustomDialog(true);
                                        }}>
                                        {t('customStatus')}
                                    </Dropdown.Menu.List.Item>
                                </Dropdown.Menu.List>
                            </>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        );
    }

    function ErrorAlertDialog(props: GridCellParams['row']) {
        return (
            <ErrorDialogComponent
                open={openErrorDialog}
                row={props.row}
                setOpenErrorDialog={setOpenErrorDialog}
            />
        );
    }

    function CustomStatusDialog(props: GridCellParams['row']) {
        return (
            <>
                {props.row && (
                    <CustomStatusDialogComponent
                        open={openCustomDialog}
                        row={props.row}
                        setOpenCustomDialog={setOpenCustomDialog}
                    />
                )}
            </>
        );
    }
};

export default InstanceTable;
