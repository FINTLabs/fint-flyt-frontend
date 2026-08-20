import { ActionMenu, Box, Table, VStack } from '@navikt/ds-react';
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
import { IValueConverting } from '../types/ValueConverting';
import ValueConvertingPanel from './ValueConvertingPanel';

type Props = {
    onValueConvertingSelected: (id: number) => void;
    setNewValueConverting: React.Dispatch<React.SetStateAction<boolean>>;
};

const ValueConvertingTable: React.FunctionComponent<Props> = (props: Props) => {
    const ValueConvertingRepository = useValueConvertingRepository();
    const { getAllSourceApplications } = useContext(AuthorizationContext);

    const history = useNavigate();
    const onError = useTablePageError();
    const { page, rowsPerPage, setPaginationMeta } = useTablePagination();
    const { t } = useTranslation('translations', { keyPrefix: 'pages.valueConverting' });

    const [sourceApplications, setSourceApplications] = useState<ISourceApplication[]>([]);
    const [rows, setRows] = useState<IValueConverting[] | undefined>(undefined);

    let sortData = rows ?? [];
    sortData = sortData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    useEffect(() => {
        setPaginationMeta({
            totalPages: rows ? Math.ceil(rows.length / rowsPerPage) : undefined,
            totalElements: rows?.length,
            hidePagination: !rows || rows.length <= rowsPerPage,
        });
    }, [rows?.length, rowsPerPage, setPaginationMeta]);

    useEffect(() => {
        Promise.all([
            ValueConvertingRepository.getValueConvertings(0, 100, 'id', 'DESC', false),
            getAllSourceApplications(false),
        ])
            .then(([valueConvertingResponse, sourceApp]) => {
                onError(undefined);
                setSourceApplications(sourceApp);
                const valueConvertingPage = valueConvertingResponse.data;
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
    }, []);

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
                {sortData?.map((value, i) => {
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
