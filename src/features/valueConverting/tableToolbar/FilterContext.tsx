import React, { createContext, ReactNode, useContext, useState } from 'react';

import { SortState, ValueConvertingFilters } from './types';

const EMPTY_FILTERS: ValueConvertingFilters = {
    displayName: null,
    sourceApplicationIds: [],
    toApplicationId: null,
    toTypeId: null,
    fromTypeId: null,
    createdFrom: null,
    createdTo: null,
    modifiedFrom: null,
    modifiedTo: null,
    sort: {
        orderBy: undefined,
        direction: undefined
    }
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
    refresh: () => void;
    isSaved: boolean;
    updateSort: (sort: SortState) => void;
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
    if (filters.displayName) count += 1;
    if (filters.sourceApplicationIds.length > 0) count += 1;
    if (filters.toApplicationId) count += 1;
    if (filters.toTypeId) count += 1;
    if (filters.fromTypeId) count += 1;
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

    const updateSort = (sort: SortState) => {
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

    const refresh = () => {
        setRefreshKey((prev) => prev + 1);
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
                refresh,
                isSaved,
                updateSort,
            }}
        >
            {children}
        </FilterContext.Provider>
    );
}
