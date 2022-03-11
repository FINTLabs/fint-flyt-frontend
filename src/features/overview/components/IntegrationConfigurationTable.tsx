import {
    Box
} from "@mui/material";
import {DataGrid, GridColDef, GridToolbar} from "@mui/x-data-grid";
import * as React from "react";
import {useHistory} from "react-router-dom";
import {noNB} from "../../util/locale/noNB";

const IntegrationConfigurationTable: React.FunctionComponent<any> = (props) => {
    const classes = props.classes;
    let history = useHistory();

    const columns: GridColDef[] = [
        { field: 'integrationId', type: 'string', hide: true},
        { field: 'sourceApplication', type: 'string', headerName: 'Skjemaleverandør', width: 150 },
        { field: 'sourceApplicationIntegrationId', type: 'string', headerName: 'Skjema', width: 150 },
        { field: 'name', type: 'string', headerName: 'Navn', width: 250 },
        { field: 'description', type: 'string', headerName: 'Beskrivelse', width: 350 },
        { field: 'published', type: 'boolean', headerName: 'Ferdigstilt', width: 150 },
        { field: 'version', type: 'string', headerName: 'Revisjon', width: 150 }
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
                        localeText={noNB}
                        getRowId={(row) => row.integrationId}
                        onCellDoubleClick={(params, event) => {
                            if (!event.ctrlKey) {
                                event.defaultMuiPrevented = true;
                                props.setIntegration(params.row)
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
                                            columnField: 'name',
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