import * as React from "react";
import {ReactElement} from "react";
import ArrayComponent from "../common/ArrayComponent";
import DynamicStringValueComponent from "../common/DynamicStringValueComponent";
import {useTranslation} from "react-i18next";
import {ClassNameMap} from "@mui/styles";

interface Props {
    classes: ClassNameMap;
    absoluteKey: string;
    elementComponentCreator: (absoluteKey: string) => ReactElement;
}

const FromCollectionMappingComponent: React.FunctionComponent<Props> = (props: Props) => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.configuration.fromCollectionMapping'});

    return (
        <>
            <div className={props.classes.title}>{t("collections")}</div>
            <ArrayComponent
                classes={props.classes}
                absoluteKey={props.absoluteKey + ".instanceCollectionReferencesOrdered"}
                fieldComponentCreator={(index: number, absoluteKey: string) =>
                    <DynamicStringValueComponent
                        classes={props.classes}
                        absoluteKey={absoluteKey}
                        displayName={"" + index}
                        accept={[]}
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