import { ActionMenu, Button, HStack } from '@navikt/ds-react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ChevronDownIcon, SortDownIcon } from '../../../shared/components/icons';
import { useValueConvertingFilters } from './FilterContext';
import { sortOptions } from './types';

export default function SortDropdownMenu() {
    const { t } = useTranslation('translations', {
        keyPrefix: 'pages.valueConverting.toolbar.sort',
    });
    const { updateSort, filters } = useValueConvertingFilters();
    const [open, setOpen] = useState(false);
    
    function handleSortOrderByChange(orderBy: string) {
        if (!orderBy) return;
        updateSort({
            orderBy,
            direction: filters.sort.direction ?? 'ASC',
        });
        setOpen(false);
    }

    function handleSortDirectionChange(direction: 'ASC' | 'DESC') {
        if (!direction) return;
        updateSort({
            orderBy: filters.sort.orderBy ?? 'id',
            direction,
        });
        setOpen(false);
    }

    return (
        <ActionMenu open={open} onOpenChange={setOpen}>
            <ActionMenu.Trigger onClick={() => setOpen(true)}>
                <Button
                    size="small"
                    data-color="neutral"
                    variant="secondary-neutral"
                    icon={<ChevronDownIcon aria-hidden />}
                    iconPosition="right"
                    className={`table-toolbar-button right ${filters.sort.orderBy ? 'toggled' : ''}`}
                >
                    <HStack gap={'1'} wrap={false}>
                        <SortDownIcon aria-hidden fontSize={'1.2rem'} />
                        <HStack gap={'2'}>{t('sortMenuButtonText')}</HStack>
                    </HStack>
                </Button>
            </ActionMenu.Trigger>
            <ActionMenu.Content className="table-toolbar-sort-menu">
                <ActionMenu.RadioGroup
                    onValueChange={handleSortOrderByChange}
                    value={filters.sort.orderBy}
                    label={t('sortMenuButtonText')}
                >
                    {sortOptions.map((option) => (
                        <ActionMenu.RadioItem
                            value={option}
                            key={option}
                        >
                            {t(`options.${option}`)}
                        </ActionMenu.RadioItem>
                    ))}
                </ActionMenu.RadioGroup>
                <ActionMenu.Divider />
                <ActionMenu.RadioGroup
                    onValueChange={(value) => handleSortDirectionChange(value as 'ASC' | 'DESC')}
                    value={filters.sort.direction}
                    label={t('sortDirectionMenuButtonText')}
                >
                    <ActionMenu.RadioItem value="ASC" key="ASC">
                        {t('sortDirectionMenuButtonTextASC')}
                    </ActionMenu.RadioItem>
                    <ActionMenu.RadioItem value="DESC" key="DESC">
                        {t('sortDirectionMenuButtonTextDESC')}
                    </ActionMenu.RadioItem>
                </ActionMenu.RadioGroup>
            </ActionMenu.Content>
        </ActionMenu>
    );
}
