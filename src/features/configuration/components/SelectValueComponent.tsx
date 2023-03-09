import {useFormContext} from "react-hook-form"
import {getAbsoluteKey} from "../util/KeyUtils";
import {CreateSelectables} from "../util/SelectablesUtils";
import * as React from "react";
import {IElementTemplate, ISelectableValueTemplate} from "../types/NewForm/FormTemplate";

const SelectValueComponent: React.FunctionComponent<any> = (props: {
    parentAbsoluteKey: string,
    template: IElementTemplate<ISelectableValueTemplate>
}) => {
    const {register, control} = useFormContext();
    const absoluteKey = getAbsoluteKey(props.template.elementConfig, props.parentAbsoluteKey)
    const selectables = CreateSelectables(
        props.template, control, props.parentAbsoluteKey
    )
    return (
        <>
            <label key={props.template.elementConfig.displayName}>
                {props.template.elementConfig.displayName}:
                <select {...register(absoluteKey)}
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
