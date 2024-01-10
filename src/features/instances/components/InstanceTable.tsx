import {GridCellParams} from "@mui/x-data-grid";
import * as React from "react";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Box, HStack, Link, Loader, Modal, Pagination, Table} from "@navikt/ds-react";

import moment from "moment";
import {getSourceApplicationDisplayName, Page} from "../../../util/DataGridUtil";
import {IEvent} from "../types/Event";
import ErrorDialogComponent from "./ErrorDialogComponent";
import InstancePanel from "./InstancePanel";
import {GetIcon} from "../util/InstanceUtils";
import {Button as ButtonAks} from "@navikt/ds-react/esm/button";
import InstanceRepository from "../repository/InstanceRepository";
import EventRepository from "../../../api/EventRepository";
import {sourceApplications} from "../../configuration/defaults/DefaultValues";
import SourceApplicationRepository from "../../../api/SourceApplicationRepository";
import {processEvents} from "../../../util/EventUtil";
import {IIntegrationMetadata} from "../../configuration/types/Metadata/IntegrationMetadata";


const InstanceTable: React.FunctionComponent = () => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.instances'})
    const [selectedRow, setSelectedRow] = useState<IEvent>();
    const [openDialog, setOpenDialog] = React.useState(false);
    const [page, setPage] = useState(1);
    const errorsNotForRetry: string[] = ['instance-receival-error', 'instance-registration-error']
    const [instancesPage, setInstancesPage] = useState<Page<IEvent>>()
    const rowsPerPage = 8

    useEffect(() => {
        getLatestInstances(page-1, rowsPerPage, "timestamp", "DESC");
    }, [])

    const getLatestInstances = async (page: number, size: number, sortProperty: string, sortDirection: string) => {
        try {
            const allMetadata = []

            for (const sourceApplication of sourceApplications) {
                const metadataResponse = await SourceApplicationRepository.getMetadata(sourceApplication.value, true);
                allMetadata.push(metadataResponse.data)
            }

            const metadata = allMetadata.reduce((acc, currentArray) => [...acc, ...currentArray], []) || [];

            const eventResponse = await EventRepository.getLatestEvents(page, size, sortProperty, sortDirection)
            const events: Page<IEvent> = eventResponse.data;
            if (metadata && events) {
                const processedEvents = processEvents(events, metadata)
                metadata.forEach((value: IIntegrationMetadata) => {
                    processedEvents.content.forEach((event: IEvent) => {
                        if (event.instanceFlowHeaders.sourceApplicationIntegrationId === value.sourceApplicationIntegrationId) {
                            event.displayName = value.integrationDisplayName;
                        }
                    });
                });
                setInstancesPage(processedEvents);
            } else {
                setInstancesPage({content: []});
            }
        }
        catch (e) {
            setInstancesPage({content: []});
            console.error('Error: ', e);
        }


    }

    useEffect(() => {
        setInstancesPage({content: []})
        getLatestInstances(page-1, rowsPerPage, "timestamp", "DESC");
    }, [page, setPage])


    const resend = (instanceId: string) => {
        InstanceRepository.resendInstance(instanceId)
            .then(response => {
                console.log('resend instance', response)
            })
            .catch(e => {
                console.error(e)
            })
    }

    return instancesPage && instancesPage?.content?.length > 0 ? (
        <Box>
            <Box background={'surface-default'} style={{height: '70vh', overflowY: "scroll"}}>
                <ErrorAlertDialog row={selectedRow}/>
                <Table id={"instance-table"}>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell/>
                            <Table.HeaderCell scope="col">{t('table.column.sourceApplicationId')}</Table.HeaderCell>
                            <Table.HeaderCell
                                scope="col">{t('table.column.sourceApplicationIntegrationIdDisplayName')}</Table.HeaderCell>
                            <Table.HeaderCell scope="col">{t('table.column.timestamp')}</Table.HeaderCell>
                            <Table.HeaderCell scope="col">{t('table.column.status')}</Table.HeaderCell>
                            <Table.HeaderCell scope="col">{t('table.column.actions')}</Table.HeaderCell>
                            <Table.HeaderCell scope="col">{t('table.column.archiveInstanceId')}</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {instancesPage?.content?.map((value, i) => {
                            return (
                                <Table.ExpandableRow key={i} content={<InstancePanel
                                    id={'instance-panel-' + i}
                                    instanceId={value.instanceFlowHeaders.sourceApplicationInstanceId}
                                    sourceApplicationId={value.instanceFlowHeaders.sourceApplicationId}
                                />}>
                                    <Table.DataCell
                                        scope="row">{getSourceApplicationDisplayName(Number(value.instanceFlowHeaders.sourceApplicationId))}</Table.DataCell>
                                    <Table.DataCell>{value.displayName}</Table.DataCell>
                                    <Table.DataCell>{moment(value.timestamp).format('DD/MM/YY HH:mm')}</Table.DataCell>
                                    <Table.DataCell>
                                        {GetIcon(value)}
                                        {t(value.name)} {" "}
                                        {(value.type === 'ERROR') &&
                                            <Link style={{cursor: "pointer"}}
                                                  onClick={() => {
                                                      setSelectedRow(value);
                                                      setOpenDialog(true)
                                                  }}>
                                                {t('showError')}</Link>
                                        }
                                    </Table.DataCell>
                                    <Table.DataCell>
                                        {(value.type === 'ERROR') && !errorsNotForRetry.includes(value.name) &&
                                            <ButtonAks id={'retry-btn-' + value.id} size="small" onClick={() => {
                                                resend(value.instanceFlowHeaders.instanceId);
                                            }}>{t('button.retry')}</ButtonAks>
                                        }
                                    </Table.DataCell>
                                    <Table.DataCell>{value.instanceFlowHeaders.archiveInstanceId}</Table.DataCell>
                                </Table.ExpandableRow>
                            );
                        })}
                    </Table.Body>
                </Table>
            </Box>
            <HStack justify={"center"}>
                {instancesPage?.totalElements && instancesPage?.totalElements > rowsPerPage &&
                    <Pagination
                        page={page}
                        onPageChange={setPage}
                        count={instancesPage?.totalPages ?? 1}
                        size="small"
                    />}
            </HStack>
        </Box>
    ) : <Loader/>;

    function ErrorAlertDialog(props: GridCellParams['row']) {
        return (
            <Modal open={openDialog} header={{
                heading: props.row?.errors?.length > 1 ? "Feilmeldinger:" : "Feilmelding:",
                closeButton: false
            }}>
                <Modal.Body>
                    <ErrorDialogComponent row={props.row}/>
                </Modal.Body>
                <Modal.Footer>
                    <ButtonAks type="button" onClick={() => setOpenDialog(false)}>
                        {t('button.close')}
                    </ButtonAks>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default InstanceTable;