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

const InstancePanel: React.FunctionComponent<any> = (props) => {
    const { t, i18n } = useTranslation('translations', { keyPrefix: 'pages.instanceOverview'});
    const classes = props.classes;
    const {selectedInstances} = useContext(HistoryContext)
    const [selectedRow, setSelectedRow] = useState<IEvent>();
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {setOpen(true);};
    const handleClose = () => {setOpen(false);};

    const columns: GridColumns = [
        { field: 'id', hide: true, type: 'string', headerName: 'id', flex: 0.5 },
        { field: 'sourceApplicationInstanceId', type: 'string', headerName: 'Kilde instans ID', flex: 1,
            valueGetter: (params) => params.row.instanceFlowHeaders.sourceApplicationInstanceId
        },
        { field: 'timestamp', type: 'string', headerName: 'Sist hendelse', flex: 1,
            valueGetter: (params) => moment(params.row.timestamp).format('YYYY/MM/DD HH:mm:ss.sss')
        },
        { field: 'name', type: 'string', headerName: 'Status', flex: 2, valueGetter: params => t(params.row.name)},
        { field: 'details', headerName: 'Detaljer', flex: 0.5, sortable: false, filterable: false,
            renderCell: (params) => ( <CustomDialogToggle row={params.row} />)},
        { field: 'sourceApplication', type: 'string', headerName: 'Kildeapplikasjon', flex: 1,
            valueGetter: (params) => params.row.instanceFlowHeaders.sourceApplication
        },
        { field: 'sourceApplicationIntegrationId', type: 'string', headerName: 'Skjema', flex: 1,
            valueGetter: (params) => params.row.instanceFlowHeaders.sourceApplicationIntegrationId
        },
        { field: 'archiveCaseId', type: 'string', headerName: 'Arkivsak ID', flex: 1,
            valueGetter: (params) => params.row.instanceFlowHeaders.archiveCaseId
        },
        { field: 'configurationId', type: 'string', headerName: 'Konfigurasjon ID', flex: 1,
            valueGetter: (params) => params.row.instanceFlowHeaders.configurationId
        }
    ];

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
                                            { field: 'errorMessage', headerName: t('table.columns.errorMessage'), type: 'string', flex: 2,
                                                //TODO: 01/09-22 fix translation file with corresponding error codes
                                                valueGetter: (params) => {
                                                    return (stringReplace(t(params.row.errorCode),  [
                                                        {type: ErrorType.MAPPING_FIELD, value: params.row.args.mappingField},
                                                        {type: ErrorType.CONFIGURATION_FIELD, value: params.row.args.configurationField},
                                                        {type: ErrorType.INSTANCE_FIELD, value: params.row.args.instanceField},
                                                        {type: ErrorType.STATUS, value: params.row.args.status},
                                                        {type: ErrorType.FIELD_PATH, value: params.row.args.fieldPath},
                                                        {type: ErrorType.ERROR_MESSAGE, value: params.row.args.errorMessage}
                                                    ]))
                                                }
                                            }
                                        ]}
                                        rows={props.row.errors}
                                        sx={{ flex: 1 }}
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
