import * as React from "react";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import {GridCellParams} from "@mui/x-data-grid";
import moment from "moment/moment";
import {IEvent} from "../types/Event";
import ErrorDialogComponent from "./ErrorDialogComponent";
import {Box, Link, Modal, Table} from "@navikt/ds-react";
import {GetIcon} from "../util/InstanceUtils";
import {Button as ButtonAks} from "@navikt/ds-react/esm/button";

type Props = {
    instancesOnId: IEvent[] | undefined;
}

const InstancePanel: React.FunctionComponent<Props> = (props: Props) => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.instanceOverview'});
    const [selectedRow, setSelectedRow] = useState<IEvent>();
    const [openErrorDialog, setOpenErrorDialog] = React.useState(false);

    return (
        <Box id={"instance-panel"} padding="4" background={"surface-subtle"} borderRadius="xlarge">
            {props.instancesOnId && props.instancesOnId[0] &&
                <ul>
                    <li>Kildeapplikasjon integrasjon
                        ID: {props.instancesOnId[0].instanceFlowHeaders.sourceApplicationIntegrationId}</li>
                    <li>Kildeapplikasjons instans
                        ID: {props.instancesOnId[0].instanceFlowHeaders.sourceApplicationInstanceId}</li>
                </ul>
            }
            <ErrorAlertDialog row={selectedRow}/>
            <Table size={"small"}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope="col">Tidspunkt</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Status</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Destinasjons ID</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Konfigurasjon ID</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {props.instancesOnId?.map((value, i) => {
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
                                        }>vis feilmelding</Link>
                                    }
                                </Table.DataCell>
                                <Table.DataCell>{value.instanceFlowHeaders.archiveInstanceId}</Table.DataCell>
                                <Table.DataCell>{value.instanceFlowHeaders.configurationId}</Table.DataCell>
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