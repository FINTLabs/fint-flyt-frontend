import { Chips, ExpansionCard, ToggleGroup, UNSAFE_Combobox, VStack } from '@navikt/ds-react';
import React, { useState } from 'react';
import { useFilters } from './FilterContext';
import { getLabelsByIds, setArrayValue } from './util';

interface Props {
    associatedEventNamesOptions: { label: string; value: string }[];
    statusesOptions: { label: string; value: string }[];
    id: string;
    isOpen: boolean;
    toggleOpen: (cardId: string) => void;
}

export default function StatusCard(props: Props) {
    const { filters, updateFilter } = useFilters();
    const [selectedTab, setSelectedTab] = useState<string>(
        (filters.associatedEvents ?? []).length > 0 ? 'event' : 'status'
    );

    function handleTabChange(tab: string) {
        setSelectedTab(tab);
        // Clear the opposite selection when switching tabs
        updateFilter(tab === 'status' ? 'storageStatuses' : 'statuses', []);
    }

    const getExpansionCardDescription = (): string => {
        const parts: string[] = [];
        if ((filters.associatedEvents ?? []).length > 0) {
            // parts.push(`Siste hendelse: ${filters.associatedEventNames}`);
            parts.push(
                `Siste hendelse: ${getLabelsByIds(filters.associatedEvents, props.associatedEventNamesOptions).join(', ')}`
            );
        }
        if ((filters.statuses ?? []).length > 0) {
            // parts.push(`Status: ${filters.statuses}`);
            parts.push(
                `Status: ${getLabelsByIds(filters.statuses, props.statusesOptions).join(', ')}`
            );
        }
        return parts.join(' | ');
    };

    return (
        <ExpansionCard
            size="small"
            aria-label="Status"
            open={props.isOpen}
            onToggle={() => props.toggleOpen(props.id)}>
            <ExpansionCard.Header>
                <ExpansionCard.Title as="h4" size="small">
                    Status
                </ExpansionCard.Title>
                <ExpansionCard.Description>
                    {getExpansionCardDescription()}
                </ExpansionCard.Description>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                <VStack gap="8">
                    <ToggleGroup value={selectedTab} onChange={handleTabChange} fill>
                        <ToggleGroup.Item value="status" label="Status" />
                        <ToggleGroup.Item value="event" label="Siste hendelse" />
                    </ToggleGroup>

                    {selectedTab === 'status' && (
                        <Chips>
                            {props.statusesOptions.map((option) => (
                                <Chips.Toggle
                                    checkmark
                                    key={option.value}
                                    selected={filters.statuses?.includes(option.value)}
                                    onClick={() =>
                                        setArrayValue(
                                            updateFilter,
                                            filters,
                                            'statuses',
                                            option.value,
                                            !filters.statuses?.includes(option.value)
                                        )
                                    }>
                                    {option.label}
                                </Chips.Toggle>
                            ))}
                        </Chips>
                    )}

                    {selectedTab === 'event' && (
                        <UNSAFE_Combobox
                            allowNewValues
                            label="Siste hendelse"
                            options={props.associatedEventNamesOptions}
                            // selectedOptions={filters.storageStatuses ?? []}
                            selectedOptions={props.associatedEventNamesOptions.filter((opt) =>
                                filters.associatedEvents?.includes(opt.value)
                            )}
                            isMultiSelect
                            onToggleSelected={(option, isSelected) =>
                                setArrayValue(
                                    updateFilter,
                                    filters,
                                    'associatedEvents',
                                    option,
                                    isSelected
                                )
                            }
                        />
                    )}
                </VStack>
            </ExpansionCard.Content>
        </ExpansionCard>
    );
}
