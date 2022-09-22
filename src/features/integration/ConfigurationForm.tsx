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
import {defaultConfigurationValues} from "./defaults/DefaultValues";
import AccordionForm from "./components/AccordionForm";
import {ACCORDION_FORM, IAccordion} from "./types/Accordion";
import SourceApplicationForm from "./components/SourceApplicationForm";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";
import {CreationStrategy} from "./types/CreationStrategy";
import {toFormConfigData} from "../util/ToFormData";
import {ResourcesContext} from "../../context/resourcesContext";
import {IntegrationContext} from "../../context/integrationContext";
import {IntegrationForm} from "./components/IntegrationForm";
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from "react-i18next";
import InputField from "./components/form/InputField";
import {INPUT_TYPE} from "./types/InputType.enum";
import {toNewConfiguration} from "../util/ToConfiguration";
import {IConfiguration} from "./types/Configuration";
import ConfigurationRepository from "./repository/ConfigurationRepository";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        form: {
            width: theme.spacing(100)
        },
        row: {
            display: 'flex'
        },
        column: {
            flex: '50%',
            paddingLeft: theme.spacing(2)
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
            width: theme.spacing(50),
            height: 'fit-content'
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
    const {t} = useTranslation('translations', {keyPrefix: 'pages.integrationForm'});
    const classes = useStyles();
    const editConfig: boolean = window.location.pathname === '/integration/configuration/edit'
    const [submitSuccess, setSubmitSuccess] = useState(false)
    const {newIntegration, setNewIntegration, configuration, setConfiguration, resetSourceAndDestination, getNewIntegrations} = useContext(IntegrationContext);
    const [saved, setSaved] = React.useState(false);
    const [saveError, setSaveError] = React.useState(false);
    const [activeConfigId, setActiveConfigId] = React.useState(undefined);
    const [checked, setChecked] = React.useState(configuration && editConfig ? configuration.completed : false);
    const [activeChecked, setActiveChecked] = React.useState(false);
    const [protectedCheck, setProtectedChecked] = React.useState(false);
    let history = useHistory();
    let activeConfiguration = configuration.configurationId && editConfig ? configuration : undefined;
    let activeFormData = activeConfiguration && editConfig ? toFormConfigData(configuration) : defaultConfigurationValues;

    const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        setActiveChecked(false);
    };
    const handleActiveCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setActiveChecked(event.target.checked);
    };

    const {handleSubmit, watch, setValue, control, reset, formState} = useForm<IFormConfiguration>({
        defaultValues: activeFormData,
        reValidateMode: 'onChange'
    });
    const { errors } = formState;

    const { getAllResources, resetAllResources } = useContext(ResourcesContext);

    useEffect(() => {
        getAllResources();
        return () => {
            setNewIntegration(undefined);
            resetAllResources();
            resetSourceAndDestination();
        };
    }, [])

    const accordionList: IAccordion[] = [
        {id: 'case-information', summary: "caseInformation.header", accordionForm: ACCORDION_FORM.CASE_INFORMATION, defaultExpanded: true},
        {id: 'case-form', summary: "caseForm.header", accordionForm: ACCORDION_FORM.CASE_FORM, defaultExpanded: false, hidden: watch("caseData.caseCreationStrategy") === CreationStrategy.COLLECTION},
        {id: 'record-form', summary: "recordForm.header", accordionForm: ACCORDION_FORM.RECORD_FORM, defaultExpanded: false},
        {id: 'document-object-form', summary: "documentForm.header", accordionForm: ACCORDION_FORM.DOCUMENT_FORM, defaultExpanded: false},
        {id: 'applicant-form', summary: "applicationForm.header", accordionForm: ACCORDION_FORM.APPLICANT_FORM, defaultExpanded: false}
    ]

    const saveNewConfiguration = (integrationId: string, data: IConfiguration) => {
        console.log('save new config', integrationId, data)
        ConfigurationRepository.createConfiguration(integrationId, data)
            .then(response => {
                console.log('created new configuration on integration ', integrationId, data, response);
                //TODO: fix and set active ID
                setConfiguration(response.data)
                setSaved(true);
                getNewIntegrations();
            })
            .catch((e: Error) => {
                setSaveError(true);
                console.log('error creating new', e);
            });
    }
    const saveConfiguration = (integrationId: string, configurationId: string, data: IConfiguration) => {
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

    const activateNewConfiguration = (integrationId: string, data: IConfiguration) => {
        console.log('publish new config', integrationId, data)
        ConfigurationRepository.createConfiguration(integrationId, data)
            .then(response => {
                console.log('created new configuration', data, response);
                resetAllResources();
                setSubmitSuccess(true);
                getNewIntegrations();
            })
            .catch((e: Error) => {
                console.log('error creating new', e);
            });
    }

    const activateConfiguration = (configurationId: string, data: IConfiguration) => {
        console.log('publish config', configurationId, data)
        ConfigurationRepository.updateConfiguration(configurationId, data)
            .then(response => {
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
        setConfiguration({});
    }

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSaved(false);
        setSaveError(false);
    };

    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>{t('button.close')}</Button>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    const onSubmit = handleSubmit((data: IFormConfiguration) => {
        data.completed = true;
        data.applicantData.protected = protectedCheck;
        const configuration: IConfiguration = toNewConfiguration(data);
        if (configuration && activeConfiguration?.configurationId !== undefined && newIntegration?.integrationId !== undefined) {
            const configuration: IConfiguration = toNewConfiguration(data,newIntegration.integrationId, activeConfiguration.configurationId);
            activateConfiguration(activeConfiguration.configurationId, configuration)
            reset({ ...defaultConfigurationValues })
        }
        else if (configuration && newIntegration?.integrationId) {
            activateNewConfiguration(newIntegration?.integrationId, configuration);
            reset({ ...defaultConfigurationValues })
        } else {
            //TODO: Handle error
            return;
        }
    });

    const onSave = handleSubmit((data: IFormConfiguration) => {
        data.completed = false;
        data.applicantData.protected = protectedCheck;
        const configuration: IConfiguration = toNewConfiguration(data);
        if (configuration && activeConfiguration?.configurationId !== undefined && newIntegration?.integrationId !== undefined) {
            const iConfiguration: IConfiguration = toNewConfiguration(data, newIntegration.integrationId, activeConfiguration.configurationId);
            saveConfiguration(newIntegration?.integrationId, activeConfiguration.configurationId, iConfiguration)
        }
        else if (newIntegration?.integrationId && configuration) {
            saveNewConfiguration(newIntegration.integrationId, configuration);
        } else {
            //TODO: Handle error
            return;
        }
    });

    return (
        <DndProvider backend={HTML5Backend}>
            {!newIntegration && <IntegrationForm/>}
            {!submitSuccess && newIntegration &&
                <Box display="flex" position="relative" width={1} height={1}>
                    <Box>
                        <Typography id="integration-form-header" aria-label="integration-form-header" variant={"h5"} sx={{ mb: 2 }}>{t('header')}</Typography>
                        <form id="integration-form"  className={classes.form} onSubmit={onSubmit}>
                            {accordionList.map((accordion, index) => {
                                return (
                                    <AccordionForm
                                        id={accordion.id}
                                        activeFormData={activeFormData}
                                        key={index}
                                        style={classes}
                                        summary={accordion.summary}
                                        accordionForm={accordion.accordionForm}
                                        defaultExpanded={accordion.defaultExpanded}
                                        hidden={accordion.hidden}
                                        watch={watch}
                                        control={control}
                                        setValue={setValue}
                                        errors={errors}
                                        validation={checked}
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
                                        <InputField input={INPUT_TYPE.TEXT_FIELD} control={control} label="labels.comment" formValue="comment" error={errors.comment} helpText="comment"/>
                                    </Box>
                                </Box>
                                <FormGroup sx={{ ml: 2, mb: 2 }} >
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                id="form-complete"
                                                checked={checked}
                                                onChange={handleCheckChange}
                                                inputProps={{ 'aria-label': 'completed-checkbox' }}/>}
                                        label={t('checkLabel') as string} />
                                    {checked && <FormControlLabel
                                        control={
                                            <Checkbox
                                                id="form-complete"
                                                checked={activeChecked}
                                                onChange={handleActiveCheckChange}
                                                inputProps={{ 'aria-label': 'active-checkbox' }}/>}
                                        label="Aktiv" />}
                                </FormGroup>
                                <Button id="integration-form-submit-btn" sx={{ ml: 2, mr: 2 }} onClick={checked ? onSubmit : onSave} variant="contained">{t('button.save')}</Button>
                                <Button id="integration-form-cancel-btn" onClick={handleCancel} variant="contained">{t('button.cancel')}</Button>
                            </div>
                        </form>
                    </Box>
                    <Box className={classes.sourceApplicationFormContainer}>
                        <SourceApplicationForm style={classes} />
                    </Box>
                    <Snackbar
                        id="integration-form-snackbar-saved"
                        open={saved}
                        autoHideDuration={4000}
                        onClose={handleClose}
                        message={t('messages.success')}
                        action={action}
                    />
                    <Snackbar
                        id="integration-form-snackbar-error"
                        open={saveError}
                        autoHideDuration={4000}
                        onClose={handleClose}
                        message={t('messages.error')}
                        action={action}
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