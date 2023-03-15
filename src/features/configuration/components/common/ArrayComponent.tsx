import * as React from "react";
import {ReactElement} from "react";
import {useFieldArray, useFormContext} from "react-hook-form";
import {useTranslation} from "react-i18next";
import {ClassNameMap} from "@mui/styles";

interface Props {
    classes: ClassNameMap;
    absoluteKey: string;
    fieldComponentCreator: (index: number, absoluteKey: string) => ReactElement
    defaultValueCreator: () => any
}

const ArrayComponent: React.FunctionComponent<Props> = (props: Props) => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.configuration'});
    const classes = props.classes;
    const {control} = useFormContext();
    const {fields, append, remove} = useFieldArray({
        control,
        name: props.absoluteKey
    });
    return (
        <>
            <div id={'array-header-' + props.displayName} className={classes.title}>{props.displayName}</div>
            {fields.length > 0 &&
                <ul className={classes.list}>
                    {fields.map((field, index) => (
                        <li className={classes.listItem} key={field.id}>
                                {props.fieldComponentCreator(
                                    index,
                                    props.absoluteKey + "." + index
                                )}
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
            {fields.length > 0 &&
                <button
                    type="button"
                    className={classes.button}
                    style={{marginTop: '8px'}}
                    onClick={() => {
                        remove(fields.length - 1)
                    }}
                >
                    {t("button.remove")}
                </button>
            }
        </>
    );
}
export default ArrayComponent