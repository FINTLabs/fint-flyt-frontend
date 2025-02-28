import { Detail, ExpansionCard, ToggleGroup, UNSAFE_Combobox, VStack } from '@navikt/ds-react';
import React, { useEffect, useState } from 'react';
import { useFilters } from './FilterContext';
import { getLabelsByIds, setArrayValue } from './util';
import { useTranslation } from 'react-i18next';

interface Props {
    sourceApplicationIntegrationOptions: { label: string; value: string }[];
    sourceApplicationIdsOptions: { label: string; value: string }[];
    integrationOptions: { label: string; value: string }[];
    id: string;
    isOpen: boolean;
    toggleOpen: (cardId: string) => void;
}

export default function IntegrationCard(props: Props) {
    const { t } = useTranslation('translations', {
        keyPrefix: 'pages.instances.filter.integrationCard',
    });
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

    function handleTabChange(tab: string) {
        setSelectedTab(tab);
        if (tab === 'integration') {
            updateFilter('sourceApplicationIds', []);
            updateFilter('sourceApplicationIntegrationIds', []);
        } else {
            updateFilter('integrationIds', '');
            setIntegrationInput('');
        }
    }

    const getExpansionCardDescription = (): React.ReactNode => {
        const parts: React.ReactNode[] = [];

        if (integrationInput.length > 0) {
            parts.push(
                <Detail key="integration">
                    {t('description.integration', { value: integrationInput })}
                </Detail>
            );
        }

        if ((filters.sourceApplicationIds ?? []).length > 0) {
            parts.push(
                <Detail key="sourceApplication">
                    {t('description.sourceApplication', {
                        value: getLabelsByIds(
                            filters.sourceApplicationIds,
                            props.sourceApplicationIdsOptions
                        ).join(', '),
                    })}
                </Detail>
            );
        }

        if ((filters.sourceApplicationIntegrationIds ?? []).length > 0) {
            parts.push(
                <Detail key="sourceApplicationIntegration">
                    {t('description.sourceApplicationIntegration', {
                        value: getLabelsByIds(
                            filters.sourceApplicationIntegrationIds,
                            props.sourceApplicationIntegrationOptions
                        ).join(', '),
                    })}
                </Detail>
            );
        }

        return parts.length > 0 ? <>{parts}</> : null;
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
                    <ToggleGroup value={selectedTab} onChange={handleTabChange} fill>
                        <ToggleGroup.Item value="integration" label={t('tabs.integration')} />
                        <ToggleGroup.Item value="sourceApp" label={t('tabs.sourceApp')} />
                    </ToggleGroup>

                    {selectedTab === 'sourceApp' && (
                        <>
                            <UNSAFE_Combobox
                                label={t('combobox.sourceApp')}
                                options={props.sourceApplicationIdsOptions}
                                isMultiSelect
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
                            <UNSAFE_Combobox
                                label={t('textField.integrationId.label')}
                                options={props.sourceApplicationIntegrationOptions}
                                isMultiSelect
                                selectedOptions={props.sourceApplicationIntegrationOptions.filter(
                                    (opt) =>
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
                        </>
                    )}
                    {selectedTab === 'integration' && (
                        // <TextField
                        //     label={t('combobox.integration')}
                        //     size="small"
                        //     value={integrationInput}
                        //     onChange={handleIntegrationChange}
                        //     onBlur={handleIntegrationBlur}
                        //     onKeyDown={(e) => e.key === 'Enter' && handleIntegrationBlur()}
                        //     placeholder={t('textField.integrationId.placeholder')}
                        // />
                        // TODO: Backend - what should be the label here??
                        <UNSAFE_Combobox
                            label={t('combobox.integration')}
                            options={props.integrationOptions}
                            isMultiSelect
                            selectedOptions={props.integrationOptions.filter((opt) =>
                                filters.integrationIds?.includes(opt.value)
                            )}
                            onToggleSelected={(option, isSelected) =>
                                setArrayValue(
                                    updateFilter,
                                    filters,
                                    'integrationIds',
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
