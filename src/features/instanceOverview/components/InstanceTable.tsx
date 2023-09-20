import {Box, Button, Dialog, DialogActions, DialogContent, IconButton} from "@mui/material";
import {DataGrid, GridCellParams, GridColumns, GridToolbar} from "@mui/x-data-grid";
import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {gridLocaleNoNB} from "../../../util/locale/gridLocaleNoNB";
import {useTranslation} from "react-i18next";
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import moment from "moment";
import {HistoryContext} from "../../../context/historyContext";
import InstanceRepository from "../repository/InstanceRepository";
import {getSourceApplicationDisplayName} from "../../configuration/defaults/DefaultValues";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import {IEvent} from "../types/Event";
import {SourceApplicationContext} from "../../../context/sourceApplicationContext";
import RefreshIcon from '@mui/icons-material/Refresh';
import {ClassNameMap} from "@mui/styles";
import DialogContentComponent from "./DialogContentComponent";

type Props = {
    classes: ClassNameMap
}

const InstanceTable: React.FunctionComponent<Props> = (props: Props) => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.instanceOverview'})
    const history = useHistory();
    const classes = props.classes;
    const {latestInstances, getLatestInstances, getSelectedInstances} = useContext(HistoryContext)
    const {sourceApplication} = useContext(SourceApplicationContext)
    const [selectedRow, setSelectedRow] = useState<IEvent>();
    const [openDialog, setOpenDialog] = React.useState(false);

    const errorsNotForRetry: string[] = ['instance-receival-error', 'instance-registration-error']

    const columns: GridColumns = [
        {
            field: 'show',
            headerName: t('table.columns.show'),
            description: t('table.columns.showDescription'),
            minWidth: 150,
            flex: 0.5,
            sortable: false,
            filterable: false,
            renderCell: (params) => (<ShowButtonToggle row={params.row}/>)
        },
        {field: 'id', hide: true, type: 'string', headerName: 'id', minWidth: 150, flex: 0.5},
        {
            field: 'sourceApplicationId',
            type: 'string',
            headerName: t('table.columns.sourceApplicationId'),
            description: t('table.columns.sourceApplicationId'),
            minWidth: 150,
            flex: 1,
            valueGetter: (params) => getSourceApplicationDisplayName(params.row.instanceFlowHeaders.sourceApplicationId)
        },
        {
            field: 'sourceApplicationIntegrationId',
            type: 'string',
            headerName: t('table.columns.sourceApplicationIntegrationId'),
            description: t('table.columns.sourceApplicationIntegrationIdDescription'),
            minWidth: 150,
            flex: 1,
            valueGetter: (params) => params.row.instanceFlowHeaders.sourceApplicationIntegrationId
        },
        {
            field: 'displayName',
            type: 'string',
            headerName: t('table.columns.sourceApplicationIntegrationIdDisplayName'),
            description: t('table.columns.sourceApplicationIntegrationIdDisplayName'),
            minWidth: 300,
            flex: 1,
            sortable: false
        },
        {
            field: 'timestamp', type: 'dateTime', headerName: t('table.columns.timestamp'), description: t('table.columns.timestamp'), minWidth: 150, flex: 1,
            valueGetter: (params) => moment(params.row.timestamp).format('DD/MM/YY HH:mm'),
            sortComparator: (v1, v2, row1: any, row2: any) => { // eslint-disable-line
                if (row1 && row2 && row1.timestamp && row2.timestamp) {
                    const timestamp1 = new Date(row1.timestamp).getTime();
                    const timestamp2 = new Date(row2.timestamp).getTime();
                    return timestamp1 - timestamp2;
                }
                return -1
            },
        },
        {
            field: 'name', type: 'string', headerName: t('table.columns.name'), description: t('table.columns.name'), minWidth: 250, flex: 3,
            renderCell: params => (<CustomCellRender row={params.row}/>)
        },
        {
            field: 'details',
            headerName: t('table.columns.details'),
            description: t('table.columns.detailsDescription'),
            minWidth: 100,
            flex: 1,
            sortable: false,
            filterable: false,
            renderCell: (params) => (<CustomErrorDialogToggle row={params.row}/>)
        },
        {
            field: 'actions',
            headerName: t('table.columns.actions'),
            description: t('table.columns.actionsDescription'),
            minWidth: 150,
            flex: 1,
            sortable: false,
            filterable: false,
            renderCell: (params) => (<CustomButtonToggle row={params.row}/>)
        },
        {
            field: 'archiveInstanceId',
            type: 'string',
            headerName: t('table.columns.archiveInstanceId'),
            description: t('table.columns.archiveInstanceIdDescription'),
            minWidth: 150,
            flex: 1,
            valueGetter: (params) => params.row.instanceFlowHeaders.archiveInstanceId
        },
        {
            field: 'sourceApplicationInstanceId',
            type: 'string',
            headerName: t('table.columns.sourceApplicationInstanceId'),
            description: t('table.columns.sourceApplicationInstanceId'),
            minWidth: 200,
            flex: 1,
            valueGetter: (params) => params.row.instanceFlowHeaders.sourceApplicationInstanceId
        },
        {
            field: 'configurationId',
            type: 'string',
            headerName: t('table.columns.configurationId'),
            description: t('table.columns.configurationId'),
            minWidth: 150,
            flex: 1,
            valueGetter: (params) => params.row.instanceFlowHeaders.configurationId
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

    const resend = (instanceId: string) => {
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

    function ShowButtonToggle(props: GridCellParams["row"]): JSX.Element {
        return <Button
            size="small"
            variant="contained"
            onClick={() => {
                getEventsWithInstanceId(props.row.instanceFlowHeaders.sourceApplicationId, props.row.instanceFlowHeaders.sourceApplicationInstanceId)
            }}
        >{t('button.show')}
        </Button>
    }

    function CustomButtonToggle(props: GridCellParams["row"]) {
        const hasErrors: boolean = (props.row.type === 'ERROR') && !errorsNotForRetry.includes(props.row.name)
        return (
            <>
                {hasErrors &&
                    <Button id={'retry-btn-' + props.row.id} size="small" variant="outlined" onClick={() => {
                        resend(props.row.instanceFlowHeaders.instanceId);
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
            <ErrorAlertDialog row={selectedRow}/>
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
                        id={'error-dialog-btn-' + props.row.id}
                        size="small"
                        onClick={() => {
                            setSelectedRow(props.row);
                            setOpenDialog(true)
                        }}
                        tabIndex={-1}>
                        <OpenInNewIcon id={props.row.id + `-icon`} fontSize="inherit"/>
                    </IconButton>
                }
            </>
        );
    }

    function ErrorAlertDialog(props: GridCellParams['row']) {
        return (
            <div>
                <Dialog
                    open={openDialog}
                    fullWidth={true}
                    maxWidth={"md"}
                    onClose={() => setOpenDialog(false)}
                >
                    <DialogContent>
                        <DialogContentComponent row={props.row}/>
                    </DialogContent>
                    <DialogActions>
                        <Button id={'error-dialog-close-btn'} onClick={() => setOpenDialog(false)}
                                autoFocus>{t('button.close')}</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }

}

export default InstanceTable;
