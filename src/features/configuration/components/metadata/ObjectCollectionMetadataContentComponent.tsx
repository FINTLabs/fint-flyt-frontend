import {ClassNameMap} from "@mui/styles";
import {IInstanceObjectCollectionMetadata} from "../../types/Metadata/IntegrationMetadata";
import * as React from "react";
import MetadataContentComponent from "./MetadataContentComponent";
import {toInstanceCollectionFieldReference} from "../../../../util/JsonUtil";
import {FormatListNumbered} from "@mui/icons-material";

interface Props {
    classes: ClassNameMap;
    collectionIndex: number
    reference: string,
    objectCollectionMetadata: IInstanceObjectCollectionMetadata
}

const ObjectCollectionMetadataContentComponent: React.FunctionComponent<Props> = (props: Props) => {
    return <MetadataContentComponent
        classes={props.classes}
        icon={<FormatListNumbered/>}
        displayName={props.objectCollectionMetadata.displayName + " - " + props.reference}
        content={props.objectCollectionMetadata.objectMetadata}
        keyToReferenceFunction={(key: string) => toInstanceCollectionFieldReference(props.collectionIndex, key)}
    />
}
export default ObjectCollectionMetadataContentComponent;
