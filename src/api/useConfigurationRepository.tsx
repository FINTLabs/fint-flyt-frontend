import { useContext } from 'react';
import { IConfiguration, IConfigurationPatch } from '../features/configuration/types/Configuration';
import { ApiAdapterContext } from '../context/ApiAdapterContext';
import { Page } from '../components/types/TableTypes';
const API_URL = import.meta.env.VITE_API_CONF || '';

export default function useConfigurationRepository() {
    const { get, post, patch, deleteFetch } = useContext(ApiAdapterContext);

    const getConfigurations = (
        page: number,
        size: number,
        sortProperty: string,
        sortDirection: string,
        complete: boolean,
        integrationId: string,
        excludeElements?: boolean
    ) => {
        return get<Page<IConfiguration>>(API_URL, '/api/intern/konfigurasjoner', {
            params: {
                side: page,
                antall: size,
                sorteringFelt: sortProperty,
                sorteringRetning: sortDirection,
                ferdigstilt: complete,
                integrasjonId: integrationId,
                ekskluderMapping: excludeElements,
            },
        });
    };
    const getConfigurationById = (configurationId: string, excludeElements?: boolean) => {
        return get<IConfiguration>(API_URL, `/api/intern/konfigurasjoner/${configurationId}`, {
            params: { ekskluderMapping: excludeElements },
        });
    };
    const createConfiguration = (data: IConfiguration) => {
        return post<IConfiguration>(API_URL, `/api/intern/konfigurasjoner`, data);
    };
    const updateConfiguration = (configurationId: string, data: IConfigurationPatch) => {
        return patch<IConfiguration>(
            API_URL,
            `/api/intern/konfigurasjoner/${configurationId}`,
            data
        );
    };
    const deleteConfiguration = (configurationId: string) => {
        return deleteFetch(API_URL, `/api/intern/konfigurasjoner/${configurationId}`);
    };

    return {
        getConfigurations,
        getConfigurationById,
        createConfiguration,
        updateConfiguration,
        deleteConfiguration,
    };
}
