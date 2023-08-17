import React, {useContext, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {SourceApplicationContext} from "../../context/sourceApplicationContext";
import OutgoingDataComponent from "./components/OutgoingDataComponent";
import {Controller, FormProvider, useForm} from "react-hook-form";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";
import IncomingDataComponent from "./components/IncomingDataComponent";
import {
    Alert,
    Box,
    Checkbox,
    FormControl,
    FormControlLabel,
    MenuItem,
    Snackbar,
    TextField,
    Theme,
    Typography
} from "@mui/material";
import {IntegrationContext} from "../../context/integrationContext";
import {IIntegrationMetadata} from "./types/Metadata/IntegrationMetadata";
import {useTranslation} from "react-i18next";
import {ConfigurationFormStyles} from "../../util/styles/ConfigurationFormStyles";
import CheckboxValueComponent from "./components/common/CheckboxValueComponent";
import IntegrationRepository from "../../shared/repositories/IntegrationRepository";
import {IConfiguration, IConfigurationPatch, IObjectMapping} from "./types/Configuration";
import {IIntegrationPatch, IntegrationState} from "../integration/types/Integration";
import {ConfigurationContext} from "../../context/configurationContext";
import StringValueComponent from "./components/mapping/value/string/StringValueComponent";
import {IAlertContent} from "./types/AlertContent";
import {activeAlert, completedAlert, defaultAlert, errorAlert, savedAlert} from "./defaults/DefaultValues";
import ConfigurationRepository from "../../shared/repositories/ConfigurationRepository";
import {pruneObjectMapping} from "../../util/mapping/helpers/pruning";
import EditingProvider, {EditingContext} from "../../context/editingContext";
import {RouteComponent} from "../main/Route";

const useStyles = ConfigurationFormStyles

const ConfigurationForm: RouteComponent = () => {
    const {
        getInstanceElementMetadata,
        setInstanceElementMetadata,
        setSourceApplication,
        allMetadata
    } = useContext(SourceApplicationContext)
    const {
        completed,
        setCompleted,
        resetConfigurationContext
    } = useContext(ConfigurationContext)
    const {setEditCollectionAbsoluteKey} = useContext(EditingContext)
    const {t} = useTranslation('translations', {keyPrefix: 'pages.configuration'});
    const history = useHistory();
    const classes = useStyles();
    const {
        selectedMetadata,
        setSelectedMetadata,
        existingIntegration,
        configuration,
        setConfiguration,
        resetIntegrationContext
    } = useContext(IntegrationContext)
    const [active, setActive] = useState<boolean>(existingIntegration?.activeConfigurationId === configuration?.id)
    const [showAlert, setShowAlert] = React.useState<boolean>(false)
    const [alertContent, setAlertContent] = React.useState<IAlertContent>(defaultAlert)
    const [collectionReferencesInEditContext, setCollectionReferencesInEditContext] = useState<string[]>([])
    const [version, setVersion] = React.useState<string>(selectedMetadata ? String(selectedMetadata.version) : '')

    if (!existingIntegration) {
        history.push('/')
    }
    const methods = useForm<IConfiguration>({
        defaultValues: {
            integrationId: Number(existingIntegration?.id),
            integrationMetadataId: Number(selectedMetadata?.id),
            completed: configuration ? configuration.completed : false,
            comment: configuration?.comment,
        }
    });

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowAlert(false);
        setAlertContent(defaultAlert)
    };

    useEffect(() => {
        if (configuration) {
            methods.setValue('mapping', configuration?.mapping, {shouldDirty: true, shouldTouch: true});
        }
        if (configuration?.completed) {
            setCompleted(true)
        }
        if (configuration?.integrationMetadataId
        ) {
            getInstanceElementMetadata(configuration.integrationMetadataId.toString())
        }
        return () => {
            resetIntegrationContext()
            resetConfigurationContext()
            setSourceApplication(undefined)
            setEditCollectionAbsoluteKey("")
            setSelectedMetadata(undefined)
            setInstanceElementMetadata(undefined)
        }
    }, [])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setVersion(event.target.value);
        const version = Number(event.target.value)
        const integrationMetadata: IIntegrationMetadata[] = availableVersions
            .filter(metadata => metadata.version === version)
        setSelectedMetadata(integrationMetadata[0])
        if (integrationMetadata[0].id) {
            methods.setValue('integrationMetadataId', Number(integrationMetadata[0].id))
            getInstanceElementMetadata(integrationMetadata[0].id)
        }

    };

    const onSubmit = (data: any) => { // eslint-disable-line
        console.log(methods.formState.errors ? 'feil' : 'ingen feil')
        if (methods.formState.errors) {
            setAlertContent(errorAlert)
            setShowAlert(true);
        }
        data.mapping = pruneObjectMapping(data.mapping as IObjectMapping)
        if (configuration?.id) {
            ConfigurationRepository.updateConfiguration(configuration.id.toString(), data as IConfigurationPatch)
                .then(response => {
                    console.log('updated', response)
                    if (!response.data.completed) {
                        setAlertContent(savedAlert)
                        setShowAlert(true);
                    }
                    if (response.data.completed && !active) {
                        if (response.data.completed) {
                            setAlertContent(completedAlert)
                            setShowAlert(true);
                            setCompleted(true)
                        }
                    }
                    if (active && existingIntegration && existingIntegration.id) {
                        activateConfiguration(existingIntegration.id, response.data)
                    }
                }).catch(function (error) {
                    if (error.response?.status) {
                        setAlertContent({
                            severity: 'error',
                            message: 'Feilet under lagring, feilmelding: ' + (error.response.data.message ? error.response.data.message : 'Det har oppstått en feil') + ', status: ' + error.response.status
                        })
                        setShowAlert(true);
                    }
                }
            )
        } else {
            ConfigurationRepository.createConfiguration(data as IConfiguration)
                .then(response => {
                    console.log('created', response)
                    setConfiguration(response.data)
                    if (!response.data.completed) {
                        setAlertContent(savedAlert)
                        setShowAlert(true);
                    }
                    if (response.data.completed && !active) {
                        setAlertContent(completedAlert)
                        setShowAlert(true);
                        setCompleted(true)
                    }
                    if (active && existingIntegration && existingIntegration.id) {
                        activateConfiguration(existingIntegration.id, response.data)
                    }
                }).catch(function (error) {
                if (error.response?.status) {
                    setAlertContent({
                        severity: 'error',
                        message: 'Feilet under lagring, feilmelding: ' + (error.response.data.message ? error.response.data.message : 'Det har oppstått en feil') + ', status: ' + error.response.status
                    })
                    setShowAlert(true);
                }
            })
        }
    };

    function activateConfiguration(integrationId: string, configuration: IConfiguration) {
        const patch: IIntegrationPatch = {
            activeConfigurationId: configuration.id.toString(),
            state: IntegrationState.ACTIVE,
            destination: existingIntegration?.destination
        }
        IntegrationRepository.updateIntegration(integrationId, patch)
            .then(response => {
                setAlertContent(activeAlert)
                setShowAlert(true);
                setCompleted(true)
                console.log('set active configuration: ', response.data.activeConfigurationId)
            }).catch((e) => {
            console.log('could not set active configuration', e)
        })
    }

    const availableVersions: IIntegrationMetadata[] = allMetadata.filter(md => {
        return md.sourceApplicationId === selectedMetadata?.sourceApplicationId &&
            md.sourceApplicationIntegrationId === selectedMetadata.sourceApplicationIntegrationId
    })

    return (
        <DndProvider backend={HTML5Backend}>
            <EditingProvider>
                <FormProvider {...methods}>
                    <form id="react-hook-form" onSubmit={methods.handleSubmit(onSubmit)}>
                        <Box className={classes.configurationBox} sx={{m: 1}}>
                            <Typography sx={{m: 1}} variant={"h6"}>{t('header')}</Typography>
                            <Typography sx={{m: 1}}>
                                {t('integration')}: {existingIntegration?.sourceApplicationIntegrationId} - {existingIntegration?.displayName}
                            </Typography>
                            <Box sx={{mb: 1, width: (theme: Theme) => theme.spacing(100)}}>
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    <FormControl sx={{
                                        backgroundColor: 'white',
                                        width: (theme: Theme) => theme.spacing(44),
                                        mr: 1
                                    }}>
                                        <TextField
                                            select
                                            disabled={completed}
                                            size={"small"}
                                            id="version-select"
                                            value={version}
                                            label={t('metadataVersion')}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                                                handleChange(e)
                                            }}
                                        >
                                            {availableVersions.map((md, index) => {
                                                return <MenuItem
                                                    key={index}
                                                    value={md.version}>Versjon {md.version}
                                                </MenuItem>
                                            })}
                                        </TextField>
                                    </FormControl>
                                    {availableVersions.some(av => av.version > Number(version)) &&
                                        <Alert variant="outlined" severity="warning" sx={{color: 'black'}}>
                                            {t('metadataWarning')}
                                        </Alert>
                                    }
                                </div>
                            </Box>
                            <Controller
                                name={"comment".toString()}
                                render={({field}) =>
                                    <StringValueComponent
                                        {...field}
                                        classes={classes}
                                        displayName={"Kommentar"}
                                        multiline
                                        required={methods.watch("completed")}
                                    />
                                }
                            />
                        </Box>
                        <Box display="flex" position="relative" width={1} height={1} sx={{border: 'none'}}>
                            <IncomingDataComponent
                                classes={classes}
                                referencesForCollectionsToShow={collectionReferencesInEditContext}
                            />
                            <OutgoingDataComponent
                                classes={classes}
                                onCollectionReferencesInEditContextChange={
                                    (collectionReferences: string[]) => {
                                        setCollectionReferencesInEditContext(collectionReferences)
                                    }}
                            />
                        </Box>
                        <Box className={classes.formFooter}>
                            <button id="form-submit-btn" className={classes.submitButton}
                                    disabled={configuration?.completed} type="submit" onClick={onSubmit}>
                                {!methods.watch("completed") ? t("button.submit") : t("button.complete")}
                            </button>
                            <button id="form-cancel-btn" className={classes.submitButton} type="button"
                                    onClick={() => {
                                        history.push('/')
                                    }}
                            >{t("button.cancel")}
                            </button>
                            <Controller
                                name={"completed"}
                                render={({field}) =>
                                    <CheckboxValueComponent
                                        {...field}
                                        classes={classes}
                                        displayName={t('label.checkLabel')}
                                    />
                                }
                            />
                            {methods.watch("completed") && <FormControlLabel
                                control={
                                    <Checkbox
                                        id="form-active"
                                        checked={active}
                                        disabled={completed}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            setActive(event.target.checked)
                                        }}
                                        inputProps={{'aria-label': 'active-checkbox'}}/>}
                                label={t('label.activeLabel') as string}
                            />}
                        </Box>
                        <Snackbar id="integration-form-snackbar-saved" autoHideDuration={4000} open={showAlert}
                                  onClose={handleClose}>
                            <Alert onClose={handleClose} severity={alertContent.severity} sx={{width: '100%'}}>
                                {alertContent.message}
                            </Alert>
                        </Snackbar>
                    </form>
                </FormProvider>
            </EditingProvider>

        </DndProvider>
    );
}

export default ConfigurationForm;