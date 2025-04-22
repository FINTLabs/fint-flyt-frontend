import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import axios from 'axios';

interface Option {
    value: string;
    label: string;
}

interface OptionsContextProps {
    statusesOptions: Option[];
    storageStatusesOptions: Option[];
    eventCategoriesOptions: Option[];
    instanceStatusEventCategoriesOptions: Option[];
    timeCurrentPeriodOptions: Option[];
    fetchOptions: () => void;
}

const OptionsContext = createContext<OptionsContextProps | null>(null);

export const useOptions = () => {
    const context = useContext(OptionsContext);
    if (!context) {
        throw new Error('useOptions must be used within an OptionsProvider');
    }
    return context;
};

interface OptionsProviderProps {
    children: ReactNode;
}

export const OptionsProvider: React.FC<OptionsProviderProps> = ({ children }) => {
    const [statusesOptions, setStatusesOptions] = useState<Option[]>([]);
    const [storageStatusesOptions, setStorageStatusesOptions] = useState<Option[]>([]);
    const [eventCategoriesOptions, setEventCategoriesOptions] = useState<Option[]>([]);
    const [instanceStatusEventCategoriesOptions, setInstanceStatusEventCategoriesOptions] =
        useState<Option[]>([]);
    const [timeCurrentPeriodOptions, setTimeCurrentPeriodOptions] = useState<Option[]>([]);

    // Generic API fetcher
    const fetchData = async (endpoint: string, setState: (data: Option[]) => void) => {
        try {
            const response = await axios.get<Option[]>(
                `/api/intern/instance-flow-tracking/value-space/${endpoint}`
            );
            setState(response.data);
        } catch (error) {
            console.error(`Error fetching ${endpoint}:`, error);
        }
    };

    // Fetch all options from APIs
    const fetchOptions = () => {
        fetchData('instance-status/selectables', setStatusesOptions);
        fetchData('storage-status/selectables', setStorageStatusesOptions);
        fetchData('event-category/selectables', setEventCategoriesOptions);
        fetchData(
            'instance-status-event-category/selectables',
            setInstanceStatusEventCategoriesOptions
        );
        fetchData('time/current-period/selectables', setTimeCurrentPeriodOptions);
    };

    useEffect(() => {
        fetchOptions();
    }, []);

    return (
        <OptionsContext.Provider
            value={{
                statusesOptions,
                storageStatusesOptions,
                eventCategoriesOptions,
                instanceStatusEventCategoriesOptions,
                timeCurrentPeriodOptions,
                fetchOptions,
            }}>
            {children}
        </OptionsContext.Provider>
    );
};
