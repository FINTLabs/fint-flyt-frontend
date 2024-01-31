import update from 'immutability-helper'
import type { FC } from 'react'
import React, {CSSProperties, memo, useCallback, useState} from 'react'

import {Tag, TagProps} from './Tag'
import { ItemTypes } from './ItemTypes'
import {useDrop} from "react-dnd";
import {Box} from "@mui/system";
import {Typography} from "@mui/material";
import {Button} from "@navikt/ds-react";
import {AlphaNumericComp, MetadataComp, StringComp, ValueConvertingComp} from "./CustomField";

interface CustomFieldState {
    accepts: string[]
    lastDroppedItem: any
}

interface TagState {
    name: string
    type: string,
    collection?: boolean
}

export interface CustomFieldSpec {
    accepts: string[]
    lastDroppedItem: any
}
export interface TagSpec {
    name: string
    type: string
}

const style: CSSProperties = {
    height: '25vh',
    width: '40vw',
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

export const Test: FC = memo(function Test() {
    const [fields, setFields] = useState<CustomFieldState[]>([
        { accepts: [ItemTypes.STRING, ItemTypes.INTEGER, ItemTypes.DOUBLE, ItemTypes.VALUE_CONVERTING, ItemTypes.METADATA], lastDroppedItem: null }
    ])

    const [boxes] = useState<TagState[]>([
        { name: 'I am a string', type: ItemTypes.STRING },
        { name: '23', type: ItemTypes.INTEGER },
        { name: '2,99', type: ItemTypes.DOUBLE },
        { name: 'Fornavn [fornavn]', type: ItemTypes.METADATA },
        { name: 'til store bokstaver VC[1]', type: ItemTypes.VALUE_CONVERTING },
        { name: 'Vil ha flere inputs VC[2]', type: ItemTypes.VALUE_CONVERTING, collection: true }
    ])

    const [tagNames, setTagNames] = useState<string[]>([])

    function isDropped(tagName: string) {
        return tagNames.indexOf(tagName) > -1
    }

    const handleDrop = useCallback(
        (index: number, item: { name: string }) => {
            const { name } = item
            setTagNames(
                update(tagNames, name ? { $push: [name] } : { $push: [] }),
            )
            setFields(
                update(fields, {
                    [index]: {
                        lastDroppedItem: {
                            $set: item,
                        },
                    },
                }),
            )
        },
        [tagNames, fields],
    )
    // eslint-disable-next-line react/prop-types
    const CustomField: FC<CustomFieldProps> = memo(function CustomField({accept, lastDroppedItem, onDrop}) {
        const [content, setContent] = useState<TagProps | undefined>(undefined);
        const [{ isOver, canDrop }, drop] = useDrop({
            accept,
            drop: (item: TagProps) => {
                if (!content) {
                    setContent(item)
                }
            },
            collect: (monitor) => ({
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop() && !content,
            }),
        })

        const isActive = isOver && canDrop
        let backgroundColor = '#222'
        let border = '2px solid black'
        if (isActive) {
            backgroundColor = 'darkgreen'
            border = '6px solid green'
        } else if (canDrop) {
            backgroundColor = 'darkkhaki'
            border = '6px solid lightgreen'
        } else if (isOver && !canDrop) {
            backgroundColor = 'red'
            border = '6px solid maroon'

        }

        return (
            <Box id={"CustomField-top-box"}>
                <div ref={drop} style={{ ...style, backgroundColor, border }} data-testid="custom-field">
                    {isActive
                        ? 'Release to drop'
                        // eslint-disable-next-line react/prop-types
                        : `This custom field accepts: ${accept.join(', ')}`}
                    <Typography>
                        This field contains: {content && JSON.stringify(content)}
                        {lastDroppedItem && (
                            <p>Last dropped: {JSON.stringify(lastDroppedItem)}</p>
                        )}
                    </Typography>
                    {content && content.type === ItemTypes.VALUE_CONVERTING && <ValueConvertingComp {...content}/>}
                    {content && content.type === ItemTypes.STRING && <StringComp {...content}/>}
                    {content && content.type === ItemTypes.METADATA && <MetadataComp {...content}/>}
                    {content && content.type === ItemTypes.INTEGER && <AlphaNumericComp {...content}/>}
                    {content && content.type === ItemTypes.DOUBLE && <AlphaNumericComp {...content}/>}
                    <Button onClick={() => setContent(undefined)}>Fjern innhold</Button>
                </div>
            </Box>
        )
    })



    return (
        <div>
            <div style={{ overflow: 'auto', clear: 'both' }}>
                {fields.map(({ accepts, lastDroppedItem }, index) => (
                    <CustomField
                        accept={accepts}
                        lastDroppedItem={lastDroppedItem}
                        onDrop={(item) => handleDrop(index, item)}
                        key={index}
                    />
                ))}
            </div>

            <div style={{ overflow: 'auto', clear: 'both' }}>
                {boxes.map(({ name, type, collection }, index) => (
                    <Tag
                        name={name}
                        type={type}
                        collection={collection}
                        isDropped={isDropped(name)}
                        key={index}
                    />
                ))}
            </div>
        </div>
    )
})
