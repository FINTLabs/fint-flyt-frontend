import {
    Box
} from "@mui/material";
import {DataGrid, GridColDef, GridToolbar} from "@mui/x-data-grid";
import * as React from "react";
import {useHistory} from "react-router-dom";

const IntegrationConfigurationTable: React.FunctionComponent<any> = (props) => {
    const classes = props.classes;
    let history = useHistory();

    const columns: GridColDef[] = [
        { field: 'id', hide: true},
        { field: 'name', headerName: 'Navn', width: 250 },
        { field: 'description', headerName: 'Beskrivelse', width: 650 },
        { field: 'version', headerName: 'Versjon', width: 150 }
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