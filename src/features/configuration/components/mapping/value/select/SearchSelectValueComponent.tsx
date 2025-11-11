import * as React from "react";
import {forwardRef, useEffect, useMemo, useState} from "react";
import {ISelectable} from "../../../../types/Selectable";
import {Autocomplete, createFilterOptions, TextField, Typography} from "@mui/material";
import {autoCompleteSX, errorMsgSX} from "../../../../../../util/styles/SystemStyles";
import {Noop} from "react-hook-form/dist/types";
import {ControllerFieldState} from "react-hook-form";

interface Props {
    displayName: string;
    selectables: ISelectable[];
    disabled?: boolean;
    onChange?: (value: string | null) => void;
    onBlur?: Noop;
    name: string;
    value: string | null;
    fieldState?: ControllerFieldState;
}

const SearchSelectValueComponent: React.FunctionComponent<Props> = forwardRef<HTMLDivElement, Props>((props: Props, ref) => {
    SearchSelectValueComponent.displayName = "SearchSelectValueComponent"
    const absoluteKey: string = props.name;
    const filterOptions = createFilterOptions({
        matchFrom: 'any',
        stringify: (option: string) => displayNamePerValue[option],
        limit: 250
    });

    const [displayNamePerValue, setDisplayNamePerValue] = useState<Record<string, string>>({});
    const loading = useMemo(() => {
        return Object.keys(props.selectables).length === 0 || Object.keys(displayNamePerValue).length === 0;
    }, [props.selectables])

    useEffect(() => {
        const newDisplayNamePerValue: Record<string, string> = {}
        props.selectables.forEach((selectable: ISelectable) => {
            newDisplayNamePerValue[selectable.value] = selectable.displayName;
        })
        setDisplayNamePerValue(newDisplayNamePerValue);
    }, [props.selectables])

    return <div>
        <Autocomplete
            sx={autoCompleteSX}
            id={absoluteKey}
            loading={loading}
            filterOptions={filterOptions}
            options={Object.keys(displayNamePerValue)}
            getOptionLabel={(option: string) => displayNamePerValue[option as string] ?? ''}
            renderInput={(params) => (
                <TextField
                    {...params}
                    size="small"
                    label={props.displayName}
                    error={!!props.fieldState?.error}
                />
            )}
            onChange={(_, value: string | null) => {
                if (props.onChange) {
                    props.onChange(value)
                }
            }}
            onBlur={props.onBlur}
            value={props.value}
            ref={ref}
            disabled={props.disabled}
        />
        {props.fieldState?.error && <Typography sx={errorMsgSX}>{props.fieldState?.error.message}</Typography>}
    </div>
})
export default SearchSelectValueComponent;
