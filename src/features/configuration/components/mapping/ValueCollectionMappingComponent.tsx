import {ClassNameMap} from "@mui/styles";
import * as React from "react";
import CollectionMappingComponent from "./CollectionMappingComponent";
import ValueMappingComponent from "./ValueMappingComponent";
import {IValueTemplate} from "../../types/FormTemplate";

interface Props {
    classes: ClassNameMap;
    absoluteKey: string;
    elementTemplate: IValueTemplate
}

const ValueCollectionMappingComponent: React.FunctionComponent<Props> = (props: Props) => {
    return <CollectionMappingComponent
        classes={props.classes}
        absoluteKey={props.absoluteKey}
        elementComponentCreator={(order: number[], absoluteKey: string) =>
            <ValueMappingComponent
                classes={props.classes}
                absoluteKey={absoluteKey}
                displayName={order.toString()}
                template={props.elementTemplate}
            />
        }
    />
}
export default ValueCollectionMappingComponent