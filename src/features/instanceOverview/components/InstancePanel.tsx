import * as React from "react";
import {useTranslation} from "react-i18next";
import {DataGrid, GridColumns, GridToolbar} from "@mui/x-data-grid";
import moment from "moment/moment";
import {Box} from "@mui/material";
import {gridLocaleNoNB} from "../../util/locale/gridLocaleNoNB";
import {useContext} from "react";
import {HistoryContext} from "../../../context/historyContext";

const InstancePanel: React.FunctionComponent<any> = (props) => {
    const { t, i18n } = useTranslation('translations', { keyPrefix: 'pages.instanceOverview'});
    const classes = props.classes;
    const {selectedInstances} = useContext(HistoryContext)


    const columns: GridColumns = [
        { field: 'id', hide: true, type: 'string', headerName: 'id', flex: 0.5 },
        { field: 'sourceApplicationInstanceId', type: 'string', headerName: 'Kilde instans ID', flex: 1,
            valueGetter: (params) => params.row.instanceFlowHeaders.sourceApplicationInstanceId
        },
        { field: 'timestamp', type: 'string', headerName: 'Sist hendelse', flex: 2,
            valueGetter: (params) => moment(params.row.timestamp).format('YYYY/MM/DD HH:mm:ss.sss')
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
        }
    ];

    return (
        <Box>
            <Box display="flex" position="relative" width={1} height={1}>
                <Box id="integration-list" className={classes.dataPanelBox}>
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
}

export default InstancePanel;
