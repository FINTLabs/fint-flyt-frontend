import * as React from "react";
import {MutableRefObject, ReactElement, useContext, useEffect, useRef, useState} from "react";
import ArrayComponent from "../../../common/array/ArrayComponent";
import {useTranslation} from "react-i18next";
import {ClassNameMap} from "@mui/styles";
import ArrayValueWrapperComponent from "../../../common/array/ArrayValueWrapperComponent";
import {ConfigurationContext} from "../../../../../../context/ConfigurationContext";
import {isOutsideCollectionEditContext} from "../../../../util/KeyUtils";
import {IconButton} from "@mui/material";
import {EditOffRounded, EditRounded} from "@mui/icons-material";
import {Controller, useFormContext} from "react-hook-form";
import {EditingContext} from "../../../../../../context/EditingContext";
import {hasValidFormat} from "../../../../util/ValidationUtil";
import {ValueType as ConfigurationValueType} from "../../../../types/Configuration";
import {ValueType} from "../../../../types/Metadata/IntegrationMetadata";
import FlytTitleComponent from "../../../../../../components/atoms/FlytTitleComponent";
import DynamicChipComponent from "../../value/string/DynamicChipComponent";
import {Box, Heading, HStack} from "@navikt/ds-react";

interface Props {
    classes: ClassNameMap;
    absoluteKey: string;
    elementComponentCreator: (absoluteKey: string) => ReactElement;
}

const FromCollectionMappingComponent: React.FunctionComponent<Props> = (props: Props) => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.configuration.fromCollectionMapping'});
    const {control, watch} = useFormContext();
    const {completed} = useContext(ConfigurationContext)
    const {editCollectionAbsoluteKey, setEditCollectionAbsoluteKey} = useContext(EditingContext)
    const isEditingRef: MutableRefObject<boolean> = useRef<boolean>(false)
    const [isEditingState, setIsEditingState] = useState<boolean>(false)

    useEffect(() => {
        const isEditing: boolean = editCollectionAbsoluteKey === props.absoluteKey;
        if (isEditing !== isEditingRef.current) {
            isEditingRef.current = isEditing
            setIsEditingState(isEditing)
        }
    }, [editCollectionAbsoluteKey])

    useEffect(() => {
        return () => {
            if (isEditingRef.current) {
                setEditCollectionAbsoluteKey('')
            }
        }
    }, [])

    return <>
        <Box>
            <HStack id={'selectable-value-mapping-wrapper-' + props.absoluteKey} justify={"space-between"}
                    align={"center"}>
                <Heading id={'collection-mapping-header-' + props.absoluteKey}
                         size={"small"}>{t("collections")}</Heading>
                <IconButton aria-label="edit"
                            onClick={() => {
                                setEditCollectionAbsoluteKey(
                                    isEditingState
                                        ? ""
                                        : props.absoluteKey
                                )
                            }}>
                    {
                        isEditingState
                            ? <EditOffRounded style={{color: 'blue'}}/>
                            : <EditRounded/>
                    }
                </IconButton>
            </HStack>
            <ArrayComponent
                absoluteKey={props.absoluteKey + ".instanceCollectionReferencesOrdered"}
                fieldComponentCreator={(index: number, absoluteKey: string) =>
                    <ArrayValueWrapperComponent
                        content={
                            <Controller
                                name={absoluteKey}
                                rules={{
                                    validate: (value) => hasValidFormat(value, ConfigurationValueType.DYNAMIC_STRING, watch('completed'), true)
                                }}
                                control={control}
                                render={({field, fieldState}) =>
                                    <DynamicChipComponent
                                        {...field}
                                        displayName={"" + index}
                                        accept={[ValueType.COLLECTION]}
                                        disabled={completed}
                                        fieldState={fieldState}
                                    />
                                }
                            />
                        }
                    />
                }
                defaultValueCreator={() => undefined}
                disabled={isOutsideCollectionEditContext(props.absoluteKey, editCollectionAbsoluteKey) || completed}
            />
        </Box>
        <FlytTitleComponent variant="h6"
                            id={'collection-mapping-header-' + props.absoluteKey}
                            classes={props.classes}
                            title={t("convertCollectionElements")}
        />
        {props.elementComponentCreator(props.absoluteKey + ".elementMapping")}
    </>
}
export default FromCollectionMappingComponent