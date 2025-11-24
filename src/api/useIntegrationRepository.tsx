import { IIntegration, IIntegrationPatch } from '../features/integration/types/Integration';
import { Page } from '../components/types/TableTypes';
import { useContext } from 'react';
import { ApiAdapterContext } from '../context/ApiAdapterContext';

export default function useIntegrationRepository() {
    const { get, post, patch } = useContext(ApiAdapterContext);

    const getAllIntegrations = () => {
        return get<IIntegration[]>('/api/intern/integrasjoner');
    };

    const getAllIntegrationBySourceApplicationId = (
        sourceApplicationId: string
    ): Promise<{ data: IIntegration[] }> => {
        return get(`/api/intern/integrasjoner?sourceApplicationId=${sourceApplicationId}`);
    };

    const getIntegrations = (
        page: number,
        size: number | null,
        sortProperty: string,
        sortDirection: string
    ) => {
        return get<Page<IIntegration>>('/api/intern/integrasjoner', {
            params: {
                side: page,
                antall: size,
                sorteringFelt: sortProperty,
                sorteringRetning: sortDirection,
            },
        });
    };

    const getIntegration = (integrationId: string) => {
        return get(`/api/intern/integrasjoner/${integrationId}`);
    };
    const createIntegration = (data: IIntegration) => {
        return post<IIntegration>('/api/intern/integrasjoner', data);
    };
    const updateIntegration = (integrationId: string, data: IIntegrationPatch) => {
        return patch<{ activeConfigurationId: string }>(
            `/api/intern/integrasjoner/${integrationId}`,
            data
        );
    };

    return {
        getIntegration,
        createIntegration,
        getIntegrations,
        updateIntegration,
        getAllIntegrations,
        getAllIntegrationBySourceApplicationId,
    };
}
