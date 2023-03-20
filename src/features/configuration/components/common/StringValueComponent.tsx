import {Controller, useFormContext} from "react-hook-form";
import * as React from "react";
import {ClassNameMap} from "@mui/styles";
import {TextField} from "@mui/material";

interface Props {
    classes: ClassNameMap;
    absoluteKey: string;
    displayName: string;
    disabled?: boolean;
}

const StringValueComponent: React.FunctionComponent<Props> = (props: Props) => {
    const {control} = useFormContext();
    return (
        <div id={"string-value-component-" + props.absoluteKey} style={{display: 'flex', flexDirection: 'column'}}>
            <Controller
                name={props.absoluteKey}
                control={control}
                render={({field}) =>
                    <>
                        <TextField
                            style={{backgroundColor: 'white'}}
                            variant='outlined'
                            size='small'
                            label={props.displayName}
                            disabled={props.disabled}
                            {...field}
                        />
                    </>
                }
            />
        </div>
    )
}
export default StringValueComponent;