import {Box, Typography} from "@mui/material";
import * as React from "react";
import {useContext, useEffect} from "react";
import HelpPopover from "./popover/HelpPopover";
import {useTranslation} from "react-i18next";
// eslint-disable-next-line
import {SourceApplicationContext} from "../../../context/sourceApplicationContext";
import {IInstanceObjectCollectionMetadata, MOCK_INSTANCE_METADATA} from "../types/Metadata/IntegrationMetadata";
import {ClassNameMap} from "@mui/styles";
import {metadataPanelSX} from "../styles/SystemStyles";
import {
    extractCollectionFieldReferenceIndexAndKey,
    extractFieldReferenceKey,
    isCollectionFieldReference,
    isFieldReference
} from "../util/FieldReferenceUtils";
import MetadataContentComponent from "./metadata/MetadataContentComponent";
import {toInstanceFieldReference} from "../../util/JsonUtil";
import ObjectCollectionMetadataContentComponent from "./metadata/ObjectCollectionMetadataContentComponent";

export type Props = {
    classes: ClassNameMap,
    // TODO eivindmorch 24/03/2023 : Change to metadata as prop
    // metadata?: IInstanceMetadataContent,
    collectionsToShowByReference: string[]
}

const IncomingDataComponent: React.FunctionComponent<Props> = (props: Props) => {
    const {t} = useTranslation('translations', {keyPrefix: 'components.MetadataPanel'});
    const {
        instanceElementMetadata,
        getAllMetadata,
    } = useContext(SourceApplicationContext)

    useEffect(() => {
        getAllMetadata(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function getCollectionsToShowPerReference(collectionsToShowByReference: string[]): [string, IInstanceObjectCollectionMetadata][] {
        const collectionsMetadata: [string, IInstanceObjectCollectionMetadata][] = []
        collectionsToShowByReference.forEach((reference: string) => {

            if (isFieldReference(reference)) {
                const key: string = extractFieldReferenceKey(reference)
                const collectionMetadata: IInstanceObjectCollectionMetadata | undefined =
                    instanceElementMetadata?.instanceObjectCollectionMetadata
                        .find(instanceObjectCollectionMetadata => instanceObjectCollectionMetadata.key === key);
                if (!!collectionMetadata) {
                    collectionsMetadata.push([reference, collectionMetadata])
                }
            } else if (isCollectionFieldReference(reference)) {
                const [index, key]: [number, string] = extractCollectionFieldReferenceIndexAndKey(reference);
                // TODO eivindmorch 24/03/2023 : Handle categories
                //  Store all metadata in record for lookup
                const collectionMetadata: IInstanceObjectCollectionMetadata | undefined =
                    collectionsMetadata[index][1].objectMetadata.instanceObjectCollectionMetadata
                        .find(instanceObjectCollectionMetadata => instanceObjectCollectionMetadata.key === key)
                if (!!collectionMetadata) {
                    collectionsMetadata.push([reference, collectionMetadata])
                }
            }
        })
        return collectionsMetadata;
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
                {MOCK_INSTANCE_METADATA.instanceMetadata &&
                    <Box className={props.classes.panel}>
                        <MetadataContentComponent
                            classes={props.classes}
                            content={MOCK_INSTANCE_METADATA.instanceMetadata}
                            keyToReferenceFunction={(key: string) => toInstanceFieldReference(key)}
                        />
                    </Box>
                }
                {props.collectionsToShowByReference.length > 0 &&
                    getCollectionsToShowPerReference(props.collectionsToShowByReference)
                        .map(([reference, objectCollectionMetadata]: [string, IInstanceObjectCollectionMetadata], index: number) =>
                            <Box
                                key={'tagTreeCollectionValues-' + index}
                                className={props.classes.panel}
                            >
                                <ObjectCollectionMetadataContentComponent
                                    classes={props.classes}
                                    collectionIndex={index}
                                    reference={reference}
                                    objectCollectionMetadata={objectCollectionMetadata}
                                />
                            </Box>
                        )
                }
            </Box>
        </>
    );
}

export default IncomingDataComponent;
