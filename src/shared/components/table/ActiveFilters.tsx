import { BodyShort, Button, Chips, HStack } from '@navikt/ds-react';

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
    totalEventCountLabel?: string;
    totalMatchingEventCountLabel?: string;
};

export function ActiveFilters({
    chips,
    emptyLabel,
    removeAllLabel,
    onClearAll,
    totalEventCount,
    totalEventCountLabel,
    totalMatchingEventCountLabel,
}: Props) {
    if (chips.length === 0) {
        return (
            <HStack justify="space-between">
                <HStack data-testid="active-filters">
                    <BodyShort size="small">{emptyLabel}</BodyShort>
                </HStack>
                {totalEventCount != null && totalEventCountLabel && (
                    <BodyShort size="small" textColor="subtle">
                        {totalEventCountLabel}: {totalEventCount}
                    </BodyShort>
                )}
            </HStack>
        );
    }

    return (
        <HStack justify="space-between">
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
            {totalEventCount != null && totalMatchingEventCountLabel && (
                <BodyShort size="small" textColor="subtle">
                    {totalMatchingEventCountLabel}: {totalEventCount}
                </BodyShort>
            )}
        </HStack>
    );
}
