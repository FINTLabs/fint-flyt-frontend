import * as React from "react";
import {ReactElement} from "react";
import ArrayComponent from "../common/ArrayComponent";
import FromCollectionMappingComponent from "./FromCollectionMappingComponent";
import {useTranslation} from "react-i18next";
import {ClassNameMap} from "@mui/styles";
import {NestedElementsCallbacks, prefixNestedElementsCallbacksOrder} from "../../types/ElementComponentProps";

interface Props {
    classes: ClassNameMap;
    absoluteKey: string;
    nestedElementCallbacks: NestedElementsCallbacks
    elementComponentCreator: (
        absoluteKey: string,
        nestedElementsCallbacks: NestedElementsCallbacks
    ) => ReactElement;
}

const CollectionMappingComponent: React.FunctionComponent<Props> = (props: Props) => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.configuration.collectionMapping'});

    return (
        <>
            <div className={props.classes.title}>{t("defaultElements")}</div>
            <ArrayComponent
                classes={props.classes}
                absoluteKey={props.absoluteKey + ".elementMappings"}
                fieldComponentCreator={(index: number, absoluteKey: string) =>
                    props.elementComponentCreator(
                        absoluteKey,
                        prefixNestedElementsCallbacksOrder([0, index], props.nestedElementCallbacks)
                    )
                }
                defaultValueCreator={() => {
                    return {}
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
                        elementComponentCreator={(absoluteKey: string) =>
                            props.elementComponentCreator(
                                absoluteKey,
                                prefixNestedElementsCallbacksOrder([1, index], props.nestedElementCallbacks)
                            )
                        }
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