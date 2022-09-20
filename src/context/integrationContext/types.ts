import {IIntegrationConfiguration} from "../../features/integration/types/IntegrationConfiguration";
import {IIntegration} from "../../features/integration/types/Integration";
import {IConfiguration} from "../../features/integration/types/Configuration";
import {IIntegrationMetadata} from "../../features/integration/types/IntegrationMetadata";

export type IntegrationContextState = {
    integration: IIntegrationConfiguration;
    setIntegration: (configuration: IIntegrationConfiguration) => void;
    integrations: IIntegrationConfiguration[];
    setIntegrations: (integrations: IIntegrationConfiguration[]) => void;
    getIntegrations: () => void;
    newIntegration: IIntegration | undefined;
    setNewIntegration: (integration: IIntegration | undefined) => void;
    newIntegrations: IIntegration[];
    setNewIntegrations: (integrations: IIntegration[]) => void;
    getNewIntegrations: () => void;
    configuration: IConfiguration;
    setConfiguration: (configuration: IConfiguration) => void;
    configurations: IConfiguration[];
    setConfigurations: (configurations: IConfiguration[]) => void;
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
    integration: {
        comment: '',
        sourceApplicationId: '',
        sourceApplicationIntegrationId: '',
        version: undefined,
        finished: false,
        applicantConfiguration: {fields: []},
        caseConfiguration: {fields: []},
        recordConfiguration: {fields: []},
        documentConfiguration: {fields:[]}
    },
    setIntegration: () => {},
    integrations: [],
    setIntegrations: () => {},
    getIntegrations: () => {},
    newIntegration: {
        integrationId: ''
    },
    setNewIntegration: () => {},
    newIntegrations: [],
    setNewIntegrations: () => {},
    getNewIntegrations: () => {},
    configuration: {},
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
