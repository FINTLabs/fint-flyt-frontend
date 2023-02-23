import {Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Theme, Typography} from "@mui/material";
import {Tag} from "./dnd/Tag";
import * as React from "react";
import HelpPopover from "./popover/HelpPopover";
import {useTranslation} from "react-i18next";
import {toTagValue} from "../../util/JsonUtil";
import {useContext, useEffect} from "react";
import {IntegrationContext} from "../../../context/integrationContext";
// eslint-disable-next-line
import {Link} from 'react-router-dom'
import {SourceApplicationContext} from "../../../context/sourceApplicationContext";
import {MOCK_INSTANCE_ELEMENT_METADATA} from "../defaults/DefaultValues";
import {createStyles, makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
            row: {
                display: 'flex',
                alignItems: 'center',
                position: 'sticky',
                top: 0,
            },
            metadataPanelContainer: {
                marginTop: theme.spacing(6),
                marginRight: theme.spacing(4),
                paddingLeft: theme.spacing(4),
                paddingRight: theme.spacing(4),
                paddingBottom: theme.spacing(4),
                paddingTop: theme.spacing(2),
                border: 'solid 1px',
                borderColor: 'black',
                borderRadius: '4px',
                height: 'fit-content',
                position: 'sticky',
                top: theme.spacing(16),
                backgroundColor: 'white'
            },
            panelContainer: {
                display: 'flex',
                marginTop: theme.spacing(6),
                marginRight: theme.spacing(4),
                paddingLeft: theme.spacing(4),
                paddingRight: theme.spacing(4),
                paddingBottom: theme.spacing(4),
                paddingTop: theme.spacing(2),
                border: 'solid 1px',
                borderColor: 'black',
                borderRadius: '4px',
                height: 'fit-content',
                position: 'sticky',
                top: theme.spacing(16),
                backgroundColor: 'white'
            },
            metadataPanel: {
                opacity: 0.99,
                border: 'solid 1px',
                borderRadius: '4px',
                paddingLeft: theme.spacing(2),
                paddingRight: theme.spacing(2),
                paddingBottom: theme.spacing(2),
                width: theme.spacing(40),
                height: 'fit-content',
                overflow: 'auto',
                maxHeight: theme.spacing(100),
                backgroundColor: theme.palette.background.default
            }
        }
    ));

const MetadataPanel: React.FunctionComponent<any> = (props) => {
    const classes = useStyles();
    const { t } = useTranslation('translations', { keyPrefix: 'components.MetadataPanel'});
    const { selectedMetadata, setSelectedMetadata } = useContext(IntegrationContext)
    const { allMetadata, instanceElementMetadata, getInstanceElementMetadata, getAllMetadata } = useContext(SourceApplicationContext)
    let initialVersion = selectedMetadata.version;
    const [version, setVersion] = React.useState(initialVersion ? String(initialVersion) : '');

    const handleChange = (event: SelectChangeEvent) => {
        setVersion(event.target.value);
        let version: number = Number(event.target.value)
        let config = availableVersions.filter(metadata => {
            return metadata.version === version
        })
        setSelectedMetadata(config[0])
        getInstanceElementMetadata(config[0].id)
    };

    useEffect(() => {
        getAllMetadata(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const availableVersions = allMetadata.filter(md => {
        return md.sourceApplicationId === selectedMetadata.sourceApplicationId &&
            md.sourceApplicationIntegrationId === selectedMetadata.sourceApplicationIntegrationId
    })

    function TagTree({items, depth = 0}: any ) {
        console.log(items)
        if (!items || !items.length) {
            return null
        }

        return items.map((item: any) => (
            <React.Fragment key={item.displayName}>
                {item.children.length > 0 ?
                    <div style={{ paddingLeft: depth * 15 }}>
                        <Typography>{item.displayName}</Typography>
                    </div> :
                    <div style={{ paddingLeft: depth * 15 }}>
                        <Tag disabled={item.disabled} type={item.type} name={item.displayName + ' {' + (item.key) + '}'} value={toTagValue(item.key)}/>
                    </div>}
                <TagTree items={item.children} depth={depth + 1}/>
            </React.Fragment>
        ))
    }

    return (
        <Box>
            <Box className={classes.row}>
                <Typography variant={"h6"}>{t('header')}</Typography>
                <HelpPopover popoverContent="metadataPanelPopoverContent"/>
                <FormControl sx={{ m: 1, minWidth: 120, backgroundColor: 'white' }} size="small">
                    <InputLabel id="version-select-label">{t('version')} </InputLabel>
                    <Select
                        labelId="version-select"
                        id="version-select"
                        value={version}
                        label={t('version') as string}
                        onChange={handleChange}
                    >
                        {availableVersions.map((md, index) => {
                            return <MenuItem key={index} value={md.version}>{t('version')} {md.version}</MenuItem>
                        })}
                    </Select>
                </FormControl>
            </Box>
            <Box className={classes.metadataPanel}>
                {/*instanceElementMetadata &&*/ <TagTree items={MOCK_INSTANCE_ELEMENT_METADATA}/>}
                {/*<Link style={{fontFamily: 'sans-serif'}} to={{pathname: selectedMetadata.sourceApplicationIntegrationUri}} target="_blank">{t('openLink')}</Link>*/}
            </Box>
        </Box>
    );
}

export default MetadataPanel;
