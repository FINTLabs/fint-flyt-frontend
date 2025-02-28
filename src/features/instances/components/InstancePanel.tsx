import * as React from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GridCellParams } from '@mui/x-data-grid';
import moment from 'moment/moment';
import { IInstanceFlowTracking, IInstanceFlowTrackingResponse } from '../types/Event';
import ErrorDialogComponent from './ErrorDialogComponent';
import { Box, Button, HStack, Link, Loader, Table } from '@navikt/ds-react';
import { GetIcon } from '../util/InstanceUtils';
import { IAlertMessage } from '../../../components/types/TableTypes';
import InstanceEventRepository from '../../../api/InstanceEventRepository';

type Props = {
    id: string;
    instanceId: string;
    sourceApplicationId: number;
    sourceApplicationIntegrationId: string;
    onError: (error: IAlertMessage | undefined) => void;
};

const InstancePanel: React.FunctionComponent<Props> = (props: Props) => {
    const { t } = useTranslation('translations', { keyPrefix: 'pages.instances' });
    const [selectedRow, setSelectedRow] = useState<IInstanceFlowTracking>();
    const [openErrorDialog, setOpenErrorDialog] = React.useState(false);
    const [page, setPage] = useState(1);
    const [selectedInstances, setSelectedInstances] = useState<IInstanceFlowTrackingResponse>();
    const rowsPerPage = 10;
    const [rowCount, setRowCount] = useState<string>('10');

    useEffect(() => {
        // setSelectedInstances({ content: [] });

        if (
            selectedInstances?.totalElements &&
            selectedInstances.totalElements < Number(rowCount)
        ) {
            setPage(1);
        }
        getSelectedInstances(
            rowCount,
            'timestamp',
            'DESC',
            props.sourceApplicationId,
            props.instanceId,
            props.sourceApplicationIntegrationId
        );
    }, [rowCount]);

    const getSelectedInstances = async (
        rowCount: string,
        sortProperty: string,
        sortDirection: string,
        sourceApplicationId: number,
        instanceId: string,
        sourceApplicationIntegrationId: string
    ) => {
        props.onError(undefined);
        try {
            const eventResponse = await InstanceEventRepository.getEventsByInstanceId(
                rowCount,
                sortProperty,
                sortDirection,
                sourceApplicationIntegrationId,
                sourceApplicationId,
                instanceId
            );

            // const events: Page<IEvent> = eventResponse.data;
            const events = eventResponse.data;
            if (events) {
                setSelectedInstances(events);
            } else {
                props.onError({ message: t('errorMessage') });
                // setSelectedInstances({ content: [] });
            }
        } catch (e) {
            props.onError({ message: t('errorMessage') });
            // setSelectedInstances({ content: [] });
            console.error('Error: ', e);
        }
    };

    return (
        <>
            <Box id={props.id} padding="4" background={'surface-subtle'} borderRadius="xlarge">
                {selectedInstances && selectedInstances.content.length > 0 ? (
                    <Box>
                        <ErrorAlertDialog row={selectedRow} />
                        <Table size={'small'}>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell scope="col">
                                        {t('table.column.timestamp')}
                                    </Table.HeaderCell>
                                    <Table.HeaderCell scope="col">
                                        {t('table.column.status')}
                                    </Table.HeaderCell>
                                    <Table.HeaderCell scope="col">
                                        {t('table.column.archiveInstanceId')}
                                    </Table.HeaderCell>
                                    <Table.HeaderCell scope="col">
                                        {t('table.column.configurationId')}
                                    </Table.HeaderCell>
                                    <Table.HeaderCell scope="col">
                                        {t('table.column.correlationId')}
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {selectedInstances?.content.map((value, i) => {
                                    return (
                                        <Table.Row key={i}>
                                            <Table.DataCell>
                                                {moment(value.timestamp).format('DD/MM/YY HH:mm')}
                                            </Table.DataCell>
                                            <Table.DataCell>
                                                {GetIcon(value.type)}
                                                {t(`filter.associatedEventNames.${value.category}`)}
                                                {value.type === 'ERROR' && (
                                                    <Link
                                                        style={{ cursor: 'pointer' }}
                                                        onClick={() => {
                                                            setSelectedRow(value);
                                                            setOpenErrorDialog(true);
                                                        }}>
                                                        {t('showError')}
                                                    </Link>
                                                )}
                                            </Table.DataCell>
                                            <Table.DataCell>
                                                {value.instanceFlowHeaders.archiveInstanceId}
                                            </Table.DataCell>
                                            <Table.DataCell>
                                                {value.instanceFlowHeaders.configurationId}
                                            </Table.DataCell>
                                            <Table.DataCell>
                                                {value.instanceFlowHeaders.correlationId}
                                            </Table.DataCell>
                                        </Table.Row>
                                    );
                                })}
                            </Table.Body>
                        </Table>
                    </Box>
                ) : (
                    <Loader />
                )}
            </Box>
            <HStack justify={'center'}>
                {/*{selectedInstances?.totalElements &&*/}
                {/*    selectedInstances.totalElements > rowsPerPage && (*/}
                {/*        <Pagination*/}
                {/*            page={page}*/}
                {/*            onPageChange={setPage}*/}
                {/*            count={selectedInstances?.totalPages ?? 1}*/}
                {/*            size="small"*/}
                {/*        />*/}
                {/*    )}*/}
                {!selectedInstances?.last && (
                    <>
                        <Button
                            variant="secondary"
                            size={'xsmall'}
                            onClick={() => setRowCount((prev) => String(Number(prev) + 10))}>
                            {t('filter.loadMore')}
                        </Button>
                    </>
                )}
            </HStack>
        </>
    );

    function ErrorAlertDialog(props: GridCellParams['row']) {
        return (
            <ErrorDialogComponent
                open={openErrorDialog}
                setOpenErrorDialog={setOpenErrorDialog}
                row={props.row}
            />
        );
    }
};

export default InstancePanel;
