import * as React from "react";
import {useFieldArray, useFormContext} from "react-hook-form";
import {ElementComponentProps} from "../../types/ElementComponentProps";
import {useTranslation} from "react-i18next";

interface Props extends ElementComponentProps {
    fieldComponentCreator: (absoluteKey: string, displayName: string) => JSX.Element
    defaultValueCreator: () => any
}

const ArrayComponent: React.FunctionComponent<Props> = (props: Props) => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.configuration'});
    const classes = props.classes;
    const {control} = useFormContext();
    const {fields, append, prepend, remove, swap, move, insert} = useFieldArray({
        control,
        name: props.absoluteKey
    });
    return (
        <>
            <div className={classes.title}>{props.displayName}</div>
            {fields.length > 0 &&
                <ul>
                    {fields.map((field, index) => (
                            <li key={field.id}>
                                {props.fieldComponentCreator(props.absoluteKey + "." + index, "" + index)}
                                <button
                                    type="button"
                                    className={classes.button}
                                    onClick={() => {
                                        if (index > 0) {
                                            move(index, index - 1)
                                        }
                                    }}
                                >
                                    {String.fromCharCode(9650)}
                                </button>
                                <button
                                    type="button"
                                    className={classes.button}
                                    onClick={() => {
                                        if (index < fields.length - 1) {
                                            move(index, index + 1)
                                        }
                                    }}
                                >
                                    {String.fromCharCode(9660)}
                                </button>
                                <button
                                    type="button"
                                    className={classes.button}
                                    onClick={() => remove(index)}
                                >
                                    {t("button.remove")}
                                </button>
                            </li>
                        )
                    )}
                </ul>
            }
            <button
                type="button"
                className={classes.button}
                style={{marginTop: '8px'}}
                onClick={() => {
                    append(props.defaultValueCreator())
                }}
            >
                {t("button.append")}
            </button>
        </>
    );
}
export default ArrayComponent