import {useFormContext} from "react-hook-form"
import {getAbsoluteKey} from "../util/KeyUtils";
import {CreateSelectables} from "../util/SelectablesUtils";
import * as React from "react";
import {ValueType} from "../types/Configuration";
import {TemplateComponentProps} from "../types/ValueComponentProps";
import {ISelectableValueTemplate} from "../types/NewForm/FormTemplate";

const SelectValueComponent: React.FunctionComponent<any> = (props: TemplateComponentProps<ISelectableValueTemplate>) => {
    const {register, setValue, control} = useFormContext();
    const absoluteKey = getAbsoluteKey(props.template.elementConfig, props.parentAbsoluteKey)
    const selectables = CreateSelectables(
        props.template, control, props.parentAbsoluteKey
    )
    setValue(absoluteKey + ".type", ValueType.STRING)
    return (
        <>
            <label key={props.template.elementConfig.displayName} className={props.classes.label}>
                {props.template.elementConfig.displayName}:
                <select className={props.classes.select}
                        {...register(absoluteKey + ".mappingString")}
                        autoComplete={props.template.template.type === 'SEARCH_SELECT' ? 'on' : 'off'}
                >
                    {selectables.map(option => {
                        return (
                            <option key={option.displayName} value={option.value}>
                                {option.displayName}
                            </option>
                        )
                    })}
                </select>
            </label>
        </>
    );
}
export default SelectValueComponent;
