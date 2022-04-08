import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import {
    DataGridPro,
    GRID_DETAIL_PANEL_TOGGLE_COL_DEF,
    gridDetailPanelExpandedRowsContentCacheSelector,
    useGridApiContext,
    GridColumns,
    GridRenderCellParams,
    useGridSelector
} from '@mui/x-data-grid-pro';
import {withRouter} from "react-router-dom";
import {useEffect, useState} from "react";
import {IEvent} from "./types/Event";
import EventRepository from "./repository/EventRepository";
import {noNB} from "../util/locale/noNB";
import {addId} from "../util/JsonUtil";
import {IconButton} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import moment from "moment";

// @ts-ignore
function DetailPanelContent({ row: rowProp }) {
    return (
        <Stack sx={{ py: 2, height: 1, boxSizing: 'border-box' }} direction="column">
                <Stack direction="column" sx={{ height: 1 }}>
                    <DataGridPro
                        disableColumnPinning={false}
                        disableChildrenFiltering={false}
                        disableRowGrouping={false}
                        defaultGroupingExpansionDepth={0}
                        disableChildrenSorting={false}
                        rowGroupingColumnMode='single'
                        scrollEndThreshold={80}
                        treeData={false}
                        density="compact"
                        columns={[
                            { field: 'args', headerName: 'Feilmelding', type: 'string', minWidth: 200,
                                valueGetter: (params) => `${params.row.args.arg0 || ''} ${params.row.args.arg1 || ''}`
                            },
                        ]}
                        rows={rowProp.errors}
                        getRowId={(row) => row.errorCode}
                        sx={{ flex: 1 }}
                        hideFooter
                    />
                </Stack>
        </Stack>
    );
}
const columns2: GridColumns = [
    { field: 'id', hide: true, type: 'number', headerName: 'id', flex: 0.5 },
    {...GRID_DETAIL_PANEL_TOGGLE_COL_DEF, headerName: 'Detaljer', flex: 0.5,
        renderCell: (params) => ( <CustomDetailPanelToggle id={params.id} value={params.value} row={params.row} />),
    },
    { field: 'type', type: 'string', headerName: 'Type', flex: 0.5 },
    { field: 'timestamp', type: 'string', headerName: 'Tidspunkt', flex: 1,
        valueGetter: (params) => moment(params.row.timestamp).format('DD/MM/YY HH:mm')
    },
    { field: 'name', type: 'string', headerName: 'Navn', flex: 1 },
    { field: 'sourceApplicationIntegrationId', type: 'string', headerName: 'Skjema', flex: 1,
        valueGetter: (params) => params.row.skjemaEventHeaders.sourceApplicationIntegrationId
    },
    { field: 'sourceApplication', type: 'string', headerName: 'SkjemaLeverandør', flex: 1,
        valueGetter: (params) => params.row.skjemaEventHeaders.sourceApplication
    }
];

function CustomDetailPanelToggle(props: Pick<GridRenderCellParams, 'id' | 'value' | 'row'>) {
    const { id, value: isExpanded, row } = props;
    const hasErrors: boolean = row.errors.length > 0;
    const apiRef = useGridApiContext();
    const contentCache = useGridSelector(apiRef, gridDetailPanelExpandedRowsContentCacheSelector);
    const hasDetail = React.isValidElement(contentCache[id]);

    return (
        <>
            {hasErrors && <IconButton
                size="small"
                tabIndex={-1}
                disabled={!hasDetail}
                aria-label={isExpanded ? 'Close' : 'Open'}
            >
                <ExpandMoreIcon
                    sx={{
                        transform: `rotateZ(${isExpanded ? 180 : 0}deg)`,
                        transition: (theme) =>
                            theme.transitions.create('transform', {
                                duration: theme.transitions.duration.shortest,
                            }),
                    }}
                    fontSize="inherit"
                />
            </IconButton>}
        </>
    );
}

function Log() {
    const [allEvents, setAllEvents] = useState<IEvent[]>([]);
    useEffect(()=> {
        getAllEvents();
    }, []);

    const getAllEvents = () => {
        EventRepository.getEvents()
            .then((response) => {
                let data = response.data;
                data.forEach(addId(0, 'name'))
                data.forEach((event: any) =>
                   event.errors.forEach(addId(0, 'errorCode'))
                );
                setAllEvents(data);
            })
            .catch(e => console.error('Error: ', e))
    }

    const getDetailPanelContent = React.useCallback(
        ({ row }) => row.errors.length > 0 ? <DetailPanelContent row={row}/> : null,
        [],
    );

    const getDetailPanelHeight = React.useCallback(() => 300, []);

    return (
        <Box sx={{ width: 1, height: 1200 }}>
            <DataGridPro
                columns={columns2}
                localeText={noNB}
                rows={allEvents}
                rowThreshold={0}
                getDetailPanelHeight={getDetailPanelHeight}
                getDetailPanelContent={getDetailPanelContent}
                disableColumnPinning={false}
                disableChildrenFiltering={false}
                disableRowGrouping={false}
                defaultGroupingExpansionDepth={0}
                disableChildrenSorting={false}
                rowGroupingColumnMode='single'
                scrollEndThreshold={80}
                treeData={false}
            />
        </Box>
    );
}

export default withRouter(Log);