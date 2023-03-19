import {Controller, useFormContext} from "react-hook-form"
import * as React from "react";
import {ISelectable} from "../../types/Selectable";
import {MenuItem, Select} from "@mui/material";
import {selectSX} from "../../styles/SystemStyles";

interface Props {
    absoluteKey: string;
    displayName: string;
    selectables: ISelectable[]
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
                >
                    {
                        props.selectables.map((selectable: ISelectable, index) =>
                            <MenuItem key={index} value={selectable.value}>
                                {selectable.displayName}
                            </MenuItem>)
                    }
                </Select>
            }
        />
    );
}
export default SelectValueComponent;
