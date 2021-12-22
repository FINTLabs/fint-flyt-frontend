import {Box, Theme, Typography} from '@mui/material';
import React, {useEffect, useState} from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import {createStyles, makeStyles} from "@mui/styles";
import IntegrationRepository from "../integration/repository/IntegrationRepository";
import {DataGrid, GridColDef, GridToolbar} from '@mui/x-data-grid';
import {IRow} from "./types/Row";


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
    const [configurations, getConfigurations] = useState<IRow[]>([]);

    const columns: GridColDef[] = [
        { field: 'id', hide: true},
        { field: 'name', headerName: 'Navn', width: 250 },
        { field: 'description', headerName: 'Beskrivelse', width: 650 },
        { field: 'version', headerName: 'Versjon', width: 150 }
    ];

    useEffect(()=> {
        getAllConfigurations();
    }, [])

    const getAllConfigurations = () => {
        IntegrationRepository.get()
            .then((response) => {
                const allConfigurations = response.data.content;
                getConfigurations(allConfigurations)

            })
            .catch(e => console.error('Error: ', e))
    }

    return (
        <>
            <Box>
                <Typography>Oversikt</Typography>
            </Box>
            <Box display="flex" position="relative" width={1} height={1}>
                <Box className={classes.dataGridBox}>
                    <DataGrid
                        rows={configurations}
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
        </>
    );
}

export default withRouter(Overview);