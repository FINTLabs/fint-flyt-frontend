import {ClassNameMap} from "@mui/styles";
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
import FlytTitleComponent from "../atoms/FlytTitleComponent";


interface Props {
    classes: ClassNameMap;
    icon?: ReactElement
    displayName?: string;
    content: IInstanceMetadataContent
    keyToReferenceFunction: (key: string) => string
}

const MetadataContentComponent: React.FunctionComponent<Props> = (props: Props) => {
    const paddingPerDepth = 10;

    return <>
        <div style={{display: 'flex'}}>
            {props.icon && props.icon}
            {props.displayName &&
                <FlytTitleComponent variant="h3"
                    classes={props.classes}
                    title={props.displayName}
                />}
        </div>
        {props.content.instanceValueMetadata
            .map((valueMetadata: IInstanceValueMetadata) => {
                    const reference: string = props.keyToReferenceFunction(valueMetadata.key);
                    return <div
                        className={props.classes.tagWrapper}
                        id={'tag-' + valueMetadata.key}
                        key={'tag-' + valueMetadata.key}
                    >
                        <Tag
                            key={'tagtreeValues-' + valueMetadata.key}
                            classes={props.classes}
                            type={valueMetadata.type}
                            name={valueMetadata.displayName}
                            description={reference}
                            tagKey={valueMetadata.key}
                            value={reference}
                        />
                    </div>
                }
            )}
        {props.content.instanceObjectCollectionMetadata
            .map((objectCollectionMetadata: IInstanceObjectCollectionMetadata) => {
                const reference: string = props.keyToReferenceFunction(objectCollectionMetadata.key);
                return <div
                    className={props.classes.tagWrapper}
                    id={'tag-' + objectCollectionMetadata.key}
                    key={'tag-' + objectCollectionMetadata.key}
                >
                    <Tag
                        classes={props.classes}
                        type={ValueType.COLLECTION}
                        name={objectCollectionMetadata.displayName}
                        description={reference}
                        value={reference}
                        tagKey={objectCollectionMetadata.key}
                    />
                </div>
            })}
        {props.content.categories.map((category: IInstanceMetadataCategory) =>
            <div key={'tagTree-' + category.displayName} style={{marginTop: '8px'}}>
                <FlytTitleComponent variant='h6'
                    classes={props.classes}
                    title={category.displayName}
                />
                <div style={{paddingLeft: paddingPerDepth, borderLeft: '1px solid gray'}}>
                    <MetadataContentComponent
                        classes={props.classes}
                        content={category.content}
                        keyToReferenceFunction={(key: string) => props.keyToReferenceFunction(key)}
                    />
                </div>
            </div>
        )}
    </>
}
export default MetadataContentComponent;
