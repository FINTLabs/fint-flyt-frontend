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
import {ResourcesContext} from "../../../context/resourcesContext";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import {SourceApplicationContext} from "../../../context/sourceApplicationContext";
import {SOURCE_FORM_NO_VALUES} from "../../integration/defaults/DefaultValues";
import {IntegrationState} from "../../integration/types/IntegrationState.enum";
import ConfigurationRepository from "../../../shared/repositories/ConfigurationRepository";
import {newIConfiguration} from "../../integration/types/Configuration";

const IntegrationPanel: React.FunctionComponent<any> = (props) => {
    const { t, i18n } = useTranslation('translations', { keyPrefix: 'pages.integrationOverview'});
    const classes = props.classes;
    let history = useHistory();
    const {existingIntegration, getConfiguration, setConfiguration, setSelectedMetadata} = useContext(IntegrationContext)
    const { allMetadata, getAllMetadata, getInstanceElementMetadata} = useContext(SourceApplicationContext)
    const {setPrimaryClassification, setSecondaryClassification, setTertiaryClassification} = useContext(ResourcesContext);
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

    console.log(existingIntegration)

    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleActivateButton = () => {
        setVersion(configToActivate)
        activateConfiguration(existingIntegration?.id, configToActivate)
        setOpenDialog(false)
    }

    props.configurations?.map((configuration: any) => {
        if (configuration.completed) {
            versionsToActivate.push({value: configuration.id, label: 'versjon ' + configuration.version})
        }
    })

    useEffect(()=> {
        getAllMetadata()
    }, [])

    const columns: GridColDef[] = [
        { field: 'id', type: 'string', headerName: 'KonfigurasjonsId', flex: 0.5},
        { field: 'version', type: 'number', headerName: 'Versjon', flex: 0.5},
        { field: 'comment', type: 'string', headerName: 'Kommentar', flex: 1},
        { field: 'completed', type: 'string', headerName: 'Ferdigstilt', flex: 1, description: "Kun ferdigstilte konfigurasjoner kan settes som aktive",
            valueGetter: (params) => params.row.completed ? 'Ja' : 'Nei'
        },
        { field: 'details', headerName: 'Vis/Rediger', flex: 0.5, sortable: false, filterable: false, description: "Ferdigstilte konfigurasjoner kan ikke redigeres",
            renderCell: (params) => ( <EditButtonToggle row={params.row} />)
        }
    ];

    async function handleEditShowButtonClick(id: string, excludeElements: boolean) {
        let selectedForm = allMetadata.filter(md => md.sourceApplicationIntegrationId === existingIntegration?.sourceApplicationIntegrationId)
        setSelectedMetadata(selectedForm.length > 0 ? selectedForm[0] : SOURCE_FORM_NO_VALUES[0])
        getInstanceElementMetadata(selectedForm[0].id)
        await ConfigurationRepository.getConfiguration(id.toString(), excludeElements)
                .then((response) => {
                   let configuration: newIConfiguration = response.data;
                   setConfiguration(configuration);
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

    const activateConfiguration = (event: any, configurationId: string) => {
        IntegrationRepository.setActiveConfiguration(existingIntegration?.id, configurationId).then(
            (response) => {
                setActiveVersion(response.data.activeConfigurationId)
                console.log(response)
                IntegrationRepository.setIntegrationState(existingIntegration?.id, IntegrationState.ACTIVE).then(response => {console.log('activated configuration')})
            }
        ).catch(e => console.error(e))
        console.log('set active config, integrationId', existingIntegration?.id, 'configurationId', configurationId)
    }

    const openNewConfigurationDialog = (event: any, integrationId: string) => {
        //TODO: open new/edit config
        console.log('new config on integrationId: ', integrationId)
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
                    <Button onClick={handleActivateButton} autoFocus>
                        Ja
                    </Button>
                </DialogActions>
            </Dialog>
            <Card>
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
                <Box id="integration-list" className={classes.dataPanelBox}>
                    <DataGrid
                        loading={props.loading}
                        localeText={i18n.language === 'no' ? gridLocaleNoNB : undefined}
                        //getRowId={(row) => row.configurationId}
                        density='compact'
                        rows={props.configurations ? props.configurations : []}
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
