import {Controller, useFormContext} from "react-hook-form"
import * as React from "react";
import {ISelectable} from "../../types/Selectable";
import {MenuItem, Select} from "@mui/material";
import {selectSX} from "../../styles/SystemStyles";

interface Props {
    absoluteKey: string;
    displayName: string;
    selectables: ISelectable[];
    disabled?: boolean;
}

const SelectValueComponent: React.FunctionComponent<Props> = (props: Props) => {
    const {control} = useFormContext();

    return (
        <Controller
            name={props.absoluteKey}
            defaultValue={props.selectables[0].value}
            control={control}
            render={({field}) =>
                <Select
                    {...field}
                    id={props.absoluteKey}
                    size={'small'}
                    sx={selectSX}
                    disabled={props.disabled}
                >
                    {
                        props.selectables.map(selectable =>
                            <MenuItem value={selectable.value}>
                                {selectable.displayName}
                            </MenuItem>)
                    }
                </Select>
            }
        />
    );
}
export default SelectValueComponent;
