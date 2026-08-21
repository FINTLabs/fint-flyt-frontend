import { HStack, Pagination } from '@navikt/ds-react';
import * as React from 'react';
import { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';

import { IPaginationSelect } from '../../types/TableTypes';
import { CustomSelect } from './CustomSelect';

type Props = {
    hide?: boolean;
    totalPages?: number;
    totalElements?: number;
    page: number;
    setPage: (value: number) => void;
    rowsPerPage: number;
    setRowsPerPage: (value: number) => void;
};

// TODO: disable restry if no more to fetch
const TablePagination: FunctionComponent<Props> = ({
    hide,
    totalPages = 1,
    totalElements,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
}) => {
    const { t } = useTranslation('translations', { keyPrefix: 'pages.integrations' });

    const selectOptions: IPaginationSelect[] = [
        { value: 0, label: t('numberPerPage'), disabled: true },
        { value: 10, label: '10' },
        { value: 25, label: '25' },
        { value: 50, label: '50' },
        { value: 100, label: '100' },
    ];
    return (
        <HStack justify={'center'} style={{ marginTop: '16px' }}>
            {!hide && totalElements !== undefined && (
                <CustomSelect
                    options={selectOptions}
                    onChange={(value) => {
                        setPage(1);
                        setRowsPerPage(Number(value));
                    }}
                    label={t('numberPerPage')}
                    hideLabel={true}
                    value={rowsPerPage}
                />
            )}
            {!hide && totalElements !== undefined && totalElements > rowsPerPage && (
                <Pagination
                    page={page}
                    onPageChange={setPage}
                    count={totalPages ?? 1}
                    size="small"
                />
            )}
        </HStack>
    );
};

export default TablePagination;
