import React, {useContext, useEffect, useState} from 'react';
import {Alert, Box, Button, Heading, HelpText, HGrid, HStack, Loader} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import {GridCellParams} from "@mui/x-data-grid";
import ErrorDialogComponent from "../../features/instances/components/ErrorDialogComponent";
import {IEvent} from "../../features/instances/types/Event";
import PageTemplate from "../templates/PageTemplate";
import InstanceTable from "../../features/instances/components/InstanceTable";
import {RouteComponent} from "../../routes/Route";
import {SourceApplicationContext} from "../../context/SourceApplicationContext";
import {IAlertMessage} from "../types/TableTypes";
import {AuthorizationContext} from "../../context/AuthorizationContext";
import { useNavigate } from "react-router-dom";
import Filters from "../../features/instances/filter/FilterContent";
import { ChevronLeftDoubleCircleIcon,ChevronRightDoubleCircleIcon } from '@navikt/aksel-icons';

const Instances: RouteComponent = () => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.instances'})
    const [selectedRow] = useState<IEvent>();
    const [openDialog, setOpenDialog] = React.useState(false);
    const {allMetadata, getAllMetadata} = useContext(SourceApplicationContext)
    const [error, setError] = useState<IAlertMessage | undefined>(undefined);
    const { authorized, getAuthorization} = useContext(AuthorizationContext)
    const history = useNavigate();
    const [showFilters, setShowFilters] = useState(true);

    if(!authorized) {
        history('/forbidden')
    }
    useEffect(() => {
        getAuthorization()
    }, []);

    useEffect(() => {
        getAllMetadata(true)
    }, [])

    function ErrorAlertDialog(props: GridCellParams['row']) {
        return (
            <ErrorDialogComponent open={openDialog} setOpenErrorDialog={setOpenDialog} row={props.row}/>
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
            {error && <Alert style={{maxWidth: '100%'}} variant="error">{error.message}</Alert>}

            {!showFilters && (
<HStack>
                <Button variant="tertiary" onClick={() => setShowFilters(true)}
                        icon={<ChevronRightDoubleCircleIcon aria-hidden />} size="small">Filters</Button>
</HStack>

            )}

            <HGrid columns={showFilters ? "minmax(350px, 15%) 1fr" : "1fr"} gap="2">



            {showFilters && (
                    <Box
                        id="filter-container"
                        background="surface-default"
                        padding="6"
                        borderRadius="large"
                        borderWidth="2"
                        borderColor="border-subtle"
                        position="relative"
                    >
                        {/* Close Button */}
                        <Button
                            variant="tertiary"
                            size="small"
                            icon={<ChevronLeftDoubleCircleIcon aria-hidden />}
                            onClick={() => setShowFilters(false)}
                            style={{ position: "absolute", top: "10px", right: "10px" }}
                        >
                            Lukk
                        </Button>
                        <Filters />
                    </Box>
                )}


            <Box id={"instance-table-container"} background={"surface-default"} padding="6" borderRadius={"large"}
                 borderWidth="2" borderColor={"border-subtle"} >
                {allMetadata ? <InstanceTable onError={(error) => {
                    setError(error)
                }}/> : <Loader/>}
            </Box></HGrid>
            <ErrorAlertDialog row={selectedRow}/>
        </PageTemplate>
    );
}

export default Instances;