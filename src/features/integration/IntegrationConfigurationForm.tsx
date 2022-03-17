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
import IFormData from "./types/Form/FormData";
import IntegrationRepository from "./repository/IntegrationRepository";
import {defaultValues} from "./defaults/DefaultValues";
import {toIntegrationConfiguration} from "../util/ToIntegrationConfiguration";
import AccordionForm from "./components/AccordionForm";
import {ACCORDION_FORM, IAccordion} from "./types/Accordion";
import SourceApplicationForm from "./components/SourceApplicationForm";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";
import {IIntegrationConfiguration} from "./types/IntegrationConfiguration";
import {CreationStrategy} from "./types/CreationStrategy";
import {toFormData} from "../util/ToFormData";
import {ResourcesContext} from "../../resourcesContext";
import {IntegrationContext} from "../../integrationContext";
import {FormSettings} from "./components/FormSettings";
import CloseIcon from '@mui/icons-material/Close';

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
            width: theme.spacing(40),
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

const IntegrationConfigurationForm: React.FunctionComponent<RouteComponentProps<any>> = () => {
    const classes = useStyles();
    let history = useHistory();
    const editConfig: boolean = window.location.pathname === '/integration/configuration/edit'
    const [submitSuccess, setSubmitSuccess] = useState(false)
    const [settings, setSettings] = useState(false)
    const { integration, sourceApplication, destination, setIntegration, resetSourceAndDestination } = useContext(IntegrationContext)
    const [activeId, setActiveId] = useState<any>(undefined)
    let activeConfiguration = integration.integrationId && editConfig ? integration : undefined;
    let activeFormData = integration.integrationId && editConfig ? toFormData(integration) : defaultValues;
    const [saved, setSaved] = React.useState(false);
    const [saveError, setSaveError] = React.useState(false);
    const [checked, setChecked] = React.useState(false);

    const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    const {handleSubmit, watch, setValue, control, reset, formState} = useForm<IFormData>({
        defaultValues: activeFormData,
        reValidateMode: 'onChange'
    });
    const { errors } = formState;

    const { getAllResources, resetAllResources } = useContext(ResourcesContext);
    useEffect(()=> {
        getAllResources();
        return () => {
            resetAllResources();
            resetSourceAndDestination();
        };
    }, [])

    const accordionList: IAccordion[] = [
        {summary: "Integrasjonslogikk", accordionForm: ACCORDION_FORM.CASE_INFORMATION, defaultExpanded: true},
        {summary: "Sak", accordionForm: ACCORDION_FORM.CASE_FORM, defaultExpanded: false, hidden: watch("caseData.caseCreationStrategy") === CreationStrategy.COLLECTION},
        {summary: "Journalpost", accordionForm: ACCORDION_FORM.RECORD_FORM, defaultExpanded: false},
        {summary: "Dokument- og objektbeskrivelse", accordionForm: ACCORDION_FORM.DOCUMENT_FORM, defaultExpanded: false},
        {summary: "Avsender", accordionForm: ACCORDION_FORM.APPLICANT_FORM, defaultExpanded: false}
    ]

    const saveNewConfiguration = (data: IIntegrationConfiguration) => {
        IntegrationRepository.create(data)
            .then(response => {
                console.log('created new configuraton', data, response);
                setActiveId(response.headers.location.split('/').pop())
                setSaved(true);
            })
            .catch((e: Error) => {
                setSaveError(true);
                console.log('error creating new', e);
            });
    }
    const saveConfiguration = (id: string, data: IIntegrationConfiguration) => {
        IntegrationRepository.update(id, data)
            .then(response => {
                console.log('updated configuraton: ', id,  data, response);
                setSaved(true);
            })
            .catch((e: Error) => {
                setSaveError(true);
                console.log('error updating configuration', e);
            });
    }

    const publishNewConfiguration = (data: IIntegrationConfiguration) => {
        IntegrationRepository.create(data)
            .then(response => {
                console.log('created new configuraton', data, response);
                resetAllResources();
                setSubmitSuccess(response.status === 201);
            })
            .catch((e: Error) => {
                console.log('error creating new', e);
            });
    }

    const publishConfiguration = (id: string, data: IIntegrationConfiguration) => {
        IntegrationRepository.update(id, data)
            .then(response => {
                console.log('updated configuraton: ', id,  data, response);
                resetAllResources();
                setSubmitSuccess(response.status === 200);
            })
            .catch((e: Error) => {
                console.log('error updating configuration', e);
            });
    }

    const handleCancel = () => {
        history.push({
            pathname: '/',
        })
        setIntegration({});
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
            <Button color="secondary" size="small" onClick={handleClose}>Lukk</Button>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    const onSubmit = handleSubmit((data: IFormData) => {
        data.sourceApplication = sourceApplication;
        data.destination = destination;
        data.published = true;
        const integrationConfiguration: IIntegrationConfiguration = toIntegrationConfiguration(data);
        if(integrationConfiguration && activeId !== undefined && activeConfiguration?.integrationId == undefined) {
            const integrationConfiguration: IIntegrationConfiguration = toIntegrationConfiguration(data, activeId);
            publishConfiguration(activeId, integrationConfiguration)
            reset({ ...defaultValues })
        }
        else if (integrationConfiguration && activeId == undefined && activeConfiguration?.integrationId !== undefined) {
            const integrationConfiguration: IIntegrationConfiguration = toIntegrationConfiguration(data, activeConfiguration.integrationId);
            publishConfiguration(activeConfiguration.integrationId, integrationConfiguration)
            reset({ ...defaultValues })
        }
        else if(integrationConfiguration) {
            publishNewConfiguration(integrationConfiguration);
            reset({ ...defaultValues })
        } else {
            //TODO: Handle error
            return;
        }
    });

    const onSave = handleSubmit((data: IFormData) => {
        data.sourceApplication = sourceApplication;
        data.destination = destination;
        data.published = false;
        const integrationConfiguration: IIntegrationConfiguration = toIntegrationConfiguration(data);
        if(integrationConfiguration && activeId !== undefined) {
            const integrationConfiguration: IIntegrationConfiguration = toIntegrationConfiguration(data, activeId);
            saveConfiguration(activeId, integrationConfiguration)
        }
        else if(integrationConfiguration && activeConfiguration?.integrationId !== undefined) {
            const integrationConfiguration: IIntegrationConfiguration = toIntegrationConfiguration(data, activeConfiguration.integrationId);
            saveConfiguration(activeConfiguration.integrationId, integrationConfiguration)
        }
        else if(integrationConfiguration) {
            saveNewConfiguration(integrationConfiguration);
        } else {
            //TODO: Handle error
            return;
        }
    });

    return (
        <DndProvider backend={HTML5Backend}>
            {!settings && !activeConfiguration && <FormSettings setSettings={setSettings}/>}
            {!submitSuccess && (activeConfiguration || settings) &&
                <Box display="flex" position="relative" width={1} height={1}>
                    <Box>
                        <Typography aria-label="Integrasjon til arkiv" variant={"h5"} sx={{mb: 2}}>Integrasjon til arkiv</Typography>
                        <form className={classes.form} onSubmit={onSubmit}>
                            {accordionList.map((accordion, index) => {
                                return (
                                    <AccordionForm
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
                                        validation={false}
                                        editConfig={editConfig}
                                        onSave={onSave}
                                    />
                                )})}
                            <div >
                                <FormGroup sx={{ml: 2, mb: 2}} >
                                    <FormControlLabel
                                        control={<Checkbox
                                            checked={checked}
                                            onChange={handleCheckChange}
                                            inputProps={{ 'aria-label': 'ferdigstilt-checkbox' }}/>}
                                        label="Ferdigstilt" />
                                </FormGroup>
                                <Button sx={{ml: 2, mr: 2}} onClick={checked? onSubmit:onSave} variant="contained">Lagre</Button>
                                <Button onClick={handleCancel} variant="contained">Avbryt</Button>
                            </div>
                        </form>
                    </Box>
                    <Box className={classes.sourceApplicationFormContainer}>
                        <SourceApplicationForm style={classes}/>
                    </Box>
                    <Snackbar
                        open={saved}
                        autoHideDuration={4000}
                        onClose={handleClose}
                        message="Lagret"
                        action={action}
                    />
                    <Snackbar
                        open={saveError}
                        autoHideDuration={4000}
                        onClose={handleClose}
                        message="En feil har oppstått"
                        action={action}
                    />
                </Box>
            }
            {submitSuccess && settings &&
                <Box style={{minHeight: 'fit-content'}}>
                    <Typography variant={"h5"} sx={{mb: 2}}>Integrasjon til arkiv - Ferdig</Typography>
                    <Button size="small" variant="contained" component={RouterLink} to="/overview">Se integrasjoner</Button>
                    <Button size="small" variant="contained" sx={{ml: 2}} component={RouterLink} to="/">Dashboard</Button>
                </Box>
            }
        </DndProvider>
    );
}

export default withRouter(IntegrationConfigurationForm);
