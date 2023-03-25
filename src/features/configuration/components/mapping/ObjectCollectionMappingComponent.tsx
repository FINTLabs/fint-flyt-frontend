import {ClassNameMap} from "@mui/styles";
import {NestedElementsCallbacks, prefixNestedElementsCallbacks} from "../../types/NestedElementCallbacks";
import * as React from "react";
import CollectionMappingComponent from "./CollectionMappingComponent";
import {IObjectTemplate} from "../../types/FormTemplate";
import ObjectMappingComponent from "./ObjectMappingComponent";

export interface Props {
    classes: ClassNameMap;
    absoluteKey: string;
    nestedElementCallbacks: NestedElementsCallbacks;
    elementTemplate: IObjectTemplate;
}

const ObjectCollectionMappingComponent: React.FunctionComponent<Props> = (props: Props) => {
    return <CollectionMappingComponent
        classes={props.classes}
        absoluteKey={props.absoluteKey}
        createObjectWrapper
        elementComponentCreator={(order: string, displayPath: string[], absoluteKey: string) =>
            <ObjectMappingComponent
                classes={props.classes}
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