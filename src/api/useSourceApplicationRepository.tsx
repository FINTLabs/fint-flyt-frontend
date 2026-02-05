import { useContext } from 'react';
import { ApiAdapterContext } from '../context/ApiAdapterContext';
import {
    IInstanceMetadataContent,
    IIntegrationMetadata,
} from '../features/configuration/types/Metadata/IntegrationMetadata';
const API_URL = import.meta.env.VITE_API_DISC || '';

export default function useSourceApplicationRepository() {
    const { get } = useContext(ApiAdapterContext);

    const getMetadata = (id: string, onlyLastestVersion?: boolean) => {
        return get<IIntegrationMetadata[]>(API_URL, '/api/intern/metadata', {
            params: { kildeapplikasjonId: id, bareSisteVersjoner: onlyLastestVersion },
        });
    };

    const getMetadataForSourceApplications = (ids: string, onlyLastestVersion?: boolean) => {
        return get<Record<number, IIntegrationMetadata[]>>(API_URL, '/api/intern/metadata', {
            params: { kildeapplikasjonIds: ids, bareSisteVersjoner: onlyLastestVersion },
        });
    };

    const getInstanceElementMetadataById = (metadataId: string) => {
        return get<IInstanceMetadataContent>(
            API_URL,
            `/api/intern/metadata/${metadataId}/instans-metadata`
        );
    };
    return {
        getMetadata,
        getMetadataForSourceApplications,
        getInstanceElementMetadataById
    };
}
