import {
    DatePicker,
    ExpansionCard,
    HStack,
    TextField,
    ToggleGroup,
    VStack,
    useRangeDatepicker,
    Chips,
} from '@navikt/ds-react';
import { BriefcaseClockIcon, CalendarIcon, ClockDashedIcon } from '@navikt/aksel-icons';
import { useEffect, useState } from 'react';
import { useFilters } from './FilterContext';
import { setSingleValue } from './util';

interface Props {
    id: string;
    isOpen: boolean;
    toggleOpen: (cardId: string) => void;
    timeCurrentPeriodOptions: { label: string; value: string }[];
}

export default function TimeCard(props: Props) {
    const { updateFilter, filters } = useFilters();

    const [selectedTab, setSelectedTab] = useState<string>(() => {
        if (filters.timeOffsetMinutes || filters.timeOffSetHours) return 'period';
        if (filters.timeTimestampMin || filters.timeTimestampMax) return 'manual';
        return 'offset';
    });

    const [timeMin, setTimeMin] = useState<string>('');
    const [timeMax, setTimeMax] = useState<string>('');

    // Function to format date + time in ISO format
    const formatToOffsetDateTime = (date: Date, time: string): string => {
        const [hours, minutes] = time.split(':').map(Number);
        date.setHours(isNaN(hours) ? 0 : hours, isNaN(minutes) ? 0 : minutes, 0, 0);
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

    const getRangeFromDates = (startDate: Date | null, endDate: Date | null) => {
        return {
            from: startDate ? new Date(startDate) : undefined,
            to: endDate ? new Date(endDate) : undefined,
        };
    };

    useEffect(() => {
        if (filters.timeTimestampMin || filters.timeTimestampMax) {
            const range = getRangeFromDates(filters.timeTimestampMin, filters.timeTimestampMax);
            setSelected(range);

            //TODO: set time from URL
        }
    }, [filters]);

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

    const formatDate = (dateString: Date | null) => {
        if (!dateString) return '';

        const date = new Date(dateString);
        const hours = date.getHours();
        const minutes = date.getMinutes();

        const datePart = date.toLocaleDateString('no-NO', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });

        // 🕰️ Only display time if it's not 00:00
        const timePart =
            hours !== 0 || minutes !== 0
                ? date.toLocaleTimeString('no-NO', {
                      hour: '2-digit',
                      minute: '2-digit',
                  })
                : '';

        return timePart ? `${datePart}, ${timePart}` : datePart;
    };

    const getExpansionCardDescription = (): string => {
        if (filters.timeCurrentPeriod) {
            const selectedLabel = props.timeCurrentPeriodOptions.find(
                (option) => option.value === filters.timeCurrentPeriod
            )?.label;
            return `Periode: ${selectedLabel || 'Ukjent'}`;
        }

        if (filters.timeTimestampMin || filters.timeTimestampMax) {
            // return `Manuell: ${formatDate(filters.timeTimestampMin)} - ${formatDate(filters.timeTimestampMax)}`;
            return `Manuell: ${formatDate(filters.timeTimestampMin)} - ${formatDate(filters.timeTimestampMax)}`;
        }

        if (filters.timeOffSetHours || filters.timeOffsetMinutes) {
            return `Siste: ${filters.timeOffSetHours ?? '0'}h ${filters.timeOffsetMinutes ?? '0'}`;
        }

        return '';
    };

    return (
        <ExpansionCard
            size="small"
            aria-label="Tidsperiode"
            open={props.isOpen}
            onToggle={() => props.toggleOpen(props.id)}>
            <ExpansionCard.Header>
                <ExpansionCard.Title as="h4" size="small">
                    Tidsperiode
                </ExpansionCard.Title>
                <ExpansionCard.Description>
                    {getExpansionCardDescription()}
                </ExpansionCard.Description>
            </ExpansionCard.Header>

            <ExpansionCard.Content>
                <VStack gap="8">
                    <ToggleGroup value={selectedTab} onChange={handleTabChange} fill>
                        <ToggleGroup.Item
                            value="offset"
                            label="Siste"
                            icon={<ClockDashedIcon aria-hidden />}
                        />
                        <ToggleGroup.Item
                            value="period"
                            label="Periode"
                            icon={<BriefcaseClockIcon aria-hidden />}
                        />
                        <ToggleGroup.Item
                            value="manual"
                            label="Manuell"
                            icon={<CalendarIcon aria-hidden />}
                        />
                    </ToggleGroup>

                    {selectedTab === 'offset' && (
                        <HStack gap={'2'}>
                            <TextField
                                label="H"
                                size="small"
                                type="number"
                                value={filters.timeOffSetHours ?? ''}
                                onChange={(e) =>
                                    setSingleValue(updateFilter, 'timeOffSetHours', e.target.value)
                                }
                            />
                            <TextField
                                label="M"
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
                                        }>
                                        {option.label}
                                    </Chips.Toggle>
                                ))}
                            </Chips>
                        </HStack>
                    )}

                    {selectedTab === 'manual' && (
                        <DatePicker {...datepickerProps}>
                            <HStack wrap gap="4" justify="center">
                                <DatePicker.Input {...fromInputProps} label="Fra" size="small" />
                                <TextField
                                    label="Tid fra"
                                    size="small"
                                    type="time"
                                    value={timeMin}
                                    onChange={(e) =>
                                        handleTimeChange('timeTimestampMin', e.target.value)
                                    }
                                    disabled={!selectedRange?.from}
                                />
                                <DatePicker.Input {...toInputProps} label="Til" size="small" />
                                <TextField
                                    label="Tid til"
                                    size="small"
                                    type="time"
                                    value={timeMax}
                                    onChange={(e) =>
                                        handleTimeChange('timeTimestampMax', e.target.value)
                                    }
                                    disabled={!selectedRange?.to}
                                />
                            </HStack>
                        </DatePicker>
                    )}
                </VStack>
            </ExpansionCard.Content>
        </ExpansionCard>
    );
}
