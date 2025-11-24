import React, { ReactElement, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { IValueConverting } from '../types/ValueConverting';
import {
    getDestinationDisplayName,
    getSourceApplicationDisplayNameById,
} from '../../../util/TableUtil';
import {
    Alert,
    Box,
    Button,
    Dropdown,
    HStack,
    Loader,
    Pagination,
    Table,
    VStack,
} from '@navikt/ds-react';
import { MenuElipsisVerticalCircleIcon } from '@navikt/aksel-icons';
import ValueConvertingPanel from './ValueConvertingPanel';
import { IAlertMessage } from '../../../components/types/TableTypes';
import useValueConvertingRepository from '../../../api/useValueConvertingRepository';

type Props = {
    onValueConvertingSelected: (id: number) => void;
    setNewValueConverting: React.Dispatch<React.SetStateAction<boolean>>;
};

const ValueConvertingTable: React.FunctionComponent<Props> = (props: Props) => {
    const ValueConvertingRepository = useValueConvertingRepository();
    const history = useNavigate();
    const { t } = useTranslation('translations', { keyPrefix: 'pages.valueConverting' });
    const [rows, setRows] = useState<IValueConverting[] | undefined>(undefined);
    const [error, setError] = useState<IAlertMessage | undefined>(undefined);
    const [page, setPage] = useState(1);
    const rowsPerPage = 8;

    let sortData = rows ?? [];
    sortData = sortData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    useEffect(() => {
        // TODO: fix this
        ValueConvertingRepository.getValueConvertings(0, 100, 'id', 'DESC', false)
            .then((response) => {
                setError(undefined);
                const data = response.data;
                if (data.content) {
                    setRows(data.content);
                } else {
                    setRows([]);
                }
            })
            .catch((e) => {
                console.log(e);
                setError({ message: t('errorMessage') });
                setRows([]);
            });
    }, []);

    async function handleNewOrEditConvertingClick(id: number) {
        props.onValueConvertingSelected(id);
    }

    function actionMenu(value: IValueConverting): ReactElement {
        return (
            <Dropdown>
                <Button
                    as={Dropdown.Toggle}
                    variant="tertiary-neutral"
                    icon={<MenuElipsisVerticalCircleIcon aria-hidden />}
                />
                <Dropdown.Menu>
                    <Dropdown.Menu.GroupedList>
                        <Dropdown.Menu.GroupedList.Item
                            onClick={() => {
                                handleNewOrEditConvertingClick(value.id).then(() =>
                                    history('/valueconverting')
                                );
                            }}
                        >
                            {t('button.basedOn')}
                        </Dropdown.Menu.GroupedList.Item>
                    </Dropdown.Menu.GroupedList>
                </Dropdown.Menu>
            </Dropdown>
        );
    }

    return (
        <Box
            background={'surface-default'}
            padding="6"
            borderRadius={'large'}
            borderWidth="2"
            borderColor={'border-subtle'}
        >
            {error && (
                <Alert style={{ maxWidth: '100%' }} variant="error">
                    {error.message}
                </Alert>
            )}
            {rows ? (
                <VStack gap={'6'}>
                    <Box background={'surface-default'} style={{ minHeight: '490px' }}>
                        <Table id={'value-convertings-table'} size={'small'}>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell scope="col">
                                        {t('column.show')}
                                    </Table.HeaderCell>
                                    <Table.HeaderCell scope="col">
                                        {t('column.id')}
                                    </Table.HeaderCell>
                                    <Table.HeaderCell scope="col">
                                        {t('column.displayName')}
                                    </Table.HeaderCell>
                                    <Table.HeaderCell scope="col">
                                        {t('column.fromType')}
                                    </Table.HeaderCell>
                                    <Table.HeaderCell scope="col">
                                        {t('column.toType')}
                                    </Table.HeaderCell>
                                    <Table.HeaderCell scope="col">
                                        {t('column.fromApplication')}
                                    </Table.HeaderCell>
                                    <Table.HeaderCell scope="col">
                                        {t('column.toApplication')}
                                    </Table.HeaderCell>
                                    <Table.HeaderCell scope="col">
                                        {t('column.actions')}
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {sortData?.map((value, i) => {
                                    return (
                                        <Table.ExpandableRow
                                            expandOnRowClick
                                            id={'table-row-' + i}
                                            key={i}
                                            content={
                                                <ValueConvertingPanel
                                                    id={i}
                                                    existingValueConverting={value}
                                                />
                                            }
                                        >
                                            <Table.DataCell scope="row">{value.id}</Table.DataCell>
                                            <Table.DataCell scope="row">
                                                {value.displayName}
                                            </Table.DataCell>
                                            <Table.DataCell scope="row">
                                                {value.fromTypeId}
                                            </Table.DataCell>
                                            <Table.DataCell scope="row">
                                                {value.toTypeId}
                                            </Table.DataCell>
                                            <Table.DataCell scope="row">
                                                {getSourceApplicationDisplayNameById(
                                                    String(value.fromApplicationId)
                                                )}
                                            </Table.DataCell>
                                            <Table.DataCell scope="row">
                                                {getDestinationDisplayName(value.toApplicationId)}
                                            </Table.DataCell>
                                            <Table.DataCell scope="row">
                                                {actionMenu(value)}
                                            </Table.DataCell>
                                        </Table.ExpandableRow>
                                    );
                                })}
                            </Table.Body>
                        </Table>
                    </Box>
                    <HStack justify={'center'}>
                        {rows && rows.length > rowsPerPage && (
                            <Pagination
                                page={page}
                                onPageChange={setPage}
                                count={Math.ceil(rows.length / rowsPerPage)}
                                size="small"
                            />
                        )}
                    </HStack>
                </VStack>
            ) : (
                <Loader size={'large'} />
            )}
        </Box>
    );
};

export default ValueConvertingTable;
