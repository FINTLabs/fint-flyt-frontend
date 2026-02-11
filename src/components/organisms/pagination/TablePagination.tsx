import { FunctionComponent, useState } from 'react';
import { HStack, Pagination } from '@navikt/ds-react';
import { CustomSelect } from './CustomSelect';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { IPaginationSelect } from '../../types/TableTypes';

type Props = {
    hide?: boolean;
    totalPages?: number;
    totalElements?: number;
    page: number;
    setPage: (value: number) => void;
    rowCount: number;
    setRowCount: (value: number) => void;
};

// TODO: disable restry if no more to fetch
// TODO: new translation object
const TablePagination: FunctionComponent<Props> = ({
    hide,
    totalPages = 1,
    totalElements,
    page,
    setPage,
    rowCount,
    setRowCount,
}) => {
    const { t } = useTranslation('translations', { keyPrefix: 'pages.integrations' });

    const selectOptions: IPaginationSelect[] = [
        { value: 0, label: t('numberPerPage'), disabled: true },
        {
            value: 10,
            label: '10',
        },
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
                        setRowCount(Number(value));
                    }}
                    label={t('numberPerPage')}
                    hideLabel={true}
                    default={rowCount}
                />
            )}
            {!hide && totalElements !== undefined && totalElements > rowCount && (
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
