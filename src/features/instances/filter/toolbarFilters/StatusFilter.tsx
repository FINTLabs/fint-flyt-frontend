import { useFilterOptions } from '../OptionsContext';
import {
    Checkbox,
    CheckboxGroup,
    HStack,
    Tabs,
    UNSAFE_Combobox,
} from '@navikt/ds-react';
import { useTranslation } from 'react-i18next';
import { useFilters } from '../FilterContext';
import { updateArrayValue, setArrayValue } from '../util';
import React, { useState } from 'react';

export default function StatusFilter() {
    const { t } = useTranslation('translations', {
        keyPrefix: 'pages.instances.filter',
    });
    const { statusesOptions, instanceStatusEventCategoriesOptions } = useFilterOptions();
    const { filters, updateFilter } = useFilters();

    const [selectedTab, setSelectedTab] = useState<string>(
        (filters.lastStatusEvent ?? []).length > 0 ? 'event' : 'status'
    );

    const [selectedSatuses, setSelectedStatuses] = useState(filters.statuses || []);

    function handleTabChange(tab: string) {
        setSelectedTab(tab);
        if (tab === 'status') {
            updateFilter('lastStatusEvent', null);
        }
        if (tab === 'event') {
            updateFilter('statuses', null);
        }
    }

    const handleSelectedStatusChange = (value: any[]) => {
        setSelectedStatuses(value);
        setArrayValue(updateFilter, 'statuses', value);
    };

    return (
        <Tabs value={selectedTab} onChange={handleTabChange} size={'small'} fill>
            <Tabs.List>
                <Tabs.Tab value="status" label={t('statusCard.tabs.status')} />
                <Tabs.Tab value="event" label={t('statusCard.tabs.event')} />
            </Tabs.List>
            <Tabs.Panel value="status">
                <HStack padding={'4'}>
                    <CheckboxGroup
                        hideLegend
                        legend={t('statusCard.tabs.status')}
                        data-testid="status-options"
                        onChange={handleSelectedStatusChange}
                        value={selectedSatuses}
                        size={'small'}
                    >
                        {statusesOptions.map((option, index) => (
                            <Checkbox
                                value={option.value}
                                key={option.value}
                                data-testid={`status-option-${index}`}
                            >
                                {t(`statusOptions.${option.value}`)}
                            </Checkbox>
                        ))}
                    </CheckboxGroup>
                </HStack>
            </Tabs.Panel>
            <Tabs.Panel value="event">
                <HStack padding={'4'}>
                    <UNSAFE_Combobox
                        allowNewValues
                        size={'small'}
                        label={t('statusCard.combobox.label')} // Translate the label
                        options={instanceStatusEventCategoriesOptions.map((option) => ({
                            label: t(`associatedEventNames.${option.value}`),
                            value: option.value,
                        }))}
                        selectedOptions={instanceStatusEventCategoriesOptions
                            .filter((opt) => filters.lastStatusEvent?.includes(opt.value))
                            .map((option) => ({
                                label: t(`associatedEventNames.${option.value}`),
                                value: option.value,
                            }))}
                        isMultiSelect
                        onToggleSelected={(option, isSelected) =>
                            updateArrayValue(
                                updateFilter,
                                filters,
                                'lastStatusEvent',
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
