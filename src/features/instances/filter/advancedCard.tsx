import { Chips, ExpansionCard, Label, UNSAFE_Combobox, VStack } from '@navikt/ds-react';
import { useFilters } from './FilterContext';
import { setArrayValue } from './util';
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
        keyPrefix: 'pages.instances.filter',
    });
    const { filters, updateFilter } = useFilters();

    const getExpansionCardDescription = (): string => {
        const details: string[] = [];

        if ((filters.associatedEvents ?? []).length > 0) {
            const eventLabels = (filters.associatedEvents ?? [])
                .map((id) => {
                    const option = props.associatedEventNamesOptions.find(
                        (opt) => opt.value === id
                    );
                    return option ? t(`associatedEventNames.${option.value.trim()}`) : id;
                })
                .join(', ');

            details.push(t('advancedCard.description.associatedEvents', { value: eventLabels }));
        }

        if ((filters.storageStatuses ?? []).length > 0) {
            const statusLabels = (filters.storageStatuses ?? [])
                .map((id) => {
                    const option = props.storageStatusesOptions.find((opt) => opt.value === id);
                    return option
                        ? t(`intermediateStorageStatusOptions.${option.value.trim()}`)
                        : id;
                })
                .join(', ');

            details.push(t('advancedCard.description.storageStatuses', { value: statusLabels }));
        }

        return details.join(', ');
    };

    return (
        <ExpansionCard
            data-testid="advanced"
            size="small"
            aria-label={t('advancedCard.ariaLabel') || ''}
            open={props.isOpen}
            onToggle={() => props.toggleOpen(props.id)}>
            <ExpansionCard.Header>
                <ExpansionCard.Title as="h4" size="small">
                    {t('advancedCard.title')}
                </ExpansionCard.Title>
                <ExpansionCard.Description>
                    {getExpansionCardDescription()}
                </ExpansionCard.Description>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                <VStack gap="8">
                    <UNSAFE_Combobox
                        label={t('advancedCard.combobox.label')}
                        options={props.associatedEventNamesOptions.map((option) => ({
                            label: t(`associatedEventNames.${option.value}`, {
                                defaultValue: option.label,
                            }),
                            value: option.value,
                        }))}
                        isMultiSelect
                        selectedOptions={(filters.associatedEvents ?? [])
                            .map((id) => {
                                const option = props.associatedEventNamesOptions.find(
                                    (opt) => opt.value === id
                                );
                                return option
                                    ? {
                                          label: t(`associatedEventNames.${option.value}`, {
                                              defaultValue: option.label,
                                          }),
                                          value: option.value,
                                      }
                                    : null;
                            })
                            .filter(
                                (option): option is { label: string; value: string } =>
                                    option !== null
                            )} // Type guard
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

                    <Label>{t('advancedCard.chips.label')}</Label>
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
                                {t(`intermediateStorageStatusOptions.${option.value}`)}
                            </Chips.Toggle>
                        ))}
                    </Chips>
                </VStack>
            </ExpansionCard.Content>
        </ExpansionCard>
    );
}
