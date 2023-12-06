import React, {useContext, useEffect, useState} from 'react';
import {RouteComponent} from "../../features/main/Route";
import {Box, Button, Heading, HelpText, HStack, Modal} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import {ArrowCirclepathIcon} from '@navikt/aksel-icons';
import {Button as ButtonAks} from "@navikt/ds-react/esm/button";
import {GridCellParams} from "@mui/x-data-grid";
import ErrorDialogComponent from "../../features/instanceOverview/components/ErrorDialogComponent";
import {HistoryContext} from "../../context/HistoryContext";
import {IEvent} from "../../features/instanceOverview/types/Event";
import PageTemplate from "../templates/PageTemplate";
import InstanceTable from "../../features/instanceOverview/components/InstanceTable";


const Instances: RouteComponent = () => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.instanceOverview'})
    const {latestInstances, getLatestInstances, events, getEvents} = useContext(HistoryContext)
    const [selectedRow] = useState<IEvent>();
    const [openDialog, setOpenDialog] = React.useState(false);


    useEffect(() => {
        getLatestInstances(0, 10000, "timestamp", "DESC");
        getEvents(0, 10000, "timestamp", "DESC")
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


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
                        {t('button.close')}
                    </ButtonAks>
                </Modal.Footer>
            </Modal>
        )
    }

    return (
        <PageTemplate id={'instances'} keyPrefix={'pages.instanceOverview'} customHeading>
            <HStack id={'instances-custom-header'} justify={"space-between"}>
                <HStack align={"center"} gap={"2"}>
                    <Heading size={"medium"}>{t('header')}</Heading>
                    <HelpText title={"Hva er dette"} placement="bottom">
                        {t('help.header')}
                    </HelpText>
                </HStack>
                <Button
                    size={"small"}
                    onClick={() => {
                        getLatestInstances(0, 10000, "timestamp", "DESC")
                        getEvents(0, 10000, "timestamp", "DESC")
                    }}
                    icon={<ArrowCirclepathIcon aria-hidden/>}
                >{t('button.refresh')}
                </Button>
            </HStack>
            <Box id={"instance-table-container"} background={"surface-default"} padding="6" borderRadius={"large"}
                 borderWidth="2" borderColor={"border-subtle"}>
                    {latestInstances && <InstanceTable instances={latestInstances} events={events}/>}
                </Box>
            <ErrorAlertDialog row={selectedRow}/>
        </PageTemplate>
    );
}

export default Instances;