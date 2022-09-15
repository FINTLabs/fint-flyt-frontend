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

    const  resend = (event: any, instanceId: string) => {
        //TODO: try resending instance
        console.log('resend instance', instanceId)
    }

    const columns: GridColumns = [
        { field: 'id', hide: true, type: 'string', headerName: 'id', flex: 0.5 },
        { field: 'sourceApplicationInstanceId', type: 'string', headerName: 'Kilde instans ID', flex: 1,
            valueGetter: (params) => params.row.instanceFlowHeaders.sourceApplicationInstanceId
        },
        { field: 'timestamp', type: 'string', headerName: 'Sist hendelse', flex: 1,
            valueGetter: (params) => moment(params.row.timestamp).format('YYYY/MM/DD HH:mm')
        },
        { field: 'name', type: 'string', headerName: 'Status', flex: 2, valueGetter: params => t(params.row.name)},
        { field: 'sourceApplication', type: 'string', headerName: 'Kildeapplikasjon', flex: 2,
            valueGetter: (params) => params.row.instanceFlowHeaders.sourceApplication
        },
        { field: 'sourceApplicationIntegrationId', type: 'string', headerName: 'Skjema', flex: 2,
            valueGetter: (params) => params.row.instanceFlowHeaders.sourceApplicationIntegrationId
        },
        { field: 'archiveCaseId', type: 'string', headerName: 'Arkivsak ID', flex: 2,
            valueGetter: (params) => params.row.instanceFlowHeaders.archiveCaseId
        },
        { field: 'configurationId', type: 'string', headerName: 'Konfigurasjon ID', flex: 2,
            valueGetter: (params) => params.row.instanceFlowHeaders.configurationId
        },
        { field: 'details', headerName: 'Send inn på nytt', flex: 1, sortable: false, filterable: false,
            renderCell: (params) => ( <CustomButtonToggle row={params.row} />)
        }
    ];

    useEffect(()=> {
        getAllEvents();
    }, []);

    function CustomButtonToggle(props: GridCellParams["row"]) {
        const hasErrors: boolean = props.row.errors.length > 0;
        return (
            <>
                {hasErrors &&
                    <Button size="small" variant="outlined" onClick={(e) => {
                        resend(e, props.row.instanceFlowHeaders.instanceId);
                    }}>Send</Button>
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
                <Typography>{t('header')} (NB! UNDER UTVIKLING, DEMO) </Typography>
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
