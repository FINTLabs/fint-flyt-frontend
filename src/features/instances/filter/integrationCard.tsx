import { ExpansionCard, TextField, ToggleGroup, UNSAFE_Combobox, VStack } from '@navikt/ds-react';
import React, { useEffect, useState } from 'react';
import { useFilters } from './FilterContext';
import { getLabelsByIds, setArrayValue, setCommaSeparatedValue } from './util';

interface Props {
    // integrationOptions: { label: string; value: string }[];
    sourceApplicationIdsOptions: { label: string; value: string }[];
    id: string;
    isOpen: boolean;
    toggleOpen: (cardId: string) => void;
}

export default function IntegrationCard(props: Props) {
    const { updateFilter, filters } = useFilters();
    const [selectedTab, setSelectedTab] = useState<string>(
        (filters.sourceApplicationIds ?? []).length > 0 ? 'sourceApp' : 'integration'
    );

    const [integrationInput, setIntegrationInput] = useState(
        filters.integrationIds?.length ? filters.integrationIds.join(', ') : ''
    );

    useEffect(() => {
        setIntegrationInput(
            filters.integrationIds?.length ? filters.integrationIds.join(', ') : ''
        );
    }, [filters]);

    const handleIntegrationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIntegrationInput(e.target.value);
    };

    const handleIntegrationBlur = () => {
        setCommaSeparatedValue(updateFilter, 'integrationIds', integrationInput);
    };

    function handleTabChange(tab: string) {
        setSelectedTab(tab);
        if (tab === 'integration') {
            updateFilter('sourceApplicationIds', []);
        } else {
            updateFilter('integrationIds', '');
            setIntegrationInput('');
        }
    }

    const getExpansionCardDescription = (): string => {
        const parts: string[] = [];
        // TODO get names
        if (integrationInput.length > 0) {
            parts.push(
                //     `Integrasjon: ${getLabelsByIds(filters.sourceApplicationIntegrationIds, integrationOptions).join(', ')}`
                `Integrasjon: todo ${integrationInput}`
            );
        }

        if ((filters.sourceApplicationIds ?? []).length > 0) {
            parts.push(
                `Kildeapplikasjon: ${getLabelsByIds(filters.sourceApplicationIds, props.sourceApplicationIdsOptions).join(', ')}`
            );
        }
        return parts.join(' | ');
    };

    return (
        <ExpansionCard
            size="small"
            aria-label="Small-variant med description"
            open={props.isOpen}
            onToggle={() => props.toggleOpen(props.id)}>
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
                        <TextField
                            label="Integrasjon"
                            size="small"
                            value={integrationInput}
                            onChange={handleIntegrationChange}
                            onBlur={handleIntegrationBlur}
                            onKeyDown={(e) => e.key === 'Enter' && handleIntegrationBlur()}
                            placeholder="Skriv inn integrasjonsnavn, separert med komma"
                        />

                        // <UNSAFE_Combobox
                        //     label="Integrasjon-TEXT BOX"
                        //     options={integrationOptions}
                        //     isMultiSelect
                        //     selectedOptions={integrationOptions.filter((opt) =>
                        //         filters.sourceApplicationIntegrationIds?.includes(opt.value)
                        //     )}
                        //     onToggleSelected={(option, isSelected) =>
                        //         setArrayValue(
                        //             updateFilter,
                        //             filters,
                        //             'sourceApplicationIntegrationIds',
                        //             option,
                        //             isSelected
                        //         )
                        //     }
                        // />
                    )}
                    {selectedTab === 'sourceApp' && (
                        <UNSAFE_Combobox
                            label="Kildeapplikasjon"
                            options={props.sourceApplicationIdsOptions}
                            isMultiSelect
                            // selectedOptions={filters.sourceApplicationIds ?? []}
                            selectedOptions={props.sourceApplicationIdsOptions.filter((opt) =>
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
