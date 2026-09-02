import { ActionMenu, Alert, SortState, Table } from '@navikt/ds-react';
import React, { ReactElement, useContext, useEffect, useMemo, useState } from 'react';
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
import {
    getDestinationDisplayName,
    handleSortByColumn,
    toApiSortDirection,
} from '../../../shared/util/TableUtil';
import { formatTimestampToReadableText } from '../../../shared/util/TimeAndDateUtils';
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
    const { t, i18n } = useTranslation('translations', { keyPrefix: 'pages.valueConverting' });

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

        ValueConvertingRepository.getValueConvertings({
            page: page - 1,
            size: rowsPerPage,
            sortProperty: sort?.orderBy,
            sortDirection: toApiSortDirection(sort?.direction),
            excludeConvertingMap: false,
        })
            .then((valueConvertingResponse) => {
                console.log('valueConvertingResponse', valueConvertingResponse.data);
                setValueConvertings(valueConvertingResponse.data ?? { content: [] });
            })
            .catch(() => {
                onError({ message: t('errorMessage') });
                setValueConvertings(undefined);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, rowsPerPage, sort?.orderBy, sort?.direction]);

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
                onSortChange={(sortKey) => handleSortByColumn(sortKey, sort, setSort)}
            >
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope="col"></Table.HeaderCell>
                        <Table.ColumnHeader scope="col" sortKey="id" sortable>
                            {t('column.id')}
                        </Table.ColumnHeader>
                        <Table.ColumnHeader scope="col" sortKey="displayName" sortable>
                            {t('column.displayName')}
                        </Table.ColumnHeader>
                        <Table.ColumnHeader scope="col" sortKey="fromTypeId" sortable>
                            {t('column.fromType')}
                        </Table.ColumnHeader>
                        <Table.ColumnHeader scope="col" sortKey="toTypeId" sortable>
                            {t('column.toType')}
                        </Table.ColumnHeader>
                        <Table.ColumnHeader scope="col" sortKey="fromApplicationId" sortable>
                            {t('column.fromApplication')}
                        </Table.ColumnHeader>
                        <Table.ColumnHeader scope="col">
                            {t('column.toApplication')}
                        </Table.ColumnHeader>
                        <Table.ColumnHeader scope="col" sortKey="createdAt" sortable align="center">
                            {t('column.createdAt')}
                        </Table.ColumnHeader>
                        <Table.ColumnHeader
                            scope="col"
                            sortKey="modifiedAt"
                            sortable
                            align="center"
                        >
                            {t('column.modifiedAt')}
                        </Table.ColumnHeader>

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
                                    <ValueConvertingPanel id={i} existingValueConverting={value} />
                                }
                            >
                                <Table.DataCell scope="row">{value.id}</Table.DataCell>
                                <Table.DataCell scope="row">{value.displayName}</Table.DataCell>
                                <Table.DataCell scope="row">{value.fromTypeId}</Table.DataCell>
                                <Table.DataCell scope="row">{value.toTypeId}</Table.DataCell>
                                <Table.DataCell scope="row">
                                    {sourceAppDisplayNameById.get(value.fromApplicationId) ??
                                        value.fromApplicationId}
                                </Table.DataCell>
                                <Table.DataCell scope="row">
                                    {getDestinationDisplayName(value.toApplicationId)}
                                </Table.DataCell>
                                <Table.DataCell scope="row" align="center">
                                    {value.createdAt
                                        ? formatTimestampToReadableText(
                                              value.createdAt,
                                              i18n.language,
                                              false
                                          )
                                        : ''}
                                </Table.DataCell>
                                <Table.DataCell scope="row" align="center">
                                    {value.lastModifiedAt
                                        ? formatTimestampToReadableText(
                                              value.lastModifiedAt,
                                              i18n.language,
                                              false
                                          )
                                        : ''}
                                </Table.DataCell>
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
