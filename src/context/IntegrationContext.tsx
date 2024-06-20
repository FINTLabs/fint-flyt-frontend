import {createContext, useState} from "react";
import {IIntegration, IIntegrationStatistics} from "../features/integration/types/Integration";
import {IConfiguration} from "../features/configuration/types/Configuration";
import {IIntegrationMetadata} from "../features/configuration/types/Metadata/IntegrationMetadata";
import {ContextProps} from "./constants/interface";
import IntegrationRepository from "../api/IntegrationRepository";
import SourceApplicationRepository from "../api/SourceApplicationRepository";
import EventRepository from "../api/EventRepository";
import ConfigurationRepository from "../api/ConfigurationRepository";
import AuthorizationRepository from "../api/AuthorizationRepository";

type IntegrationContextState = {
    existingIntegration: IIntegration | undefined;
    setExistingIntegration: (integration: IIntegration | undefined) => void;
    integrations: IIntegration[] | undefined;
    setIntegrations: (integrations: IIntegration[]) => void;
    getIntegrationsBySourceApplicationId: (sourceApplicationId: string) => void;
    getAllIntegrations: () => void;
    configuration: IConfiguration | undefined;
    setConfiguration: (configuration: IConfiguration | undefined) => void;
    configurations: IConfiguration[] | undefined;
    setConfigurations: (configurations: IConfiguration[]) => void;
    getConfiguration: (integration: string, excludeElements: boolean) => void;
    destination: string;
    existingIntegrationMetadata: IIntegrationMetadata | undefined;
    setExistingIntegrationMetadata: (form: IIntegrationMetadata | undefined) => void;
    sourceApplicationIntegrationId: string;
    setSourceApplicationIntegrationId: (id: string) => void;
    setDestination: (destination: string) => void;
    sourceApplicationId: string;
    setSourceApplicationId: (destination: string) => void;
    resetIntegrationContext: () => void;
    resetIntegration: () => void;
    statistics: IIntegrationStatistics[];
};

const contextDefaultValues: IntegrationContextState = {
    existingIntegration: undefined,
    setExistingIntegration: () => undefined,
    integrations: [],
    setIntegrations: () => undefined,
    getIntegrationsBySourceApplicationId: () => undefined,
    getAllIntegrations: () => undefined,
    configuration: undefined,
    setConfiguration: () => undefined,
    configurations: undefined,
    getConfiguration: () => undefined,
    setConfigurations: () => undefined,
    destination: "",
    existingIntegrationMetadata: undefined,
    setExistingIntegrationMetadata: () => undefined,
    setDestination: () => undefined,
    sourceApplicationId: "",
    setSourceApplicationId: () => undefined,
    sourceApplicationIntegrationId: "",
    setSourceApplicationIntegrationId: () => undefined,
    resetIntegrationContext: () => undefined,
    resetIntegration: () => undefined,
    statistics: [],
};
const IntegrationContext =
    createContext<IntegrationContextState>(contextDefaultValues);

