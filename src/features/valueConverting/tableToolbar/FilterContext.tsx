import React, { createContext, ReactNode, useContext, useState } from 'react';
import { ValueConvertingFilters } from './types';

const EMPTY_FILTERS: ValueConvertingFilters = {
    sourceApplicationIds: [],
    createdFrom: null,
    createdTo: null,
    modifiedFrom: null,
    modifiedTo: null,
    sort: null,
};

type FilterContextProps = {
    filters: ValueConvertingFilters;
    updateFilter: <K extends keyof ValueConvertingFilters>(
        key: K,
        value: ValueConvertingFilters[K]
    ) => void;
    updateFiltersAndSave: (next: ValueConvertingFilters) => void;
    saveFilters: () => void;
    clearFilters: () => void;
    numberOfActiveFilters: number;
    refreshKey: number;
    isSaved: boolean;
    updateSort: (sort: string) => void;
};

const FilterContext = createContext<FilterContextProps | null>(null);

export const useValueConvertingFilters = () => {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error(
            'useValueConvertingFilters must be used within a ValueConvertingFilterProvider'
        );
    }
    return context;
};

function countActiveFilters(filters: ValueConvertingFilters): number {
    let count = 0;
    if (filters.sourceApplicationIds.length > 0) count += 1;
    if (filters.createdFrom || filters.createdTo) count += 1;
    if (filters.modifiedFrom || filters.modifiedTo) count += 1;
    return count;
}

export function ValueConvertingFilterProvider({ children }: { children: ReactNode }) {
    const [filters, setFilters] = useState<ValueConvertingFilters>({ ...EMPTY_FILTERS });
    const [refreshKey, setRefreshKey] = useState(0);
    const [isSaved, setIsSaved] = useState(true);

    const numberOfActiveFilters = countActiveFilters(filters);

    const updateFilter = <K extends keyof ValueConvertingFilters>(
        key: K,
        value: ValueConvertingFilters[K]
    ) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
        setIsSaved(false);
    };

    const updateSort = (sort: string) => {
        setFilters((prev) => ({ ...prev, sort }));
        setRefreshKey((prev) => prev + 1);
        setIsSaved(true);
    };

    const applyFilters = (next: ValueConvertingFilters) => {
        setFilters(next);
        setRefreshKey((prev) => prev + 1);
        setIsSaved(true);
    };

    const updateFiltersAndSave = (next: ValueConvertingFilters) => {
        applyFilters(next);
    };

    const clearFilters = () => {
        applyFilters({ ...EMPTY_FILTERS });
    };

    const saveFilters = () => {
        applyFilters(filters);
    };

    return (
        <FilterContext.Provider
            value={{
                filters,
                updateFilter,
                updateFiltersAndSave,
                saveFilters,
                clearFilters,
                numberOfActiveFilters,
                refreshKey,
                isSaved,
                updateSort,
            }}
        >
            {children}
        </FilterContext.Provider>
    );
}
