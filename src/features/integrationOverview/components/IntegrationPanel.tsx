import {
    Box,
    Button,
    Card,
    CardContent,
    FormControl,
    InputLabel,
    Menu,
    MenuItem,
    Select,
    SelectChangeEvent,
    Typography
} from "@mui/material";
import {DataGrid, GridCellParams, GridColDef, GridToolbar} from "@mui/x-data-grid";
import * as React from "react";
import { gridLocaleNoNB } from "../../util/locale/gridLocaleNoNB";
import {useTranslation} from "react-i18next";
import {useContext, useEffect, useState} from "react";
import {IntegrationContext} from "../../../context/integrationContext";
import { Link } from 'react-router-dom';
import { ISelect } from "../../integration/types/InputField";
import IntegrationRepository from "../../../shared/repositories/IntegrationRepository";
import {configurationFieldToString} from "../../util/MappingUtil";
import {ResourcesContext} from "../../../context/resourcesContext";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Link as RouterLink } from 'react-router-dom';
import {SourceApplicationContext} from "../../../context/sourceApplicationContext";
import {SOURCE_FORM_NO_VALUES} from "../../integration/defaults/DefaultValues";

const IntegrationPanel: React.FunctionComponent<any> = (props) => {
    const { t, i18n } = useTranslation('translations', { keyPrefix: 'pages.integrationOverview'});
    const classes = props.classes;
    const {existingIntegration, setConfiguration, setSelectedForm} = useContext(IntegrationContext)
    const { metadata, getMetadata} = useContext(SourceApplicationContext)
    const {setPrimaryClassification, setSecondaryClassification, setTertiaryClassification} = useContext(ResourcesContext);
    const [version, setVersion] = useState('null');
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [anchorSubEl, setAnchorSubEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const openSub = Boolean(anchorSubEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleSubClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorSubEl(event.currentTarget);
    };
    const handleSubClose = () => {
        setAnchorSubEl(null);
    };
    const versionsToActivate: ISelect[] = [{value: 'null', label: 'velg aktiv versjon'}];
    props.configurations.map((configuration: any) => {
        if (configuration.completed) {
            versionsToActivate.push({value: configuration.id, label: 'versjon ' + configuration.version})
        }
    })

    useEffect(()=> {
        getMetadata()
    }, [])

    const columns: GridColDef[] = [
        { field: 'id', type: 'string', headerName: 'KonfigurasjonsId', flex: 1, hide: true},
        { field: 'version', type: 'number', headerName: 'Versjon', flex: 0.5 },
        { field: 'comment', type: 'string', headerName: 'Kommentar', flex: 1},
        { field: 'completed', type: 'string', headerName: 'Ferdigstilt', flex: 1, description: "Kun ferdigstilte konfigurasjoner kan settes som aktive",
            valueGetter: (params) => params.row.completed ? 'Ja' : 'Nei'
        },
        { field: 'details', headerName: 'Vis/Rediger', flex: 0.5, sortable: false, filterable: false, description: "Ferdigstilte konfigurasjoner kan ikke redigeres",
            renderCell: (params) => ( <EditButtonToggle row={params.row} />)
        }
    ];

    function EditButtonToggle(props: GridCellParams["row"]) {
        const completed: boolean = props.row.completed
        let cases = props.row.elements.filter((element: { key: string; }) => element.key === 'case')
        //TODO: test setConfiguration
        return (
            <>
                <Link
                    onClick={(e) => {
                        let selectedForm = metadata.filter(md => md.sourceApplicationIntegrationId === existingIntegration?.sourceApplicationIntegrationId)
                        setSelectedForm(selectedForm.length > 0 ? selectedForm[0] : SOURCE_FORM_NO_VALUES[0])
                        setPrimaryClassification({label: '', value: configurationFieldToString(cases, 'primarordningsprinsipp')})
                        setSecondaryClassification({label: '', value: configurationFieldToString(cases, 'sekundarordningsprinsipp')})
                        setTertiaryClassification({label: '', value: configurationFieldToString(cases, 'tertiarordningsprinsipp')})
                        setConfiguration(props.row)}
                    }
                    style={{background: '#1F4F59', padding: '4px 10px 4px 10px', borderRadius: '6px', textDecoration:'none', color:'white', position: 'absolute', border: 'solid 1px', fontFamily: 'sans-serif'}}
                    to='/integration/configuration/edit'>{completed ? 'VIS' : 'REDIGER'}
                </Link>
            </>
        );
    }


    const activateConfiguration = (event: any, configurationId: string) => {
        IntegrationRepository.setActiveConfiguration(existingIntegration?.id, configurationId)
        console.log('set active config, integrationId', existingIntegration?.id, 'configurationId', configurationId)
    }

    const openNewConfigurationDialog = (event: any, integrationId: string) => {
        //TODO: open new/edit config
        console.log('new config on integrationId: ', integrationId)
    }

    const handleChange = (event: SelectChangeEvent) => {
        setVersion(event.target.value)
        activateConfiguration(existingIntegration?.id, event.target.value)
    };

    return (
        <Box>
            <Card>
                <CardContent>
                    <Typography id="details-sourceApplicationIntegrationId"><strong>id:</strong>{existingIntegration?.id}</Typography>
                    <Typography id="details-sourceApplicationIntegrationId"><strong>{t('labels.sourceApplicationIntegrationId')}</strong>{existingIntegration?.sourceApplicationIntegrationId}</Typography>
                    <Typography id="details-sourceApplicationId"><strong>{t('labels.sourceApplicationId')} </strong>{existingIntegration?.sourceApplicationId}</Typography>
                    <Typography id="details-destination"><strong>{t('labels.destination')} </strong>{existingIntegration?.destination}</Typography>
                    <Typography id="details-activeConfiguration"><strong>{t('labels.activeConfigurationId')} </strong>{existingIntegration?.activeConfigurationId ? existingIntegration?.activeConfigurationId : 'Ingen'}</Typography>
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
                        //getRowId={(row) => row.configurationId}
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
            <Button
                id="demo-positioned-button"
                variant="contained"
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                endIcon={<ArrowRightIcon />}
            >
                NY KONFIGURASJON
            </Button>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <MenuItem component={RouterLink} to='/integration/configuration/new-configuration' onClick={handleClose}>
                    <Button id="demo-positioned-button" onClick={(e) => {
                        let selectedForm = metadata.filter(md => md.sourceApplicationIntegrationId === existingIntegration?.sourceApplicationIntegrationId)
                        setSelectedForm(selectedForm.length > 0 ? selectedForm[0] : SOURCE_FORM_NO_VALUES[0])
                    }}
                    >
                        Blank konfigurasjon
                    </Button>
                </MenuItem>

                <MenuItem>
                    <Button
                        id="demo-positioned-button"
                        aria-controls={openSub ? 'demo-positioned-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openSub ? 'true' : undefined}
                        onClick={handleSubClick}
                        endIcon={<ArrowRightIcon />}
                    >
                        Basert på eksisterende versjon (kommer)
                    </Button>
                    <Menu
                        id="demo-positioned-menu"
                        aria-labelledby="demo-positioned-button"
                        anchorEl={anchorSubEl}
                        open={openSub}
                        onClose={handleSubClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    >
                        <MenuItem disabled={true} onClick={handleSubClose}>...</MenuItem>
                        <MenuItem disabled={true} onClick={handleSubClose}>...</MenuItem>
                    </Menu>
                </MenuItem>
            </Menu>
        </Box>
    );
}

export default IntegrationPanel;
