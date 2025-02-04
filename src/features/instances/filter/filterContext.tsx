// src/context/FilterContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface Filters {
    quickSelected: string | null;
    timeType: string | null;
    dateFrom: string | null;
    dateTo: string | null;
    integrationType: string;
    selectedIntegrations: string[];
    selectedSourceApps: string[];
    selectedInstanceSource: string[];
    selectedDestinationSource: string[];
    selectedStatus: string[];
    selectedEvents: string[];
    statusType: string;
    selectedConnectedEvent: string[];
    selectedStorage: string[];
}

interface FilterContextProps {
    filters: Filters;
    updateFilter: (key: keyof Filters, value: string | string[] | null) => void;
    clearFilters: () => void;
}

const FilterContext = createContext<FilterContextProps | null>(null);

export const useFilters = () => {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error("useFilters must be used within a FilterProvider");
    }
    return context;
};

interface FilterProviderProps {
    children: ReactNode;
}

export const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
    const defaultFilters: Filters = {
        quickSelected: null,
        timeType: null,
        dateFrom: null,
        dateTo: null,
        integrationType: "",
        selectedIntegrations: [],
        selectedSourceApps: [],
        selectedInstanceSource: [],
        selectedDestinationSource: [],
        selectedStatus: [],
        selectedEvents: [],
        statusType: "",
        selectedConnectedEvent: [],
        selectedStorage: [],
    };

    const [filters, setFilters] = useState<Filters>(defaultFilters);

    const updateFilter = (key: keyof Filters, value: string | string[] | null) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
        console.log(`Filter updated: ${key} =`, value);
    };

    const clearFilters = () => {
        setFilters(defaultFilters);
        console.log("Filters cleared");
    };

    return (
        <FilterContext.Provider value={{ filters, updateFilter, clearFilters }}>
            {children}
        </FilterContext.Provider>
    );
};
