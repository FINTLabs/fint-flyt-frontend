import {IIntegrationConfiguration} from "../../features/integration/types/IntegrationConfiguration";

export type IntegrationContextState = {
    integration: IIntegrationConfiguration;
    setIntegration: (configuration: IIntegrationConfiguration) => void;
    integrations: IIntegrationConfiguration[];
    setIntegrations: (configurations: IIntegrationConfiguration[]) => void;
    getIntegrations: () => void;
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
        description: '',
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
    destination: '',

    setDestination: () => {},
    sourceApplicationId: '',
    setSourceApplicationId: () => {},
    sourceApplicationIntegrationId: '',
    setSourceApplicationIntegrationId: () => {},
    resetSourceAndDestination: () => {},
};
