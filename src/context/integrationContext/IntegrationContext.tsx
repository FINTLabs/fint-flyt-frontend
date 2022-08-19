import React, { createContext, useState, FC } from "react";
import {contextDefaultValues, IntegrationContextState} from "./types";
import {IIntegrationConfiguration} from "../../features/integration/types/IntegrationConfiguration";

export const IntegrationContext = createContext<IntegrationContextState>(
    contextDefaultValues
);

const IntegrationProvider: FC = ({ children }) => {
    const [integration, setIntegration] = useState<IIntegrationConfiguration>({});
    const [destination, setDestination] = useState<string>('');
    const [sourceApplication, setSourceApplication] = useState<string>('');
    const [sourceApplicationIntegrationId, setSourceApplicationIntegrationId] = useState<string>('');

    const resetSourceAndDestination = () => {
        setDestination('');
        setSourceApplication('');
        setSourceApplicationIntegrationId('');
    }

    return (
        <IntegrationContext.Provider
            value={{
                integration,
                setIntegration,
                destination,
                setDestination,
                sourceApplication,
                setSourceApplication,
                sourceApplicationIntegrationId,
                setSourceApplicationIntegrationId,
                resetSourceAndDestination
            }}
        >
            {children}
        </IntegrationContext.Provider>
    );
};

export default IntegrationProvider;
