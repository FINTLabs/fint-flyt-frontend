import * as React from "react";
import {useState} from "react";
import {
    getDestinationDisplayName,
    getSourceApplicationDisplayName,
    getStateDisplayName,
} from "../../../util/DataGridUtil";
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
    const rowsPerPage = 6;

    let sortData = props.integrations ?? [];
    sortData = sortData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    return (
        <Box>
            <Box background={'surface-default'} style={{height: '70vh', overflowY: "scroll"}}>
                <Table id={"integration-table"} size={"small"}>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell/>
                            <Table.HeaderCell scope="col">{t('column.id')}</Table.HeaderCell>
                            <Table.HeaderCell scope="col">{t('column.sourceApplicationId')}</Table.HeaderCell>
                            <Table.HeaderCell
                                scope="col">{t('column.sourceApplicationIntegrationIdDescription')}</Table.HeaderCell>
                            <Table.HeaderCell
                                scope="col">{t('column.sourceApplicationIntegrationIdDisplayName')}</Table.HeaderCell>
                            <Table.HeaderCell scope="col">{t('column.destination')}</Table.HeaderCell>
                            <Table.HeaderCell scope="col">{t('column.state')}</Table.HeaderCell>
                            <Table.HeaderCell scope="col">{t('column.dispatched')}</Table.HeaderCell>
                            <Table.HeaderCell scope="col">{t('column.errors')}</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {sortData?.map((value, i) => {
                            return (
                                <Table.ExpandableRow key={i} content={
                                    <IntegrationPanel
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