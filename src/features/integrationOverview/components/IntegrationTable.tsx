import {
    Box
} from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import * as React from "react";
import { useHistory } from "react-router-dom";
import { gridLocaleNoNB } from "../../util/locale/gridLocaleNoNB";
import {useTranslation} from "react-i18next";
import {useContext} from "react";
import {SourceApplicationContext} from "../../../context/sourceApplicationContext";
import {getSourceApplicationDisplayName} from "../../integration/defaults/DefaultValues";

const IntegrationTable: React.FunctionComponent<any> = (props) => {
    const { t, i18n } = useTranslation('translations', { keyPrefix: 'pages.integrationOverview'});
    const classes = props.classes;
    let history = useHistory();
    const { setSourceApplication, getAllMetadata } = useContext(SourceApplicationContext)

    const columns: GridColDef[] = [
        { field: 'sourceApplicationId', type: 'string', headerName: t('table.columns.sourceApplicationId'), flex: 1,
            valueGetter: (params) => (getSourceApplicationDisplayName(params.row.sourceApplicationId))
        },
        { field: 'sourceApplicationIntegrationId', type: 'string', headerName: t('table.columns.sourceApplicationIntegrationId'), flex: 1 },
        { field: 'destination', type: 'string', headerName:  t('table.columns.destination'), flex: 1 },
        { field: 'dispatched', type: 'number', headerName: t('table.columns.dispatched'), flex: 1 },
        { field: 'errors', type: 'number', headerName: t('table.columns.errors'), flex: 1 }
    ];

    const setHistory = () => {
        history.push({
            pathname: '/integration',
        })
    }

    return (
        <Box>
            <Box display="flex" position="relative" width={1} height={1}>
                <Box id="integration-list" className={classes.dataGridBox}>
                    <DataGrid
                        loading={props.loading}
                        localeText={i18n.language === 'no' ? gridLocaleNoNB : undefined}
                        getRowId={(row) => row.sourceApplicationIntegrationId}
                        onCellDoubleClick={(params, event) => {
                            if (!event.ctrlKey) {
                                event.defaultMuiPrevented = true;
                                props.setExistingIntegration(params.row)
                                setSourceApplication(params.row.sourceApplicationId)
                                getAllMetadata();
                                //TODO: remove when we can no longer use old forms, and use selected sourceApplication and sourceApplicationIntegrationId to get the right metadata
                                props.getConfigurations(params.row.id)
                                setHistory();
                            }
                        }}
                        density='compact'
                        rows={props.integrations? props.integrations : []}
                        columns={columns}
                        pageSize={20}
                        rowsPerPageOptions={[20]}
                        components={{
                            Toolbar: GridToolbar,
                        }}
                        initialState={{
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

export default IntegrationTable;
