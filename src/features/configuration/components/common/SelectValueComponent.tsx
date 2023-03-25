import {Controller, useFormContext} from "react-hook-form"
import * as React from "react";
import {useContext} from "react";
import {ISelectable} from "../../types/Selectable";
import {MenuItem, TextField} from "@mui/material";
import {selectSX} from "../../styles/SystemStyles";
import {ConfigurationContext} from "../../../../context/configurationContext";
import {isOutsideCollectionEditContext} from "../../util/KeyUtils";

interface Props {
    absoluteKey: string;
    displayName: string;
    selectables: ISelectable[];
    disabled?: boolean;
}

const SelectValueComponent: React.FunctionComponent<Props> = (props: Props) => {
    const {control} = useFormContext();
    const {editCollectionAbsoluteKey} = useContext(ConfigurationContext)

    return (
        <Controller
            name={props.absoluteKey}
            defaultValue={"none"}
            control={control}
            render={({field}) =>
                <TextField
                    {...field}
                    id={props.absoluteKey}
                    size={'small'}
                    sx={selectSX}
                    select
                    label={props.displayName}
                    disabled={
                        props.disabled
                        || isOutsideCollectionEditContext(props.absoluteKey, editCollectionAbsoluteKey)
                    }
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
                </TextField>
            }
        />
    );
}
export default SelectValueComponent;
