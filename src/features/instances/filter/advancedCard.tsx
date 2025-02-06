import { Chips, ExpansionCard, Label, UNSAFE_Combobox, VStack } from '@navikt/ds-react';
import { useFilters } from './filterContext';
import { getLabelsByIds, setArrayValue } from './util';

interface Props {
    associatedEventNamesOptions: { label: string; value: string }[];
    storageStatusesOptions: { label: string; value: string }[];
    id: string;
    isOpen: boolean;
    toggleOpen: (cardId: string) => void;
}

export default function AdvancedCard({
    associatedEventNamesOptions,
    storageStatusesOptions,
    id,
    isOpen,
    toggleOpen,
}: Props) {
    const { filters, updateFilter } = useFilters();

    const getExpansionCardDescription = (): string => {
        const parts: string[] = [];

        if ((filters.associatedEventNames ?? []).length > 0) {
            parts.push(
                `Tilknyttede hendelser: ${getLabelsByIds(filters.associatedEventNames, associatedEventNamesOptions).join(', ')}`
            );
        }

        if ((filters.storageStatuses ?? []).length > 0) {
            parts.push(
                `Valgt mellomlagring: ${getLabelsByIds(filters.storageStatuses, storageStatusesOptions).join(', ')}`
            );
        }

        return parts.join(' | ') || ''; // Fallback if no selections
    };

    return (
        <ExpansionCard
            size="small"
            aria-label="Avansert"
            open={isOpen}
            onToggle={() => toggleOpen(id)}>
            <ExpansionCard.Header>
                <ExpansionCard.Title as="h4" size="small">
                    Avansert
                </ExpansionCard.Title>
                <ExpansionCard.Description>
                    {getExpansionCardDescription()}
                </ExpansionCard.Description>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                <VStack gap="8">
                    <UNSAFE_Combobox
                        label="Tilknyttet hendelse"
                        options={associatedEventNamesOptions}
                        isMultiSelect
                        // selectedOptions={filters.associatedEventNames ?? []}
                        selectedOptions={associatedEventNamesOptions.filter((opt) =>
                            filters.associatedEventNames?.includes(opt.value)
                        )}
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

                    <Label>Mellomlagring</Label>
                    <Chips>
                        {storageStatusesOptions.map((option) => (
                            <Chips.Toggle
                                checkmark
                                key={option.value}
                                // selected={(filters.destinationIds ?? []).includes(option)}
                                selected={filters.storageStatuses?.includes(option.value)}
                                onClick={() =>
                                    setArrayValue(
                                        updateFilter,
                                        filters,
                                        'storageStatuses',
                                        option.value,
                                        !filters.storageStatuses?.includes(option.value)
                                    )
                                }>
                                {option.label}
                            </Chips.Toggle>
                        ))}
                    </Chips>
                </VStack>
            </ExpansionCard.Content>
        </ExpansionCard>
    );
}
