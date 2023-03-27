import * as React from "react";
import {forwardRef} from "react";
import {ISelectableValueTemplate, SelectableValueType} from "../../../types/FormTemplate";
import SelectValueComponent from "./select/SelectValueComponent";
import {Controller, useFormContext} from "react-hook-form";
import {ValueType as ConfigurationValueType} from "../../../types/Configuration";
import {SelectablesStatefulValue} from "../../../util/SelectablesUtils";
import SearchSelectValueComponent from "./select/SearchSelectValueComponent";
import {ClassNameMap} from "@mui/styles";
import HelpPopover from "../../common/popover/HelpPopover";
import DynamicStringOrSearchSelectValueComponent, {Type} from "./DynamicStringOrSearchSelectValueComponent";

interface Props {
    classes: ClassNameMap;
    order: number;
    absoluteKey: string;
    displayName: string;
    description: string;
    template: ISelectableValueTemplate;
    disabled?: boolean;
}

const SelectableValueMappingComponent: React.FunctionComponent<Props> = forwardRef<any, Props>((props: Props) => {
    const {control, setValue, getValues} = useFormContext();
    const selectables = SelectablesStatefulValue(
        control,
        props.template.selectables,
        props.template.selectablesSources,
        props.absoluteKey
    );
    const typeAbsoluteKey: string = props.absoluteKey + ".type";
    const valueAbsoluteKey: string = props.absoluteKey + ".mappingString";

    function setTypeIfUndefined(type: ConfigurationValueType) {
        if (!getValues(typeAbsoluteKey)) {
            setValue(typeAbsoluteKey, type)
        }
    }

    return <Controller
        name={valueAbsoluteKey}
        defaultValue={props.template.type == SelectableValueType.DROPDOWN ? '' : null}
        render={({field}) => {
            switch (props.template.type) {
                case SelectableValueType.DROPDOWN:
                    setTypeIfUndefined(ConfigurationValueType.STRING);
                    return <div id={'selectable-value-mapping-wrapper-' + props.absoluteKey}
                                className={props.classes.valueMappingContainer}>
                        <SelectValueComponent
                            {...field}
                            displayName={props.displayName}
                            selectables={selectables}
                            disabled={props.disabled}
                        />
                        <HelpPopover popoverContent={props.description}/>
                    </div>
                case SelectableValueType.SEARCH_SELECT:
                    setTypeIfUndefined(ConfigurationValueType.STRING);
                    return <div id={'selectable-value-mapping-wrapper-' + props.absoluteKey}
                                className={props.classes.valueMappingContainer}>
                        <SearchSelectValueComponent
                            {...field}
                            displayName={props.displayName}
                            selectables={selectables}
                            disabled={props.disabled}
                        />
                        <HelpPopover popoverContent={props.description}/>
                    </div>
                case SelectableValueType.DYNAMIC_STRING_OR_SEARCH_SELECT:
                    setTypeIfUndefined(ConfigurationValueType.STRING);
                    return <div id={'selectable-value-mapping-wrapper-' + props.absoluteKey}
                                className={props.classes.valueMappingContainer}>
                        <DynamicStringOrSearchSelectValueComponent
                            {...field}
                            classes={props.classes}
                            displayName={props.displayName}
                            selectables={selectables}
                            disabled={props.disabled}
                            initialType={getValues(typeAbsoluteKey)}
                            onTypeChange={(type: Type) => {
                                setValue(typeAbsoluteKey, type === Type.SELECT
                                    ? ConfigurationValueType.STRING
                                    : ConfigurationValueType.DYNAMIC_STRING
                                )
                            }}
                        />
                        <HelpPopover popoverContent={props.description}/>
                    </div>
            }
        }}
    />
})
export default SelectableValueMappingComponent;