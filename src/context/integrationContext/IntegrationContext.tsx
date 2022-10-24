import React, { createContext, useState, FC } from "react";
import {contextDefaultValues, IntegrationContextState} from "./types";
import {IIntegration} from "../../features/integration/types/Integration";
import {newIConfiguration} from "../../features/integration/types/Configuration";
import EventRepository from "../../features/log/repository/EventRepository";
import {IIntegrationStatistics} from "../../features/log/types/IntegrationStatistics";
import {IIntegrationMetadata} from "../../features/integration/types/IntegrationMetadata";
import ConfigurationRepository from "../../shared/repositories/ConfigurationRepository";
import IntegrationRepository from "../../shared/repositories/IntegrationRepository";

export const IntegrationContext = createContext<IntegrationContextState>(
    contextDefaultValues
);

const IntegrationProvider: FC = ({ children }) => {
    const [existingIntegration, setExistingIntegration] = useState<IIntegration | undefined>(undefined);
    const [caseNumber, setCaseNumber] = useState<string | undefined>(undefined);
    const [newIntegration, setNewIntegration] = useState<IIntegration | undefined>(undefined);
    const [newIntegrations, setNewIntegrations] = useState<IIntegration[] | undefined>(undefined);
    const [configuration, setConfiguration] = useState<newIConfiguration | undefined>(contextDefaultValues.configuration);
    const [configurations, setConfigurations] = useState<newIConfiguration[] | undefined>(contextDefaultValues.configurations);
    const [completedConfigurations, setCompletedConfigurations] = useState<newIConfiguration[] | undefined>(contextDefaultValues.completedConfigurations);
    const [destination, setDestination] = useState<string>('');
    const [selectedMetadata, setSelectedMetadata] = useState<IIntegrationMetadata>(contextDefaultValues.selectedMetadata);
    const [sourceApplicationIntegrationId, setSourceApplicationIntegrationId] = useState<string>('');
    const [sourceApplicationId, setSourceApplicationId] = useState<string>('');
    const [statistics, setStatistics] = useState<any[]>(contextDefaultValues.statistics);

    const resetSourceAndDestination = () => {
        setDestination('');
        setSourceApplicationId('');
        setSourceApplicationIntegrationId('');
        setSelectedMetadata(contextDefaultValues.selectedMetadata)
        setCaseNumber(undefined)
    }

    const resetIntegrations = () => {
        setNewIntegration(undefined);
        setExistingIntegration(undefined)
    }

    const resetConfiguration = () => {
        setConfigurations(undefined)
        setConfiguration(undefined)
    }

    const getNewIntegrations = () => {
        EventRepository.getStatistics()
            .then((response) => {
                let data = response.data;
                if (data) {
                    setStatistics(data)
                    let stats = data;
                    IntegrationRepository.getIntegrations(0, 1000, "state", "ASC")
                        .then((response) => {
                            if (response.data.content) {
                                let mergedList: IIntegration[] = response.data.content;
                                stats.forEach((value: IIntegrationStatistics) => {
                                    mergedList.map((integration: IIntegration) => {
                                        if (integration.sourceApplicationIntegrationId === value.sourceApplicationIntegrationId) {
                                            integration.errors = value.currentErrors;
                                            integration.dispatched = value.dispatchedInstances;
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
            }).catch(e => console.log('error', e))
    }

    const getConfigurations = (page: number, size: number, sortProperty: string, sortDirection: string, complete: boolean, id: any, excludeElements?: boolean) => {
        ConfigurationRepository.getConfigurations(page, size, sortProperty, sortDirection, complete, id.toString(), excludeElements)
            .then((response) => {
                let data = response.data.content;
                if (data) {
                let configurations: newIConfiguration[] = data;
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
                    let configurations: newIConfiguration[] = data;
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
                    let configuration: newIConfiguration = data;
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
                caseNumber,
                setCaseNumber,
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
                resetSourceAndDestination,
                resetIntegrations
            }}
        >
            {children}
        </IntegrationContext.Provider>
    );
};

export default IntegrationProvider;
