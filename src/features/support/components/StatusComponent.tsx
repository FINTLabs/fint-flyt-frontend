import * as React from "react";
import {useEffect, useState} from "react";
import {Alert, Box} from "@mui/material";
import {ClassNameMap} from "@mui/styles";
import IntegrationRepository from "../../../shared/repositories/IntegrationRepository";
import ConfigurationRepository from "../../../shared/repositories/ConfigurationRepository";
import EventRepository from "../../../shared/repositories/EventRepository";
import ResourceRepository from "../../../shared/repositories/ResourceRepository";
import SourceApplicationRepository from "../../../shared/repositories/SourceApplicationRepository";

export interface Props {
    classes: ClassNameMap
}

const StatusComponent: React.FunctionComponent<Props> = () => {
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
            <Alert variant="outlined" severity={historyStatus && configurationStatus && integrationStatus && discoveryStatus && dataStatus ? "success" : "warning"} sx={{color: 'black', mb: 2}}>
                Interne tjenester i FLYT
            </Alert>
        </Box>
    );
}
export default StatusComponent;