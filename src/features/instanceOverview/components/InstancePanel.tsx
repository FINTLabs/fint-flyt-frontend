import * as React from "react";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {GridCellParams} from "@mui/x-data-grid";
import moment from "moment/moment";
import {IEvent} from "../types/Event";
import ErrorDialogComponent from "./ErrorDialogComponent";
import {Box, Link, Modal, Table} from "@navikt/ds-react";
import SourceApplicationRepository from "../../../shared/repositories/SourceApplicationRepository";
import {IIntegrationMetadata} from "../../configuration/types/Metadata/IntegrationMetadata";
import EventRepository from "../../../shared/repositories/EventRepository";
import {processEvents} from "../../../util/EventUtil";
import {GetIcon} from "../util/InstanceUtils";
import {Button as ButtonAks} from "@navikt/ds-react/esm/button";

type Props = {
    instanceId: string;
    sourceApplicationId: string;
}

const InstancePanel: React.FunctionComponent<Props> = (props: Props) => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.instanceOverview'});
    const [selectedRow, setSelectedRow] = useState<IEvent>();
    const [instances, setInstances] = useState<IEvent[]>([])
    const [openErrorDialog, setOpenErrorDialog] = React.useState(false);
    const errorsNotForRetry: string[] = ['instance-receival-error', 'instance-registration-error']


    useEffect(() => {
        getSelectedInstances(0, 10000, "timestamp", "DESC", props.sourceApplicationId, props.instanceId)
    }, [])


    const getSelectedInstances = async (page: number, size: number, sortProperty: string, sortDirection: string, sourceApplicationId: string, instanceId: string) => {
        if (sourceApplicationId && instanceId) {
            try {
                const metadataResponse = await SourceApplicationRepository.getMetadata(sourceApplicationId, true)
                const metadata: IIntegrationMetadata[] = metadataResponse.data;
                const eventResponse = await EventRepository.getEventsByInstanceId(page, size, sortProperty, sortDirection, sourceApplicationId, instanceId)
                const events: IEvent[] = eventResponse.data.content;

                if (events && metadata) {
                    const processedEvents = processEvents(events, metadata)
                    setInstances(processedEvents);
                } else {
                    setInstances([]);
                }
            } catch (e) {
                setInstances([]);
                console.error('Error: ', e);
            }
        } else {
            setInstances([]);
        }
    }

    return (
        <Box padding="4" background={"surface-subtle"} borderRadius="xlarge">
            <ErrorAlertDialog row={selectedRow}/>
            <Table size={"small"}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope="col">Kildeapplikasjon integrasjon ID</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Konfigurasjon ID</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Tidspunkt</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Status</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Kildeapplikasjons instans ID</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Destinasjons ID</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {instances?.map((value, i) => {
                        return (
                            <Table.Row key={i}>
                                <Table.DataCell>{value.instanceFlowHeaders.sourceApplicationIntegrationId}</Table.DataCell>
                                <Table.DataCell>{value.instanceFlowHeaders.configurationId}</Table.DataCell>
                                <Table.DataCell>{moment(value.timeStamp).format('DD/MM/YY HH:mm')}</Table.DataCell>
                                <Table.DataCell>
                                    {GetIcon(value)}
                                    {t(value.name)} {" "}
                                    {(value.type === 'ERROR') && !errorsNotForRetry.includes(value.name) &&
                                        <Link style={{cursor: "pointer"}} onClick={() => {
                                            setSelectedRow(value);
                                            setOpenErrorDialog(true)
                                        }
                                        }>vis feilmelding</Link>
                                    }
                                </Table.DataCell>
                                <Table.DataCell>{value.instanceFlowHeaders.sourceApplicationInstanceId}</Table.DataCell>
                                <Table.DataCell>{value.instanceFlowHeaders.archiveInstanceId}</Table.DataCell>
                            </Table.Row>
                        );
                    })}
                </Table.Body>
            </Table>
        </Box>
    );

    function ErrorAlertDialog(props: GridCellParams['row']) {
        return (
            <Modal open={openErrorDialog} header={{
                heading: props.row?.errors?.length > 1 ? "Feilmeldinger:" : "Feilmelding:",
                closeButton: false
            }} closeOnBackdropClick>
                <Modal.Body>
                    <ErrorDialogComponent row={props.row}/>
                </Modal.Body>
                <Modal.Footer>
                    <ButtonAks type="button" onClick={() => setOpenErrorDialog(false)}>
                        Lukk
                    </ButtonAks>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default InstancePanel;