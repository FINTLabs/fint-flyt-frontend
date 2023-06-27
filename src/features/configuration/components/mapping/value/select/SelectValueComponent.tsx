import * as React from "react";
import {forwardRef} from "react";
import {ISelectable} from "../../../../types/Selectable";
import {MenuItem, TextField} from "@mui/material";
import {selectSX} from "../../../../../../util/styles/SystemStyles";
import {Noop} from "react-hook-form/dist/types";

interface Props {
    displayName: string;
    selectables: ISelectable[];
    disabled?: boolean;
    onChange?: React.ChangeEventHandler<HTMLInputElement>
    onBlur?: Noop;
    name: string;
    value: string | null;
}

const SelectValueComponent: React.FunctionComponent<Props> = forwardRef<any, Props>((props: Props, ref) => {
    const absoluteKey: string = props.name;
    return <TextField
        id={absoluteKey}
        size={'small'}
        sx={selectSX}
        select
        label={props.displayName}
        onChange={props.onChange}
        onBlur={props.onBlur}
        name={props.name}
        value={props.value}
        ref={ref}
        disabled={props.disabled}
    >
        {
            props.selectables.map((selectable: ISelectable, index: number) =>
                <MenuItem key={absoluteKey + "." + index} value={selectable.value}>
                    {selectable.displayName}
                </MenuItem>)
        }
    </TextField>
})
export default SelectValueComponent;
