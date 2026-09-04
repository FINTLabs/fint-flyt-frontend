import { Alert, VStack } from '@navikt/ds-react';
import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

import { IAlertMessage } from '../../types/TableTypes';
import LoadMorePagination from './pagination/LoadMorePagination';
import TablePagination from './pagination/TablePagination';

export type PaginationVariant = 'pages' | 'load-more';

type SetTablePageError = (error: IAlertMessage | undefined) => void;

export type TablePaginationMeta = {
    /** Total number of pages from the API response. */
    totalPages?: number;
    /** Total number of items from the API response. */
    totalElements?: number;
    /** Whether to hide the pagination component. */
    hidePagination?: boolean;
    /** Callback function to fetch more items using the 'load more' pagination variant. */
    onFetchMore?: (size: number) => void;
};

type TablePaginationState = {
    /** Current page. */
    page: number;
    /** Set the current page. */
    setPage: (page: number) => void;
    /** Number of rows shown per page. */
    rowsPerPage: number;
    /** Set the number of rows shown per page. */
    setRowsPerPage: (rowsPerPage: number) => void;
    /** Total number of pages from the API response. */
    totalPages?: number;
    /** Total number of items from the API response. */
    totalElements?: number;
    /** Whether to hide the pagination component. */
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
    initialRowsPerPage?: number;
    paginationVariant?: PaginationVariant;
};

export function TablePageProvider({
    children,
    initialPage = 1,
    initialRowsPerPage = 10,
    paginationVariant = 'pages',
}: TablePageProviderProps) {
    const [error, setError] = useState<IAlertMessage | undefined>(undefined);
    const [page, setPage] = useState(initialPage);
    const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);
    const [paginationMeta, setPaginationMeta] = useState<TablePaginationMeta>({});

    const value = useMemo(
        () => ({
            setError,
            page,
            setPage,
            rowsPerPage,
            setRowsPerPage,
            totalPages: paginationMeta.totalPages,
            totalElements: paginationMeta.totalElements,
            hidePagination: paginationMeta.hidePagination,
            setPaginationMeta,
        }),
        [page, rowsPerPage, paginationMeta]
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
                        rowsPerPage={rowsPerPage}
                        setRowsPerPage={setRowsPerPage}
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
        rowsPerPage,
        setRowsPerPage,
        totalPages,
        totalElements,
        hidePagination,
        setPaginationMeta,
    } = useTablePageContext();
    return {
        page,
        setPage,
        rowsPerPage,
        setRowsPerPage,
        totalPages,
        totalElements,
        hidePagination,
        setPaginationMeta,
    };
}
