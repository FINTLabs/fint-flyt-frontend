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
} from '@navikt/ds-react';
import { BriefcaseClockIcon, CalendarIcon, ClockDashedIcon } from '@navikt/aksel-icons';
import { useState, useEffect } from 'react';
import { useFilters } from './filterContext';
import { setSingleValue } from './util';

interface Props {
    id: string;
    isOpen: boolean;
    toggleOpen: (cardId: string) => void;
    timeCurrentPeriodOptions: { label: string; value: string }[];
}

export default function TimeCard({ id, isOpen, toggleOpen, timeCurrentPeriodOptions }: Props) {
    const { updateFilter, filters } = useFilters();

    const [selectedTab, setSelectedTab] = useState<string>(() => {
        if (filters.timeCurrentPeriod) return 'period';
        if (filters.timeTimestampMin || filters.timeTimestampMax) return 'manual';
        return 'last';
    });

    const { datepickerProps, toInputProps, fromInputProps, selectedRange } = useRangeDatepicker({
        fromDate: new Date('2020-01-01'),
        onRangeChange: (range) => {
            if (range?.from) {
                const fromDate = range.from.toISOString().split('T')[0]; // Format as YYYY-MM-DD
                updateFilter('timeTimestampMin', fromDate + 'T00:00:00Z'); // Preserve time
            }
            if (range?.to) {
                const toDate = range.to.toISOString().split('T')[0];
                updateFilter('timeTimestampMax', toDate + 'T23:59:59Z');
            }
            console.log('CHANGING DATE:', range?.to, range?.from);
        },
    });

    function handleTabChange(tab: string) {
        setSelectedTab(tab);

        if (tab === 'period') {
            updateFilter('timeTimestampMin', null);
            updateFilter('timeTimestampMax', null);
            updateFilter('timeOffSetHours', null);
            updateFilter('timeOffsetMinutes', null);
        } else if (tab === 'manual') {
            updateFilter('timeCurrentPeriod', null);
            updateFilter('timeOffSetHours', null);
            updateFilter('timeOffsetMinutes', null);
        } else if (tab === 'last') {
            updateFilter('timeCurrentPeriod', null);
            updateFilter('timeTimestampMin', null);
            updateFilter('timeTimestampMax', null);
        }
    }

    const getExpansionCardDescription = (): string => {
        if (filters.timeCurrentPeriod) {
            const selectedLabel = timeCurrentPeriodOptions.find(
                (option) => option.value === filters.timeCurrentPeriod
            )?.label;
            return `Periode: ${selectedLabel || 'Ukjent'}`;
        }

        if (filters.timeTimestampMin || filters.timeTimestampMax) {
            return `Manuell: ${filters.timeTimestampMin ?? ''} - ${filters.timeTimestampMax ?? ''}`;
        }

        if (filters.timeOffSetHours || filters.timeOffsetMinutes) {
            return `Siste: ${filters.timeOffSetHours ?? '0'}h ${filters.timeOffsetMinutes ?? '0'}m`;
        }

        return '';
    };

    return (
        <ExpansionCard
            size="small"
            aria-label="Tidsperiode"
            open={isOpen}
            onToggle={() => toggleOpen(id)}>
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
                            value="last"
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

                    {selectedTab === 'last' && (
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
                            <RadioGroup
                                size={'small'}
                                legend="Velg tidsperiode"
                                onChange={(value) =>
                                    setSingleValue(updateFilter, 'timeCurrentPeriod', value)
                                }
                                value={filters.timeCurrentPeriod ?? ''}>
                                {timeCurrentPeriodOptions.map((option) => (
                                    <Radio key={option.value} value={option.value}>
                                        {option.label}
                                    </Radio>
                                ))}
                            </RadioGroup>
                        </HStack>
                    )}

                    {selectedTab === 'manual' && (
                        <DatePicker {...datepickerProps}>
                            <HStack wrap gap="4" justify="center">
                                <DatePicker.Input
                                    {...fromInputProps}
                                    label="Fra"
                                    value={filters.timeTimestampMin ?? ''}
                                />
                                <DatePicker.Input
                                    {...toInputProps}
                                    label="Til"
                                    value={filters.timeTimestampMax ?? ''}
                                />
                            </HStack>
                        </DatePicker>
                    )}
                </VStack>
            </ExpansionCard.Content>
        </ExpansionCard>
    );
}
