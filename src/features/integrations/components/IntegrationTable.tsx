import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import {
    getDestinationDisplayName,
    getSourceApplicationDisplayNameById,
    getStateDisplayName,
    integrationComparator,
} from '../../../util/TableUtil';
import { Box, HStack, Loader, Pagination, SortState, Table } from '@navikt/ds-react';
import IntegrationPanel from './IntegrationPanel';
import { useTranslation } from 'react-i18next';
import InstanceFlowTrackingRepository from '../../../api/InstanceFlowTrackingRepository';
import IntegrationRepository from '../../../api/IntegrationRepository';
import { IIntegration, IIntegrationStatistics } from '../../integration/types/Integration';
import { IIntegrationMetadata } from '../../configuration/types/Metadata/IntegrationMetadata';
import { SourceApplicationContext } from '../../../context/SourceApplicationContext';
import { CustomSelect } from '../../../components/organisms/CustomSelect';
import { IAlertMessage, Page } from '../../../components/types/TableTypes';
import { IIntegrationDetailedStatistics } from '../../instances/types/Event';

type IntegrationProps = {
    id: string;
    onError: (error: IAlertMessage | undefined) => void;
};
const IntegrationTable: React.FunctionComponent<IntegrationProps> = (props: IntegrationProps) => {
    const { t } = useTranslation('translations', { keyPrefix: 'pages.integrations' });
    const [page, setPage] = useState(1);
    const [integrations, setIntegrations] = useState<Page<IIntegration> | undefined>();
    const [sort, setSort] = useState<SortState | undefined>({
        orderBy: 'state',
        direction: 'ascending',
    });
    const [rowCount, setRowCount] = useState<string>('10');
    const { allMetadata } = useContext(SourceApplicationContext);
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
    const [detailedStats, setDetailedStats] = useState<IIntegrationDetailedStatistics[]>([]);

    useEffect(() => {
        if (integrations?.totalElements && integrations.totalElements < Number(rowCount)) {
            setPage(1);
        }
        setIntegrations({ content: [] });
        getAllIntegrations(rowCount, sort);
    }, [page, setPage, sort, rowCount]);

    const getAllIntegrations = async (rowCount: string, sort?: SortState) => {
        props.onError(undefined);
        if (allMetadata) {
            try {
                // Get statistics
                const statsResponse = await InstanceFlowTrackingRepository.getStatistics();
                const data = statsResponse.data;

                // Get detailed statistics
                const detailedStatsResponse =
                    await InstanceFlowTrackingRepository.getDetailedStatistics();
                setDetailedStats(detailedStatsResponse.data.content);

                if (data) {
                    const stats = data.content;

                    const integrationResponse = await IntegrationRepository.getIntegrations(
                        page - 1,
                        Number(rowCount),
                        sort ? sort.orderBy : 'state',
                        sort ? (sort.direction === 'ascending' ? 'ASC' : 'DESC') : 'ASC'
                    );
                    const mergedList = integrationResponse.data || [];

                    stats.forEach((value: IIntegrationStatistics) => {
                        mergedList.content.forEach((integration: IIntegration) => {
                            if (
                                integration.sourceApplicationIntegrationId ===
                                value.sourceApplicationIntegrationId
                            ) {
                                integration.errors = value.currentErrors;
                                integration.dispatched = value.dispatchedInstances;
                                integration.total = value.totalInstances;
                            }
                        });
                    });

                    allMetadata.forEach((value: IIntegrationMetadata) => {
                        mergedList.content.forEach((integration: IIntegration) => {
                            if (
                                integration.sourceApplicationIntegrationId ===
                                value.sourceApplicationIntegrationId
                            ) {
                                integration.displayName = value.integrationDisplayName;
                            }
                        });
                    });

                    const sortedData: IIntegration[] = mergedList.content
                        .slice()
                        .sort((a: IIntegration, b: IIntegration) => {
                            if (sort) {
                                return sort.direction === 'ascending'
                                    ? integrationComparator(b, a, sort.orderBy)
                                    : integrationComparator(a, b, sort.orderBy);
                            }
                            return 1;
                        });
                    setIntegrations({ ...mergedList, content: sortedData });
                }
            } catch (e) {
                props.onError({ message: t('errorMessage') });
                console.error('Error: ', e);
                setIntegrations({ content: [] });
            }
        }
    };

    const handleSort = (sortKey: string) => {
        setSort((prevSort) => {
            return prevSort && sortKey === prevSort.orderBy && prevSort.direction === 'descending'
                ? undefined
                : {
                      orderBy: sortKey,
                      direction:
                          prevSort &&
                          sortKey === prevSort.orderBy &&
                          prevSort.direction === 'ascending'
                              ? 'descending'
                              : 'ascending',
                  };
        });
    };

    return integrations ? (
        <Box>
            <Box background={'surface-default'} style={{ minHeight: '70vh' }}>
                <Table
                    sort={sort}
                    onSortChange={(sortKey) => handleSort(sortKey ? sortKey : 'id')}
                    id={props.id}>
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeader />
                            <Table.ColumnHeader sortKey="id" sortable>
                                {t('table.column.id')}
                            </Table.ColumnHeader>
                            <Table.ColumnHeader>
                                {t('table.column.sourceApplicationId')}
                            </Table.ColumnHeader>
                            <Table.ColumnHeader sortKey="sourceApplicationIntegrationId" sortable>
                                {t('table.column.sourceApplicationIntegrationId')}
                            </Table.ColumnHeader>
                            <Table.ColumnHeader>
                                {t('table.column.sourceApplicationIntegrationIdDisplayName')}
                            </Table.ColumnHeader>
                            <Table.ColumnHeader>{t('table.column.destination')}</Table.ColumnHeader>
                            <Table.ColumnHeader sortKey="state" sortable>
                                {t('table.column.state')}
                            </Table.ColumnHeader>
                            {/*<Table.ColumnHeader>{t('table.column.dispatched')}</Table.ColumnHeader>*/}
                            {/*<Table.ColumnHeader>{t('table.column.errors')}</Table.ColumnHeader>*/}
                            <Table.ColumnHeader>{t('table.column.total')}</Table.ColumnHeader>
                            <Table.ColumnHeader>{t('table.column.inProgress')}</Table.ColumnHeader>
                            <Table.ColumnHeader>{t('table.column.transferred')}</Table.ColumnHeader>
                            <Table.ColumnHeader>{t('table.column.aborted')}</Table.ColumnHeader>
                            <Table.ColumnHeader>{t('table.column.failed')}</Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {integrations?.content?.map((value, i) => {
                            const stats = detailedStats.find(
                                (stat) => stat.integrationId === value.id
                            );
                            return (
                                <Table.ExpandableRow
                                    expandOnRowClick
                                    key={i}
                                    content={
                                        <IntegrationPanel
                                            id={'panel-' + i}
                                            onError={(error) => {
                                                props.onError(error);
                                            }}
                                            integration={value}
                                        />
                                    }>
                                    <Table.DataCell>{value.id}</Table.DataCell>
                                    <Table.DataCell scope="row">
                                        {getSourceApplicationDisplayNameById(
                                            String(value.sourceApplicationId)
                                        )}
                                    </Table.DataCell>
                                    <Table.DataCell>
                                        {value.sourceApplicationIntegrationId}
                                    </Table.DataCell>
                                    <Table.DataCell>{value.displayName}</Table.DataCell>
                                    <Table.DataCell>
                                        {getDestinationDisplayName(value.destination ?? '')}
                                    </Table.DataCell>
                                    <Table.DataCell>
                                        {getStateDisplayName(value.state ?? '')}
                                    </Table.DataCell>
                                    {/*<Table.DataCell>{value.dispatched}</Table.DataCell>*/}
                                    {/*<Table.DataCell>{value.errors}</Table.DataCell>*/}
                                    {/*<Table.DataCell>{value.total}</Table.DataCell>*/}
                                    <Table.DataCell align={'center'}>
                                        {stats?.total || '-'}
                                    </Table.DataCell>
                                    <Table.DataCell align={'center'}>
                                        {stats?.inProgress || '-'}
                                    </Table.DataCell>
                                    <Table.DataCell align={'center'}>
                                        {stats?.transferred || '-'}
                                    </Table.DataCell>
                                    <Table.DataCell align={'center'}>
                                        {stats?.aborted || '-'}
                                    </Table.DataCell>
                                    <Table.DataCell align={'center'}>
                                        {stats?.failed || '-'}
                                    </Table.DataCell>
                                </Table.ExpandableRow>
                            );
                        })}
                    </Table.Body>
                </Table>
            </Box>
            <HStack justify={'center'} style={{ marginTop: '16px' }}>
                {integrations?.totalElements !== undefined && (
                    <CustomSelect
                        options={selectOptions}
                        onChange={setRowCount}
                        label={t('numberPerPage')}
                        hideLabel={true}
                        default={rowCount}
                    />
                )}
                {integrations?.totalElements !== undefined &&
                    integrations?.totalElements > Number(rowCount) && (
                        <Pagination
                            page={page}
                            onPageChange={setPage}
                            count={integrations?.totalPages ?? 1}
                            size="small"
                        />
                    )}
            </HStack>
        </Box>
    ) : (
        <Loader size={'xlarge'} />
    );
};

export default IntegrationTable;
