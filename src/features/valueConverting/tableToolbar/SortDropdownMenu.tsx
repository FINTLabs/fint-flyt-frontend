import { ActionMenu, Button, HStack } from '@navikt/ds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { ChevronDownIcon, SortDownIcon } from '../../../shared/components/icons';
import { useValueConvertingFilters } from './FilterContext';
import { sortOptions } from './types';

export default function SortDropdownMenu() {
    const { t } = useTranslation('translations', {
        keyPrefix: 'pages.valueConverting.sort',
    });
    const { updateSort, filters } = useValueConvertingFilters();

    function handleSortChange(value: string) {
        if (value) {
            updateSort(value);
        }
    }

    return (
        <ActionMenu>
            <ActionMenu.Trigger>
                <Button
                    size="small"
                    data-color="neutral"
                    variant="secondary-neutral"
                    icon={<ChevronDownIcon aria-hidden />}
                    iconPosition="right"
                    className={'table-toolbar-button right'}
                >
                    <HStack gap={'1'} wrap={false}>
                        <SortDownIcon aria-hidden fontSize={'1.2rem'} />
                        <HStack gap={'2'}>{t('sortMenuButtonText')}</HStack>
                    </HStack>
                </Button>
            </ActionMenu.Trigger>
            <ActionMenu.Content>
                <ActionMenu.RadioGroup onValueChange={handleSortChange} value={filters.sort || undefined} label={t('sortMenuButtonText')}>
                    {sortOptions.map((option) => (
                        <ActionMenu.RadioItem
                            value={option}
                            key={option}
                            onClick={() => updateSort(option)}
                        >
                            {t(`options.${option}`)}
                        </ActionMenu.RadioItem>
                    ))}
                </ActionMenu.RadioGroup>
            </ActionMenu.Content>
        </ActionMenu>
    );
}
