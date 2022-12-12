import * as React from "react";
import {useTranslation} from "react-i18next";
import {DataGrid, GridCellParams, GridColumns, GridToolbar} from "@mui/x-data-grid";
import moment from "moment/moment";
import {Box, Button, Dialog, DialogActions, DialogContent, IconButton} from "@mui/material";
import {gridLocaleNoNB} from "../../util/locale/gridLocaleNoNB";
import {useContext, useState} from "react";
import {HistoryContext} from "../../../context/historyContext";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Stack from "@mui/material/Stack";
import {stringReplace} from "../../util/StringUtil";
import {ErrorType} from "../../log/types/ErrorType";
import {IEvent} from "../../log/types/Event";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {getSourceApplicationDisplayName} from "../../integration/defaults/DefaultValues";

const InstancePanel: React.FunctionComponent<any> = (props) => {
    const { t, i18n } = useTranslation('translations', { keyPrefix: 'pages.instanceOverview'});
    const classes = props.classes;
    const {selectedInstances} = useContext(HistoryContext)
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
        { field: 'displayName', type: 'string', headerName: t('table.columns.sourceApplicationIntegrationIdDisplayName'), minWidth: 500, flex: 1 },
        { field: 'sourceApplicationInstanceId', type: 'string', headerName: t('table.columns.sourceApplicationInstanceId'), minWidth: 200, flex: 1,
            valueGetter: (params) => params.row.instanceFlowHeaders.sourceApplicationInstanceId
        },
        { field: 'configurationId', type: 'string', headerName: t('table.columns.configurationId'), minWidth: 150, flex: 1,
            valueGetter: (params) => params.row.instanceFlowHeaders.configurationId
        },
        { field: 'archiveInstanceId', type: 'string', headerName: t('table.columns.archiveInstanceId'), minWidth: 150, flex: 1,
            valueGetter: (params) => params.row.instanceFlowHeaders.archiveInstanceId
        },
        { field: 'timestamp', type: 'dateTime', headerName: t('table.columns.timestampLatest'), minWidth: 200, flex: 2,
            valueGetter: (params) => moment(params.row.timestamp).format('YYYY/MM/DD HH:mm:ss.SSS')
        },
        { field: 'name', type: 'string', headerName: t('table.columns.name'), minWidth: 250, flex: 3,
            renderCell: params => ( <CustomCellRender row={params.row} />)
        },
        { field: 'details', headerName: t('table.columns.details'), minWidth: 150, flex: 1, sortable: false, filterable: false,
            renderCell: (params) => ( <CustomDialogToggle row={params.row} />)},

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

    return (
        <Box>
            <Box display="flex" position="relative" width={1} height={1}>
                <Box id="integration-list" className={classes.dataPanelBox}>
                    <AlertDialog row={selectedRow}/>
                    <DataGrid
                        loading={props.loading}
                        localeText={i18n.language === 'no' ? gridLocaleNoNB : undefined}
                        //getRowId={(row) => row.configurationId}
                        density='compact'
                        rows={selectedInstances ? selectedInstances : []}
                        columns={columns}
                        pageSize={20}
                        rowsPerPageOptions={[20]}
                        components={{
                            Toolbar: GridToolbar,
                        }}
                        initialState={{
                            sorting: {
                                sortModel: [{ field: 'timestamp', sort: 'desc' }],
                            },
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
        </Box>
    );

    function CustomDialogToggle(props: GridCellParams["row"]) {
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

export default InstancePanel;
