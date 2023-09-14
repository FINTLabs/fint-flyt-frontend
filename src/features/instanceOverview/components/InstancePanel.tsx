import * as React from "react";
import {useContext, useState} from "react";
import {useTranslation} from "react-i18next";
import {DataGrid, GridCellParams, GridColumns, GridToolbar} from "@mui/x-data-grid";
import moment from "moment/moment";
import {Box, Button, Dialog, DialogActions, DialogContent, IconButton} from "@mui/material";
import {gridLocaleNoNB} from "../../../util/locale/gridLocaleNoNB";
import {HistoryContext} from "../../../context/historyContext";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import {IEvent} from "../types/Event";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {getSourceApplicationDisplayName} from "../../configuration/defaults/DefaultValues";
import {useHistory} from "react-router-dom";
import {ClassNameMap} from "@mui/styles";
import DialogContentComponent from "./DialogContentComponent";

type Props = {
    classes: ClassNameMap
}

const InstancePanel: React.FunctionComponent<Props> = (props: Props) => {
    const {t, i18n} = useTranslation('translations', {keyPrefix: 'pages.instanceOverview'});
    const classes = props.classes;
    const history = useHistory();
    const {selectedInstances} = useContext(HistoryContext)
    const [selectedRow, setSelectedRow] = useState<IEvent>();
    const [openErrorDialog, setOpenErrorDialog] = React.useState(false);

    const columns: GridColumns = [
        {field: 'id', hide: true, type: 'string', headerName: 'id', minWidth: 150, flex: 0.5},
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
            flex: 1
        },
        {
            field: 'timestamp',
            type: 'dateTime',
            headerName: t('table.columns.timestampLatest'),
            description: t('table.columns.timestampLatest'),
            minWidth: 150,
            flex: 2,
            valueGetter: (params) => moment(params.row.timestamp).format('YYYY/MM/DD HH:mm.ss'),
            sortComparator: (v1, v2, row1: any, row2: any) => { // eslint-disable-line
                const timestamp1 = new Date(row1.timestamp).getTime();
                const timestamp2 = new Date(row2.timestamp).getTime();
                return timestamp1 - timestamp2;
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
            renderCell: (params) => (<CustomDialogToggle row={params.row}/>)
        },
        {
            field: 'archiveInstanceId',
            type: 'string',
            headerName: t('table.columns.archiveInstanceId'),
            description: t('table.columns.archiveInstanceId'),
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
        },
        {
            field: 'sourceApplicationId',
            type: 'string',
            headerName: t('table.columns.sourceApplicationId'),
            minWidth: 150,
            flex: 1,
            valueGetter: (params) => getSourceApplicationDisplayName(params.row.instanceFlowHeaders.sourceApplicationId)
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

    return (
        <Box>
            <ErrorAlertDialog row={selectedRow}/>
            <Button
                id={'back-button'}
                sx={{mb: 2}}
                variant='contained'
                onClick={() => history.push("integration/instance/list")}
            >{t('button.back')}
            </Button>
            <Box display="flex" position="relative" width={1} height={1}>
                <Box id="instance-panel" className={classes.dataPanelBox}>
                    <DataGrid
                        loading={selectedInstances === undefined}
                        localeText={i18n.language === 'no' ? gridLocaleNoNB : undefined}
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
                                sortModel: [{field: 'timestamp', sort: 'desc'}],
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
                            setOpenErrorDialog(true)
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
            <Dialog
                open={openErrorDialog}
                fullWidth={true}
                maxWidth={"md"}
                onClose={() => setOpenErrorDialog(false)}
            >
                <DialogContent>
                    <DialogContentComponent row={props.row}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenErrorDialog(false)} autoFocus>{t('button.close')}</Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default InstancePanel;
