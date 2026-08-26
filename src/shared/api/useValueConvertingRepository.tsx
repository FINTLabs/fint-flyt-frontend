import { IValueConverting } from '../../features/valueConverting/types/ValueConverting';
import { useContext } from 'react';
import { ApiAdapterContext } from './ApiAdapterContext';
import { Page } from '../components/types/TableTypes';
const API_URL = import.meta.env.VITE_API_VALUE_CONV || '';

export default function useValueConvertingRepository() {
    const { get, post } = useContext(ApiAdapterContext);
    const getValueConvertings = (
        page: number,
        size: number,
        sortProperty: string,
        sortDirection: string,
        excludeConvertingMap?: boolean,
        sourceApplicationIds?: number[],
        fromTypeId?: number,
        toTypeId?: number,
        toApplicationId?: number,
        displayName?: string,
        createdBy?: string,
        createdFrom?: string,
        createdTo?: string,
        modifiedBy?: string,
        modifiedFrom?: string,
        modifiedTo?: string,
    ) => {
        return get<Page<IValueConverting>>(API_URL, '/api/intern/value-convertings', {
            params: {
                page: page,
                size: size,
                sortProperty: sortProperty,
                sortDirection: sortDirection,
                excludeConvertingMap: excludeConvertingMap,
                sourceApplicationIds: sourceApplicationIds?.join(','),
                fromTypeId: fromTypeId?.toString(),
                toTypeId: toTypeId?.toString(),
                toApplicationId: toApplicationId?.toString(),
                displayName: displayName,
                createdBy: createdBy,
                createdFrom: createdFrom,
                createdTo: createdTo,
                modifiedBy: modifiedBy,
                modifiedFrom: modifiedFrom,
                modifiedTo: modifiedTo,
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
