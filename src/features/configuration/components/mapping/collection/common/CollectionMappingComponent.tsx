import * as React from "react";
import {ReactElement, useContext} from "react";
import ArrayComponent from "../../../common/array/ArrayComponent";
import FromCollectionMappingComponent from "./FromCollectionMappingComponent";
import {useTranslation} from "react-i18next";
import {ClassNameMap} from "@mui/styles";
import ArrayObjectWrapperComponent from "../../../common/array/ArrayObjectWrapperComponent";
import ArrayValueWrapperComponent from "../../../common/array/ArrayValueWrapperComponent";
import {ConfigurationContext} from "../../../../../../context/ConfigurationContext";
import {isOutsideCollectionEditContext} from "../../../../util/KeyUtils";
import {EditingContext} from "../../../../../../context/EditingContext";
import HelpPopover from "../../../common/popover/HelpPopover";
import {Box} from "@mui/material";
import FlytTitleComponent from "../../../../../../components/atoms/FlytTitleComponent";

interface Props {
    classes: ClassNameMap;
    absoluteKey: string;
    createObjectWrapper?: boolean;
    elementComponentCreator: (order: string, displayPath: string[], absoluteKey: string) => ReactElement;
    onFieldClose?: (order: string) => void,
}

const CollectionMappingComponent: React.FunctionComponent<Props> = (props: Props) => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.configuration.collectionMapping'});
    const {completed} = useContext(ConfigurationContext)
    const {editCollectionAbsoluteKey} = useContext(EditingContext)

    return <>
        <div className={props.classes.wrapperVerticalMargin}>
            <Box className={props.classes.flexRowContainer}>
                <FlytTitleComponent variant="h6" classes={props.classes} title={t("defaultElements")}/>
                <HelpPopover popoverContent={'Faste elementer'} noMargin={true}/>
            </Box>
            <ArrayComponent
                classes={props.classes}
                absoluteKey={props.absoluteKey + ".elementMappings"}
                fieldComponentCreator={
                    (index: number, absoluteKey: string) => {
                        const field: ReactElement = props.elementComponentCreator(
                            0 + "-" + index,
                            [t("defaultElements"), (index + 1).toString()],
                            absoluteKey
                        )
                        return props.createObjectWrapper
                            ? <ArrayObjectWrapperComponent
                                classes={props.classes}
                                content={field}
                            />
                            : <ArrayValueWrapperComponent
                                classes={props.classes}
                                content={field}
                            />;
                    }
                }
                defaultValueCreator={() => {
                    return {}
                }}
                onFieldClose={(index: number) => {
                    if (props.onFieldClose) {
                        props.onFieldClose(0 + "-" + index)
                    }
                }}
                disabled={isOutsideCollectionEditContext(props.absoluteKey, editCollectionAbsoluteKey) || completed}
            />
        </div>
        <Box className={props.classes.flexRowContainer}>
            <FlytTitleComponent variant="h6" classes={props.classes} title={t("generatedElements")}/>
            <HelpPopover popoverContent={'Generert fra innhold i en samling'} noMargin={true}/>
        </Box>
        <ArrayComponent
            classes={props.classes}
            absoluteKey={props.absoluteKey + ".fromCollectionMappings"}
            fieldComponentCreator={(index: number, absoluteKey: string) =>
                <ArrayObjectWrapperComponent
                    classes={props.classes}
                    content={
                        <FromCollectionMappingComponent
                            classes={props.classes}
                            absoluteKey={absoluteKey}
                            elementComponentCreator={
                                (absoluteKey: string) => props.elementComponentCreator(
                                    1 + "-" + index,
                                    [t("generatedElements"), (index + 1).toString()],
                                    absoluteKey
                                )
                            }
                        />
                    }
                />
            }
            defaultValueCreator={() => {
                return {}
            }}
            onFieldClose={(index: number) => {
                if (props.onFieldClose) {
                    props.onFieldClose(1 + "-" + index)
                }
            }}
            disabled={isOutsideCollectionEditContext(props.absoluteKey, editCollectionAbsoluteKey) || completed}
        />
    </>
}
export default CollectionMappingComponent;
