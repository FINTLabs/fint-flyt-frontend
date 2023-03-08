import {IIntegration} from "../../features/integration/types/Integration";
import {IConfiguration} from "../../features/configuration/types/Configuration";
import {IIntegrationMetadata} from "../../features/configuration/types/Metadata/IntegrationMetadata";

export type IntegrationContextState = {
    id: string | undefined;
    setId: (number: string | undefined) => void;
    newIntegration: IIntegration | undefined;
    existingIntegration: IIntegration | undefined;
    setNewIntegration: (integration: IIntegration | undefined) => void;
    setExistingIntegration: (integration: IIntegration | undefined) => void;
    newIntegrations: IIntegration[] | undefined;
    setNewIntegrations: (integrations: IIntegration[]) => void;
    getNewIntegrations: (sourceApplicationId: string) => void;
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
    selectedMetadata: IIntegrationMetadata;
    setSelectedMetadata: (form: IIntegrationMetadata) => void,
    sourceApplicationIntegrationId: string,
    setSourceApplicationIntegrationId: (id: string) => void,
    setDestination: (destination: string) => void;
    sourceApplicationId: string,
    setSourceApplicationId: (destination: string) => void,
    resetIntegrationContext: () => void;
    resetIntegrations: () => void;
    statistics: any[]
};

export const contextDefaultValues: IntegrationContextState = {
    id: undefined,
    setId: (number: string | undefined) => {
    },
    newIntegration: {},
    existingIntegration: {},
    setNewIntegration: () => {
    },
    setExistingIntegration: () => {
    },
    newIntegrations: [],
    setNewIntegrations: () => {
    },
    getNewIntegrations: () => {
    },
    configuration: undefined,
    setConfiguration: () => {
    },
    configurations: undefined,
    completedConfigurations: undefined,
    getConfiguration: () => {
    },
    getConfigurations: () => {
    },
    getCompletedConfigurations: () => {
    },
    setConfigurations: () => {
    },
    setCompletedConfigurations: () => {
    },
    destination: '',
    selectedMetadata: {
        instanceElementMetadata: [],
        sourceApplicationIntegrationUri: '',
        sourceApplicationIntegrationId: '',
        sourceApplicationId: '',
        integrationDisplayName: '',
        version: 0
    },
    setSelectedMetadata: () => {
    },
    setDestination: () => {
    },
    sourceApplicationId: '',
    setSourceApplicationId: () => {
    },
    sourceApplicationIntegrationId: '',
    setSourceApplicationIntegrationId: () => {
    },
    resetIntegrationContext: () => {
    },
    resetIntegrations: () => {
    },
    statistics: []
};
