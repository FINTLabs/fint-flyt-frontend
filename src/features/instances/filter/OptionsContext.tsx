import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
    Dispatch,
    SetStateAction,
    useCallback,
} from 'react';
import useInstanceFlowTrackingRepository from '../../../api/useInstanceFlowTrackingRepository';
import { IIntegration } from '../../integration/types/Integration';
import { FilterOption, Filters } from './types';



interface OptionsContextProps {
    statusesOptions: FilterOption[];
    storageStatusesOptions: FilterOption[];
    eventCategoriesOptions: FilterOption[];
    instanceStatusEventCategoriesOptions: FilterOption[];
    timeCurrentPeriodOptions: FilterOption[];
    setAllIntegrations: Dispatch<SetStateAction<IIntegration[]>>;
    integrationOptions: FilterOption[];
    sourceApplicationIdOptions: FilterOption[];
    setSourceApplicationIdOptions: (options: FilterOption[]) => void;
    sourceApplicationIntegrationOptions: FilterOption[];
    updateSourceApplicationIntegrationByActiveFilters: (filter: Filters) => void;
}

const OptionsContext = createContext<OptionsContextProps | null>(null);

export const useFilterOptions = () => {
    const context = useContext(OptionsContext);
    if (!context) {
        throw new Error('useOptions must be used within an OptionsProvider');
    }
    return context;
};

interface OptionsProviderProps {
    children: ReactNode;
}

export const FilterOptionsProvider: React.FC<OptionsProviderProps> = ({ children }) => {
    const InstanceFlowTrackingRepository = useInstanceFlowTrackingRepository();
    const [statusesOptions, setStatusesOptions] = useState<FilterOption[]>([]);
    const [storageStatusesOptions, setStorageStatusesOptions] = useState<FilterOption[]>([]);
    const [eventCategoriesOptions, setEventCategoriesOptions] = useState<FilterOption[]>([]);
    const [instanceStatusEventCategoriesOptions, setInstanceStatusEventCategoriesOptions] =
        useState<FilterOption[]>([]);
    const [timeCurrentPeriodOptions, setTimeCurrentPeriodOptions] = useState<FilterOption[]>([]);

    const [allIntegrations, setAllIntegrations] = useState<IIntegration[]>([]);
    const [integrationOptions, setIntegrationOptions] = useState<FilterOption[]>([]);
    const [sourceApplicationIdOptions, setSourceApplicationIdOptions] = useState<FilterOption[]>(
        []
    );
    const [sourceApplicationIntegrationOptions, setSourceApplicationIntegrationOptions] = useState<
        FilterOption[]
    >([]);

    const fetchData = async (endpoint: string, setState: (data: FilterOption[]) => void) => {
        try {
            InstanceFlowTrackingRepository.getSelectables(endpoint).then((response) =>
                setState(response.data)
            );
        } catch (error) {
            console.error(`Error fetching ${endpoint}:`, error);
        }
    };

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

    const updateSourceApplicationIntegrationByActiveFilters = useCallback(
        (filters: Filters) => {
            const filteredData = allIntegrations
                .filter(
                    (integration) =>
                        !!integration.sourceApplicationIntegrationId &&
                        (!filters.sourceApplicationIds?.length ||
                            filters.sourceApplicationIds.includes(
                                integration.sourceApplicationId?.toString() ?? ''
                            ))
                )
                .map((integration) => ({
                    label: integration.sourceApplicationIntegrationId
                        ? integration.sourceApplicationIntegrationId
                        : '',
                    value: integration.sourceApplicationIntegrationId
                        ? integration.sourceApplicationIntegrationId
                        : '',
                }))
                .filter(
                    (option, index, self) =>
                        self.findIndex((o) => o.value === option.value) === index
                )
                .sort((a, b) => a.label.localeCompare(b.label, undefined, { numeric: true }));
            setSourceApplicationIntegrationOptions(filteredData);
        },
        [allIntegrations]
    );

    useEffect(() => {
        if (allIntegrations.length > 0) {
            const filteredIntegrations = allIntegrations
                .map((integration) => ({
                    label: `${integration.id} - ${integration.displayName}`,
                    value: `${integration.id ?? ''}`,
                }))
                .sort((a, b) => {
                    return Number(a.value) - Number(b.value);
                });
            if (filteredIntegrations) {
                setIntegrationOptions(filteredIntegrations);
            }
        }
    }, [allIntegrations]);

    return (
        <OptionsContext.Provider
            value={{
                statusesOptions,
                storageStatusesOptions,
                eventCategoriesOptions,
                instanceStatusEventCategoriesOptions,
                timeCurrentPeriodOptions,
                setAllIntegrations,
                integrationOptions,
                sourceApplicationIdOptions,
                setSourceApplicationIdOptions,
                sourceApplicationIntegrationOptions,
                updateSourceApplicationIntegrationByActiveFilters,
            }}
        >
            {children}
        </OptionsContext.Provider>
    );
};
