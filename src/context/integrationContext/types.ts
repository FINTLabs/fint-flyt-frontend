import {IIntegration} from "../../features/integration/types/Integration";
import {newIConfiguration} from "../../features/integration/types/Configuration";
import {IIntegrationMetadata} from "../../features/integration/types/IntegrationMetadata";

export type IntegrationContextState = {
    caseNumber: string | undefined;
    setCaseNumber: (number: string | undefined) => void;
    newIntegration: IIntegration | undefined;
    existingIntegration: IIntegration | undefined;
    setNewIntegration: (integration: IIntegration | undefined) => void;
    setExistingIntegration: (integration: IIntegration | undefined) => void;
    newIntegrations: IIntegration[] | undefined;
    setNewIntegrations: (integrations: IIntegration[]) => void;
    getNewIntegrations: (sourceApplicationId: string) => void;
    configuration: newIConfiguration | undefined;
    setConfiguration: (configuration: newIConfiguration | undefined) => void;
    configurations: newIConfiguration[] | undefined;
    completedConfigurations: newIConfiguration[] | undefined;
    setConfigurations: (configurations: newIConfiguration[]) => void;
    setCompletedConfigurations: (configurations: newIConfiguration[]) => void;
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
    caseNumber: undefined,
    setCaseNumber: (number: string | undefined) => {},
    newIntegration: {},
    existingIntegration: {},
    setNewIntegration: () => {},
    setExistingIntegration: () => {},
    newIntegrations: [],
    setNewIntegrations: () => {},
    getNewIntegrations: () => {},
    configuration: undefined,
    setConfiguration: () => {},
    configurations: undefined,
    completedConfigurations: undefined,
    getConfiguration: () => {},
    getConfigurations: () => {},
    getCompletedConfigurations: () => {},
    setConfigurations: () => {},
    setCompletedConfigurations: () => {},
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
    resetIntegrationContext: () => {},
    resetIntegrations: () => {},
    statistics: []
};
