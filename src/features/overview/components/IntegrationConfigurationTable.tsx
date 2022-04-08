import {
    Box
} from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import * as React from "react";
import { useHistory } from "react-router-dom";
import { gridLocaleNoNB } from "../../util/locale/gridLocaleNoNB";

const IntegrationConfigurationTable: React.FunctionComponent<any> = (props) => {
    const classes = props.classes;
    let history = useHistory();

    const columns: GridColDef[] = [
        { field: 'integrationId', type: 'string', hide: true },
        { field: 'sourceApplication', type: 'string', headerName: 'Skjemaleverandør', flex: 1 },
        { field: 'sourceApplicationIntegrationId', type: 'string', headerName: 'SkjemaId', flex: 1 },
        { field: 'name', type: 'string', headerName: 'Navn', flex: 2 },
        { field: 'description', type: 'string', headerName: 'Beskrivelse', flex: 2 },
        { field: 'published', type: 'boolean', headerName: 'Ferdigstilt', flex: 1 },
        { field: 'version', type: 'string', headerName: 'Revisjon', flex: 1 }
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