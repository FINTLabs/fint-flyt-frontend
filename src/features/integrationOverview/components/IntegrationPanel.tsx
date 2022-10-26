import {
    Box,
    Button,
    Card,
    CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
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
import {useContext, useEffect, useState} from "react";
import {gridLocaleNoNB} from "../../util/locale/gridLocaleNoNB";
import {useTranslation} from "react-i18next";
import {IntegrationContext} from "../../../context/integrationContext";
import {Link as RouterLink, useHistory} from 'react-router-dom';
import {ISelect} from "../../integration/types/InputField";
import IntegrationRepository from "../../../shared/repositories/IntegrationRepository";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import {SourceApplicationContext} from "../../../context/sourceApplicationContext";
import {SOURCE_FORM_NO_VALUES} from "../../integration/defaults/DefaultValues";
import ConfigurationRepository from "../../../shared/repositories/ConfigurationRepository";
import {IIntegrationPatch} from "../../integration/types/Integration";
import {ResourcesContext} from "../../../context/resourcesContext";
import {configurationFieldToString} from "../../util/MappingUtil";
import ResourceRepository from "../../../shared/repositories/ResourceRepository";
import {IResourceItem} from "../../../context/resourcesContext/types";

const IntegrationPanel: React.FunctionComponent<any> = (props) => {
    const { t, i18n } = useTranslation('translations', { keyPrefix: 'pages.integrationOverview'});
    const classes = props.classes;
    let history = useHistory();
    const {existingIntegration, setConfiguration, setSelectedMetadata} = useContext(IntegrationContext)
    const {allMetadata, getAllMetadata, getInstanceElementMetadata} = useContext(SourceApplicationContext)
    const {setPrimaryClass, setSecondaryClass, setTertiaryClass} = useContext(ResourcesContext)
    const [version, setVersion] = useState('null');
    const [activeVersion, setActiveVersion] = useState(existingIntegration?.activeConfigurationId ? 'konfigurasjon' + existingIntegration?.activeConfigurationId : 'Ingen');
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [anchorSubEl, setAnchorSubEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const openSub = Boolean(anchorSubEl);
    const handleNewConfigClick = (event: React.MouseEvent<HTMLElement>) => {setAnchorEl(event.currentTarget);};
    const handleNewConfigClose = () => {setAnchorEl(null);};
    const handleNewConfigSubClick = (event: React.MouseEvent<HTMLElement>) => {setAnchorSubEl(event.currentTarget);};
    const handleNewConfigSubClose = () => {setAnchorSubEl(null);};
    const versionsToActivate: ISelect[] = [{value: 'null', label: 'velg aktiv versjon'}];
    const [openDialog, setOpenDialog] = React.useState(false);
    const [configToActivate, setConfigToActivate] = React.useState<string>('')

    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleActivateButton = () => {
        setVersion(configToActivate)
        activateConfiguration(configToActivate)
        setOpenDialog(false)
    }

    props.completedConfigurations?.map((configuration: any) => {
        if (configuration.completed) {
            versionsToActivate.push({value: configuration.id, label: 'versjon ' + configuration.version})
        }
    })

    useEffect(()=> {
        getAllMetadata(true)
    }, [])

    const columns: GridColDef[] = [
        { field: 'id', type: 'string', headerName: 'KonfigurasjonsId', flex: 0.5},
        { field: 'version', type: 'number', headerName: 'Versjon', flex: 0.5},
        { field: 'comment', type: 'string', headerName: 'Kommentar', flex: 1},
        { field: 'details', headerName: 'Vis', flex: 0.5, sortable: false, filterable: false, description: "Ferdigstilte konfigurasjoner kan ikke redigeres",
            renderCell: (params) => ( <EditButtonToggle row={params.row} />)
        }
    ];

    const draftColumns: GridColDef[] = [
        { field: 'id', type: 'string', headerName: 'KonfigurasjonsId', flex: 0.5},
        { field: 'comment', type: 'string', headerName: 'Kommentar', flex: 1},
        { field: 'details', headerName: 'Rediger', flex: 0.5, sortable: false, filterable: false, description: "Ferdigstilte konfigurasjoner kan ikke redigeres",
            renderCell: (params) => ( <EditButtonToggle row={params.row} />)
        }
    ];

    //TODO: refactor
    async function handleEditShowButtonClick(id: string, excludeElements: boolean) {
        let list: IResourceItem[] = [];
        let selectedForm = allMetadata.filter(md => md.sourceApplicationIntegrationId === existingIntegration?.sourceApplicationIntegrationId)
        setSelectedMetadata(selectedForm.length > 0 ? selectedForm[0] : SOURCE_FORM_NO_VALUES[0])
        getInstanceElementMetadata(selectedForm[0].id)
        await ConfigurationRepository.getConfiguration(id.toString(), excludeElements)
                .then(async (response) => {
                    setConfiguration(response.data);
                    let cases = response.data?.elements.filter((confField: any) => confField.key === 'case')
                    let primaryClass = configurationFieldToString(cases ? cases : [], 'primarordningsprinsipp')
                    let secondaryClass = configurationFieldToString(cases ? cases : [], 'sekundarordningsprinsipp')
                    let tertiaryClass = configurationFieldToString(cases ? cases : [], 'tertiarordningsprinsipp')
                    await ResourceRepository.getClasses(primaryClass).then(async response => {
                            if (response.data) {response.data.map((resource: any) => list.push({label: resource.id + ' - ' + resource.displayName, value: resource.id}))
                                setPrimaryClass(list)
                            }
                        })
                        .then(async response => {
                            await ResourceRepository.getClasses(secondaryClass).then(response => {
                                    if (response.data) {response.data.map((resource: any) => list.push({label: resource.id + ' - ' + resource.displayName, value: resource.id}))
                                        setSecondaryClass(list)
                                    }
                                })
                        }).then(async response => {
                            await ResourceRepository.getClasses(tertiaryClass).then(response => {
                                    if (response.data) {response.data.map((resource: any) => list.push({label: resource.id + ' - ' + resource.displayName, value: resource.id}))
                                        setTertiaryClass(list)
                                    }
                                })
                        })
                        .catch((err) => {
                            console.error(err);
                        })
                })
            .catch((e) => {
                    console.error('Error: ', e)
                    setConfiguration(undefined);
            })
        history.push("/integration/configuration/edit");
    }

    function EditButtonToggle(props: GridCellParams["row"]) {
        const completed: boolean = props.row.completed
        //TODO: fix dependent fields
        return (
            <>
                <Button
                    size="small"
                    variant="contained"
                    onClick={(e) => {handleEditShowButtonClick(props.row.id, false)}}
                    >{completed ? 'VIS' : 'REDIGER'}
                </Button>
            </>
        );
    }

    const activateConfiguration = (configurationId: string) => {
        let patch: IIntegrationPatch = {
            activeConfigurationId: configurationId,
            state: 'ACTIVE'
        }
        IntegrationRepository.updateIntegration(existingIntegration?.id, patch).then(
            (response) => {
                console.log(response)
                setActiveVersion(response.data.activeConfigurationId)
            }
        ).catch(e => console.error(e))
        console.log('set active config, integrationId', existingIntegration?.id, 'configurationId', configurationId)
    }

    const handleChange = (event: SelectChangeEvent) => {
        setOpenDialog(true)
        setConfigToActivate(event.target.value)
    };

    return (
        <Box>
            <Dialog
                open={openDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Aktiver konfigurasjon?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Bekreft aktivering av konfigurasjon
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Avbryt</Button>
                    <Button onClick={handleActivateButton} autoFocus>Ja</Button>
                </DialogActions>
            </Dialog>
            <Card sx={{mb: 2}}>
                <CardContent>
                    <Typography id="details-sourceApplicationIntegrationId"><strong>id:</strong>{existingIntegration?.id}</Typography>
                    <Typography id="details-sourceApplicationIntegrationId"><strong>{t('labels.sourceApplicationIntegrationId')}</strong>{existingIntegration?.sourceApplicationIntegrationId}</Typography>
                    <Typography id="details-sourceApplicationId"><strong>{t('labels.sourceApplicationId')} </strong>{existingIntegration?.sourceApplicationId}</Typography>
                    <Typography id="details-destination"><strong>{t('labels.destination')} </strong>{existingIntegration?.destination}</Typography>
                    <Typography id="details-activeConfiguration"><strong>{t('labels.activeConfigurationId')} </strong>{activeVersion}</Typography>
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
                <Box id="completed-integration-list" className={classes.dataPanelBox}>
                    <Typography>Ferdigstilt:</Typography>
                    <DataGrid
                        loading={props.loading}
                        localeText={i18n.language === 'no' ? gridLocaleNoNB : undefined}
                        //getRowId={(row) => row.configurationId}
                        density='compact'
                        rows={props.completedConfigurations ? props.completedConfigurations : []}
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
                <Box id="integration-list" className={classes.dataPanelBox}>
                    <Typography>Utkast:</Typography>
                    <DataGrid
                        loading={props.loading}
                        localeText={i18n.language === 'no' ? gridLocaleNoNB : undefined}
                        //getRowId={(row) => row.configurationId}
                        density='compact'
                        rows={props.configurations ? props.configurations : []}
                        columns={draftColumns}
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
                sx={{mt: 5}}
                id="demo-positioned-button"
                variant="contained"
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleNewConfigClick}
                endIcon={<ArrowRightIcon />}
            >
                NY KONFIGURASJON
            </Button>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleNewConfigClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <MenuItem component={RouterLink} to='/integration/configuration/new-configuration' onClick={handleNewConfigClose}>
                    <Button id="demo-positioned-button" onClick={(e) => {
                        let selectedForm = allMetadata.filter(md => md.sourceApplicationIntegrationId === existingIntegration?.sourceApplicationIntegrationId)
                        setSelectedMetadata(selectedForm.length > 0 ? selectedForm[0] : SOURCE_FORM_NO_VALUES[0])
                        getInstanceElementMetadata(selectedForm[0].id)
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
                        onClick={handleNewConfigSubClick}
                        endIcon={<ArrowRightIcon />}
                    >
                        Basert på eksisterende versjon (kommer)
                    </Button>
                    <Menu
                        id="demo-positioned-menu"
                        aria-labelledby="demo-positioned-button"
                        anchorEl={anchorSubEl}
                        open={openSub}
                        onClose={handleNewConfigSubClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    >
                        <MenuItem disabled={true} onClick={handleNewConfigSubClose}>...</MenuItem>
                        <MenuItem disabled={true} onClick={handleNewConfigSubClose}>...</MenuItem>
                    </Menu>
                </MenuItem>
            </Menu>
        </Box>
    );
}

export default IntegrationPanel;
