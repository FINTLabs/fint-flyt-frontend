import { Box } from '@mui/system';
import type { CSSProperties, FC } from 'react'
import React, {memo, useState} from 'react'
import { useDrop } from 'react-dnd'
import {TagProps} from "./Tag";
import {Button} from "@navikt/ds-react";
import {Typography} from "@mui/material";
import {ItemTypes} from "./ItemTypes";

const style: CSSProperties = {
    height: '30vh',
    width: '50vw',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    color: 'white',
    textAlign: 'center',
    fontSize: '1rem',
    lineHeight: 'normal',
    float: 'left',
}

export interface CustomFieldProps {
    accept: string[]
    lastDroppedItem?: TagProps
    onDrop: (item: TagProps) => void
}
export const ValueConvertingComp = (value: TagProps, handleDrop: (index: number, item: any) => void) => {
    return <Box style={{backgroundColor: 'green', height: '100px', width: '200px'}}>
        <Typography>I am a Value Converting comp I need:</Typography>
        <CustomField
            accept={[ItemTypes.STRING, ItemTypes.METADATA, ItemTypes.VALUE_CONVERTING]}
            lastDroppedItem={undefined}
            onDrop={(item) => handleDrop(0, item )}
        />
    </Box>
}

export const StringComp = (value: TagProps) => {
    return <Box style={{backgroundColor: 'darksalmon', height: '100px', width: '200px'}}>
        <Typography>I am a String comp, my value is {value.name} and I have type {value.type}</Typography>
    </Box>
}

export const MetadataComp = (value: TagProps) => {
    return <Box style={{backgroundColor: 'darkblue', height: '100px', width: '200px'}}>
        <Typography>I am a Metadata comp, my value is {value.name} and I have type {value.type}</Typography>
    </Box>
}

export const AlphaNumericComp = (value: TagProps) => {
    return <Box style={{backgroundColor: 'darkmagenta', height: '100px', width: '200px'}}>
        <Typography>I am a Alphanumeric comp, my value is {value.name} and I have type {value.type}</Typography>
    </Box>
}


// eslint-disable-next-line react/prop-types
export const CustomField: FC<CustomFieldProps> = memo(function CustomField({accept, lastDroppedItem, onDrop}) {
    return (
        <Box>
        </Box>
    )
})
