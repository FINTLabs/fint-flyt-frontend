import * as React from "react";
import {forwardRef, useContext, useEffect, useState} from "react";
import {ISelectable} from "../../../../types/Selectable";
import {Autocomplete, createFilterOptions, TextField} from "@mui/material";
import {autoCompleteSX} from "../../../../styles/SystemStyles";
import {ConfigurationContext} from "../../../../../../context/configurationContext";
import {isOutsideCollectionEditContext} from "../../../../util/KeyUtils";
import {Noop} from "react-hook-form/dist/types";
import {AutocompleteChangeDetails, AutocompleteChangeReason} from "@mui/base/AutocompleteUnstyled/useAutocomplete";

interface Props {
    displayName: string;
    selectables: ISelectable[];
    disabled?: boolean;
    onChange?: (
        event: React.SyntheticEvent,
        value: string | null,
        reason: AutocompleteChangeReason,
        details?: AutocompleteChangeDetails,
    ) => void;
    onBlur?: Noop;
    name: string;
    value: string | null;
}

const SearchSelectValueComponent: React.FunctionComponent<Props> = forwardRef<any, Props>((props: Props, ref) => {
    const {editCollectionAbsoluteKey} = useContext(ConfigurationContext)
    const absoluteKey: string = props.name;
    const filterOptions = createFilterOptions({
        matchFrom: 'any',
        stringify: (option: string) => displayNamePerValue[option],
        limit: 250
    });

    const [displayNamePerValue, setDisplayNamePerValue] = useState<Record<string, string>>({});

    useEffect(() => {
        const newDisplayNamePerValue: Record<string, string> = {}
        newDisplayNamePerValue[""] = "";
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
        getOptionLabel={(option) => option ? displayNamePerValue[option as string] : ''}
        renderInput={(params) => (
            <TextField
                {...params}
                size="small"
                label={props.displayName}
            />
        )}
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.value}
        ref={ref}
        disabled={
            props.disabled
            || isOutsideCollectionEditContext(absoluteKey, editCollectionAbsoluteKey)
        }
    />
})
export default SearchSelectValueComponent;
