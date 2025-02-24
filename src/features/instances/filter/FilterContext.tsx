import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filters } from './types';

interface FilterContextProps {
    filters: Filters;
    updateFilter: (key: keyof Filters, value: string | string[] | Date | null) => void;
    saveFilters: () => void;
    clearFilters: () => void;
    areFiltersActive: () => boolean;
    refreshKey: number;
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
    const [filtersSaved, setFiltersSaved] = useState(false);
    const [filtersActiveFromUrl, setFiltersActiveFromUrl] = useState(false);

    const emptyFilters: Filters = {
        sourceApplicationIds: [],
        sourceApplicationIntegrationIds: [],
        sourceApplicationInstanceIds: [],
        integrationIds: [],
        timeOffSetHours: null,
        timeOffsetMinutes: null,
        timeCurrentPeriod: null,
        timeTimestampMin: null,
        timeTimestampMax: null,
        statuses: [],
        storageStatuses: [],
        associatedEvents: [],
        lastEvent: [],
        destinationIds: [],
        sort: '',
    };

    const getParam = (key: string, isArray = false): string | string[] | null => {
        const value = searchParams.get(key);
        if (!value) return isArray ? [] : null;
        return isArray ? value.split(',').map((v) => v.trim()) : value;
    };

    const parseDateParam = (param: string | null): Date | null => {
        if (!param) return null;
        const date = new Date(param);
        return isNaN(date.getTime()) ? null : date;
    };

    const defaultFilters: Filters = {
        sourceApplicationIds: getParam('sourceApplicationIds', true) as string[],
        sourceApplicationIntegrationIds: getParam(
            'sourceApplicationIntegrationIds',
            true
        ) as string[],
        sourceApplicationInstanceIds: getParam('sourceApplicationInstanceIds', true) as string[],
        integrationIds: getParam('integrationIds', true) as string[],
        timeOffSetHours: getParam('timeOffSetHours', false) as string,
        timeOffsetMinutes: getParam('timeOffsetMinutes', false) as string,
        timeCurrentPeriod: getParam('timeCurrentPeriod', false) as string,
        timeTimestampMin: parseDateParam(getParam('timeTimestampMin', false) as string),
        timeTimestampMax: parseDateParam(getParam('timeTimestampMax', false) as string),
        statuses: getParam('statuses', true) as string[],
        storageStatuses: getParam('storageStatuses', true) as string[],
        associatedEvents: getParam('associatedEvens', true) as string[],
        lastEvent: getParam('lastEvent', true) as string[],
        destinationIds: getParam('destinationIds', true) as string[],
        sort: getParam('sort', false) as string,
    };

    const [filters, setFilters] = useState<Filters>(defaultFilters);
    const [refreshKey, setRefreshKey] = useState(0);

    const updateFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => {
        // console.log('UPDATING FILTER:', key, value);
        setFilters((prev) => ({
            ...prev,
            [key]: value,
        }));
        setFiltersSaved(false);
    };

    // const clearFilters = () => {
    //     setFilters(defaultFilters);
    //     setSearchParams(new URLSearchParams());
    //     setFiltersSaved(false);
    //     setRefreshKey((prev) => prev + 1);
    // };

    const clearFilters = () => {
        setFilters(emptyFilters);
        setSearchParams(new URLSearchParams());
        setFiltersSaved(false);
        setFiltersActiveFromUrl(false);
        setRefreshKey((prev) => prev + 1);
    };

    const saveFilters = () => {
        const newParams = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                if (value.length > 0) newParams.set(key, value.join(','));
            } else {
                if (value !== null && value !== '') newParams.set(key, value);
            }
        });
        const decodedParams = newParams.toString().replace(/%2C/g, ',');
        window.history.replaceState(null, '', `${window.location.pathname}?${decodedParams}`);
        setRefreshKey((prev) => prev + 1);
        setFiltersSaved(true);
    };

    const areFiltersActive = (): boolean => {
        console.log('FROM IS ACTIVE PARAMS', searchParams);
        return filtersActiveFromUrl || filtersSaved;
    };

    useEffect(() => {
        const hasFiltersInUrl = Object.values(defaultFilters).some(
            (value) =>
                (Array.isArray(value) && value.length > 0) ||
                (typeof value === 'string' && value !== '')
        );
        setFiltersActiveFromUrl(hasFiltersInUrl);
    }, []);

    return (
        <FilterContext.Provider
            value={{
                filters,
                updateFilter,
                clearFilters,
                saveFilters,
                areFiltersActive,
                refreshKey,
            }}>
            {children}
        </FilterContext.Provider>
    );
};
