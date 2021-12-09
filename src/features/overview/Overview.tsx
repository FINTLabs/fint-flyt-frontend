import {Box, Button, Theme, Typography} from '@mui/material';
import React, {useState} from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import {createStyles, makeStyles} from "@mui/styles";
import IntegrationRepository from "../integration/repository/IntegrationRepository";
import {DataGrid, GridColDef, GridToolbar} from '@mui/x-data-grid';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        form: {
            width: theme.spacing(120)
        },
        row: {
            display: 'flex'
        },
        dataGridBox: {
            height: "750px",
            width: '100%'
        }
    })
);

const Overview: React.FunctionComponent<RouteComponentProps<any>> = () => {
    const classes = useStyles();
    let responseRows: RowModel[] = [];
    const [configList, setConfigList] = useState<RowModel[]>([]);

    interface RowModel {
        id: any,
        name: string,
        description: string,
        version: number
    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 350 },
        { field: 'version', headerName: 'Versjon', width: 150 },
        { field: 'name', headerName: 'Navn', width: 250 },
        { field: 'description', headerName: 'Beskrivelse', width: 650 }
    ];

    function getConfigs() {
        IntegrationRepository.get()
            .then(response => {
                let data = response.data.content;
                data.map((content: any) => {
                    responseRows.push({id: content.id,name: content.name, description: content.description, version: content.version})
                })
                setConfigList(responseRows);
            })
            .catch((e: Error) => {
                console.log('error fetching configurations', e)
            })
    }
    return (
        <>
            <Box>
                <Typography>Oversikt</Typography>
            </Box>
            <Button variant="outlined" onClick={getConfigs}>Hent konfigurasjoner</Button>
            <Box display="flex" position="relative" width={1} height={1}>
                <Box className={classes.dataGridBox}>
                    <DataGrid
                        rows={configList}
                        columns={columns}
                        pageSize={15}
                        rowsPerPageOptions={[15]}
                        disableSelectionOnClick
                        components={{
                            Toolbar: GridToolbar,
                        }}
                        initialState={{
                            filter: {
                                filterModel: {
                                    items: [
                                        {
                                            columnField: 'id',
                                            operatorValue: 'contains'
                                        },
                                    ],
                                },
                            },
                        }}
                    />
                </Box>
            </Box>
        </>
    );
}

export default withRouter(Overview);