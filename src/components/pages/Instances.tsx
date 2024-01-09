import React, {useContext, useEffect, useState} from 'react';
import {Box, Button, Heading, HelpText, HStack, Loader, Modal} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import {ArrowCirclepathIcon} from '@navikt/aksel-icons';
import {Button as ButtonAks} from "@navikt/ds-react/esm/button";
import {GridCellParams} from "@mui/x-data-grid";
import ErrorDialogComponent from "../../features/instances/components/ErrorDialogComponent";
import {HistoryContext} from "../../context/HistoryContext";
import {IEvent} from "../../features/instances/types/Event";
import PageTemplate from "../templates/PageTemplate";
import InstanceTable from "../../features/instances/components/InstanceTable";
import {RouteComponent} from "../../routes/Route";

const Instances: RouteComponent = () => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.instances'})
    const {latestInstances, getLatestInstances, events, getEvents} = useContext(HistoryContext)
    const [selectedRow] = useState<IEvent>();
    const [openDialog, setOpenDialog] = React.useState(false);

    useEffect(() => {
        getLatestInstances(0, 1000, "timestamp", "DESC");
        getEvents(0, 1000, "timestamp", "DESC")
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function ErrorAlertDialog(props: GridCellParams['row']) {
        return (
            <Modal open={openDialog} header={{
                heading: props.row?.errors?.length > 1 ? t('errors') : t('oneError'),
                closeButton: false
            }} closeOnBackdropClick>
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

    return (
        <PageTemplate id={'instances'} keyPrefix={'pages.instances'} customHeading>
            <HStack id={'instances-custom-header'} justify={"space-between"} wrap={false}>
                <HStack align={"center"} gap={"2"} wrap={false}>
                    <Heading size={"medium"}>{t('header')}</Heading>
                    <HelpText title={"Hva er dette"} placement="bottom">
                        {t('help.header')}
                    </HelpText>
                </HStack>
                <Button
                    size={"small"}
                    onClick={() => {
                        getLatestInstances(0, 1000, "timestamp", "DESC")
                        getEvents(0, 1000, "timestamp", "DESC")
                    }}
                    icon={<ArrowCirclepathIcon aria-hidden/>}
                >{t('button.refresh')}
                </Button>
            </HStack>
            <Box id={"instance-table-container"} background={"surface-default"} padding="6" borderRadius={"large"}
                 borderWidth="2" borderColor={"border-subtle"}>
                {latestInstances && events ?
                    <InstanceTable instances={latestInstances} events={events}/>
                    :
                    <>
                        <Loader size={"xlarge"}/>
                    </>
                }
            </Box>
            <ErrorAlertDialog row={selectedRow}/>
        </PageTemplate>
    );
}

export default Instances;