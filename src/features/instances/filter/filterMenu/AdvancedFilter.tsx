import { useState } from 'react';
import { Checkbox, CheckboxGroup, UNSAFE_Combobox, VStack } from '@navikt/ds-react';
import { useTranslation } from 'react-i18next';
import { useFilters } from '../FilterContext';
import { setArrayValue, updateArrayValue } from '../util';
import { useFilterOptions } from '../OptionsContext';

export default function AdvancedFilter() {
    const { t } = useTranslation('translations', {
        keyPrefix: 'pages.instances.filter',
    });
    const { filters, updateFilter } = useFilters();
    const { storageStatusesOptions, eventCategoriesOptions } = useFilterOptions();

    const [storageStatuses, setSelectedStorageStatuses] = useState(filters.storageStatuses || []);

    const handleSelectedStorageStatusesChange = (value: any[]) => {
        setSelectedStorageStatuses(value);
        setArrayValue(updateFilter, 'storageStatuses', value);
    };
    return (
        <VStack gap="4" padding={'2'}>
            <UNSAFE_Combobox
                size={'small'}
                label={t('advancedCard.combobox.label')}
                options={eventCategoriesOptions.map((option) => ({
                    label: t(`associatedEventNames.${option.value}`, {
                        defaultValue: option.label,
                    }),
                    value: option.value,
                }))}
                isMultiSelect
                selectedOptions={(filters.associatedEvents ?? [])
                    .map((id) => {
                        const option = eventCategoriesOptions.find((opt) => opt.value === id);
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
                        (option): option is { label: string; value: string } => option !== null
                    )}
                onToggleSelected={(option, isSelected) =>
                    updateArrayValue(updateFilter, filters, 'associatedEvents', option, isSelected)
                }
            />

            <CheckboxGroup
                legend={t('advancedCard.chips.label')}
                size={'small'}
                value={storageStatuses}
                onChange={handleSelectedStorageStatusesChange}
            >
                {storageStatusesOptions.map((option) => (
                    <Checkbox key={option.value} value={option.value}>
                        {t(`intermediateStorageStatusOptions.${option.value}`)}
                    </Checkbox>
                ))}
            </CheckboxGroup>
        </VStack>
    );
}
