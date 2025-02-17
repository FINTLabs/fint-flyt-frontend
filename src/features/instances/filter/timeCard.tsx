import {
    DatePicker,
    ExpansionCard,
    HStack,
    Radio,
    RadioGroup,
    TextField,
    ToggleGroup,
    VStack,
    useRangeDatepicker,
    Chips,
} from '@navikt/ds-react';
import { BriefcaseClockIcon, CalendarIcon, ClockDashedIcon } from '@navikt/aksel-icons';
import { useState } from 'react';
import { useFilters } from './FilterContext';
import { setArrayValue, setSingleValue } from './util';

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

    // const [timeMin, setTimeMin] = useState<string>(
    //     filters.timeTimestampMin?.split('T')[1]?.substring(0, 5) ?? ''
    // );
    // const [timeMax, setTimeMax] = useState<string>(
    //     filters.timeTimestampMax?.split('T')[1]?.substring(0, 5) ?? ''
    // );

    // function formatToOffsetDateTime(date: Date, time: string): string {
    //     const [hours, minutes] = time.split(':').map(Number);
    //     if (!isNaN(hours) && !isNaN(minutes)) {
    //         date.setHours(hours, minutes, 0, 0);
    //     }
    //     return date.toISOString().replace('Z', getTimezoneOffset(date));
    // }

    const { datepickerProps, toInputProps, fromInputProps, selectedRange, setSelected } =
        useRangeDatepicker({
            fromDate: new Date('2020-01-01'),
            // onRangeChange: console.info,
            onRangeChange: (range) => {
                if (range?.from) {
                    // updateFilter('timeTimestampMin', formatToOffsetDateTime(range.from, timeMin));
                    updateFilter('timeTimestampMin', range?.from);
                }
                if (range?.to) {
                    // updateFilter('timeTimestampMax', formatToOffsetDateTime(range.to, timeMax));
                    updateFilter('timeTimestampMax', range?.to);
                }
            },
        });

    const handleTimeChange = (field: 'timeTimestampMin' | 'timeTimestampMax', time: string) => {
        //     if (field === 'timeTimestampMin') {
        //         setTimeMin(time);
        //         if (filters.timeTimestampMin) {
        //             updateFilter(
        //                 'timeTimestampMin',
        //                 formatToOffsetDateTime(new Date(filters.timeTimestampMin), time)
        //             );
        //         }
        //     } else {
        //         setTimeMax(time);
        //         if (filters.timeTimestampMax) {
        //             updateFilter(
        //                 'timeTimestampMax',
        //                 formatToOffsetDateTime(new Date(filters.timeTimestampMax), time)
        //             );
        //         }
        //     }
        console.log('HANDLE TIME CHANGE:', field, time);
    };

    function handleTabChange(tab: string) {
        setSelectedTab(tab);

        if (tab === 'period') {
            updateFilter('timeTimestampMin', null);
            updateFilter('timeTimestampMax', null);
            updateFilter('timeOffSetHours', null);
            updateFilter('timeOffsetMinutes', null);
            setSelected({ from: undefined, to: undefined });
        } else if (tab === 'manual') {
            updateFilter('timeCurrentPeriod', null);
            updateFilter('timeOffSetHours', null);
            updateFilter('timeOffsetMinutes', null);
        } else if (tab === 'offset') {
            updateFilter('timeCurrentPeriod', null);
            updateFilter('timeTimestampMin', null);
            updateFilter('timeTimestampMax', null);
            setSelected({ from: undefined, to: undefined });
        }
    }
    //
    // const getExpansionCardDescription = (): string => {
    //     if (filters.timeCurrentPeriod) {
    //         const selectedLabel = timeCurrentPeriodOptions.find(
    //             (option) => option.value === filters.timeCurrentPeriod
    //         )?.label;
    //         return `Periode: ${selectedLabel || 'Ukjent'}`;
    //     }
    //     return date.toISOString().replace('Z', getTimezoneOffset(date));
    // };

    console.log('FILTER FROM:', filters.timeTimestampMin);
    console.log('FILTER TO:', filters.timeTimestampMax);

    const formatDate = (dateString: Date | null) => {
        if (!dateString) return ''; // Return empty if no date
        return new Date(dateString).toLocaleDateString('no-NO', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
    };

    const getExpansionCardDescription = (): string => {
        if (filters.timeCurrentPeriod) {
            const selectedLabel = props.timeCurrentPeriodOptions.find(
                (option) => option.value === filters.timeCurrentPeriod
            )?.label;
            return `Periode: ${selectedLabel || 'Ukjent'}`;
        }

        if (filters.timeTimestampMin || filters.timeTimestampMax) {
            return `Manuell: ${formatDate(filters.timeTimestampMin)} - ${formatDate(filters.timeTimestampMax)}`;
        }

        if (filters.timeOffSetHours || filters.timeOffsetMinutes) {
            return `Siste: ${filters.timeOffSetHours ?? '0'}h ${filters.timeOffsetMinutes ?? '0'}`;
        }

        return '';
    };

    // function getTimezoneOffset(date: Date): string {
    //     const offset = -date.getTimezoneOffset();
    //     const sign = offset >= 0 ? '+' : '-';
    //     const hours = Math.floor(Math.abs(offset) / 60)
    //         .toString()
    //         .padStart(2, '0');
    //     const minutes = (Math.abs(offset) % 60).toString().padStart(2, '0');
    //     return `${sign}${hours}:${minutes}`;
    // }

    // TODO: Time not working correctly yet
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
                            {/*<RadioGroup*/}
                            {/*    size={'small'}*/}
                            {/*    legend="Velg tidsperiode"*/}
                            {/*    onChange={(value) =>*/}
                            {/*        setSingleValue(updateFilter, 'timeCurrentPeriod', value)*/}
                            {/*    }*/}
                            {/*    value={filters.timeCurrentPeriod ?? ''}>*/}
                            {/*    {timeCurrentPeriodOptions.map((option) => (*/}
                            {/*        <Radio key={option.value} value={option.value}>*/}
                            {/*            {option.label}*/}
                            {/*        </Radio>*/}
                            {/*    ))}*/}
                            {/*</RadioGroup>*/}
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
                                    // value={timeMin}
                                    onChange={(e) =>
                                        handleTimeChange('timeTimestampMin', e.target.value)
                                    }
                                />
                                <DatePicker.Input {...toInputProps} label="Til" size="small" />
                                {/* TODO: can only select a time if a date is selected */}
                                <TextField
                                    label="Tid til"
                                    size="small"
                                    type="time"
                                    // value={timeMax}
                                    onChange={(e) =>
                                        handleTimeChange('timeTimestampMax', e.target.value)
                                    }
                                />
                            </HStack>
                        </DatePicker>
                    )}
                </VStack>
            </ExpansionCard.Content>
        </ExpansionCard>
    );
}
