import * as React from "react";
import {ElementComponentProps, ElementTemplateComponentProps} from "../../types/ElementComponentProps";
import {ISelectableValueTemplate, SelectableValueType} from "../../types/FormTemplate";
import SelectValueComponent from "../common/SelectValueComponent";
import {useFormContext} from "react-hook-form";
import {ValueType} from "../../types/Configuration";
import {CreateSelectables} from "../../util/SelectablesUtils";

interface Props extends ElementComponentProps,
    ElementTemplateComponentProps<ISelectableValueTemplate> {
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
            return <SelectValueComponent
                classes={props.classes}
                absoluteKey={valueAbsoluteKey}
                displayName={props.displayName}
                selectables={selectables}
                autoComplete={false}
            />
        case SelectableValueType.SEARCH_SELECT:
            return <SelectValueComponent
                classes={props.classes}
                absoluteKey={valueAbsoluteKey}
                displayName={props.displayName}
                selectables={selectables}
                autoComplete={true}
            />
        case SelectableValueType.DYNAMIC_STRING_OR_SEARCH_SELECT:
            return <></>
    }
}
export default SelectableValueMappingComponent;