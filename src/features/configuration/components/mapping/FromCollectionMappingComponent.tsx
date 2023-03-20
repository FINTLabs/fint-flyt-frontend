import * as React from "react";
import {ReactElement, useContext} from "react";
import ArrayComponent from "../common/ArrayComponent";
import {useTranslation} from "react-i18next";
import {ClassNameMap} from "@mui/styles";
import DynamicStringValueComponent from "../common/DynamicStringValueComponent";
import {ValueType} from "../../types/Metadata/IntegrationMetadata";
import EditIcon from '@mui/icons-material/Edit';
import EditOffIcon from '@mui/icons-material/EditOff';
import {IconButton} from "@mui/material";
import {ConfigurationContext} from "../../../../context/configurationContext";

interface Props {
    classes: ClassNameMap;
    absoluteKey: string;
    elementComponentCreator: (absoluteKey: string) => ReactElement;
}

const FromCollectionMappingComponent: React.FunctionComponent<Props> = (props: Props) => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.configuration.fromCollectionMapping'});
    const {editingCollection, setEditingCollection} = useContext(ConfigurationContext);
    return (
        <>
            <div id={'collection-mapping-header-' + props.absoluteKey}
                 className={props.classes.title}>{t("collections")}
                <IconButton aria-label="edit" onClick={() => {
                    editingCollection !== props.absoluteKey
                        ? setEditingCollection(props.absoluteKey)
                        : setEditingCollection(undefined)
                }}>
                    {editingCollection !== props.absoluteKey ? <EditIcon/> : <EditOffIcon/>}
                </IconButton>
            </div>
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