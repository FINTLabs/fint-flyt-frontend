import { Alert, VStack } from '@navikt/ds-react';
import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

import { IAlertMessage } from '../types/TableTypes';
import LoadMorePagination from './pagination/LoadMorePagination';
import TablePagination from './pagination/TablePagination';

export type PaginationVariant = 'pages' | 'load-more';

type SetTablePageError = (error: IAlertMessage | undefined) => void;

export type TablePaginationMeta = {
    totalPages?: number;
    totalElements?: number;
    hidePagination?: boolean;
    onFetchMore?: (size: number) => void;
};

type TablePaginationState = {
    page: number;
    setPage: (page: number) => void;
    rowCount: number;
    setRowCount: (rowCount: number) => void;
    totalPages?: number;
    totalElements?: number;
    hidePagination?: boolean;
    setPaginationMeta: (meta: TablePaginationMeta) => void;
};

type TablePageContextValue = {
    setError: SetTablePageError;
} & TablePaginationState;

const TablePageContext = createContext<TablePageContextValue | null>(null);

type TablePageProviderProps = {
    children: ReactNode;
    initialPage?: number;
    initialRowCount?: number;
    paginationVariant?: PaginationVariant;
};

export function TablePageProvider({
    children,
    initialPage = 1,
    initialRowCount = 10,
    paginationVariant = 'pages',
}: TablePageProviderProps) {
    const [error, setError] = useState<IAlertMessage | undefined>(undefined);
    const [page, setPage] = useState(initialPage);
    const [rowCount, setRowCount] = useState(initialRowCount);
    const [paginationMeta, setPaginationMeta] = useState<TablePaginationMeta>({});

    const value = useMemo(
        () => ({
            setError,
            page,
            setPage,
            rowCount,
            setRowCount,
            totalPages: paginationMeta.totalPages,
            totalElements: paginationMeta.totalElements,
            hidePagination: paginationMeta.hidePagination,
            setPaginationMeta,
        }),
        [page, rowCount, paginationMeta]
    );

    return (
        <TablePageContext.Provider value={value}>
            <VStack gap="4">
                {error && <Alert variant="error">{error.message}</Alert>}
                {children}
                {paginationVariant === 'pages' && (
                    <TablePagination
                        hide={paginationMeta.hidePagination}
                        totalPages={paginationMeta.totalPages}
                        totalElements={paginationMeta.totalElements}
                        page={page}
                        setPage={setPage}
                        rowCount={rowCount}
                        setRowCount={setRowCount}
                    />
                )}
                {paginationVariant === 'load-more' && paginationMeta.onFetchMore && (
                    <LoadMorePagination
                        hide={paginationMeta.hidePagination}
                        onFetchMore={paginationMeta.onFetchMore}
                    />
                )}
            </VStack>
        </TablePageContext.Provider>
    );
}

function useTablePageContext(): TablePageContextValue {
    const context = useContext(TablePageContext);
    if (!context) {
        throw new Error('Table page hooks must be used within a TablePageProvider');
    }
    return context;
}

export function useTablePageError(): SetTablePageError {
    return useTablePageContext().setError;
}

export function useTablePagination(): TablePaginationState {
    const {
        page,
        setPage,
        rowCount,
        setRowCount,
        totalPages,
        totalElements,
        hidePagination,
        setPaginationMeta,
    } = useTablePageContext();
    return {
        page,
        setPage,
        rowCount,
        setRowCount,
        totalPages,
        totalElements,
        hidePagination,
        setPaginationMeta,
    };
}
