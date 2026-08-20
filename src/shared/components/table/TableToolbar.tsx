import { HStack, VStack } from '@navikt/ds-react';
import { ReactNode } from 'react';

type Props = {
    /** Left side of the toolbar (filters, search, etc.). */
    start?: ReactNode;
    /** Right side of the toolbar (bulk actions, primary actions). */
    end?: ReactNode;
    /** Content below the main row (active filter chips, helper text). */
    footer?: ReactNode;
};

export function TableToolbar({ start, end, footer }: Props) {
    return (
        <VStack gap="4" className="table-toolbar">
            {(start || end) && (
                <HStack gap="8" justify="space-between">
                    <HStack align="center" wrap={false}>
                        {start}
                    </HStack>
                    {end}
                </HStack>
            )}
            {footer}
        </VStack>
    );
}
