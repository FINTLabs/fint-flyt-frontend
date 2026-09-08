import { Button, Chips, HStack } from '@navikt/ds-react';

import { XMarkIcon } from '../icons';

export type ActiveFilterChip = {
    key: string;
    label: string;
    onRemove: () => void;
};

type Props = {
    chips: ActiveFilterChip[];
    emptyLabel: string;
    removeAllLabel: string;
    onClearAll: () => void;
    totalEventCount?: number | null;
};

export function ActiveFilters({
    chips,
    emptyLabel,
    removeAllLabel,
    onClearAll,
    totalEventCount,
}: Props) {
    if (chips.length === 0) {
        return <HStack data-testid="active-filters">{emptyLabel}</HStack>;
    }

    return (
        <>
            <HStack gap="2" className="active-filters" align="center" data-testid="active-filters">
                <Chips size="small">
                    {chips.map((chip) => (
                        <Chips.Removable
                            key={chip.key}
                            className="filter-chip"
                            onClick={chip.onRemove}
                        >
                            {chip.label}
                        </Chips.Removable>
                    ))}
                </Chips>
                <Button
                    size="small"
                    variant="tertiary"
                    className="filter-clear-all"
                    icon={<XMarkIcon aria-hidden />}
                    onClick={onClearAll}
                >
                    {removeAllLabel}
                </Button>
            </HStack>
            {totalEventCount && <span className="total-event-count">{totalEventCount}</span>}
        </>
    );
}
