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
import {MOCK_INSTANCE_METADATA} from "../types/IntegrationMetadata";

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

    function TagTree({items, depth = 0}: any ) {
        console.log(items)
        if (!items.categories || !items.instanceValueMetadata || !items.instanceObjectCollectionMetadata) {
            return null
        }


        console.log(items.instanceValueMetadata)

        return (<>
            {items.categories.map((category: any) => (
            <div>
                {category.content ?
                    <div>{category.displayName}</div> : <TagTree items={category.content}/>
                }
            </div>
            ))}
        </>)



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
    );
}

export default SourceApplicationForm;
