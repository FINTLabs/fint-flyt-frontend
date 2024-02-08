import type {FC} from 'react'
import {memo} from 'react'
import {useDrag} from 'react-dnd'
import {ValueType} from "../../../types/Metadata/IntegrationMetadata";
import {typeToIcon} from "../dnd/Tag";
import {Chip} from "@mui/material";
import {tagSX} from "../../../../../util/styles/SystemStyles";

export interface IRequiredField {
    outputType: ValueType;
    accept: ValueType[];
}

export interface TagProps {
    name: string; // FIELD NAME, i.e metadata displayname, conversion displayname
    type: ValueType; // THIS FIELDS TYPE
    collection?: boolean; // ALLOWED TO ADD MORE FIELDS?
    referenceValue?: string; // METADATA OR CONVERSION REFERENCE ID
    value?: string; // VALUE IF EDITABLE FIELD
    requiredFields?: IRequiredField[]; // REQUIRED FIELDS FOR A CONVERSION
}

// eslint-disable-next-line react/prop-types
export const Tag: FC<TagProps> = memo(function Tag({name, type, collection, requiredFields, referenceValue, value}) {
    const [{opacity}, drag] = useDrag(
        () => ({
            type,
            item: {name, type, collection, requiredFields, referenceValue, value},
            collect: (monitor) => ({
                opacity: monitor.isDragging() ? 0.4 : 1,
            }),
        }),
        [name, type],
    )

    return (<Chip
            style={{opacity, border: '2px solid dimgray'}}
            ref={drag}
            sx={tagSX}
            icon={typeToIcon(type)} label={name}/>
    )
})