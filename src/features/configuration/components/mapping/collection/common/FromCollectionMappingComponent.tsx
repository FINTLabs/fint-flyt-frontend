import * as React from "react";
import {ReactElement, useContext} from "react";
import ArrayComponent from "../../../common/array/ArrayComponent";
import {useTranslation} from "react-i18next";
import {ClassNameMap} from "@mui/styles";
import DynamicStringValueComponent from "../../value/string/DynamicStringValueComponent";
import {ValueType} from "../../../../types/Metadata/IntegrationMetadata";
import ArrayValueWrapperComponent from "../../../common/array/ArrayValueWrapperComponent";
import FlytTitle4Component from "../../../common/title/FlytTitle4Component";
import {ConfigurationContext} from "../../../../../../context/configurationContext";
import {isOutsideCollectionEditContext} from "../../../../util/KeyUtils";
import {IconButton} from "@mui/material";
import {EditOffRounded, EditRounded} from "@mui/icons-material";
import {Controller, useFormContext} from "react-hook-form";
import {EditingContext} from "../../../../../../context/editingContext";

interface Props {
    classes: ClassNameMap;
    absoluteKey: string;
    elementComponentCreator: (absoluteKey: string) => ReactElement;
}

const FromCollectionMappingComponent: React.FunctionComponent<Props> = (props: Props) => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.configuration.fromCollectionMapping'});
    const {control} = useFormContext();
    const {completed} = useContext(ConfigurationContext)
    const {editCollectionAbsoluteKey, setEditCollectionAbsoluteKey} = useContext(EditingContext)

    return <>
        <div className={props.classes.wrapperVerticalMargin}>
            <div id={'selectable-value-mapping-wrapper-' + props.absoluteKey}
                 className={props.classes.valueMappingContainer}>
                <FlytTitle4Component
                    id={'collection-mapping-header-' + props.absoluteKey}
                    classes={props.classes}
                    title={t("collections")}
                />
                <IconButton aria-label="edit"
                            onClick={() => {
                                setEditCollectionAbsoluteKey(
                                    editCollectionAbsoluteKey === props.absoluteKey
                                        ? ""
                                        : props.absoluteKey
                                )
                            }}>
                    {editCollectionAbsoluteKey === props.absoluteKey
                        ? <EditOffRounded style={{color: 'blue'}}/>
                        : <EditRounded/>
                    }
                </IconButton>
            </div>
            <ArrayComponent
                classes={props.classes}
                absoluteKey={props.absoluteKey + ".instanceCollectionReferencesOrdered"}
                fieldComponentCreator={(index: number, absoluteKey: string) =>
                    <ArrayValueWrapperComponent
                        classes={props.classes}
                        content={
                            <Controller
                                name={absoluteKey}
                                control={control}
                                render={({field}) =>
                                    <DynamicStringValueComponent
                                        {...field}
                                        classes={props.classes}
                                        displayName={"" + index}
                                        accept={[ValueType.COLLECTION]}
                                        disabled={completed}
                                    />
                                }
                            />
                        }
                    />
                }
                defaultValueCreator={() => undefined}
                disabled={isOutsideCollectionEditContext(props.absoluteKey, editCollectionAbsoluteKey) || completed}
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