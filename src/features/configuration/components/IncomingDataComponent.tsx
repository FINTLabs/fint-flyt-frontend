import {Box, Typography} from "@mui/material";
import * as React from "react";
import {useContext, useEffect} from "react";
import HelpPopover from "./common/popover/HelpPopover";
import {useTranslation} from "react-i18next";
// eslint-disable-next-line
import {SourceApplicationContext} from "../../../context/sourceApplicationContext";
import {
    IInstanceMetadataContent,
    IInstanceObjectCollectionMetadata,
    MOCK_INSTANCE_METADATA
} from "../types/Metadata/IntegrationMetadata";
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
    referencesForCollectionsToShow: string[]
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

    function findInstanceObjectCollectionMetadata(metadataContent: IInstanceMetadataContent, key: string): IInstanceObjectCollectionMetadata | undefined {
        const searchResultInCurrent: IInstanceObjectCollectionMetadata | undefined =
            metadataContent.instanceObjectCollectionMetadata
                .find((instanceObjectCollectionMetadata: IInstanceObjectCollectionMetadata) =>
                    instanceObjectCollectionMetadata.key === key
                )
        if (searchResultInCurrent) {
            return searchResultInCurrent;
        }
        for (let category of metadataContent.categories) {
            const categorySearchResult: IInstanceObjectCollectionMetadata | undefined =
                findInstanceObjectCollectionMetadata(category.content, key)
            if (categorySearchResult) {
                return categorySearchResult;
            }
        }
        return undefined;
    }

    function getReferenceAndCollectionMetadata(references: string[]): [string, IInstanceObjectCollectionMetadata][] {
        const referenceAndCollectionMetadata: [string, IInstanceObjectCollectionMetadata][] = []
        references.forEach((reference: string) => {

            if (isFieldReference(reference)) {
                const key: string = extractFieldReferenceKey(reference)
                const collectionMetadata: IInstanceObjectCollectionMetadata | undefined = instanceElementMetadata
                    ? findInstanceObjectCollectionMetadata(instanceElementMetadata, key)
                    : undefined;
                if (!!collectionMetadata) {
                    referenceAndCollectionMetadata.push([reference, collectionMetadata])
                }
            } else if (isCollectionFieldReference(reference)) {
                const [index, key]: [number, string] = extractCollectionFieldReferenceIndexAndKey(reference);
                const collectionMetadata: IInstanceObjectCollectionMetadata | undefined =
                    findInstanceObjectCollectionMetadata(referenceAndCollectionMetadata[index][1].objectMetadata, key)
                if (!!collectionMetadata) {
                    referenceAndCollectionMetadata.push([reference, collectionMetadata])
                }
            }
        })
        return referenceAndCollectionMetadata;
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
                {props.referencesForCollectionsToShow.length > 0 &&
                    getReferenceAndCollectionMetadata(props.referencesForCollectionsToShow)
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