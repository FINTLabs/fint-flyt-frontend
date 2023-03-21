import {FC} from 'react'
import {useDrag} from 'react-dnd'
import {Chip, Theme} from "@mui/material";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import NumbersIcon from '@mui/icons-material/Numbers';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {ITag} from "../../types/Metadata/Tag";
import {ValueType} from "../../types/Metadata/IntegrationMetadata";
import {
    AlternateEmailRounded,
    Dialpad,
    FilePresent,
    FormatListNumbered,
    RuleRounded,
    TextFieldsRounded
} from "@mui/icons-material";

export const Tag: FC<ITag> = function Tag({name, value, type, tagKey}) {
    const [{isDragging}, drag] = useDrag(() => ({
        type: type,
        item: {name, value, type, tagKey},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }))

    function typeToIcon(type: string) {
        if (type === ValueType.STRING) {
            return <TextFieldsRounded/>
        }
        if (type === ValueType.FILE) {
            return <FilePresent/>
        }
        if (type === ValueType.INTEGER) {
            return <NumbersIcon/>
        }
        if (type === ValueType.DATE) {
            return <CalendarMonthIcon/>
        }
        if (type === ValueType.PHONE) {
            return <Dialpad/>
        }
        if (type === ValueType.BOOLEAN) {
            return <RuleRounded/>
        }
        if (type === ValueType.EMAIL) {
            return <AlternateEmailRounded/>
        }
        if (type === ValueType.COLLECTION) {
            return <FormatListNumbered/>
        }
        if (type === undefined) {
            return <DragIndicatorIcon/>
        }
    }

    const opacity = isDragging ? 0.4 : 1
    return (
        <Chip
            sx={{borderRadius: (theme: Theme) => theme.spacing(0.5)}}
            icon={typeToIcon(type)}
            ref={drag}
            variant="outlined"
            role="Tag"
            label={name}
            style={
                {cursor: 'move', backgroundColor: 'white', margin: 8, marginLeft: 0, opacity}
            }
        />
    )
}