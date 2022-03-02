import { FC } from 'react'
import { useDrag } from 'react-dnd'
import { DraggableTypes } from './DraggableTypes'
import {Chip} from "@mui/material";
import {ITag} from "../../types/Tag";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

export const Tag: FC<ITag> = function Tag({ name, value }) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: DraggableTypes.TAG,
        item: {name, value},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }))

    const opacity = isDragging ? 0.4 : 1
    return (
        <Chip
            sx={{borderRadius: '14px'}}
            icon={<DragIndicatorIcon/>}
            ref={drag}
            variant="outlined"
            role="Tag"
            label={name}
            style={{ cursor: 'move', backgroundColor: 'white', margin:8, opacity }}
        />
    )
}
