import * as React from "react";
import {ReactElement} from "react";
import ArrayComponent from "../common/ArrayComponent";
import FromCollectionMappingComponent from "./FromCollectionMappingComponent";
import {useTranslation} from "react-i18next";
import {ClassNameMap} from "@mui/styles";

interface Props {
    classes: ClassNameMap;
    absoluteKey: string;
    elementComponentCreator: (absoluteKey: string, displayName: string) => ReactElement;
}

const CollectionMappingComponent: React.FunctionComponent<Props> = (props: Props) => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.configuration.collectionMapping'});

    return (
        <>
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
