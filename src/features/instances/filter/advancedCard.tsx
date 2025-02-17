import { Chips, ExpansionCard, Label, UNSAFE_Combobox, VStack } from '@navikt/ds-react';
import { useFilters } from './FilterContext';
import { getLabelsByIds, setArrayValue } from './util';

interface Props {
    associatedEventNamesOptions: { label: string; value: string }[];
    storageStatusesOptions: { label: string; value: string }[];
    id: string;
    isOpen: boolean;
    toggleOpen: (cardId: string) => void;
}

export default function AdvancedCard(props: Props) {
    const { filters, updateFilter } = useFilters();

    const getExpansionCardDescription = (): string => {
        const parts: string[] = [];

        if ((filters.associatedEvents ?? []).length > 0) {
            parts.push(
                `Tilknyttede hendelser: ${getLabelsByIds(filters.associatedEvents, props.associatedEventNamesOptions).join(', ')}`
            );
        }

        if ((filters.storageStatuses ?? []).length > 0) {
            parts.push(
                `Valgt mellomlagring: ${getLabelsByIds(filters.storageStatuses, props.storageStatusesOptions).join(', ')}`
            );
        }

        return parts.join(' | ') || ''; // Fallback if no selections
    };

    return (
        <ExpansionCard
            size="small"
            aria-label="Avansert"
            open={props.isOpen}
            onToggle={() => props.toggleOpen(props.id)}>
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
                        options={props.associatedEventNamesOptions}
                        isMultiSelect
                        // selectedOptions={filters.associatedEventNames ?? []}
                        selectedOptions={props.associatedEventNamesOptions.filter((opt) =>
                            filters.associatedEvents?.includes(opt.value)
                        )}
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

                    <Label>Mellomlagring</Label>
                    <Chips>
                        {props.storageStatusesOptions.map((option) => (
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
