import { ReactNode } from 'react';

import { PaginationVariant, TablePageProvider } from './TablePageContext';

type TableLayoutWrapperProps = {
    children: ReactNode;
    toolbar?: ReactNode;
    initialPage?: number;
    initialRowCount?: number;
    paginationVariant?: PaginationVariant;
};

export function TableLayoutWrapper({
    children,
    toolbar,
    initialPage,
    initialRowCount,
    paginationVariant,
}: TableLayoutWrapperProps) {
    return (
        <TablePageProvider
            initialPage={initialPage}
            initialRowCount={initialRowCount}
            paginationVariant={paginationVariant}
        >
            {toolbar}
            {children}
        </TablePageProvider>
    );
}
