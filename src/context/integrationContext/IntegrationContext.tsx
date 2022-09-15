import React, { createContext, useState, FC } from "react";
import {contextDefaultValues, IntegrationContextState} from "./types";
import {IIntegrationConfiguration} from "../../features/integration/types/IntegrationConfiguration";
import IntegrationRepository from "../../features/integration/repository/IntegrationRepository";
import {newConfs, newInts} from "../../features/integration/defaults/DefaultValues";
import {IIntegration} from "../../features/integration/types/Integration";
import {IConfiguration} from "../../features/integration/types/Configuration";
import EventRepository from "../../features/log/repository/EventRepository";
import {IIntegrationStatistics} from "../../features/log/types/IntegrationStatistics";
import {IIntegrationMetadata} from "../../features/integration/types/IntegrationMetadata";

export const IntegrationContext = createContext<IntegrationContextState>(
    contextDefaultValues
);

const IntegrationProvider: FC = ({ children }) => {
    const [integration, setIntegration] = useState<IIntegrationConfiguration>({});
    const [integrations, setIntegrations] = useState<IIntegrationConfiguration[]>([]);
    const [newIntegration, setNewIntegration] = useState<IIntegration | undefined>(undefined);
    const [newIntegrations, setNewIntegrations] = useState<IIntegration[]>([]);
    const [configuration, setConfiguration] = useState<IConfiguration>({});
    const [configurations, setConfigurations] = useState<IConfiguration[]>([]);
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
        IntegrationRepository.get()
            .then((response) => {
                if(response.data.content) {
                    setNewIntegrations(newInts);
                }
            })
            .catch(e => console.error('Error: ', e))
    }

    const getIntegrations = () => {
        EventRepository.getStatistics()
            .then((response) => {
                let statistics = response.data;
                IntegrationRepository.get()
                    .then((response) => {
                        if(response.data.content) {
                            let mergedList: IIntegration[] = response.data.content;
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
                    .catch(e => console.error('Error: ', e))
            }).catch(e => console.log('error', e))
    }

    const getConfigurations = (integrationId: string) => {
        IntegrationRepository.get()
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
                integration,
                setIntegration,
                integrations,
                setIntegrations,
                getIntegrations,
                newIntegration,
                setNewIntegration,
                newIntegrations,
                setNewIntegrations,
                getNewIntegrations,
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
