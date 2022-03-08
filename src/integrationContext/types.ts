import {IIntegrationConfiguration} from "../features/integration/types/IntegrationConfiguration";

export type IntegrationContextState = {
    integration: IIntegrationConfiguration;
    setIntegration: (configuration: IIntegrationConfiguration) => void;
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
};