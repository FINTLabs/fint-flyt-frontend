import {ISelect} from "../../features/integration/types/InputField";
import {IInstanceElementMetadata, IIntegrationMetadata} from "../../features/integration/types/IntegrationMetadata";

export interface ISourceApplicationItem {
    sourceApplicationDisplayName: string;
    sourceApplicationId: string;
    forms: ISelect[];
}

export type SourceApplicationContextState = {
    availableForms: ISourceApplicationItem;
    getAllForms: (forms: ISelect[]) => void;
    getAvailableForms: () => void;
    allMetadata: IIntegrationMetadata[];
    instanceElementMetadata: IInstanceElementMetadata | undefined;
    getAllMetadata: (onlyLatest: boolean) => void;
    getInstanceElementMetadata: (metadataId: string) => void;
    sourceApplication: number | null;
    setSourceApplication: (id: number | null) => void;
};

export const contextDefaultValues: SourceApplicationContextState = {
    availableForms: {sourceApplicationDisplayName: '', sourceApplicationId: '1', forms: [{value: 'null', label: 'Velg skjemaleverandør først'}]},
    getAllForms: () => {},
    getAvailableForms: () => {},
    allMetadata: [{instanceElementMetadata: [],
        sourceApplicationIntegrationUri: '',
        sourceApplicationIntegrationId: '',
        sourceApplicationId: '',
        integrationDisplayName: 'INGEN DATA',
        version: 0
    }],
    instanceElementMetadata: undefined,
    getAllMetadata: (onlyLatest) => {},
    getInstanceElementMetadata: (metadataId) => {},
    sourceApplication: null,
    setSourceApplication: () => {}
};
