import React, { createContext, useState, FC } from "react";
import {contextDefaultValues, IntegrationContextState} from "./types";
import {IIntegrationConfiguration} from "../../features/integration/types/IntegrationConfiguration";
import IntegrationRepository from "../../features/integration/repository/IntegrationRepository";
import EventRepository from "../../features/log/repository/EventRepository";
import {IIntegrationStatistics} from "../../features/log/types/IntegrationStatistics";
import {IIntegrationMetadata} from "../../features/integration/types/IntegrationMetadata";

export const IntegrationContext = createContext<IntegrationContextState>(
    contextDefaultValues
);

const IntegrationProvider: FC = ({ children }) => {
    const [integration, setIntegration] = useState<IIntegrationConfiguration>({});
    const [integrations, setIntegrations] = useState<IIntegrationConfiguration[]>([]);
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

    //TODO: fix after api change
    const getIntegrations = () => {
        EventRepository.getStatistics()
            .then((response) => {
                let statistics = response.data;
                IntegrationRepository.get()
                    .then((response) => {
                        if(response.data.content) {
                            let mergedList: IIntegrationConfiguration[] = response.data.content;
                            statistics.forEach((value: IIntegrationStatistics) => {
                                mergedList.map((integration: IIntegrationConfiguration) => {
                                    if (integration.sourceApplicationIntegrationId === value.sourceApplicationIntegrationId) {
                                        integration.errors = value.currentErrors;
                                        integration.dispatched = value.dispatchedInstances;
                                    }
                                })
                            })
                            setIntegrations(mergedList);
                        }
                    })
                    .catch(e => console.error('Error: ', e))
            }).catch(e => console.log('error', e))
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
