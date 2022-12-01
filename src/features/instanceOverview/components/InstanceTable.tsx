import {Box, Button, Dialog, DialogActions, DialogContent, IconButton, Typography} from "@mui/material";
import {DataGrid, GridCellParams, GridColumns, GridToolbar} from "@mui/x-data-grid";
import * as React from "react";
import {useHistory} from "react-router-dom";
import {gridLocaleNoNB} from "../../util/locale/gridLocaleNoNB";
import {useTranslation} from "react-i18next";
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import moment from "moment";
import {useContext, useEffect, useState} from "react";
import {HistoryContext} from "../../../context/historyContext";
import InstanceRepository from "../repository/InstanceRepository";
import {getSourceApplicationDisplayName} from "../../integration/defaults/DefaultValues";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Stack from "@mui/material/Stack";
import {stringReplace} from "../../util/StringUtil";
import {ErrorType} from "../../log/types/ErrorType";
import {IEvent} from "../../log/types/Event";
import {SourceApplicationContext} from "../../../context/sourceApplicationContext";

const InstanceTable: React.FunctionComponent<any> = (props) => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.instanceOverview'})
    let history = useHistory();
    const {latestInstances, getLatestInstances, getSelectedInstances} = useContext(HistoryContext)
    const {sourceApplication} = useContext(SourceApplicationContext)
    const [selectedRow, setSelectedRow] = useState<IEvent>();
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {setOpen(true);};
    const handleClose = () => {setOpen(false);};

    const columns: GridColumns = [
        { field: 'id', hide: true, type: 'string', headerName: 'id', minWidth: 150, flex: 0.5 },
        { field: 'sourceApplicationId', type: 'string', headerName: t('table.columns.sourceApplicationId'), minWidth: 150, flex: 1,
            valueGetter: (params) => getSourceApplicationDisplayName(params.row.instanceFlowHeaders.sourceApplicationId)
        },
        { field: 'sourceApplicationIntegrationId', type: 'string', headerName: t('table.columns.sourceApplicationIntegrationId'), minWidth: 250, flex: 1,
            valueGetter: (params) => params.row.instanceFlowHeaders.sourceApplicationIntegrationId
        },
        { field: 'displayName', type: 'string', headerName: t('table.columns.sourceApplicationIntegrationIdDisplayName'), minWidth: 150, flex: 1, sortable: false },
        { field: 'sourceApplicationInstanceId', type: 'string', headerName: t('table.columns.sourceApplicationInstanceId'), minWidth: 200, flex: 1,
            valueGetter: (params) => params.row.instanceFlowHeaders.sourceApplicationInstanceId
        },
        { field: 'configurationId', type: 'string', headerName: t('table.columns.configurationId'), minWidth: 150, flex: 1,
            valueGetter: (params) => params.row.instanceFlowHeaders.configurationId
        },
        { field: 'archiveInstanceId', type: 'string', headerName: t('table.columns.archiveInstanceId'), minWidth: 150, flex: 1,
            valueGetter: (params) => params.row.instanceFlowHeaders.archiveInstanceId
        },
        { field: 'timestamp', type: 'dateTime', headerName: t('table.columns.timestamp'), minWidth: 200, flex: 1,
            valueGetter: (params) => moment(params.row.timestamp).format('YYYY/MM/DD HH:mm:ss.SSS'),
        },
        { field: 'name', type: 'string', headerName: t('table.columns.name'), minWidth: 400, flex: 3,
            renderCell: params => ( <CustomCellRender row={params.row} />)
        },
        { field: 'details', headerName: t('table.columns.details'), minWidth: 150, flex: 1, sortable: false, filterable: false,
            renderCell: (params) => ( <CustomErrorDialogToggle row={params.row} />)
        },
        { field: 'actions', headerName: t('table.columns.actions'), minWidth: 150, flex: 1, sortable: false, filterable: false,
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

    const resend = (event: any, instanceId: string) => {
        //TODO: add notifatication on successful or failed resending
        InstanceRepository.resendInstance(instanceId)
            .then(response => {
                console.log('resend instance', response)
            })
            .catch(e => {console.error(e)})
    }

    useEffect(()=> {
        getLatestInstances(0, 10000, "timestamp", "DESC", sourceApplication.toString());
    }, []);

    const getEventsWithInstanceId = (sourceApplicationID: string, instanceId: string) => {
        getSelectedInstances(0, 10000, "timestamp", "DESC", sourceApplicationID, instanceId)
        setHistory();
    }

    function CustomButtonToggle(props: GridCellParams["row"]) {
        const hasErrors: boolean = (props.row.type === 'ERROR') && (props.row.name !== 'instance-receival-error' || props.row.name !== 'instance-registration-error');
        return (
            <>
                {hasErrors &&
                    <Button size="small" variant="outlined" onClick={(e) => {
                        resend(e, props.row.instanceFlowHeaders.instanceId);
                    }}>{t('button.retry')}</Button>
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
            <AlertDialog row={selectedRow}/>
            <DataGrid
                loading={!latestInstances}
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

    function CustomErrorDialogToggle(props: GridCellParams["row"]) {
        const hasErrors: boolean = props.row.errors.length > 0;
        return (
            <>
                {hasErrors &&
                    <IconButton
                        id={props.row.id}
                        size="small"
                        onClick={() => {
                            setSelectedRow(props.row);
                            handleClickOpen()}}
                        tabIndex={-1}>
                        <OpenInNewIcon id={props.row.id + `-icon`} fontSize="inherit"/>
                    </IconButton>
                }
            </>
        );
    }

    function AlertDialog(props: any) {
        return (
            <div>
                <Dialog
                    open={open}
                    fullWidth={true}
                    maxWidth={"lg"}
                    onClose={handleClose}
                >
                    <DialogContent>
                        {selectedRow &&
                            <Stack id={props.row.type+ `-panel`} sx={{ py: 2, boxSizing: 'border-box', height: '350px', minWidth: '900px' }} direction="column">
                                <Stack direction="column" sx={{ height: 1 }}>
                                    <DataGrid
                                        density="compact"
                                        columns={[
                                            { field: 'errorMessage', headerName: t('table.columns.errorMessage'), type: 'string', width: 2500,
                                                valueGetter: (params) => {
                                                    return (stringReplace(t(params.row.errorCode),  [
                                                        {type: ErrorType.INSTANCE_FIELD_KEY, value: params.row.args.instanceFieldKey},
                                                        {type: ErrorType.FIELD_PATH, value: params.row.args.fieldPath},
                                                        {type: ErrorType.ERROR_MESSAGE, value: params.row.args.errorMessage},
                                                    ]))
                                                }
                                            }
                                        ]}
                                        rows={props.row.errors}
                                        hideFooter
                                    />
                                </Stack>
                            </Stack>}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} autoFocus>{t('button.close')}</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default InstanceTable;
