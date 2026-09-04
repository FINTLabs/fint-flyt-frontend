import { ValueConvertingFilters } from '../tableToolbar/types';

export type OptionalValueConvertingColumn = 'createdAt' | 'modifiedAt' | 'toApplication';
export type VisibleOptionalColumns = Record<OptionalValueConvertingColumn, boolean>;

export function getVisibleOptionalColumns(
    filters: ValueConvertingFilters
): VisibleOptionalColumns {
    return {
        createdAt:
            filters.sort.orderBy === 'createdAt' ||
            filters.createdFrom !== null ||
            filters.createdTo !== null,
        modifiedAt:
            filters.sort.orderBy === 'modifiedAt' ||
            filters.modifiedFrom !== null ||
            filters.modifiedTo !== null,
        toApplication:
            filters.sort.orderBy === 'toApplicationId' || Boolean(filters.toApplicationId),
    };
}
