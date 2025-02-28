import {
    Chips,
    Detail,
    ExpansionCard,
    ToggleGroup,
    UNSAFE_Combobox,
    VStack,
} from '@navikt/ds-react';
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
        keyPrefix: 'pages.instances.filter',
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

    const getExpansionCardDescription = (): React.ReactNode => {
        const details: React.ReactNode[] = [];

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

            details.push(
                <Detail key="event">
                    {t('statusCard.description.event', { value: eventLabels })}
                </Detail>
            );
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

            details.push(
                <Detail key="status">
                    {t('statusCard.description.status', { value: statusLabels })}
                </Detail>
            );
        }

        return details.length > 0 ? <>{details}</> : null; // ✅ Returns JSX elements or null
    };

    return (
        <ExpansionCard
            data-testid="status"
            size="small"
            aria-label={t('statusCard.ariaLabel') || ''}
            open={props.isOpen}
            onToggle={() => props.toggleOpen(props.id)}>
            <ExpansionCard.Header>
                <ExpansionCard.Title as="h4" size="small">
                    {t('statusCard.title')}
                </ExpansionCard.Title>
                <ExpansionCard.Description>
                    {getExpansionCardDescription()}
                </ExpansionCard.Description>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                <VStack gap="8">
                    <ToggleGroup value={selectedTab} onChange={handleTabChange} fill>
                        <ToggleGroup.Item value="status" label={t('statusCard.tabs.status')} />
                        <ToggleGroup.Item value="event" label={t('statusCard.tabs.event')} />
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
                            label={t('statusCard.combobox.label')} // Translate the label
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
