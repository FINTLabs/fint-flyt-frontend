import { ActionMenu, SortState, Table } from '@navikt/ds-react';
import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import useValueConvertingRepository from '../../../shared/api/useValueConvertingRepository';
import { FilesIcon } from '../../../shared/components/icons';
import TableLoader from '../../../shared/components/table/TableLoader';
import {
    useTablePageError,
    useTablePagination,
} from '../../../shared/components/table/TablePageContext';
import { TableRowActionsMenu } from '../../../shared/components/table/TableRowActionsMenu';
import { Page } from '../../../shared/components/types/TableTypes';
import { AuthorizationContext } from '../../../shared/context/AuthorizationContext';
import { getDestinationDisplayName, toApiSortDirection } from '../../../shared/util/TableUtil';
import { ISourceApplication } from '../../configuration/types/SourceApplication';
import { IValueConverting } from '../types/ValueConverting';
import ValueConvertingPanel from './ValueConvertingPanel';

type Props = {
    onValueConvertingSelected: (id: number) => void;
};

const ValueConvertingTable: React.FunctionComponent<Props> = (props: Props) => {
    const ValueConvertingRepository = useValueConvertingRepository();
    const { getAllSourceApplications } = useContext(AuthorizationContext);

    const history = useNavigate();
    const onError = useTablePageError();
    const { page, rowsPerPage, setPaginationMeta } = useTablePagination();
    const { t } = useTranslation('translations', { keyPrefix: 'pages.valueConverting' });

    const [sourceApplications, setSourceApplications] = useState<ISourceApplication[]>([]);

    const [valueConvertings, setValueConvertings] = useState<Page<IValueConverting> | undefined>();

    const [rows, setRows] = useState<IValueConverting[] | undefined>(undefined);
    const [sort, setSort] = useState<SortState | undefined>({ orderBy: 'id', direction: 'ascending'});

    useEffect(() => {
        setPaginationMeta({
            totalPages: valueConvertings?.totalPages,
            totalElements: valueConvertings?.totalElements,
            // hidePagination: !rows || rows.length <= rowsPerPage,
        });
    }, [valueConvertings?.totalPages, setPaginationMeta, valueConvertings?.totalElements]);

    useEffect(() => {
        Promise.all([
            ValueConvertingRepository.getValueConvertings({
                page: page - 1,
                size: rowsPerPage,
                sortProperty: sort?.orderBy,
                sortDirection: toApiSortDirection(sort?.direction),
                excludeConvertingMap: false,
            }),
            getAllSourceApplications(false),
        ])
            .then(([valueConvertingResponse, sourceApp]) => {
                onError(undefined);
                setSourceApplications(sourceApp);
                const valueConvertingPage = valueConvertingResponse.data;
                setValueConvertings(valueConvertingPage);
                if (valueConvertingPage.content) {
                    setRows(valueConvertingPage.content);
                } else {
                    setRows([]);
                }
            })
            .catch((e) => {
                console.log(e);
                onError({ message: t('errorMessage') });
                setRows([]);
            });
    }, [page, rowsPerPage, sort]);

    async function handleNewOrEditConvertingClick(id: number) {
        props.onValueConvertingSelected(id);
    }

    function actionMenu(value: IValueConverting): ReactElement {
        return (
            <TableRowActionsMenu id={'value-convertings'}>
                <ActionMenu.Item
                    onClick={() => {
                        handleNewOrEditConvertingClick(value.id).then(() =>
                            history('/valueconverting')
                        );
                    }}
                    icon={<FilesIcon />}
                >
                    {t('button.basedOn')}
                </ActionMenu.Item>
            </TableRowActionsMenu>
        );
    }

    function handleSort(sortKey: string) {
        setSort((prevSort: SortState | undefined) => {
            return prevSort && sortKey === prevSort.orderBy && prevSort.direction === 'descending'
                ? undefined
                : {
                      orderBy: sortKey,
                      direction: prevSort?.direction === 'ascending' ? 'descending' : 'ascending',
                  };
        });
    }

    return (
        <Table id={'value-convertings-table'} size={'small'} sort={sort} onSortChange={handleSort}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell scope="col"></Table.HeaderCell>
                    <Table.ColumnHeader scope="col" sortKey="id" sortable>{t('column.id')}</Table.ColumnHeader>
                    <Table.ColumnHeader scope="col" sortKey="displayName" sortable>{t('column.displayName')}</Table.ColumnHeader>
                    <Table.ColumnHeader scope="col" sortKey="fromTypeId" sortable>{t('column.fromType')}</Table.ColumnHeader>
                    <Table.ColumnHeader scope="col" sortKey="toTypeId" sortable>{t('column.toType')}</Table.ColumnHeader>
                    <Table.ColumnHeader scope="col" sortKey="fromApplicationId" sortable>{t('column.fromApplication')}</Table.ColumnHeader>
                    <Table.ColumnHeader scope="col">{t('column.toApplication')}</Table.ColumnHeader>
                    <Table.HeaderCell scope="col" align={'right'}></Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {!rows && <TableLoader columnLength={8} tableSize={'small'} />}
                {rows?.map((value, i) => {
                    return (
                        <Table.ExpandableRow
                            expandOnRowClick
                            id={'table-row-' + i}
                            key={i}
                            content={
                                <ValueConvertingPanel id={i} existingValueConverting={value} />
                            }
                        >
                            <Table.DataCell scope="row">{value.id}</Table.DataCell>
                            <Table.DataCell scope="row">{value.displayName}</Table.DataCell>
                            <Table.DataCell scope="row">{value.fromTypeId}</Table.DataCell>
                            <Table.DataCell scope="row">{value.toTypeId}</Table.DataCell>
                            <Table.DataCell scope="row">
                                {
                                    sourceApplications.find(
                                        (sourceApp) => sourceApp.id === value.fromApplicationId
                                    )?.displayName
                                }
                            </Table.DataCell>
                            <Table.DataCell scope="row">
                                {getDestinationDisplayName(value.toApplicationId)}
                            </Table.DataCell>
                            <Table.DataCell scope="row" align={'right'}>
                                {actionMenu(value)}
                            </Table.DataCell>
                        </Table.ExpandableRow>
                    );
                })}
            </Table.Body>
        </Table>
    );
};

export default ValueConvertingTable;
