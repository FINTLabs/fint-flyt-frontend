import * as React from "react";
import {useFieldArray, useFormContext} from "react-hook-form";
import {ElementComponentProps} from "../../types/ElementComponentProps";

interface Props extends ElementComponentProps {
    fieldComponentCreator: (absoluteKey: string, displayName: string) => JSX.Element
    defaultValueCreator: () => any
}

const ArrayComponent: React.FunctionComponent<Props> = (props: Props) => {
    const {control} = useFormContext();
    const {fields, append, prepend, remove, swap, move, insert} = useFieldArray({
        control,
        name: props.absoluteKey
    });
    return (
        <>
            <div className={props.classes.title}>{props.displayName}</div>
            <ul>
                {fields.map((field, index) => (
                        <li key={field.id}>
                            {props.fieldComponentCreator(props.absoluteKey + "." + index, "" + index)}
                            <button type="button" onClick={() => remove(index)}>Remove</button>
                        </li>
                    )
                )}
            </ul>
            <button
                type="button"
                onClick={() => {
                    append(props.defaultValueCreator())
                }}
            >
                Append
            </button>
        </>
    );
}
export default ArrayComponent