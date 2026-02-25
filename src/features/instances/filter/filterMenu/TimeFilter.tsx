import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BriefcaseClockIcon, CalendarIcon, ClockDashedIcon } from '@navikt/aksel-icons';
import {
    DatePicker,
    HStack,
    Radio,
    RadioGroup,
    Tabs,
    TextField,
    useRangeDatepicker,
    VStack,
} from '@navikt/ds-react';
import { useFilterOptions } from '../OptionsContext';
import { useFilters } from '../FilterContext';
import { setSingleValue } from '../util';

export default function TimeFilter() {
    const { t } = useTranslation('translations', { keyPrefix: 'pages.instances.filter.timeCard' });

    const { timeCurrentPeriodOptions } = useFilterOptions();
    const { updateFilter, filters } = useFilters();

    const [selectedTab, setSelectedTab] = useState<string>(() => {
        if (filters.timeOffsetMinutes || filters.timeOffSetHours) return 'offset';
        if (filters.timeTimestampMin || filters.timeTimestampMax) return 'manual';
        return 'period';
    });
    const [selectedTimePeriod, setSelectedTimePeriod] = useState(filters.timeCurrentPeriod);

    const [timeMin, setTimeMin] = useState<string>('');
    const [timeMax, setTimeMax] = useState<string>('');

    const formatToOffsetDateTime = (date: Date, time: string): string => {
        const [hours, minutes] = time.split(':').map(Number);
        const safeHours = Number.isNaN(hours) ? 0 : hours;
        const safeMinutes = Number.isNaN(minutes) ? 0 : minutes;
        date.setHours(safeHours, safeMinutes, 0, 0);
        return date.toISOString();
    };

    const { datepickerProps, toInputProps, fromInputProps, selectedRange, setSelected } =
        useRangeDatepicker({
            defaultSelected: {
                from: filters.timeTimestampMin ? new Date(filters.timeTimestampMin) : undefined,
                to: filters.timeTimestampMax ? new Date(filters.timeTimestampMax) : undefined,
            },
            onRangeChange: (range) => {
                if (range?.from) {
                    updateFilter(
                        'timeTimestampMin',
                        formatToOffsetDateTime(range.from, timeMin || '00:00')
                    );
                } else {
                    updateFilter('timeTimestampMin', null);
                    setTimeMin('');
                }

                if (range?.to) {
                    updateFilter(
                        'timeTimestampMax',
                        formatToOffsetDateTime(range.to, timeMax || '00:00')
                    );
                } else {
                    updateFilter('timeTimestampMax', null);
                    setTimeMax('');
                }
            },
        });

    function handleTabChange(tab: string) {
        setSelectedTab(tab);

        if (tab === 'period') {
            updateFilter('timeTimestampMin', null);
            updateFilter('timeTimestampMax', null);
            updateFilter('timeOffSetHours', null);
            updateFilter('timeOffsetMinutes', null);
            setSelected({ from: undefined, to: undefined });
            setTimeMin('');
            setTimeMax('');
        } else if (tab === 'manual') {
            updateFilter('timeCurrentPeriod', null);
            updateFilter('timeOffSetHours', null);
            updateFilter('timeOffsetMinutes', null);
        } else if (tab === 'offset') {
            updateFilter('timeCurrentPeriod', null);
            updateFilter('timeTimestampMin', null);
            updateFilter('timeTimestampMax', null);
            setSelected({ from: undefined, to: undefined });
            setTimeMin('');
            setTimeMax('');
        }
    }

    const handleManualTimeChange = (
        field: 'timeTimestampMin' | 'timeTimestampMax',
        time: string
    ) => {
        if (field === 'timeTimestampMin' && selectedRange?.from) {
            setTimeMin(time);

            updateFilter(field, formatToOffsetDateTime(new Date(selectedRange.from), time));
        } else if (field === 'timeTimestampMax' && selectedRange?.to) {
            setTimeMax(time);
            updateFilter(field, formatToOffsetDateTime(new Date(selectedRange.to), time));
        }
    };

    const handleSelectedPeriodChange = (value: any) => {
        setSelectedTimePeriod(value);
        setSingleValue(updateFilter, 'timeCurrentPeriod', value);
    };

    return (
        <Tabs value={selectedTab} onChange={handleTabChange} size={'small'} iconPosition="top" fill>
            <Tabs.List>
                <Tabs.Tab
                    value="period"
                    label={t('tabs.period')}
                    icon={<BriefcaseClockIcon aria-hidden />}
                />
                <Tabs.Tab
                    value="offset"
                    label={t('tabs.offset')}
                    icon={<ClockDashedIcon aria-hidden />}
                />
                <Tabs.Tab
                    value="manual"
                    label={t('tabs.manual')}
                    icon={<CalendarIcon aria-hidden />}
                />
            </Tabs.List>
            <Tabs.Panel value="offset">
                <HStack gap={'2'} padding={'4'}>
                    <TextField
                        label={t('offset.hours')}
                        size="small"
                        type="number"
                        value={filters.timeOffSetHours ?? ''}
                        onChange={(e) =>
                            setSingleValue(updateFilter, 'timeOffSetHours', e.target.value)
                        }
                    />
                    <TextField
                        label={t('offset.minutes')}
                        size="small"
                        type="number"
                        value={filters.timeOffsetMinutes ?? ''}
                        onChange={(e) =>
                            setSingleValue(updateFilter, 'timeOffsetMinutes', e.target.value)
                        }
                    />
                </HStack>
            </Tabs.Panel>
            <Tabs.Panel value="period">
                <HStack padding={'4'}>
                    <RadioGroup
                        size="small"
                        hideLegend
                        legend={t('tabs.period')}
                        onChange={handleSelectedPeriodChange}
                        value={selectedTimePeriod}
                    >
                        {timeCurrentPeriodOptions.map((option) => (
                            <Radio key={option.value} value={option.value}>
                                {t(option.label)}
                            </Radio>
                        ))}
                    </RadioGroup>
                </HStack>
            </Tabs.Panel>
            <Tabs.Panel value="manual">
                <HStack padding={'4'}>
                    <DatePicker {...datepickerProps}>
                        <VStack gap="4">
                            <HStack gap="4" justify={'space-between'}>
                                <DatePicker.Input
                                    {...fromInputProps}
                                    label={t('manual.fromDate')}
                                    size="small"
                                />
                                <TextField
                                    label={t('manual.fromTime')}
                                    size="small"
                                    type="time"
                                    value={timeMin}
                                    onChange={(e) =>
                                        handleManualTimeChange('timeTimestampMin', e.target.value)
                                    }
                                    disabled={!selectedRange?.from}
                                />
                            </HStack>
                            <HStack gap="4">
                                <DatePicker.Input
                                    {...toInputProps}
                                    label={t('manual.toDate')}
                                    size="small"
                                />
                                <TextField
                                    label={t('manual.toTime')}
                                    size="small"
                                    type="time"
                                    value={timeMax}
                                    onChange={(e) =>
                                        handleManualTimeChange('timeTimestampMax', e.target.value)
                                    }
                                    disabled={!selectedRange?.to}
                                />
                            </HStack>
                        </VStack>
                    </DatePicker>
                </HStack>
            </Tabs.Panel>
        </Tabs>
    );
}
