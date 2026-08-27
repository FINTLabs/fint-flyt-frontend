import { ActionMenu, BodyShort, Button, HGrid, HStack, VStack } from '@navikt/ds-react';
import React, { FC, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ChevronDownIcon, ChevronRightIcon, FilterIcon } from '../../../../shared/components/icons';
import { useInstanceFilters } from '../FilterContext';
import AdvancedFilter from './AdvancedFilter';
import InstanceFilter from './InstanceFilter';
import IntegrationFilter from './IntegrationFilter';
import StatusFilter from './StatusFilter';
import TimeFilter from './TimeFilter';

export default function FilterDropdownMenu() {
    const { t } = useTranslation('translations', {
        keyPrefix: 'pages.instances',
    });

    const { saveFilters, clearFilters, numberOfActiveFilters } = useInstanceFilters();
    const [isOpen, setIsOpen] = useState(false);
    const [activeItem, setActiveItem] = useState<string>('time');

    const changeActiveItem = useCallback((cardId: string) => {
        setActiveItem(cardId);
    }, []);

    return (
        <ActionMenu open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
            <ActionMenu.Trigger data-testid="filters-form-button">
                <Button
                    data-color="neutral"
                    variant="secondary-neutral"
                    icon={<ChevronDownIcon aria-hidden />}
                    iconPosition="right"
                    size="small"
                    className={`table-toolbar-button left ${numberOfActiveFilters ? 'toggled' : ''}`}
                >
                    <HStack gap={'1'} wrap={false}>
                        <FilterIcon aria-hidden fontSize={'1.2rem'} />
                        {t('filter.filterMenuButtonText')}
                    </HStack>
                </Button>
            </ActionMenu.Trigger>
            <ActionMenu.Content
                className={'filter-toolbar-menu-content'}
                data-testid="filters-form"
            >
                <VStack>
                    <HGrid columns={2}>
                        <VStack className={'filter-menu-options'} paddingBlock={'0 4'}>
                            <FilterMenuButton
                                id="time"
                                label={t('filter.timeCard.title')}
                                onOpen={changeActiveItem}
                                activeItem={activeItem}
                            />
                            <FilterMenuButton
                                id="integration"
                                label={t('filter.integrationCard.title')}
                                onOpen={changeActiveItem}
                                activeItem={activeItem}
                            />
                            <FilterMenuButton
                                id="instance"
                                label={t('filter.instanceCard.title')}
                                onOpen={changeActiveItem}
                                activeItem={activeItem}
                            />
                            <FilterMenuButton
                                id="status"
                                label={t('filter.statusCard.title')}
                                onOpen={changeActiveItem}
                                activeItem={activeItem}
                            />
                            <FilterMenuButton
                                id="advanced"
                                label={t('filter.advancedCard.title')}
                                onOpen={changeActiveItem}
                                activeItem={activeItem}
                            />
                        </VStack>
                        <VStack padding={'4'} className={'filter-menu-filters'}>
                            {activeItem === 'time' && <TimeFilter />}
                            {activeItem === 'integration' && <IntegrationFilter />}
                            {activeItem === 'instance' && <InstanceFilter />}
                            {activeItem === 'status' && <StatusFilter />}
                            {activeItem === 'advanced' && <AdvancedFilter />}
                        </VStack>
                    </HGrid>
                    <HStack
                        className={'filter-menu-actions'}
                        gap={'4'}
                        justify={'end'}
                        padding={'2'}
                    >
                        <Button
                            variant={'secondary'}
                            type={'button'}
                            size={'small'}
                            onClick={() => {
                                clearFilters();
                            }}
                        >
                            {t('button.clear')}
                        </Button>
                        <Button
                            size={'small'}
                            data-testid="filters-submit"
                            onClick={() => {
                                saveFilters();
                                setIsOpen(false);
                            }}
                        >
                            {t('button.search')}
                        </Button>
                    </HStack>
                </VStack>
            </ActionMenu.Content>
        </ActionMenu>
    );
}

type FilterMenuButtonProps = {
    id: string;
    label: string;
    onOpen: (cardId: string) => void;
    activeItem: string | null;
};

const FilterMenuButton: FC<FilterMenuButtonProps> = ({ id, label, onOpen, activeItem }) => {
    return (
        <Button
            variant={'tertiary-neutral'}
            iconPosition={'right'}
            onClick={() => onOpen(id)}
            icon={<ChevronRightIcon aria-hidden />}
            className={activeItem === id ? 'filter-menu-toggled-item' : ''}
            style={{
                width: '100%',
                justifyContent: 'space-between',
                textAlign: 'left',
            }}
            data-testid={`${id}-filter`}
        >
            <BodyShort>{label}</BodyShort>
        </Button>
    );
};
