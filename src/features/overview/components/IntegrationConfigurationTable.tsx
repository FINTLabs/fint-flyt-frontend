import {
    Box
} from "@mui/material";
import {DataGrid, GridColDef, GridToolbar} from "@mui/x-data-grid";
import * as React from "react";

const IntegrationConfigurationTable: React.FunctionComponent<any> = (props) => {
    const classes = props.classes;

    const columns: GridColDef[] = [
        { field: 'id', hide: true},
        { field: 'name', headerName: 'Navn', width: 250 },
        { field: 'description', headerName: 'Beskrivelse', width: 650 },
        { field: 'version', headerName: 'Versjon', width: 150 }
    ];

    return (
        <Box>
            <Box display="flex" position="relative" width={1} height={1}>
                <Box className={classes.dataGridBox}>
                    <DataGrid
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