import * as React from "react";

import {IObjectTemplate} from "../../../types/FormTemplate";
import {NestedElementsCallbacks, prefixNestedElementsCallbacks} from "../../../types/NestedElement";
import ObjectMappingComponent from "../object/ObjectMappingComponent";
import CollectionMappingComponent from "./common/CollectionMappingComponent";

export interface Props {
    absoluteKey: string;
    nestedElementCallbacks: NestedElementsCallbacks;
    elementTemplate: IObjectTemplate;
}

const ObjectCollectionMappingComponent: React.FunctionComponent<Props> = (props: Props) => {
    return <CollectionMappingComponent
        absoluteKey={props.absoluteKey}
        createObjectWrapper
        elementComponentCreator={(order: string, displayPath: string[], absoluteKey: string) =>
            <ObjectMappingComponent
                key={order}
                absoluteKey={absoluteKey}
                template={props.elementTemplate}
                nestedElementCallbacks={
                    prefixNestedElementsCallbacks(order, displayPath, props.nestedElementCallbacks)
                }
            />
        }
        onFieldClose={(order: string) => {
            props.nestedElementCallbacks.onAllNestedElementsClose(order)
        }}
    />
}
export default ObjectCollectionMappingComponent