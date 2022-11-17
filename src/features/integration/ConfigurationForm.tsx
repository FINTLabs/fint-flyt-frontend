import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {Link as RouterLink, RouteComponentProps, useHistory, withRouter} from "react-router-dom";
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    IconButton,
    Snackbar,
    Theme,
    Typography
} from "@mui/material";
import {createStyles, makeStyles} from "@mui/styles";
import {IFormConfiguration} from "./types/Form/FormData";
import {
    defaultConfigurationValues,
    getDestinationDisplayName,
    getSourceApplicationDisplayName
} from "./defaults/DefaultValues";
import AccordionForm from "./components/AccordionForm";
import {IAccordion} from "./types/Accordion";
import SourceApplicationForm from "./components/SourceApplicationForm";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";
import {CreationStrategy} from "./types/CreationStrategy";
import {newToFormData} from "../util/mapping/ToFormData";
import {ResourcesContext} from "../../context/resourcesContext";
import {IntegrationContext} from "../../context/integrationContext";
import {IntegrationForm} from "./components/IntegrationForm";
import CloseIcon from '@mui/icons-material/Close';
import {useTranslation} from "react-i18next";
import InputField from "./components/form/InputField";
import {INPUT_TYPE} from "./types/InputType.enum";
import {toConfigurationPatch, toNewConfiguration} from "../util/mapping/ToConfiguration";
import {IConfigurationPatch, newIConfiguration} from "./types/Configuration";
import ConfigurationRepository from "../../shared/repositories/ConfigurationRepository";
import IntegrationRepository from "../../shared/repositories/IntegrationRepository";
import {IIntegrationPatch, IntegrationState} from "./types/Integration";
import {MOCK_ACCS, MOCK_ACCS1} from "../../__tests__/mock/mock_accordions";
import {toExpandedProp, toHiddenProp} from "./components/form/FormUtil";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        form: {
            width: theme.spacing(100)
        },
        row: {
            display: 'flex',
            alignItems: 'center',
            position: 'sticky',
            top: 0,
            background: 'white'
        },
        column: {
            flex: '50%',
            paddingLeft: theme.spacing(2)
        },
        buttonContainer: {
            background: 'white',
            padding: theme.spacing(2),
            height: 'fit-content',
            position: 'sticky',
            bottom: theme.spacing(0),
            zIndex: 1,
            width: '100%'
        },
        sourceApplicationFormContainer: {
            marginTop: theme.spacing(6),
            marginLeft: theme.spacing(8),
            padding: theme.spacing(2),
            border: 'solid 1px',
            borderColor: 'black',
            borderRadius: '4px',
            height: 'fit-content',
            position: 'sticky',
            top: theme.spacing(16)
        },
        sourceApplicationForm: {
            opacity: 0.99,
            width: theme.spacing(60),
            height: 'fit-content',
            overflow: 'auto',
            maxHeight: theme.spacing(100)
        },
        accordion: {
            marginBottom: theme.spacing(2),
            width: theme.spacing(100)
        },
        accordionSummary: {
            backgroundColor: theme.palette.primary.light,
        },
        formControl: {
            width: theme.spacing(70)
        },
        button: {
            marginRight: theme.spacing(1)
        },
        submitButton: {
            backgroundColor: theme.palette.primary.dark,
            border: 'none',
            color: 'white',
            padding: theme.spacing(2),
            cursor: 'pointer'
        }
    })
);

