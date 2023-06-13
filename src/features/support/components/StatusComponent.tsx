import * as React from "react";
import {useEffect, useState} from "react";
import {Alert, Box} from "@mui/material";
import {ClassNameMap} from "@mui/styles";
import IntegrationRepository from "../../../shared/repositories/IntegrationRepository";
import ConfigurationRepository from "../../../shared/repositories/ConfigurationRepository";
import EventRepository from "../../log/repository/EventRepository";
import ResourceRepository from "../../../shared/repositories/ResourceRepository";
import SourceApplicationRepository from "../../../shared/repositories/SourceApplicationRepository";

export interface Props {
    classes: ClassNameMap
}

const StatusComponent: React.FunctionComponent<Props> = (props: Props) => {
    const [integrationStatus, setIntegrationStatus] = useState<boolean | undefined>(undefined);
    const [configurationStatus, setConfigurationStatus] = useState<boolean | undefined>(undefined);
    const [historyStatus, setHistoryStatus] = useState<boolean | undefined>(undefined);
    const [dataStatus, setDataStatus] = useState<boolean | undefined>(undefined);
    const [discoveryStatus, setDiscoveryStatus] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        IntegrationRepository.getAllIntegrations()
            .then(() => setIntegrationStatus(true))
            .catch(() => setIntegrationStatus(false));
        ConfigurationRepository.getConfigurations(0, 10000, "version", "DESC", false, "1", true)
            .then(() => setConfigurationStatus(true))
            .catch(() => setConfigurationStatus(false));
        EventRepository.getStatistics()
            .then(() => setHistoryStatus(true))
            .catch(() => setHistoryStatus(false));
        ResourceRepository.getResource('arkivdel')
            .then(() => setDataStatus(true))
            .catch(() => setDataStatus(false));
        SourceApplicationRepository.getMetadata('1', true)
            .then(() => setDiscoveryStatus(true))
            .catch(() => setDiscoveryStatus(false));
    })


    return (

        <Box>
            <Alert variant="outlined" severity={historyStatus ? "success" : "warning"} sx={{color: 'black', mb: 2}}>
                Historikk
            </Alert>
            <Alert variant="outlined" severity={configurationStatus ? "success" : "warning"}
                   sx={{color: 'black', mb: 2}}>
                Konfigurasjoner
            </Alert>
            <Alert variant="outlined" severity={integrationStatus ? "success" : "warning"} sx={{color: 'black', mb: 2}}>
                Integrasjoner
            </Alert>
            <Alert variant="outlined" severity={discoveryStatus ? "success" : "warning"} sx={{color: 'black', mb: 2}}>
                Kildeapplikasjon
            </Alert>
            <Alert variant="outlined" severity={dataStatus ? "success" : "warning"} sx={{color: 'black', mb: 2}}>
                Kodeverk og arkiv
            </Alert>
        </Box>
    );
}
export default StatusComponent;