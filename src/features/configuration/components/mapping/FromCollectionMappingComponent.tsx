import * as React from "react";
import {ReactElement, useContext} from "react";
import ArrayComponent from "../common/ArrayComponent";
import {useTranslation} from "react-i18next";
import {ClassNameMap} from "@mui/styles";
import {ValueType} from "../../types/Metadata/IntegrationMetadata";
import EditIcon from '@mui/icons-material/Edit';
import EditOffIcon from '@mui/icons-material/EditOff';
import {IconButton} from "@mui/material";
import {ConfigurationContext} from "../../../../context/configurationContext";
import {editCollectionAbsoluteKeyIncludesAbsoluteKey} from "../../util/ObjectUtils";
import DragAndDropComponent from "../common/DragAndDropComponent";

interface Props {
    classes: ClassNameMap;
    absoluteKey: string;
    elementComponentCreator: (absoluteKey: string) => ReactElement;
}

const FromCollectionMappingComponent: React.FunctionComponent<Props> = (props: Props) => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.configuration.fromCollectionMapping'});
    const {editingCollection, setEditingCollection} = useContext(ConfigurationContext);
    return (
        <div className={props.classes.collectionElementWrapper}>
            <div id={'collection-mapping-header-' + props.absoluteKey}
                 className={props.classes.title}>{t("collections")}
                {(!editingCollection || editCollectionAbsoluteKeyIncludesAbsoluteKey(editingCollection, props.absoluteKey)) &&
                    <IconButton aria-label="edit" onClick={() => {
                        if (editingCollection !== props.absoluteKey) {
                            setEditingCollection(props.absoluteKey)
                        } else {
                            setEditingCollection(undefined)
                            //TODO: remove collections
                        }
                    }}>
                        {editingCollection !== props.absoluteKey ? <EditIcon/> : <EditOffIcon/>}
                    </IconButton>
                }
            </div>
            <ArrayComponent
                classes={props.classes}
                absoluteKey={props.absoluteKey + ".instanceCollectionReferencesOrdered"}
                fieldComponentCreator={(index: number, absoluteKey: string) =>
                    <DragAndDropComponent
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
        </div>
    );
}
export default FromCollectionMappingComponent