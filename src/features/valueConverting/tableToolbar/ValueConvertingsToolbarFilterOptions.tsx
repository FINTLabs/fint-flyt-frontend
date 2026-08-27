import { useTranslation } from 'react-i18next';

import { FilterDropdownMenu as SharedFilterDropdownMenu } from '../../../shared/components/table/FilterDropdownMenu';
import { useValueConvertingFilters } from './FilterContext';
import SourceApplicationFilter from './SourceApplicationFilter';
import TimeFilter from './TimeFilter';

export default function ValueConvertingsToolbarFilterOptions() {
    const { t } = useTranslation('translations', {
        keyPrefix: 'pages.valueConverting',
    });
    const { saveFilters, clearFilters, numberOfActiveFilters } = useValueConvertingFilters();

    return (
        <SharedFilterDropdownMenu
            defaultActiveId="sourceApplication"
            numberOfActiveFilters={numberOfActiveFilters}
            triggerLabel={t('toolbar.filterMenuButtonText')}
            clearLabel={t('button.clear')}
            searchLabel={t('button.search')}
            onClear={clearFilters}
            onSave={saveFilters}
            sections={[
                {
                    id: 'sourceApplication',
                    label: t('toolbar.sourceApplicationCard.title'),
                    content: <SourceApplicationFilter />,
                },
                {
                    id: 'time',
                    label: t('toolbar.timeCard.title'),
                    content: <TimeFilter />,
                },
            ]}
        />
    );
}
