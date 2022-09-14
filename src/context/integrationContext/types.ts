import {IIntegrationConfiguration} from "../../features/integration/types/IntegrationConfiguration";
import {IIntegration} from "../../features/integration/types/Integration";
import {IConfiguration} from "../../features/integration/types/Configuration";

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
    configurations: IConfiguration[];
    setConfigurations: (configurations: IConfiguration[]) => void;
    getConfigurations: (integration: string) => void;
    destination: string,
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
        published: false,
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
    configurations: [],
    getConfigurations: () => {},
    setConfigurations: () => {},
    destination: '',

    setDestination: () => {},
    sourceApplicationId: '',
    setSourceApplicationId: () => {},
    sourceApplicationIntegrationId: '',
    setSourceApplicationIntegrationId: () => {},
    resetSourceAndDestination: () => {},
};
