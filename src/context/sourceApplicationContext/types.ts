import {ISelect} from "../../features/configuration/types/Select";
import {
    IInstanceMetadataContent,
    IInstanceObjectCollectionMetadata,
    IIntegrationMetadata
} from "../../features/configuration/types/Metadata/IntegrationMetadata";

export type SourceApplicationContextState = {
    isAdmin: boolean;
    setIsAdmin: (admin: boolean) => void;
    availableForms: ISelect[];
    getAllIntegrationsAndSetAvailableForms: (forms: ISelect[]) => void;
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
    setIsAdmin: () => undefined,
    availableForms: [
        {value: 'null', label: 'Velg skjemaleverandør først'}
    ],
    getAllIntegrationsAndSetAvailableForms: () => undefined,
    getAvailableForms: () => undefined,
    allMetadata: [{
        id: '',
        instanceElementMetadata: [],
        sourceApplicationIntegrationUri: '',
        sourceApplicationIntegrationId: '',
        sourceApplicationId: '',
        integrationDisplayName: 'INGEN DATA',
        version: 0
    }],
    instanceElementMetadata: undefined,
    setInstanceElementMetadata: () => undefined,
    instanceObjectCollectionMetadata: [],
    getInstanceObjectCollectionMetadata: () => undefined,
    getAllMetadata: () => undefined,
    getInstanceElementMetadata: () => undefined,
    sourceApplication: undefined,
    setSourceApplication: () => undefined
};