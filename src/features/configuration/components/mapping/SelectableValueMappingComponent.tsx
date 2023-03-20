import * as React from "react";
import {ISelectableValueTemplate, SelectableValueType} from "../../types/FormTemplate";
import SelectValueComponent from "../common/SelectValueComponent";
import {useFormContext} from "react-hook-form";
import {ValueType} from "../../types/Configuration";
import {CreateSelectables} from "../../util/SelectablesUtils";
import SearchSelectValueComponent from "../common/SearchSelectValueComponent";
import {ClassNameMap} from "@mui/styles";
import HelpPopover from "../popover/HelpPopover";

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
    const {control, setValue} = useFormContext();
    const selectables = CreateSelectables(
        control,
        props.template.selectables,
        props.template.selectablesSources,
        props.absoluteKey
    );
    setValue(props.absoluteKey + ".type", ValueType.STRING)
    const valueAbsoluteKey: string = props.absoluteKey + ".mappingString"

    switch (props.template.type) {
        case SelectableValueType.DROPDOWN:
            return <div id={'selectable-value-mapping-wrapper-' + props.absoluteKey}
                        className={props.classes.valueMappingContainer}>
                <SelectValueComponent
                    absoluteKey={valueAbsoluteKey}
                    displayName={props.displayName}
                    selectables={selectables}
                    disabled={props.disabled}
                />
                <HelpPopover popoverContent={props.description}/>
            </div>
        case SelectableValueType.SEARCH_SELECT:
        case SelectableValueType.DYNAMIC_STRING_OR_SEARCH_SELECT:
            return <div id={'selectable-value-mapping-wrapper-' + props.absoluteKey}
                        className={props.classes.valueMappingContainer}>
                <SearchSelectValueComponent
                    absoluteKey={valueAbsoluteKey}
                    displayName={props.displayName}
                    selectables={selectables}
                    disabled={props.disabled}
                />
                <HelpPopover popoverContent={props.description}/>
            </div>
    }
}
export default SelectableValueMappingComponent;