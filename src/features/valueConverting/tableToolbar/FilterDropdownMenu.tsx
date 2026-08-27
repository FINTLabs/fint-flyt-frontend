import { useTranslation } from 'react-i18next';

import { FilterDropdownMenu as SharedFilterDropdownMenu } from '../../../shared/components/table/FilterDropdownMenu';
import { useValueConvertingFilters } from './FilterContext';
import SourceApplicationFilter from './SourceApplicationFilter';
import TimeFilter from './TimeFilter';

export default function FilterDropdownMenu() {
    const { t } = useTranslation('translations', {
        keyPrefix: 'pages.valueConverting',
    });
    const { saveFilters, clearFilters, numberOfActiveFilters } = useValueConvertingFilters();

    return (
        <SharedFilterDropdownMenu
            defaultActiveId="sourceApplication"
            numberOfActiveFilters={numberOfActiveFilters}
            triggerLabel={t('filter.filterMenuButtonText')}
            clearLabel={t('button.clear')}
            searchLabel={t('button.search')}
            onClear={clearFilters}
            onSave={saveFilters}
            sections={[
                {
                    id: 'sourceApplication',
                    label: t('filter.sourceApplicationCard.title'),
                    content: <SourceApplicationFilter />,
                },
                {
                    id: 'time',
                    label: t('filter.timeCard.title'),
                    content: <TimeFilter />,
                },
            ]}
        />
    );
}
