import React, {useContext, useEffect} from "react";
import IntegrationTable from "../../features/integrations/components/IntegrationTable";
import PageTemplate from "../templates/PageTemplate";
import {SourceApplicationContext} from "../../context/SourceApplicationContext";
import {RouteComponent} from "../../routes/Route";
import {Box, Heading, HelpText, HStack, Loader} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";


const Integrations: RouteComponent = () => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.integrations'})
    const {allMetadata, getAllMetadata} = useContext(SourceApplicationContext)

    useEffect(() => {
        getAllMetadata(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <PageTemplate id={'integration'} keyPrefix={'pages.integrations'} customHeading>
            <HStack id={'instances-custom-header'} align={"center"} gap={"2"} wrap={false}>
                <Heading size={"medium"}>{t('header')}</Heading>
                <HelpText title={"Hva er dette"} placement="bottom">
                    {t('help.header')}
                </HelpText>
            </HStack>
            <Box id={"integration-table-container"} background={"surface-default"} padding="6" borderRadius={"large"}
                 borderWidth="2" borderColor={"border-subtle"}>
                {allMetadata ?
                    <IntegrationTable id={"integration-table"}/>
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
