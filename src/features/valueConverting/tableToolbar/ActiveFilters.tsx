import { Button, Chips, HStack } from '@navikt/ds-react';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { XMarkIcon } from '../../../shared/components/icons';
import { AuthorizationContext } from '../../../shared/context/AuthorizationContext';
import { sourceApplicationsToSelectable } from '../../../shared/util/FormUtil';
import { ISelect } from '../../configuration/types/Select';
import { useValueConvertingFilters, ValueConvertingFilters } from './FilterContext';
import { clearTimeRange } from './TimeFilter';

export default function ActiveFilters() {
    const { t } = useTranslation('translations', {
        keyPrefix: 'pages.valueConverting.filter.activeFilters',
    });
    const { clearFilters, filters, updateFiltersAndSave, isSaved } = useValueConvertingFilters();
    const { getAllSourceApplications } = useContext(AuthorizationContext);
    const [options, setOptions] = useState<ISelect[]>([]);
    const [savedFilters, setSavedFilters] = useState<ValueConvertingFilters>(() => filters);

    useEffect(() => {
        getAllSourceApplications(true).then((sourceApps) => {
            setOptions(sourceApplicationsToSelectable(sourceApps));
        });
    }, [getAllSourceApplications]);

    useEffect(() => {
        if (isSaved) {
            setSavedFilters(filters);
        }
    }, [filters, isSaved]);

    const activeSourceApps = useMemo(
        () => options.filter((opt) => savedFilters.sourceApplicationIds.includes(opt.value)),
        [options, savedFilters.sourceApplicationIds]
    );

    const hasCreatedRange = !!(savedFilters.createdFrom || savedFilters.createdTo);
    const hasModifiedRange = !!(savedFilters.modifiedFrom || savedFilters.modifiedTo);
    const hasAnyFilters =
        activeSourceApps.length > 0 || hasCreatedRange || hasModifiedRange;

    if (!hasAnyFilters) {
        return <HStack data-testid="active-filters">{t('noFilters')}</HStack>;
    }

    return (
        <HStack gap="2" className="active-filters" align="center" data-testid="active-filters">
            <Chips size="small">
                {activeSourceApps.map((opt) => (
                    <Chips.Removable
                        key={opt.value}
                        className="filter-chip"
                        onClick={() => {
                            updateFiltersAndSave({
                                ...savedFilters,
                                sourceApplicationIds: savedFilters.sourceApplicationIds.filter(
                                    (id) => id !== opt.value
                                ),
                            });
                        }}
                    >
                        {opt.label}
                    </Chips.Removable>
                ))}
                {hasCreatedRange && (
                    <TimeRangeChip
                        labelKey="created"
                        from={savedFilters.createdFrom}
                        to={savedFilters.createdTo}
                        onRemove={() =>
                            updateFiltersAndSave(clearTimeRange(savedFilters, 'created'))
                        }
                    />
                )}
                {hasModifiedRange && (
                    <TimeRangeChip
                        labelKey="modified"
                        from={savedFilters.modifiedFrom}
                        to={savedFilters.modifiedTo}
                        onRemove={() =>
                            updateFiltersAndSave(clearTimeRange(savedFilters, 'modified'))
                        }
                    />
                )}
            </Chips>
            <Button
                size="small"
                variant="tertiary"
                className="filter-clear-all"
                icon={<XMarkIcon aria-hidden />}
                onClick={clearFilters}
            >
                {t('removeAll')}
            </Button>
        </HStack>
    );
}

const TimeRangeChip = ({
    labelKey,
    from,
    to,
    onRemove,
}: {
    labelKey: 'created' | 'modified';
    from: Date | null;
    to: Date | null;
    onRemove: () => void;
}) => {
    const { t } = useTranslation('translations', {
        keyPrefix: 'pages.valueConverting.filter.activeFilters',
    });

    const text = useMemo(() => {
        const safeFrom = from ? new Date(from) : null;
        const safeTo = to ? new Date(to) : null;
        const prefix = t(`${labelKey}Prefix`);

        if (safeFrom && safeTo) {
            return t('range', {
                prefix,
                from: safeFrom.toLocaleDateString(),
                to: safeTo.toLocaleDateString(),
            });
        }
        if (safeFrom) {
            return t('from', { prefix, from: safeFrom.toLocaleDateString() });
        }
        if (safeTo) {
            return t('to', { prefix, to: safeTo.toLocaleDateString() });
        }
        return null;
    }, [from, to, labelKey, t]);

    if (!text) return null;

    return (
        <Chips.Removable className="filter-chip" onClick={onRemove}>
            {text}
        </Chips.Removable>
    );
};
