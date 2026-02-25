import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HStack, Tabs, UNSAFE_Combobox } from '@navikt/ds-react';
import { useFilterOptions } from '../OptionsContext';
import { useFilters } from '../FilterContext';
import { updateArrayValue } from '../util';

export default function IntegrationFilter() {
    const { t } = useTranslation('translations', {
        keyPrefix: 'pages.instances.filter.integrationCard',
    });

    const { updateFilter, filters } = useFilters();
    const {
        integrationOptions,
        sourceApplicationIdOptions,
        sourceApplicationIntegrationOptions,
        updateSourceApplicationIntegrationByActiveFilters,
    } = useFilterOptions();

    const [selectedTab, setSelectedTab] = useState<string>(
        (filters.sourceApplicationIds ?? []).length > 0 ? 'sourceApp' : 'integration'
    );

    useEffect(() => {
        if (integrationOptions) {
            updateSourceApplicationIntegrationByActiveFilters(filters);
        }
    }, [integrationOptions, filters.sourceApplicationIds]);

    function handleTabChange(tab: string) {
        setSelectedTab(tab);
        if (tab === 'integration') {
            updateFilter('sourceApplicationIds', []);
            updateFilter('sourceApplicationIntegrationIds', []);
        } else {
            updateFilter('integrationIds', '');
        }
    }

    return (
        <Tabs value={selectedTab} onChange={handleTabChange} size={'small'} iconPosition="top" fill>
            <Tabs.List>
                <Tabs.Tab value="integration" label={t('tabs.integration')} />
                <Tabs.Tab value="sourceApp" label={t('tabs.sourceApp')} />
            </Tabs.List>
            <Tabs.Panel value="integration">
                <HStack gap={'2'} padding={'4'} width={'100%'}>
                    <UNSAFE_Combobox
                        label={t('combobox.integration')}
                        size={'small'}
                        options={integrationOptions}
                        isMultiSelect
                        width={'100%'}
                        selectedOptions={integrationOptions.filter((opt) =>
                            filters.integrationIds?.includes(opt.value)
                        )}
                        onToggleSelected={(option, isSelected) =>
                            updateArrayValue(
                                updateFilter,
                                filters,
                                'integrationIds',
                                option,
                                isSelected
                            )
                        }
                    />
                </HStack>
            </Tabs.Panel>
            <Tabs.Panel value="sourceApp">
                <HStack gap={'2'} padding={'4'}>
                    <UNSAFE_Combobox
                        label={t('combobox.sourceApp')}
                        size={'small'}
                        options={sourceApplicationIdOptions}
                        isMultiSelect
                        selectedOptions={sourceApplicationIdOptions.filter((opt) =>
                            filters.sourceApplicationIds?.includes(opt.value)
                        )}
                        onToggleSelected={(option, isSelected) =>
                            updateArrayValue(
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
                        size={'small'}
                        options={sourceApplicationIntegrationOptions}
                        isMultiSelect
                        selectedOptions={sourceApplicationIntegrationOptions.filter((opt) =>
                            filters.sourceApplicationIntegrationIds?.includes(opt.value)
                        )}
                        onToggleSelected={(option, isSelected) =>
                            updateArrayValue(
                                updateFilter,
                                filters,
                                'sourceApplicationIntegrationIds',
                                option,
                                isSelected
                            )
                        }
                    />
                </HStack>
            </Tabs.Panel>
        </Tabs>
    );
}
