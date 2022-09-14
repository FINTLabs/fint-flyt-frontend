import {IIntegrationConfiguration} from "../../features/integration/types/IntegrationConfiguration";
import {IForm} from "../../features/integration/types/Form";

export type IntegrationContextState = {
    integration: IIntegrationConfiguration;
    setIntegration: (configuration: IIntegrationConfiguration) => void;
    integrations: IIntegrationConfiguration[];
    setIntegrations: (configurations: IIntegrationConfiguration[]) => void;
    getIntegrations: () => void;
    destination: string,
    selectedForm: IForm;
    setSelectedForm: (form: IForm) => void,
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
    selectedForm: {
        instanceElementMetadata: [],
        sourceApplicationIntegrationUri: '',
        sourceApplicationIntegrationId: ''
    },
    setSelectedForm: () => {},
    setDestination: () => {},
    sourceApplicationId: '',
    setSourceApplicationId: () => {},
    sourceApplicationIntegrationId: '',
    setSourceApplicationIntegrationId: () => {},
    resetSourceAndDestination: () => {},
};
