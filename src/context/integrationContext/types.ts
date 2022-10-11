import {IIntegration} from "../../features/integration/types/Integration";
import {newIConfiguration} from "../../features/integration/types/Configuration";
import {IIntegrationMetadata} from "../../features/integration/types/IntegrationMetadata";

export type IntegrationContextState = {
    newIntegration: IIntegration | undefined;
    existingIntegration: IIntegration | undefined;
    setNewIntegration: (integration: IIntegration | undefined) => void;
    setExistingIntegration: (integration: IIntegration | undefined) => void;
    newIntegrations: IIntegration[] | undefined;
    setNewIntegrations: (integrations: IIntegration[]) => void;
    getNewIntegrations: () => void;
    configuration: newIConfiguration;
    setConfiguration: (configuration: newIConfiguration) => void;
    configurations: newIConfiguration[] | undefined;
    setConfigurations: (configurations: newIConfiguration[]) => void;
    getConfigurations: (integration: string) => void;
    destination: string,
    selectedMetadata: IIntegrationMetadata;
    setSelectedMetadata: (form: IIntegrationMetadata) => void,
    sourceApplicationIntegrationId: string,
    setSourceApplicationIntegrationId: (id: string) => void,
    setDestination: (destination: string) => void;
    sourceApplicationId: string,
    setSourceApplicationId: (destination: string) => void,
    resetSourceAndDestination: () => void;
    resetIntegrations: () => void;
    statistics: any
};

export const contextDefaultValues: IntegrationContextState = {
    newIntegration: {},
    existingIntegration: {},
    setNewIntegration: () => {},
    setExistingIntegration: () => {},
    newIntegrations: [],
    setNewIntegrations: () => {},
    getNewIntegrations: () => {},
    configuration: {elements: []},
    setConfiguration: () => {},
    configurations: undefined,
    getConfigurations: () => {},
    setConfigurations: () => {},
    destination: '',
    selectedMetadata: {
        instanceElementMetadata: [],
        sourceApplicationIntegrationUri: '',
        sourceApplicationIntegrationId: '',
        sourceApplicationId: '',
        integrationDisplayName: '',
        version: 0
    },
    setSelectedMetadata: () => {},
    setDestination: () => {},
    sourceApplicationId: '',
    setSourceApplicationId: () => {},
    sourceApplicationIntegrationId: '',
    setSourceApplicationIntegrationId: () => {},
    resetSourceAndDestination: () => {},
    resetIntegrations: () => {},
    statistics: []
};
