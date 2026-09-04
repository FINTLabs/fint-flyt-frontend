import { ActionMenu, BodyShort, Button, HGrid, HStack, VStack } from '@navikt/ds-react';
import { ReactNode, useCallback, useState } from 'react';

import { ChevronDownIcon, ChevronRightIcon, FilterIcon } from '../icons';

export type FilterDropdownSection = {
    id: string;
    label: string;
    content: ReactNode;
};

type Props = {
    sections: FilterDropdownSection[];
    defaultActiveId: string;
    numberOfActiveFilters: number;
    triggerLabel: string;
    clearLabel: string;
    searchLabel: string;
    onClear: () => void;
    onSave: () => void;
};

export function FilterDropdownMenu({
    sections,
    defaultActiveId,
    numberOfActiveFilters,
    triggerLabel,
    clearLabel,
    searchLabel,
    onClear,
    onSave,
}: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(defaultActiveId);

    const changeActiveItem = useCallback((cardId: string) => {
        setActiveItem(cardId);
    }, []);

    const activeSection = sections.find((section) => section.id === activeItem);

    return (
        <ActionMenu open={isOpen} onOpenChange={setIsOpen}>
            <ActionMenu.Trigger data-testid="filters-form-button">
                <Button
                    data-color="neutral"
                    variant="secondary-neutral"
                    icon={<ChevronDownIcon aria-hidden />}
                    iconPosition="right"
                    size="small"
                    className={`table-toolbar-button left ${numberOfActiveFilters ? 'toggled' : ''}`}
                >
                    <HStack gap="1" wrap={false}>
                        <FilterIcon aria-hidden fontSize="1.2rem" />
                        {triggerLabel}
                    </HStack>
                </Button>
            </ActionMenu.Trigger>
            <ActionMenu.Content className="filter-toolbar-menu-content" data-testid="filters-form">
                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        onSave();
                        setIsOpen(false);
                    }}
                >
                    <VStack>
                        <HGrid columns={2}>
                            <VStack className="filter-menu-options" paddingBlock="0 4">
                                {sections.map((section) => (
                                    <FilterMenuButton
                                        key={section.id}
                                        id={section.id}
                                        label={section.label}
                                        onOpen={changeActiveItem}
                                        activeItem={activeItem}
                                    />
                                ))}
                            </VStack>
                            <VStack padding="4" className="filter-menu-filters">
                                {activeSection?.content}
                            </VStack>
                        </HGrid>
                        <HStack className="filter-menu-actions" gap="4" justify="end" padding="2">
                            <Button
                                variant="secondary"
                                type="button"
                                size="small"
                                onClick={() => {
                                    onClear();
                                    setIsOpen(false);
                                }}
                            >
                                {clearLabel}
                            </Button>
                            <Button size="small" data-testid="filters-submit" type="submit">
                                {searchLabel}
                            </Button>
                        </HStack>
                    </VStack>
                </form>
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

function FilterMenuButton({ id, label, onOpen, activeItem }: FilterMenuButtonProps) {
    return (
        <Button
            type="button"
            variant="tertiary-neutral"
            iconPosition="right"
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
}
