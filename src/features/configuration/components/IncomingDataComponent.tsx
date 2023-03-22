import {Box, Typography} from "@mui/material";
import {Tag} from "./dnd/Tag";
import * as React from "react";
import {useContext, useEffect} from "react";
import HelpPopover from "./popover/HelpPopover";
import {useTranslation} from "react-i18next";
import {toTagValue} from "../../util/JsonUtil";
// eslint-disable-next-line
import {SourceApplicationContext} from "../../../context/sourceApplicationContext";
import {
    IInstanceMetadataCategory,
    IInstanceObjectCollectionMetadata,
    IInstanceValueMetadata,
    ValueType
} from "../types/Metadata/IntegrationMetadata";
import {ClassNameMap} from "@mui/styles";
import {metadataCategoryTitleSX, metadataPanelSX} from "../styles/SystemStyles";


const IncomingDataComponent: React.FunctionComponent<any> = (props: { classes: ClassNameMap }) => {
    const {t} = useTranslation('translations', {keyPrefix: 'components.MetadataPanel'});
    const {
        instanceElementMetadata,
        getAllMetadata,
        instanceObjectCollectionMetadata
    } = useContext(SourceApplicationContext)

    useEffect(() => {
        getAllMetadata(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const paddingPerDepth = 10;

    function TagTreeValues({items, depth}: any) {
        return (<>
                {items.instanceValueMetadata.map((ivm: IInstanceValueMetadata) => (
                    <div id={'tagtreeValue-' + ivm.key} style={{paddingLeft: depth * paddingPerDepth}}
                         key={'tagtreeValues-' + ivm.key}>
                        <Tag disabled={false} type={ivm.type} name={ivm.displayName + ' {' + (ivm.key) + '}'}
                             tagKey={ivm.key}
                             value={toTagValue(ivm.key)}/>
                    </div>
                ))}</>
        )
    }

    function TagTreeCollectionValues({items, depth}: any) {
        return (<>
                <div>
                    <div style={{paddingLeft: depth * paddingPerDepth}} key={'tagTreeCollectionValues-' + items.key}>
                        <Typography>Valgt Samling: {items.displayName}</Typography>
                        <TagTree items={items.objectMetadata}/>
                    </div>
                </div>
            </>
        )
    }

    function TagTree({items, depth}: any) {
        if (!items.categories || !items.instanceValueMetadata || !items.instanceObjectCollectionMetadata) {
            return null
        }

        return (
            <React.Fragment key={depth}>
                {items.instanceValueMetadata &&
                    <TagTreeValues items={items} depth={depth}/>
                }
                {items.instanceObjectCollectionMetadata.map((instanceObjectCollectionMetadata: IInstanceObjectCollectionMetadata) => {
                    return <div id={'tag-' + instanceObjectCollectionMetadata.key}
                                style={{paddingLeft: depth * paddingPerDepth}}
                                key={'tag-' + instanceObjectCollectionMetadata.key}>
                        <Tag disabled={false} type={ValueType.COLLECTION}
                             name={instanceObjectCollectionMetadata.displayName + ' {' + (instanceObjectCollectionMetadata.key) + '}'}
                             value={toTagValue(instanceObjectCollectionMetadata.key)}
                             tagKey={instanceObjectCollectionMetadata.key}/>
                    </div>
                })}
                {items.categories.map((category: IInstanceMetadataCategory) =>
                    <div style={{paddingLeft: depth * paddingPerDepth}} key={'tagTree-' + category.displayName}>
                        {category.content.instanceValueMetadata &&
                            <div id={'tagTree-' + category.displayName + '-category-display-name'}>
                                <Typography sx={metadataCategoryTitleSX}>{category.displayName}</Typography>
                            </div>}
                        <TagTree items={category.content} depth={depth + 1}/>
                    </div>
                )}
            </React.Fragment>
        )
    }

    return (
        <>
            <Box className={props.classes.panelContainer}
                 sx={metadataPanelSX}>
                <Box className={props.classes.row}>
                    <Typography variant={"h6"}>{t('header')}</Typography>
                    <HelpPopover
                        popoverContent="Metadata er data fra innsendt skjema du kan bruke i konfigurasjon av utgående data"/>
                </Box>
                <Box className={props.classes.panel}>
                    {/*TODO 09/03 ingrie: before merge, switch back to use real metadata*/}
                    {instanceElementMetadata && <TagTree items={instanceElementMetadata} depth={0}/>}
                    {/*<Link style={{fontFamily: 'sans-serif'}} to={{pathname: selectedMetadata.sourceApplicationIntegrationUri}} target="_blank">{t('openLink')}</Link>*/}
                </Box>
                {instanceObjectCollectionMetadata &&
                    <Box className={props.classes.panel}>
                        <TagTreeCollectionValues items={instanceObjectCollectionMetadata}/>
                    </Box>}
            </Box>
        </>
    );
}

export default IncomingDataComponent;
