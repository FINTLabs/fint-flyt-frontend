import { useContext } from 'react';
import { IConfiguration, IConfigurationPatch } from '../features/configuration/types/Configuration';
import { ApiAdapterContext } from '../context/ApiAdapterContext';
import { Page } from '../components/types/TableTypes';

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
        return get<Page<IConfiguration>>('/api/intern/konfigurasjoner/', {
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
        return get<IConfiguration>(`/api/intern/konfigurasjoner/${configurationId}`, {
            params: { ekskluderMapping: excludeElements },
        });
    };
    const createConfiguration = (data: IConfiguration) => {
        return post(`/api/intern/konfigurasjoner`, data);
    };
    const updateConfiguration = (configurationId: string, data: IConfigurationPatch) => {
        return patch(`/api/intern/konfigurasjoner/${configurationId}`, data);
    };
    const deleteConfiguration = (configurationId: string) => {
        return deleteFetch(`/api/intern/konfigurasjoner/${configurationId}`);
    };

    return {
        getConfigurations,
        getConfigurationById,
        createConfiguration,
        updateConfiguration,
        deleteConfiguration,
    };
}
