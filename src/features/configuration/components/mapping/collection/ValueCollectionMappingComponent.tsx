import * as React from 'react';
import CollectionMappingComponent from './common/CollectionMappingComponent';
import ValueMappingComponent from '../value/ValueMappingComponent';
import { IValueTemplate } from '../../../types/FormTemplate';

export interface Props {
    absoluteKey: string;
    elementTemplate: IValueTemplate;
}

const ValueCollectionMappingComponent: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <CollectionMappingComponent
            absoluteKey={props.absoluteKey}
            elementComponentCreator={(
                order: string,
                displayPath: string[],
                absoluteKey: string
            ) => (
                <ValueMappingComponent
                    order={Number.parseInt(order)}
                    absoluteKey={absoluteKey}
                    displayName={order}
                    template={props.elementTemplate}
                    collection={true}
                />
            )}
        />
    );
};
export default ValueCollectionMappingComponent;
