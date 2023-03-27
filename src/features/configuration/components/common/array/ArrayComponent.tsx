import * as React from "react";
import {ReactElement} from "react";
import {useFieldArray, useFormContext} from "react-hook-form";
import {useTranslation} from "react-i18next";
import {ClassNameMap} from "@mui/styles";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {iconButtonSX} from "../../../styles/SystemStyles";
import {IconButton} from "@mui/material";

interface Props {
    classes: ClassNameMap;
    absoluteKey: string;
    fieldComponentCreator: (index: number, absoluteKey: string) => ReactElement
    defaultValueCreator: () => any,
    onFieldClose?: (index: number) => void,
    disabled?: boolean
}

const ArrayComponent: React.FunctionComponent<Props> = (props: Props) => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.configuration'});
    const classes = props.classes;
    const {control} = useFormContext();
    const {fields, append, remove} = useFieldArray({
        control,
        name: props.absoluteKey
    });
    return <ul id={'list-' + props.absoluteKey} className={props.classes.listBorderless}>
        {fields.map((field, index) => (
                <li id={'list-item-' + index} className={classes.listItem} key={field.id}>
                    {props.fieldComponentCreator(
                        index,
                        props.absoluteKey + "." + index
                    )}
                </li>
            )
        )}
        <IconButton
            onClick={() => {
                append(props.defaultValueCreator())
            }}
            disabled={props.disabled}
        >
            <AddIcon sx={iconButtonSX}/>
        </IconButton>
        {fields.length > 0 &&
            <IconButton
                onClick={() => {
                    const index = fields.length - 1;
                    remove(fields.length - 1);
                    if (props.onFieldClose) {
                        props.onFieldClose(index)
                    }
                }}
                disabled={props.disabled}
            >
                <RemoveIcon sx={iconButtonSX}/>
            </IconButton>
        }
    </ul>
}
export default ArrayComponent