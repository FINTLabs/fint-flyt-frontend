import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {ISelectable} from "../../../../types/Selectable";
import {Autocomplete, createFilterOptions, TextField} from "@mui/material";
import {autoCompleteSX} from "../../../../styles/SystemStyles";
import {ConfigurationContext} from "../../../../../../context/configurationContext";
import {isOutsideCollectionEditContext} from "../../../../util/KeyUtils";
import {ControllerRenderProps} from "react-hook-form/dist/types/controller";

interface Props {
    displayName: string;
    selectables: ISelectable[];
    disabled?: boolean;
    field: ControllerRenderProps;
}

const SearchSelectValueComponent: React.FunctionComponent<Props> = (props: Props) => {
    const {editCollectionAbsoluteKey} = useContext(ConfigurationContext)
    const absoluteKey: string = props.field.name;
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
        {...props.field}
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
        onChange={(_, data) => {
            // TODO eivindmorch 26/03/2023 : What is this for?
            data !== null ? props.field.onChange(data) : props.field.onChange(null)
        }}
        disabled={
            props.disabled
            || isOutsideCollectionEditContext(absoluteKey, editCollectionAbsoluteKey)
        }
    />
}

export default SearchSelectValueComponent;
