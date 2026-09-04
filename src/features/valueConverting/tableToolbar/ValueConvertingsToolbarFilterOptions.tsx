import { useTranslation } from 'react-i18next';

import { FilterDropdownMenu as SharedFilterDropdownMenu } from '../../../shared/components/table/FilterDropdownMenu';
import { useValueConvertingFilters } from './FilterContext';
import ApplicationFilter from './ApplicationFilter';
import TimeFilter from './TimeFilter';
import TypeFilter from './TypeFilter';
import NameFilter from './NameFilter';

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
                    content: <ApplicationFilter />,
                },
                {
                    id: 'type',
                    label: t('toolbar.typeCard.title'),
                    content: <TypeFilter />,
                },
                {
                    id: 'time',
                    label: t('toolbar.timeCard.title'),
                    content: <TimeFilter />,
                },
                {
                    id: 'name',
                    label: t('toolbar.nameCard.title'),
                    content: <NameFilter />,
                }
            ]}
        />
    );
}
