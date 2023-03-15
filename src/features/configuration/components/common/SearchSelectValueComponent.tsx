import {Controller, useFormContext} from "react-hook-form"
import * as React from "react";
import {ElementComponentProps} from "../../types/ElementComponentProps";
import {ISelectable} from "../../types/Selectable";
import {Autocomplete, createFilterOptions, TextField} from "@mui/material";

interface Props extends ElementComponentProps {
    selectables: ISelectable[]
    autoComplete: boolean
}

const SearchSelectValueComponent: React.FunctionComponent<Props> = (props: Props) => {
    console.log('render searchselect')
    const {register, control, getValues, setValue} = useFormContext();
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
                            sx={{backgroundColor: 'white', width: '350px'}}
                            size="small"
                            label={props.displayName}
                        />
                    )}
                    onChange={(_, data) => {
                        data !== null ? field.onChange(data.value) : field.onChange(data)
                        console.log(data)
                    }}
                />
            )}
        />
    );
}

export default SearchSelectValueComponent;
