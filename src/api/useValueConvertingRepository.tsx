import { IValueConverting } from '../features/valueConverting/types/ValueConverting';
import { useContext } from 'react';
import { ApiAdapterContext } from '../context/ApiAdapterContext';
import { Page } from '../components/types/TableTypes';
const API_URL = import.meta.env.VALUE_CONV_API || '';

export default function useValueConvertingRepository() {
    const { get, post } = useContext(ApiAdapterContext);
    const getValueConvertings = (
        page: number,
        size: number,
        sortProperty: string,
        sortDirection: string,
        excludeConvertingMap?: boolean
    ) => {
        return get<Page<IValueConverting>>(API_URL, '/api/intern/value-convertings', {
            params: {
                page: page,
                size: size,
                sortProperty: sortProperty,
                sortDirection: sortDirection,
                excludeConvertingMap: excludeConvertingMap,
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
