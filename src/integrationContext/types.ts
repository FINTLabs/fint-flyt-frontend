import {IIntegrationConfiguration} from "../features/integration/types/IntegrationConfiguration";

export type IntegrationContextState = {
    integration: IIntegrationConfiguration;
    setIntegration: (configuration: IIntegrationConfiguration) => void;
    destination: string,
    setDestination: (destination: string) => void;
    sourceApplication: string,
    setSourceApplication: (destination: string) => void,
    resetSourceAndDestination: () => void;
};

export const contextDefaultValues: IntegrationContextState = {
    integration: {
        name: '',
        description: '',
        integrationId: '',
        sourceApplication: '',
        sourceApplicationIntegrationId: '',
        version: undefined,
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
    resetSourceAndDestination: () => {},
};