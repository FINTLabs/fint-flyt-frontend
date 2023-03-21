import * as React from "react";
import {ReactElement} from "react";
import ArrayComponent from "../common/ArrayComponent";
import {useTranslation} from "react-i18next";
import {ClassNameMap} from "@mui/styles";
import DynamicStringValueComponent from "../common/DynamicStringValueComponent";
import {ValueType} from "../../types/Metadata/IntegrationMetadata";
import ArrayValueWrapperComponent from "../common/ArrayValueWrapperComponent";
import FlytTitle4Component from "../common/title/FlytTitle4Component";

interface Props {
    classes: ClassNameMap;
    absoluteKey: string;
    elementComponentCreator: (absoluteKey: string) => ReactElement;
}

const FromCollectionMappingComponent: React.FunctionComponent<Props> = (props: Props) => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.configuration.fromCollectionMapping'});

    return <>
        <div className={props.classes.wrapperVerticalMargin}>
            <FlytTitle4Component
                id={'collection-mapping-header-' + props.absoluteKey}
                classes={props.classes}
                title={t("collections")}
            />
            <ArrayComponent
                classes={props.classes}
                absoluteKey={props.absoluteKey + ".instanceCollectionReferencesOrdered"}
                fieldComponentCreator={(index: number, absoluteKey: string) =>
                    <ArrayValueWrapperComponent
                        classes={props.classes}
                        content={<DynamicStringValueComponent
                            classes={props.classes}
                            absoluteKey={absoluteKey}
                            displayName={"" + index}
                            accept={[ValueType.COLLECTION]}
                        />}
                    />
                }
                defaultValueCreator={() => undefined}
            />
        </div>
        <FlytTitle4Component
            id={'collection-mapping-header-' + props.absoluteKey}
            classes={props.classes}
            title={t("convertCollectionElements")}
        />
        {props.elementComponentCreator(props.absoluteKey + ".elementMapping")}
    </>
}
export default FromCollectionMappingComponent