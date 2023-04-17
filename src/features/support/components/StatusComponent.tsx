import * as React from "react";
import {Box, CircularProgress, Typography} from "@mui/material";
import {ClassNameMap} from "@mui/styles";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import IntegrationRepository from "../../../shared/repositories/IntegrationRepository";
import ConfigurationRepository from "../../../shared/repositories/ConfigurationRepository";
import EventRepository from "../../log/repository/EventRepository";
import ResourceRepository from "../../../shared/repositories/ResourceRepository";
import SourceApplicationRepository from "../../../shared/repositories/SourceApplicationRepository";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import ErrorIcon from "@mui/icons-material/Error";


export interface Props {
    classes: ClassNameMap
}

const StatusComponent: React.FunctionComponent<Props> = (props: Props) => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.support'});
    const classes = props.classes;
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

    function getIcon(success: boolean): any {
        return success ? <CheckBoxIcon color={'success'}/> : <ErrorIcon color={'error'}/>
    }

    return (

            <Box>
                <Typography>
                    history: {historyStatus ? getIcon(historyStatus) : <CircularProgress size={12} />}
                </Typography>
                <Typography>
                    config: {configurationStatus ? getIcon(configurationStatus) : <CircularProgress size={12} />}
                </Typography>
                <Typography>
                    integration: {integrationStatus ? getIcon(integrationStatus) : <CircularProgress size={12} />}
                </Typography>
                <Typography>
                    discovery: {discoveryStatus ? getIcon(discoveryStatus) : <CircularProgress size={12} />}
                </Typography>
                <Typography>
                    data: {dataStatus ? getIcon(dataStatus) : <CircularProgress size={12} />}
                </Typography>
            </Box>
    );
}
export default StatusComponent;