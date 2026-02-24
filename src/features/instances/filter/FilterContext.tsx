import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import { useSearchParams } from 'react-router';
import { Filters } from './types';
import {
    deleteAllFilterParams,
    EMPTY_FILTERS,
    FILTER_KEYS,
    isEmptyFilterValue,
    parseValueToArray,
    parseValueToDate,
    parseValueToString,
    writeValueToSearchParam,
} from './util';

interface FilterContextProps {
    filters: Filters;
    updateFilter: (key: keyof Filters, value: string | string[] | Date | null) => void;
    updateFilterAndSave: (key: keyof Filters, value: string | string[] | Date | null) => void;
    saveFilters: () => void;
    clearFilters: () => void;
    numberOfActiveFilters: number;
    refreshKey: number;
    setQuickFilters: (patch: Partial<Filters>) => void;
    isSaved: boolean;
}

const FilterContext = createContext<FilterContextProps | null>(null);

export const useFilters = () => {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error('useFilters must be used within a FilterProvider');
    }
    return context;
};

interface FilterProviderProps {
    children: ReactNode;
}

export const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const defaultFilters = useMemo<Filters>(() => {
        const get = (key: string) => searchParams.get(key);

        return {
            sourceApplicationIds: parseValueToArray(get('sourceApplicationIds')),
            sourceApplicationIntegrationIds: parseValueToArray(
                get('sourceApplicationIntegrationIds')
            ),
            sourceApplicationInstanceIds: parseValueToArray(get('sourceApplicationInstanceIds')),
            integrationIds: parseValueToArray(get('integrationIds')),
            timeOffSetHours: parseValueToString(get('timeOffSetHours')),
            timeOffsetMinutes: parseValueToString(get('timeOffsetMinutes')),
            timeCurrentPeriod: parseValueToString(get('timeCurrentPeriod')),
            timeTimestampMin: parseValueToDate(get('timeTimestampMin')),
            timeTimestampMax: parseValueToDate(get('timeTimestampMax')),
            statuses: parseValueToArray(get('statuses')),
            storageStatuses: parseValueToArray(get('storageStatuses')),
            associatedEvents: parseValueToArray(get('associatedEvents')),
            lastStatusEvent: parseValueToArray(get('lastStatusEvent')),
            destinationIds: parseValueToArray(get('destinationIds')),
            sort: parseValueToString(get('sort')),
        };
    }, []);

    const [filters, setFilters] = useState<Filters>(defaultFilters);
    const [refreshKey, setRefreshKey] = useState(0);
    const [isSaved, setIsSaved] = useState(true);

    const numberOfActiveFilters = useMemo(() => {
        return Object.values(filters).filter((v) => {
            if (Array.isArray(v)) return v.length > 0;
            return v !== '' && v !== null && v !== undefined;
        }).length;
    }, [filters]);

    const updateFilter = (key: keyof Filters, value: Filters[keyof Filters]) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
        setIsSaved(false);
    };

    const updateFilterAndSave = (key: keyof Filters, value: Filters[keyof Filters]) => {
        setFilters((prev) => {
            const next = { ...prev, [key]: value };

            const params = new URLSearchParams(searchParams);

            params.delete(key as string);

            if (!isEmptyFilterValue(key, value)) {
                writeValueToSearchParam(params, key, value);
            }

            setSearchParams(params);
            setRefreshKey((r) => r + 1);
            setIsSaved(true);
            return next;
        });
    };

    const setQuickFilters = (patch: Partial<Filters>) => {
        const next: Filters = { ...EMPTY_FILTERS };

        Object.keys(patch).forEach((key) => {
            const typedKey = key as keyof Filters;
            const val = patch[typedKey];
            if (val !== undefined) {
                // @ts-ignore
                next[typedKey] = val;
            }
        });

        const params = new URLSearchParams(searchParams);
        deleteAllFilterParams(params);

        for (const key of FILTER_KEYS) {
            const value = next[key];

            if (!isEmptyFilterValue(key, value)) {
                writeValueToSearchParam(params, key, value);
            }
        }

        setFilters(next);
        setSearchParams(params);
        setRefreshKey((r) => r + 1);
        setIsSaved(true);
    };

    const clearFilters = () => {
        const params = new URLSearchParams(searchParams);

        FILTER_KEYS.forEach((key) => params.delete(key as string));

        setSearchParams(params);
        setFilters(EMPTY_FILTERS);
        setRefreshKey((prev) => prev + 1);
        setIsSaved(true);
    };

    const saveFilters = () => {
        const params = new URLSearchParams(searchParams);

        (Object.keys(filters) as Array<keyof Filters>).forEach((key) => {
            const value = filters[key];

            if (isEmptyFilterValue(key, value)) {
                params.delete(key as string);
                return;
            }

            if (Array.isArray(value)) {
                params.set(key as string, value.join(','));
            } else if (value instanceof Date) {
                params.set(key as string, value.toISOString());
            } else {
                params.set(key as string, String(value));
            }
        });

        setSearchParams(params);
        setRefreshKey((v) => v + 1);
        setIsSaved(true);
    };

    return (
        <FilterContext.Provider
            value={{
                filters,
                updateFilter,
                updateFilterAndSave,
                clearFilters,
                saveFilters,
                numberOfActiveFilters,
                refreshKey,
                setQuickFilters,
                isSaved
            }}
        >
            {children}
        </FilterContext.Provider>
    );
};
