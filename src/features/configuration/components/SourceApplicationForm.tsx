import {Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography} from "@mui/material";
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
import {
    IInstanceMetadataCategory,
    IInstanceObjectCollectionMetadata,
    IInstanceValueMetadata
} from "../types/IntegrationMetadata";

const SourceApplicationForm: React.FunctionComponent<any> = (props) => {
    const { t } = useTranslation('translations', { keyPrefix: 'components.SourceApplicationForm'});
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

    function TagTreeValues({items, depth = 0}: any ) {
        console.log(depth)
        return (<>
                {items.instanceValueMetadata.map((ivm: IInstanceValueMetadata) => (
                    <div style={{ paddingLeft: depth * 10 }}>
                        <Tag disabled={false} type={ivm.type} name={ivm.displayName + ' {' + (ivm.key) + '}'} value={toTagValue(ivm.key)}/>
                    </div>
                ))}</>
        )
    }

    function TagTreeCollectionValues({items, depth = 0}: any ) {
        return (<>
                {items.instanceObjectCollectionMetadata.map((ivm: IInstanceObjectCollectionMetadata) => (
                    <div style={{ paddingLeft: depth * 15 }}>
                        <Typography>{ivm.displayName}</Typography>
                        <TagTreeValues items={ivm.objectMetadata}/>
                    </div>
                ))}</>
        )
    }


    function TagTree({items, depth = 0}: any ) {
        if (!items.categories || !items.instanceValueMetadata || !items.instanceObjectCollectionMetadata) {
            return null
        }

        return (
            <React.Fragment>
                {items.instanceValueMetadata &&
                    <TagTreeValues items={items} depth={depth+1}/>
                }
                {items.categories.map((category: IInstanceMetadataCategory) => (
                    <div style={{ paddingLeft: depth * 10 }}>
                        {category.content.instanceValueMetadata && <div><Typography>{category.displayName}</Typography>
                        </div>}
                        <TagTree items={category.content} depth={depth+1}/>
                    </div>
                ))}
            </React.Fragment>
        )
    }

    return (
        <>
            <Box className={props.style.sourceApplicationForm}>
                <Box className={props.style.row}>
                    <Typography variant={"h6"}>{t('header')}</Typography>
                    <HelpPopover popoverContent="sourceApplicationFormPopoverContent"/>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <InputLabel id="metadata-version-select">{t('version')} </InputLabel>
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
                {instanceElementMetadata && <TagTree items={instanceElementMetadata}/>}
                {/*<Link style={{fontFamily: 'sans-serif'}} to={{pathname: selectedMetadata.sourceApplicationIntegrationUri}} target="_blank">{t('openLink')}</Link>*/}

            </Box>
            <Box className={props.style.sourceApplicationForm}>
                <Box className={props.style.row}>
                    <TagTreeCollectionValues items={instanceElementMetadata}/>
                </Box>
            </Box>
        </>
    );
}

export default SourceApplicationForm;
