import { Select, VStack } from '@navikt/ds-react';
import { useTranslation } from 'react-i18next';

import { fromTypeIds, toTypeIds } from '../../../shared/defaults/valueConvertingTypes';
import { useValueConvertingFilters } from './FilterContext';

export default function TypeFilter() {
    const { t } = useTranslation('translations', {
        keyPrefix: 'pages.valueConverting.toolbar',
    });

    const { filters, updateFilter } = useValueConvertingFilters();

    return (
        <VStack gap="4" padding="2">
            <Select
                label={t('typeCard.fromType')}
                size="small"
                value={filters.fromTypeId ?? ''}
                onChange={(e) => updateFilter('fromTypeId', e.target.value)}
            >
                <option value="">{`- ${t('typeCard.fromTypePlaceholder')}`}</option>
                {fromTypeIds.map((type) => (
                    <option key={type.value} value={type.value}>
                        {type.label}
                    </option>
                ))}
            </Select>
            <Select
                label={t('typeCard.toType')}
                size="small"
                value={filters.toTypeId ?? ''}
                onChange={(e) => updateFilter('toTypeId', e.target.value)}
            >
                <option value="">{`- ${t('typeCard.toTypePlaceholder')}`}</option>
                {toTypeIds.map((type) => (
                    <option key={type.value} value={type.value}>
                        {type.label}
                    </option>
                ))}
            </Select>
        </VStack>
    );
}
