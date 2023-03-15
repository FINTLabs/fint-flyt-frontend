import React, {useContext} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {SourceApplicationContext} from "../../context/sourceApplicationContext";
import Panel from "./components/Panel";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";
import MetadataPanel from "./components/MetadataPanel";
import {createStyles, makeStyles} from "@mui/styles";
import {Box, FormControl, MenuItem, Select, SelectChangeEvent, Theme, Typography} from "@mui/material";
import {IntegrationContext} from "../../context/integrationContext";
import {IIntegrationMetadata} from "./types/Metadata/IntegrationMetadata";
import {useTranslation} from "react-i18next";
import {flexCenter} from "./util/CustomStylesUtil";
import TextAreaComponent from "./components/common/TextAreaComponent";

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
        },
        column: {
            flex: '50%',
            paddingLeft: theme.spacing(2)
        },
        panelContainer: {
            backgroundColor: 'white',
            padding: theme.spacing(2),
            border: 'solid 1px',
            borderColor: 'black',
            marginLeft: theme.spacing(1),
            borderRadius: '4px',
            height: 'fit-content',
        },
        panel: {
            opacity: 0.99,
            padding: theme.spacing(2),
            height: 'fit-content',
            overflow: 'auto',
            maxHeight: theme.spacing(100),
            backgroundColor: '#EBF4F5',
            borderRadius: '4px',
            border: 'solid 1px'
        },
        valueMappingContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        label: {
            fontFamily: ["Nunito Sans", 'sans-serif'].join(','),
            fontSize: '16px'
        },
        select: {
            backgroundColor: 'white',
            width: '350px',
            height: '30px',
            borderRadius: '4px',
            marginTop: '5px',
            marginBottom: '5px'
        },
        input: {
            width: '350px',
            borderRadius: '4px',
            marginTop: '5px',
            marginBottom: '5px',
            height: '24px'
        },
        title: {
            fontFamily: ["Nunito Sans", 'sans-serif'].join(','),
            fontSize: '20px',
            marginTop: '16px',
            marginLeft: '16px'
        },
        fieldSetContainer: {
            display: 'grid',
            backgroundColor: '#EBF4F5',
            border: '1px solid',
            borderRadius: '4px',
            height: 'fit-content',
            marginRight: '16px',
            "&:last-child": {
                marginRight: 0
            }
        },
        fieldSet: {
            display: 'grid',
            border: 'none',
        },
        list: {
            listStyle: 'none',
            padding: 'unset'
        },
        listItem: {
            border: 'solid 1px black',
            borderRadius: '4px',
            marginBottom: '8px'
        },
        collectionButton: {
            backgroundColor: theme.palette.primary.main,
            borderRadius: '5px',
            color: 'white',
            cursor: 'pointer',
            padding: '8px',
            fontSize: '16px',
            marginTop: '16px',
            marginLeft: '16px',
            width: 'fit-content'
        },
        button: {
            backgroundColor: theme.palette.primary.main,
            borderRadius: '5px',
            color: 'white',
            cursor: 'pointer',
            padding: '8px',
            fontSize: '16px',
            marginTop: '16px',
            marginLeft: '16px',
            width: 'fit-content'
        },
        submitButton: {
            backgroundColor: theme.palette.primary.main,
            borderRadius: '5px',
            color: 'white',
            cursor: 'pointer',
            padding: '8px',
            fontSize: '16px',
            marginTop: '16px',
            width: 'fit-content'
        }
    })
);

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
            <Box sx={{m: 1}}>
                <Typography variant={"h6"}>{t('header')}</Typography>
                <Typography>Integrasjon: PLACEHOLDER VIK123 - TEST - TEST</Typography>
                <Box sx={flexCenter}>
                    <Typography sx={{mr: 1}}>{t('metadataVersion')}: </Typography>
                    <FormControl sx={{backgroundColor: 'white', width: '150px'}} size="small">
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
                <TextAreaComponent classes={classes} displayName={"Kommentar"} absoluteKey={"kommentar"}
                                   description={"kommentar"}/>
            </Box>
            <Box display="flex" position="relative" width={1} height={1} sx={{border: 'none'}}>
                <MetadataPanel classes={classes}/>
                <Panel classes={classes}/>
            </Box>
        </DndProvider>
    );
}

export default withRouter(ConfigurationForm);