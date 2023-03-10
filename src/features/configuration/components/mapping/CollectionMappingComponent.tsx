import * as React from "react";
import {ElementComponentProps} from "../../types/ElementComponentProps";
import ArrayComponent from "../common/ArrayComponent";
import FromCollectionMappingComponent from "./FromCollectionMappingComponent";

interface Props extends ElementComponentProps {
    elementComponentCreator: (absoluteKey: string, displayName: string) => JSX.Element
}

const CollectionMappingComponent: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <>
            <div className={props.classes.title}>{props.displayName}</div>
            <ArrayComponent
                classes={props.classes}
                absoluteKey={props.absoluteKey + ".elementMappings"}
                displayName={"Faste elementer"}
                fieldComponentCreator={props.elementComponentCreator}
                defaultValueCreator={() => {
                    return {}
                }}
            />
            <ArrayComponent
                classes={props.classes}
                absoluteKey={props.absoluteKey + ".fromCollectionMappings"}
                displayName={"Generert fra samlinger"}
                fieldComponentCreator={(absoluteKey: string, displayName: string) =>
                    <FromCollectionMappingComponent
                        classes={props.classes}
                        absoluteKey={absoluteKey}
                        displayName={displayName}
                        elementComponentCreator={props.elementComponentCreator}
                    />
                }
                defaultValueCreator={() => {
                    return {}
                }}
            />
        </>
    );
}
export default CollectionMappingComponent;
