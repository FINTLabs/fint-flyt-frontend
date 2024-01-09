import * as React from "react";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {GridCellParams} from "@mui/x-data-grid";
import moment from "moment/moment";
import {IEvent} from "../types/Event";
import ErrorDialogComponent from "./ErrorDialogComponent";
import {Box, HStack, Link, Modal, Pagination, Table} from "@navikt/ds-react";
import {GetIcon} from "../util/InstanceUtils";
import {Button as ButtonAks} from "@navikt/ds-react/esm/button";
import SourceApplicationRepository from "../../../api/SourceApplicationRepository";
import {IIntegrationMetadata} from "../../configuration/types/Metadata/IntegrationMetadata";
import EventRepository from "../../../api/EventRepository";
import {processEvents} from "../../../util/EventUtil";

type Props = {
    instanceId: string;
    sourceApplicationId: string
}

const InstancePanel: React.FunctionComponent<Props> = (props: Props) => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.instances'});
    const [selectedRow, setSelectedRow] = useState<IEvent>();
    const [openErrorDialog, setOpenErrorDialog] = React.useState(false);
    const [page, setPage] = useState(1);
    const [selectedInstances, setSelectedInstances] = useState<IEvent[] | undefined>([])

    const rowsPerPage = 10;

    let sortData = selectedInstances ?? [];
    sortData = sortData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    const getSelectedInstances = async (page: number, size: number, sortProperty: string, sortDirection: string, sourceApplicationId: string, instanceId: string) => {
        try {
            const metadataResponse = await SourceApplicationRepository.getMetadata(sourceApplicationId, true)
            const metadata: IIntegrationMetadata[] = metadataResponse.data;
            const eventResponse = await EventRepository.getEventsByInstanceId(page, size, sortProperty, sortDirection, sourceApplicationId, instanceId)
            const events: IEvent[] = eventResponse.data.content;
            if (events && metadata) {
                const processedEvents = processEvents(eventResponse.data, metadata)
                setSelectedInstances(processedEvents.content);
            } else {
                setSelectedInstances([]);
            }
        }
        catch (e) {
            setSelectedInstances([]);
            console.error('Error: ', e);
        }
    }

    useEffect(() => {
        getSelectedInstances(page-1, 8, "timestamp", "DESC", props.sourceApplicationId, props.instanceId)
    }, [])

    return (
        <>
        <Box id={"instance-panel"} padding="4" background={"surface-subtle"} borderRadius="xlarge">
            {selectedInstances && selectedInstances[0] &&
                <ul>
                    <li>{t('table.column.sourceApplicationIntegrationId')}: {selectedInstances[0].instanceFlowHeaders.sourceApplicationIntegrationId}</li>
                    <li>{t('table.column.sourceApplicationInstanceId')}: {selectedInstances[0].instanceFlowHeaders.sourceApplicationInstanceId}</li>
                </ul>
            }
            <ErrorAlertDialog row={selectedRow}/>
            <Table size={"small"}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope="col">{t('table.column.timestamp')}</Table.HeaderCell>
                        <Table.HeaderCell scope="col">{t('table.column.status')}</Table.HeaderCell>
                        <Table.HeaderCell scope="col">{t('table.column.archiveInstanceId')}</Table.HeaderCell>
                        <Table.HeaderCell scope="col">{t('table.column.configurationId')}</Table.HeaderCell>
                        <Table.HeaderCell scope="col">{t('table.column.correlationId')}</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {sortData.map((value, i) => {
                        return (
                            <Table.Row key={i}>
                                <Table.DataCell>{moment(value.timestamp).format('DD/MM/YY HH:mm')}</Table.DataCell>
                                <Table.DataCell>
                                    {GetIcon(value)}
                                    {t(value.name)} {" "}
                                    {(value.type === 'ERROR') &&
                                        <Link style={{cursor: "pointer"}} onClick={() => {
                                            setSelectedRow(value);
                                            setOpenErrorDialog(true)
                                        }
                                        }>{t('showError')}</Link>
                                    }
                                </Table.DataCell>
                                <Table.DataCell>{value.instanceFlowHeaders.archiveInstanceId}</Table.DataCell>
                                <Table.DataCell>{value.instanceFlowHeaders.configurationId}</Table.DataCell>
                                <Table.DataCell>{value.instanceFlowHeaders.correlationId}</Table.DataCell>
                            </Table.Row>
                        );
                    })}
                </Table.Body>
            </Table>
        </Box>
    <HStack justify={"center"}>
        {selectedInstances && selectedInstances.length > rowsPerPage &&
            <Pagination
                page={page}
                onPageChange={setPage}
                count={Math.ceil(selectedInstances.length / rowsPerPage)}
                size="small"
            />}
    </HStack>
    </>
    );

    function ErrorAlertDialog(props: GridCellParams['row']) {
        return (
            <Modal open={openErrorDialog} header={{
                heading: props.row?.errors?.length > 1 ? t('errors') : t('oneError'),
                closeButton: false
            }}>
                <Modal.Body>
                    <ErrorDialogComponent row={props.row}/>
                </Modal.Body>
                <Modal.Footer>
                    <ButtonAks type="button" onClick={() => setOpenErrorDialog(false)}>
                        {t('button.close')}
                    </ButtonAks>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default InstancePanel;