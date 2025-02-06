import { ExpansionCard, ToggleGroup, UNSAFE_Combobox, VStack } from '@navikt/ds-react';
import React, { useState } from 'react';
import { Filters, useFilters } from './filterContext';
import { getLabelsByIds, setArrayValue } from './util';

interface Props {
    integrationOptions: { label: string; value: string }[];
    sourceApplicationIdsOptions: { label: string; value: string }[];
    id: string;
    isOpen: boolean;
    toggleOpen: (cardId: string) => void;
}

export default function IntegrationCard({
    integrationOptions,
    sourceApplicationIdsOptions,
    id,
    isOpen,
    toggleOpen,
}: Props) {
    const { updateFilter, filters } = useFilters();
    const [selectedTab, setSelectedTab] = useState<string>(
        (filters.sourceApplicationIds ?? []).length > 0 ? 'sourceApp' : 'integration'
    );

    function handleTabChange(tab: string) {
        setSelectedTab(tab);
        updateFilter(
            tab === 'integration' ? 'sourceApplicationIds' : 'sourceApplicationIntegrationIds',
            []
        );
    }

    const getExpansionCardDescription = (): string => {
        const parts: string[] = [];
        if ((filters.sourceApplicationIntegrationIds ?? []).length > 0) {
            parts.push(
                `Integrasjon: ${getLabelsByIds(filters.sourceApplicationIntegrationIds, integrationOptions).join(', ')}`
            );
        }
        //TODO get names from getSourceApplicationDisplayNameById(id)
        if ((filters.sourceApplicationIds ?? []).length > 0) {
            parts.push(
                `Kildeapplikasjon: ${getLabelsByIds(filters.sourceApplicationIds, sourceApplicationIdsOptions).join(', ')}`
            );
        }
        return parts.join(' | ');
    };

    return (
        <ExpansionCard
            size="small"
            aria-label="Small-variant med description"
            open={isOpen}
            onToggle={() => toggleOpen(id)}>
            <ExpansionCard.Header>
                <ExpansionCard.Title as="h4" size="small">
                    Integrasjon og kildeapplikasjon
                </ExpansionCard.Title>
                <ExpansionCard.Description>
                    {getExpansionCardDescription()}
                </ExpansionCard.Description>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                <VStack gap="8">
                    <ToggleGroup value={selectedTab} onChange={handleTabChange} fill>
                        <ToggleGroup.Item value="integration" label="Integrasjon" />
                        <ToggleGroup.Item value="sourceApp" label="Kildeapplikasjon" />
                    </ToggleGroup>

                    {selectedTab === 'integration' && (
                        <UNSAFE_Combobox
                            label="Integrasjon"
                            options={integrationOptions}
                            isMultiSelect
                            selectedOptions={integrationOptions.filter((opt) =>
                                filters.sourceApplicationIntegrationIds?.includes(opt.value)
                            )}
                            onToggleSelected={(option, isSelected) =>
                                setArrayValue(
                                    updateFilter,
                                    filters,
                                    'sourceApplicationIntegrationIds',
                                    option,
                                    isSelected
                                )
                            }
                        />
                    )}
                    {selectedTab === 'sourceApp' && (
                        <UNSAFE_Combobox
                            label="Kildeapplikasjon"
                            options={sourceApplicationIdsOptions}
                            isMultiSelect
                            // selectedOptions={filters.sourceApplicationIds ?? []}
                            selectedOptions={sourceApplicationIdsOptions.filter((opt) =>
                                filters.sourceApplicationIds?.includes(opt.value)
                            )}
                            onToggleSelected={(option, isSelected) =>
                                setArrayValue(
                                    updateFilter,
                                    filters,
                                    'sourceApplicationIds',
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
