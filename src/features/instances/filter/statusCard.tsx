import { Chips, ExpansionCard, ToggleGroup, UNSAFE_Combobox, VStack } from '@navikt/ds-react';
import React, { useState } from 'react';
import { useFilters } from './FilterContext';
import { setArrayValue } from './util';
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
        if (tab === 'status') {
            updateFilter('lastEvent', null);
        }
        if (tab === 'event') {
            updateFilter('statuses', null);
        }
    }

    const getExpansionCardDescription = (): string => {
        const parts: string[] = [];

        if ((filters.lastEvent ?? []).length > 0) {
            const eventLabels = (filters.lastEvent ?? [])
                .map((id) => {
                    const option = props.associatedEventNamesOptions.find(
                        (opt) => opt.value === id
                    );
                    return option
                        ? t(`associatedEventNames.${option.value}`, { defaultValue: option.label })
                        : id;
                })
                .join(', ');

            parts.push(t('description.event', { value: eventLabels }));
        }

        if ((filters.statuses ?? []).length > 0) {
            const statusLabels = (filters.statuses ?? [])
                .map((id) => {
                    const option = props.statusesOptions.find((opt) => opt.value === id);
                    return option
                        ? t(`statusOptions.${option.value}`, { defaultValue: option.label })
                        : id;
                })
                .join(', ');

            parts.push(t('description.status', { value: statusLabels }));
        }

        return parts.join(' | ');
    };

    // const getExpansionCardDescription = (): string => {
    //     const parts: string[] = [];
    //
    //     if ((filters.lastEvent ?? []).length > 0) {
    //         const eventLabels = getLabelsByIds(filters.lastEvent, props.associatedEventNamesOptions)
    //             .map((label) => t(`associatedEventNames.${label}`, label))
    //             .join(', ');
    //
    //         parts.push(t('description.event', { value: eventLabels }));
    //     }
    //
    //     if ((filters.statuses ?? []).length > 0) {
    //         const statusLabels = getLabelsByIds(filters.statuses, props.statusesOptions)
    //             .map((label) => t(`statusOptions.${label}`, label))
    //             .join(', ');
    //         console.log('LABEL', t(`statusOptions.TRANSFERED`));
    //         parts.push(t('description.status', { value: statusLabels }));
    //     }
    //
    //     return parts.join(' | ');
    // };

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
                                    {/*{t(option.label)}*/}
                                    {t(`statusOptions.${option.value}`)}
                                </Chips.Toggle>
                            ))}
                        </Chips>
                    )}

                    {selectedTab === 'event' && (
                        <UNSAFE_Combobox
                            allowNewValues
                            label={t('combobox.label')} // Translate the label
                            options={props.associatedEventNamesOptions.map((option) => ({
                                label: t(`associatedEventNames.${option.value}`),
                                value: option.value,
                            }))}
                            selectedOptions={props.associatedEventNamesOptions
                                .filter((opt) => filters.lastEvent?.includes(opt.value))
                                .map((option) => ({
                                    label: t(`associatedEventNames.${option.value}`),
                                    value: option.value,
                                }))}
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
