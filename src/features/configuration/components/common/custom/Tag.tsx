import type {FC} from 'react'
import {memo} from 'react'
import {useDrag} from 'react-dnd'
import {ValueType} from "../../../types/Metadata/IntegrationMetadata";
import {typeToIcon} from "../dnd/Tag";
import {Chip} from "@mui/material";
import {tagSX} from "../../../../../util/styles/SystemStyles";

export interface TagProps {
    name: string
    type: string
    collection?: boolean
    requiredFields?: { outputType: ValueType, accept: ValueType[] }[]
}

// eslint-disable-next-line react/prop-types
export const Tag: FC<TagProps> = memo(function Tag({name, type, collection, requiredFields}) {
    const [{opacity}, drag] = useDrag(
        () => ({
            type,
            item: {name, type, collection, requiredFields},
            collect: (monitor) => ({
                opacity: monitor.isDragging() ? 0.4 : 1,
            }),
        }),
        [name, type],
    )

    return (<Chip
            style={{opacity}}
            ref={drag}
            sx={tagSX}
            icon={typeToIcon(type)} label={name}/>
    )
})