import React, {useContext} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {SourceApplicationContext} from "../../context/sourceApplicationContext";
import Panel from "./components/Panel";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";
import MetadataPanel from "./components/MetadataPanel";
import {Box, FormControl, MenuItem, Select, SelectChangeEvent, Theme, Typography} from "@mui/material";
import {IntegrationContext} from "../../context/integrationContext";
import {IIntegrationMetadata} from "./types/Metadata/IntegrationMetadata";
import {useTranslation} from "react-i18next";
import {flexCenterSX} from "./styles/SystemStyles";
import TextAreaComponent from "./components/common/TextAreaComponent";
import {configurationFormStyles} from "./styles/ConfigurationForm.styles";
import ConfigurationProvider from '../../context/configurationContext';

const useStyles = configurationFormStyles

const ConfigurationForm: React.FunctionComponent<RouteComponentProps<any>> = () => {
    const {sourceApplication} = useContext(SourceApplicationContext)
    const {t} = useTranslation('translations', {keyPrefix: 'pages.configuration'});
    const classes = useStyles();
    const {selectedMetadata, setSelectedMetadata} = useContext(IntegrationContext)
    const {allMetadata, getInstanceElementMetadata,} = useContext(SourceApplicationContext)
    const initialVersion: number = selectedMetadata.version;
    const [version, setVersion] = React.useState<string>(initialVersion ? String(initialVersion) : '');

    const availableVersions: IIntegrationMetadata[] = allMetadata.filter(md => {
        return md.sourceApplicationId === selectedMetadata.sourceApplicationId &&
            md.sourceApplicationIntegrationId === selectedMetadata.sourceApplicationIntegrationId
    })

    const handleChange = (event: SelectChangeEvent) => {
        setVersion(event.target.value);
        let version: number = Number(event.target.value)
        let integrationMetadata: IIntegrationMetadata[] = availableVersions
            .filter(metadata => metadata.version === version)
        setSelectedMetadata(integrationMetadata[0])
        getInstanceElementMetadata(integrationMetadata[0].id)
    };
    return (
        <DndProvider backend={HTML5Backend}>
            <ConfigurationProvider>
                <Box sx={{m: 1}}>
                    <Typography variant={"h6"}>{t('header')}</Typography>
                    <Typography>Integrasjon: PLACEHOLDER VIK123 - TEST - TEST</Typography>
                    <Box sx={flexCenterSX}>
                        <Typography sx={{mr: 1}}>{t('metadataVersion')}: </Typography>
                        <FormControl sx={{backgroundColor: 'white', width: (theme: Theme) => theme.spacing(18)}}
                                     size="small">
                            <Select
                                id="version-select"
                                value={version}
                                onChange={handleChange}
                            >
                                {availableVersions.map((md, index) => {
                                    return <MenuItem key={index}
                                                     value={md.version}>Versjon {md.version}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </Box>
                    <TextAreaComponent classes={classes} absoluteKey={"kommentar"}/>
                </Box>
                <Box display="flex" position="relative" width={1} height={1} sx={{border: 'none'}}>
                    <MetadataPanel classes={classes}/>
                    <Panel classes={classes}/>
                </Box>
            </ConfigurationProvider>
        </DndProvider>
    );
}

export default withRouter(ConfigurationForm);