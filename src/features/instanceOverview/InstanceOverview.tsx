import {Button, Typography} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Box from "@mui/material/Box";
import {DataGrid, GridCellParams, GridColumns, GridToolbar} from "@mui/x-data-grid";
import {gridLocaleNoNB} from "../util/locale/gridLocaleNoNB";
import {IEvent} from "../log/types/Event";
import moment from "moment";
import EventRepository from "../log/repository/EventRepository";
import {addId} from "../util/JsonUtil";

const InstanceOverview: React.FunctionComponent<RouteComponentProps<any>> = () => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.instanceOverview'})
    const [allEvents, setAllEvents] = useState<IEvent[]>([]);

    const columns: GridColumns = [
        { field: 'id', hide: true, type: 'string', headerName: 'id', flex: 0.5 },
        { field: 'sourceApplicationInstanceId', type: 'string', headerName: 'InstansId', flex: 0.5,
            valueGetter: (params) => params.row.instanceFlowHeaders.sourceApplicationInstanceId
        },
        { field: 'timestamp', type: 'string', headerName: 'Tidspunkt', flex: 1,
            valueGetter: (params) => moment(params.row.timestamp).format('DD/MM/YY HH:mm')
        },
        { field: 'sourceApplicationIntegrationId', type: 'string', headerName: 'Skjema', flex: 3,
            valueGetter: (params) => params.row.instanceFlowHeaders.sourceApplicationIntegrationId
        },
        { field: 'details', headerName: 'Resend', flex: 1, sortable: false, filterable: false,
            renderCell: (params) => ( <CustomButtonToggle row={params.row} />)}
    ];

    useEffect(()=> {
        getAllEvents();
    }, []);

    function CustomButtonToggle(props: GridCellParams["row"]) {
        const hasErrors: boolean = props.row.errors.length > 0;
        return (
            <>
                {hasErrors &&
                    <Button size="small" variant="outlined">Send</Button>
                }
            </>
        );
    }

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
