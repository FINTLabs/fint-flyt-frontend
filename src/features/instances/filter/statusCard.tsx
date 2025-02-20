import { Chips, ExpansionCard, ToggleGroup, UNSAFE_Combobox, VStack } from '@navikt/ds-react';
import React, { useState } from 'react';
import { useFilters } from './FilterContext';
import { getLabelsByIds, setArrayValue } from './util';
import { useTranslation } from 'react-i18next';

interface Props {
    associatedEventNamesOptions: { label: string; value: string }[];
    statusesOptions: { label: string; value: string }[];
    id: string;
    isOpen: boolean;
    toggleOpen: (cardId: string) => void;
}

export default function StatusCard(props: Props) {
    const { t } = useTranslation('translations', {
        keyPrefix: 'pages.instances.filter.statusCard',
    });
    const { filters, updateFilter } = useFilters();
    const [selectedTab, setSelectedTab] = useState<string>(
        (filters.lastEvent ?? []).length > 0 ? 'event' : 'status'
    );

    function handleTabChange(tab: string) {
        setSelectedTab(tab);
        updateFilter(tab === 'status' ? 'storageStatuses' : 'statuses', []);
    }

    const getExpansionCardDescription = (): string => {
        const parts: string[] = [];
        if ((filters.lastEvent ?? []).length > 0) {
            parts.push(
                t('description.event', {
                    value: getLabelsByIds(
                        filters.lastEvent,
                        props.associatedEventNamesOptions
                    ).join(', '),
                })
            );
        }
        if ((filters.statuses ?? []).length > 0) {
            parts.push(
                t('description.status', {
                    value: getLabelsByIds(filters.statuses, props.statusesOptions).join(', '),
                })
            );
        }
        return parts.join(' | ');
    };

    return (
        <ExpansionCard
            size="small"
            aria-label={t('ariaLabel') || 'default label'}
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
                    <ToggleGroup value={selectedTab} onChange={handleTabChange} fill>
                        <ToggleGroup.Item value="status" label={t('tabs.status')} />
                        <ToggleGroup.Item value="event" label={t('tabs.event')} />
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
                            label={t('combobox.label')}
                            options={props.associatedEventNamesOptions}
                            selectedOptions={props.associatedEventNamesOptions.filter((opt) =>
                                filters.lastEvent?.includes(opt.value)
                            )}
                            isMultiSelect
                            onToggleSelected={(option, isSelected) =>
                                setArrayValue(
                                    updateFilter,
                                    filters,
                                    'lastEvent',
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
