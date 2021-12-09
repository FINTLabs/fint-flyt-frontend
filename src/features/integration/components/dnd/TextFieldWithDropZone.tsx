import React, {useEffect, useState} from 'react'
import { useDrop } from 'react-dnd'
import { DraggableTypes } from './DraggableTypes'
import {FormControl, TextField} from "@mui/material";
import {ITag} from "../../types/Tag";

export const TextFieldWithDropZone: React.FunctionComponent<any> = (props) => {
    let backgroundColor = 'white';
    const [inputValue, setInputValue] = useState('');
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: DraggableTypes.TAG,
        drop: (tag:ITag) => {
            if(!props.disabled) setInputValue(prevState => prevState + tag.value + ' ');
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop() && !props.disabled,
        }),
    }))

    if (canDrop && isOver) {
        backgroundColor = 'palegreen';
    } else if (canDrop) {
        backgroundColor = 'aliceblue'
    }

    useEffect(() => {
        props.setValue(props.formValue, inputValue)
    }, [inputValue, setInputValue]);

    return (
        <FormControl ref={drop} role={'TextFieldWithDropZone'} size="small" sx={{mb: 3}} style={{backgroundColor}}>
            <TextField disabled={props.disabled} size="small" label={props.label} value={inputValue} onChange={e => setInputValue(e.target.value as string)}/>
        </FormControl>
    );
}
