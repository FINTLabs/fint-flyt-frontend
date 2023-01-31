import React, { createContext, useState, FC } from "react";
import {contextDefaultValues, IntegrationContextState} from "./types";
import {IIntegration} from "../../features/integration/types/Integration";
import {IConfiguration} from "../../features/integration/types/Configuration";
import EventRepository from "../../features/log/repository/EventRepository";
import {IIntegrationStatistics} from "../../features/log/types/IntegrationStatistics";
import {IIntegrationMetadata} from "../../features/integration/types/IntegrationMetadata";
import ConfigurationRepository from "../../shared/repositories/ConfigurationRepository";
import IntegrationRepository from "../../shared/repositories/IntegrationRepository";
import SourceApplicationRepository from "../../shared/repositories/SourceApplicationRepository";

export const IntegrationContext = createContext<IntegrationContextState>(
    contextDefaultValues
);

const IntegrationProvider: FC = ({ children }) => {
    const [existingIntegration, setExistingIntegration] = useState<IIntegration | undefined>(undefined);
    const [id, setId] = useState<string | undefined>(undefined);
    const [newIntegration, setNewIntegration] = useState<IIntegration | undefined>(undefined);
    const [newIntegrations, setNewIntegrations] = useState<IIntegration[] | undefined>(undefined);
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
        setNewIntegration(undefined)
        setSourceApplicationIntegrationId('');
        setSelectedMetadata(contextDefaultValues.selectedMetadata)
        setId(undefined)
    }

    const resetIntegrations = () => {
        setNewIntegration(undefined);
        setExistingIntegration(undefined)
    }

    const resetConfiguration = () => {
        setConfigurations(undefined)
        setConfiguration(undefined)
    }

    const getNewIntegrations = (sourceApplicationId: string) => {
        EventRepository.getStatistics()
            .then((response) => {
                let data = response.data;
                if (data) {
                    setStatistics(data)
                    let stats = data;
                    SourceApplicationRepository.getMetadata(sourceApplicationId, true)
                        .then((response) => {
                            if(response.data) {
                                let metadata: IIntegrationMetadata[] = response.data;
                                IntegrationRepository.getIntegrations(0, null, "state", "ASC")
                                    .then((response) => {
                                        if (response.data) {
                                            let mergedList: IIntegration[] = response.data;
                                            stats.forEach((value: IIntegrationStatistics) => {
                                                mergedList.map((integration: IIntegration) => {
                                                    if (integration.sourceApplicationIntegrationId === value.sourceApplicationIntegrationId) {
                                                        integration.errors = value.currentErrors;
                                                        integration.dispatched = value.dispatchedInstances;
                                                    }
                                                })
                                            })
                                            metadata.forEach((value: IIntegrationMetadata) => {
                                                mergedList.map((integration: IIntegration) => {
                                                    if (integration.sourceApplicationIntegrationId === value.sourceApplicationIntegrationId) {
                                                        integration.displayName = value.integrationDisplayName;
                                                    }
                                                })
                                            })
                                            setNewIntegrations(mergedList);
                                        }
                                    })
                                    .catch((e) => {
                                        console.error('Error: ', e)
                                        setNewIntegrations([]);
                                        setStatistics([])
                                    })
                            }
                        }).catch((e) => {
                        console.error('Error: ', e)
                        setNewIntegrations([]);
                        setStatistics([])
                    })
                }
            }).catch(e => {
                setNewIntegrations([]);
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
            })    }

    const getConfiguration = async (id: any, excludeElements?: boolean) => {
        ConfigurationRepository.getConfiguration(id.toString(), excludeElements)
            .then((response) => {
                let data = response.data;
                if (data) {
                    let configuration: IConfiguration = data;
                    setConfiguration(configuration);
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
                newIntegration,
                setNewIntegration,
                existingIntegration,
                setExistingIntegration,
                newIntegrations,
                setNewIntegrations,
                getNewIntegrations,
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
                resetIntegrations
            }}
        >
            {children}
        </IntegrationContext.Provider>
    );
};

export default IntegrationProvider;
