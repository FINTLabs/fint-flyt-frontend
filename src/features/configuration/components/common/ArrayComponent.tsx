import * as React from "react";
import {ReactElement} from "react";
import {useFieldArray, useFormContext} from "react-hook-form";
import {useTranslation} from "react-i18next";
import {ClassNameMap} from "@mui/styles";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {iconButtonSX} from "../../styles/SystemStyles";

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
            {fields.length > 0 &&
                <ul id={'list-' + props.absoluteKey} className={classes.list}>
                    {fields.map((field, index) => (
                            <li id={'list-item-' + index} className={classes.listItem} key={field.id}>
                                {props.fieldComponentCreator(
                                    index,
                                    props.absoluteKey + "." + index
                                )}
                            </li>
                        )
                    )}
                </ul>
            }
            <AddIcon sx={iconButtonSX} onClick={() => {
                append(props.defaultValueCreator())
            }}/>
            {fields.length > 0 &&
                <RemoveIcon sx={iconButtonSX} onClick={() => {
                    remove(fields.length - 1)
                }}/>}
        </>
    );
}
export default ArrayComponent