import { useContext } from 'react';
import { ISourceApplication } from '../features/configuration/types/SourceApplication';
import { ApiAdapterContext } from '../context/ApiAdapterContext';
import {
    IInstanceMetadataContent,
    IIntegrationMetadata,
} from '../features/configuration/types/Metadata/IntegrationMetadata';
const API_URL = import.meta.env.META_API || '';

export default function useSourceApplicationRepository() {
    const { get } = useContext(ApiAdapterContext);

    const getMetadata = (id: string, onlyLastestVersion?: boolean) => {
        return get<IIntegrationMetadata[]>(API_URL, '/api/intern/metadata', {
            params: { kildeapplikasjonId: id, bareSisteVersjoner: onlyLastestVersion },
        });
    };

    const getInstanceElementMetadataById = (metadataId: string) => {
        return get<IInstanceMetadataContent>(
            API_URL,
            `/api/intern/metadata/${metadataId}/instans-metadata`
        );
    };

    const getSourceApplications = (): ISourceApplication[] => {
        //return get("/api/intern/sourceApplicationData")
        return [
            { id: 1, displayName: 'ACOS Interact', available: true },
            { id: 2, displayName: 'eGrunnerverv', available: true },
            { id: 3, displayName: 'Digisak', available: true },
            { id: 4, displayName: 'VIGO', available: true },
            { id: 5, displayName: 'Altinn', available: true },
            { id: 6, displayName: 'HMSReg', available: true },
        ];
    };

    return {
        getMetadata,
        getInstanceElementMetadataById,
        getSourceApplications,
    };
}
