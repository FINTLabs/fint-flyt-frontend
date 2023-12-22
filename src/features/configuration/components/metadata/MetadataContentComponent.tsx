import {
    IInstanceMetadataCategory,
    IInstanceMetadataContent,
    IInstanceObjectCollectionMetadata,
    IInstanceValueMetadata,
    ValueType
} from "../../types/Metadata/IntegrationMetadata";
import * as React from "react";
import {ReactElement} from "react";
import {Tag} from "../common/dnd/Tag";
import {Heading, HStack, VStack} from "@navikt/ds-react";

interface Props {
    icon?: ReactElement
    displayName?: string;
    content: IInstanceMetadataContent
    keyToReferenceFunction: (key: string) => string
}

const MetadataContentComponent: React.FunctionComponent<Props> = (props: Props) => {
    const paddingPerDepth = 10;

    return <>
        <HStack align={"center"} gap={"2"}>
            {props.icon && props.icon}
            {props.displayName &&
                <Heading size={"xsmall"}>{props.displayName}</Heading>}
        </HStack>
        <VStack gap={"1"}>
            {props.content.instanceValueMetadata
                .map((valueMetadata: IInstanceValueMetadata) => {
                        const reference: string = props.keyToReferenceFunction(valueMetadata.key);
                        return <Tag
                            key={'tagtreeValues-' + valueMetadata.key}
                            type={valueMetadata.type}
                            name={valueMetadata.displayName}
                            description={reference}
                            tagKey={valueMetadata.key}
                            value={reference}
                        />
                    }
                )}
            {props.content.instanceObjectCollectionMetadata
                .map((objectCollectionMetadata: IInstanceObjectCollectionMetadata) => {
                    const reference: string = props.keyToReferenceFunction(objectCollectionMetadata.key);
                    return <Tag
                        key={'tagtreeValues-' + objectCollectionMetadata.key}
                        type={ValueType.COLLECTION}
                        name={objectCollectionMetadata.displayName}
                        description={reference}
                        value={reference}
                        tagKey={objectCollectionMetadata.key}
                    />
                })}
        </VStack>
        {props.content.categories.map((category: IInstanceMetadataCategory) =>
            <div key={'tagTree-' + category.displayName} style={{marginTop: '8px'}}>
                <Heading size={"xsmall"}>{category.displayName}</Heading>
                <div style={{paddingLeft: paddingPerDepth, borderLeft: '1px solid gray'}}>
                    <MetadataContentComponent
                        content={category.content}
                        keyToReferenceFunction={(key: string) => props.keyToReferenceFunction(key)}
                    />
                </div>
            </div>
        )}
    </>
}
export default MetadataContentComponent;
