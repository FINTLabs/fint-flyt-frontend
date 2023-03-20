import {Controller, useFormContext} from "react-hook-form"
import * as React from "react";
import {useContext} from "react";
import {ISelectable} from "../../types/Selectable";
import {Autocomplete, createFilterOptions, TextField} from "@mui/material";
import {autoCompleteSX} from "../../styles/SystemStyles";
import {ConfigurationContext} from "../../../../context/configurationContext";
import {editCollectionAbsoluteKeyIncludesAbsoluteKey} from "../../util/ObjectUtils";

interface Props {
    absoluteKey: string;
    displayName: string;
    selectables: ISelectable[];
    disabled?: boolean;
}

const SearchSelectValueComponent: React.FunctionComponent<Props> = (props: Props) => {
    const {control} = useFormContext();
    const {editingCollection} = useContext(ConfigurationContext)
    const filterOptions = createFilterOptions({
        matchFrom: 'any',
        stringify: (option: ISelectable) => option.displayName,
        limit: 250
    });
    let disable: boolean = editingCollection ?
        !editCollectionAbsoluteKeyIncludesAbsoluteKey(editingCollection, props.absoluteKey)
        : false;
    return (
        <Controller
            name={props.absoluteKey}
            control={control}
            render={({field}) => (
                <Autocomplete
                    {...field}
                    id={props.absoluteKey}
                    sx={{mb: 2}}
                    filterOptions={filterOptions}
                    options={props.selectables}
                    getOptionLabel={(option: ISelectable) => option ? option.displayName : ''}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            sx={autoCompleteSX}
                            size="small"
                            label={props.displayName}
                        />
                    )}
                    onChange={(_, data) => {
                        data !== null ? field.onChange(data.value) : field.onChange(data)
                    }}
                    disabled={props.disabled || disable}
                />
            )}
        />
    );
}

export default SearchSelectValueComponent;
