import {Box, Button, Typography} from "@mui/material";
import {DataGrid, GridCellParams, GridColumns, GridToolbar} from "@mui/x-data-grid";
import * as React from "react";
import {useHistory} from "react-router-dom";
import {gridLocaleNoNB} from "../../util/locale/gridLocaleNoNB";
import {useTranslation} from "react-i18next";
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import moment from "moment";
import {useContext, useEffect} from "react";
import {HistoryContext} from "../../../context/historyContext";
import InstanceRepository from "../repository/InstanceRepository";

const InstanceTable: React.FunctionComponent<any> = (props) => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.instanceOverview'})
    let history = useHistory();
    const {latestInstances, getLatestInstances, getSelectedInstances} = useContext(HistoryContext)

    const columns: GridColumns = [
        { field: 'id', hide: true, type: 'string', headerName: 'id', flex: 0.5 },
        { field: 'sourceApplicationInstanceId', type: 'string', headerName: 'Kilde instans ID', flex: 1,
            valueGetter: (params) => params.row.instanceFlowHeaders.sourceApplicationInstanceId
        },
        { field: 'timestamp', type: 'dateTime', headerName: 'Sist hendelse', flex: 2,
            valueGetter: (params) => moment(params.row.timestamp).format('YYYY/MM/DD HH:mm:ss.sss'),
        },
        { field: 'name', type: 'string', headerName: 'Status', flex: 2,
            renderCell: params => ( <CustomCellRender row={params.row} />)
        },
        { field: 'sourceApplication', type: 'string', headerName: 'Kildeapplikasjon', flex: 2,
            valueGetter: (params) => params.row.instanceFlowHeaders.sourceApplication
        },
        { field: 'sourceApplicationIntegrationId', type: 'string', headerName: 'Skjema', flex: 2,
            valueGetter: (params) => params.row.instanceFlowHeaders.sourceApplicationIntegrationId
        },
        { field: 'archiveCaseId', type: 'string', headerName: 'Arkivsak ID', flex: 1,
            valueGetter: (params) => params.row.instanceFlowHeaders.archiveCaseId
        },
        { field: 'configurationId', type: 'string', headerName: 'Konfigurasjon ID', flex: 1,
            valueGetter: (params) => params.row.instanceFlowHeaders.configurationId
        },
        { field: 'details', headerName: 'Send inn på nytt', flex: 1, sortable: false, filterable: false,
            renderCell: (params) => ( <CustomButtonToggle row={params.row} />)
        }
    ];

    function CustomCellRender(props: GridCellParams["row"]) {
        return (
            <>
                {props.row.type === 'ERROR' && <ErrorIcon color="error"/>}
                {props.row.type === 'INFO' && props.row.name !== 'instance-dispatched' && <InfoIcon color="info"/>}
                {props.row.name === 'instance-dispatched' && <CheckCircleIcon color="success"/>}
                {t(props.row.name)}
            </>
        );
    }

    const  resend = (event: any, instanceId: string) => {
        //TODO: add notifatication on successful or failed resending
        InstanceRepository.resendInstance(instanceId)
            .then(response => {
                console.log('resend instance', response)
            })
            .catch(e => {console.error(e)})
    }

    useEffect(()=> {
        getLatestInstances(0, 1000, "timestamp", "DESC");
    }, []);

    const getEventsWithInstanceId = (sourceApplicationID: string, instanceId: string) => {
        getSelectedInstances(0, 1000, "timestamp", "DESC", sourceApplicationID, instanceId)
        setHistory();
    }

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

    const setHistory = () => {
        history.push({
            pathname: '/instance',
        })
    }

    return (
        <Box sx={{ width: 1, height: 900 }}>
            <Typography>{t('header')} </Typography>
            <DataGrid
                columns={columns}
                density='compact'
                localeText={gridLocaleNoNB}
                rows={latestInstances ? latestInstances : []}
                components={{
                    Toolbar: GridToolbar,
                }}
                onCellDoubleClick={(params, event) => {
                    if (!event.ctrlKey) {
                        event.defaultMuiPrevented = true;
                        getEventsWithInstanceId(params.row.instanceFlowHeaders.sourceApplicationId, params.row.instanceFlowHeaders.sourceApplicationInstanceId)
                    }
                }}
                rowThreshold={0}
                initialState={{
                    pagination: {
                        pageSize: 20,
                    },
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

export default InstanceTable;
