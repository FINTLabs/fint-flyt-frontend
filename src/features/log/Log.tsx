import React, {useEffect, useState} from 'react';
import { withRouter } from 'react-router-dom';
import {Box, Theme} from "@mui/material";
import EventRepository from "./repository/EventRepository";
import {IEvent} from "./types/Event";
import {DataGrid, GridColDef, GridToolbar} from "@mui/x-data-grid";
import {noNB} from "../util/locale/noNB";
import {createStyles, makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        form: {
            width: theme.spacing(120)
        },
        row: {
            display: 'flex'
        },
        dataGridBox: {
            height: "450px",
            width: '100%'
        }
    })
);

function Log() {
    const [allEvents, setAllEvents] = useState<IEvent[]>([]);
    useEffect(()=> {
        getAllEvents();
    }, [])




    const getAllEvents = () => {
        EventRepository.getEvents()
            .then((response) => {
                setAllEvents(response.data);
            })
            .catch(e => console.error('Error: ', e))
    }

    const columns: GridColDef[] = [
        { field: 'orgId', hide: true},
        { field: 'type', type: 'string', headerName: 'Type', width: 150 },
        { field: 'timestamp', type: 'string', headerName: 'Tidspunkt', flex: 1 },
        { field: 'sourceApplication', type: 'string', headerName: 'Skjemaleverandør', flex: 1 },
        { field: 'sourceApplicationIntegrationId', type: 'string', headerName: 'SkjemaId', flex: 1 },
        { field: 'description', type: 'string', headerName: 'Beskrivelse', flex: 1 },
        { field: 'service', type: 'string', headerName: 'Tjeneste', flex: 1 },
        { field: 'sourceApplicationInstanceId', type: 'string', headerName: 'InstansId', flex: 1 }
    ];

    const classes = useStyles();

    return (
        <Box>
            <Box display="flex" position="relative" width={1} height={1}>
                <Box id="integration-list" className={classes.dataGridBox}>
                    <DataGrid
                        localeText={noNB}
                        getRowId={(row) => row.orgId}
                        density='compact'
                        rows={allEvents}
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
        </Box>    );
}


export default withRouter(Log);