const ConfigurationForm: React.FunctionComponent<RouteComponentProps<any>> = () => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.configurationForm'});
    const classes = useStyles();
    const {caseNumber, newIntegration, existingIntegration, setExistingIntegration, setNewIntegration, selectedMetadata, configuration, setConfiguration, resetSourceAndDestination, getNewIntegrations} = useContext(IntegrationContext);
    const { getAllResources, resetAllResources } = useContext(ResourcesContext);
    const editConfig: boolean = window.location.pathname === '/integration/configuration/edit'
    const [submitSuccess, setSubmitSuccess] = useState(false)
    const [saved, setSaved] = React.useState(false);
    const [saveError, setSaveError] = React.useState(false);
    const [checked, setChecked] = React.useState(configuration && editConfig ? configuration.completed : false);
    const [activeChecked, setActiveChecked] = React.useState(false);
    let history = useHistory();
    let activeIntegration = (editConfig || (!editConfig && existingIntegration)) ? existingIntegration : newIntegration;
    let activeConfiguration = configuration && editConfig ? configuration : undefined;
    const [activeConfigId, setActiveConfigId] = React.useState(activeConfiguration?.id);
    const [completed, setCompleted] = React.useState(!!activeConfiguration?.completed);
    let activeFormData = activeConfiguration && editConfig && configuration? newToFormData(configuration) : defaultConfigurationValues;
    const [protectedCheck, setProtectedChecked] = React.useState(activeFormData.applicantData.protected);
    const {handleSubmit, watch, setValue, control, reset, formState} = useForm<any>({defaultValues: activeFormData, reValidateMode: 'onChange'});
    const { errors } = formState;
    const accordionList: IAccordion[] = MOCK_ACCS.map(accordion => {
        return ({id: accordion.id, header: accordion.header, defaultExpanded: toExpandedProp(accordion.defaultExpanded, activeConfiguration), hidden: accordion.hidden ? toHiddenProp(accordion.hidden, watch, activeConfiguration) : undefined, inputFieldGroups: accordion.inputFieldGroups})
    });

    const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        setActiveChecked(false);
    };
    const handleActiveCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setActiveChecked(event.target.checked);
    };

    useEffect(() => {
        getAllResources();
        return () => {
            setNewIntegration(undefined);
            setExistingIntegration(undefined);
            resetAllResources();
            resetSourceAndDestination();
        };
    }, [])


    const updateIntegration = (integrationId: string, configuration: any) => {
        let patch: IIntegrationPatch = {
            activeConfigurationId: configuration.id,
            state: IntegrationState.ACTIVE,
            destination: configuration.destination
        }
        IntegrationRepository.updateIntegration(integrationId, patch)
            .then(response => {
                console.log('set active configuration: ', response.data.activeConfigurationId, ' active: ')
            }).catch((e)=> {
            console.log('could not set active configuration', e)
        })
    }

    const saveNewConfiguration = (integrationId: string, data: newIConfiguration) => {
        console.log('save new config', integrationId, data)
        ConfigurationRepository.createConfiguration(integrationId, data)
            .then(response => {
                console.log('created new configuration on integration ', integrationId, data, response);
                setConfiguration(response.data)
                setActiveConfigId(response.data.id)
                setSaved(true);
                getNewIntegrations();
            })
            .catch((e: Error) => {
                setSaveError(true);
                console.log('error creating new', e);
            });
    }

    const saveConfiguration = (integrationId: string, configurationId: string, data: IConfigurationPatch) => {
        console.log('save config', integrationId, configurationId, data)
        ConfigurationRepository.updateConfiguration(configurationId, data)
            .then(response => {
                console.log('updated configuration: ', configurationId, data, response);
                setSaved(true);
                getNewIntegrations();
            })
            .catch((e: Error) => {
                setSaveError(true);
                console.log('error updating configuration', e);
            });
    }

    const activateNewConfiguration = (integrationId: string, data: newIConfiguration) => {
        console.log('publish new config', integrationId, data)
        ConfigurationRepository.createConfiguration(integrationId, data)
            .then(response => {
                console.log('created new configuration', data, response);
                if(activeChecked) {
                    updateIntegration(response.data.integrationId, response.data)
                }
                resetAllResources();
                setSubmitSuccess(true);
                getNewIntegrations();
            })
            .catch((e: Error) => {
                console.log('error creating new', e);
            });
    }

    const activateConfiguration = (integrationId: string, configurationId: string, data: IConfigurationPatch) => {
        console.log('publish config', configurationId, data)
        ConfigurationRepository.updateConfiguration(configurationId, data)
            .then(response => {
                if(activeChecked) {
                    updateIntegration(response.data.integrationId, response.data)
                }
                console.log('updated configuration: ', data, response);
                resetAllResources();
                setSubmitSuccess(true);
                getNewIntegrations();
            })
            .catch((e: Error) => {
                console.log('error updating configuration', e);
            });
    }

    const handleCancel = () => {
        history.push({
            pathname: '/',
        })
        setConfiguration({elements: []});
    }

    const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSaved(false);
        setSaveError(false);
    };

    const snackbarAction = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleSnackbarClose}>{t('button.close')}</Button>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    const onSubmit = handleSubmit((data: IFormConfiguration) => {
        if (data.caseData.caseCreationStrategy === CreationStrategy.COLLECTION && caseNumber === undefined) {
            setSaveError(true)
            return;
        }
        if (data.caseData.caseCreationStrategy === CreationStrategy.COLLECTION && caseNumber) {
            data.caseData.caseNumber = caseNumber
        }
        data.completed = true;
        const configuration: newIConfiguration = toNewConfiguration(data, activeIntegration?.id, activeConfigId, selectedMetadata.id);
        if (configuration && activeConfigId !== undefined) {
            const iConfiguration: newIConfiguration = toConfigurationPatch(data, selectedMetadata.id);
            activateConfiguration(activeIntegration?.id, activeConfigId, iConfiguration)
            reset({ ...defaultConfigurationValues })
        }
        else if (configuration && activeIntegration?.id) {
            activateNewConfiguration(activeIntegration?.id, configuration);
            reset({ ...defaultConfigurationValues })
        } else {
            //TODO: Handle error
            return;
        }
    });

    const onSave = handleSubmit((data: IFormConfiguration) => {
        if (data.caseData.caseCreationStrategy === CreationStrategy.COLLECTION && caseNumber === undefined) {
            setSaveError(true)
            return;
        }
        if (data.caseData.caseCreationStrategy === CreationStrategy.COLLECTION && caseNumber) {
            data.caseData.caseNumber = caseNumber
        }
        data.completed = false;
        console.log(data)
        const configuration: newIConfiguration = toNewConfiguration(data, activeIntegration?.id, activeConfigId, selectedMetadata.id);
        if (configuration && activeConfigId !== undefined) {
            const iConfiguration: newIConfiguration = toConfigurationPatch(data, selectedMetadata.id);
            saveConfiguration(activeIntegration?.id, activeConfigId, iConfiguration)
        }
        else if (activeIntegration?.id && configuration) {
            saveNewConfiguration(activeIntegration.id, configuration);
        } else {
            //TODO: Handle error
            return;
        }
    });

    return (
        <DndProvider backend={HTML5Backend}>
            {!existingIntegration && !newIntegration && <IntegrationForm/>}
            {!submitSuccess && (existingIntegration || newIntegration) &&
                <Box display="flex" position="relative" width={1} height={1}>
                    <Box>
                        <Box sx={{mb: 2}}>
                        <Typography id="integration-form-header" aria-label="integration-form-header" variant={"h5"} sx={{ mb: 2 }}>{t('header')}</Typography>
                        <Typography><strong>{t('integrationId')}: </strong>{activeIntegration?.id}</Typography>
                        <Typography><strong>{t('sourceApplicationId')}: </strong>{getSourceApplicationDisplayName(activeIntegration?.sourceApplicationId)}</Typography>
                        <Typography><strong>{t('sourceApplicationIntegrationId')}: </strong>{activeIntegration?.sourceApplicationIntegrationId} - {selectedMetadata.integrationDisplayName}</Typography>
                        <Typography><strong>{t('destination')}: </strong>{getDestinationDisplayName(activeIntegration?.destination)}</Typography>
                        </Box>
                        <form id="integration-form"  className={classes.form} onSubmit={onSubmit}>
                            {accordionList.map((accordion, index) => {
                                return (
                                    <AccordionForm
                                        id={accordion.id}
                                        inputFieldGroups={accordion.inputFieldGroups}
                                        activeFormData={activeFormData}
                                        activeConfiguration={activeConfiguration}
                                        key={index}
                                        style={classes}
                                        header={accordion.header}
                                        defaultExpanded={accordion.defaultExpanded}
                                        hidden={accordion.hidden}
                                        integration={activeIntegration}
                                        watch={watch}
                                        control={control}
                                        setValue={setValue}
                                        errors={errors}
                                        validation={checked}
                                        disabled={completed}
                                        editConfig={editConfig}
                                        onSave={onSave}
                                        protectedCheck={protectedCheck}
                                        setProtectedChecked={setProtectedChecked}
                                    />
                                )
                            })}
                            <div>
                                <Box sx={{display: 'flex'}}>
                                    <Box width={'80%'}>
                                        <Typography>{t('comment')}</Typography>
                                        <InputField disabled={completed} input={INPUT_TYPE.TEXT_AREA} control={control} label="labels.comment" formValue="comment" error={errors.comment} helpText="comment"/>
                                    </Box>
                                </Box>
                                <FormGroup sx={{ ml: 2, mb: 2 }} >
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                disabled={completed}
                                                id="form-complete"
                                                checked={checked}
                                                onChange={handleCheckChange}
                                                inputProps={{ 'aria-label': 'completed-checkbox' }}/>}
                                        label={t('checkLabel') as string} />
                                    {checked && <FormControlLabel
                                        control={
                                            <Checkbox
                                                disabled={completed}
                                                id="form-complete"
                                                checked={activeChecked}
                                                onChange={handleActiveCheckChange}
                                                inputProps={{ 'aria-label': 'active-checkbox' }}/>}
                                        label={t('activeLabel') as string} />}
                                </FormGroup>
                            </div>
                            <Box className={classes.buttonContainer}>
                                <Button disabled={completed} id="integration-form-submit-btn" sx={{ ml: 2, mr: 2 }} onClick={checked ? onSubmit : onSave} variant="contained">{checked ? t('button.complete') : t('button.save')}</Button>
                                <Button id="integration-form-cancel-btn" onClick={handleCancel} variant="contained">{t('button.cancel')}</Button>
                            </Box>
                        </form>
                    </Box>
                    <Box className={classes.sourceApplicationFormContainer}>
                        <SourceApplicationForm style={classes} />
                    </Box>
                    <Snackbar
                        id="integration-form-snackbar-saved"
                        open={saved}
                        autoHideDuration={4000}
                        onClose={handleSnackbarClose}
                        message={t('messages.success')}
                        action={snackbarAction}
                    />
                    <Snackbar
                        id="integration-form-snackbar-error"
                        open={saveError}
                        autoHideDuration={4000}
                        onClose={handleSnackbarClose}
                        message={t('messages.error')}
                        action={snackbarAction}
                    />
                </Box>
            }
            {submitSuccess &&
                <Box style={{ minHeight: 'fit-content' }}>
                    <Typography variant={"h5"} sx={{ mb: 2 }}>{t('successHeader')}</Typography>
                    <Button size="small" variant="contained" component={RouterLink} to="/integration/configuration/list">{t('button.integrationOverview')}</Button>
                    <Button size="small" variant="contained" sx={{ ml: 2 }} component={RouterLink} to="/">{t('button.dashboard')}</Button>
                </Box>}
        </DndProvider>
    );
}

export default withRouter(ConfigurationForm);
