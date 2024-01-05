import React, {useContext, useEffect, useState} from "react";
import IntegrationTable from "../../features/integrations/components/IntegrationTable";
import {IntegrationContext} from "../../context/IntegrationContext";
import PageTemplate from "../templates/PageTemplate";
import {SourceApplicationContext} from "../../context/SourceApplicationContext";
import {RouteComponent} from "../../routes/Route";
import {Box, Heading, HelpText, HStack, Loader} from "@navikt/ds-react";
import ConfigurationRepository from "../../api/ConfigurationRepository";
import {IConfiguration} from "../../features/configuration/types/Configuration";
import {useTranslation} from "react-i18next";


const Integrations: RouteComponent = () => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.integrations'})
    const {integrations, getAllIntegrations} = useContext(IntegrationContext)
    const {allMetadata, getAllMetadata} = useContext(SourceApplicationContext)
    const [configs, setConfigs] = useState<IConfiguration[]>([]);
    const [completedConfigs, setCompletedConfigs] = useState<IConfiguration[]>([]);


    useEffect(() => {
        getAllIntegrations();
        getAllMetadata(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        integrations && getAllConfigurations()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [integrations]);

    const getAllConfigurations = async () => {
        if (integrations) {
            try {
                const configs = []
                const completedConfigs = []
                for (const integration of integrations ?? []) {
                    const configResponse = await ConfigurationRepository.getConfigurations(0, 10000, "id", "DESC",false, integration.id ?? '', true)
                    const completedConfigResponse = await ConfigurationRepository.getConfigurations(0, 10000, "version", "DESC", true, integration.id ?? '', true)
                    configs.push(configResponse.data.content)
                    completedConfigs.push(completedConfigResponse.data.content)
                }

                const allConfigs = configs.reduce((acc, currentArray) => [...acc, ...currentArray], []) || [];
                const allCompletedConfigs = completedConfigs.reduce((acc, currentArray) => [...acc, ...currentArray], []) || [];

                setConfigs(allConfigs)
                setCompletedConfigs(allCompletedConfigs)

            } catch (e) {
                console.error('Error: ', e);
            }
        } else {
            setConfigs([])
            setCompletedConfigs([])
        }
    }

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
                {integrations && allMetadata && configs && completedConfigs ?
                    <IntegrationTable allConfigs={configs} allCompletedConfigs={completedConfigs}
                                      integrations={integrations}/>
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
