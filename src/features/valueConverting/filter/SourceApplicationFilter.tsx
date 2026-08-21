import { UNSAFE_Combobox } from '@navikt/ds-react';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AuthorizationContext } from '../../../shared/context/AuthorizationContext';
import { sourceApplicationsToSelectable } from '../../../shared/util/FormUtil';
import { ISelect } from '../../configuration/types/Select';
import { useValueConvertingFilters } from './FilterContext';

export default function SourceApplicationFilter() {
    const { t } = useTranslation('translations', {
        keyPrefix: 'pages.valueConverting.filter',
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
        <UNSAFE_Combobox
            label={t('sourceApplication')}
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
    );
}
