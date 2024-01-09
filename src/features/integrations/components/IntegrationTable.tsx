import * as React from "react";
import {useEffect, useState} from "react";
import {
    getDestinationDisplayName,
    getSourceApplicationDisplayName,
    getStateDisplayName,
} from "../../../util/DataGridUtil";
import {Box, HStack, Pagination, SortState, Table} from "@navikt/ds-react";
import IntegrationPanel from "./IntegrationPanel";
import {IIntegration} from "../../integration/types/Integration";
import {useTranslation} from "react-i18next";
import {IConfiguration} from "../../configuration/types/Configuration";

type IntegrationProps = {
    integrations: IIntegration[];
    allConfigs: IConfiguration[];
    allCompletedConfigs: IConfiguration[];
}

const IntegrationTable: React.FunctionComponent<IntegrationProps> = (props: IntegrationProps) => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.integrations.table'})
    const [page, setPage] = useState(1);
    const rowsPerPage = 6;
    const [sort, setSort] = useState<SortState>({orderBy: 'id', direction: "descending"});
    const [tableData, setTableData] = useState<IIntegration[]>(props.integrations ?? [])
    const [currentSortedData, setCurrentSortedData] = useState<IIntegration[]>(props.integrations ?? [])

    useEffect(() => {
        setTableData(currentSortedData
            .slice((page - 1) * rowsPerPage, page * rowsPerPage))
    }, [])


    useEffect(() => {
        setTableData(currentSortedData.slice((page - 1) * rowsPerPage, page * rowsPerPage))
    }, [page, setPage])


    const handleSort = (sortKey: string) => {
        console.log("handleSort, sortkey: ", sortKey)
        setSort(
            sort && sortKey === sort.orderBy && sort.direction === "descending"
                ? {orderBy: 'id', direction: 'ascending'}
                : {
                    orderBy: sortKey,
                    direction:
                        sort && sortKey === sort.orderBy && sort.direction === "ascending"
                            ? "descending"
                            : "ascending",
                }
        );
        const newData = props.integrations
            .slice().sort((a, b) => {
                if (sort) {
                    return sort.direction === "ascending"
                        ? comparator(b, a, sort.orderBy)
                        : comparator(a, b, sort.orderBy);
                }
                return 1;
            })
        setCurrentSortedData(newData)
        setTableData(newData.slice((page - 1) * rowsPerPage, page * rowsPerPage))
    };


    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const comparator = (a, b, orderBy) => {
        if (b[orderBy] < a[orderBy] || b[orderBy] === undefined) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    };


    return (
        <Box>
            <Box background={'surface-default'} style={{height: '70vh', overflowY: "scroll"}}>
                <Table sort={sort} onSortChange={(sortKey) => handleSort(sortKey ? sortKey : 'id')} id={"integration-table"} size={"small"}>
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeader/>
                            <Table.ColumnHeader sortKey="id" sortable>{t('column.id')}</Table.ColumnHeader>
                            <Table.ColumnHeader>{t('column.sourceApplicationId')}</Table.ColumnHeader>
                            <Table.ColumnHeader
                            >{t('column.sourceApplicationIntegrationId')}</Table.ColumnHeader>
                            <Table.ColumnHeader
                            >{t('column.sourceApplicationIntegrationIdDisplayName')}</Table.ColumnHeader>
                            <Table.ColumnHeader>{t('column.destination')}</Table.ColumnHeader>
                            <Table.ColumnHeader sortKey="state" sortable>{t('column.state')}</Table.ColumnHeader>
                            <Table.ColumnHeader>{t('column.dispatched')}</Table.ColumnHeader>
                            <Table.ColumnHeader>{t('column.errors')}</Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {tableData?.map(({ id, sourceApplicationId, sourceApplicationIntegrationId, displayName,
                                             destination, state, dispatched, errors }, i) => {
                            return (
                                <Table.ExpandableRow key={i} content={
                                    <IntegrationPanel id={'panel-' + i}
                                                      draftC={props.allConfigs.filter((config) => config.integrationId === id)}
                                                      completedC={props.allCompletedConfigs.filter((config) => config.integrationId === id)}
                                                      integration={{id, sourceApplicationId, sourceApplicationIntegrationId, displayName,
                                                          destination, state, dispatched, errors}}
                                    />}
                                >
                                    <Table.DataCell>{id}</Table.DataCell>
                                    <Table.DataCell
                                        scope="row">{getSourceApplicationDisplayName(Number(sourceApplicationId))}</Table.DataCell>
                                    <Table.DataCell>{sourceApplicationIntegrationId}</Table.DataCell>
                                    <Table.DataCell>{displayName}</Table.DataCell>
                                    <Table.DataCell>{getDestinationDisplayName(destination ?? '')}</Table.DataCell>
                                    <Table.DataCell>
                                        {getStateDisplayName(state ?? '')}
                                    </Table.DataCell>
                                    <Table.DataCell>{dispatched}</Table.DataCell>
                                    <Table.DataCell>{errors}</Table.DataCell>
                                </Table.ExpandableRow>
                            );
                        })}
                    </Table.Body>
                </Table>
            </Box>
            <HStack justify={"center"}>
                {props.integrations && props.integrations.length > rowsPerPage &&
                    <Pagination
                        page={page}
                        onPageChange={setPage}
                        count={Math.ceil(props.integrations.length / rowsPerPage)}
                        size="small"
                    />
                }
            </HStack>
        </Box>
    );
}

export default IntegrationTable;