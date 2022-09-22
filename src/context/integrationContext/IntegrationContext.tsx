import React, { createContext, useState, FC } from "react";
import {contextDefaultValues, IntegrationContextState} from "./types";
import {newConfs, newInts} from "../../features/integration/defaults/DefaultValues";
import {IIntegration} from "../../features/integration/types/Integration";
import {newIConfiguration} from "../../features/integration/types/Configuration";
import EventRepository from "../../features/log/repository/EventRepository";
import {IIntegrationStatistics} from "../../features/log/types/IntegrationStatistics";
import {IIntegrationMetadata} from "../../features/integration/types/IntegrationMetadata";
import ConfigurationRepository from "../../features/integration/repository/ConfigurationRepository";

export const IntegrationContext = createContext<IntegrationContextState>(
    contextDefaultValues
);

const IntegrationProvider: FC = ({ children }) => {
    const [newIntegration, setNewIntegration] = useState<IIntegration | undefined>(undefined);
    const [newIntegrations, setNewIntegrations] = useState<IIntegration[]>([]);
    const [configuration, setConfiguration] = useState<newIConfiguration>(contextDefaultValues.configuration);
    const [configurations, setConfigurations] = useState<newIConfiguration[]>([]);
    const [destination, setDestination] = useState<string>('');
    const [selectedForm, setSelectedForm] = useState<IIntegrationMetadata>(contextDefaultValues.selectedForm);
    const [sourceApplicationIntegrationId, setSourceApplicationIntegrationId] = useState<string>('');
    const [sourceApplicationId, setSourceApplicationId] = useState<string>('');

    const resetSourceAndDestination = () => {
        setDestination('');
        setSourceApplicationId('');
        setSourceApplicationIntegrationId('');
        setSelectedForm(contextDefaultValues.selectedForm)
    }

    const getNewIntegrations = () => {
        EventRepository.getStatistics()
            .then((response) => {
                let statistics = response.data;
                let mergedList: IIntegration[] = newInts;
                statistics.forEach((value: IIntegrationStatistics) => {
                    mergedList.map((integration: IIntegration) => {
                        if (integration.sourceApplicationIntegrationId === value.sourceApplicationIntegrationId) {
                            integration.errors = value.currentErrors;
                            integration.dispatched = value.dispatchedInstances;
                        }
                    })
                })
                setNewIntegrations(mergedList);
/*                IntegrationRepository.getIntegrations()
                    .then((response) => {
                        if(response.data) {
                            let mergedList: IIntegration[] = response.data;
                            statistics.forEach((value: IIntegrationStatistics) => {
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
                    .catch(e => console.error('Error: ', e))*/
            }).catch(e => console.log('error', e))
    }

    const getConfigurations = (integrationId: string) => {
        //TODO: remove hard set configurations
        setConfigurations(newConfs);
        ConfigurationRepository.getConfigurations(integrationId)
            .then((response) => {
                if(response.data.content) {
                    setConfigurations(newConfs);
                }
            })
            .catch(e => console.error('Error: ', e))
    }

    return (
        <IntegrationContext.Provider
            value={{
                newIntegration,
                setNewIntegration,
                newIntegrations,
                setNewIntegrations,
                getNewIntegrations,
                configuration,
                setConfiguration,
                configurations,
                getConfigurations,
                setConfigurations,
                destination,
                setDestination,
                selectedForm,
                setSelectedForm,
                sourceApplicationId,
                sourceApplicationIntegrationId,
                setSourceApplicationIntegrationId,
                setSourceApplicationId,
                resetSourceAndDestination
            }}
        >
            {children}
        </IntegrationContext.Provider>
    );
};

export default IntegrationProvider;
