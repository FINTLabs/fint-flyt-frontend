import { useContext } from 'react';

import { IValueConverting } from '../../features/valueConverting/types/ValueConverting';
import { Page } from '../components/types/TableTypes';
import { ApiAdapterContext } from './ApiAdapterContext';

const API_URL = import.meta.env.VITE_API_VALUE_CONV || '';

export type GetValueConvertingsParams = {
    page: number;
    size: number;
    sortProperty?: string;
    sortDirection?: 'ASC' | 'DESC';
    excludeConvertingMap?: boolean;
    sourceApplicationIds?: number[];
    fromTypeId?: number;
    toTypeId?: number;
    toApplicationId?: number;
    displayName?: string;
    createdBy?: string;
    createdFrom?: string;
    createdTo?: string;
    modifiedBy?: string;
    modifiedFrom?: string;
    modifiedTo?: string;
};

export default function useValueConvertingRepository() {
    const { get, post } = useContext(ApiAdapterContext);

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
                fromTypeId: fromTypeId?.toString(),
                toTypeId: toTypeId?.toString(),
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

    return { getValueConvertings, getValueConverting, createValueConverting };
}
