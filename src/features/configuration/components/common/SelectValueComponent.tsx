import {Controller, useFormContext} from "react-hook-form"
import * as React from "react";
import {useContext} from "react";
import {ISelectable} from "../../types/Selectable";
import {MenuItem, Select} from "@mui/material";
import {selectSX} from "../../styles/SystemStyles";
import {ConfigurationContext} from "../../../../context/configurationContext";

interface Props {
    absoluteKey: string;
    displayName: string;
    selectables: ISelectable[];
    disabled?: boolean;
}

const SelectValueComponent: React.FunctionComponent<Props> = (props: Props) => {
    const {control} = useFormContext();
    const {completed} = useContext(ConfigurationContext)

    return (
        <Controller
            name={props.absoluteKey}
            defaultValue={"none"}
            control={control}
            render={({field}) => <>
                <Select
                    {...field}
                    id={props.absoluteKey}
                    size={'small'}
                    sx={selectSX}
                    disabled={props.disabled || completed}
                >
                    <MenuItem key={props.absoluteKey + ".0"} value="none" disabled>
                        {props.displayName}
                    </MenuItem>
                    {
                        props.selectables.map((selectable: ISelectable, index: number) =>
                            <MenuItem key={props.absoluteKey + "." + index} value={selectable.value}>
                                {selectable.displayName}
                            </MenuItem>)
                    }
                </Select>
            </>
            }
        />

    );
}
export default SelectValueComponent;
