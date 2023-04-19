import {Box, Button, Dialog, DialogActions, DialogContent, IconButton, Theme} from "@mui/material";
import {DataGrid, GridCellParams, GridColumns, GridToolbar} from "@mui/x-data-grid";
import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {gridLocaleNoNB} from "../../util/locale/gridLocaleNoNB";
import {useTranslation} from "react-i18next";
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import moment from "moment";
import {HistoryContext} from "../../../context/historyContext";
import InstanceRepository from "../repository/InstanceRepository";
import {getSourceApplicationDisplayName} from "../../configuration/defaults/DefaultValues";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Stack from "@mui/material/Stack";
import {stringReplace} from "../../util/StringUtil";
import {ErrorType} from "../../log/types/ErrorType";
import {IEvent} from "../../log/types/Event";
import {SourceApplicationContext} from "../../../context/sourceApplicationContext";
import RefreshIcon from '@mui/icons-material/Refresh';
import {ClassNameMap} from "@mui/styles";

const InstanceTable: React.FunctionComponent<any> = (props: { classes: ClassNameMap }) => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.instanceOverview'})
    let history = useHistory();
    const classes = props.classes;
    const {latestInstances, getLatestInstances, getSelectedInstances} = useContext(HistoryContext)
    const {sourceApplication} = useContext(SourceApplicationContext)
    const [selectedRow, setSelectedRow] = useState<IEvent>();
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const errorsNotForRetry: string[] = ['instance-receival-error', 'instance-registration-error']

    const columns: GridColumns = [
        {field: 'id', hide: true, type: 'string', headerName: 'id', minWidth: 150, flex: 0.5},
        {
            field: 'sourceApplicationId',
            type: 'string',
            headerName: t('table.columns.sourceApplicationId'),
            minWidth: 150,
            flex: 1,
            valueGetter: (params) => getSourceApplicationDisplayName(params.row.instanceFlowHeaders.sourceApplicationId)
        },
        {
            field: 'sourceApplicationIntegrationId',
            type: 'string',
            headerName: t('table.columns.sourceApplicationIntegrationId'),
            minWidth: 250,
            flex: 1,
            valueGetter: (params) => params.row.instanceFlowHeaders.sourceApplicationIntegrationId
        },
        {
            field: 'displayName',
            type: 'string',
            headerName: t('table.columns.sourceApplicationIntegrationIdDisplayName'),
            minWidth: 500,
            flex: 1,
            sortable: false
        },
        {
            field: 'sourceApplicationInstanceId',
            type: 'string',
            headerName: t('table.columns.sourceApplicationInstanceId'),
            minWidth: 200,
            flex: 1,
            valueGetter: (params) => params.row.instanceFlowHeaders.sourceApplicationInstanceId
        },
        {
            field: 'configurationId',
            type: 'string',
            headerName: t('table.columns.configurationId'),
            minWidth: 150,
            flex: 1,
            valueGetter: (params) => params.row.instanceFlowHeaders.configurationId
        },
        {
            field: 'archiveInstanceId',
            type: 'string',
            headerName: t('table.columns.archiveInstanceId'),
            minWidth: 150,
            flex: 1,
            valueGetter: (params) => params.row.instanceFlowHeaders.archiveInstanceId
        },
        {
            field: 'timestamp', type: 'dateTime', headerName: t('table.columns.timestamp'), minWidth: 200, flex: 1,
            valueGetter: (params) => moment(params.row.timestamp).format('YYYY/MM/DD HH:mm:ss.SSS'),
        },
        {
            field: 'name', type: 'string', headerName: t('table.columns.name'), minWidth: 250, flex: 3,
            renderCell: params => (<CustomCellRender row={params.row}/>)
        },
        {
            field: 'details',
            headerName: t('table.columns.details'),
            minWidth: 150,
            flex: 1,
            sortable: false,
            filterable: false,
            renderCell: (params) => (<CustomErrorDialogToggle row={params.row}/>)
        },
        {
            field: 'actions',
            headerName: t('table.columns.actions'),
            minWidth: 150,
            flex: 1,
            sortable: false,
            filterable: false,
            renderCell: (params) => (<CustomButtonToggle row={params.row}/>)
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
        //TODO: add notification on successful or failed resending
        InstanceRepository.resendInstance(instanceId)
            .then(response => {
                console.log('resend instance', response)
            })
            .catch(e => {
                console.error(e)
            })
    }

    useEffect(() => {
        getLatestInstances(0, 10000, "timestamp", "DESC", sourceApplication ? sourceApplication.toString() : "2");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getEventsWithInstanceId = (sourceApplicationID: string, instanceId: string) => {
        getSelectedInstances(0, 10000, "timestamp", "DESC", sourceApplicationID, instanceId)
        setHistory();
    }

    function CustomButtonToggle(props: GridCellParams["row"]) {
        const hasErrors: boolean = (props.row.type === 'ERROR') && !errorsNotForRetry.includes(props.row.name)
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
        <Box>
            <AlertDialog row={selectedRow}/>
            <Button
                sx={{mb: 2}}
                variant='contained'
                onClick={() => getLatestInstances(0, 10000, "timestamp", "DESC",
                    sourceApplication ? sourceApplication.toString() : "2")}
                endIcon={<RefreshIcon/>}
            >{t('button.refresh')}
            </Button>
            <Box display="flex" position="relative" width={1} height={1}>
                <Box id="instance-list" className={classes.dataGridBox}>
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
                                sortModel: [{field: 'timestamp', sort: 'desc'}],
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
            </Box>

        </Box>
    );

    function CustomErrorDialogToggle(props: GridCellParams["row"]) {
        const hasErrors: boolean = (props.row.type === 'ERROR')
        return (
            <>
                {hasErrors &&
                    <IconButton
                        id={props.row.id}
                        size="small"
                        onClick={() => {
                            setSelectedRow(props.row);
                            handleClickOpen()
                        }}
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
                            <Stack id={props.row.type + `-panel`}
                                   sx={{
                                       py: 2,
                                       boxSizing: 'border-box',
                                       height: ((theme: Theme) => theme.spacing(44)),
                                       minWidth: ((theme: Theme) => theme.spacing(112))
                                   }}
                                   direction="column">
                                <Stack direction="column" sx={{height: 1}}>
                                    <DataGrid
                                        density="compact"
                                        columns={[
                                            {
                                                field: 'errorMessage',
                                                headerName: t('table.columns.errorMessage'),
                                                type: 'string',
                                                width: 2500,
                                                valueGetter: (params) => {
                                                    return (stringReplace(t(params.row.errorCode), [
                                                        {
                                                            type: ErrorType.INSTANCE_FIELD_KEY,
                                                            value: params.row.args.instanceFieldKey
                                                        },
                                                        {type: ErrorType.FIELD_PATH, value: params.row.args.fieldPath},
                                                        {
                                                            type: ErrorType.ERROR_MESSAGE,
                                                            value: params.row.args.errorMessage
                                                        },
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
