import { useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
    ActiveFilterChip,
    ActiveFilters as SharedActiveFilters,
} from '../../../shared/components/table/ActiveFilters';
import { AuthorizationContext } from '../../../shared/context/AuthorizationContext';
import { sourceApplicationsToSelectable } from '../../../shared/util/FormUtil';
import { ISelect } from '../../configuration/types/Select';
import { useValueConvertingFilters } from './FilterContext';
import { clearTimeRange } from './TimeFilter';
import { ValueConvertingFilters } from './types';

export default function ActiveFilters() {
    const { t } = useTranslation('translations', {
        keyPrefix: 'pages.valueConverting.toolbar',
    });
    const { clearFilters, filters, updateFiltersAndSave, isSaved } = useValueConvertingFilters();
    const { getAllSourceApplications } = useContext(AuthorizationContext);
    const [options, setOptions] = useState<ISelect[]>([]);
    const [savedFilters, setSavedFilters] = useState<ValueConvertingFilters>(() => filters);

    useEffect(() => {
        getAllSourceApplications(true).then((sourceApps) => {
            setOptions(sourceApplicationsToSelectable(sourceApps));
        });
    }, [getAllSourceApplications]);

    useEffect(() => {
        if (isSaved) {
            setSavedFilters(filters);
        }
    }, [filters, isSaved]);

    const chips = useMemo(() => {
        const next: ActiveFilterChip[] = [];

        options
            .filter((opt) => savedFilters.sourceApplicationIds.includes(opt.value))
            .forEach((opt) => {
                next.push({
                    key: `sourceApplication-${opt.value}`,
                    label: opt.label,
                    onRemove: () =>
                        updateFiltersAndSave({
                            ...savedFilters,
                            sourceApplicationIds: savedFilters.sourceApplicationIds.filter(
                                (id) => id !== opt.value
                            ),
                        }),
                });
            });

        const createdLabel = getTimeRangeLabel(
            savedFilters.createdFrom,
            savedFilters.createdTo,
            t('activeFilters.createdPrefix'),
            t
        );
        if (createdLabel) {
            next.push({
                key: 'created',
                label: createdLabel,
                onRemove: () => updateFiltersAndSave(clearTimeRange(savedFilters, 'created')),
            });
        }

        const modifiedLabel = getTimeRangeLabel(
            savedFilters.modifiedFrom,
            savedFilters.modifiedTo,
            t('activeFilters.modifiedPrefix'),
            t
        );
        if (modifiedLabel) {
            next.push({
                key: 'modified',
                label: modifiedLabel,
                onRemove: () => updateFiltersAndSave(clearTimeRange(savedFilters, 'modified')),
            });
        }

        if (savedFilters.sort) {
            next.push({
                key: 'sort',
                label: t('activeFilters.sortedBy', { field: t(`sort.options.${savedFilters.sort}`) }),
                onRemove: () => updateFiltersAndSave({ ...savedFilters, sort: null }),
            });
        }

        return next;
    }, [options, savedFilters, t, updateFiltersAndSave]);

    return (
        <SharedActiveFilters
            chips={chips}
            emptyLabel={t('activeFilters.noFilters')}
            removeAllLabel={t('activeFilters.removeAll')}
            onClearAll={clearFilters}
        />
    );
}

function getTimeRangeLabel(
    from: Date | null,
    to: Date | null,
    prefix: string,
    t: (key: string, options?: Record<string, string>) => string
): string | null {
    const safeFrom = from ? new Date(from) : null;
    const safeTo = to ? new Date(to) : null;

    if (safeFrom && safeTo) {
        return t('range', {
            prefix,
            from: safeFrom.toLocaleDateString(),
            to: safeTo.toLocaleDateString(),
        });
    }
    if (safeFrom) {
        return t('from', { prefix, from: safeFrom.toLocaleDateString() });
    }
    if (safeTo) {
        return t('to', { prefix, to: safeTo.toLocaleDateString() });
    }
    return null;
}
