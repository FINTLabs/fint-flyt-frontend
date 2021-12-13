import React, {useEffect, useState} from 'react'
import { useDrop } from 'react-dnd'
import { DraggableTypes } from './DraggableTypes'
import {FormControl, TextField} from "@mui/material";
import {ITag} from "../../types/Tag";

export const TextFieldWithDropZone: React.FunctionComponent<any> = (props) => {
    let backgroundColor = 'white';
    const setPropValue = props.setValue;
    const [inputValue, setInputValue] = useState('');
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: DraggableTypes.TAG,
        drop: (tag:ITag) => {
            if(!props.hidden) setInputValue(prevState => prevState + tag.value + ' ');
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop() && !props.hidden,
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
        <FormControl ref={drop} role={'TextFieldWithDropZone'} size="small" sx={{mb: 3}} style={{backgroundColor}}>
            <TextField disabled={props.hidden} size="small" label={props.label} value={inputValue} onChange={e => setInputValue(e.target.value as string)}/>
        </FormControl>
    );
}
