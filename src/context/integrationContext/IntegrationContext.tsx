import React, { createContext, useState, FC } from "react";
import {contextDefaultValues, IntegrationContextState} from "./types";
import {IIntegrationConfiguration} from "../../features/integration/types/IntegrationConfiguration";
import IntegrationRepository from "../../features/integration/repository/IntegrationRepository";

export const IntegrationContext = createContext<IntegrationContextState>(
    contextDefaultValues
);

const IntegrationProvider: FC = ({ children }) => {
    const [integration, setIntegration] = useState<IIntegrationConfiguration>({});
    const [integrations, setIntegrations] = useState<IIntegrationConfiguration[]>([]);
    const [destination, setDestination] = useState<string>('');
    const [sourceApplicationIntegrationId, setSourceApplicationIntegrationId] = useState<string>('');
    const [sourceApplicationId, setSourceApplicationId] = useState<string>('');

    const resetSourceAndDestination = () => {
        setDestination('');
        setSourceApplicationId('');
        setSourceApplicationIntegrationId('');
    }

    const getIntegrations = () => {
        IntegrationRepository.get()
            .then((response) => {
                if(response.data.content) {
                    setIntegrations(response.data.content);
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
                destination,
                setDestination,
                sourceApplicationId,
                sourceApplicationIntegrationId,
                setSourceApplicationId,
                setSourceApplicationIntegrationId,
                resetSourceAndDestination
            }}
        >
            {children}
        </IntegrationContext.Provider>
    );
};

export default IntegrationProvider;
