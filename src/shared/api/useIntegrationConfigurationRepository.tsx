import { useContext } from 'react';

import {
    IInstanceMetadataContent,
    IIntegrationMetadata,
} from '../../features/configuration/types/Metadata/IntegrationMetadata';
import { IIntegration, IIntegrationPatch } from '../../features/newIntegration/types/Integration';
import { IValueConverting } from '../../features/valueConverting/types/ValueConverting';
import { Page } from '../types/TableTypes';
import { ApiAdapterContext } from './ApiAdapterContext';

const API_URL = import.meta.env.VITE_API_INTGR_CONF || '';

export type GetValueConvertingsParams = {
    page: number;
    size: number;
    sortProperty?: string;
    sortDirection?: 'ASC' | 'DESC';
    excludeConvertingMap?: boolean;
    sourceApplicationIds?: number[];
    fromTypeId?: string;
    toTypeId?: string;
    toApplicationId?: number;
    displayName?: string;
    createdBy?: string;
    createdFrom?: string;
    createdTo?: string;
    modifiedBy?: string;
    modifiedFrom?: string;
    modifiedTo?: string;
};

export default function useIntegrationConfigurationRepository() {
    const { get, post, put, deleteFetch, patch } = useContext(ApiAdapterContext);

    // Value Convertings
    const getValueConvertings = ({
        page,
        size,
        sortProperty,
        sortDirection,
        excludeConvertingMap,
        sourceApplicationIds,
        fromTypeId,
        toTypeId,
        toApplicationId,
        displayName,
        createdBy,
        createdFrom,
        createdTo,
        modifiedBy,
        modifiedFrom,
        modifiedTo,
    }: GetValueConvertingsParams) => {
        return get<Page<IValueConverting>>(API_URL, '/api/intern/value-convertings', {
            params: {
                page,
                size,
                sortProperty,
                sortDirection,
                excludeConvertingMap,
                sourceApplicationIds: sourceApplicationIds?.join(','),
                fromTypeId: fromTypeId,
                toTypeId: toTypeId,
                toApplicationId: toApplicationId?.toString(),
                displayName,
                createdBy,
                createdFrom,
                createdTo,
                modifiedBy,
                modifiedFrom,
                modifiedTo,
            },
        });
    };

    const getValueConverting = (valueConvertingId: number) => {
        return get<IValueConverting>(API_URL, `/api/intern/value-convertings/${valueConvertingId}`);
    };

    const createValueConverting = (data: IValueConverting) => {
        return post<IValueConverting>(API_URL, '/api/intern/value-convertings', data);
    };

    const updateValueConverting = (valueConvertingId: number, data: IValueConverting) => {
        return put<IValueConverting>(
            API_URL,
            `/api/intern/value-convertings/${valueConvertingId}`,
            data
        );
    };

    const deleteValueConverting = (valueConvertingId: number) => {
        return deleteFetch<void>(API_URL, `/api/intern/value-convertings/${valueConvertingId}`);
    };

    // Metadata
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

    // Integration
    const getAllIntegrations = () => {
        return get<IIntegration[]>(API_URL, '/api/intern/integrasjoner');
    };

    const getAllIntegrationBySourceApplicationId = (
        sourceApplicationId: string
    ): Promise<{ data: IIntegration[] }> => {
        return get(API_URL, `/api/intern/integrasjoner?sourceApplicationId=${sourceApplicationId}`);
    };

    const getIntegrations = (
        page: number,
        size: number | null,
        sortProperty: string,
        sortDirection: string
    ) => {
        return get<Page<IIntegration>>(API_URL, '/api/intern/integrasjoner', {
            params: {
                side: page,
                antall: size,
                sorteringFelt: sortProperty,
                sorteringRetning: sortDirection,
            },
        });
    };

    const getIntegration = (integrationId: string) => {
        return get(API_URL, `/api/intern/integrasjoner/${integrationId}`);
    };
    const createIntegration = (data: IIntegration) => {
        return post<IIntegration>(API_URL, '/api/intern/integrasjoner', data);
    };
    const updateIntegration = (integrationId: string, data: IIntegrationPatch) => {
        return patch<{ activeConfigurationId: string }>(
            API_URL,
            `/api/intern/integrasjoner/${integrationId}`,
            data
        );
    };

    return {
        getValueConvertings,
        getValueConverting,
        createValueConverting,
        updateValueConverting,
        deleteValueConverting,
        getMetadata,
        getMetadataForSourceApplications,
        getInstanceElementMetadataById,
        getAllIntegrations,
        getAllIntegrationBySourceApplicationId,
        getIntegrations,
        getIntegration,
        createIntegration,
        updateIntegration,
    };
}
