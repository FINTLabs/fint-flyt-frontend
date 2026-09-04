import { useTranslation } from 'react-i18next';

import { FilterDropdownMenu as SharedFilterDropdownMenu } from '../../../../shared/components/table/FilterDropdownMenu';
import { useInstanceFilters } from '../FilterContext';
import AdvancedFilter from './AdvancedFilter';
import InstanceFilter from './InstanceFilter';
import IntegrationFilter from './IntegrationFilter';
import StatusFilter from './StatusFilter';
import TimeFilter from './TimeFilter';

export default function InstanceToolbarFilterOptions() {
    const { t } = useTranslation('translations', {
        keyPrefix: 'pages.instances',
    });
    const { saveFilters, clearFilters, numberOfActiveFilters } = useInstanceFilters();

    return (
        <SharedFilterDropdownMenu
            defaultActiveId="time"
            numberOfActiveFilters={numberOfActiveFilters}
            triggerLabel={t('filter.filterMenuButtonText')}
            clearLabel={t('button.clear')}
            searchLabel={t('button.search')}
            onClear={clearFilters}
            onSave={saveFilters}
            sections={[
                {
                    id: 'time',
                    label: t('filter.timeCard.title'),
                    content: <TimeFilter />,
                },
                {
                    id: 'integration',
                    label: t('filter.integrationCard.title'),
                    content: <IntegrationFilter />,
                },
                {
                    id: 'instance',
                    label: t('filter.instanceCard.title'),
                    content: <InstanceFilter />,
                },
                {
                    id: 'status',
                    label: t('filter.statusCard.title'),
                    content: <StatusFilter />,
                },
                {
                    id: 'advanced',
                    label: t('filter.advancedCard.title'),
                    content: <AdvancedFilter />,
                },
            ]}
        />
    );
}
