import {Controller, useFormContext} from "react-hook-form";
import * as React from "react";
import {ElementComponentProps} from "../../types/ElementComponentProps";
import {TextField} from "@mui/material";

const StringValueComponent: React.FunctionComponent<ElementComponentProps> = (props: ElementComponentProps) => {
    const {register, control} = useFormContext();
    return (
        <div id={"string-value-component-" + props.absoluteKey} style={{display: 'flex', flexDirection: 'column'}}>
            <Controller
                name={props.absoluteKey}
                control={control}
                render={({field}) =>
                    <TextField style={{backgroundColor: 'white'}} variant='outlined' size='small'
                               label={props.displayName} {...field}/>
                }
            />
        </div>

    )
}
export default StringValueComponent;