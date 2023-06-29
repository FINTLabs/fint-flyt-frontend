import * as React from "react";
import {forwardRef, useContext} from "react";
import {ISelectableValueTemplate, SelectableValueType} from "../../../types/FormTemplate";
import SelectValueComponent from "./select/SelectValueComponent";
import {Controller, useFormContext} from "react-hook-form";
import {ValueType as ConfigurationValueType} from "../../../types/Configuration";
import {SelectablesStatefulValue} from "../../../util/SelectablesUtils";
import SearchSelectValueComponent from "./select/SearchSelectValueComponent";
import {ClassNameMap} from "@mui/styles";
import HelpPopover from "../../common/popover/HelpPopover";
import DynamicStringOrSearchSelectValueComponent, {
    Type as DynamicStringOrSearchSelectType
} from "./DynamicStringOrSearchSelectValueComponent";
import {isOutsideCollectionEditContext} from "../../../util/KeyUtils";
import {ConfigurationContext} from "../../../../../context/configurationContext";
import {EditingContext} from "../../../../../context/editingContext";

interface Props {
    classes: ClassNameMap;
    order: number;
    absoluteKey: string;
    displayName: string;
    description: string;
    template: ISelectableValueTemplate;
    disabled?: boolean;
}

const SelectableValueMappingComponent: React.FunctionComponent<Props> = forwardRef<HTMLDivElement, Props>((props: Props) => {
    SelectableValueMappingComponent.displayName = "SelectableValueMappingComponent"
    const {control, setValue, getValues} = useFormContext();
    const {completed} = useContext(ConfigurationContext)
    const {editCollectionAbsoluteKey} = useContext(EditingContext)

    const absoluteKeySplit = props.absoluteKey.split(".");
    const selectables = SelectablesStatefulValue(
        control,
        props.template.selectables,
        props.template.selectablesSources,
        absoluteKeySplit.slice(0, absoluteKeySplit.length - 2).join(".")
    );
    const typeAbsoluteKey: string = props.absoluteKey + ".type";

    function setTypeIfUndefined(type: ConfigurationValueType) {
        if (!getValues(typeAbsoluteKey)) {
            setValue(typeAbsoluteKey, type)
        }
    }

    function getDynamicStringOrSearchSelectTypeFromConfigurationType(configurationType: ConfigurationValueType) {
        switch (configurationType) {
            case ConfigurationValueType.STRING:
                return DynamicStringOrSearchSelectType.SELECT;
            case ConfigurationValueType.DYNAMIC_STRING:
                return DynamicStringOrSearchSelectType.DYNAMIC;
            case ConfigurationValueType.VALUE_CONVERTING:
                return DynamicStringOrSearchSelectType.VALUE_CONVERTING;
            default:
                throw new Error("Invalid configurationValueType");
        }
    }

    function getConfigurationTypeFromDynamicStringOrSearchSelectType(dynamicStringOrSearchSelectType: DynamicStringOrSearchSelectType) {
        switch (dynamicStringOrSearchSelectType) {
            case DynamicStringOrSearchSelectType.SELECT:
                return ConfigurationValueType.STRING;
            case DynamicStringOrSearchSelectType.DYNAMIC:
                return ConfigurationValueType.DYNAMIC_STRING;
            case DynamicStringOrSearchSelectType.VALUE_CONVERTING:
                return ConfigurationValueType.VALUE_CONVERTING;
            default:
                throw new Error("Invalid dynamicStringOrSearchSelectType");
        }
    }

    return <Controller
        name={props.absoluteKey + ".mappingString"}
        defaultValue={props.template.type == SelectableValueType.DROPDOWN ? '' : null}
        render={({field}) => {
            switch (props.template.type) {
                case SelectableValueType.DROPDOWN:
                    setTypeIfUndefined(ConfigurationValueType.STRING);
                    return <div id={'selectable-value-mapping-wrapper-' + props.absoluteKey}
                                className={props.classes.flexRowContainer}>
                        <SelectValueComponent
                            {...field}
                            displayName={props.displayName}
                            selectables={selectables}
                            disabled={
                                props.disabled
                                || isOutsideCollectionEditContext(field.name, editCollectionAbsoluteKey)
                                || completed
                            }
                        />
                        <HelpPopover popoverContent={props.description}/>
                    </div>
                case SelectableValueType.SEARCH_SELECT:
                    setTypeIfUndefined(ConfigurationValueType.STRING);
                    return <div id={'selectable-value-mapping-wrapper-' + props.absoluteKey}
                                className={props.classes.flexRowContainer}>
                        <SearchSelectValueComponent
                            {...field}
                            displayName={props.displayName}
                            selectables={selectables}
                            disabled={
                                props.disabled
                                || isOutsideCollectionEditContext(field.name, editCollectionAbsoluteKey)
                                || completed

                            }
                        />
                        <HelpPopover popoverContent={props.description}/>
                    </div>
                case SelectableValueType.DYNAMIC_STRING_OR_SEARCH_SELECT:
                    setTypeIfUndefined(ConfigurationValueType.STRING);
                    return <div id={'selectable-value-mapping-wrapper-' + props.absoluteKey}
                                className={props.classes.flexRowContainer}>
                        <DynamicStringOrSearchSelectValueComponent
                            {...field}
                            classes={props.classes}
                            displayName={props.displayName}
                            selectables={selectables}
                            initialType={
                                getDynamicStringOrSearchSelectTypeFromConfigurationType(getValues(typeAbsoluteKey))
                            }
                            onTypeChange={(type: DynamicStringOrSearchSelectType) => {
                                setValue(
                                    typeAbsoluteKey,
                                    getConfigurationTypeFromDynamicStringOrSearchSelectType(type)
                                )
                            }}
                            disabled={
                                props.disabled
                                || isOutsideCollectionEditContext(field.name, editCollectionAbsoluteKey)
                                || completed
                            }
                        />
                        <HelpPopover popoverContent={props.description}/>
                    </div>
            }
        }}
    />
})
export default SelectableValueMappingComponent;