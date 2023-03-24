import {Controller, useFormContext} from "react-hook-form"
import * as React from "react";
import {useContext} from "react";
import {ISelectable} from "../../types/Selectable";
import {Autocomplete, createFilterOptions, TextField} from "@mui/material";
import {autoCompleteSX} from "../../styles/SystemStyles";
import {ConfigurationContext} from "../../../../context/configurationContext";

interface Props {
    absoluteKey: string;
    displayName: string;
    selectables: ISelectable[];
    disabled?: boolean;
}

const SearchSelectValueComponent: React.FunctionComponent<Props> = (props: Props) => {
    const {control, getValues} = useFormContext();
    const {completed} = useContext(ConfigurationContext)
    const filterOptions = createFilterOptions({
        matchFrom: 'any',
        stringify: (option: ISelectable) => option.displayName,
        limit: 250
    });

    function getSelectedValue(absoluteKey: string): ISelectable | null {
        if (getValues(absoluteKey)) {
            let foundValue = props.selectables.find(({value}: { value: any }) => value === getValues(props.absoluteKey))
            if (foundValue) {
                return foundValue
            }
        }
        return null
    }

    return (
        <Controller
            name={props.absoluteKey}
            control={control}
            render={({field}) => (
                <Autocomplete
                    {...field}
                    id={props.absoluteKey}
                    filterOptions={filterOptions}
                    options={props.selectables}
                    getOptionLabel={(option: ISelectable) => option ? option.displayName : ''}
                    value={getSelectedValue(props.absoluteKey)}
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
                    disabled={props.disabled || completed}
                />
            )}
        />
    );
}

export default SearchSelectValueComponent;
