import {
    Box
} from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import * as React from "react";
import { useHistory } from "react-router-dom";
import { gridLocaleNoNB } from "../../util/locale/gridLocaleNoNB";
import {useTranslation} from "react-i18next";

const IntegrationConfigurationTable: React.FunctionComponent<any> = (props) => {
    const { t } = useTranslation('translations', { keyPrefix: 'pages.integrationList'});
    const classes = props.classes;
    let history = useHistory();

    const columns: GridColDef[] = [
        { field: 'integrationId', type: 'string', hide: true },
        { field: 'sourceApplication', type: 'string', headerName: t('table.columns.sourceApplication'), flex: 1 },
        { field: 'sourceApplicationIntegrationId', type: 'string', headerName: t('table.columns.sourceApplicationIntegrationId'), flex: 1 },
        { field: 'name', type: 'string', headerName: t('table.columns.name'), flex: 2 },
        { field: 'description', type: 'string', headerName: t('table.columns.description'), flex: 2 },
        { field: 'published', type: 'boolean', headerName: t('table.columns.published'), flex: 1 },
        { field: 'version', type: 'string', headerName: t('table.columns.revision'), flex: 1 }
    ];

    const setHistory = () => {
        history.push({
            pathname: '/overview/details',
        })
    }

    return (
        <Box>
            <Box display="flex" position="relative" width={1} height={1}>
                <Box className={classes.dataGridBox}>
                    <DataGrid
                        localeText={gridLocaleNoNB}
                        getRowId={(row) => row.integrationId}
                        onCellDoubleClick={(params, event) => {
                            if (!event.ctrlKey) {
                                event.defaultMuiPrevented = true;
                                props.setIntegration(params.row)
                                props.setInitialVersion(params.row.version)
                                setHistory();
                            }
                        }}
                        density='compact'
                        rows={props.configurations}
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
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
}

export default IntegrationConfigurationTable;