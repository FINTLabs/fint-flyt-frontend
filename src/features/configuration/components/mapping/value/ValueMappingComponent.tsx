import * as React from "react";
import {ReactElement, useContext} from "react";
import {IValueTemplate, ValueType as TemplateValueType} from "../../../types/FormTemplate";
import StringValueComponent from "./string/StringValueComponent";
import DynamicStringValueComponent from "./string/DynamicStringValueComponent";
import {Controller, FieldError, FieldValues, useFormContext} from "react-hook-form";
import {ValueType as ConfigurationValueType} from "../../../types/Configuration";
import {ValueType as MetadataValueType} from "../../../types/Metadata/IntegrationMetadata";
import {ClassNameMap} from "@mui/styles";
import {Search, SourceStatefulValue} from "../../../util/UrlUtils";
import {ConfigurationContext} from "../../../../../context/configurationContext";
import {isOutsideCollectionEditContext} from "../../../util/KeyUtils";
import {EditingContext} from "../../../../../context/editingContext";
import CheckboxValueComponent from "../../common/CheckboxValueComponent";
import {ControllerRenderProps} from "react-hook-form/dist/types/controller";
import HelpPopover from "../../common/popover/HelpPopover";
import {getRegexFromType} from "../../../util/ValidationUtil";

interface Props {
    classes: ClassNameMap;
    order: number;
    absoluteKey: string;
    displayName: string;
    description?: string;
    template: IValueTemplate,
    disabled?: boolean;
    hidden?: boolean;
}

const ValueMappingComponent: React.FunctionComponent<Props> = (props: Props) => {
    const {getValues, setValue} = useFormContext();
    const {completed} = useContext(ConfigurationContext)
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
        error: FieldError | undefined,
        classes: ClassNameMap,
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
                return <DynamicStringValueComponent
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
            pattern: getRegexFromType(props.template.type)
        }
        }
        render={({field, fieldState: {error}}) =>
            <div id={'value-mapping-wrapper-' + props.absoluteKey}
                 className={props.classes.flexRowContainer}>
                {createComponent({
                    ...field,
                    error,
                    classes: props.classes,
                    displayName: props.displayName,
                    disabled: props.disabled
                        || isOutsideCollectionEditContext(field.name, editCollectionAbsoluteKey)
                        || completed
                })}
                {props.description && <HelpPopover popoverContent={props.description}/>}
            </div>
        }
    />
}
export default ValueMappingComponent;