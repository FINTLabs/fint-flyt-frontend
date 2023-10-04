import {Box, Button} from "@mui/material";
import {DataGrid, GridCellParams, GridColDef, GridToolbar} from "@mui/x-data-grid";
import * as React from "react";
import {useContext} from "react";
import {useHistory} from "react-router-dom";
import {gridLocaleNoNB} from "../../../util/locale/gridLocaleNoNB";
import {useTranslation} from "react-i18next";
import {SourceApplicationContext} from "../../../context/SourceApplicationContext";
import {
    getDestinationDisplayName,
    getSourceApplicationDisplayName,
    getStateDisplayName
} from "../../../util/DataGridUtil";
import {IntegrationContext} from "../../../context/integrationContext";
import {ClassNameMap} from "@mui/styles";
import {renderCellWithTooltip} from "../../../util/DataGridUtil";

type Props = {
    classes: ClassNameMap
}

const IntegrationTable: React.FunctionComponent<Props> = (props: Props) => {
    const {t, i18n} = useTranslation('translations', {keyPrefix: 'pages.integrationOverview'});
    const classes = props.classes;
    const history = useHistory();
    const {
        setExistingIntegration,
        integrations,
        getCompletedConfigurations,
        getConfigurations
    } = useContext(IntegrationContext)
    const {setSourceApplication} = useContext(SourceApplicationContext)

    const columns: GridColDef[] = [
        {
            field: 'details',
            headerName: t('table.columns.show'),
            minWidth: 150,
            flex: 0.5,
            sortable: false,
            filterable: false,
            renderCell: (params) => (<ShowButtonToggle row={params.row}/>)
        },
        {
            field: 'sourceApplicationId',
            type: 'string',
            headerName: t('table.columns.sourceApplicationId'),
            minWidth: 150,
            flex: 1,
            valueGetter: (params) => (getSourceApplicationDisplayName(params.row.sourceApplicationId))
        },
        {
            field: 'sourceApplicationIntegrationId',
            type: 'string',
            headerName: t('table.columns.sourceApplicationIntegrationId'),
            minWidth: 250,
            flex: 1,
            renderCell: (params) => renderCellWithTooltip(params.value as string)
        },
        {
            field: 'displayName',
            type: 'string',
            headerName: t('table.columns.sourceApplicationIntegrationIdDisplayName'),
            minWidth: 350,
            flex: 1,
            sortable: false,
            renderCell: (params) => renderCellWithTooltip(params.value as string)
        },
        {
            field: 'destination', type: 'string', headerName: t('table.columns.destination'), minWidth: 150, flex: 1,
            valueGetter: (params) => getDestinationDisplayName(params.row.destination),
            renderCell: (params) => renderCellWithTooltip(params.value as string)
        },
        {
            field: 'state', type: 'string', headerName: t('table.columns.state'), minWidth: 100, flex: 1,
            valueGetter: (params) => getStateDisplayName(params.row.state)
        },
        {
            field: 'dispatched',
            type: 'number',
            headerName: t('table.columns.dispatched'),
            minWidth: 100,
            flex: 1,
            sortable: false
        },
        {
            field: 'errors',
            type: 'number',
            headerName: t('table.columns.errors'),
            minWidth: 150,
            flex: 1,
            sortable: false
        }
    ];

    const setHistory = () => {
        history.push({
            pathname: '/integration/panel',
        })
    }

    function handleShowButtonClick(row: GridCellParams["row"]) {
        setExistingIntegration(row);
        setSourceApplication(row.sourceApplicationId);
        getConfigurations(0, 10000, "version", "DESC", false, row.id, true);
        getCompletedConfigurations(0, 10000, "id", "ASC", true, row.id, true);
        setHistory();
    }

    function ShowButtonToggle(props: GridCellParams["row"]): JSX.Element {
        return <Button
            size="small"
            variant="contained"
            onClick={() => handleShowButtonClick(props.row)}
        >{t('button.show')}
        </Button>
    }

    return (
        <Box>
            <Box display="flex" position="relative" width={1} height={1}>
                <Box id="integration-list" className={classes.dataGridBox}>
                    <DataGrid
                        loading={integrations === undefined}
                        localeText={i18n.language === 'no' ? gridLocaleNoNB : undefined}
                        getRowId={(row) => row.sourceApplicationIntegrationId}
                        density='compact'
                        rows={integrations ?? []}
                        columns={columns}
                        pageSize={20}
                        rowsPerPageOptions={[20]}
                        components={{
                            Toolbar: GridToolbar,
                        }}
                        initialState={{
                            filter: {
                                filterModel: {
                                    items: [
                                        {
                                            columnField: 'sourceApplicationIntegrationId',
                                            operatorValue: 'contains'
                                        },
                                    ],
                                },
                            },
                            sorting: {
                                sortModel: [{field: 'state', sort: 'asc'}],
                            },
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
}

export default IntegrationTable;
