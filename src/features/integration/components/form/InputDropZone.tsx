import React, {CSSProperties, useState} from 'react'
import { useDrop } from 'react-dnd'
import { ItemTypes } from '../dnd/ItemTypes'
import {TagProps} from "../dnd/Tag";
import {FormControl, TextField} from "@mui/material";

const style: CSSProperties = {
    width: '750px',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    color: 'black',
    textAlign: 'left',
    fontSize: '1rem',
    lineHeight: 'normal',
    float: 'left',
}

export const InputDropzone: React.FunctionComponent<any> = (props) => {
    const [inputValue, setInputValue] = useState('')
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.TAG,
        drop: (tag:TagProps) => {
            console.log('tag', tag.value);
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
        backgroundColor = 'lightgreen'
    } else if (canDrop) {
        backgroundColor = 'lightblue'
    }

    function handleChange(e: any): void {
        setInputValue(e.target.value as string)
        props.setValue(props.formValue, e.target.value as string)
    }

    return (
        <FormControl ref={drop} role={'InputDropzone'} style={{...style, backgroundColor}}>
            <TextField size="small" label={props.label} value={inputValue} onChange={event => handleChange(event)}/>
        </FormControl>
    );
}
