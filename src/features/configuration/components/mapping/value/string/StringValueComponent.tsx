import * as React from "react";
import {useContext} from "react";
import {ClassNameMap} from "@mui/styles";
import {TextField} from "@mui/material";
import {ConfigurationContext} from "../../../../../../context/configurationContext";
import {isOutsideCollectionEditContext} from "../../../../util/KeyUtils";
import {ControllerRenderProps} from "react-hook-form/dist/types/controller";

interface Props {
    classes: ClassNameMap;
    displayName: string;
    multiline?: boolean;
    disabled?: boolean;
    field: ControllerRenderProps;
}

const StringValueComponent: React.FunctionComponent<Props> = (props: Props) => {
    const {editCollectionAbsoluteKey} = useContext(ConfigurationContext)
    const absoluteKey: string = props.field.name;
    return (
        <div id={"string-value-component-" + absoluteKey} style={{display: 'flex', flexDirection: 'column'}}>
            <TextField
                {...props.field}
                style={{backgroundColor: 'white'}}
                variant='outlined'
                size='small'
                label={props.displayName}
                disabled={
                    props.disabled
                    || isOutsideCollectionEditContext(absoluteKey, editCollectionAbsoluteKey)
                }
                multiline={props.multiline}
            />
        </div>
    )
}
export default StringValueComponent;