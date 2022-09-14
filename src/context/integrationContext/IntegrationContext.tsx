import React, { createContext, useState, FC } from "react";
import {contextDefaultValues, IntegrationContextState} from "./types";
import {IIntegrationConfiguration} from "../../features/integration/types/IntegrationConfiguration";
import IntegrationRepository from "../../features/integration/repository/IntegrationRepository";
import {newConfs, newInts} from "../../features/integration/defaults/DefaultValues";
import {IIntegration} from "../../features/integration/types/Integration";
import {IConfiguration} from "../../features/integration/types/Configuration";

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
    const [sourceApplicationIntegrationId, setSourceApplicationIntegrationId] = useState<string>('');
    const [sourceApplicationId, setSourceApplicationId] = useState<string>('');

    const resetSourceAndDestination = () => {
        setDestination('');
        setSourceApplicationId('');
        setSourceApplicationIntegrationId('');
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
        IntegrationRepository.get()
            .then((response) => {
                if(response.data.content) {
                    setNewIntegrations(newInts);
                }
            })
            .catch(e => console.error('Error: ', e))
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
