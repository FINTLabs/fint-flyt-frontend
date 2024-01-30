import update from 'immutability-helper'
import type { FC } from 'react'
import { memo, useCallback, useState } from 'react'

import { Tag } from './Tag'
import { CustomField } from './CustomField'
import { ItemTypes } from './ItemTypes'

interface CustomFieldState {
    accepts: string[]
    lastDroppedItem: any
}

interface TagState {
    name: string
    type: string
}

export interface CustomFieldSpec {
    accepts: string[]
    lastDroppedItem: any
}
export interface TagSpec {
    name: string
    type: string
}
export interface ContainerState {
    droppedBoxNames: string[]
    customFields: CustomFieldSpec[]
    boxes: TagSpec[]
}

export const Test: FC = memo(function Test() {
    const [fields, setFields] = useState<CustomFieldState[]>([
        { accepts: [ItemTypes.STRING, ItemTypes.INTEGER, ItemTypes.DOUBLE, ItemTypes.VALUE_CONVERTING, ItemTypes.METADATA], lastDroppedItem: null }
    ])

    const [boxes] = useState<TagState[]>([
        { name: 'I am a string', type: ItemTypes.STRING },
        { name: '23', type: ItemTypes.INTEGER },
        { name: '2,99', type: ItemTypes.DOUBLE },
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

    return (
        <div>
            <div style={{ overflow: 'hidden', clear: 'both' }}>
                {fields.map(({ accepts, lastDroppedItem }, index) => (
                    <CustomField
                        accept={accepts}
                        lastDroppedItem={lastDroppedItem}
                        onDrop={(item) => handleDrop(index, item)}
                        key={index}
                    />
                ))}
            </div>

            <div style={{ overflow: 'hidden', clear: 'both' }}>
                {boxes.map(({ name, type }, index) => (
                    <Tag
                        name={name}
                        type={type}
                        isDropped={isDropped(name)}
                        key={index}
                    />
                ))}
            </div>
        </div>
    )
})
