import * as React from "react";
import {forwardRef, useEffect, useState} from "react";
import {ISelectable} from "../../../../types/Selectable";
import {Autocomplete, createFilterOptions, TextField} from "@mui/material";
import {autoCompleteSX} from "../../../../styles/SystemStyles";
import {Noop} from "react-hook-form/dist/types";

interface Props {
    displayName: string;
    selectables: ISelectable[];
    disabled?: boolean;
    onChange?: (value: string | null) => void;
    onBlur?: Noop;
    name: string;
    value: string | null;
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

    useEffect(() => {
        const newDisplayNamePerValue: Record<string, string> = {}
        props.selectables.forEach((selectable: ISelectable) => {
            newDisplayNamePerValue[selectable.value] = selectable.displayName;
        })
        setDisplayNamePerValue(newDisplayNamePerValue);
    }, [props.selectables])

    return <Autocomplete
        sx={autoCompleteSX}
        id={absoluteKey}
        filterOptions={filterOptions}
        options={Object.keys(displayNamePerValue)}
        getOptionLabel={(option: string) => option ? displayNamePerValue[option as string] : ''}
        renderInput={(params) => (
            <TextField
                {...params}
                size="small"
                label={props.displayName}
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
})
export default SearchSelectValueComponent;
