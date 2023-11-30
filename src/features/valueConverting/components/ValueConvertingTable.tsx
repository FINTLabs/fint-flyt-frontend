import React, {ReactElement, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import ValueConvertingRepository from "../../../shared/repositories/ValueConvertingRepository";
import {IValueConverting} from "../types/ValueConverting";
import {getDestinationDisplayName, getSourceApplicationDisplayName} from "../../../util/DataGridUtil";
import {
    Box,
    Button as ButtonAks,
    Dropdown,
    HelpText,
    HStack,
    Pagination,
    Table,
    VStack
} from "@navikt/ds-react";
import {MenuElipsisVerticalCircleIcon} from "@navikt/aksel-icons";
import ValueConvertingPanel from "./ValueConvertingPanel";

type Props = {
    onValueConvertingSelected: (id: number) => void;
    setNewValueConverting: React.Dispatch<React.SetStateAction<boolean>>,
}

const ValueConvertingTable: React.FunctionComponent<Props> = (props: Props) => {
    const history = useHistory();
    const {t} = useTranslation('translations', {keyPrefix: 'pages.valueConverting'});
    const [rows, setRows] = useState<IValueConverting[] | undefined>(undefined)
    const [page, setPage] = useState(1);
    const rowsPerPage = 8;

    let sortData = rows ?? [];
    sortData = sortData.slice((page - 1) * rowsPerPage, page * rowsPerPage);


    useEffect(() => {
        ValueConvertingRepository.getValueConvertings(0, 100, 'id', 'DESC', false)
            .then(response => {
                const data = response.data
                if (data.content) {
                    setRows(data.content)
                } else {
                    setRows([])
                }
            })
            .catch(e => {
                console.log(e)
                setRows([])
            })
    }, [])

    async function handleNewOrEditConvertingClick(id: number) {
        props.onValueConvertingSelected(id)
    }

    function actionMenu(value: IValueConverting): ReactElement {
        return (
            <Dropdown>
                <ButtonAks as={Dropdown.Toggle} variant="tertiary-neutral"
                           icon={<MenuElipsisVerticalCircleIcon aria-hidden/>}/>
                <Dropdown.Menu>
                    <Dropdown.Menu.GroupedList>
                        <Dropdown.Menu.GroupedList.Item onClick={() => {
                            handleNewOrEditConvertingClick(value.id).then(() => history.push('/valueconverting'))
                        }}>
                            {t('button.basedOn')}
                        </Dropdown.Menu.GroupedList.Item>
                    </Dropdown.Menu.GroupedList>
                </Dropdown.Menu>
            </Dropdown>
        );
    }

    return (
            <Box background={"surface-default"} padding="6" borderRadius={"large"} borderWidth="2" borderColor={"border-subtle"}>
                <VStack gap={"6"}>
                    <Box background={'surface-default'} style={{height: '490px', overflowY: "scroll"}}>
                        <Table id={"value-convertings-table"} size={"small"}>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell scope="col">{t('column.show')}</Table.HeaderCell>
                                    <Table.HeaderCell scope="col">{t('column.displayName')}</Table.HeaderCell>
                                    <Table.HeaderCell scope="col">{t('column.fromType')}</Table.HeaderCell>
                                    <Table.HeaderCell scope="col">{t('column.toType')}</Table.HeaderCell>
                                    <Table.HeaderCell scope="col">{t('column.fromApplication')}</Table.HeaderCell>
                                    <Table.HeaderCell scope="col">{t('column.toApplication')}</Table.HeaderCell>
                                    <Table.HeaderCell scope="col">{t('column.actions')}</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {sortData?.map((value, i) => {
                                    return (
                                        <Table.ExpandableRow id={"table-row-" + i} key={i}
                                                             content={<ValueConvertingPanel existingValueConverting={value}/>}>
                                            <Table.DataCell scope="row">{value.displayName}</Table.DataCell>
                                            <Table.DataCell scope="row">{value.fromTypeId}</Table.DataCell>
                                            <Table.DataCell scope="row">{value.toTypeId}</Table.DataCell>
                                            <Table.DataCell scope="row">{getSourceApplicationDisplayName(value.fromApplicationId)}</Table.DataCell>
                                            <Table.DataCell scope="row">{getDestinationDisplayName(value.toApplicationId)}</Table.DataCell>
                                            <Table.DataCell scope="row">
                                                {actionMenu(value)}
                                            </Table.DataCell>
                                        </Table.ExpandableRow>
                                    );
                                })}
                            </Table.Body>
                        </Table>
                    </Box>
                    <HStack justify={"center"}>
                        {rows && rows.length > rowsPerPage &&
                            <Pagination
                                page={page}
                                onPageChange={setPage}
                                count={Math.ceil(rows.length / rowsPerPage)}
                                size="small"
                            />}
                    </HStack>
                    <HStack gap={"2"} align="center">
                        <ButtonAks id={"new-button"} onClick={() => props.setNewValueConverting(true)}>
                            {t('button.newConverting')}
                        </ButtonAks>
                        <HelpText title="Knapp informasjon" placement="right">
                            {t('help.new')}
                        </HelpText>
                    </HStack>
                </VStack>
            </Box>
    );
}

export default ValueConvertingTable;