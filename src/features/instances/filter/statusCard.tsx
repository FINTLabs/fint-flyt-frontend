import { Chips, ExpansionCard, ToggleGroup, UNSAFE_Combobox, VStack } from '@navikt/ds-react';
import React, { useState } from 'react';
import { useFilters } from './filterContext';
import { getLabelsByIds, setArrayValue } from './util';

interface Props {
    associatedEventNamesOptions: { label: string; value: string }[];
    statusesOptions: { label: string; value: string }[];
    id: string;
    isOpen: boolean;
    toggleOpen: (cardId: string) => void;
}

export default function StatusCard({
    associatedEventNamesOptions,
    statusesOptions,
    id,
    isOpen,
    toggleOpen,
}: Props) {
    const { filters, updateFilter } = useFilters();
    const [selectedTab, setSelectedTab] = useState<string>(
        (filters.associatedEventNames ?? []).length > 0 ? 'event' : 'status'
    );

    function handleTabChange(tab: string) {
        setSelectedTab(tab);
        // Clear the opposite selection when switching tabs
        updateFilter(tab === 'status' ? 'storageStatuses' : 'statuses', []);
    }

    const getExpansionCardDescription = (): string => {
        const parts: string[] = [];
        if ((filters.associatedEventNames ?? []).length > 0) {
            // parts.push(`Siste hendelse: ${filters.associatedEventNames}`);
            parts.push(
                `Siste hendelse: ${getLabelsByIds(filters.associatedEventNames, associatedEventNamesOptions).join(', ')}`
            );
        }
        if ((filters.statuses ?? []).length > 0) {
            // parts.push(`Status: ${filters.statuses}`);
            parts.push(`Status: ${getLabelsByIds(filters.statuses, statusesOptions).join(', ')}`);
        }
        return parts.join(' | ');
    };

    return (
        <ExpansionCard
            size="small"
            aria-label="Status"
            open={isOpen}
            onToggle={() => toggleOpen(id)}>
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
                            {statusesOptions.map((option) => (
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
                            options={associatedEventNamesOptions}
                            // selectedOptions={filters.storageStatuses ?? []}
                            selectedOptions={associatedEventNamesOptions.filter((opt) =>
                                filters.associatedEventNames?.includes(opt.value)
                            )}
                            isMultiSelect
                            onToggleSelected={(option, isSelected) =>
                                setArrayValue(
                                    updateFilter,
                                    filters,
                                    'associatedEventNames',
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
