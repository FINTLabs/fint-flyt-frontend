import {useFormContext} from "react-hook-form"
import * as React from "react";
import {ElementComponentProps} from "../../types/ElementComponentProps";
import {ISelectable} from "../FormPanel";

const SelectValueComponent: React.FunctionComponent<any> =
    (props: ElementComponentProps & {
        selectables: ISelectable[]
        autoComplete: boolean
    }) => {
        const {register} = useFormContext();
        return (
            <>
                <label key={props.displayName} className={props.classes.label}>
                    {props.displayName}:
                    <select className={props.classes.select}
                            {...register(props.absoluteKey)}
                            autoComplete={props.autoComplete ? 'on' : 'off'}
                    >
                        {props.selectables.map(option => {
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
