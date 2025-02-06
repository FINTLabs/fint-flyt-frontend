import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';

export interface Filters {
    sourceApplicationIds: string[] | null;
    sourceApplicationIntegrationIds: string[] | null;
    sourceApplicationInstanceIds: string[] | null;
    integrationIds: string[] | null;
    timeOffSetHours: string | null;
    timeOffsetMinutes: string | null;
    timeCurrentPeriod: string | null;
    timeTimestampMin: string | null;
    timeTimestampMax: string | null;
    statuses: string[] | null;
    storageStatuses: string[] | null;
    associatedEventNames: string[] | null;
    destinationIds: string[] | null;
}

interface FilterContextProps {
    filters: Filters;
    updateFilter: (key: keyof Filters, value: string | string[] | null) => void;
    printFilters: () => void;
    clearFilters: () => void;
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

    // const getParam = (key: string, isArray = false): string | string[] | null => {
    //     const value = searchParams.getAll(key);
    //     return isArray ? value : value.length > 0 ? value[0] : null;
    // };
    const getParam = (key: string, isArray = false): string | string[] | null => {
        const value = searchParams.get(key);

        if (!value) return isArray ? [] : null;

        return isArray ? value.split(',').map((v) => v.trim()) : value;
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
        timeTimestampMin: getParam('timeTimestampMin', false) as string,
        timeTimestampMax: getParam('timeTimestampMax', false) as string,
        statuses: getParam('statuses', true) as string[],
        storageStatuses: getParam('storageStatuses', true) as string[],
        associatedEventNames: getParam('associatedEventNames', true) as string[],
        destinationIds: getParam('destinationIds', true) as string[],
    };

    const [filters, setFilters] = useState<Filters>(defaultFilters);

    // const updateFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    //     setFilters((prev) => ({
    //         ...prev,
    //         [key]: value,
    //     }));
    // };
    const updateFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value,
        }));

        const newParams = new URLSearchParams(searchParams);

        if (Array.isArray(value)) {
            if (value.length > 0) {
                newParams.set(key, value.join(','));
            } else {
                newParams.delete(key);
            }
        } else {
            if (value === null || value === '') {
                newParams.delete(key);
            } else {
                newParams.set(key, value);
            }
        }

        setSearchParams(newParams);
    };

    const clearFilters = () => {
        setFilters(defaultFilters);
        setSearchParams(new URLSearchParams());
    };
    const printFilters = () => {
        console.log('CURRENT FILTERS:::', filters);
    };

    useEffect(() => {
        setFilters(defaultFilters);
    }, [searchParams.toString()]);

    return (
        <FilterContext.Provider value={{ filters, updateFilter, clearFilters, printFilters }}>
            {children}
        </FilterContext.Provider>
    );
};
