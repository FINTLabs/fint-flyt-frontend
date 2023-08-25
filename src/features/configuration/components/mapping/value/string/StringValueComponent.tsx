import * as React from "react";
import {forwardRef} from "react";
import {ClassNameMap} from "@mui/styles";
import {TextField, Typography} from "@mui/material";
import {Noop} from "react-hook-form/dist/types";
import {ControllerFieldState} from "react-hook-form";
import {errorMsgSX} from "../../../../../../util/styles/SystemStyles";

interface Props {
    classes: ClassNameMap;
    displayName: string;
    multiline?: boolean;
    disabled?: boolean;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onBlur?: Noop;
    required?: boolean;
    name: string;
    value: string | null;
    fieldState: ControllerFieldState | undefined
}

const StringValueComponent: React.FunctionComponent<Props> = forwardRef<HTMLDivElement, Props>((props: Props, ref) => {
    StringValueComponent.displayName = "StringValueComponent";
    const absoluteKey: string = props.name;
    return (
        <div id={"string-value-component-" + absoluteKey} style={{display: 'flex', flexDirection: 'column'}}>
            <TextField
                id={absoluteKey}
                style={{backgroundColor: 'white', width: '352px'}}
                variant='outlined'
                size='small'
                label={props.displayName}
                onChange={props.onChange}
                onBlur={props.onBlur}
                name={props.name}
                value={props.value}
                ref={ref}
                disabled={props.disabled}
                required={props.required}
                multiline={props.multiline}
                maxRows={props.multiline ? 4 : undefined}
                error={!!props.fieldState?.error}
            />
            {props.fieldState?.error && <Typography sx={errorMsgSX}>{props.fieldState?.error.message}</Typography>}
        </div>
    )
})
export default StringValueComponent;