import * as React from "react";
import {useState} from "react";
import {
    getDestinationDisplayName,
    getSourceApplicationDisplayName,
    getStateDisplayName,
} from "../../../util/TableUtil";
import {Box, HStack, Pagination, Table} from "@navikt/ds-react";
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
    const rowsPerPage = 14;

    let sortData = props.integrations ?? [];
    sortData = sortData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    return (
        <Box>
            <Box background={'surface-default'} style={{height: '70vh', overflowY: "scroll"}}>
                <Table id={"integration-table"} size={"small"}>
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeader/>
                            <Table.ColumnHeader>{t('column.id')}</Table.ColumnHeader>
                            <Table.ColumnHeader>{t('column.sourceApplicationId')}</Table.ColumnHeader>
                            <Table.ColumnHeader
                                 >{t('column.sourceApplicationIntegrationId')}</Table.ColumnHeader>
                            <Table.ColumnHeader
                                 >{t('column.sourceApplicationIntegrationIdDisplayName')}</Table.ColumnHeader>
                            <Table.ColumnHeader>{t('column.destination')}</Table.ColumnHeader>
                            <Table.ColumnHeader>{t('column.state')}</Table.ColumnHeader>
                            <Table.ColumnHeader>{t('column.dispatched')}</Table.ColumnHeader>
                            <Table.ColumnHeader>{t('column.errors')}</Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {sortData?.map((value, i) => {
                            return (
                                <Table.ExpandableRow key={i} content={
                                    <IntegrationPanel id={'panel-' + i}
                                        draftC={props.allConfigs.filter((config) => config.integrationId === value.id)}
                                        completedC={props.allCompletedConfigs.filter((config) => config.integrationId === value.id)}
                                        integration={value}
                                    />}
                                >
                                    <Table.DataCell>{value.id}</Table.DataCell>
                                    <Table.DataCell
                                        scope="row">{getSourceApplicationDisplayName(Number(value.sourceApplicationId))}</Table.DataCell>
                                    <Table.DataCell>{value.sourceApplicationIntegrationId}</Table.DataCell>
                                    <Table.DataCell>{value.displayName}</Table.DataCell>
                                    <Table.DataCell>{getDestinationDisplayName(value.destination ?? '')}</Table.DataCell>
                                    <Table.DataCell>
                                        {getStateDisplayName(value.state ?? '')}
                                    </Table.DataCell>
                                    <Table.DataCell>{value.dispatched}</Table.DataCell>
                                    <Table.DataCell>{value.errors}</Table.DataCell>
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