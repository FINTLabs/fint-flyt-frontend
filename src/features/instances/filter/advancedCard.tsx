import { Chips, ExpansionCard, Label, UNSAFE_Combobox, VStack } from '@navikt/ds-react';
import { useFilters } from './FilterContext';
import { getLabelsByIds, setArrayValue } from './util';
import { useTranslation } from 'react-i18next';

interface Props {
    associatedEventNamesOptions: { label: string; value: string }[];
    storageStatusesOptions: { label: string; value: string }[];
    id: string;
    isOpen: boolean;
    toggleOpen: (cardId: string) => void;
}

export default function AdvancedCard(props: Props) {
    const { t } = useTranslation('translations', {
        keyPrefix: 'pages.instances.filter.advancedCard',
    });
    const { filters, updateFilter } = useFilters();

    const getExpansionCardDescription = (): string => {
        const parts: string[] = [];

        if ((filters.associatedEvents ?? []).length > 0) {
            parts.push(
                t('description.associatedEvents', {
                    value: getLabelsByIds(
                        filters.associatedEvents,
                        props.associatedEventNamesOptions
                    ).join(', '),
                })
            );
        }

        if ((filters.storageStatuses ?? []).length > 0) {
            parts.push(
                t('description.storageStatuses', {
                    value: getLabelsByIds(
                        filters.storageStatuses,
                        props.storageStatusesOptions
                    ).join(', '),
                })
            );
        }

        return parts.join(' | ') || ''; // Fallback if no selections
    };

    return (
        <ExpansionCard
            size="small"
            aria-label={t('ariaLabel') || 'Default Label'}
            open={props.isOpen}
            onToggle={() => props.toggleOpen(props.id)}>
            <ExpansionCard.Header>
                <ExpansionCard.Title as="h4" size="small">
                    {t('title')}
                </ExpansionCard.Title>
                <ExpansionCard.Description>
                    {getExpansionCardDescription()}
                </ExpansionCard.Description>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                <VStack gap="8">
                    <UNSAFE_Combobox
                        label={t('combobox.label')}
                        options={props.associatedEventNamesOptions}
                        isMultiSelect
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

                    <Label>{t('chips.label')}</Label>
                    <Chips>
                        {props.storageStatusesOptions.map((option) => (
                            <Chips.Toggle
                                checkmark
                                key={option.value}
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
