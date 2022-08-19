import {IIntegrationConfiguration} from "../../features/integration/types/IntegrationConfiguration";

export type IntegrationContextState = {
    integration: IIntegrationConfiguration;
    setIntegration: (configuration: IIntegrationConfiguration) => void;
    destination: string,
    setDestination: (destination: string) => void;
    sourceApplication: string,
    sourceApplicationIntegrationId: string,
    setSourceApplication: (destination: string) => void,
    setSourceApplicationIntegrationId: (id: string) => void,
    resetSourceAndDestination: () => void;
};

export const contextDefaultValues: IntegrationContextState = {
    integration: {
        description: '',
        integrationId: '',
        sourceApplication: '',
        sourceApplicationIntegrationId: '',
        version: undefined,
        published: false,
        applicantConfiguration: {fields: []},
        caseConfiguration: {fields: []},
        recordConfiguration: {fields: []},
        documentConfiguration: {fields:[]}
    },
    setIntegration: () => {},
    destination: '',
    setDestination: () => {},
    sourceApplication: '',
    setSourceApplication: () => {},
    sourceApplicationIntegrationId: '',
    setSourceApplicationIntegrationId: () => {},
    resetSourceAndDestination: () => {},
};
