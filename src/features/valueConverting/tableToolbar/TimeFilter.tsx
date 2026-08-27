import {
    DatePicker,
    HStack,
    Tabs,
    TextField,
    useRangeDatepicker,
    VStack,
} from '@navikt/ds-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useValueConvertingFilters } from './FilterContext';
import { ValueConvertingFilters } from './types';

/** Formats a date for the value-converting API: 2026-01-01T00:00:00Z */
export function toApiDateTime(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
}

type TimeRangeKey = 'created' | 'modified';

type RangeFields = {
    fromKey: 'createdFrom' | 'modifiedFrom';
    toKey: 'createdTo' | 'modifiedTo';
};

const RANGE_FIELDS: Record<TimeRangeKey, RangeFields> = {
    created: { fromKey: 'createdFrom', toKey: 'createdTo' },
    modified: { fromKey: 'modifiedFrom', toKey: 'modifiedTo' },
};

function formatToOffsetDateTime(date: Date, time: string): Date {
    const [hours, minutes] = time.split(':').map(Number);
    const next = new Date(date);
    next.setHours(Number.isNaN(hours) ? 0 : hours, Number.isNaN(minutes) ? 0 : minutes, 0, 0);
    return next;
}

function timeFromDate(date: Date | null): string {
    if (!date) return '';
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
}

function TimeRangeFilter({ rangeKey }: { rangeKey: TimeRangeKey }) {
    const { t } = useTranslation('translations', {
        keyPrefix: 'pages.valueConverting.toolbar.timeCard',
    });
    const { filters, updateFilter } = useValueConvertingFilters();
    const { fromKey, toKey } = RANGE_FIELDS[rangeKey];

    const [timeMin, setTimeMin] = useState(() => timeFromDate(filters[fromKey]));
    const [timeMax, setTimeMax] = useState(() => timeFromDate(filters[toKey]));

    const { datepickerProps, toInputProps, fromInputProps, selectedRange } = useRangeDatepicker({
        defaultSelected: {
            from: filters[fromKey] ?? undefined,
            to: filters[toKey] ?? undefined,
        },
        onRangeChange: (range) => {
            if (range?.from) {
                updateFilter(fromKey, formatToOffsetDateTime(range.from, timeMin || '00:00'));
            } else {
                updateFilter(fromKey, null);
                setTimeMin('');
            }

            if (range?.to) {
                updateFilter(toKey, formatToOffsetDateTime(range.to, timeMax || '23:59'));
            } else {
                updateFilter(toKey, null);
                setTimeMax('');
            }
        },
    });

    const handleManualTimeChange = (field: 'from' | 'to', time: string) => {
        if (field === 'from' && selectedRange?.from) {
            setTimeMin(time);
            updateFilter(fromKey, formatToOffsetDateTime(new Date(selectedRange.from), time));
        } else if (field === 'to' && selectedRange?.to) {
            setTimeMax(time);
            updateFilter(toKey, formatToOffsetDateTime(new Date(selectedRange.to), time));
        }
    };

    return (
        <DatePicker {...datepickerProps}>
            <VStack gap="4">
                <HStack gap="4" justify="space-between">
                    <DatePicker.Input {...fromInputProps} label={t('fromDate')} size="small" />
                    <TextField
                        label={t('fromTime')}
                        size="small"
                        type="time"
                        value={timeMin}
                        onChange={(e) => handleManualTimeChange('from', e.target.value)}
                        disabled={!selectedRange?.from}
                    />
                </HStack>
                <HStack gap="4">
                    <DatePicker.Input {...toInputProps} label={t('toDate')} size="small" />
                    <TextField
                        label={t('toTime')}
                        size="small"
                        type="time"
                        value={timeMax}
                        onChange={(e) => handleManualTimeChange('to', e.target.value)}
                        disabled={!selectedRange?.to}
                    />
                </HStack>
            </VStack>
        </DatePicker>
    );
}

export default function TimeFilter() {
    const { t } = useTranslation('translations', {
        keyPrefix: 'pages.valueConverting.toolbar.timeCard',
    });
    const { filters } = useValueConvertingFilters();

    const [selectedTab, setSelectedTab] = useState<TimeRangeKey>(() => {
        if (filters.modifiedFrom || filters.modifiedTo) return 'modified';
        return 'created';
    });

    return (
        <Tabs
            value={selectedTab}
            onChange={(tab) => setSelectedTab(tab as TimeRangeKey)}
            size="small"
            fill
        >
            <Tabs.List>
                <Tabs.Tab value="created" label={t('tabs.created')} />
                <Tabs.Tab value="modified" label={t('tabs.modified')} />
            </Tabs.List>
            <Tabs.Panel value="created">
                <HStack padding="4">
                    <TimeRangeFilter rangeKey="created" />
                </HStack>
            </Tabs.Panel>
            <Tabs.Panel value="modified">
                <HStack padding="4">
                    <TimeRangeFilter rangeKey="modified" />
                </HStack>
            </Tabs.Panel>
        </Tabs>
    );
}

/** Helper for callers that need a typed empty date patch. */
export function clearTimeRange(
    filters: ValueConvertingFilters,
    rangeKey: TimeRangeKey
): ValueConvertingFilters {
    const { fromKey, toKey } = RANGE_FIELDS[rangeKey];
    return { ...filters, [fromKey]: null, [toKey]: null };
}
