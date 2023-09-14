import React, {createContext, FC, useState} from "react";
import {contextDefaultValues, IntegrationContextState} from "./types";
import {IIntegration} from "../../features/integration/types/Integration";
import {IConfiguration} from "../../features/configuration/types/Configuration";
import EventRepository from "../../shared/repositories/EventRepository";
import {IIntegrationStatistics} from "../../features/dashboard/types/IntegrationStatistics";
import {IIntegrationMetadata} from "../../features/configuration/types/Metadata/IntegrationMetadata";
import ConfigurationRepository from "../../shared/repositories/ConfigurationRepository";
import IntegrationRepository from "../../shared/repositories/IntegrationRepository";
import SourceApplicationRepository from "../../shared/repositories/SourceApplicationRepository";

export const IntegrationContext = createContext<IntegrationContextState>(
    contextDefaultValues
);

const IntegrationProvider: FC = ({children}) => {
    const [existingIntegration, setExistingIntegration] = useState<IIntegration | undefined>(undefined);
    const [id, setId] = useState<string | undefined>(undefined);
    const [integrations, setIntegrations] = useState<IIntegration[] | undefined>(undefined);
    const [configuration, setConfiguration] = useState<IConfiguration | undefined>(contextDefaultValues.configuration);
    const [configurations, setConfigurations] = useState<IConfiguration[] | undefined>(contextDefaultValues.configurations);
    const [completedConfigurations, setCompletedConfigurations] = useState<IConfiguration[] | undefined>(contextDefaultValues.completedConfigurations);
    const [destination, setDestination] = useState<string>('');
    const [selectedMetadata, setSelectedMetadata] = useState<IIntegrationMetadata | undefined>(contextDefaultValues.selectedMetadata);
    const [sourceApplicationIntegrationId, setSourceApplicationIntegrationId] = useState<string>('');
    const [sourceApplicationId, setSourceApplicationId] = useState<string>('');
    const [statistics, setStatistics] = useState<IIntegrationStatistics[]>(contextDefaultValues.statistics);

    const resetIntegrationContext = () => {
        setDestination('');
        setExistingIntegration(undefined);
        setSourceApplicationIntegrationId('');
        setSelectedMetadata(contextDefaultValues.selectedMetadata)
        setId(undefined);
        resetConfiguration();
    }

    const resetIntegration = () => {
        setExistingIntegration(undefined)
    }

    const resetIntegrationsAndStats = () => {
        setIntegrations([]);
        setStatistics([])
    }

    // eslint-disable-next-line
    const resetConfiguration = () => {
        setConfigurations(undefined)
        setConfiguration(undefined)
    }

    const getIntegrations = async (sourceApplicationId: string) => {
        try {
            const response = await EventRepository.getStatistics();
            const data = response.data;

            if (data) {
                setStatistics(data);
                const stats = data;

                const metadataResponse = await SourceApplicationRepository.getMetadata(sourceApplicationId, true);
                const metadata = metadataResponse.data || [];

                const integrationResponse = await IntegrationRepository.getIntegrations(0, null, "state", "ASC");
                const mergedList = integrationResponse.data || [];

                stats.forEach((value: IIntegrationStatistics) => {
                    mergedList.forEach((integration: IIntegration) => {
                        if (integration.sourceApplicationIntegrationId === value.sourceApplicationIntegrationId) {
                            integration.errors = value.currentErrors;
                            integration.dispatched = value.dispatchedInstances;
                        }
                    });
                });

                metadata.forEach((value: IIntegrationMetadata) => {
                    mergedList.forEach((integration: IIntegration) => {
                        if (integration.sourceApplicationIntegrationId === value.sourceApplicationIntegrationId) {
                            integration.displayName = value.integrationDisplayName;
                        }
                    });
                });

                setIntegrations(mergedList);
            }
        } catch (e) {
            console.error('Error: ', e);
            resetIntegrationsAndStats();
        }
    };

    const getConfigurations = (page: number, size: number, sortProperty: string, sortDirection: string, complete: boolean, id: number | string, excludeElements?: boolean) => {
        ConfigurationRepository.getConfigurations(page, size, sortProperty, sortDirection, complete, id.toString(), excludeElements)
            .then((response) => {
                const data = response.data.content;
                if (data) {
                    const configurations: IConfiguration[] = data;
                    setConfigurations(configurations);
                }
            })
            .catch((e) => {
                console.error('Error: ', e)
                setConfigurations([]);
            })
    }

    const getCompletedConfigurations = (page: number, size: number, sortProperty: string, sortDirection: string, complete: boolean, id: number | string, excludeElements?: boolean) => {
        ConfigurationRepository.getConfigurations(page, size, sortProperty, sortDirection, complete, id.toString(), excludeElements)
            .then((response) => {
                const data = response.data.content;
                if (data) {
                    const configurations: IConfiguration[] = data;
                    setCompletedConfigurations(configurations);
                }
            })
            .catch((e) => {
                console.error('Error: ', e)
                setCompletedConfigurations([]);
            })
    }

    const getConfiguration = async (id: number | string, excludeElements?: boolean) => {
        ConfigurationRepository.getConfigurationById(id.toString(), excludeElements)
            .then((response) => {
                const data: IConfiguration = response.data;
                if (data) {
                    setConfiguration(data);
                }
            })
            .catch((e) => {
                console.error('Error: ', e)
                setConfiguration(contextDefaultValues.configuration);
            })
    }

    return (
        <IntegrationContext.Provider
            value={{
                id,
                setId,
                statistics,
                existingIntegration,
                setExistingIntegration,
                integrations,
                setIntegrations,
                getIntegrations,
                configuration,
                setConfiguration,
                getConfiguration,
                configurations,
                completedConfigurations,
                getConfigurations,
                getCompletedConfigurations,
                setConfigurations,
                setCompletedConfigurations,
                destination,
                setDestination,
                selectedMetadata,
                setSelectedMetadata,
                sourceApplicationId,
                sourceApplicationIntegrationId,
                setSourceApplicationIntegrationId,
                setSourceApplicationId,
                resetIntegrationContext,
                resetIntegrations: resetIntegration
            }}
        >
            {children}
        </IntegrationContext.Provider>
    );
};

export default IntegrationProvider;