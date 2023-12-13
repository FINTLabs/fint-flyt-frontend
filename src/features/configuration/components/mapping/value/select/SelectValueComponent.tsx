import * as React from "react";
import {forwardRef} from "react";
import {ISelectable} from "../../../../types/Selectable";
import {MenuItem, TextField, Typography} from "@mui/material";
import {errorMsgSX, selectSX} from "../../../../../../util/styles/SystemStyles";
import {Noop} from "react-hook-form/dist/types";
import {ControllerFieldState} from "react-hook-form";

interface Props {
    displayName: string;
    selectables: ISelectable[];
    disabled?: boolean;
    onChange?: React.ChangeEventHandler<HTMLInputElement>
    onBlur?: Noop;
    name: string;
    value: string | null;
    fieldState?: ControllerFieldState
}

const SelectValueComponent: React.FunctionComponent<Props> = forwardRef<HTMLDivElement, Props>((props: Props, ref) => {
    SelectValueComponent.displayName = "SelectValueComponent";
    const absoluteKey: string = props.name;
    return <div>
        <TextField
            id={absoluteKey}
            autoComplete={"off"}
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
            error={!!props.fieldState?.error}
        >
            {
                props.selectables.map((selectable: ISelectable, index: number) =>
                    <MenuItem key={absoluteKey + "." + index} value={selectable.value}>
                        {selectable.displayName}
                    </MenuItem>)
            }
        </TextField>
        {props.fieldState?.error && <Typography sx={errorMsgSX}>{props.fieldState?.error.message}</Typography>}
    </div>
})
export default SelectValueComponent;
