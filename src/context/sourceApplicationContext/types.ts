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
    setInstanceElementMetadata: (instanceMetadataContent: IInstanceMetadataContent | undefined) => void;
    instanceObjectCollectionMetadata: IInstanceObjectCollectionMetadata[],
    getInstanceObjectCollectionMetadata: (key: string[]) => void,
    getAllMetadata: (onlyLatest: boolean) => void;
    getInstanceElementMetadata: (metadataId: string) => void;
    sourceApplication: number | undefined;
    setSourceApplication: (id: number | undefined) => void;
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
    setInstanceElementMetadata: () => {
    },
    instanceObjectCollectionMetadata: [],
    getInstanceObjectCollectionMetadata: () => {
    },
    getAllMetadata: () => {
    },
    getInstanceElementMetadata: () => {
    },
    sourceApplication: undefined,
    setSourceApplication: () => {
    }
};