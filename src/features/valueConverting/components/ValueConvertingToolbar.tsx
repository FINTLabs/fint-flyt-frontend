import { Button, HelpText, HStack } from '@navikt/ds-react';
import { useTranslation } from 'react-i18next';

import { PlusIcon } from '../../../shared/components/icons';
import { TableToolbar } from '../../../shared/components/table/TableToolbar';
import ActiveFilters from '../tableToolbar/ActiveFilters';
import SortDropdownMenu from '../tableToolbar/SortDropdownMenu';
import ValueConvertingsToolbarFilterOptions from '../tableToolbar/ValueConvertingsToolbarFilterOptions';

type Props = {
    onNewConverting: () => void;
};

export function ValueConvertingToolbar({ onNewConverting }: Props) {
    const { t } = useTranslation('translations', { keyPrefix: 'pages.valueConverting' });

    return (
        <TableToolbar
            start={
                <>
                    <ValueConvertingsToolbarFilterOptions />
                    <SortDropdownMenu />
                </>
            }
            end={
                <HStack gap="2" align="center">
                    <Button
                        id="new-button"
                        size="small"
                        icon={<PlusIcon aria-hidden />}
                        onClick={onNewConverting}
                    >
                        {t('button.newConverting')}
                    </Button>
                    <HelpText placement="left">{t('help.new')}</HelpText>
                </HStack>
            }
            footer={<ActiveFilters />}
        />
    );
}
