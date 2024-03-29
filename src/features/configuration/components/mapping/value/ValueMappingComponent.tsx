import * as React from "react";
import {ReactElement, useContext} from "react";
import {IValueTemplate, ValueType as TemplateValueType} from "../../../types/FormTemplate";
import StringValueComponent from "./string/StringValueComponent";
import DynamicStringValueComponent from "./string/DynamicStringValueComponent";
import {Controller, ControllerFieldState, FieldValues, useFormContext} from "react-hook-form";
import {ValueType as ConfigurationValueType} from "../../../types/Configuration";
import {ValueType as MetadataValueType} from "../../../types/Metadata/IntegrationMetadata";
import {Search, SourceStatefulValue} from "../../../util/UrlUtils";
import {ConfigurationContext} from "../../../../../context/ConfigurationContext";
import {isOutsideCollectionEditContext} from "../../../util/KeyUtils";
import {EditingContext} from "../../../../../context/EditingContext";
import CheckboxValueComponent from "../../common/CheckboxValueComponent";
import {ControllerRenderProps} from "react-hook-form/dist/types/controller";
import {hasValidFormat} from "../../../util/ValidationUtil";
import DynamicChipComponent from "./string/DynamicChipComponent";
import {HelpText, HStack} from "@navikt/ds-react";

interface Props {
    order: number;
    absoluteKey: string;
    displayName: string;
    description?: string;
    template: IValueTemplate,
    disabled?: boolean;
    hidden?: boolean;
    collection?: boolean;
}

const ValueMappingComponent: React.FunctionComponent<Props> = (props: Props) => {
    const {getValues, setValue, watch} = useFormContext();
    const {completed} = useContext(ConfigurationContext)
    const completeCheck: boolean = watch('completed')
    const {editCollectionAbsoluteKey} = useContext(EditingContext)

    const typeAbsoluteKey: string = props.absoluteKey + ".type";

    function setTypeIfUndefined(type: ConfigurationValueType) {
        if (!getValues(typeAbsoluteKey)) {
            setValue(typeAbsoluteKey, type)
        }
    }

    let search: Search | undefined;
    if (props.template.search) {
        const absoluteKeySplit = props.absoluteKey.split(".");
        search = SourceStatefulValue(props.template.search, absoluteKeySplit.slice(0, absoluteKeySplit.length - 2).join("."));
    }

    type RenderProps = ControllerRenderProps<FieldValues, string> & {
        fieldState: ControllerFieldState | undefined,
        displayName: string,
        disabled: boolean
    }

    function getBooleanFromString(value: string): boolean {
        if (value == 'true') {
            return true
        }
        if (value == 'false' || value === undefined) {
            return false
        }
        throw new Error('cannot convert string="' + value + '" to boolean')
    }

    function createComponent(renderProps: RenderProps): ReactElement {
        switch (props.template.type) {
            case TemplateValueType.BOOLEAN:
                setTypeIfUndefined(ConfigurationValueType.BOOLEAN)
                return <CheckboxValueComponent
                    {...renderProps}
                    value={getBooleanFromString(renderProps.value)}
                    onChange={(value: boolean) => renderProps.onChange(String(value))}
                />
            case TemplateValueType.STRING:
                setTypeIfUndefined(ConfigurationValueType.STRING);
                return <StringValueComponent
                    {...renderProps}
                />
            case TemplateValueType.DYNAMIC_STRING:
                setTypeIfUndefined(ConfigurationValueType.DYNAMIC_STRING);
                return <DynamicStringValueComponent
                    {...renderProps}
                    search={search}
                    accept={[
                        MetadataValueType.STRING,
                        MetadataValueType.INTEGER,
                        MetadataValueType.EMAIL,
                        MetadataValueType.DATE,
                        MetadataValueType.PHONE
                    ]}
                />
            case TemplateValueType.FILE:
                setTypeIfUndefined(ConfigurationValueType.FILE);
                return <DynamicChipComponent
                    {...renderProps}
                    accept={[
                        MetadataValueType.FILE
                    ]}
                />
        }
    }

    return <Controller
        name={props.absoluteKey + ".mappingString"}
        rules={{
            validate: (value) => hasValidFormat(value, props.template.type, completeCheck)
        }}
        render={({field, fieldState}) =>
            <HStack id={'value-mapping-wrapper-' + props.absoluteKey} align={"center"} gap={"2"}>
                {createComponent({
                    ...field,
                    fieldState,
                    displayName: props.displayName,
                    disabled: props.disabled
                        || isOutsideCollectionEditContext(field.name, editCollectionAbsoluteKey)
                        || completed
                })}
                {props.description && <HelpText placement={"right"}>{props.description}</HelpText>
                }
            </HStack>
        }
    />
}
export default ValueMappingComponent;