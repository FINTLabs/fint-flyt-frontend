import * as React from "react";
import {ReactElement} from "react";
import ArrayComponent from "../common/ArrayComponent";
import {useTranslation} from "react-i18next";
import {ClassNameMap} from "@mui/styles";
import DynamicStringValueComponent from "../common/DynamicStringValueComponent";
import {ValueType} from "../../types/Metadata/IntegrationMetadata";

interface Props {
    classes: ClassNameMap;
    absoluteKey: string;
    elementComponentCreator: (absoluteKey: string) => ReactElement;
}

const FromCollectionMappingComponent: React.FunctionComponent<Props> = (props: Props) => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.configuration.fromCollectionMapping'});

    return (
        <>
            <div id={'collection-mapping-header-' + props.absoluteKey}
                 className={props.classes.title}>{t("collections")}</div>
            <ArrayComponent
                classes={props.classes}
                absoluteKey={props.absoluteKey + ".instanceCollectionReferencesOrdered"}
                fieldComponentCreator={(index: number, absoluteKey: string) =>
                    <DynamicStringValueComponent
                        classes={props.classes}
                        absoluteKey={absoluteKey}
                        displayName={"" + index}
                        accept={[ValueType.COLLECTION]}
                    />

                }
                defaultValueCreator={() => undefined}
            />
            <div className={props.classes.title}>{t("convertCollectionElements")}</div>
            {props.elementComponentCreator(props.absoluteKey + ".elementMapping")}
        </>
    );
}
export default FromCollectionMappingComponent