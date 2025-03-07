import { Select } from '@navikt/ds-react';
import { useFilters } from './FilterContext';
import { useTranslation } from 'react-i18next';

export default function SortSelect() {
    const { t } = useTranslation('translations', { keyPrefix: 'pages.instances' });
    const { filters, updateFilter } = useFilters();

    return (
        <Select
            data-testid="sortSelect"
            label={t('filter.sort')}
            value={filters.sort || ''}
            onChange={(e) => updateFilter('sort', e.target.value)}>
            <option>{t('filter.sortBy')}</option>
            <option value="timestamp,asc">{t('filter.options.timestampAsc')}</option>
            <option value="timestamp,desc">{t('filter.options.timestampDesc')}</option>
            {/*<option value="sourceApplicationInstanceId,desc">*/}
            {/*    {t('filter.options.sourceAppId')}*/}
            {/*</option>*/}
            {/*<option value="destinationId,desc">{t('filter.options.destinationId')}</option>*/}
        </Select>
    );
}