const IntegrationProvider = ({children}: ContextProps) => {
    const [existingIntegration, setExistingIntegration] = useState<IIntegration | undefined>(undefined);
    const [integrations, setIntegrations] = useState<IIntegration[] | undefined>(undefined);
    const [configuration, setConfiguration] = useState<IConfiguration | undefined>(contextDefaultValues.configuration);
    const [configurations, setConfigurations] = useState<IConfiguration[] | undefined>(contextDefaultValues.configurations);
    const [destination, setDestination] = useState<string>("");
    const [existingIntegrationMetadata, setExistingIntegrationMetadata] = useState<IIntegrationMetadata | undefined>(contextDefaultValues.existingIntegrationMetadata);
    const [sourceApplicationIntegrationId, setSourceApplicationIntegrationId] = useState<string>("");
    const [sourceApplicationId, setSourceApplicationId] = useState<string>("");
    const [statistics, setStatistics] = useState<IIntegrationStatistics[]>(contextDefaultValues.statistics);

    const resetIntegrationContext = () => {
        setDestination("");
        setExistingIntegration(undefined);
        setSourceApplicationIntegrationId("");
        setExistingIntegrationMetadata(contextDefaultValues.existingIntegrationMetadata);
        resetConfiguration();
    };

    const resetIntegration = () => {
        setExistingIntegration(undefined);
    };

    const resetIntegrationsAndStats = () => {
        setIntegrations([]);
        setStatistics([]);
    };

    // eslint-disable-next-line
    const resetConfiguration = () => {
        setConfigurations(undefined);
        setConfiguration(undefined);
    };

    const getIntegrationsBySourceApplicationId = async (sourceApplicationId: string) => {
        try {
            const [statisticsResponse, metadataResponse, integrationResponse] = await Promise.all([
                EventRepository.getStatistics(),
                SourceApplicationRepository.getMetadata(sourceApplicationId, true),
                IntegrationRepository.getIntegrations(0, null, "state", "ASC")
            ]);

            const statistics: IIntegrationStatistics[] = statisticsResponse.data || [];
            const metadata: IIntegrationMetadata[] = metadataResponse.data || [];
            const integrations: IIntegration[] = integrationResponse.data.content || [];

            const updatedIntegrations = integrations.map(integration => {
                const stat = statistics.find(s => s.sourceApplicationIntegrationId === integration.sourceApplicationIntegrationId);
                const meta = metadata.find(m => m.sourceApplicationIntegrationId === integration.sourceApplicationIntegrationId);

                return {
                    ...integration,
                    errors: stat?.currentErrors,
                    dispatched: stat?.dispatchedInstances,
                    displayName: meta?.integrationDisplayName
                };
            });

            setStatistics(statistics);
            setIntegrations(updatedIntegrations);
        } catch (e) {
            console.error("Error: ", e);
            resetIntegrationsAndStats();
        }
    };

    const getAllIntegrations = async () => {
        try {
            const [statisticsResponse, sourceApplicationsResponse, integrationResponse] = await Promise.all([
                EventRepository.getStatistics(),
                AuthorizationRepository.getUserSourceApplications(),
                IntegrationRepository.getIntegrations(0, 1000, "state", "ASC")
            ]);

            const statistics: IIntegrationStatistics[] = statisticsResponse.data || [];
            const sourceApplicationIds = sourceApplicationsResponse.data.sourceApplicationIds.map(String);
            const integrations: IIntegration[] = integrationResponse.data.content || [];

            if (statistics.length > 0) {
                setStatistics(statistics);

                const metadataResponses = await Promise.all(
                    sourceApplicationIds.map(sourceApplicationId =>
                        SourceApplicationRepository.getMetadata(sourceApplicationId, true)
                    )
                );

                const metadata = metadataResponses.flatMap(response => response.data || []);

                const updatedIntegrations = integrations.map(integration => {
                    const stat = statistics.find(s => s.sourceApplicationIntegrationId === integration.sourceApplicationIntegrationId);
                    const meta = metadata.find(m => m.sourceApplicationIntegrationId === integration.sourceApplicationIntegrationId);

                    return {
                        ...integration,
                        errors: stat?.currentErrors,
                        dispatched: stat?.dispatchedInstances,
                        displayName: meta?.integrationDisplayName
                    };
                });
                setIntegrations(updatedIntegrations);
            }
        } catch (e) {
            console.error("Error: ", e);
            setIntegrations([]);
            resetIntegrationsAndStats();
        }
    };

    const getConfiguration = async (
        id: number | string,
        excludeElements?: boolean
    ) => {
        ConfigurationRepository.getConfigurationById(id.toString(), excludeElements)
            .then((response) => {
                const data: IConfiguration = response.data;
                if (data) {
                    setConfiguration(data);
                }
            })
            .catch((e) => {
                console.error("Error: ", e);
                setConfiguration(contextDefaultValues.configuration);
            });
    };

    return (
        <IntegrationContext.Provider
            value={{
                statistics,
                existingIntegration,
                setExistingIntegration,
                integrations,
                setIntegrations,
                getIntegrationsBySourceApplicationId,
                getAllIntegrations,
                configuration,
                setConfiguration,
                getConfiguration,
                configurations,
                setConfigurations,
                destination,
                setDestination,
                existingIntegrationMetadata,
                setExistingIntegrationMetadata,
                sourceApplicationId,
                sourceApplicationIntegrationId,
                setSourceApplicationIntegrationId,
                setSourceApplicationId,
                resetIntegrationContext,
                resetIntegration,
            }}
        >
            {children}
        </IntegrationContext.Provider>
    );
};

export {IntegrationContext, IntegrationProvider as default};
