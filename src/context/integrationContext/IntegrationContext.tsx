import React, {createContext, FC, useState} from "react";
import {contextDefaultValues, IntegrationContextState} from "./types";
import {IIntegration} from "../../features/integration/types/Integration";
import {IConfiguration} from "../../features/configuration/types/Configuration";
import EventRepository from "../../features/log/repository/EventRepository";
import {IIntegrationStatistics} from "../../features/log/types/IntegrationStatistics";
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
    const [selectedMetadata, setSelectedMetadata] = useState<IIntegrationMetadata>(contextDefaultValues.selectedMetadata);
    const [sourceApplicationIntegrationId, setSourceApplicationIntegrationId] = useState<string>('');
    const [sourceApplicationId, setSourceApplicationId] = useState<string>('');
    const [statistics, setStatistics] = useState<any[]>(contextDefaultValues.statistics);

    const resetIntegrationContext = () => {
        setDestination('');
        setSourceApplicationId('');
        setExistingIntegration(undefined);
        setSourceApplicationIntegrationId('');
        setSelectedMetadata(contextDefaultValues.selectedMetadata)
        setId(undefined);
        resetConfiguration();
    }

    const resetIntegration = () => {
        setExistingIntegration(undefined)
    }

    // eslint-disable-next-line
    const resetConfiguration = () => {
        setConfigurations(undefined)
        setConfiguration(undefined)
    }

    const getIntegrations = (sourceApplicationId: string) => {
        EventRepository.getStatistics()
            .then((response) => {
                let data = response.data;
                if (data) {
                    setStatistics(data)
                    let stats = data;
                    SourceApplicationRepository.getMetadata(sourceApplicationId, true)
                        .then((response) => {
                            if (response.data) {
                                let metadata: IIntegrationMetadata[] = response.data;
                                IntegrationRepository.getIntegrations(0, null, "state", "ASC")
                                    .then((response) => {
                                        if (response.data) {
                                            let mergedList: IIntegration[] = response.data;
                                            stats.forEach((value: IIntegrationStatistics) => {
                                                mergedList.map((integration: IIntegration) => {
                                                    if (integration.sourceApplicationIntegrationId === value.sourceApplicationIntegrationId) {
                                                        integration.errors = value.currentErrors;
                                                        return integration.dispatched = value.dispatchedInstances;
                                                    }
                                                    return mergedList;
                                                })
                                                return stats;
                                            })
                                            metadata.forEach((value: IIntegrationMetadata) => {
                                                mergedList.map((integration: IIntegration) => {
                                                    if (integration.sourceApplicationIntegrationId === value.sourceApplicationIntegrationId) {
                                                        return integration.displayName = value.integrationDisplayName;
                                                    }
                                                    return mergedList;
                                                })
                                                return metadata;
                                            })
                                            return setIntegrations(mergedList);
                                        }
                                    })
                                    .catch((e) => {
                                        console.error('Error: ', e)
                                        setIntegrations([]);
                                        setStatistics([])
                                    })
                            }
                        }).catch((e) => {
                        console.error('Error: ', e)
                        setIntegrations([]);
                        setStatistics([])
                    })
                }
            }).catch(e => {
                setIntegrations([]);
                setStatistics([])
                console.log('error', e)
            }
        )
    }

    const getConfigurations = (page: number, size: number, sortProperty: string, sortDirection: string, complete: boolean, id: any, excludeElements?: boolean) => {
        ConfigurationRepository.getConfigurations(page, size, sortProperty, sortDirection, complete, id.toString(), excludeElements)
            .then((response) => {
                let data = response.data.content;
                if (data) {
                    let configurations: IConfiguration[] = data;
                    setConfigurations(configurations);
                }
            })
            .catch((e) => {
                console.error('Error: ', e)
                setConfigurations([]);
            })
    }

    const getCompletedConfigurations = (page: number, size: number, sortProperty: string, sortDirection: string, complete: boolean, id: any, excludeElements?: boolean) => {
        ConfigurationRepository.getConfigurations(page, size, sortProperty, sortDirection, complete, id.toString(), excludeElements)
            .then((response) => {
                let data = response.data.content;
                if (data) {
                    let configurations: IConfiguration[] = data;
                    setCompletedConfigurations(configurations);
                }
            })
            .catch((e) => {
                console.error('Error: ', e)
                setCompletedConfigurations([]);
            })
    }

    const getConfiguration = async (id: any, excludeElements?: boolean) => {
        ConfigurationRepository.getConfiguration(id.toString(), excludeElements)
            .then((response) => {
                let data: IConfiguration = response.data;
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