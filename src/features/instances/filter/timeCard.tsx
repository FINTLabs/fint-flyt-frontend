import {
    Chips,
    DatePicker,
    ExpansionCard,
    HStack,
    TextField,
    ToggleGroup,
    useRangeDatepicker,
    VStack,
} from '@navikt/ds-react';
import { BriefcaseClockIcon, CalendarIcon, ClockDashedIcon } from '@navikt/aksel-icons';
import React, { useState } from 'react';
import { useFilters } from './FilterContext';
import { setSingleValue } from './util';
import { useTranslation } from 'react-i18next';

interface Props {
    id: string;
    isOpen: boolean;
    toggleOpen: (cardId: string) => void;
    timeCurrentPeriodOptions: { label: string; value: string }[];
}

export default function TimeCard(props: Props) {
    const { t } = useTranslation('translations', { keyPrefix: 'pages.instances.filter.timeCard' });

    const { updateFilter, filters } = useFilters();

    React.useEffect(() => {
        if (!filters.timeTimestampMin && !filters.timeTimestampMax) {
            setSelected({ from: undefined, to: undefined });
            setTimeMin('');
            setTimeMax('');
        }
    }, [filters.timeTimestampMin, filters.timeTimestampMax]);

    const [selectedTab, setSelectedTab] = useState<string>(() => {
        if (filters.timeOffsetMinutes || filters.timeOffSetHours) return 'period';
        if (filters.timeTimestampMin || filters.timeTimestampMax) return 'manual';
        return 'offset';
    });

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

    const handleTimeChange = (field: 'timeTimestampMin' | 'timeTimestampMax', time: string) => {
        if (field === 'timeTimestampMin' && selectedRange?.from) {
            setTimeMin(time);

            updateFilter(field, formatToOffsetDateTime(new Date(selectedRange.from), time));
        } else if (field === 'timeTimestampMax' && selectedRange?.to) {
            setTimeMax(time);
            updateFilter(field, formatToOffsetDateTime(new Date(selectedRange.to), time));
        }
    };

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

    const getExpansionCardDescription = (): string => {
        const details: string[] = [];

        const addDetail = (text: string) => {
            details.push(text);
        };

        if (filters.timeCurrentPeriod) {
            const selectedLabel = props.timeCurrentPeriodOptions.find(
                (option) => option.value === filters.timeCurrentPeriod
            )?.label;

            const translatedLabel = selectedLabel ? t(selectedLabel) : selectedLabel;
            addDetail(t('description.period', { value: translatedLabel }));
        }

        if (filters.timeOffSetHours || filters.timeOffsetMinutes) {
            addDetail(
                t('description.offset', {
                    hours: filters.timeOffSetHours,
                    minutes: filters.timeOffsetMinutes,
                })
            );
        }

        if (filters.timeTimestampMin || filters.timeTimestampMax) {
            if (filters.timeTimestampMin) {
                const fromDate = new Date(filters.timeTimestampMin);
                const fromDateString = fromDate.toLocaleDateString();
                const fromTimeString = fromDate.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                });
                addDetail(
                    `${t('manual.fromDate')}: ${fromDateString}${
                        fromTimeString !== '00:00' ? ` ${fromTimeString}` : ''
                    }`
                );
            }

            if (filters.timeTimestampMax) {
                const toDate = new Date(filters.timeTimestampMax);
                const toDateString = toDate.toLocaleDateString();
                const toTimeString = toDate.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                });
                addDetail(
                    `${t('manual.toDate')}: ${toDateString}${
                        toTimeString !== '00:00' ? ` ${toTimeString}` : ''
                    }`
                );
            }
        }

        return details.join(', ');
    };

    return (
        <ExpansionCard
            data-testid="timeCard"
            size="small"
            aria-label="Tidsperiod"
            open={props.isOpen}
            onToggle={() => props.toggleOpen(props.id)}
        >
            <ExpansionCard.Header>
                <ExpansionCard.Title as="h4" size="small">
                    {t('title')}
                </ExpansionCard.Title>
                <ExpansionCard.Description>
                    {getExpansionCardDescription()}
                </ExpansionCard.Description>
            </ExpansionCard.Header>

            <ExpansionCard.Content>
                <VStack gap="4" paddingBlock="4">
                    <ToggleGroup value={selectedTab} onChange={handleTabChange} fill size="small">
                        <ToggleGroup.Item
                            value="offset"
                            label={t('tabs.offset')}
                            icon={<ClockDashedIcon aria-hidden />}
                        />
                        <ToggleGroup.Item
                            value="period"
                            label={t('tabs.period')}
                            icon={<BriefcaseClockIcon aria-hidden />}
                        />
                        <ToggleGroup.Item
                            value="manual"
                            label={t('tabs.manual')}
                            icon={<CalendarIcon aria-hidden />}
                        />
                    </ToggleGroup>

                    {selectedTab === 'offset' && (
                        <HStack gap={'2'}>
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
                                    setSingleValue(
                                        updateFilter,
                                        'timeOffsetMinutes',
                                        e.target.value
                                    )
                                }
                            />
                        </HStack>
                    )}

                    {selectedTab === 'period' && (
                        <HStack>
                            <Chips>
                                {props.timeCurrentPeriodOptions.map((option) => (
                                    <Chips.Toggle
                                        checkmark={false}
                                        key={option.value}
                                        selected={filters.timeCurrentPeriod === option.value}
                                        onClick={() =>
                                            setSingleValue(
                                                updateFilter,
                                                'timeCurrentPeriod',
                                                option.value
                                            )
                                        }
                                    >
                                        {/*{option.label}*/}
                                        {t(option.label)}
                                    </Chips.Toggle>
                                ))}
                            </Chips>
                        </HStack>
                    )}

                    {selectedTab === 'manual' && (
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
                                            handleTimeChange('timeTimestampMin', e.target.value)
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
                                            handleTimeChange('timeTimestampMax', e.target.value)
                                        }
                                        disabled={!selectedRange?.to}
                                    />
                                </HStack>
                            </VStack>
                        </DatePicker>
                    )}
                </VStack>
            </ExpansionCard.Content>
        </ExpansionCard>
    );
}
