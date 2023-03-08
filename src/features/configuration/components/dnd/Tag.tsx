import {FC} from 'react'
import {useDrag} from 'react-dnd'
import {DraggableTypes} from './DraggableTypes'
import {Chip} from "@mui/material";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import NumbersIcon from '@mui/icons-material/Numbers';
import ListIcon from '@mui/icons-material/List';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DialpadIcon from '@mui/icons-material/Dialpad';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import {ITag} from "../../types/Metadata/Tag";
import {Type} from "../../types/Metadata/IntegrationMetadata";

export const Tag: FC<ITag> = function Tag({name, value, type}) {
    const [{isDragging}, drag] = useDrag(() => ({
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
        if (type === Type.DATE) {
            return <CalendarMonthIcon/>
        }
        if (type === Type.PHONE) {
            return <DialpadIcon/>
        }
        if (type === Type.BOOLEAN) {
            return <ToggleOnIcon/>
        }
        if (type === Type.EMAIL) {
            return <AlternateEmailIcon/>
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
            ref={drag}
            variant="outlined"
            role="Tag"
            label={name}
            style={
                {cursor: 'move', backgroundColor: 'white', margin: 8, opacity}
            }
        />
    )
}