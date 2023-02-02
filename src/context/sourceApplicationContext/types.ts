import {ISelect} from "../../features/configuration/types/InputField";
import {IInstanceElementMetadata, IIntegrationMetadata} from "../../features/configuration/types/IntegrationMetadata";

export interface ISourceApplicationItem {
    sourceApplicationDisplayName: string;
    sourceApplicationId: string;
    forms: ISelect[];
}

export type SourceApplicationContextState = {
    isAdmin: boolean;
    setIsAdmin: (admin: boolean) => void;
    availableForms: ISourceApplicationItem;
    getAllForms: (forms: ISelect[]) => void;
    getAvailableForms: () => void;
    allMetadata: IIntegrationMetadata[];
    instanceElementMetadata: IInstanceElementMetadata | undefined;
    getAllMetadata: (onlyLatest: boolean) => void;
    getInstanceElementMetadata: (metadataId: string) => void;
    sourceApplication: number;
    setSourceApplication: (id: number) => void;
};

export const contextDefaultValues: SourceApplicationContextState = {
    isAdmin: false,
    setIsAdmin: (admin: boolean) => {},
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
    sourceApplication: 1,
    setSourceApplication: () => {}
};
