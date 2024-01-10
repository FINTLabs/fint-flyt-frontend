import React, {useContext, useEffect, useState} from 'react';
import {Box, Heading, HelpText, HStack, Loader, Modal} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import {Button as ButtonAks} from "@navikt/ds-react/esm/button";
import {GridCellParams} from "@mui/x-data-grid";
import ErrorDialogComponent from "../../features/instances/components/ErrorDialogComponent";
import {IEvent} from "../../features/instances/types/Event";
import PageTemplate from "../templates/PageTemplate";
import InstanceTable from "../../features/instances/components/InstanceTable";
import {RouteComponent} from "../../routes/Route";
import {SourceApplicationContext} from "../../context/SourceApplicationContext";

const Instances: RouteComponent = () => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.instances'})
    const [selectedRow] = useState<IEvent>();
    const [openDialog, setOpenDialog] = React.useState(false);
    const {allMetadata, getAllMetadata} = useContext(SourceApplicationContext)

    useEffect(() => {
        getAllMetadata(true)
    }, [])

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
            </HStack>
            <Box id={"instance-table-container"} background={"surface-default"} padding="6" borderRadius={"large"}
                 borderWidth="2" borderColor={"border-subtle"} style={{height: '80vh'}}>
                {allMetadata ? <InstanceTable/> : <Loader/>}
            </Box>
            <ErrorAlertDialog row={selectedRow}/>
        </PageTemplate>
    );
}

export default Instances;