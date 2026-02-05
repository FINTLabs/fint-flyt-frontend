import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { MenuElipsisVerticalCircleIcon } from '@navikt/aksel-icons';
import { IValueConverting } from '../types/ValueConverting';
import {
    getDestinationDisplayName,
} from '../../../util/TableUtil';
import {
    Alert,
    Box,
    Button,
    Dropdown,
    HStack,
    Pagination,
    Table,
    VStack,
} from '@navikt/ds-react';
import ValueConvertingPanel from './ValueConvertingPanel';
import { IAlertMessage } from '../../../components/types/TableTypes';
import useValueConvertingRepository from '../../../api/useValueConvertingRepository';
import TableLoader from '../../../components/molecules/TableLoader';
import { ISourceApplication } from '../../configuration/types/SourceApplication';
import { AuthorizationContext } from '../../../context/AuthorizationContext';

type Props = {
    onValueConvertingSelected: (id: number) => void;
    setNewValueConverting: React.Dispatch<React.SetStateAction<boolean>>;
};

const ValueConvertingTable: React.FunctionComponent<Props> = (props: Props) => {
    const ValueConvertingRepository = useValueConvertingRepository();
    const { getAllSourceApplications } = useContext(AuthorizationContext);
    const history = useNavigate();
    const { t } = useTranslation('translations', { keyPrefix: 'pages.valueConverting' });
    const [sourceApplications, setSourceApplications] = useState<ISourceApplication[]>([]);
    const [rows, setRows] = useState<IValueConverting[] | undefined>(undefined);
    const [error, setError] = useState<IAlertMessage | undefined>(undefined);
    const [page, setPage] = useState(1);
    const rowsPerPage = 8;

    let sortData = rows ?? [];
    sortData = sortData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    useEffect(() => {
        Promise.all([
            ValueConvertingRepository.getValueConvertings(0, 100, 'id', 'DESC', false),
            getAllSourceApplications(false),
        ])
            .then(([valueConvertingResponse, sourceApp]) => {
                setError(undefined);
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
        <Box>
            {error && (
                <Alert style={{ maxWidth: '100%' }} variant="error">
                    {error.message}
                </Alert>
            )}

            <VStack gap={'6'}>
                <Box background={'surface-default'} style={{ minHeight: '490px' }}>
                    <Table id={'value-convertings-table'} size={'small'}>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell scope="col">{t('column.show')}</Table.HeaderCell>
                                <Table.HeaderCell scope="col">{t('column.id')}</Table.HeaderCell>
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
                                <Table.HeaderCell scope="col" align={'right'}>
                                    {t('column.actions')}
                                </Table.HeaderCell>
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
                                            {
                                                sourceApplications.find(
                                                    (sourceApp) =>
                                                        sourceApp.id === value.fromApplicationId
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
        </Box>
    );
};

export default ValueConvertingTable;
