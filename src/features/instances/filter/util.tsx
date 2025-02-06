import { Filters } from './filterContext';

export const getLabelsByIds = (
    ids: string[] | null,
    options: { value: string; label: string }[]
) => {
    if (!ids) return [];
    return options.filter((opt) => ids.includes(opt.value)).map((opt) => opt.label);
};

export function setSingleValue(
    updateFilter: (key: keyof Filters, value: string | null) => void,
    key: keyof Filters,
    value: string | null
) {
    updateFilter(key, value);
}

export function setArrayValue(
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
