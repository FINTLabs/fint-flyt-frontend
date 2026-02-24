import { FilterOption, Filters } from './types';
import { useFilterOptions } from './OptionsContext';

export const EMPTY_FILTERS: Filters = {
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
    lastStatusEvent: [],
    destinationIds: [],
    sort: '',
};

export const FILTER_KEYS = Object.keys(EMPTY_FILTERS) as Array<keyof Filters>;

export const VALUE_TEXT_FILTERS = ['timeCurrentPeriod', 'storageStatuses'];
export const SPECIAL_FILTERS = [
    'timeOffSetHours',
    'timeOffsetMinutes',
    'timeTimestampMin',
    'timeTimestampMax',
];

const apiOptionMap: Record<string, keyof ReturnType<typeof useFilterOptions>> = {
    integrationIds: 'integrationOptions',
    sourceApplicationIds: 'sourceApplicationIdOptions',
    sourceApplicationIntegrationIds: 'sourceApplicationIntegrationOptions',
    associatedEvents: 'eventCategoriesOptions',
    lastStatusEvent: 'instanceStatusEventCategoriesOptions',
};

export const isEmptyFilterValue = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    const empty = EMPTY_FILTERS[key];

    if (Array.isArray(empty)) {
        return !Array.isArray(value) || value.length === 0;
    }

    if (empty instanceof Date || value instanceof Date) {
        return value == null; // tom = null
    }

    return value === empty || value === null || value === undefined || value === '';
};

export function setSingleValue(
    updateFilter: (key: keyof Filters, value: string | null) => void,
    key: keyof Filters,
    value: string | null
) {
    updateFilter(key, value);
}

export function updateArrayValue(
    updateFilter: (key: keyof Filters, value: string[]) => void,
    filters: Filters,
    key: keyof Filters,
    option: string,
    isSelected: boolean
) {
    const prevArray = (filters[key] as string[]) ?? [];

    const newArray = isSelected ? [...prevArray, option] : prevArray.filter((v) => v !== option);

    updateFilter(key, newArray.length > 0 ? newArray : []);
}

export function setArrayValue(
    updateFilter: (key: keyof Filters, value: string[]) => void,
    key: keyof Filters,
    value: string[]
) {
    updateFilter(key, value);
}

export function setCommaSeparatedValue(
    updateFilter: (key: keyof Filters, value: string[]) => void,
    key: keyof Filters,
    value: string
) {
    const newArray = value
        ? value
              .split(',')
              .map((v) => v.trim())
              .filter((v) => v !== '')
        : [];

    updateFilter(key, newArray);
}

export const parseValueToDate = (dateString: string | null): Date | null => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return Number.isNaN(date.getTime()) ? null : date;
};

export const parseValueToArray = (arrayString: string | null) =>
    arrayString ? arrayString.split(',').map((v) => v.trim()) : [];

export const parseValueToString = (value: string | null) => value ?? '';

export const writeValueToSearchParam = (
    params: URLSearchParams,
    key: keyof Filters,
    value: Filters[keyof Filters]
) => {
    if (Array.isArray(value)) {
        params.set(String(key), value.join(','));
    } else if (value instanceof Date) {
        params.set(String(key), value.toISOString());
    } else {
        params.set(String(key), String(value));
    }
};

export const deleteAllFilterParams = (params: URLSearchParams): void => {
    for (const key of FILTER_KEYS) {
        params.delete(String(key));
    }
};

export const shouldUseApiOptions = (key: string): boolean => {
    return key === '';
};

export const shouldInsertValue = (key: string): boolean => {
    return key === 'timeOffSetHours';
};

export const getApiLabel = (
    key: string,
    value: Filters[keyof Filters],
    timeCurrentPeriodOptions: FilterOption[]
): string | undefined => {
    console.log('getApiLabel', key, timeCurrentPeriodOptions);
    if (key === 'timeCurrentPeriod') {
        return timeCurrentPeriodOptions.find((option) => option.value === value)?.label;
    }
};

const geti18nKey = ({ key, i18n, t }: { key: string; i18n: any; t: any }): string | undefined => {
    const valueKey = `filterNames.${key}`;
    const fullKeyToValue = `pages.instances.filter.activeFilters.${valueKey}`;

    if (i18n.exists(fullKeyToValue)) {
        return t(valueKey);
    }
};

const geti18nValue = ({
    key,
    value,
    i18n,
    t,
}: {
    key: string;
    value: any;
    i18n: any;
    t: any;
}): string | undefined => {
    const valueKey = `${key}.${value}`;
    const fullKeyToValue = `pages.instances.filter.activeFilters.${valueKey}`;

    if (i18n.exists(fullKeyToValue)) {
        return t(valueKey);
    }
};

export function getFilterLabel({
    key,
    value,
    i18n,
    t,
    options,
}: {
    key: string;
    value: any;
    i18n: any;
    t: any;
    options: ReturnType<typeof useFilterOptions>;
}) {
    let valuetext: string | undefined = undefined;
    console.log('getFilterLabel', key, value);
    const optionListKey = apiOptionMap[key];
    console.log('= optionListKey', optionListKey);
    if (optionListKey) {
        const optionList = options[optionListKey] as Array<{ value: string; label: string }>;

        console.log('= optionList', optionList);

        if (Array.isArray(value)) {
            valuetext = value
                .map((val) => optionList.find((o) => o.value === val)?.label ?? val)
                .join(', ');
        } else {
            valuetext = optionList.find((o) => o.value === value)?.label ?? value;
        }
    } else {
        valuetext = geti18nValue({ key, value, i18n, t });
    }

    console.log('= valuetext', valuetext);
    if (VALUE_TEXT_FILTERS.includes(key)) {
        return valuetext || value;
    }

    const translatedKeyText = geti18nKey({ key, i18n, t });

    return `${translatedKeyText || key}: ${valuetext || value}`;
}
