import {ElementComponentProps} from "../../types/ElementComponentProps";
import * as React from "react";
import ArrayComponent from "../common/ArrayComponent";
import DynamicStringValueComponent from "../common/DynamicStringValueComponent";

interface Props extends ElementComponentProps {
    elementComponentCreator: (absoluteKey: string, displayName: string) => JSX.Element
}

const FromCollectionMappingComponent: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <>
            <div className={props.classes.title}>{props.displayName}</div>
            <ArrayComponent
                classes={props.classes}
                absoluteKey={props.absoluteKey + ".instanceCollectionReferencesOrdered"}
                displayName={"Samlinger"}
                fieldComponentCreator={(absoluteKey: string, displayName: string) =>
                    <DynamicStringValueComponent
                        classes={props.classes}
                        absoluteKey={absoluteKey}
                        displayName={displayName}
                        accept={[]}
                    />

                }
                defaultValueCreator={() => undefined}
            />
            {props.elementComponentCreator(
                props.absoluteKey + ".elementMapping",
                "Konvertering av samlingselementer"
            )}
        </>
    );
}
export default FromCollectionMappingComponent