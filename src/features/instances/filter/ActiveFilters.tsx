import { Children, FC, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Chips, HStack } from '@navikt/ds-react';
import { XMarkIcon } from '@navikt/aksel-icons';
import { useFilters } from './FilterContext';
import { Filters } from './types';
import { useFilterOptions } from './OptionsContext';
import { getFilterLabel, SPECIAL_FILTERS } from './util';

const ActiveFilters: FC = () => {
    const { t } = useTranslation('translations', {
        keyPrefix: 'pages.instances.filter.activeFilters',
    });
    const { clearFilters, filters, updateFilter, saveFilters, updateFilterAndSave, isSaved } =
        useFilters();

    const [savedFilters, setSavedFilters] = useState<Filters>(() => filters);

    useEffect(() => {
        if (isSaved) {
            setSavedFilters(filters);
        }
    }, [filters, isSaved]);

    const activeFilters: [key: string, value: Filters[keyof Filters]][] = useMemo(() => {
        return Object.entries(savedFilters).filter(([_, value]) => {
            if (Array.isArray(value)) return value.length > 0;
            return value !== null && value !== '' && value !== undefined;
        });
    }, [savedFilters]);

    if (activeFilters.length === 0) {
        return <HStack data-testid="active-filters">{t('noFilters')}</HStack>;
    }

    return (
        <HStack gap="2" className={'active-filters'} align={'center'} data-testid="active-filters">
            <Chips size={'small'}>
                {Children.toArray([
                    ...activeFilters.map(([key, value]) => {
                        if (!SPECIAL_FILTERS.includes(key)) {
                            return (
                                <KeyValueTextChip
                                    key={key}
                                    filterKey={key}
                                    filterValue={value}
                                    onRemove={() => {
                                        updateFilterAndSave(key as keyof Filters, null);
                                    }}
                                />
                            );
                        }
                    }),

                    (!!savedFilters.timeOffSetHours || !!savedFilters.timeOffsetMinutes) && (
                        <TimeOffsetChip
                            timeOffSetHours={savedFilters.timeOffSetHours}
                            timeOffsetMinutes={savedFilters.timeOffsetMinutes}
                            onRemove={() => {
                                updateFilter('timeOffSetHours', null);
                                updateFilter('timeOffsetMinutes', null);
                                saveFilters();
                            }}
                        />
                    ),

                    (!!savedFilters.timeTimestampMin || !!savedFilters.timeTimestampMax) && (
                        <TimeRangeChip
                            from={savedFilters.timeTimestampMin}
                            to={savedFilters.timeTimestampMax}
                            onRemove={() => {
                                updateFilter('timeTimestampMin', null);
                                updateFilter('timeTimestampMax', null);
                                saveFilters();
                            }}
                        />
                    ),
                ])}
            </Chips>
            <Button
                size={'small'}
                variant={'tertiary'}
                className={'filter-clear-all'}
                icon={<XMarkIcon aria-hidden />}
                onClick={clearFilters}
            >
                {t('removeAll')}
            </Button>
        </HStack>
    );
};

export default ActiveFilters;

const KeyValueTextChip = ({
    filterKey,
    filterValue,
    onRemove,
}: {
    filterKey: string;
    filterValue: Filters[keyof Filters];
    onRemove: () => void;
}) => {
    const { t, i18n } = useTranslation('translations', {
        keyPrefix: 'pages.instances.filter.activeFilters',
    });

    const filterOptions = useFilterOptions();

    const textNew = useMemo(() => {
        return getFilterLabel({
            key: filterKey,
            value: filterValue,
            i18n,
            t,
            options: filterOptions,
        });
    }, [filterKey, filterValue, i18n, t, filterOptions]);

    if (!textNew) return null;

    return (
        <Chips.Removable key={filterKey} className={'filter-chip'} onClick={onRemove}>
            {textNew}
        </Chips.Removable>
    );
};

const TimeOffsetChip = ({
    timeOffSetHours,
    timeOffsetMinutes,
    onRemove,
}: {
    timeOffSetHours: string | null;
    timeOffsetMinutes: string | null;
    onRemove: () => void;
}) => {
    const { t } = useTranslation('translations', {
        keyPrefix: 'pages.instances.filter.activeFilters.timeOffSet',
    });

    console.log('TOMEOOOFEST');
    const text = useMemo(() => {
        const hasHours: boolean = !!timeOffSetHours && !!timeOffSetHours?.trim();
        const hasMinutes: boolean = !!timeOffsetMinutes && !!timeOffsetMinutes?.trim();

        if (hasHours && !hasMinutes) {
            return t('hours', { hours: timeOffSetHours!.trim() });
        }
        if (hasMinutes && !hasHours) {
            return t('minutes', { minutes: timeOffsetMinutes!.trim() });
        }
        if (hasHours && hasMinutes) {
            return t('both', {
                hours: timeOffSetHours!.trim(),
                minutes: timeOffsetMinutes!.trim(),
            });
        }

        return null;
    }, [timeOffSetHours, timeOffsetMinutes]);

    if (!text) {
        return null;
    }

    return (
        <Chips.Removable
            key={'timeOffset'}
            className={'filter-chip'}
            onClick={() => {
                onRemove();
            }}
        >
            {text}
        </Chips.Removable>
    );
};

const TimeRangeChip = ({
    from,
    to,
    onRemove,
}: {
    from: Date | null;
    to: Date | null;
    onRemove: () => void;
}) => {
    const { t } = useTranslation('translations', {
        keyPrefix: 'pages.instances.filter.activeFilters.timeTimestamp',
    });

    const text = useMemo(() => {
        const safeFrom = from ? new Date(from) : null;
        const safeTo = to ? new Date(to) : null;

        if (!safeFrom && !safeTo) return null;

        if (safeFrom && safeTo) {
            return t('range', {
                from: safeFrom.toLocaleDateString(),
                to: safeTo.toLocaleDateString(),
            });
        }
        if (safeFrom && !safeTo) {
            return t('from', { from: safeFrom.toLocaleDateString() });
        }
        if (!safeFrom && safeTo) {
            return t('to', { to: safeTo.toLocaleDateString() });
        }
        return null;
    }, [from, to]);

    if (!text) return null;

    return (
        <Chips.Removable
            key={'timeOffset'}
            className={'filter-chip'}
            onClick={() => {
                onRemove();
            }}
        >
            {text}
        </Chips.Removable>
    );
};
