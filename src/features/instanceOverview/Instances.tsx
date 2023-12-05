import React, {useContext, useEffect, useState} from 'react';
import {RouteComponent} from "../main/Route";
import {Box, Button, Modal} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import {ArrowCirclepathIcon} from '@navikt/aksel-icons';
import {Button as ButtonAks} from "@navikt/ds-react/esm/button";
import {GridCellParams} from "@mui/x-data-grid";
import ErrorDialogComponent from "./components/ErrorDialogComponent";
import {HistoryContext} from "../../context/HistoryContext";
import {IEvent} from "./types/Event";
import InstanceRepository from "./repository/InstanceRepository";
import InformationTemplate from "../../components/templates/InformationTemplate";
import InstanceTable from "./components/InstanceTable";


const Instances: RouteComponent = () => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.instanceOverview'})
    const {latestInstances, getLatestInstances} = useContext(HistoryContext)
    const [selectedRow, setSelectedRow] = useState<IEvent>();
    const [openDialog, setOpenDialog] = React.useState(false);

    const errorsNotForRetry: string[] = ['instance-receival-error', 'instance-registration-error']
    const [rows, setRows] = useState<IEvent[] | undefined>(latestInstances)
    const [page, setPage] = useState(1);
    const rowsPerPage = 3;

    let sortData = rows ?? [];
    sortData = sortData.slice((page - 1) * rowsPerPage, page * rowsPerPage);


    useEffect(() => {
        getLatestInstances(0, 10000, "timestamp", "DESC");
        setRows(latestInstances)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

    return (
        <InformationTemplate id={'instances'} keyPrefix={'pages.instanceOverview'} wide>
            <Box>
                <Button
                    size={"small"}
                    onClick={() => getLatestInstances(0, 10000, "timestamp", "DESC")}
                    icon={<ArrowCirclepathIcon aria-hidden/>}
                >{t('button.refresh')}
                </Button>
                <InstanceTable/>
            </Box>
            <ErrorAlertDialog row={selectedRow}/>
        </InformationTemplate>
    );
}

export default Instances;