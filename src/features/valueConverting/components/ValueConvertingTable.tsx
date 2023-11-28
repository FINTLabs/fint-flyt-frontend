import React, {ReactElement, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import ValueConvertingRepository from "../../../shared/repositories/ValueConvertingRepository";
import {IValueConverting} from "../types/ValueConverting";
import {getDestinationDisplayName, getSourceApplicationDisplayName} from "../../../util/DataGridUtil";
import {Box, Button as ButtonAks, Dropdown, Table, VStack} from "@navikt/ds-react";
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

    useEffect(() => {
        ValueConvertingRepository.getValueConvertings(0, 100, 'fromApplicationId', 'ASC', false)
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
        <Box background={"surface-default"} padding="6" borderRadius={"large"} borderWidth="2"
             borderColor={"border-subtle"}>
            <VStack gap={"6"}>
                <Box background={'surface-default'}>
                    <Table size={"small"}>
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
                            {rows?.map((value, i) => {
                                return (
                                    <Table.ExpandableRow key={i}
                                                         content={<ValueConvertingPanel existingValueConverting={value}/>}>
                                        <Table.DataCell scope="row">{value.displayName}</Table.DataCell>
                                        <Table.DataCell>{value.fromTypeId}</Table.DataCell>
                                        <Table.DataCell>{value.toTypeId}</Table.DataCell>
                                        <Table.DataCell>{getSourceApplicationDisplayName(value.fromApplicationId)}</Table.DataCell>
                                        <Table.DataCell>{getDestinationDisplayName(value.toApplicationId)}</Table.DataCell>
                                        <Table.DataCell>
                                            {actionMenu(value)}
                                        </Table.DataCell>
                                    </Table.ExpandableRow>
                                );
                            })}
                        </Table.Body>
                    </Table>
                </Box>
                <Box>
                    <ButtonAks onClick={() => props.setNewValueConverting(true)}>
                        {t('button.newConverting')}
                    </ButtonAks>
                </Box>
            </VStack>
        </Box>
    );
}

export default ValueConvertingTable;