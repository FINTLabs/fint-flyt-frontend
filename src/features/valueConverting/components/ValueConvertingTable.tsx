import { ActionMenu, Table } from '@navikt/ds-react';
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
import { AuthorizationContext } from '../../../shared/context/AuthorizationContext';
import { getDestinationDisplayName } from '../../../shared/util/TableUtil';
import { ISourceApplication } from '../../configuration/types/SourceApplication';
import { useValueConvertingFilters } from '../filter/FilterContext';
import { toApiDateTime } from '../filter/TimeFilter';
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
    const { filters, refreshKey } = useValueConvertingFilters();
    const { t } = useTranslation('translations', { keyPrefix: 'pages.valueConverting' });

    const [sourceApplications, setSourceApplications] = useState<ISourceApplication[]>([]);
    const [rows, setRows] = useState<IValueConverting[] | undefined>(undefined);

    useEffect(() => {
        const sourceApplicationIds = filters.sourceApplicationIds
            .map(Number)
            .filter((id) => Number.isFinite(id));

        setRows(undefined);

        Promise.all([
            ValueConvertingRepository.getValueConvertings({
                page: page - 1,
                size: rowsPerPage,
                sortProperty: 'id',
                sortDirection: 'DESC',
                excludeConvertingMap: false,
                sourceApplicationIds:
                    sourceApplicationIds.length > 0 ? sourceApplicationIds : undefined,
                createdFrom: filters.createdFrom
                    ? toApiDateTime(filters.createdFrom)
                    : undefined,
                createdTo: filters.createdTo ? toApiDateTime(filters.createdTo) : undefined,
                modifiedFrom: filters.modifiedFrom
                    ? toApiDateTime(filters.modifiedFrom)
                    : undefined,
                modifiedTo: filters.modifiedTo ? toApiDateTime(filters.modifiedTo) : undefined,
            }),
            getAllSourceApplications(false),
        ])
            .then(([valueConvertingResponse, sourceApp]) => {
                onError(undefined);
                setSourceApplications(sourceApp);
                const valueConvertingPage = valueConvertingResponse.data;
                const content = valueConvertingPage.content ?? [];
                setRows(content);
                setPaginationMeta({
                    totalPages: valueConvertingPage.totalPages ?? 0,
                    totalElements: valueConvertingPage.totalElements ?? 0,
                    hidePagination: false,
                });
            })
            .catch((e) => {
                console.log(e);
                onError({ message: t('errorMessage') });
                setRows([]);
                setPaginationMeta({ hidePagination: true });
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refreshKey, page, rowsPerPage]);

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

    return (
        <Table id={'value-convertings-table'} size={'small'}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell scope="col"></Table.HeaderCell>
                    <Table.HeaderCell scope="col">{t('column.id')}</Table.HeaderCell>
                    <Table.HeaderCell scope="col">{t('column.displayName')}</Table.HeaderCell>
                    <Table.HeaderCell scope="col">{t('column.fromType')}</Table.HeaderCell>
                    <Table.HeaderCell scope="col">{t('column.toType')}</Table.HeaderCell>
                    <Table.HeaderCell scope="col">{t('column.fromApplication')}</Table.HeaderCell>
                    <Table.HeaderCell scope="col">{t('column.toApplication')}</Table.HeaderCell>
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
