import {
    Box, Button, Card, CardContent, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography
} from "@mui/material";
import {DataGrid, GridCellParams, GridColDef, GridToolbar} from "@mui/x-data-grid";
import * as React from "react";
import { gridLocaleNoNB } from "../../util/locale/gridLocaleNoNB";
import {useTranslation} from "react-i18next";
import {useContext, useState} from "react";
import {IntegrationContext} from "../../../context/integrationContext";
import { Link } from 'react-router-dom';
import { ISelect } from "../../integration/types/InputField";

const IntegrationPanel: React.FunctionComponent<any> = (props) => {
    const { t, i18n } = useTranslation('translations', { keyPrefix: 'pages.integrationOverview'});
    const classes = props.classes;
    const {newIntegration, setConfiguration} = useContext(IntegrationContext)

    const [version, setVersion] = useState('null');

    const versionsToActivate: ISelect [] = [{value: 'null', label: 'velg aktiv versjon'}];
    props.configurations.map((configuration: any) => {
        if (configuration.completed) {
            versionsToActivate.push({value: configuration.configurationId, label: 'versjon ' + configuration.version})
        }
    })

    console.log(versionsToActivate)

    const columns: GridColDef[] = [
        { field: 'configurationId', type: 'string', headerName: 'KonfigurasjonsId', flex: 1, hide: true},
        { field: 'version', type: 'number', headerName: 'Versjon', flex: 0.5 },
        { field: 'comment', type: 'string', headerName: 'Kommentar', flex: 1},
        { field: 'completed', type: 'string', headerName: 'Ferdigstilt', flex: 1,
            valueGetter: (params) => params.row.completed ? 'Ja' : 'Nei'
        },
        { field: 'details', headerName: 'Vis/Rediger', flex: 0.5, sortable: false, filterable: false,
            renderCell: (params) => ( <EditButtonToggle row={params.row} />)
        },
        { field: 'delete', headerName: 'Slett konfigurasjon', flex: 0.5, sortable: false, filterable: false,
            renderCell: (params) => ( <DeleteButtonToggle row={params.row} />)
        }
    ];

    function EditButtonToggle(props: GridCellParams["row"]) {
        const completed: boolean = props.row.completed
        //TODO: test setConfiguration
        return (
            <>
                <Link
                    onClick={(e) => {
                        console.log(props.row)
                        setConfiguration(props.row)}
                    }
                    style={{background: '#1F4F59', padding: '4px 10px 4px 10px', borderRadius: '6px', textDecoration:'none', color:'white', position: 'absolute', border: 'solid 1px', fontFamily: 'sans-serif'}}
                    to='/integration/configuration/edit'>{completed ? 'VIS' : 'REDIGER'}
                </Link>
            </>
        );
    }

    function DeleteButtonToggle(props: GridCellParams["row"]) {
        //TODO: test setConfiguration
        const active: boolean = props.row.configurationId === newIntegration?.activeConfigurationId;
        return (
            <>
                    <Button onClick={e => deleteConfiguration(e, props.row.configurationId)} size="small" variant="contained" disabled={active}>Slett</Button>

            </>
        );
    }


    const activateConfiguration = (event: any, configurationId: string) => {
        console.log('set avtive config, integrationId', newIntegration?.id, 'configurationId', configurationId)
    }

    const deleteConfiguration = (event: any, configurationId: string) => {
        console.log('delete config, configurationId: ', configurationId)
    }

    const openNewConfigurationDialog = (event: any, integrationId: string) => {
        //TODO: open new/edit config
        console.log('new config on integrationId: ', integrationId)
    }

    const handleChange = (event: SelectChangeEvent) => {
        setVersion(event.target.value)
        console.log('set avtive config, integrationId', event.target.value);
    };

    return (
        <Box>
            <Card>
                <CardContent>
                    <Typography id="details-sourceApplicationIntegrationId"><strong>{t('labels.sourceApplicationIntegrationId')}</strong>{newIntegration?.sourceApplicationIntegrationId}</Typography>
                    <Typography id="details-sourceApplicationId"><strong>{t('labels.sourceApplicationId')} </strong>{newIntegration?.sourceApplicationId}</Typography>
                    <Typography id="details-destination"><strong>{t('labels.destination')} </strong>{newIntegration?.destination}</Typography>
                    <Typography id="details-activeConfiguration"><strong>{t('labels.activeConfigurationId')} </strong>{newIntegration?.activeConfigurationId ? newIntegration?.activeConfigurationId : 'Ingen'}</Typography>
                </CardContent>
                <FormControl size='small' sx={{float: 'left', width: 300, m: 2}}>
                    <InputLabel id="version-select-input-label">{t('version')}</InputLabel>
                    <Select
                        labelId="version-select-label"
                        id="version-select"
                        value={version}
                        label={t('version')}
                        onChange={handleChange}
                    >
                        {versionsToActivate.map((item: any, index: number) => (
                            <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Card>
            <Box display="flex" position="relative" width={1} height={1}>
                <Box id="integration-list" className={classes.dataPanelBox}>
                    <DataGrid
                        loading={props.loading}
                        localeText={i18n.language === 'no' ? gridLocaleNoNB : undefined}
                        getRowId={(row) => row.configurationId}
                        density='compact'
                        rows={props.configurations}
                        columns={columns}
                        pageSize={20}
                        rowsPerPageOptions={[20]}
                        components={{
                            Toolbar: GridToolbar,
                        }}
                        initialState={{
                            sorting: {
                                sortModel: [{ field: 'version', sort: 'desc' }],
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
            <Link
                style={{background: '#1F4F59', padding: '6px 16px 6px 16px', borderRadius: '6px', textDecoration:'none', color:'white', position: 'absolute', marginTop: '6px', border: 'solid 1px', fontFamily: 'sans-serif'}}
                to='/integration/configuration/new'>NY KONFIGURASJON</Link>
        </Box>
    );
}

export default IntegrationPanel;
