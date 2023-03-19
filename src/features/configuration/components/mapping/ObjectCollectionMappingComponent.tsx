import {ClassNameMap} from "@mui/styles";
import {NestedElementsCallbacks, prefixNestedElementsCallbacks} from "../../types/NestedElementCallbacks";
import * as React from "react";
import CollectionMappingComponent from "./CollectionMappingComponent";
import {IObjectTemplate} from "../../types/FormTemplate";
import ObjectMappingComponent from "./ObjectMappingComponent";

export interface Props {
    classes: ClassNameMap;
    absoluteKey: string;
    nestedElementCallbacks: NestedElementsCallbacks
    elementTemplate: IObjectTemplate
    openNestedElementsByOrder: Set<string>
}

const ObjectCollectionMappingComponent: React.FunctionComponent<Props> = (props: Props) => {
    return <CollectionMappingComponent
        classes={props.classes}
        absoluteKey={props.absoluteKey}
        elementComponentCreator={(order: string, displayPath: string[], absoluteKey: string) =>
            <ObjectMappingComponent
                classes={props.classes}
                absoluteKey={absoluteKey}
                template={props.elementTemplate}
                openNestedElementsByOrder={
                    new Set<string>(Array.from(props.openNestedElementsByOrder.values())
                        .filter((openNestedElementOrder: string) => openNestedElementOrder.startsWith(order))
                        .map((openNestedElementOrder: string) => openNestedElementOrder.split("-")[2])
                    )
                }
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