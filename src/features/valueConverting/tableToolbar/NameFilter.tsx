import { TextField, VStack } from "@navikt/ds-react";
import { useTranslation } from "react-i18next";
import { useValueConvertingFilters } from "./FilterContext";

export default function NameFilter() {
    const { t } = useTranslation('translations', {
        keyPrefix: 'pages.valueConverting.toolbar',
    });
    const { filters, updateFilter } = useValueConvertingFilters();
    return (
        <VStack gap="4" padding="2">
            <TextField
                label={t('nameCard.name')}
                size="small"
                value={filters.displayName ?? ''}
                onChange={(e) => updateFilter('displayName', e.target.value)}
            />
        </VStack>
    );
}