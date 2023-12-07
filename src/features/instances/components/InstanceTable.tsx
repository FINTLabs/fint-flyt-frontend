import {GridCellParams} from "@mui/x-data-grid";
import * as React from "react";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import {Box, HStack, Link, Modal, Pagination, Table} from "@navikt/ds-react";

import moment from "moment";
import {getSourceApplicationDisplayName} from "../../../util/DataGridUtil";
import {IEvent} from "../types/Event";
import {ClassNameMap} from "@mui/styles";
import ErrorDialogComponent from "./ErrorDialogComponent";
import InstancePanel from "./InstancePanel";
import {GetIcon} from "../util/InstanceUtils";
import {Button as ButtonAks} from "@navikt/ds-react/esm/button";
import InstanceRepository from "../repository/InstanceRepository";

type Props = {
    instances: IEvent[] | undefined;
    events: IEvent[] | undefined;
    classes?: ClassNameMap;
}

const InstanceTable: React.FunctionComponent<Props> = (props: Props) => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.instances'})
    const [selectedRow, setSelectedRow] = useState<IEvent>();
    const [openDialog, setOpenDialog] = React.useState(false);
    const [page, setPage] = useState(1);
    const rowsPerPage = 10;
    const errorsNotForRetry: string[] = ['instance-receival-error', 'instance-registration-error']

    let sortData = props.instances ?? [];
    sortData = sortData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    const resend = (instanceId: string) => {
        //TODO: add notification on successful or failed resending
        InstanceRepository.resendInstance(instanceId)
            .then(response => {
                console.log('resend instance', response)
            })
            .catch(e => {
                console.error(e)
            })
    }

    return (
        <Box>
            <Box background={'surface-default'} style={{height: '70vh', overflowY: "scroll"}}>
                <ErrorAlertDialog row={selectedRow}/>
                <Table id={"instance-table"} size={"small"}>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell/>
                            <Table.HeaderCell scope="col">{t('table.column.sourceApplicationId')}</Table.HeaderCell>
                            <Table.HeaderCell scope="col">{t('table.column.sourceApplicationIntegrationIdDisplayName')}</Table.HeaderCell>
                            <Table.HeaderCell scope="col">{t('table.column.timestamp')}</Table.HeaderCell>
                            <Table.HeaderCell scope="col">{t('table.column.status')}</Table.HeaderCell>
                            <Table.HeaderCell scope="col">{t('table.column.actions')}</Table.HeaderCell>
                            <Table.HeaderCell scope="col">{t('table.column.archiveInstanceId')}</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {sortData?.map((value, i) => {
                            return (
                                <Table.ExpandableRow key={i} content={<InstancePanel
                                    instancesOnId={props.events?.filter((event) => event.instanceFlowHeaders.correlationId === value.instanceFlowHeaders.correlationId)}
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
                {props.instances && props.instances.length > rowsPerPage &&
                    <Pagination
                        page={page}
                        onPageChange={setPage}
                        count={Math.ceil(props.instances.length / rowsPerPage)}
                        size="small"
                    />}
            </HStack>
        </Box>
    );

    function ErrorAlertDialog(props: GridCellParams['row']) {
        return (
            <Modal open={openDialog} header={{
                heading: props.row?.errors?.length > 1 ? "Feilmeldinger:" : "Feilmelding:",
                closeButton: false
            }} closeOnBackdropClick>
                <Modal.Body>
                    <ErrorDialogComponent row={props.row}/>
                </Modal.Body>
                <Modal.Footer>
                    <ButtonAks type="button" onClick={() => setOpenDialog(false)}>
                        Lukk
                    </ButtonAks>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default InstanceTable;