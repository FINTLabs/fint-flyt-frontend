import {ElementComponentProps} from "../../types/ElementComponentProps";
import * as React from "react";
import ArrayComponent from "../common/ArrayComponent";
import DynamicStringValueComponent from "../common/DynamicStringValueComponent";
import {useTranslation} from "react-i18next";

interface Props extends ElementComponentProps {
    elementComponentCreator: (absoluteKey: string, displayName: string) => JSX.Element
}

const FromCollectionMappingComponent: React.FunctionComponent<Props> = (props: Props) => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.configuration.fromCollectionMapping'});

    return (
        <>
            <div id={'collection-mapping-header-' + props.displayName} className={props.classes.title}>{props.displayName}</div>
            <ArrayComponent
                classes={props.classes}
                absoluteKey={props.absoluteKey + ".instanceCollectionReferencesOrdered"}
                displayName={t("collections")}
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
                t("convertCollectionElements")
            )}
        </>
    );
}
export default FromCollectionMappingComponent