import {createContext, useState} from "react";
import {IIntegration} from "../../features/integration/types/Integration";
import {IConfiguration} from "../../features/configuration/types/Configuration";
import EventRepository from "../../shared/repositories/EventRepository";
import {IIntegrationStatistics} from "../../features/dashboard/types/IntegrationStatistics";
import {IIntegrationMetadata} from "../../features/configuration/types/Metadata/IntegrationMetadata";
import ConfigurationRepository from "../../shared/repositories/ConfigurationRepository";
import IntegrationRepository from "../../shared/repositories/IntegrationRepository";
import SourceApplicationRepository from "../../shared/repositories/SourceApplicationRepository";

interface IntegrationContextProps {
    children: React.ReactNode;
}

type IntegrationContextState = {
    id: string | undefined;
    setId: (number: string | undefined) => void;
    existingIntegration: IIntegration | undefined;
    setExistingIntegration: (integration: IIntegration | undefined) => void;
    integrations: IIntegration[] | undefined;
    setIntegrations: (integrations: IIntegration[]) => void;
    getIntegrations: (sourceApplicationId: string) => void;
    configuration: IConfiguration | undefined;
    setConfiguration: (configuration: IConfiguration | undefined) => void;
    configurations: IConfiguration[] | undefined;
    completedConfigurations: IConfiguration[] | undefined;
    setConfigurations: (configurations: IConfiguration[]) => void;
    setCompletedConfigurations: (configurations: IConfiguration[]) => void;
    getConfiguration: (integration: string, excludeElements: boolean) => void;
    getConfigurations: (page: number, size: number, sortProperty: string, sortDirection: string, complete: boolean, integration: string, excludeElements: boolean) => void;
    getCompletedConfigurations: (page: number, size: number, sortProperty: string, sortDirection: string, complete: boolean, integration: string, excludeElements: boolean) => void;
    destination: string,
    selectedMetadata: IIntegrationMetadata | undefined;
    setSelectedMetadata: (form: IIntegrationMetadata | undefined) => void,
    sourceApplicationIntegrationId: string,
    setSourceApplicationIntegrationId: (id: string) => void,
    setDestination: (destination: string) => void;
    sourceApplicationId: string,
    setSourceApplicationId: (destination: string) => void,
    resetIntegrationContext: () => void;
    resetIntegrations: () => void;
    statistics: IIntegrationStatistics[]
};

const contextDefaultValues: IntegrationContextState = {
    id: undefined,
    setId: () => undefined,
    existingIntegration: undefined,
    setExistingIntegration: () => undefined,
    integrations: [],
    setIntegrations: () => undefined,
    getIntegrations: () => undefined,
    configuration: undefined,
    setConfiguration: () => undefined,
    configurations: undefined,
    completedConfigurations: undefined,
    getConfiguration: () => undefined,
    getConfigurations: () => undefined,
    getCompletedConfigurations: () => undefined,
    setConfigurations: () => undefined,
    setCompletedConfigurations: () => undefined,
    destination: '',
    selectedMetadata: undefined,
    setSelectedMetadata: () => undefined,
    setDestination: () => undefined,
    sourceApplicationId: '',
    setSourceApplicationId: () => undefined,
    sourceApplicationIntegrationId: '',
    setSourceApplicationIntegrationId: () => undefined,
    resetIntegrationContext: () => undefined,
    resetIntegrations: () => undefined,
    statistics: []
};
 const IntegrationContext = createContext<IntegrationContextState>(
    contextDefaultValues
);



const IntegrationProvider= ({children}: IntegrationContextProps) => {
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

export  {IntegrationContext, IntegrationProvider as default};