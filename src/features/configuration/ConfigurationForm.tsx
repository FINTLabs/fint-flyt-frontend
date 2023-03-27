import React, {useContext, useState} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
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
import {ConfigurationContext} from '../../context/configurationContext';
import SelectValueComponent from "./components/mapping/value/select/SelectValueComponent";
import StringValueComponent from "./components/mapping/value/string/StringValueComponent";

const useStyles = configurationFormStyles

const ConfigurationForm: React.FunctionComponent<RouteComponentProps<any>> = () => {
    const {sourceApplication, allMetadata} = useContext(SourceApplicationContext)
    const {selectedMetadata, setSelectedMetadata} = useContext(IntegrationContext)
    const {completed, setCompleted, active, setActive, editCollectionAbsoluteKey} = useContext(ConfigurationContext)
    const {t} = useTranslation('translations', {keyPrefix: 'pages.configuration'});
    const classes = useStyles();
    const methods = useForm();
    const initialVersion: number = selectedMetadata.version;
    const [version, setVersion] = React.useState<string>(initialVersion ? String(initialVersion) : '');
    const [collectionReferencesInEditContext, setCollectionReferencesInEditContext] = useState<string[]>([])

    const onSubmit = (data: any) => {
        console.log(data);
    };

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
                        <Typography>Integrasjon: PLACEHOLDER VIK123 - TEST - TEST</Typography>
                        <Controller
                            name={"integrationMetadataId".toString()}
                            defaultValue={''}
                            render={({field}) =>
                                <SelectValueComponent
                                    displayName={t('metadataVersion')}
                                    selectables={
                                        availableVersions.map(metadata => {
                                            return {
                                                displayName: metadata.version.toString(),
                                                value: metadata.id ? metadata.id.toString() : "0"
                                            }
                                        })}
                                    field={field}
                                />
                            }
                        />
                        <Controller
                            name={"comment".toString()}
                            render={({field}) =>
                                <StringValueComponent
                                    classes={classes}
                                    displayName={"Kommentar"}
                                    multiline
                                    field={field}
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
                        <FormControlLabel
                            control={
                                <Checkbox
                                    id="form-complete"
                                    checked={completed}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        console.log(event.target.checked)
                                        setCompleted(event.target.checked)
                                    }}
                                    inputProps={{'aria-label': 'completed-checkbox'}}/>}
                            label={t('label.checkLabel') as string}/>
                        {completed && <FormControlLabel
                            control={
                                <Checkbox
                                    id="form-active"
                                    checked={active}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setActive(event.target.checked)
                                    }}
                                    inputProps={{'aria-label': 'active-checkbox'}}/>}
                            label={t('label.activeLabel') as string}/>}
                    </Box>
                </form>
            </FormProvider>
        </DndProvider>
    );
}

export default withRouter(ConfigurationForm);