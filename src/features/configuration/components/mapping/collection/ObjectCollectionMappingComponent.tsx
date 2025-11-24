import {
    NestedElementsCallbacks,
    prefixNestedElementsCallbacks,
} from '../../../types/NestedElement';
import * as React from 'react';
import CollectionMappingComponent from './common/CollectionMappingComponent';
import { IObjectTemplate } from '../../../types/FormTemplate';
import ObjectMappingComponent from '../object/ObjectMappingComponent';

export interface Props {
    absoluteKey: string;
    nestedElementCallbacks: NestedElementsCallbacks;
    elementTemplate: IObjectTemplate;
}

const ObjectCollectionMappingComponent: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <CollectionMappingComponent
            absoluteKey={props.absoluteKey}
            createObjectWrapper
            elementComponentCreator={(
                order: string,
                displayPath: string[],
                absoluteKey: string
            ) => (
                <ObjectMappingComponent
                    key={order}
                    absoluteKey={absoluteKey}
                    template={props.elementTemplate}
                    nestedElementCallbacks={prefixNestedElementsCallbacks(
                        order,
                        displayPath,
                        props.nestedElementCallbacks
                    )}
                />
            )}
            onFieldClose={(order: string) => {
                props.nestedElementCallbacks.onAllNestedElementsClose(order);
            }}
        />
    );
};
export default ObjectCollectionMappingComponent;
