import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import useInstanceFlowTrackingRepository from '../../../shared/api/useInstanceFlowTrackingRepository';
import {
    ActiveFilterChip,
    ActiveFilters as SharedActiveFilters,
} from '../../../shared/components/table/ActiveFilters';
import { useInstanceFilters } from './FilterContext';
import { useFilterOptions } from './OptionsContext';
import { Filters } from './types';
import { getFilterLabel, SPECIAL_FILTERS } from './util';

export default function ActiveFilters() {
    const InstanceFlowTrackingRepository = useInstanceFlowTrackingRepository();
    const { t, i18n } = useTranslation('translations', {
        keyPrefix: 'pages.instances.filter.activeFilters',
    });
    const { clearFilters, filters, updateFilter, saveFilters, updateFilterAndSave, isSaved, refreshKey } =
        useInstanceFilters();
    const filterOptions = useFilterOptions();

    const [savedFilters, setSavedFilters] = useState<Filters>(() => filters);
    const [totalEventCount, setTotalEventCount] = useState<number | null>(null);
    useEffect(() => {
        if (isSaved) {
            setSavedFilters(filters);
        }
    }, [filters, isSaved]);

    useEffect(() => {
        InstanceFlowTrackingRepository.getTotalEventCountByFilter(filters).then((response) => {
            if (response.data) {
                setTotalEventCount(response.data as unknown as number);
            }
        }).catch((error) => {
            console.error(error);
        });
    }, [refreshKey, filters]);

    const chips = useMemo(() => {
        const next: ActiveFilterChip[] = [];

        Object.entries(savedFilters).forEach(([key, value]) => {
            if (SPECIAL_FILTERS.includes(key)) return;

            const isActive = Array.isArray(value)
                ? value.length > 0
                : value !== null && value !== '' && value !== undefined;
            if (!isActive) return;

            const label = getFilterLabel({
                key,
                value,
                i18n,
                t,
                options: filterOptions,
            });
            if (!label) return;

            next.push({
                key,
                label,
                onRemove: () => updateFilterAndSave(key as keyof Filters, null),
            });
        });

        const timeOffsetLabel = getTimeOffsetLabel(
            savedFilters.timeOffSetHours,
            savedFilters.timeOffsetMinutes,
            t
        );
        if (timeOffsetLabel) {
            next.push({
                key: 'timeOffset',
                label: timeOffsetLabel,
                onRemove: () => {
                    updateFilter('timeOffSetHours', null);
                    updateFilter('timeOffsetMinutes', null);
                    saveFilters();
                },
            });
        }

        const timeRangeLabel = getTimeRangeLabel(
            savedFilters.timeTimestampMin,
            savedFilters.timeTimestampMax,
            t
        );
        if (timeRangeLabel) {
            next.push({
                key: 'timeTimestamp',
                label: timeRangeLabel,
                onRemove: () => {
                    updateFilter('timeTimestampMin', null);
                    updateFilter('timeTimestampMax', null);
                    saveFilters();
                },
            });
        }

        return next;
    }, [savedFilters, filterOptions, i18n, t, updateFilter, updateFilterAndSave, saveFilters]);

    return (
        <SharedActiveFilters
            chips={chips}
            emptyLabel={t('noFilters')}
            removeAllLabel={t('removeAll')}
            onClearAll={clearFilters}
            totalEventCount={totalEventCount}
        />
    );
}

function getTimeOffsetLabel(
    timeOffSetHours: string | null,
    timeOffsetMinutes: string | null,
    t: (key: string, options?: Record<string, string>) => string
): string | null {
    const hasHours = !!timeOffSetHours?.trim();
    const hasMinutes = !!timeOffsetMinutes?.trim();

    if (hasHours && !hasMinutes) {
        return t('timeOffSet.hours', { hours: timeOffSetHours!.trim() });
    }
    if (hasMinutes && !hasHours) {
        return t('timeOffSet.minutes', { minutes: timeOffsetMinutes!.trim() });
    }
    if (hasHours && hasMinutes) {
        return t('timeOffSet.both', {
            hours: timeOffSetHours!.trim(),
            minutes: timeOffsetMinutes!.trim(),
        });
    }
    return null;
}

function getTimeRangeLabel(
    from: Date | null,
    to: Date | null,
    t: (key: string, options?: Record<string, string>) => string
): string | null {
    const safeFrom = from ? new Date(from) : null;
    const safeTo = to ? new Date(to) : null;

    if (safeFrom && safeTo) {
        return t('timeTimestamp.range', {
            from: safeFrom.toLocaleDateString(),
            to: safeTo.toLocaleDateString(),
        });
    }
    if (safeFrom) {
        return t('timeTimestamp.from', { from: safeFrom.toLocaleDateString() });
    }
    if (safeTo) {
        return t('timeTimestamp.to', { to: safeTo.toLocaleDateString() });
    }
    return null;
}
