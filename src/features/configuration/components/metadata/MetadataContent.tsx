import { Accordion, VStack } from '@navikt/ds-react';
import * as React from 'react';

import {
    IInstanceMetadataCategory,
    IInstanceMetadataContent,
    IInstanceObjectCollectionMetadata,
    IInstanceValueMetadata,
    ValueType,
} from '../../types/Metadata/IntegrationMetadata';
import { DraggableTag } from '../common/dnd/DraggableTag';
import styles from "./MetadataContent.module.css"

interface Props {
    content: IInstanceMetadataContent;
    keyToReferenceFunction: (key: string) => string;
}

const MetadataContent: React.FunctionComponent<Props> = ({
    content,
    keyToReferenceFunction,
}: Props) => {
    return (
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
                    const reference: string = keyToReferenceFunction(objectCollectionMetadata.key);
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
            {content.categories.length > 0 && (
                <Accordion className={styles.accordion} size="small">
                    {content.categories.map((category: IInstanceMetadataCategory) => (
                        <Accordion.Item key={'tagTree-' + category.displayName} defaultOpen>
                            <Accordion.Header className={styles.accordion__header}>{category.displayName}</Accordion.Header>
                            <Accordion.Content>
                                <MetadataContent
                                    content={category.content}
                                    keyToReferenceFunction={(key: string) =>
                                        keyToReferenceFunction(key)
                                    }
                                />
                            </Accordion.Content>
                        </Accordion.Item>
                    ))}
                </Accordion>
            )}
        </VStack>
    );
};
export default MetadataContent;
