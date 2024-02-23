import React, {useContext, useEffect, useState} from "react";
import IntegrationTable from "../../features/integrations/components/IntegrationTable";
import PageTemplate from "../templates/PageTemplate";
import {SourceApplicationContext} from "../../context/SourceApplicationContext";
import {RouteComponent} from "../../routes/Route";
import {Link as RouterLink} from "react-router-dom"
import {Alert, Box, Button, Heading, HelpText, HStack, Loader} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import {PlusIcon} from '@navikt/aksel-icons';
import {IError} from "../../util/TableUtil";

const Integrations: RouteComponent = () => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.integrations'})
    const {
        allMetadata,
        getAllMetadata,
        sourceApplications,
        getSourceApplications
    } = useContext(SourceApplicationContext)
    const [error, setError] = useState<IError | undefined>(undefined);

    useEffect(() => {
        getSourceApplications();
        getAllMetadata(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <PageTemplate id={'integration'} keyPrefix={'pages.integrations'} customHeading>
            <HStack id={'instances-custom-header'} align={"center"} justify={"space-between"} gap={"2"} wrap={false}>
                <HStack align={"center"} gap={"2"}>
                    <Heading size={"medium"}>{t('header')}</Heading>
                    <HelpText title={"Hva er dette"} placement="bottom">
                        {t('help.header')}
                    </HelpText>
                </HStack>
                <Button
                    disabled={!sourceApplications}
                    as={RouterLink}
                    to={"/integration/new"}
                    size={"small"}
                    icon={sourceApplications ? <PlusIcon aria-hidden/> : <Loader/>}
                >{t('button.newIntegration')}
                </Button>
            </HStack>
            {error && <Alert style={{maxWidth: '100%'}} variant="error">{error.message}</Alert>}
            <Box id={"integration-table-container"} background={"surface-default"} padding="6" borderRadius={"large"}
                 borderWidth="2" borderColor={"border-subtle"}>
                {allMetadata ?
                    <IntegrationTable
                        onError={(error) => {
                            setError(error)
                        }}
                        id={"integration-table"}/>
                    :
                    <>
                        <Loader size={"xlarge"}/>
                    </>
                }
            </Box>
        </PageTemplate>
    );
}

export default Integrations;