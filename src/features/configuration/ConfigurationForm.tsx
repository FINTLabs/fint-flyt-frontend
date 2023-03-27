import React, {useContext, useEffect, useState} from 'react';
import {RouteComponentProps, useHistory, withRouter} from 'react-router-dom';
import {SourceApplicationContext} from "../../context/sourceApplicationContext";
import OutgoingDataComponent from "./components/OutgoingDataComponent";
import {Controller, FormProvider, useForm} from "react-hook-form";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";
import IncomingDataComponent from "./components/IncomingDataComponent";
import {Box, Checkbox, FormControlLabel, Typography} from "@mui/material";
import {IntegrationContext} from "../../context/integrationContext";
import {IIntegrationMetadata} from "./types/Metadata/IntegrationMetadata";
import {useTranslation} from "react-i18next";
import {configurationFormStyles} from "./styles/ConfigurationForm.styles";
import ConfigurationRepository from "../../shared/repositories/ConfigurationRepository";
import CheckboxValueComponent from "./components/common/CheckboxValueComponent";
import IntegrationRepository from "../../shared/repositories/IntegrationRepository";
import {IConfiguration} from "./types/Configuration";
import {IIntegrationPatch, IntegrationState} from "../integration/types/Integration";
import {ConfigurationContext} from "../../context/configurationContext";
import SelectValueComponent from "./components/mapping/value/select/SelectValueComponent";
import StringValueComponent from "./components/mapping/value/string/StringValueComponent";

const useStyles = configurationFormStyles

const ConfigurationForm: React.FunctionComponent<RouteComponentProps<any>> = () => {
    const {sourceApplication, allMetadata} = useContext(SourceApplicationContext)
    const {
        completed,
        setCompleted,
        editCollectionAbsoluteKey,
        resetConfigurationContext
    } = useContext(ConfigurationContext)
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


    const methods = useForm({
        defaultValues: configuration
            ? {...configuration}
            : {
                integrationId: existingIntegration?.id,
                integrationMetadataId: selectedMetadata.id,
                completed: false
            }
    });

    if (!existingIntegration) {
        history.push('/')
    }

    useEffect(() => {
        if (configuration?.completed) {
            setCompleted(true)
        }
        return () => {
            resetIntegrationContext()
            resetConfigurationContext()
        }
    }, [])
    const initialVersion: number = selectedMetadata.version;
    const [version, setVersion] = React.useState<string>(initialVersion ? String(initialVersion) : '');
    const [collectionReferencesInEditContext, setCollectionReferencesInEditContext] = useState<string[]>([])

    const onSubmit = (data: any) => {
        console.log('submitting data ', data);
        if (configuration) {
            ConfigurationRepository.updateConfiguration(configuration.id.toString(), data)
                .then(response => {
                        setConfiguration(response.data)
                        if (response.data.completed) {
                            setCompleted(true)
                        }
                        if (active && existingIntegration) {
                            activateConfiguration(existingIntegration.id, response.data)
                        }
                    }
                ).catch(e => {
                console.log('error', e)
            })
        } else {
            ConfigurationRepository.createConfiguration(data)
                .then(response => {
                        setConfiguration(response.data)
                        if (response.data.completed) {
                            setCompleted(true)
                        }
                        if (active && existingIntegration) {
                            activateConfiguration(existingIntegration.id, response.data)
                        }
                    }
                ).catch(e => {
                console.log('error', e)
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
                console.log('set active configuration: ', response.data.activeConfigurationId, ' active: ')
            }).catch((e) => {
            console.log('could not set active configuration', e)
        })
    }

    const availableVersions: IIntegrationMetadata[] = allMetadata.filter(md => {
        return md.sourceApplicationId === selectedMetadata.sourceApplicationId &&
            md.sourceApplicationIntegrationId === selectedMetadata.sourceApplicationIntegrationId
    })

    return (
        <DndProvider backend={HTML5Backend}>
            <FormProvider {...methods}>
                <form id="react-hook-form" onSubmit={methods.handleSubmit(onSubmit)}>
                    <Box sx={{m: 1}}>
                        <Typography variant={"h6"}>{t('header')}</Typography>
                        <Typography>
                            Integrasjon: {existingIntegration?.sourceApplicationIntegrationId} - {existingIntegration?.displayName}
                        </Typography>
                        <Controller
                            name={"integrationMetadataId".toString()}
                            defaultValue={''}
                            render={({field}) =>
                                <SelectValueComponent
                                    {...field}
                                    displayName={t('metadataVersion')}
                                    selectables={
                                        availableVersions.map(metadata => {
                                            return {
                                                displayName: metadata.version.toString(),
                                                value: metadata.id ? metadata.id.toString() : "0"
                                            }
                                        })}
                                />
                            }
                        />
                        <Controller
                            name={"comment".toString()}
                            render={({field}) =>
                                <StringValueComponent
                                    {...field}
                                    classes={classes}
                                    displayName={"Kommentar"}
                                    multiline
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
                        <button id="form-submit-btn" className={classes.submitButton} type="submit" onClick={onSubmit}>
                            {t("button.submit")}
                        </button>
                        <button id="form-cancel-btn" className={classes.submitButton} type="button"
                                onClick={() => {
                                    console.log('cancel')
                                }}
                        >{t("button.cancel")}
                        </button>
                        <CheckboxValueComponent absoluteKey={"completed"} displayName={t('label.checkLabel')}/>
                        <FormControlLabel
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
                        />
                    </Box>
                </form>
            </FormProvider>
        </DndProvider>
    );
}

export default withRouter(ConfigurationForm);