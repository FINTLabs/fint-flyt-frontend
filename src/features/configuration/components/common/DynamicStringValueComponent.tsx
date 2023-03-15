import * as React from "react";
import {Controller, useFormContext} from "react-hook-form";
import {useDrop} from "react-dnd";
import {ITag} from "../../types/Metadata/Tag";
import {ElementComponentProps} from "../../types/ElementComponentProps";
import {ValueType} from "../../types/Metadata/IntegrationMetadata"
import {TextField} from "@mui/material";

interface Props extends ElementComponentProps {
    accept: ValueType[]
}

const DynamicStringValueComponent: React.FunctionComponent<Props> = (props: Props) => {
    const {setValue, getValues, control} = useFormContext();
    const [{canDrop, isOver}, dropRef] = useDrop({
        accept: props.accept,
        drop: (tag: ITag) => {
            getValues(props.absoluteKey) === undefined
                ?
                setValue(props.absoluteKey, tag.value)
                :
                setValue(props.absoluteKey, (getValues(props.absoluteKey) + tag.value))
        },
        collect: monitor => ({
            canDrop: monitor.canDrop(),
            isOver: monitor.isOver()
        })
    })

    let background = 'white';

    const inputStyle = {
        backgroundColor: 'white',
        width: '350px',
        borderRadius: '3px',
        margin: 'none',
        marginTop: '5px',
        marginBottom: '16px'
    };

    if (canDrop && isOver) {
        background = 'lightgreen';
    } else if (canDrop) {
        background = 'lightblue';
    } else if (isOver && !canDrop) {
        background = 'red';
    }

    const dynamicStyle: React.CSSProperties = {
        ...inputStyle,
        background
    }

    return (
        <div id={"dnd-value-component-" + props.absoluteKey} ref={dropRef} key={props.absoluteKey}>
            <Controller
                name={props.absoluteKey}
                control={control}
                defaultValue=""
                render={({field}) =>
                    <TextField style={dynamicStyle} variant='outlined' size='small'
                               label={props.displayName}{...field}
                    />
                }
            />
        </div>
    )
}
export default DynamicStringValueComponent;