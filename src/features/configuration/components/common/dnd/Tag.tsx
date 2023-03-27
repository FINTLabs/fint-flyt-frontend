import {useDrag} from 'react-dnd'
import {Chip} from "@mui/material";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import NumbersIcon from '@mui/icons-material/Numbers';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {ValueType} from "../../../types/Metadata/IntegrationMetadata";
import {
    AlternateEmailRounded,
    Dialpad,
    FilePresent,
    FormatListNumbered,
    RuleRounded,
    TextFieldsRounded
} from "@mui/icons-material";
import {FunctionComponent} from "react";
import {ClassNameMap} from "@mui/styles";
import {tagSX} from "../../../styles/SystemStyles";

export interface Props {
    classes: ClassNameMap
    name: string;
    description: string;
    value: string;
    type: string;
    tagKey: string;
}

export const Tag: FunctionComponent<Props> = (props: Props) => {
    const [{isDragging}, drag] = useDrag(() => ({
        type: props.type,
        item: {...props},
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
            sx={tagSX}
            icon={typeToIcon(props.type)}
            ref={drag}
            variant="outlined"
            role="Tag"
            label={props.name + " - " + props.description}
            style={{opacity}}
        />
    )
}