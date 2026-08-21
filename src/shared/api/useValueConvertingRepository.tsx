import { useContext } from 'react';

import { IValueConverting } from '../../features/valueConverting/types/ValueConverting';
import { Page } from '../components/types/TableTypes';
import { ApiAdapterContext } from './ApiAdapterContext';

const API_URL = import.meta.env.VITE_API_VALUE_CONV || '';

export type ValueConvertingQuery = {
    page: number;
    size: number;
    sortProperty: string;
    sortDirection: string;
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

    const getValueConvertings = (query: ValueConvertingQuery) => {
        return get<Page<IValueConverting>>(API_URL, '/api/intern/value-convertings', {
            params: {
                page: query.page,
                size: query.size,
                sortProperty: query.sortProperty,
                sortDirection: query.sortDirection,
                excludeConvertingMap: query.excludeConvertingMap,
                sourceApplicationIds: query.sourceApplicationIds?.join(','),
                fromTypeId: query.fromTypeId?.toString(),
                toTypeId: query.toTypeId?.toString(),
                toApplicationId: query.toApplicationId?.toString(),
                displayName: query.displayName,
                createdBy: query.createdBy,
                createdFrom: query.createdFrom,
                createdTo: query.createdTo,
                modifiedBy: query.modifiedBy,
                modifiedFrom: query.modifiedFrom,
                modifiedTo: query.modifiedTo,
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
