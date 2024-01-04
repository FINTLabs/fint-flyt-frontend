import * as React from "react";
import {ReactElement} from "react";
import {useFieldArray, useFormContext} from "react-hook-form";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {IconButton} from "@mui/material";
import {iconButtonSX} from "../../../../../util/styles/SystemStyles";
import {Box} from "@navikt/ds-react";

interface Props {
    absoluteKey: string;
    fieldComponentCreator: (index: number, absoluteKey: string) => ReactElement
    defaultValueCreator: () => any, // eslint-disable-line
    onFieldClose?: (index: number) => void,
    disabled?: boolean
    fromCollection?: boolean
}

const ArrayComponent: React.FunctionComponent<Props> = (props: Props) => {
    const {control} = useFormContext();
    const {fields, append, remove} = useFieldArray({
        control,
        name: props.absoluteKey
    });

    return <ul id={'list-' + props.absoluteKey}
               style={{listStyle: 'none', padding: 'unset', margin: '6px', border: 'none'}}>
        {fields.map((field, index) => (
                props.fromCollection ?
                    <Box key={field.id} background={"surface-default"} padding={"6"} borderRadius={"large"} borderWidth="2" borderColor={"border-subtle"} style={{marginBottom: '16px'}}>
                        <li id={'list-item-' + index}>
                            {props.fieldComponentCreator(
                                index,
                                props.absoluteKey + "." + index
                            )}
                        </li>
                    </Box>
                    : <li id={'list-item-' + index} key={field.id}>
                        {props.fieldComponentCreator(
                            index,
                            props.absoluteKey + "." + index
                        )}
                    </li>

            )
        )}
        <IconButton
            id={'add-icon'}
            aria-label={'add-icon'}
            onClick={() => {
                append(props.defaultValueCreator())
            }}
            disabled={props.disabled}
        >
            <AddIcon sx={iconButtonSX}/>
        </IconButton>
        {fields.length > 0 &&
            <IconButton
                id={'remove-icon'}
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