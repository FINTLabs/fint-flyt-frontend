import React, { useState } from 'react';
import { ActionMenu, Button, HStack } from '@navikt/ds-react';
import { ChevronDownIcon } from '@navikt/aksel-icons';
import { useTranslation } from 'react-i18next';
import { useFilters } from '../FilterContext';

export default function QuickFiltersDropdownMenu() {
    const { t } = useTranslation('translations', {
        keyPrefix: 'pages.instances.filter.quickFilter',
    });
    const { setQuickFilters } = useFilters();

    const [isOpen, setIsOpen] = useState(false);

    const handleSelectOption = (key: string) => {
        if (key === 'tryAgain') {
            setQuickFilters({
                statuses: ['FAILED'],
                storageStatuses: ['STORED'],
            });
        } else if (key === 'failedToday') {
            setQuickFilters({
                statuses: ['FAILED'],
                timeCurrentPeriod: 'TODAY',
            });
        }

        setIsOpen(false);
    };

    return (
        <ActionMenu open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
            <ActionMenu.Trigger>
                <Button
                    data-color="neutral"
                    variant="secondary-neutral"
                    icon={<ChevronDownIcon aria-hidden />}
                    iconPosition="right"
                    className={'groupedbutton right'}
                    size={'small'}
                >
                    <HStack gap={'2'}>{t('title')}</HStack>
                </Button>
            </ActionMenu.Trigger>
            <ActionMenu.Content className={'filter-toolbar-menu-content'}>
                <ActionMenu.Item onClick={() => handleSelectOption('tryAgain')}>
                    {t('tryAgain')}
                </ActionMenu.Item>
                <ActionMenu.Item onClick={() => handleSelectOption('failedToday')}>
                    {t('failedToday')}
                </ActionMenu.Item>
            </ActionMenu.Content>
        </ActionMenu>
    );
}