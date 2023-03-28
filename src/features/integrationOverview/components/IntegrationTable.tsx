import {Box, Button} from "@mui/material";
import {DataGrid, GridCellParams, GridColDef, GridToolbar} from "@mui/x-data-grid";
import * as React from "react";
import {useContext} from "react";
import {useHistory} from "react-router-dom";
import {gridLocaleNoNB} from "../../util/locale/gridLocaleNoNB";
import {useTranslation} from "react-i18next";
import {SourceApplicationContext} from "../../../context/sourceApplicationContext";
import {
    getDestinationDisplayName,
    getSourceApplicationDisplayName,
    getStateDisplayName
} from "../../configuration/defaults/DefaultValues";
import {IntegrationContext} from "../../../context/integrationContext";
import {ClassNameMap} from "@mui/styles";

const IntegrationTable: React.FunctionComponent<any> = (props: { classes: ClassNameMap }) => {
    const {t, i18n} = useTranslation('translations', {keyPrefix: 'pages.integrationOverview'});
    const classes = props.classes;
    let history = useHistory();
    const {
        setExistingIntegration,
        integrations,
        getCompletedConfigurations,
        getConfigurations
    } = useContext(IntegrationContext)
    const {setSourceApplication, getAllMetadata} = useContext(SourceApplicationContext)

    const columns: GridColDef[] = [
        {
            field: 'details',
            headerName: t('table.columns.show'),
            minWidth: 150,
            flex: 0.5,
            sortable: false,
            filterable: false,
            renderCell: (params) => (<ShowButtonToggle row={params.row}/>)
        },
        {
            field: 'sourceApplicationId',
            type: 'string',
            headerName: t('table.columns.sourceApplicationId'),
            minWidth: 150,
            flex: 1,
            valueGetter: (params) => (getSourceApplicationDisplayName(params.row.sourceApplicationId))
        },
        {
            field: 'sourceApplicationIntegrationId',
            type: 'string',
            headerName: t('table.columns.sourceApplicationIntegrationId'),
            minWidth: 250,
            flex: 1
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
            field: 'destination', type: 'string', headerName: t('table.columns.destination'), minWidth: 150, flex: 1,
            valueGetter: (params) => getDestinationDisplayName(params.row.destination)
        },
        {
            field: 'state', type: 'string', headerName: t('table.columns.state'), minWidth: 100, flex: 1,
            valueGetter: (params) => getStateDisplayName(params.row.state)
        },
        {
            field: 'dispatched',
            type: 'number',
            headerName: t('table.columns.dispatched'),
            minWidth: 100,
            flex: 1,
            sortable: false
        },
        {
            field: 'errors',
            type: 'number',
            headerName: t('table.columns.errors'),
            minWidth: 150,
            flex: 1,
            sortable: false
        }
    ];

    const setHistory = () => {
        history.push({
            pathname: '/integration/panel',
        })
    }

    function ShowButtonToggle(props: GridCellParams["row"]): JSX.Element {
        return <Button
            size="small"
            variant="contained"
            onClick={() => {
                setExistingIntegration(props.row)
                setSourceApplication(props.row.sourceApplicationId)
                getAllMetadata(true);
                getConfigurations(0, 10000, "version", "DESC", false, props.row.id, true)
                getCompletedConfigurations(0, 10000, "id", "ASC", true, props.row.id, true)
                setHistory();
            }}
        >{t('button.show')}
        </Button>
    }

    return (
        <Box>
            <Box display="flex" position="relative" width={1} height={1}>
                <Box id="integration-list" className={classes.dataGridBox}>
                    <DataGrid
                        loading={integrations === undefined}
                        localeText={i18n.language === 'no' ? gridLocaleNoNB : undefined}
                        getRowId={(row) => row.sourceApplicationIntegrationId}
                        density='compact'
                        rows={integrations ? integrations : []}
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
                            sorting: {
                                sortModel: [{field: 'state', sort: 'asc'}],
                            },
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
}

export default IntegrationTable;
