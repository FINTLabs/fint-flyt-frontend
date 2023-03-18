import {Controller, useFormContext} from "react-hook-form"
import * as React from "react";
import {ISelectable} from "../../types/Selectable";
import {Autocomplete, createFilterOptions, TextField} from "@mui/material";
import {autoCompleteSX} from "../../styles/SystemStyles";

interface Props {
    absoluteKey: string;
    displayName: string;
    selectables: ISelectable[];
    disabled?: boolean;
}

const SearchSelectValueComponent: React.FunctionComponent<Props> = (props: Props) => {
    const {control} = useFormContext();
    const filterOptions = createFilterOptions({
        matchFrom: 'any',
        stringify: (option: ISelectable) => option.displayName,
        limit: 250
    });

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
                    getOptionLabel={(option: ISelectable) => option.displayName}
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
                        console.log(data)
                    }}
                    disabled={props.disabled}
                />
            )}
        />
    );
}

export default SearchSelectValueComponent;
