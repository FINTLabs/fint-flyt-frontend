import {ISelect} from "../../features/integration/types/InputField";
import {IIntegrationMetadata} from "../../features/integration/types/IntegrationMetadata";

export interface ISourceApplicationItem {
    sourceApplication: string;
    sourceApplicationForms: ISelect[];
}

export type SourceApplicationContextState = {
    allForms: ISourceApplicationItem;
    availableForms: ISourceApplicationItem;
    getAllForms: (forms: ISelect[]) => void;
    getAvailableForms: () => void;
    metadata: IIntegrationMetadata[];
    getMetadata: () => void;
};

export const contextDefaultValues: SourceApplicationContextState = {
    allForms: {sourceApplication: '', sourceApplicationForms: []},
    availableForms: {sourceApplication: '', sourceApplicationForms: []},
    getAllForms: () => {},
    getAvailableForms: () => {},
    metadata: [{instanceElementMetadata: [],
        sourceApplicationIntegrationUri: '',
        sourceApplicationIntegrationId: '',
        sourceApplicationId: '',
        integrationDisplayName: 'INGEN DATA',
        version: 0
    }],
    getMetadata: () => {}
};
