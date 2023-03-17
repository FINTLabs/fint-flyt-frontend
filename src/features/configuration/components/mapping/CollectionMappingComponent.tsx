import * as React from "react";
import {ReactElement} from "react";
import ArrayComponent from "../common/ArrayComponent";
import FromCollectionMappingComponent from "./FromCollectionMappingComponent";
import {useTranslation} from "react-i18next";
import {ClassNameMap} from "@mui/styles";

interface Props {
    classes: ClassNameMap;
    absoluteKey: string;
    elementComponentCreator: (order: number[], displayPath: string[], absoluteKey: string) => ReactElement;
    onFieldClose?: (order: number[]) => void,
}

const CollectionMappingComponent: React.FunctionComponent<Props> = (props: Props) => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.configuration.collectionMapping'});

    return (
        <>
            <div className={props.classes.title}>{t("defaultElements")}</div>
            <ArrayComponent
                classes={props.classes}
                absoluteKey={props.absoluteKey + ".elementMappings"}
                fieldComponentCreator={
                    (index: number, absoluteKey: string) => props.elementComponentCreator(
                        [0, index],
                        [t("defaultElements"), (index + 1).toString()],
                        absoluteKey
                    )
                }
                defaultValueCreator={() => {
                    return {}
                }}
                onFieldClose={(index: number) => {
                    if (props.onFieldClose) {
                        props.onFieldClose([0, index])
                    }
                }}
            />
            <div className={props.classes.title}>{t("generatedElements")}</div>
            <ArrayComponent
                classes={props.classes}
                absoluteKey={props.absoluteKey + ".fromCollectionMappings"}
                fieldComponentCreator={(index: number, absoluteKey: string) =>
                    <FromCollectionMappingComponent
                        classes={props.classes}
                        absoluteKey={absoluteKey}
                        elementComponentCreator={
                            (absoluteKey: string) => props.elementComponentCreator(
                                [1, index],
                                [t("generatedElements"), (index + 1).toString()],
                                absoluteKey
                            )
                        }
                    />
                }
                defaultValueCreator={() => {
                    return {}
                }}
                onFieldClose={(index: number) => {
                    if (props.onFieldClose) {
                        props.onFieldClose([1, index])
                    }
                }}
            />
        </>
    );
}
export default CollectionMappingComponent;
