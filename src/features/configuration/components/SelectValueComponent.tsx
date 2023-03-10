import {useFormContext} from "react-hook-form"
import {CreateSelectables} from "../util/SelectablesUtils";
import * as React from "react";
import {ValueType} from "../types/Configuration";
import {ElementComponentProps} from "../types/ValueComponentProps";
import {IUrlBuilder} from "../types/NewForm/FormTemplate";
import {ISelectable} from "./FormPanel";

const SelectValueComponent: React.FunctionComponent<any> =
    (props: ElementComponentProps & {
        selectables?: ISelectable[],
        selectablesSources?: IUrlBuilder[],
        autoComplete: boolean
    }) => {
        const {register, setValue, control} = useFormContext();
        const selectables = CreateSelectables(
            control,
            props.selectables,
            props.selectablesSources,
            props.absoluteKey
        );

        setValue(props.absoluteKey + ".type", ValueType.STRING)
        return (
            <>
                <label key={props.displayName} className={props.classes.label}>
                    {props.displayName}:
                    <select className={props.classes.select}
                            {...register(props.absoluteKey + ".mappingString")}
                            autoComplete={props.autoComplete ? 'on' : 'off'}
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
