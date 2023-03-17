import {ISelect} from "../../features/configuration/types/Select";
import {
    IInstanceMetadataContent,
    IInstanceObjectCollectionMetadata,
    IIntegrationMetadata
} from "../../features/configuration/types/Metadata/IntegrationMetadata";

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
    instanceElementMetadata: IInstanceMetadataContent | undefined;
    instanceObjectCollectionMetadata: IInstanceObjectCollectionMetadata | undefined,
    getInstanceObjectCollectionMetadata: (key: string) => void,
    getAllMetadata: (onlyLatest: boolean) => void;
    getInstanceElementMetadata: (metadataId: string) => void;
    sourceApplication: number;
    setSourceApplication: (id: number) => void;
};

export const contextDefaultValues: SourceApplicationContextState = {
    isAdmin: false,
    setIsAdmin: () => {
    },
    availableForms: {
        sourceApplicationDisplayName: '',
        sourceApplicationId: '1',
        forms: [{value: 'null', label: 'Velg skjemaleverandør først'}]
    },
    getAllForms: () => {
    },
    getAvailableForms: () => {
    },
    allMetadata: [{
        instanceElementMetadata: [],
        sourceApplicationIntegrationUri: '',
        sourceApplicationIntegrationId: '',
        sourceApplicationId: '',
        integrationDisplayName: 'INGEN DATA',
        version: 0
    }],
    instanceElementMetadata: undefined,
    instanceObjectCollectionMetadata: undefined,
    getInstanceObjectCollectionMetadata: () => {
    },
    getAllMetadata: () => {
    },
    getInstanceElementMetadata: () => {
    },
    sourceApplication: 1,
    setSourceApplication: () => {
    }
};