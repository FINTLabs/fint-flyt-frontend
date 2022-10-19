import {Box, Button, Typography} from "@mui/material";
import {DataGrid, GridCellParams, GridColumns, GridToolbar} from "@mui/x-data-grid";
import * as React from "react";
import {useHistory} from "react-router-dom";
import {gridLocaleNoNB} from "../../util/locale/gridLocaleNoNB";
import {useTranslation} from "react-i18next";

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
        { field: 'timestamp', type: 'string', headerName: 'Sist hendelse', flex: 2,
            valueGetter: (params) => moment(params.row.timestamp).format('YYYY/MM/DD HH:mm')
        },
        { field: 'name', type: 'string', headerName: 'Status', flex: 2, valueGetter: params => t(params.row.name)},
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

    const  resend = (event: any, instanceId: string) => {
        //TODO: add notifatication on successful or failed resending
        InstanceRepository.resendInstance(instanceId)
            .then(response => {
                console.log('resend instance', response)
            })
            .catch(e => {console.error(e)})
    }

    useEffect(()=> {
        getLatestInstances();
    }, []);

    const getEventsWithInstanceId = (sourceApplicationID: string, instanceId: string) => {
        getSelectedInstances(sourceApplicationID, instanceId)
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
