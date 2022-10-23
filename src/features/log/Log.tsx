import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import {withRouter} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {IEvent} from "./types/Event";

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    IconButton,
    Typography
} from "@mui/material";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import moment from "moment";
import {DataGrid, GridCellParams, GridColumns, GridToolbar} from "@mui/x-data-grid";
import {gridLocaleNoNB} from "../util/locale/gridLocaleNoNB";
import { useTranslation } from 'react-i18next';
import {stringReplace} from "../util/StringUtil";
import {ErrorType} from "./types/ErrorType";
import {HistoryContext} from "../../context/historyContext";

function Log() {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.log'})
    const [selectedRow, setSelectedRow] = useState<IEvent>();
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {setOpen(true);};
    const handleClose = () => {setOpen(false);};
    const {events, getEvents} = useContext(HistoryContext)


    const columns: GridColumns = [
        { field: 'id', hide: true, type: 'string', headerName: 'id', flex: 0.5 },
        { field: 'details', headerName: 'Detaljer', flex: 0.2, sortable: false, filterable: false,
            renderCell: (params) => ( <CustomDialogToggle row={params.row} />)},
        { field: 'type', type: 'string', headerName: 'Type', flex: 0.5 },
        { field: 'timestamp', type: 'string', headerName: 'Tidspunkt', flex: 1,
            valueGetter: (params) => moment(params.row.timestamp as string).format('YYYY/MM/DD HH:mm')
        },
        { field: 'sourceApplicationIntegrationId', type: 'string', headerName: 'Skjema', flex: 1,
            valueGetter: (params) => params.row.instanceFlowHeaders.sourceApplicationIntegrationId}
    ];


    useEffect(()=> {
        getEvents(0, 100, "timestamp", "DESC");
    }, []);

    return (
        <Box sx={{ width: 1, height: 900 }}>
            <Typography>{t('header')}</Typography>
            <AlertDialog row={selectedRow}/>
            <DataGrid
                columns={columns}
                loading={events == undefined}
                density='compact'
                localeText={gridLocaleNoNB}
                rows={events? events : []}
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
                                    columnField: 'sourceApplicationIntegrationId',
                                    operatorValue: 'contains'
                                },
                            ],
                        },
                    },
                }}
            />
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

export default withRouter(Log);
