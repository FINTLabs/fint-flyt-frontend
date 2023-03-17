import * as React from "react";
import {ISelectableValueTemplate, SelectableValueType} from "../../types/FormTemplate";
import SelectValueComponent from "../common/SelectValueComponent";
import {useFormContext} from "react-hook-form";
import {ValueType} from "../../types/Configuration";
import {CreateSelectables} from "../../util/SelectablesUtils";
import SearchSelectValueComponent from "../common/SearchSelectValueComponent";
import {ClassNameMap} from "@mui/styles";

interface Props {
    classes: ClassNameMap;
    absoluteKey: string;
    displayName: string;
    template: ISelectableValueTemplate
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
                absoluteKey={valueAbsoluteKey}
                displayName={props.displayName}
                selectables={selectables}
            />
        case SelectableValueType.SEARCH_SELECT:
            return <SearchSelectValueComponent
                absoluteKey={valueAbsoluteKey}
                displayName={props.displayName}
                selectables={selectables}
            />
        case SelectableValueType.DYNAMIC_STRING_OR_SEARCH_SELECT:
            return <></>
    }
}
export default SelectableValueMappingComponent;