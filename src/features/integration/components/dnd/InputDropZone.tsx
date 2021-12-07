import React, {useState} from 'react'
import { useDrop } from 'react-dnd'
import { DraggableTypes } from './DraggableTypes'
import {FormControl, TextField} from "@mui/material";
import {ITag} from "../../types/Tag";

export const InputDropZone: React.FunctionComponent<any> = (props) => {
    const [inputValue, setInputValue] = useState('')
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: DraggableTypes.TAG,
        drop: (tag:ITag) => {
            setInputValue(prevState => prevState + ' ' + tag.value)
            props.setValue(props.formValue, inputValue)
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }))

    const isActive = canDrop && isOver
    let backgroundColor = 'white'
    if (isActive) {
        backgroundColor = 'palegreen';
    } else if (canDrop) {
        backgroundColor = 'aliceblue'
    }

    function handleChange(e: any): void {
        setInputValue(e.target.value as string)
        props.setValue(props.formValue, e.target.value as string)
    }

    return (
        <FormControl ref={drop} role={'InputDropZone'} size="small" sx={{mb: 3}} style={{backgroundColor}}>
            <TextField size="small" label={props.label} value={inputValue} onChange={event => handleChange(event)}/>
        </FormControl>
    );
}
