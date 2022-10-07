import {ISelect} from "../../features/integration/types/InputField";
import {IIntegrationMetadata} from "../../features/integration/types/IntegrationMetadata";

export interface ISourceApplicationItem {
    sourceApplicationDisplayName: string;
    sourceApplicationId: string;
    forms: ISelect[];
}

export type SourceApplicationContextState = {
    availableForms: ISourceApplicationItem;
    getAllForms: (forms: ISelect[]) => void;
    getAvailableForms: () => void;
    metadata: IIntegrationMetadata[];
    getMetadata: () => void;
    sourceApplication: string | null;
    setSourceApplication: (id: string | null) => void;
};

export const contextDefaultValues: SourceApplicationContextState = {
    availableForms: {sourceApplicationDisplayName: '', sourceApplicationId: '1', forms: [{value: 'null', label: 'Velg skjemaleverandør først'}]},
    getAllForms: () => {},
    getAvailableForms: () => {},
    metadata: [{instanceElementMetadata: [],
        sourceApplicationIntegrationUri: '',
        sourceApplicationIntegrationId: '',
        sourceApplicationId: '',
        integrationDisplayName: 'INGEN DATA',
        version: 0
    }],
    getMetadata: () => {},
    sourceApplication: null,
    setSourceApplication: () => {}
};
