import React, {useEffect, useState} from 'react'
import { useDrop } from 'react-dnd'
import { DraggableTypes } from './DraggableTypes'
import {Controller} from 'react-hook-form';
import {TextField} from "@mui/material";
import {ITag} from "../../types/Tag";

export const TextFieldWithDropZone: React.FunctionComponent<any> = (props) => {
    let backgroundColor = 'white';
    let errorMessage: string = 'Du må oppgi ' + props.label;
    const setPropValue = props.setValue;
    const [inputValue, setInputValue] = useState('');
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: DraggableTypes.TAG,
        drop: (tag:ITag) => {
            setInputValue(prevState => prevState + tag.value + ' ');
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }))

    if (canDrop && isOver) {
        backgroundColor = 'palegreen';
    } else if (canDrop) {
        backgroundColor = 'aliceblue'
    }

    useEffect(() => {
        setPropValue(props.formValue, inputValue)
    }, [inputValue, setInputValue, setPropValue, props.formValue]);

    return (
        <Controller
            control={props.control}
            name={props.formValue}
            render={({ field: { onChange } }) => (
                <div
                    ref={drop}
                    role={'TextFieldWithDropZone'}
                >
                    <TextField
                        id="drag-and-drop-field"
                        size="small"
                        style={{backgroundColor}}
                        sx={{ mb: 3, width: 750 }}
                        label={props.required ? (props.label+'*') : props.label}
                        value={inputValue}
                        onChange={(e) => {
                            setInputValue(e.target.value as string);
                            onChange(e);
                        }}
                        error={inputValue === '' && !!props.error}
                        helperText={props.error ? 'Obligatorisk felt' : ''}
                    />
                </div>
            )}
            rules={{ required: { value: props.required, message: errorMessage } }}
        />
    )
}
