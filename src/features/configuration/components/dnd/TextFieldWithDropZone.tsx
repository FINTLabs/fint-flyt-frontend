import React, {useContext, useEffect, useState} from 'react'
import { useDrop } from 'react-dnd'
import { DraggableTypes } from './DraggableTypes'
import {Controller} from 'react-hook-form';
import {TextField} from "@mui/material";
import {ITag} from "../../types/Tag";
import { useTranslation } from 'react-i18next';
import {SourceApplicationContext} from "../../../../context/sourceApplicationContext";
import {extractTags} from "../../../util/StringUtil";
import {flatten} from "../../../util/JsonUtil";

export const TextFieldWithDropZone: React.FunctionComponent<any> = (props) => {
    const { t } = useTranslation('translations', { keyPrefix: 'inputField'});
    let backgroundColor = 'white';
    let errorMessage: string = t('errorMessage') + t(props.label);
    let initValue: string = props.value === null ? '' : props.value;
    const setPropValue = props.setValue;
    const regExp = /^(?:(?:(?!\$if\{).)+|(?:\$if\{(?:(?!\$if\{).)+})+)+$/g;
    const {instanceElementMetadata} = useContext(SourceApplicationContext)

    function validAndExisting(value: string): boolean {
        console.log(!regExp.test(value))
        if(!regExp.test(value)) {
            console.log('stoppa i regexCheck', value, !regExp.test(value))
            return false
        }
        if(value && value !== '' && instanceElementMetadata) {
            const instanceFields = extractTags(value, '$if{', '}')
            const flatMetadata = flatten(instanceElementMetadata)
            const keys = flatMetadata.map((item: any) => item.key).filter((item: any) => {return item !== null})
            console.log('array check', instanceFields.every(v => keys.includes(v)))
            return instanceFields.every(v => keys.includes(v))
        }
        console.log('stoppa, kom ikke gjennom value && value !== \'\' && instanceElementMetadata')
        return false
    }

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

    const validation = props.validation;
    const error = props.error;
    const validRegEx: boolean = regExp.test(inputValue)
    const validAndRegEx = validAndExisting(inputValue)

    console.log(validRegEx, validAndRegEx)

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
                        error={(!!props.error && props.required) || (inputValue === '' && props.required && !!props.error)}
                        helperText={(value === '' && error && props.required && validation) ? 'Obligatorisk felt' : ((validation && inputValue !== '' && !validAndRegEx) ? 'Data fra skjema må være på formatet $if{metadata} og eksistere i data fra skjema' : '')}
                    />)
            }}
            rules={
                validation ? {
                    pattern: {value: regExp, message: errorMessage},
                    required: {value: props.required, message: errorMessage}
                } : {}
            }
        />
    )
}
