import { ActionMenu, Alert, HStack, SortState, Table } from '@navikt/ds-react';
import React, { ReactElement, useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import useValueConvertingRepository from '../../../shared/api/useValueConvertingRepository';
import { ArrowRightIcon, FilesIcon } from '../../../shared/components/icons';
import TableLoader from '../../../shared/components/table/TableLoader';
import {
    useTablePageError,
    useTablePagination,
} from '../../../shared/components/table/TablePageContext';
import { TableRowActionsMenu } from '../../../shared/components/table/TableRowActionsMenu';
import { Page } from '../../../shared/types/TableTypes';
import { AuthorizationContext } from '../../../shared/context/AuthorizationContext';
import { getDestinationDisplayName, toApiSortDirection } from '../../../shared/util/TableUtil';
import { formatTimestampToReadableText } from '../../../shared/util/TimeAndDateUtils';
import { ISourceApplication } from '../../configuration/types/SourceApplication';
import { useValueConvertingFilters } from '../tableToolbar/FilterContext';
import { toApiDateTime } from '../tableToolbar/TimeFilter';
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
    const { t, i18n } = useTranslation('translations', { keyPrefix: 'pages.valueConverting' });
    const { filters, refreshKey } = useValueConvertingFilters();

    const [sourceApplications, setSourceApplications] = useState<ISourceApplication[]>([]);
    const [valueConvertings, setValueConvertings] = useState<Page<IValueConverting> | undefined>();
    const [sort, setSort] = useState<SortState | undefined>({
        orderBy: 'id',
        direction: 'descending',
    });

    const sourceAppDisplayNameById = useMemo(
        () => new Map(sourceApplications.map((app) => [app.id, app.displayName])),
        [sourceApplications]
    );

    useEffect(() => {
        setPaginationMeta({
            totalPages: valueConvertings?.totalPages,
            totalElements: valueConvertings?.totalElements,
            hidePagination: !valueConvertings,
        });
    }, [valueConvertings, setPaginationMeta]);

    useEffect(() => {
        getAllSourceApplications(false).then(setSourceApplications);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        onError(undefined);
        setValueConvertings(undefined);

        const sourceApplicationIds = filters.sourceApplicationIds
            .map(Number)
            .filter((id: number) => Number.isFinite(id));

        ValueConvertingRepository.getValueConvertings({
            page: page - 1,
            size: rowsPerPage,
            sortProperty: filters.sort.orderBy ?? sort?.orderBy,
            sortDirection: filters.sort.direction ?? toApiSortDirection(sort?.direction),
            excludeConvertingMap: false,
            sourceApplicationIds:
                sourceApplicationIds.length > 0 ? sourceApplicationIds : undefined,
            createdFrom: filters.createdFrom ? toApiDateTime(filters.createdFrom) : undefined,
            createdTo: filters.createdTo ? toApiDateTime(filters.createdTo) : undefined,
            modifiedFrom: filters.modifiedFrom ? toApiDateTime(filters.modifiedFrom) : undefined,
            modifiedTo: filters.modifiedTo ? toApiDateTime(filters.modifiedTo) : undefined,
            fromTypeId: filters.fromTypeId ? filters.fromTypeId : undefined,
            toTypeId: filters.toTypeId ? filters.toTypeId : undefined,
            displayName: filters.displayName ? filters.displayName : undefined,
        })
            .then((valueConvertingResponse) => {
                onError(undefined);
                setValueConvertings(valueConvertingResponse.data ?? { content: [] });
                setPaginationMeta({
                    totalPages: valueConvertingResponse.data.totalPages ?? 0,
                    totalElements: valueConvertingResponse.data.totalElements ?? 0,
                    hidePagination: false,
                });
            })
            .catch(() => {
                onError({ message: t('errorMessage') });
                setValueConvertings(undefined);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refreshKey, page, rowsPerPage, sort?.orderBy, sort?.direction]);

    async function handleNewOrEditConvertingClick(id: number) {
        props.onValueConvertingSelected(id);
    }

    function actionMenu(value: IValueConverting): ReactElement {
        return (
            <TableRowActionsMenu id={`value-converting-${value.id}`}>
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

    return (
        <>
            <Table
                id={'value-convertings-table'}
                size={'small'}
                sort={sort}
                // onSortChange={(sortKey) => handleSortByColumn(sortKey, sort, setSort)}
            >
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope="col"></Table.HeaderCell>
                        <Table.ColumnHeader scope="col">{t('column.id')}</Table.ColumnHeader>
                        <Table.ColumnHeader scope="col">
                            {t('column.displayName')}
                        </Table.ColumnHeader>
                        <Table.ColumnHeader scope="col">
                            {t('column.fromApplication')}
                        </Table.ColumnHeader>

                        <Table.ColumnHeader scope="col">{t('column.type')}</Table.ColumnHeader>
                        {(filters.sort.orderBy === 'createdAt' ||
                            filters.createdFrom !== null ||
                            filters.createdTo !== null) && (
                            <Table.ColumnHeader scope="col" align="center">
                                {t('column.createdAt')}
                            </Table.ColumnHeader>
                        )}
                        {(filters.sort.orderBy === 'modifiedAt' ||
                            filters.modifiedFrom !== null ||
                            filters.modifiedTo !== null) && (
                            <Table.ColumnHeader scope="col" align="center">
                                {t('column.modifiedAt')}
                            </Table.ColumnHeader>
                        )}
                        {(filters.sort.orderBy === 'toApplicationId' || filters.toApplicationId) && (
                            <Table.ColumnHeader scope="col">
                                {t('column.toApplication')}
                            </Table.ColumnHeader>
                        )}
                        <Table.HeaderCell scope="col" align="right"></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {!valueConvertings && <TableLoader columnLength={10} tableSize={'small'} />}
                    {valueConvertings?.content?.map((value, i) => {
                        return (
                            <Table.ExpandableRow
                                expandOnRowClick
                                id={'table-row-' + i}
                                key={value.id}
                                content={
                                    <ValueConvertingPanel
                                        id={i}
                                        existingValueConverting={value}
                                        fromApplicationDisplayName={
                                            sourceAppDisplayNameById.get(value.fromApplicationId) ??
                                            value.fromApplicationId.toString()
                                        }
                                    />
                                }
                            >
                                <Table.DataCell scope="row">{value.id}</Table.DataCell>
                                <Table.DataCell scope="row">{value.displayName}</Table.DataCell>

                                <Table.DataCell scope="row">
                                    {sourceAppDisplayNameById.get(value.fromApplicationId) ??
                                        value.fromApplicationId}
                                </Table.DataCell>

                                <Table.DataCell scope="row">
                                    <HStack align="center" gap="2">

                                    {value.fromTypeId} <ArrowRightIcon /> {value.toTypeId}{' '}
                                    </HStack>
                                </Table.DataCell>

                                {(filters.sort.orderBy === 'createdAt' ||
                                    filters.createdFrom !== null ||
                                    filters.createdTo !== null) && (
                                    <Table.DataCell scope="row" align="center">
                                        {value.createdAt
                                            ? formatTimestampToReadableText(
                                                  value.createdAt,
                                                  i18n.language,
                                                  false
                                              )
                                            : ''}
                                    </Table.DataCell>
                                )}
                                {(filters.sort.orderBy === 'modifiedAt' ||
                                    filters.modifiedFrom !== null ||
                                    filters.modifiedTo !== null) && (
                                    <Table.DataCell scope="row" align="center">
                                        {value.lastModifiedAt
                                            ? formatTimestampToReadableText(
                                                  value.lastModifiedAt,
                                                  i18n.language,
                                                  false
                                              )
                                            : ''}
                                    </Table.DataCell>
                                )}

                                {(filters.sort.orderBy === 'toApplicationId' || filters.toApplicationId) && (
                                    <Table.DataCell scope="row">
                                        {getDestinationDisplayName(value.toApplicationId)}
                                    </Table.DataCell>
                                )}
                                <Table.DataCell scope="row" align={'right'}>
                                    {actionMenu(value)}
                                </Table.DataCell>
                            </Table.ExpandableRow>
                        );
                    })}
                </Table.Body>
            </Table>
            {valueConvertings && valueConvertings.content.length === 0 && (
                <Alert variant="info">{t('column.noValueConvertings')}</Alert>
            )}
        </>
    );
};

export default ValueConvertingTable;
