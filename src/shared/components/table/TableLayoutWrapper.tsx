import { ReactNode } from 'react';

import { PaginationVariant, TablePageProvider } from './TablePageContext';

type TableLayoutWrapperProps = {
    children: ReactNode;
    toolbar?: ReactNode;
    initialPage?: number;
    initialRowsPerPage?: number;
    paginationVariant?: PaginationVariant;
};

export function TableLayoutWrapper({
    children,
    toolbar,
    initialPage,
    initialRowsPerPage,
    paginationVariant,
}: TableLayoutWrapperProps) {
    return (
        <TablePageProvider
            initialPage={initialPage}
            initialRowsPerPage={initialRowsPerPage}
            paginationVariant={paginationVariant}
        >
            {toolbar}
            {children}
        </TablePageProvider>
    );
}
