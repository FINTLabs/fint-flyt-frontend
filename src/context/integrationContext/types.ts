import {IIntegration} from "../../features/integration/types/Integration";
import {newIConfiguration} from "../../features/integration/types/Configuration";
import {IIntegrationMetadata} from "../../features/integration/types/IntegrationMetadata";

export type IntegrationContextState = {
    newIntegration: IIntegration | undefined;
    setNewIntegration: (integration: IIntegration | undefined) => void;
    newIntegrations: IIntegration[];
    setNewIntegrations: (integrations: IIntegration[]) => void;
    getNewIntegrations: () => void;
    configuration: newIConfiguration;
    setConfiguration: (configuration: newIConfiguration) => void;
    configurations: newIConfiguration[];
    setConfigurations: (configurations: newIConfiguration[]) => void;
    getConfigurations: (integration: string) => void;
    destination: string,
    selectedForm: IIntegrationMetadata;
    setSelectedForm: (form: IIntegrationMetadata) => void,
    sourceApplicationIntegrationId: string,
    setSourceApplicationIntegrationId: (id: string) => void,
    setDestination: (destination: string) => void;
    sourceApplicationId: string,
    setSourceApplicationId: (destination: string) => void,
    resetSourceAndDestination: () => void;
};

export const contextDefaultValues: IntegrationContextState = {
    newIntegration: {},
    setNewIntegration: () => {},
    newIntegrations: [],
    setNewIntegrations: () => {},
    getNewIntegrations: () => {},
    configuration: {elements: []},
    setConfiguration: () => {},
    configurations: [],
    getConfigurations: () => {},
    setConfigurations: () => {},
    destination: '',
    selectedForm: {
        instanceElementMetadata: [],
        sourceApplicationIntegrationUri: '',
        sourceApplicationIntegrationId: '',
        sourceApplicationId: '',
        integrationDisplayName: '',
        version: 0
    },
    setSelectedForm: () => {},
    setDestination: () => {},
    sourceApplicationId: '',
    setSourceApplicationId: () => {},
    sourceApplicationIntegrationId: '',
    setSourceApplicationIntegrationId: () => {},
    resetSourceAndDestination: () => {},
};
