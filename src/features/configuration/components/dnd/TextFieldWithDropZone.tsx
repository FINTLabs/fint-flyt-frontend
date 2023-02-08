import React, {useEffect, useState} from 'react'
import { useDrop } from 'react-dnd'
import { DraggableTypes } from './DraggableTypes'
import {Controller} from 'react-hook-form';
import {TextField} from "@mui/material";
import {ITag} from "../../types/Tag";
import { useTranslation } from 'react-i18next';

export const TextFieldWithDropZone: React.FunctionComponent<any> = (props) => {
    const { t } = useTranslation('translations', { keyPrefix: 'inputField'});
    let backgroundColor = 'white';
    let errorMessage: string = t('errorMessage') + t(props.label);
    let initValue: string = props.value === null ? '' : props.value;
    const setPropValue = props.setValue;
    const [inputValue, setInputValue] = useState(initValue);
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: DraggableTypes.TAG,
        drop: (tag:ITag) => {
            setInputValue(prevState => prevState + tag.value);
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
            render={({ field: { onChange, value } }) => {
                value=inputValue;
                return (
                        <TextField
                            disabled={props.disabled}
                            id={props.id}
                            ref={drop}
                            size="small"
                            style={{backgroundColor}}
                            sx={{ mb: 3, width: 'inherit' }}
                            label={props.required ? (t(props.label)+'*') : t(props.label)}
                            value={value}
                            onChange={(e) => {
                                setInputValue(e.target.value as string);
                                onChange(e);
                            }}
                            error={value === '' && !!props.error && props.required}
                            helperText={(value === '' && props.error && props.required) ? 'Obligatorisk felt' : ''}
                        />)
            }}
            rules={{
                required: { value: props.required, message: errorMessage }
            }}
        />
    )
}
