import {
    Box,
    Button,
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
import {gridLocaleNoNB} from "../../../util/locale/gridLocaleNoNB";
import {useTranslation} from "react-i18next";
import {IntegrationContext} from "../../../context/IntegrationContext";
import {Link as RouterLink, useHistory} from 'react-router-dom';
import IntegrationRepository from "../../../shared/repositories/IntegrationRepository";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import {SourceApplicationContext} from "../../../context/SourceApplicationContext";
import {getDestinationDisplayName, getSourceApplicationDisplayName} from "../../../util/DataGridUtil";
import ConfigurationRepository from "../../../shared/repositories/ConfigurationRepository";
import {IIntegrationPatch} from "../../integration/types/Integration";
import {IConfiguration} from "../../configuration/types/Configuration";
import {ClassNameMap} from "@mui/styles";
import {ISelect} from "../../configuration/types/Select";
import {renderCellWithTooltip} from "../../../util/DataGridUtil";

type Props = {
    classes: ClassNameMap
}

const IntegrationPanel: React.FunctionComponent<Props> = (props: Props) => {
    const {t, i18n} = useTranslation('translations', {keyPrefix: 'pages.integrationOverview'});
    const classes = props.classes;
    const history = useHistory();
    const {
        existingIntegration,
        setConfiguration,
        setSelectedMetadata,
        resetIntegrations,
        configurations,
        completedConfigurations
    } = useContext(IntegrationContext);
    const {
        allMetadata,
        getAllMetadata,
        getInstanceElementMetadata,
    } = useContext(SourceApplicationContext)
    const [version, setVersion] = useState('null');
    const [activeVersion, setActiveVersion] = useState<string>('');
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [anchorSubEl, setAnchorSubEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const openSub = Boolean(anchorSubEl);
    const handleNewConfigClick = (event: React.MouseEvent<HTMLElement>) => {setAnchorEl(event.currentTarget);};
    const handleNewConfigClose = () => {setAnchorEl(null);};
    const handleNewConfigSubClick = (event: React.MouseEvent<HTMLElement>) => {setAnchorSubEl(event.currentTarget);};
    const handleNewConfigSubClose = () => {setAnchorSubEl(null);};

    let versionsToActivate: ISelect[] = [{value: 'null', label: 'velg aktiv versjon'}];
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

    versionsToActivate = versionsToActivate.concat(
        (completedConfigurations || []).map((configuration) => ({
            value: configuration.id.toString(),
            label: `versjon ${configuration.version}`,
        })).sort((a, b) => {
            const versionA = parseInt(a.label.split(' ')[1], 10);
            const versionB = parseInt(b.label.split(' ')[1], 10);
            return versionA - versionB;
        })
    );

    useEffect(() => {
        getAllMetadata(false)
        getVersionForActiveConfig(existingIntegration?.activeConfigurationId ? existingIntegration.activeConfigurationId : undefined)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const columns: GridColDef[] = [
        {field: 'id', type: 'string', headerName: t('table.columns.configurationId'), minWidth: 100, flex: 0.5},
        {field: 'version', type: 'number', headerName: t('table.columns.version'), minWidth: 100, flex: 0.5},
        {field: 'comment', type: 'string', headerName: t('table.columns.comment'), minWidth: 250, flex: 1,
            renderCell: (params) => renderCellWithTooltip(params.value as string)
        },
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

    function getVersionForActiveConfig(id: string | undefined): void {
        if (id === undefined) {
            setActiveVersion('ingen aktiv konfigurasjon')
            return;
        }
        ConfigurationRepository.getConfigurationById(id.toString(), true)
            .then((response) => {
                const data: IConfiguration = response.data;
                if (data) {
                    setActiveVersion(t('version') + data.version)
                }
            })
            .catch((e) => {
                console.error('Error: ', e)
                setActiveVersion('ingen aktiv konfigurasjon')
            })
    }

    async function handleNewOrEditConfigClick(id: number | string, version?: unknown) {
        await ConfigurationRepository.getConfigurationById(id.toString(), false)
            .then(async (response) => {
                const data = response.data
                const usedVersionMetadata = allMetadata.filter(md => md.id === data.integrationMetadataId)
                setSelectedMetadata(usedVersionMetadata.length > 0 ? usedVersionMetadata[0] : undefined)
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

    function EditButtonToggle(props: GridCellParams["row"]) {
        const completed: boolean = props.row.completed
        return <Button
            size="small"
            variant="contained"
            onClick={() => {
                handleNewOrEditConfigClick(props.row.id).then(() => history.push("/integration/configuration/edit")
                )
            }}
        >{completed ? t('button.show') : t('button.edit')}
        </Button>
    }

    const activateConfiguration = (configurationId: string) => {
        const patch: IIntegrationPatch = {
            activeConfigurationId: configurationId,
            state: 'ACTIVE'
        }
        if (existingIntegration?.id) {
            IntegrationRepository.updateIntegration(existingIntegration?.id, patch).then(
                (response) => {
                    console.log('updated integration: ', existingIntegration?.id, response)
                }
            ).catch(e => console.error(e))
            setActiveVersion('ingen aktiv konfigurasjon')
            console.log('set active config, integrationId', existingIntegration?.id, 'configurationId', configurationId)
        }

    }

    const handleChange = (event: SelectChangeEvent) => {
        setOpenDialog(true)
        setConfigToActivate(event.target.value)
    };

    const infoTypography = (label: string, value: string) => (
        <Typography>
            <strong>{label}</strong> {value}
        </Typography>
    );

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
            <Box sx={{mb: 2}} className={classes.integrationWrapper}>
                {infoTypography('id:', existingIntegration?.id ? existingIntegration.id : '')}
                {infoTypography(t('labels.sourceApplicationIntegrationId'), `${existingIntegration?.sourceApplicationIntegrationId} - ${existingIntegration?.displayName}`)}
                {infoTypography(t('labels.sourceApplicationId'), getSourceApplicationDisplayName(Number(existingIntegration?.sourceApplicationId)))}
                {infoTypography(t('labels.destination'), getDestinationDisplayName(existingIntegration?.destination || ''))}
                {infoTypography(t('labels.activeConfigurationId'), activeVersion)}
                <FormControl size='small' sx={{float: 'left', width: 300, mt: 2}}>
                    <InputLabel id="version-select-input-label">{t('version')}</InputLabel>
                    <Select
                        labelId="version-select-label"
                        id="version-select"
                        value={version}
                        label={t('version')}
                        onChange={handleChange}
                    >
                        {versionsToActivate.map((item: ISelect, index: number) => (
                            <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <Box display="flex" position="relative" width={1} className={classes.tableWrapper}>
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
                                sortModel: [{field: 'id', sort: 'desc'}],
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
                <MenuItem disableGutters={true} divider={true} dense={true} component={RouterLink}
                          to='/integration/configuration/new-configuration'
                          onClick={handleNewConfigClose}>
                    <Button id="new-configuration-button" onClick={() => {
                        const selectedForm = allMetadata.filter(md => md.sourceApplicationIntegrationId === existingIntegration?.sourceApplicationIntegrationId)
                        setSelectedMetadata(selectedForm.length > 0 ? selectedForm[selectedForm.length - 1] : undefined)
                        getInstanceElementMetadata(selectedForm[selectedForm.length - 1].id)
                    }}
                    >
                        {t('button.blankConfiguration')}
                    </Button>
                </MenuItem>

                <MenuItem disableGutters={true} divider={true} dense={true}>
                    <Button
                        disabled={!completedConfigurations || completedConfigurations.length === 0}
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
                        {completedConfigurations && [...completedConfigurations]
                            .sort((a, b) => {
                                const versionA = a.version || 0;
                                const versionB = b.version || 0;

                                return versionA - versionB;
                            })
                            .map((config: IConfiguration, index: number) => {
                                    return <MenuItem onClick={handleNewConfigSubClose} disableGutters={true} divider={true}
                                                     dense={true} key={index}>
                                        <Button sx={{minWidth: (theme) => theme.spacing(20)}} id="version-button" onClick={() => {
                                            handleNewOrEditConfigClick(config.id, config.version).then(() => history.push("/integration/configuration/edit"))
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
                onClick={() => {
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