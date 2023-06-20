import {IIntegration} from "../../features/integration/types/Integration";
import {IConfiguration} from "../../features/configuration/types/Configuration";
import {IIntegrationMetadata} from "../../features/configuration/types/Metadata/IntegrationMetadata";

export type IntegrationContextState = {
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
    statistics: any[]
};

export const contextDefaultValues: IntegrationContextState = {
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
