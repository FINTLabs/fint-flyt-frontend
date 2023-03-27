import * as React from "react";
import {useContext} from "react";
import {ISelectable} from "../../../../types/Selectable";
import {MenuItem, TextField} from "@mui/material";
import {selectSX} from "../../../../styles/SystemStyles";
import {ConfigurationContext} from "../../../../../../context/configurationContext";
import {isOutsideCollectionEditContext} from "../../../../util/KeyUtils";
import {ControllerRenderProps} from "react-hook-form/dist/types/controller";

interface Props {
    displayName: string;
    selectables: ISelectable[];
    disabled?: boolean;
    field: ControllerRenderProps;
}

const SelectValueComponent: React.FunctionComponent<Props> = (props: Props) => {
    const {editCollectionAbsoluteKey} = useContext(ConfigurationContext)
    const absoluteKey: string = props.field.name;
    return <TextField
        {...props.field}
        id={absoluteKey}
        size={'small'}
        sx={selectSX}
        select
        label={props.displayName}
        disabled={
            props.disabled
            || isOutsideCollectionEditContext(absoluteKey, editCollectionAbsoluteKey)
        }
    >
        {
            props.selectables.map((selectable: ISelectable, index: number) =>
                <MenuItem key={absoluteKey + "." + index} value={selectable.value}>
                    {selectable.displayName}
                </MenuItem>)
        }
    </TextField>
}
export default SelectValueComponent;
