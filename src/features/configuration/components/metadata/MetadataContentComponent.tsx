import {
    IInstanceMetadataCategory,
    IInstanceMetadataContent,
    IInstanceObjectCollectionMetadata,
    IInstanceValueMetadata,
    ValueType,
} from '../../types/Metadata/IntegrationMetadata';
import * as React from 'react';
import { DraggableTag } from '../common/dnd/DraggableTag';
import { Heading, VStack } from '@navikt/ds-react';

interface Props {
    content: IInstanceMetadataContent;
    keyToReferenceFunction: (key: string) => string;
}

const MetadataContentComponent: React.FunctionComponent<Props> = ({
    content,
    keyToReferenceFunction,
}: Props) => {
    const paddingPerDepth = 10;

    return (
        <>
            <VStack gap={'1'} id={'metadata-content'}>
                {content.instanceValueMetadata.map((valueMetadata: IInstanceValueMetadata) => {
                    const reference: string = keyToReferenceFunction(valueMetadata.key);
                    return (
                        <DraggableTag
                            key={'tagtreeValues-' + valueMetadata.key}
                            type={valueMetadata.type}
                            name={valueMetadata.displayName}
                            description={reference}
                            tagKey={valueMetadata.key}
                            value={reference}
                        />
                    );
                })}
                {content.instanceObjectCollectionMetadata.map(
                    (objectCollectionMetadata: IInstanceObjectCollectionMetadata) => {
                        const reference: string = keyToReferenceFunction(
                            objectCollectionMetadata.key
                        );
                        return (
                            <DraggableTag
                                key={'tagtreeValues-' + objectCollectionMetadata.key}
                                type={ValueType.COLLECTION}
                                name={objectCollectionMetadata.displayName}
                                description={reference}
                                value={reference}
                                tagKey={objectCollectionMetadata.key}
                            />
                        );
                    }
                )}
            </VStack>
            {content.categories.map((category: IInstanceMetadataCategory) => (
                <div key={'tagTree-' + category.displayName} style={{ marginTop: '8px' }}>
                    <Heading size={'xsmall'}>{category.displayName}</Heading>
                    <div style={{ paddingLeft: paddingPerDepth, borderLeft: '1px solid gray' }}>
                        <MetadataContentComponent
                            content={category.content}
                            keyToReferenceFunction={(key: string) => keyToReferenceFunction(key)}
                        />
                    </div>
                </div>
            ))}
        </>
    );
};
export default MetadataContentComponent;
