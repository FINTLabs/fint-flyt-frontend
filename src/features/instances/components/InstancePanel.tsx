import * as React from "react";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {GridCellParams} from "@mui/x-data-grid";
import moment from "moment/moment";
import {IEvent} from "../types/Event";
import ErrorDialogComponent from "./ErrorDialogComponent";
import {Box, HStack, Link, Loader, Modal, Pagination, Table} from "@navikt/ds-react";
import {GetIcon} from "../util/InstanceUtils";
import {Button as ButtonAks} from "@navikt/ds-react/esm/button";
import EventRepository from "../../../api/EventRepository";
import {Page} from "../../../util/TableUtil";
import {IError} from "../types/Error";

type Props = {
    id: string;
    instanceId: string;
    sourceApplicationId: string
    onError: (error: IError | undefined) => void;
}

const InstancePanel: React.FunctionComponent<Props> = (props: Props) => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.instances'});
    const [selectedRow, setSelectedRow] = useState<IEvent>();
    const [openErrorDialog, setOpenErrorDialog] = React.useState(false);
    const [page, setPage] = useState(1);
    const [selectedInstances, setSelectedInstances] = useState<Page<IEvent>>()
    const rowsPerPage = 10

    const getSelectedInstances = async (page: number, size: number, sortProperty: string, sortDirection: string, sourceApplicationId: string, instanceId: string) => {
        props.onError(undefined)
        try {
            const eventResponse = await EventRepository.getEventsByInstanceId(page, size, sortProperty, sortDirection, sourceApplicationId, instanceId)
            const events: Page<IEvent> = eventResponse.data;
            if (events) {
                setSelectedInstances(events);
            } else {
                props.onError({message: t('errorMessage')});
                setSelectedInstances({content: []});
            }
        } catch (e) {
            props.onError({message: t('errorMessage')});
            setSelectedInstances({content: []});
            console.error('Error: ', e);
        }
    }
    useEffect(() => {
        getSelectedInstances(page - 1, rowsPerPage, "timestamp", "DESC", props.sourceApplicationId, props.instanceId)
    }, [])


    useEffect(() => {
        setSelectedInstances({content: []})
        getSelectedInstances(page - 1, rowsPerPage, "timestamp", "DESC", props.sourceApplicationId, props.instanceId)
    }, [page, setPage])

    return (
        <>
            <Box id={props.id} padding="4" background={"surface-subtle"} borderRadius="xlarge">
                {selectedInstances && selectedInstances.content.length > 0 ?
                    <Box> {selectedInstances && selectedInstances.content[0] &&
                        <ul>
                            <li>{t('table.column.sourceApplicationIntegrationId')}: {selectedInstances.content[0].instanceFlowHeaders.sourceApplicationIntegrationId}</li>
                            <li>{t('table.column.sourceApplicationInstanceId')}: {selectedInstances.content[0].instanceFlowHeaders.sourceApplicationInstanceId}</li>
                        </ul>
                    }
                        <ErrorAlertDialog row={selectedRow}/>
                        <Table size={"small"}>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell scope="col">{t('table.column.timestamp')}</Table.HeaderCell>
                                    <Table.HeaderCell scope="col">{t('table.column.status')}</Table.HeaderCell>
                                    <Table.HeaderCell
                                        scope="col">{t('table.column.archiveInstanceId')}</Table.HeaderCell>
                                    <Table.HeaderCell scope="col">{t('table.column.configurationId')}</Table.HeaderCell>
                                    <Table.HeaderCell scope="col">{t('table.column.correlationId')}</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {selectedInstances?.content.map((value, i) => {
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
                    </Box> : <Loader/>}
            </Box>
            <HStack justify={"center"}>
                {selectedInstances?.totalElements && selectedInstances.totalElements > rowsPerPage &&
                    <Pagination
                        page={page}
                        onPageChange={setPage}
                        count={selectedInstances?.totalPages ?? 1}
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