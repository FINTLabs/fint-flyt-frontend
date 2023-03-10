import {FC} from 'react'
import {useDrag} from 'react-dnd'
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
import {ValueType} from "../../types/Metadata/IntegrationMetadata";

export const Tag: FC<ITag> = function Tag({name, value, type}) {
    const [{isDragging}, drag] = useDrag(() => ({
        type: type,
        item: {name, value, type},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }))

    function typeToIcon(type: string) {
        if (type === ValueType.STRING) {
            return <TextFieldsIcon/>
        }
        if (type === ValueType.FILE) {
            return <ListIcon/>
        }
        if (type === ValueType.INTEGER) {
            return <NumbersIcon/>
        }
        if (type === ValueType.DATE) {
            return <CalendarMonthIcon/>
        }
        if (type === ValueType.PHONE) {
            return <DialpadIcon/>
        }
        if (type === ValueType.BOOLEAN) {
            return <ToggleOnIcon/>
        }
        if (type === ValueType.EMAIL) {
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