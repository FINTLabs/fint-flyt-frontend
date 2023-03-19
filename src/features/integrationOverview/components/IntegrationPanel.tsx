import {
    Box,
    Button,
    Card,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
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
import IntegrationRepository from "../../../shared/repositories/IntegrationRepository";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import {SourceApplicationContext} from "../../../context/sourceApplicationContext";
import {
    getDestinationDisplayName,
    getSourceApplicationDisplayName,
    SOURCE_FORM_NO_VALUES
} from "../../configuration/defaults/DefaultValues";
import ConfigurationRepository from "../../../shared/repositories/ConfigurationRepository";
import {IIntegrationPatch} from "../../integration/types/Integration";
import {ResourcesContext} from "../../../context/resourcesContext";
import {IConfiguration} from "../../configuration/types/Configuration";
import {ISelect} from "../../configuration/types/Select";
import {ClassNameMap} from "@mui/styles";

const IntegrationPanel: React.FunctionComponent<any> = (props: { classes: ClassNameMap }) => {
    const {t, i18n} = useTranslation('translations', {keyPrefix: 'pages.integrationOverview'});
    const classes = props.classes;
    let history = useHistory();
    const {
        existingIntegration,
        setConfiguration,
        setSelectedMetadata,
        resetIntegrations,
        configurations,
        completedConfigurations
    } = useContext(IntegrationContext);
    const {allMetadata, getAllMetadata, getInstanceElementMetadata} = useContext(SourceApplicationContext)
    const [version, setVersion] = useState('null');
    const [activeVersion, setActiveVersion] = useState<any>('');
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [anchorSubEl, setAnchorSubEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const openSub = Boolean(anchorSubEl);
    const handleNewConfigClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleNewConfigClose = () => {
        setAnchorEl(null);
    };
    const handleNewConfigSubClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorSubEl(event.currentTarget);
    };
    const handleNewConfigSubClose = () => {
        setAnchorSubEl(null);
    };

    const versionsToActivate: ISelect[] = [{value: 'null', label: 'velg aktiv versjon'}];
    const [openDialog, setOpenDialog] = React.useState(false);
    const [configToActivate, setConfigToActivate] = React.useState<string>('')

    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleActivateButton = () => {
        setVersion(configToActivate)
        getVersionForActiveConfig(configToActivate)
        activateConfiguration(configToActivate)
        setOpenDialog(false)
    }

    completedConfigurations?.map((configuration: any) => {
        return versionsToActivate.push({value: configuration.id, label: 'versjon ' + configuration.version})
    })

    useEffect(() => {
        getAllMetadata(true)
        getVersionForActiveConfig(existingIntegration?.activeConfigurationId ? existingIntegration.activeConfigurationId : undefined)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const columns: GridColDef[] = [
        {field: 'id', type: 'string', headerName: t('table.columns.configurationId'), minWidth: 100, flex: 0.5},
        {field: 'version', type: 'number', headerName: t('table.columns.version'), minWidth: 100, flex: 0.5},
        {field: 'comment', type: 'string', headerName: t('table.columns.comment'), minWidth: 250, flex: 1},
        {
            field: 'details',
            headerName: t('table.columns.show'),
            minWidth: 150,
            flex: 0.5,
            sortable: false,
            filterable: false,
            renderCell: (params) => (<EditButtonToggle row={params.row}/>)
        }
    ];

    const draftColumns: GridColDef[] = [
        {field: 'id', type: 'string', headerName: t('table.columns.configurationId'), minWidth: 150, flex: 0.5},
        {field: 'comment', type: 'string', headerName: t('table.columns.comment'), minWidth: 250, flex: 1},
        {
            field: 'details',
            headerName: t('table.columns.edit'),
            minWidth: 150,
            flex: 0.5,
            sortable: false,
            filterable: false,
            renderCell: (params) => (<EditButtonToggle row={params.row}/>)
        }
    ];

    function getVersionForActiveConfig(id: any): void {
        if (id === undefined) {
            setActiveVersion('ingen aktiv konfigurasjon')
            return;
        }
        ConfigurationRepository.getConfiguration(id.toString(), true)
            .then((response) => {
                let data: IConfiguration = response.data;
                if (data) {
                    setActiveVersion(t('version') + data.version)
                }
            })
            .catch((e) => {
                console.error('Error: ', e)
                setActiveVersion('ingen aktiv konfigurasjon')
            })
    }

    async function handleNewOrEditConfigClick(id: any, version?: any) {
        let selectedForm = allMetadata.filter(md => md.sourceApplicationIntegrationId === existingIntegration?.sourceApplicationIntegrationId)
        setSelectedMetadata(selectedForm.length > 0 ? selectedForm[0] : SOURCE_FORM_NO_VALUES[0])
        getInstanceElementMetadata(selectedForm[0].id)
        await ConfigurationRepository.getConfiguration(id.toString(), false)
            .then(async (response) => {
                let data = response.data
                if (version) {
                    data.id = undefined;
                    data.completed = false;
                }
                setConfiguration(data);
            })
            .catch((e) => {
                console.error('Error: ', e)
                setConfiguration(undefined);
            })
    }


    function EditButtonToggle(props: GridCellParams["row"]): JSX.Element {
        const completed: boolean = props.row.completed
        return (
            <>
                <Button
                    size="small"
                    variant="contained"
                    onClick={(e) => {
                        handleNewOrEditConfigClick(props.row.id).then(r => history.push("/integration/configuration/edit")
                        )
                    }}
                >{completed ? t('button.show') : t('button.edit')}
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
            }
        ).catch(e => console.error(e))
        setActiveVersion('ingen aktiv konfigurasjon')
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
                    {t('dialog.header')}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {t('dialog.confirmMsg')}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>{t('dialog.cancel')}</Button>
                    <Button onClick={handleActivateButton} autoFocus>{t('dialog.yes')}</Button>
                </DialogActions>
            </Dialog>
            <Card sx={{mb: 2}}>
                <CardContent>
                    <Typography
                        id="details-sourceApplicationIntegrationId"><strong>id:</strong>{existingIntegration?.id}
                    </Typography>
                    <Typography
                        id="details-sourceApplicationIntegrationId"><strong>{t('labels.sourceApplicationIntegrationId')}</strong>{existingIntegration?.sourceApplicationIntegrationId} - {existingIntegration?.displayName}
                    </Typography>
                    <Typography
                        id="details-sourceApplicationId"><strong>{t('labels.sourceApplicationId')} </strong>{getSourceApplicationDisplayName(existingIntegration?.sourceApplicationId)}
                    </Typography>
                    <Typography
                        id="details-destination"><strong>{t('labels.destination')} </strong>{getDestinationDisplayName(existingIntegration?.destination)}
                    </Typography>
                    <Typography
                        id="details-activeConfiguration"><strong>{t('labels.activeConfigurationId')} </strong>{activeVersion}
                    </Typography>
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
                    <Typography>{t('table.completed')}:</Typography>
                    <DataGrid
                        loading={completedConfigurations === undefined}
                        localeText={i18n.language === 'no' ? gridLocaleNoNB : undefined}
                        density='compact'
                        rows={completedConfigurations ? completedConfigurations : []}
                        columns={columns}
                        pageSize={20}
                        rowsPerPageOptions={[20]}
                        components={{
                            Toolbar: GridToolbar,
                        }}
                        initialState={{
                            sorting: {
                                sortModel: [{field: 'version', sort: 'desc'}],
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
                    <Typography>{t('table.drafts')}:</Typography>
                    <DataGrid
                        loading={configurations === undefined}
                        localeText={i18n.language === 'no' ? gridLocaleNoNB : undefined}
                        density='compact'
                        rows={configurations ? configurations : []}
                        columns={draftColumns}
                        pageSize={20}
                        rowsPerPageOptions={[20]}
                        components={{
                            Toolbar: GridToolbar,
                        }}
                        initialState={{
                            sorting: {
                                sortModel: [{field: 'version', sort: 'desc'}],
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
                id="positioned-button"
                variant="contained"
                aria-controls={open ? 'positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleNewConfigClick}
                endIcon={<ArrowRightIcon/>}
            >
                {t('button.newConfiguration')}
            </Button>
            <Menu
                id="positioned-menu"
                aria-labelledby="positioned-button"
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
                <MenuItem component={RouterLink} to='/integration/configuration/new-configuration'
                          onClick={handleNewConfigClose}>
                    <Button id="demo-positioned-button" onClick={(e) => {
                        let selectedForm = allMetadata.filter(md => md.sourceApplicationIntegrationId === existingIntegration?.sourceApplicationIntegrationId)
                        setSelectedMetadata(selectedForm.length > 0 ? selectedForm[0] : SOURCE_FORM_NO_VALUES[0])
                        getInstanceElementMetadata(selectedForm[0].id)
                    }}
                    >
                        {t('button.blankConfiguration')}
                    </Button>
                </MenuItem>

                <MenuItem>
                    <Button
                        disabled={!completedConfigurations}
                        id="positioned-button"
                        aria-controls={openSub ? 'positioned-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openSub ? 'true' : undefined}
                        onClick={handleNewConfigSubClick}
                        endIcon={<ArrowRightIcon/>}
                    >
                        {t('button.templateConfiguration')}
                    </Button>
                    <Menu
                        id="positioned-menu"
                        aria-labelledby="positioned-button"
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
                        {completedConfigurations && completedConfigurations.map((config: any, index: number) => {
                                return <MenuItem onClick={handleNewConfigSubClose} key={index}>
                                    <Button id="version-button" onClick={(e) => {
                                        handleNewOrEditConfigClick(config.id, config.version).then(r => history.push("/integration/configuration/edit"))
                                    }}>
                                        {t('button.version')} {config.version}
                                    </Button>
                                </MenuItem>
                            }
                        )}
                    </Menu>
                </MenuItem>
            </Menu>
            <Button
                sx={{mt: 5, ml: 5}}
                id="back-button"
                variant="contained"
                onClick={(e) => {
                    resetIntegrations();
                    history.push("/integration/list")
                }}
            >
                {t('button.back')}
            </Button>
        </Box>
    );
}

export default IntegrationPanel;