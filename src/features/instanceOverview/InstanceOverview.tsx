import {Theme, Typography} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {createStyles, makeStyles} from "@mui/styles";
import { useTranslation } from 'react-i18next';
import Box from "@mui/material/Box";
import {DataGrid, GridColumns, GridToolbar} from "@mui/x-data-grid";
import {gridLocaleNoNB} from "../util/locale/gridLocaleNoNB";
import {IEvent} from "../log/types/Event";
import moment from "moment";
import EventRepository from "../log/repository/EventRepository";
import {addId} from "../util/JsonUtil";


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

const InstanceOverview: React.FunctionComponent<RouteComponentProps<any>> = () => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.instanceOverview'})
    const [allEvents, setAllEvents] = useState<IEvent[]>([]);

    const columns: GridColumns = [
        { field: 'id', hide: true, type: 'string', headerName: 'id', flex: 0.5 },
        { field: 'sourceApplicationInstanceId', type: 'string', headerName: 'InstansId', flex: 0.5,
            valueGetter: (params) => params.row.instanceFlowHeaders.sourceApplicationInstanceId
        },
        { field: 'timestamp', type: 'string', headerName: 'Tidspunkt', flex: 1,
            valueGetter: (params) => moment(params.row.timestamp as string).format('YYYY/MM/DD HH:mm')
        },
        { field: 'sourceApplicationIntegrationId', type: 'string', headerName: 'Skjema', flex: 3,
            valueGetter: (params) => params.row.instanceFlowHeaders.sourceApplicationIntegrationId
        }
    ];

    useEffect(()=> {
        getAllEvents();
    }, []);

    const getAllEvents = () => {
        EventRepository.getEvents()
            .then((response) => {
                let data = response.data;
                if (data) {
                    data.forEach(addId(0, 'name'))
                    setAllEvents(data);
                }
            })
            .catch(e => console.error('Error: ', e))
    }
    return (
        <Box sx={{ width: 1, height: 900 }}>
                {/*TODO: remove header*/}
                <Typography>{t('header')} (NB! UNDER UTVIKLING, KUN DEMO, IKKE REELLE DATA) </Typography>
                <DataGrid
                    columns={columns}
                    density='compact'
                    localeText={gridLocaleNoNB}
                    rows={allEvents}
                    components={{
                        Toolbar: GridToolbar,
                    }}
                    rowThreshold={0}
                    initialState={{
                        sorting: {
                            sortModel: [{ field: 'timestamp', sort: 'desc' }],
                        },
                        filter: {
                            filterModel: {
                                items: [
                                    {
                                        columnField: 'sourceApplicationInstanceId',
                                        operatorValue: 'contains'
                                    },
                                ],
                            },
                        },
                    }}
                />
        </Box>
    );
}

export default withRouter(InstanceOverview);
