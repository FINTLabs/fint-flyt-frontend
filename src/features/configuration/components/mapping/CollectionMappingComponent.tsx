import * as React from "react";
import {ElementComponentProps} from "../../types/ElementComponentProps";
import ArrayComponent from "../common/ArrayComponent";
import FromCollectionMappingComponent from "./FromCollectionMappingComponent";
import {useTranslation} from "react-i18next";

interface Props extends ElementComponentProps {
    elementComponentCreator: (absoluteKey: string, displayName: string) => JSX.Element
}

const CollectionMappingComponent: React.FunctionComponent<Props> = (props: Props) => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.configuration.collectionMapping'});

    return (
        <>
            <div className={props.classes.title}>{props.displayName}</div>
            <ArrayComponent
                classes={props.classes}
                absoluteKey={props.absoluteKey + ".elementMappings"}
                displayName={t("defaultElements")}
                fieldComponentCreator={props.elementComponentCreator}
                defaultValueCreator={() => {
                    return {}
                }}
            />
            <ArrayComponent
                classes={props.classes}
                absoluteKey={props.absoluteKey + ".fromCollectionMappings"}
                displayName={t("generatedElements")}
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
