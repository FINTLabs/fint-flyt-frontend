import * as React from "react";
import {ISelectableValueTemplate, SelectableValueType} from "../../../types/FormTemplate";
import SelectValueComponent from "./select/SelectValueComponent";
import {Controller, useFormContext} from "react-hook-form";
import {ValueType as ConfigurationValueType} from "../../../types/Configuration";
import {SelectablesStatefulValue} from "../../../util/SelectablesUtils";
import SearchSelectValueComponent from "./select/SearchSelectValueComponent";
import {ClassNameMap} from "@mui/styles";
import HelpPopover from "../../common/popover/HelpPopover";
import DynamicStringOrSearchSelectValueComponent from "./DynamicStringOrSearchSelectValueComponent";

interface Props {
    classes: ClassNameMap;
    order: number;
    absoluteKey: string;
    displayName: string;
    description: string;
    template: ISelectableValueTemplate;
    disabled?: boolean;
}

const SelectableValueMappingComponent: React.FunctionComponent<Props> = (props: Props) => {
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

    setTypeIfUndefined(ConfigurationValueType.STRING);

    return <Controller
        name={valueAbsoluteKey}
        defaultValue={''}
        render={({field}) => {
            switch (props.template.type) {
                case SelectableValueType.DROPDOWN:
                    return <div id={'selectable-value-mapping-wrapper-' + props.absoluteKey}
                                className={props.classes.valueMappingContainer}>
                        <SelectValueComponent
                            displayName={props.displayName}
                            selectables={selectables}
                            disabled={props.disabled}
                            field={field}
                        />
                        <HelpPopover popoverContent={props.description}/>
                    </div>
                case SelectableValueType.SEARCH_SELECT:
                    return <div id={'selectable-value-mapping-wrapper-' + props.absoluteKey}
                                className={props.classes.valueMappingContainer}>
                        <SearchSelectValueComponent
                            displayName={props.displayName}
                            selectables={selectables}
                            disabled={props.disabled}
                            field={field}
                        />
                        <HelpPopover popoverContent={props.description}/>
                    </div>
                case SelectableValueType.DYNAMIC_STRING_OR_SEARCH_SELECT:
                    return <div id={'selectable-value-mapping-wrapper-' + props.absoluteKey}
                                className={props.classes.valueMappingContainer}>
                        <DynamicStringOrSearchSelectValueComponent
                            classes={props.classes}
                            displayName={props.displayName}
                            selectables={selectables}
                            disabled={props.disabled}
                            field={field}
                        />
                        <HelpPopover popoverContent={props.description}/>
                    </div>
            }
        }}
    />


}
export default SelectableValueMappingComponent;