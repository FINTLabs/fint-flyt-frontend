import {FC} from 'react'
import {useDrag} from 'react-dnd'
import {DraggableTypes} from './DraggableTypes'
import {Chip} from "@mui/material";
import {ITag} from "../../types/Tag";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import NumbersIcon from '@mui/icons-material/Numbers';
import ListIcon from '@mui/icons-material/List';
import {Type} from "../../types/IntegrationMetadata";

export const Tag: FC<ITag> = function Tag({ name, value, type, disabled }) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: DraggableTypes.TAG,
        item: {name, value},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }))

    function typeToIcon(type: string) {
        if (type === Type.STRING) {
            return <TextFieldsIcon/>
        }
        if (type === Type.FILE) {
            return <ListIcon/>
        }
        if (type === Type.INTEGER) {
            return <NumbersIcon/>
        }
        if (type === undefined) {
            return <DragIndicatorIcon/>
        }
    }
    const opacity = isDragging ? 0.4 : 1
    return (
        <Chip
            sx={{borderRadius: '4px'}}
            icon={typeToIcon(type)}
            ref={disabled ? null : drag}
            variant="outlined"
            role="Tag"
            label={name}
            style={ disabled ?
                { backgroundColor: 'whitesmoke', margin:8, opacity: 0.4 } :
                { cursor: 'move', backgroundColor: 'white', margin:8, opacity }
            }
        />
    )
}
