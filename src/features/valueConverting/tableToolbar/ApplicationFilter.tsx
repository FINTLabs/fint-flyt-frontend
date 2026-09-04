import { Select, UNSAFE_Combobox, VStack } from '@navikt/ds-react';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AuthorizationContext } from '../../../shared/context/AuthorizationContext';
import { sourceApplicationsToSelectable } from '../../../shared/util/FormUtil';
import { ISelect } from '../../../shared/types/Select';
import { useValueConvertingFilters } from './FilterContext';
import { destinations } from '../../../shared/DefaultValues';

export default function ApplicationFilter() {
    const { t } = useTranslation('translations', {
        keyPrefix: 'pages.valueConverting.toolbar',
    });
    const { getAllSourceApplications } = useContext(AuthorizationContext);
    const { filters, updateFilter } = useValueConvertingFilters();
    const [options, setOptions] = useState<ISelect[]>([]);

    useEffect(() => {
        getAllSourceApplications(true).then((sourceApps) => {
            setOptions(sourceApplicationsToSelectable(sourceApps));
        });
    }, [getAllSourceApplications]);

    return (
        <VStack gap="4" padding="2">
            <UNSAFE_Combobox
                label={t('sourceApplicationCard.sourceApplication')}
                size="small"
                options={options}
                isMultiSelect
                selectedOptions={options.filter((opt) =>
                    filters.sourceApplicationIds.includes(opt.value)
                )}
                onToggleSelected={(option, isSelected) => {
                    const next = isSelected
                        ? [...filters.sourceApplicationIds, option]
                        : filters.sourceApplicationIds.filter((id) => id !== option);
                    updateFilter('sourceApplicationIds', next);
                }}
            />

            <Select
                label={t('sourceApplicationCard.toApplication')}
                size="small"
                value={filters.toApplicationId ?? ''}
                onChange={(e) => updateFilter('toApplicationId', e.target.value)}
            >
                <option value="">{`- ${t('sourceApplicationCard.toApplicationPlaceholder')}`}</option>
                {destinations.map((destination) => (
                    <option key={destination.value} value={destination.value}>
                        {destination.label}
                    </option>
                ))}
            </Select>
        </VStack>
    );
}
